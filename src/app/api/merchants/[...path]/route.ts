import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_API_BASE = 'https://api.sovdigitalgroup.com';

function getApiBase(): string {
  const raw = String(process.env.API_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/$/, '');
  return raw || FALLBACK_API_BASE;
}

async function forward(req: NextRequest, context: RouteContext<'/api/merchants/[...path]'>) {
  const { path } = await context.params;
  const token = req.cookies.get('auth_token')?.value;
  if (!token || token.startsWith('local_')) return NextResponse.json({ error: 'Sign in with your SOV account to manage your business.' }, { status: 401 });

  const target = new URL(`${getApiBase()}/api/merchants/${path.join('/')}`);
  target.search = new URL(req.url).search;
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  const contentType = req.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);

  try {
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await req.text();
    const upstream = await fetch(target, { method: req.method, headers, body, cache: 'no-store' });
    const responseHeaders = new Headers();
    const upstreamContentType = upstream.headers.get('content-type');
    if (upstreamContentType) responseHeaders.set('Content-Type', upstreamContentType);
    return new NextResponse(await upstream.arrayBuffer(), { status: upstream.status, headers: responseHeaders });
  } catch {
    return NextResponse.json({ error: 'Merchant service unavailable' }, { status: 503 });
  }
}

export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;
