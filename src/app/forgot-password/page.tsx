'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Deliberately ignored. The confirmation below shows either way, so a network
      // blip can never be read as "that address has no account here".
    } finally {
      setLoading(false);
      setSent(true);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-10">
      <div className="w-full space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="text-center">
          <h1 className="text-2xl font-black tracking-tight">Reset your password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {sent ? 'Check your email for the link' : 'We will email you a link to set a new password'}
          </p>
        </div>

        {sent ? (
          <>
            <p className="text-sm text-muted-foreground">
              If an active account matches that email, a reset link is on its way. It works once
              and expires in 30 minutes.
            </p>
            <p className="text-sm text-muted-foreground">
              Nothing after a few minutes? Check your spam folder, or email{' '}
              <a href="mailto:launch@sovdigitalgroup.com" className="text-primary underline">
                launch@sovdigitalgroup.com
              </a>
              .
            </p>
            {/* This Button has no asChild, so navigate rather than wrapping a Link. */}
            <Button type="button" className="w-full" onClick={() => router.push('/login')}>
              Back to sign in
            </Button>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  autoComplete="email"
                  required
                  placeholder="you@email.com"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/login" className="text-primary underline">Back to sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
