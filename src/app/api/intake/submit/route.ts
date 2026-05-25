import { NextRequest, NextResponse } from 'next/server';
import { rateCheck, clientIp } from '@/lib/auth-rate-limit';
import { sendEmail } from '@/lib/notifications';
import { createLeadSubmission } from '@/lib/intake/store';

const FALLBACK_API_BASE = 'https://api.sovdigitalgroup.com';

function getApiBase(): string {
  const raw = String(process.env.API_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/$/, '');
  return raw || FALLBACK_API_BASE;
}

async function resolveAuthUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return null;

  if (token.startsWith('local_')) {
    return token.replace(/^local_/, '');
  }

  try {
    const upstream = await fetch(`${getApiBase()}/api/auth/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!upstream.ok) return null;
    const data = await upstream.json();
    return String(data?.user_id || data?.user?.user_id || data?.id || '').trim() || null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const { allowed, retryAfter } = rateCheck(clientIp(req), 'register');
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(retryAfter ?? 900) } });
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const userId = await resolveAuthUserId(req);
  const lead = createLeadSubmission({
    user_id: userId,
    full_name: String(body.full_name || ''),
    business_name: String(body.business_name || ''),
    category: String(body.business_category || ''),
    email: String(body.email || ''),
    phone: String(body.phone || ''),
    whatsapp_number: String(body.whatsapp_number || ''),
    selected_services: Array.isArray(body.selected_services) ? body.selected_services : [],
    selected_plan: String(body.selected_plan || 'Starter'),
    onboarding_status: 'submitted',
    payment_status: 'pending',
    form: {
      business_category: String(body.business_category || ''),
      business_description: String(body.business_description || ''),
      address: String(body.address || ''),
      service_area: String(body.service_area || ''),
      opening_hours: String(body.opening_hours || ''),
      delivery_available: Boolean(body.delivery_available),
      pickup_available: Boolean(body.pickup_available),
      instagram: String(body.instagram || ''),
      facebook: String(body.facebook || ''),
      website: String(body.website || ''),
      preferred_contact_method: String(body.preferred_contact_method || 'whatsapp'),
    },
    uploadedFiles: Array.isArray(body.uploadedFiles) ? body.uploadedFiles : [],
  });

  const adminEmails = String(process.env.MERCHANT_INTAKE_ADMIN_EMAILS || '').split(',').map((v) => v.trim()).filter(Boolean);
  const customerEmail = String(body.email || '').trim();

  await Promise.allSettled([
    customerEmail
      ? sendEmail({
          to: customerEmail,
          subject: 'SOV Merchant Intake Received',
          text: `Hi ${String(body.full_name || 'there')}, your application for ${String(body.business_name || 'your business')} was received. Lead ID: ${lead.id}.`,
        })
      : Promise.resolve({ skipped: true }),
    adminEmails.length
      ? sendEmail({
          to: adminEmails,
          subject: 'New Merchant Intake Lead',
          text: `New lead ${lead.id} from ${String(body.business_name || 'Unknown')} (${String(body.email || 'no-email')}).`,
        })
      : Promise.resolve({ skipped: true }),
  ]);

  return NextResponse.json({ ok: true, leadId: lead.id, queue_status: 'new_lead', user_id: userId });
}
