import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/web-design/ContactForm';
import { PACKAGES } from '@/components/web-design/PackageCard';

const SITE_URL = 'https://launchtt.com';
const EMAIL = 'launch@sovdigitalgroup.com';

const TITLE = 'Web Design & Digital Packages in Trinidad & Tobago | LaunchTT';
const DESC = 'LaunchTT helps Trinidad & Tobago businesses get online, sell better, and manage their digital presence without hiring an expensive agency.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/web-design' },
  keywords: [
    'web design Trinidad',
    'website package Trinidad',
    'online store Trinidad',
    'business website Trinidad and Tobago',
    'Shop868 storefront',
    'LaunchTT web design',
  ],
  openGraph: {
    title: TITLE,
    description: DESC,
    type: 'website',
    url: '/web-design',
    locale: 'en_TT',
    siteName: 'LaunchTT',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
};

const STATS = [
  { num: '4', label: 'Core packages' },
  { num: 'TT$1,500+', label: 'Minimum setup' },
  { num: 'Monthly', label: 'Support included' },
  { num: 'T&T', label: 'Local business focus' },
];

const PROCESS = [
  { n: 1, t: 'Tell us the business', d: 'Send your goals, services, products, and what you need online.' },
  { n: 2, t: 'Choose the package', d: 'We help you pick the right website, storefront, or bundled digital package.' },
  { n: 3, t: 'We build and configure', d: 'Our team sets up the pages, storefront tools, WhatsApp, SEO, and launch structure.' },
  { n: 4, t: 'Launch with support', d: 'You go live with hosting, maintenance, updates, and support already covered monthly.' },
];

const FAQ = [
  {
    q: 'Do these prices include monthly hosting and maintenance?',
    a: 'Yes. Every package includes a monthly fee that covers hosting, maintenance, updates, and support.',
  },
  {
    q: 'Can LaunchTT build a website and online store together?',
    a: 'Yes. That is exactly what the Premium Digital Package is for, and we can also pair a Business Website with a Shop868 Store when needed.',
  },
  {
    q: 'What if I need booking systems or payment gateway setup?',
    a: 'Those can be added, but custom features, large product uploads, payment gateway setup, booking systems, and advanced integrations may require a separate quote.',
  },
  {
    q: 'Do you still do website repairs?',
    a: 'Yes. We still handle repairs and rebuilds, but repair-heavy or advanced custom work is quoted separately instead of advertised as a low fixed-price package.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/web-design#service`,
      serviceType: 'Website design, online storefront setup, invoicing setup, and digital support',
      name: 'LaunchTT Digital Packages',
      description: DESC,
      provider: {
        '@type': 'Organization',
        name: 'LaunchTT',
        url: SITE_URL,
        parentOrganization: {
          '@type': 'Organization',
          name: 'Sovereign Digital Solutions Limited',
          url: 'https://sovdigitalgroup.com',
        },
      },
      areaServed: [
        { '@type': 'Country', name: 'Trinidad and Tobago' },
      ],
      offers: PACKAGES.map((pkg) => ({
        '@type': 'Offer',
        name: pkg.name,
        price: pkg.price.replace(/[^\d]/g, ''),
        priceCurrency: 'TTD',
        description: pkg.blurb,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function WebDesignPage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-blue-50 via-background to-cyan-50 dark:from-blue-950/30 dark:via-background dark:to-cyan-950/20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-4 py-16 text-center md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Sparkles className="size-3.5" />
            Websites, stores, invoicing, and support
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Get your business online with a website, online store, invoicing, and support.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            LaunchTT helps Trinidad & Tobago businesses get online, sell better, and manage their digital presence without hiring an expensive agency.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/start">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600">
                Start my project <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">See pricing</Button>
            </Link>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {EMAIL} · we reply within 1 business day
          </p>

          <div className="mt-8 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-2xl font-black tracking-tight text-transparent md:text-3xl">{s.num}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                <Globe className="size-3.5" /> Website and store setup
              </div>
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">A proper digital presence for real local businesses.</h2>
              <p className="mt-3 text-muted-foreground">
                We build the pieces that matter most: your website, your storefront, your WhatsApp flow, your invoicing setup, and the support around it.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {[
                  'Mobile-first pages that work well on the phones your customers use',
                  'WhatsApp, contact, map, and lead-generation actions wired in',
                  'Shop868 storefront options for product-driven businesses',
                  'Hosting, updates, and maintenance already covered monthly',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 flex-shrink-0 text-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-xs font-bold text-fuchsia-700 dark:border-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300">
                <Wrench className="size-3.5" /> Custom and repair work
              </div>
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">Need repairs, rebuilds, or special integrations?</h2>
              <p className="mt-3 text-muted-foreground">
                We still handle broken sites, redesigns, payment setup, booking systems, and advanced integrations. Those are quoted separately based on scope.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {[
                  'Broken site diagnosis and rebuild recommendations',
                  'Content migrations and redesign planning',
                  'Booking systems, payment gateway setup, and advanced workflows',
                  'Custom scopes quoted clearly before work starts',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 flex-shrink-0 text-fuchsia-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">From quote to launch in a clear process.</h2>
            <p className="mt-4 text-muted-foreground">Four steps. No confusion. No agency theatre.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.n} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-5xl font-black leading-none tracking-tight text-transparent">
                  {p.n.toString().padStart(2, '0')}
                </div>
                <div className="mt-4 text-xl font-black tracking-tight">{p.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 md:grid-cols-2">
          <Link href="/pricing" className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:border-blue-500">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Pricing</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">Clear prices, no surprises.</h2>
            <p className="mt-2 text-sm text-muted-foreground">Four packages from TT$1,500 setup, with one fixed monthly fee for hosting and support.</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">See pricing <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
          </Link>
          <Link href="/portfolio" className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:border-blue-500">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Portfolio</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">Live sites we have built.</h2>
            <p className="mt-2 text-sm text-muted-foreground">Every site is live and in production across Trinidad &amp; Tobago.</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">See our work <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
          </Link>
        </div>
      </section>

      <section id="faq" className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Common questions, straight answers.</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-5 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold">
                  <span>{f.q}</span>
                  <span className="grid size-7 flex-shrink-0 place-items-center rounded-full border border-border bg-muted text-blue-600 transition group-open:rotate-45 dark:text-blue-400">
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                <Mail className="size-3.5" /> Get in touch
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">Let&apos;s build something useful.</h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                Tell us what you need and we&apos;ll reply with a clear quote within 1 business day.
              </p>

              <div className="mt-8 space-y-3">
                <ContactRow icon={<Mail className="size-5" />} label="Email" value={EMAIL} href={`mailto:${EMAIL}?subject=LaunchTT%20Web%20Design%20Enquiry`} />
                <ContactRow icon={<Clock className="size-5" />} label="Reply time" value="Within 1 business day · Mon-Fri" />
                <ContactRow icon={<MapPin className="size-5" />} label="Where" value="Trinidad & Tobago — serving the whole twin-island" />
                <ContactRow icon={<ShieldCheck className="size-5" />} label="Trust" value="Part of Sovereign Digital Solutions Limited · local digital operations" />
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mt-0.5 text-blue-600">{icon}</div>
      <div>
        <p className="text-sm font-bold">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
