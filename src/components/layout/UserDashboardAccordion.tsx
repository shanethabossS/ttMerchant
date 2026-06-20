'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ExternalLink, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { SOV_LIVE_SITES } from '@/lib/sov-ecosystem';

type KycStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

interface Project {
  package_tier?: 'starter' | 'growth' | 'scale' | string;
  status?: string;
  percent_complete?: number;
  last_update_at?: string;
  next_milestone?: string;
}

const KYC_META: Record<KycStatus, { label: string; tone: string; line: string }> = {
  verified: {
    label: 'Verified',
    tone: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
    line: 'Full access across the SOV ecosystem.',
  },
  pending: {
    label: 'Pending',
    tone: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
    line: "We're reviewing your documents. Usually same business day.",
  },
  unverified: {
    label: 'Not verified',
    tone: 'bg-muted text-muted-foreground border-border',
    line: 'Browse-only access until you complete KYC.',
  },
  rejected: {
    label: 'Rejected',
    tone: 'bg-red-500/15 text-red-600 dark:text-red-300 border-red-500/30',
    line: 'See your email for what needs to be fixed, then re-upload to retry.',
  },
};

function fmtDate(iso?: string) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString('en-TT', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return null;
  }
}

function formatProjectStatus(status?: string) {
  return String(status || 'active').replace(/_/g, ' ');
}

function getAccessMeta(kyc: KycStatus, live: boolean) {
  if (!live) {
    return {
      label: 'Coming soon',
      dot: 'bg-slate-400',
      tone: 'border-border bg-muted/30 text-muted-foreground',
    };
  }

  if (kyc === 'verified') {
    return {
      label: 'Verified access',
      dot: 'bg-emerald-500',
      tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    };
  }

  if (kyc === 'pending') {
    return {
      label: 'Pending review',
      dot: 'bg-amber-500',
      tone: 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    };
  }

  return {
    label: 'Browse only',
    dot: 'bg-blue-500',
    tone: 'border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-cyan-300',
  };
}

export function UserDashboardPanel({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoading, setProjectLoading] = useState(false);

  const kyc: KycStatus = (user?.kyc_status as KycStatus) ?? 'unverified';
  const verified = kyc === 'verified';
  const meta = KYC_META[kyc];

  useEffect(() => {
    if (!user) return;
    setProjectLoading(true);
    fetch('/api/launchtt/me/project', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { project: null }))
      .then((data) => setProject(data?.project ?? null))
      .catch(() => setProject(null))
      .finally(() => setProjectLoading(false));
  }, [user]);

  if (!user) return null;

  const pct = Math.max(0, Math.min(100, Number(project?.percent_complete ?? 0)));
  const tier = project?.package_tier
    ? project.package_tier[0].toUpperCase() + project.package_tier.slice(1)
    : null;
  const lastUpdate = fmtDate(project?.last_update_at);

  return (
    <div className="space-y-4">
      <div>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>

      <div>
        <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">KYC status</p>
        <div className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${meta.tone}`}>
          <ShieldCheck className="size-4 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight">{meta.label}</p>
            <p className="text-xs leading-tight opacity-80">{meta.line}</p>
          </div>
        </div>
        {!verified ? (
          <Link
            href="/kyc"
            className="mt-1.5 flex items-center justify-end gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-cyan-300"
            onClick={onNavigate}
          >
            Complete KYC <ExternalLink className="size-3" />
          </Link>
        ) : null}
      </div>

      <div>
        <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">Your ecosystem access</p>
        <div className="grid grid-cols-2 gap-1.5">
          {SOV_LIVE_SITES.map((site) => {
            const access = getAccessMeta(kyc, site.live);

            return (
              <a
                key={site.slug}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className="rounded-md border border-border bg-muted/40 px-2 py-2 transition hover:bg-muted"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="min-w-0">
                    <span className="flex min-w-0 items-center gap-1.5 text-[0.7rem] font-semibold">
                      <span className={`size-1.5 shrink-0 rounded-full ${access.dot}`} />
                      <span className="truncate">{site.name}</span>
                    </span>
                    <span className={`mt-1 inline-flex rounded-full border px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${access.tone}`}>
                      {access.label}
                    </span>
                  </span>
                  <ExternalLink className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                </span>
              </a>
            );
          })}
        </div>
        <p className="mt-1.5 text-[0.65rem] text-muted-foreground">
          {kyc === 'verified'
            ? 'Verified users get full posting and payment access across all sites.'
            : kyc === 'pending'
              ? 'Pending users can browse now and unlock full tools as soon as review is approved.'
              : 'Unverified users stay in browse-only mode until KYC is approved.'}
        </p>
      </div>

      <div>
        <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">LaunchTT status</p>
        {projectLoading ? (
          <p className="rounded-lg border border-border bg-muted/40 px-2.5 py-2 text-xs text-muted-foreground">Loading...</p>
        ) : project ? (
          <div className="rounded-lg border border-border bg-muted/40 px-2.5 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold">{tier ?? 'Project'}</p>
              <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-300">
                {formatProjectStatus(project.status)}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[0.65rem] text-muted-foreground">
              <span>{pct}% complete</span>
              {lastUpdate ? <span>Updated {lastUpdate}</span> : null}
            </div>
            {project.next_milestone ? (
              <p className="mt-1.5 text-xs">
                <span className="text-muted-foreground">Next: </span>
                <span className="font-semibold">{project.next_milestone}</span>
              </p>
            ) : null}
          </div>
        ) : (
          <Link
            href="/web-design"
            onClick={onNavigate}
            className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-border px-2.5 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-cyan-500" />
              No active project - start one
            </span>
            <span className="text-muted-foreground">{'->'}</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export function UserDashboardAccordion({ compact = false }: { compact?: boolean }) {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    function onClick(event: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target as Node)) setOpen(false);
    }

    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  if (loading || !user) return null;

  const initials = (user.full_name || user.email || '?')
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-2 rounded-full border border-border bg-muted/60 px-2.5 py-1.5 text-xs font-semibold transition hover:bg-muted ${compact ? 'max-w-[42px] justify-center' : 'max-w-[210px]'}`}
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-[0.65rem] font-black text-white">
          {initials || '.'}
        </span>
        {!compact ? <span className="min-w-0 truncate">{user.full_name || user.email}</span> : null}
        <ChevronDown className={`size-3.5 shrink-0 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(92vw,360px)] rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur">
          <UserDashboardPanel onNavigate={() => setOpen(false)} />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-bold transition hover:bg-muted"
          >
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
