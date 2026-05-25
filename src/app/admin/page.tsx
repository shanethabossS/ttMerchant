'use client';

import { useEffect, useState } from 'react';

type Lead = {
  id: string;
  business_name: string;
  email: string;
  selected_plan: string;
  onboarding_status: string;
};

type QueueBlock = {
  status: string;
  rows: Lead[];
};

export default function AdminPage() {
  const [queues, setQueues] = useState<QueueBlock[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/intake/leads', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setQueues(Array.isArray(data?.queues) ? data.queues : []);
      })
      .catch(() => {
        if (mounted) setQueues([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-black tracking-tight md:text-3xl">Merchant Intake Queue Module</h1>
      <p className="mt-2 text-sm text-muted-foreground">Add this module into the existing SOV admin dashboard to manage onboarding flow.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {queues.map((group, idx) => (
          <section key={group.status} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className={`mb-3 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide ${idx % 3 === 0 ? 'bg-blue-50 text-blue-700' : idx % 3 === 1 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
              {group.status.replaceAll('_', ' ')} ({group.rows.length})
            </div>
            <div className="space-y-2">
              {group.rows.length === 0 ? <p className="text-xs text-muted-foreground">No leads in this queue.</p> : null}
              {group.rows.map((lead) => (
                <article key={lead.id} className="rounded-xl border border-border/70 p-3">
                  <p className="text-sm font-semibold text-foreground">{lead.business_name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="rounded-full bg-muted px-2 py-1">{lead.selected_plan || 'starter'}</span>
                    <span className="text-muted-foreground">{lead.onboarding_status}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
