import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LAUNCHTT_SERVICE_PAGES, buildFaqJsonLd } from '@/lib/seo/launchtt-pages';

const SITE_URL = 'https://launchtt.com';

export function generateStaticParams() {
  return LAUNCHTT_SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = LAUNCHTT_SERVICE_PAGES.find((item) => item.slug === params.slug);
  if (!service) return {};

  const title = `${service.metaTitle} | LaunchTT`;
  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    keywords: service.keywords,
    openGraph: {
      title,
      description: service.description,
      type: 'article',
      url,
      locale: 'en_TT',
      siteName: 'LaunchTT',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: service.description,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = LAUNCHTT_SERVICE_PAGES.find((item) => item.slug === params.slug);
  if (!service) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/${service.slug}#service`,
        name: `LaunchTT ${service.name}`,
        serviceType: service.name,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: 'LaunchTT',
          url: SITE_URL,
        },
        areaServed: { '@type': 'Country', name: 'Trinidad and Tobago' },
      },
      buildFaqJsonLd(service.faq),
    ],
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-cyan-300">Service page</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{service.hero}</h1>
        <p className="mt-4 text-base text-muted-foreground">{service.intro}</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight">What this includes</h2>
          <div className="mt-5 space-y-3">
            {service.benefits.map((benefit) => (
              <div key={benefit} className="flex gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight">Common fits</h2>
          <div className="mt-5 space-y-3">
            {service.useCases.map((useCase) => (
              <div key={useCase} className="flex gap-2 text-sm">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-cyan-300" />
                <span>{useCase}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-muted/20 p-6">
        <h2 className="text-2xl font-black tracking-tight">Questions people ask before choosing this service</h2>
        <div className="mt-5 space-y-3">
          {service.faq.map((item) => (
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
        <Link href="/locations">
          <Button variant="outline">See location pages</Button>
        </Link>
      </div>
    </div>
  );
}
