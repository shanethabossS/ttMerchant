'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock3, FileText, FolderKanban } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface ProjectStatus {
  percent_complete?: number;
  next_milestone?: string;
}

function formatKycLabel(status?: string) {
  switch (status) {
    case 'verified':
      return 'Verified';
    case 'pending':
      return 'Pending';
    case 'rejected':
      return 'Needs update';
    default:
      return 'Unverified';
  }
}

export function HomeStatusStrip() {
  const { user, loading } = useAuth();
  const [project, setProject] = useState<ProjectStatus | null>(null);

  useEffect(() => {
    if (!user) return;
    fetch('/api/launchtt/me/project', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : { project: null }))
      .then((data) => setProject(data?.project ?? null))
      .catch(() => setProject(null));
  }, [user]);

  if (loading || !user) return null;

  const kycLabel = formatKycLabel(user.kyc_status);
  const percent = Math.max(0, Math.min(100, Number(project?.percent_complete ?? 0)));
  const nextStep = project?.next_milestone || (user.kyc_status === 'verified' ? 'Choose your launch package' : 'Upload your KYC documents');

  return (
    <section className="border-b border-border bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Current status</p>
          <p className="mt-1 text-sm text-slate-300">Welcome back, {user.full_name || user.email}.</p>
        </div>

        <div className="grid gap-2 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <CheckCircle2 className="size-3.5 text-cyan-300" />
              KYC
            </p>
            <p className="mt-1 text-sm font-semibold">{kycLabel}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <FolderKanban className="size-3.5 text-cyan-300" />
              Project
            </p>
            <p className="mt-1 text-sm font-semibold">{project ? `${percent}% complete` : 'No active project yet'}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Clock3 className="size-3.5 text-cyan-300" />
              Next step
            </p>
            <p className="mt-1 text-sm font-semibold">{nextStep}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href="/kyc"
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
          >
            <FileText className="size-4" />
            KYC
          </Link>
          <Link
            href={project ? '/web-design' : '/start'}
            className="inline-flex items-center rounded-lg border border-white/10 bg-white px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            {project ? 'View services' : 'Start launch'}
          </Link>
        </div>
      </div>
    </section>
  );
}
