import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LAUNCHTT_LOCATION_PAGES } from '@/lib/seo/launchtt-pages';

export const metadata: Metadata = {
  title: 'Locations in Trinidad and Tobago',
  description:
    'Explore LaunchTT location pages for businesses in Port of Spain, San Fernando, Chaguanas, Arima, and Tobago.',
  alternates: { canonical: '/locations' },
};

export default function LocationsIndexPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-cyan-300">Locations</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          LaunchTT location pages for Trinidad and Tobago businesses
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          These local pages help connect LaunchTT with the places people actually search from when looking
          for website design, online ordering, and business launch support.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {LAUNCHTT_LOCATION_PAGES.map((location) => (
          <article key={location.slug} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-cyan-300">
              <MapPin className="size-4" />
              {location.name}
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight">{location.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{location.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {location.businessTypes.map((type) => (
                <span key={type} className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold">
                  {type}
                </span>
              ))}
            </div>
            <Link href={`/locations/${location.slug}`} className="mt-6 block">
              <Button className="w-full gap-2">
                View location page <ArrowRight className="size-4" />
              </Button>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
