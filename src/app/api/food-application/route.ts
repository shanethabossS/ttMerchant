import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const TO_EMAIL = process.env.WEB_DESIGN_INBOX || 'info@sovdigitalgroup.com';
const FALLBACK = 'databosstt@gmail.com';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const business = String(body?.business ?? '').trim();
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const phone = String(body?.phone ?? '').trim();
  const location = String(body?.location ?? '').trim();
  const fulfillment = String(body?.fulfillment ?? '').trim();
  const cuisine = String(body?.cuisine ?? '').trim();
  const message = String(body?.message ?? '').trim();
  const honeypot = String(body?.company ?? '').trim();

  if (honeypot) return NextResponse.json({ ok: true });

  if (!business || !name || !email || !phone) {
    return NextResponse.json(
      { error: 'Business name, your name, email, and phone are required.' },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please use a valid email.' }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: 'Message too long.' }, { status: 400 });
  }

  const subject = `FoodSTT founding-restaurant application — ${business}`;
  const text = [
    `Restaurant: ${business}`,
    `Contact: ${name}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${phone}`,
    location ? `Location: ${location}` : null,
    fulfillment ? `Fulfillment: ${fulfillment}` : null,
    cuisine ? `Cuisine / type: ${cuisine}` : null,
    '',
    message || '(no additional notes)',
  ].filter(Boolean).join('\n');

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'LaunchTT <onboarding@resend.dev>';

  if (apiKey) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [TO_EMAIL],
          cc: TO_EMAIL === FALLBACK ? undefined : [FALLBACK],
          reply_to: email,
          subject,
          text,
        }),
      });
      if (!r.ok) {
        const detail = await r.text();
        console.error('Resend error:', r.status, detail);
        return NextResponse.json({ error: `Could not send. Email ${TO_EMAIL} directly.` }, { status: 502 });
      }
      return NextResponse.json({ ok: true, delivered: true });
    } catch (e) {
      console.error('FoodSTT application send failed', e);
      return NextResponse.json({ error: `Network error. Email ${TO_EMAIL} directly.` }, { status: 502 });
    }
  }

  console.log('[FoodSTT founding-restaurant application] (no RESEND_API_KEY set)\n' + text);
  return NextResponse.json({ ok: true, delivered: false });
}
