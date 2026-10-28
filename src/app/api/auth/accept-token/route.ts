import { NextRequest, NextResponse } from 'next/server';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const FALLBACK_API_BASE = 'https://api.sovdigitalgroup.com';

function apiBase(): string {
  const raw = String(process.env.API_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/$/, '');
  if (!raw || /localhost|127\.0\.0\.1/i.test(raw)) return FALLBACK_API_BASE;
  return raw;
}

// Only the page's own origin may hand us a token, and only a token the central API accepts
// becomes a session. Before this, any string was set as auth_token and a cross-site form
// (text/plain body) could plant a session of the attacker's choosing.
function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const token = body?.token;

  if (!token || typeof token !== 'string' || token.length > 4096) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  try {
    const check = await fetch(`${apiBase()}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!check.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  } catch (err) {
    console.error('accept-token: auth service unreachable', err);
    return NextResponse.json({ error: 'Auth service unavailable' }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  res.cookies.set('auth_state', '1', {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  return res;
}
