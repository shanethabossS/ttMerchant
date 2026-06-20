'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SOV_LIVE_SITES } from '@/lib/sov-ecosystem';
import { UserDashboardAccordion } from './UserDashboardAccordion';

export function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/92 backdrop-blur">
      <div className="sov-network-bar">
        <div className="sov-network-chips">
          {SOV_LIVE_SITES.map((site) => (
            <a
              key={site.slug}
              href={site.url}
              className={`sov-network-chip ${site.slug === 'sovconnect' ? 'sov-network-chip-current' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              title={site.description}
            >
              {site.name}
            </a>
          ))}
        </div>
      </div>

      <div className="container mx-auto flex min-h-16 items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-black text-white">
            LT
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xl font-black tracking-tight">LaunchTT</span>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">
              We launch your business - done for you
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/web-design#services" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            Services
          </Link>
          <Link href="/drive" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            Delivery Service
          </Link>
          <a
            href="https://sovdigitalgroup.com/kyc"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
          >
            KYC
          </a>
          <Link href="/signup" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            Sign up
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <div className="hidden items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 lg:flex">
            <ShieldCheck className="size-3.5" />
            Secure
          </div>
          {!loading && user ? (
            <UserDashboardAccordion />
          ) : !loading ? (
            <div className="flex gap-2">
              <Link href="/login"><Button variant="outline" size="sm">Sign in</Button></Link>
              <Link href="/signup"><Button size="sm">Sign up</Button></Link>
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
