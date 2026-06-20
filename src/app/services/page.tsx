import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LAUNCHTT_SERVICE_PAGES } from '@/lib/seo/launchtt-pages';

export const metadata: Metadata = {
  title: 'Services in Trinidad and Tobago',
  description:
    'Explore LaunchTT service pages for website design, online ordering, and business launch support in Trinidad and Tobago.',
  alternates: { canonical: '/services' },
};

export default function ServicesIndexPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-cyan-300">Services</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          Explore LaunchTT services for Trinidad and Tobago businesses
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          These pages focus on the main ways businesses find LaunchTT: website design, online ordering,
          and done-for-you business launch support.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {LAUNCHTT_SERVICE_PAGES.map((service) => (
          <article key={service.slug} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight">{service.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            <div className="mt-5 space-y-2">
              {service.benefits.slice(0, 3).map((benefit) => (
                <div key={benefit} className="flex gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <Link href={`/services/${service.slug}`} className="mt-6 block">
              <Button className="w-full gap-2">
                View service page <ArrowRight className="size-4" />
              </Button>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
