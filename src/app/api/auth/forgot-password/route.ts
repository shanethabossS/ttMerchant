import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_API_BASE = 'https://api.sovdigitalgroup.com';

function getApiBase() {
  const raw = String(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '').trim();
  const normalized = raw.replace(/\/$/, '');
  if (!normalized) return FALLBACK_API_BASE;
  if (/localhost|127\.0\.0\.1/i.test(normalized)) return FALLBACK_API_BASE;
  return normalized;
}

// Same-origin proxy so the browser never calls the central API cross-origin.
// The upstream deliberately answers 202 with one fixed message whether or not the
// address belongs to an account, so nothing here may add detail that would let a
// caller tell the two apart — including on our own failures.
export async function POST(req: NextRequest) {
  const generic = { message: 'If an active account matches that email, a reset link will be sent.' };
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? '').trim();

    const upstream = await fetch(`${getApiBase()}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, site: 'launchtt' }),
      cache: 'no-store',
    });
    const payload = await upstream.json().catch(() => generic);
    return NextResponse.json(payload ?? generic, {
      status: 202,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch {
    return NextResponse.json(generic, { status: 202, headers: { 'Cache-Control': 'private, no-store' } });
  }
}
