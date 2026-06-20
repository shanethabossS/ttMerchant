import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_API_BASE = 'https://api.sovdigitalgroup.com';

function getApiBase(): string {
  const raw = String(process.env.API_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/$/, '');
  if (!raw) return FALLBACK_API_BASE;
  try {
    const parsed = new URL(raw);
    if (process.env.NODE_ENV === 'production' && (/^(localhost|127\.0\.0\.1)$/i.test(parsed.hostname) || parsed.protocol !== 'https:')) {
      return FALLBACK_API_BASE;
    }
  } catch {
    return FALLBACK_API_BASE;
  }
  return raw;
}

const CENTRAL_API = getApiBase();

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ project: null }, { status: 200 });

  try {
    const upstream = await fetch(`${CENTRAL_API}/api/launchtt/me/project`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (upstream.status === 404) return NextResponse.json({ project: null }, { status: 200 });
    if (!upstream.ok) return NextResponse.json({ project: null }, { status: 200 });
    const data = await upstream.json();
    return NextResponse.json({ project: data ?? null }, { status: 200 });
  } catch {
    return NextResponse.json({ project: null }, { status: 200 });
  }
}
