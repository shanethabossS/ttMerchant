import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_API_BASE = 'https://api.sovdigitalgroup.com';

function getApiBase() {
  const raw = String(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '').trim();
  const normalized = raw.replace(/\/$/, '');
  if (!normalized) return FALLBACK_API_BASE;
  if (/localhost|127\.0\.0\.1/i.test(normalized)) return FALLBACK_API_BASE;
  return normalized;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const token = String(body?.token ?? '').trim();
    const password = String(body?.password ?? '');

    // Shape-checked here as well as upstream so an obviously malformed request never
    // leaves the site, and the caller gets the same wording either way.
    if (token.length !== 64 || password.length < 8) {
      return NextResponse.json({ error: 'Invalid or expired reset request' }, { status: 400 });
    }

    const upstream = await fetch(`${getApiBase()}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
      cache: 'no-store',
    });
    const payload = await upstream.json().catch(() => ({ error: 'Unable to reset password' }));
    return NextResponse.json(payload, {
      status: upstream.status,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'Unable to reset password' }, { status: 502 });
  }
}
