import { NextRequest, NextResponse } from 'next/server';
import { rateCheck, clientIp } from '@/lib/auth-rate-limit';
import { sendEmail } from '@/lib/notifications';
import { createDriverApplication } from '@/lib/intake/store';

export async function POST(req: NextRequest) {
  const { allowed, retryAfter } = rateCheck(clientIp(req), 'register');
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(retryAfter ?? 900) } });
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const app = createDriverApplication({
    full_name: String(body.full_name || ''),
    email: String(body.email || ''),
    phone: String(body.phone || ''),
    whatsapp_number: String(body.whatsapp_number || ''),
    date_of_birth: String(body.date_of_birth || ''),
    address: String(body.address || ''),
    vehicle_types: Array.isArray(body.vehicle_types) ? body.vehicle_types : [],
    vehicle_make_model: String(body.vehicle_make_model || ''),
    license_number: String(body.license_number || ''),
    license_expiry: String(body.license_expiry || ''),
    areas_served: Array.isArray(body.areas_served) ? body.areas_served : [],
    availability: Array.isArray(body.availability) ? body.availability : [],
    service_types: Array.isArray(body.service_types) ? body.service_types : [],
    experience_description: String(body.experience_description || ''),
    has_insurance: Boolean(body.has_insurance),
    has_police_certificate: Boolean(body.has_police_certificate),
    uploadedFiles: Array.isArray(body.uploadedFiles) ? body.uploadedFiles : [],
  });

  const adminEmails = String(process.env.MERCHANT_INTAKE_ADMIN_EMAILS || '').split(',').map((v) => v.trim()).filter(Boolean);
  const customerEmail = String(body.email || '').trim();

  await Promise.allSettled([
    customerEmail
      ? sendEmail({
          to: customerEmail,
          subject: 'SOV Connect - Driver Application Received',
          text: `Hi ${String(body.full_name || 'there')}, your driver application was received. Application ID: ${app.id}. We'll be in touch within 24 hours.`,
        })
      : Promise.resolve({ skipped: true }),
    adminEmails.length
      ? sendEmail({
          to: adminEmails,
          subject: 'New Driver Application',
          text: `New driver application ${app.id} from ${String(body.full_name || 'Unknown')} (${String(body.email || 'no-email')}). Areas: ${(body.areas_served || []).join(', ')}.`,
        })
      : Promise.resolve({ skipped: true }),
  ]);

  return NextResponse.json({ ok: true, applicationId: app.id, status: 'submitted' });
}
