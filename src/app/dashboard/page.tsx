import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 text-center">
      <h1 className="text-3xl font-black tracking-tight">Concierge Onboarding Mode</h1>
      <p className="mt-3 text-muted-foreground">Merchant self-service dashboard is not active in phase 1.</p>
      <Link href="/start" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">Continue intake</Link>
    </div>
  );
}
