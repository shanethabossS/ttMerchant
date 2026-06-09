'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/92 backdrop-blur">
      <div className="sov-network-bar">
        <span className="sov-network-label">SOV Network</span>
        <div className="sov-network-chips">
          <a href="https://admin.sovdigitalgroup.com" className="sov-network-chip" target="_blank" rel="noopener noreferrer">Admin</a>
          <a href="https://api.sovdigitalgroup.com" className="sov-network-chip" target="_blank" rel="noopener noreferrer">API</a>
          <span className="sov-network-chip sov-network-chip-current">LaunchTT</span>
        </div>
      </div>

      <div className="container mx-auto flex min-h-16 items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-base font-black text-white">
            🚀
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xl font-black tracking-tight">LaunchTT</span>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">
              We launch your business — done for you
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/join/business" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            Business
          </Link>
          <Link href="/join/driver" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            Driver
          </Link>
          <Link href="/admin" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            Admin
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <div className="hidden items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 lg:flex">
            <ShieldCheck className="size-3.5" />
            Secure
          </div>
          {!loading && user ? (
            <div className="flex items-center gap-2">
              <span className="max-w-[170px] truncate rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-semibold">
                {user.full_name || user.email}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>Sign out</Button>
            </div>
          ) : !loading ? (
            <div className="flex gap-2">
              <Link href="/login"><Button variant="outline" size="sm">Sign in</Button></Link>
              <Link href="/signup"><Button size="sm">Get started</Button></Link>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
