import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LAUNCHTT_LOCATION_PAGES, buildFaqJsonLd } from '@/lib/seo/launchtt-pages';

const SITE_URL = 'https://launchtt.com';

export function generateStaticParams() {
  return LAUNCHTT_LOCATION_PAGES.map((location) => ({ slug: location.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const location = LAUNCHTT_LOCATION_PAGES.find((item) => item.slug === params.slug);
  if (!location) return {};

  const url = `${SITE_URL}/locations/${location.slug}`;

  return {
    title: `${location.title} | LaunchTT`,
    description: location.description,
    alternates: { canonical: `/locations/${location.slug}` },
    keywords: location.keywords,
    openGraph: {
      title: `${location.title} | LaunchTT`,
      description: location.description,
      type: 'article',
      url,
      locale: 'en_TT',
      siteName: 'LaunchTT',
    },
  };
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = LAUNCHTT_LOCATION_PAGES.find((item) => item.slug === params.slug);
  if (!location) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/locations/${location.slug}#local`,
        name: `LaunchTT ${location.name}`,
        description: location.description,
        areaServed: location.name,
        url: `${SITE_URL}/locations/${location.slug}`,
      },
      buildFaqJsonLd(location.faq),
    ],
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-cyan-300">
          <MapPin className="size-4" />
          {location.name}
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{location.hero}</h1>
        <p className="mt-4 text-base text-muted-foreground">{location.intro}</p>
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-black tracking-tight">Businesses we commonly help here</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {location.businessTypes.map((type) => (
            <div key={type} className="flex gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>{type}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-muted/20 p-6">
        <h2 className="text-2xl font-black tracking-tight">Common local question</h2>
        <div className="mt-5 space-y-3">
          {location.faq.map((item) => (
            <details key={item.q} className="rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer text-left text-base font-bold">{item.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/signup">
          <Button className="gap-2">
            Start with LaunchTT <ArrowRight className="size-4" />
          </Button>
        </Link>
        <Link href="/services">
          <Button variant="outline">Explore service pages</Button>
        </Link>
      </div>
    </div>
  );
}
