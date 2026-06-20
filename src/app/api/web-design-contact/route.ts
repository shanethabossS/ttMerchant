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

  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const phone = String(body?.phone ?? '').trim();
  const kind = String(body?.kind ?? '').trim();
  const message = String(body?.message ?? '').trim();
  const honeypot = String(body?.company ?? '').trim();

  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please use a valid email.' }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: 'Message too long.' }, { status: 400 });
  }

  const subject = `LaunchTT web-design enquiry — ${kind || 'general'} — ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    kind ? `Interest: ${kind}` : null,
    '',
    message,
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
      console.error('Contact send failed', e);
      return NextResponse.json({ error: `Network error. Email ${TO_EMAIL} directly.` }, { status: 502 });
    }
  }

  console.log('[LaunchTT web-design contact] (no RESEND_API_KEY set)\n' + text);
  return NextResponse.json({ ok: true, delivered: false });
}
