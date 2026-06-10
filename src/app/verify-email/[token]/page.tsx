// Server component: POSTs the token to central API, renders the result.
// Lives at /src/app/verify-email/[token]/page.tsx
import Link from 'next/link';

const API_BASE = (process.env.API_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.sovdigitalgroup.com').replace(/\/$/, '');

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Verify Email — SOV Digital',
  description: 'Confirm your email address.',
};

async function verifyToken(token: string): Promise<{ ok: boolean; message: string }> {
  if (!token || token.length < 32) return { ok: false, message: 'This verification link is invalid.' };
  try {
    const r = await fetch(`${API_BASE}/api/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      cache: 'no-store',
    });
    const data = await r.json().catch(() => ({}));
    if (r.ok) return { ok: true, message: data?.message || 'Email verified. You\'re all set!' };
    return { ok: false, message: data?.error || `Verification failed (HTTP ${r.status})` };
  } catch (err: any) {
    return { ok: false, message: err?.message || 'Network error contacting verification service.' };
  }
}

export default async function VerifyEmailPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await verifyToken(token);

  return (
    <main style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{
        maxWidth: 480, width: '100%', textAlign: 'center',
        background: '#fff',
        border: `2px solid ${result.ok ? '#10b981' : '#ef4444'}`,
        borderRadius: 16, padding: 32, boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{result.ok ? '✅' : '❌'}</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>
          {result.ok ? 'Email verified' : 'Verification failed'}
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 8, marginBottom: 24 }}>{result.message}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ padding: '10px 18px', background: '#3b82f6', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Continue to site
          </Link>
          {!result.ok && (
            <Link href="/login" style={{ padding: '10px 18px', background: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}