import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PACKAGES, PackageCard } from '@/components/web-design/PackageCard';

export const metadata: Metadata = {
  title: 'Website & Business Package Prices in Trinidad & Tobago | LaunchTT',
  description: 'LaunchTT packages: starter website, business website, Shop868 store and a full digital package. A setup price plus one fixed monthly fee for hosting, updates and support.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Clear pricing, no surprises.</h2>
            <p className="mt-4 text-muted-foreground">Setup pricing plus monthly hosting, maintenance, updates, and support.</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} {...pkg} />
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Monthly fee covers hosting, maintenance, updates, and support. Custom features, large product uploads, payment gateway setup, booking systems, and advanced integrations may require a separate quote.
          </p>
        </div>
      </section>


      <section className="border-t border-border bg-muted/30 py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-black tracking-tight">Not sure which package fits?</h2>
          <p className="mt-2 text-muted-foreground">Tell us about your business and we will recommend one. No pressure.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/start"><Button size="lg" className="gap-2">Start my project <ArrowRight className="size-4" /></Button></Link>
            <Link href="/portfolio"><Button size="lg" variant="outline">See our work</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
