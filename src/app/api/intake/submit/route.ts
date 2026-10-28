import { NextRequest, NextResponse } from 'next/server';
import { rateCheck, clientIp } from '@/lib/auth-rate-limit';
import { sendEmail } from '@/lib/notifications';

const FALLBACK_API_BASE = 'https://api.sovdigitalgroup.com';

function getApiBase(): string {
  const raw = String(process.env.API_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/$/, '');
  return raw || FALLBACK_API_BASE;
}

async function resolveAuthUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return null;

  // `local_` tokens come from the retired file-based store and prove nothing; never
  // treat one as an identity.
  if (token.startsWith('local_')) return null;

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
  const token = req.cookies.get('auth_token')?.value;
  const merchantPayload = {
    business_name: String(body.business_name || ''),
    contact_email: String(body.email || ''),
    contact_phone: String(body.phone || ''),
    whatsapp_number: String(body.whatsapp_number || ''),
    category: String(body.business_category || ''),
    description: String(body.business_description || ''),
    address: String(body.address || ''),
    service_area: String(body.service_area || ''),
    opening_hours: String(body.opening_hours || ''),
    preferred_contact_method: String(body.preferred_contact_method || 'whatsapp'),
    selected_services: Array.isArray(body.selected_services) ? body.selected_services : [],
    selected_plan: String(body.selected_plan || 'Starter'),
    uploaded_files: Array.isArray(body.uploadedFiles) ? body.uploadedFiles : [],
  };

  if (userId && token && !token.startsWith('local_')) {
    try {
      const upstream = await fetch(`${getApiBase()}/api/merchants/me`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(merchantPayload),
        cache: 'no-store',
      });
      const data = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        return NextResponse.json({ error: String(data?.error || 'Unable to save merchant profile') }, { status: upstream.status });
      }

      const merchantId = String(data?.merchant?.id || '');
      const adminEmails = String(process.env.MERCHANT_INTAKE_ADMIN_EMAILS || '').split(',').map((v) => v.trim()).filter(Boolean);
      const customerEmail = String(body.email || '').trim();
      await Promise.allSettled([
        customerEmail
          ? sendEmail({
              to: customerEmail,
              subject: 'SOV Merchant Intake Received',
              text: `Hi ${String(body.full_name || 'there')}, your business profile for ${String(body.business_name || 'your business')} was received.`,
            })
          : Promise.resolve({ skipped: true }),
        adminEmails.length
          ? sendEmail({
              to: adminEmails,
              subject: 'New Merchant Intake',
              text: `New merchant ${String(body.business_name || 'Unknown')} (${String(body.email || 'no-email')}).`,
            })
          : Promise.resolve({ skipped: true }),
      ]);
      return NextResponse.json({ ok: true, merchantId, queue_status: data?.merchant?.status || 'draft', user_id: userId });
    } catch {
      return NextResponse.json({ error: 'Merchant service unavailable' }, { status: 503 });
    }
  }

  // Signed-out visitors: the lead goes to the central contact queue (durable, visible in
  // the admin dashboard). The old file-based store wrote to `.data/` on a read-only Vercel
  // disk, so every anonymous submission returned 500 and was lost.
  const lines = [
    `Business: ${merchantPayload.business_name}`,
    `Contact: ${String(body.full_name || '')} <${merchantPayload.contact_email}>`,
    `Phone: ${merchantPayload.contact_phone}  WhatsApp: ${merchantPayload.whatsapp_number}`,
    `Category: ${merchantPayload.category}`,
    `Plan: ${merchantPayload.selected_plan}`,
    `Services: ${merchantPayload.selected_services.join(', ') || '-'}`,
    `Preferred contact: ${merchantPayload.preferred_contact_method}`,
    `About: ${merchantPayload.description || '-'}`,
  ];
  let leadId = '';
  try {
    const upstream = await fetch(`${getApiBase()}/api/contact/messages/public`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_site: 'LaunchTT',
        source_page: '/start',
        name: String(body.full_name || body.business_name || '').trim().slice(0, 120),
        email: merchantPayload.contact_email.trim(),
        subject: 'other',
        message: lines.join('\n').slice(0, 4000),
      }),
      cache: 'no-store',
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return NextResponse.json({ error: String(data?.error || 'Could not send your details. Please WhatsApp us.') }, { status: upstream.status === 400 ? 400 : 502 });
    }
    leadId = String(data?.id || data?.message?.id || '');
  } catch (err) {
    console.error('LaunchTT lead submit failed', err);
    return NextResponse.json({ error: 'Could not send your details. Please WhatsApp us.' }, { status: 502 });
  }

  const adminEmails = String(process.env.MERCHANT_INTAKE_ADMIN_EMAILS || '').split(',').map((v) => v.trim()).filter(Boolean);
  const customerEmail = String(body.email || '').trim();

  await Promise.allSettled([
    customerEmail
      ? sendEmail({
          to: customerEmail,
          subject: 'SOV Merchant Intake Received',
          text: `Hi ${String(body.full_name || 'there')}, your application for ${String(body.business_name || 'your business')} was received. `,
        })
      : Promise.resolve({ skipped: true }),
    adminEmails.length
      ? sendEmail({
          to: adminEmails,
          subject: 'New Merchant Intake Lead',
          text: `New lead from ${String(body.business_name || 'Unknown')} (${String(body.email || 'no-email')}).`,
        })
      : Promise.resolve({ skipped: true }),
  ]);

  return NextResponse.json({ ok: true, leadId, queue_status: 'new_lead', user_id: userId });
}
