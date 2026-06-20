'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { SOV_LIVE_SITES } from '@/lib/sov-ecosystem';
import { UserDashboardPanel } from './UserDashboardAccordion';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-full z-40 max-h-[85vh] overflow-y-auto border-b border-border bg-background shadow-lg">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              <Link href="/web-design#services" onClick={() => setOpen(false)} className="rounded-xl border border-border bg-card px-3 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
                Services
              </Link>
              <a href="https://sovdigitalgroup.com/kyc" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="rounded-xl border border-border bg-card px-3 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
                KYC
              </a>
              <Link href="/drive" onClick={() => setOpen(false)} className="rounded-xl border border-border bg-card px-3 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
                Delivery Service
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="rounded-xl border border-border bg-card px-3 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
                Sign up
              </Link>
            </div>

            {!loading && user ? (
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Your dashboard</p>
                <UserDashboardPanel onNavigate={() => setOpen(false)} />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  Sign out
                </Button>
              </div>
            ) : !loading ? (
              <div className="flex gap-2">
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg border border-border px-3 py-2.5 text-center text-sm font-bold">
                  Sign in
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-bold text-primary-foreground">
                  Sign up
                </Link>
              </div>
            ) : null}

            <div className="rounded-2xl border border-border bg-muted/30 p-3">
              <p className="px-1 pb-2 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">SOV Ecosystem</p>
              <div className="flex flex-wrap gap-1.5">
                {SOV_LIVE_SITES.map((site) => (
                  <a
                    key={site.slug}
                    href={site.url}
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
