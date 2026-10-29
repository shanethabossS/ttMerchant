import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_API_BASE = 'https://api.sovdigitalgroup.com';

function getApiBase(): string {
  const raw = String(process.env.API_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/$/, '');
  return raw || FALLBACK_API_BASE;
}

// Intake queues hold merchants' emails and phone numbers, so only a super admin may read or move them.
// Returns null when allowed, or the refusal to send. Fails closed: any doubt is a refusal.
export async function requireStaff(req: NextRequest): Promise<NextResponse | null> {
  const token = req.cookies.get('auth_token')?.value;
  // `local_` tokens come from the retired file-based store and prove nothing.
  if (!token || token.startsWith('local_')) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const upstream = await fetch(`${getApiBase()}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  }).catch(() => null);
  if (!upstream) return NextResponse.json({ error: 'Authorization service unavailable' }, { status: 503 });
  if (upstream.status === 401) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const data = await upstream.json().catch(() => null);
  if (!upstream.ok || data?.user?.is_super_admin !== true) {
    return NextResponse.json({ error: 'Staff access required' }, { status: 403 });
  }
  return null;
}
