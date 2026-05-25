import Link from 'next/link';

export default function DisabledMarketplacePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 text-center">
      <h1 className="text-3xl font-black tracking-tight">Merchant Self-Service Is Coming Later</h1>
      <p className="mt-3 text-muted-foreground">Phase 1 is concierge onboarding only. Submit your business details and SOV publishes your storefront manually.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/start" className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">Start onboarding</Link>
        <Link href="/admin" className="rounded-lg border border-border px-4 py-2 font-semibold">View queue module</Link>
      </div>
    </div>
  );
}
