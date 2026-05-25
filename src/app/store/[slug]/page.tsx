import Link from 'next/link';

export default function LegacyStorefrontPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 text-center">
      <h1 className="text-3xl font-black tracking-tight">Storefront Publishing Is Managed Internally</h1>
      <p className="mt-3 text-muted-foreground">Public storefront generation is handled by the SOV team after review.</p>
      <Link href="/start" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">Submit business details</Link>
    </div>
  );
}
