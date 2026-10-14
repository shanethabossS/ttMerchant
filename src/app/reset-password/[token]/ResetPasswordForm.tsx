'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  // The link is validated server-side on submit. Catching the obvious shape problem
  // here avoids a pointless round trip and says something more useful than "invalid
  // or expired" for a link a mail client simply cut in half.
  const tokenLooksValid = /^[0-9a-f]{64}$/i.test(token);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setMessage('');

    if (password.length < 8) return setMessage('Use at least 8 characters.');
    // Confirmed before sending: the token is one-time, so a typo would burn the link
    // and lock the account out until the user requested another.
    if (password !== confirm) return setMessage('Those two passwords do not match.');

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.error || 'That reset link is invalid or has expired.');
        return;
      }
      setDone(true);
      setTimeout(() => router.push('/login'), 2500);
    } catch {
      setMessage('Could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-10">
      <div className="w-full space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="text-center">
          <h1 className="text-2xl font-black tracking-tight">Set a new password</h1>
        </div>

        {!tokenLooksValid ? (
          <>
            <p className="text-sm text-muted-foreground">
              That reset link is not complete. Some mail apps cut long links in half — open it
              again from the email, or request a fresh one.
            </p>
            {/* This Button has no asChild, so navigate rather than wrapping a Link. */}
            <Button type="button" className="w-full" onClick={() => router.push('/forgot-password')}>
              Request a new link
            </Button>
          </>
        ) : done ? (
          <>
            <p className="text-sm text-muted-foreground">
              Password updated. You have been signed out everywhere else — sign in again with
              your new password.
            </p>
            <Button type="button" className="w-full" onClick={() => router.push('/login')}>
              Sign in
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {message ? (
              <p className="rounded bg-destructive/10 px-3 py-2 text-sm text-destructive">{message}</p>
            ) : null}
            <div>
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                autoComplete="new-password"
                minLength={8}
                required
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm new password</Label>
              <Input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1"
                autoComplete="new-password"
                minLength={8}
                required
                placeholder="Type it again"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save new password'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Link expired?{' '}
              <Link href="/forgot-password" className="text-primary underline">Request a new one</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
