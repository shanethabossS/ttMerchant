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
  Star,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/web-design/ContactForm';
import Portfolio from '@/components/web-design/Portfolio';

const SITE_URL = 'https://launchtt.com';
const EMAIL = 'info@sovdigitalgroup.com';

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

const PACKAGES = [
  {
    name: 'Starter Website',
    price: 'TT$1,500 setup',
    cadence: 'TT$150/month',
    blurb: 'Best for small businesses that need a simple online presence.',
    features: [
      '1-3 page website',
      'Mobile responsive design',
      'Contact form',
      'WhatsApp button',
      'Basic SEO setup',
      'Google Maps embed',
      'Hosting and maintenance included in monthly fee',
    ],
    cta: 'Start Website',
    href: '/start?plan=starter',
  },
  {
    name: 'Business Website',
    price: 'TT$3,500 setup',
    cadence: 'TT$250/month',
    blurb: 'Best for businesses that need a stronger website with service pages and lead generation.',
    features: [
      'Up to 6 pages',
      'Service/product sections',
      'Contact form',
      'WhatsApp integration',
      'Basic SEO',
      'Google Maps',
      'Image gallery',
      'Admin-editable content where applicable',
      'Hosting, updates, and maintenance included',
    ],
    cta: 'Build My Business Site',
    href: '/start?plan=business',
    featured: true,
  },
  {
    name: 'Shop868 Store',
    price: 'TT$2,500 setup',
    cadence: 'TT$300/month',
    blurb: 'Best for businesses that want to sell products online.',
    features: [
      'Shop868 business profile',
      'Online storefront',
      'Product catalog setup',
      'WhatsApp ordering',
      'Basic inventory/product management',
      'Customer inquiry/order flow',
      'Future TTPay integration when available',
      'Hosting and support included',
    ],
    cta: 'Launch My Store',
    href: '/start?plan=store',
  },
  {
    name: 'Premium Digital Package',
    price: 'TT$6,500 setup',
    cadence: 'TT$500/month',
    blurb: 'Best for businesses that want a complete digital system.',
    features: [
      'Full business website',
      'Shop868 storefront',
      'InvoiceTT setup',
      'Product/service catalog',
      'WhatsApp integration',
      'SEO setup',
      'Google Maps',
      'Analytics setup',
      'Monthly support',
      'Priority updates',
    ],
    cta: 'Get Full Package',
    href: '/start?plan=premium',
  },
];

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
          name: 'Sovereign Digital Group Ltd',
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
            <Link href="#pricing">
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

      <section id="pricing" className="border-b border-border py-16 md:py-24">
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

      <section id="work" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">A growing portfolio of T&amp;T platforms.</h2>
            <p className="mt-4 text-muted-foreground">Every site below is live, in production, and built by the LaunchTT team.</p>
          </div>
          <Portfolio />

          <div className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  <Sparkles className="size-3.5" /> Built with AI on the team
                </div>
                <h3 className="text-xl font-black tracking-tight md:text-2xl">Real engineers, real AI partners.</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  LaunchTT ships fast because we pair human engineering with the best AI coding tools available.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {[
                  { name: 'Claude Opus', by: 'Anthropic' },
                  { name: 'Codex', by: 'OpenAI' },
                  { name: 'MiniMax', by: 'MiniMax AI' },
                ].map((a) => (
                  <span key={a.name} className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs">
                    <Star className="size-3 text-blue-500" />
                    <span className="font-semibold">{a.name}</span>
                    <span className="text-muted-foreground">· {a.by}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
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
                <ContactRow icon={<ShieldCheck className="size-5" />} label="Trust" value="Part of Sovereign Digital Group · local digital operations" />
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function PackageCard({
  name,
  price,
  cadence,
  blurb,
  features,
  cta,
  href,
  featured,
}: {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <article className={`flex flex-col rounded-2xl border bg-card p-6 shadow-sm ${featured ? 'border-blue-500 ring-2 ring-blue-500/15' : 'border-border'}`}>
      <p className={`text-sm font-bold uppercase tracking-wider ${featured ? 'text-blue-600' : 'text-muted-foreground'}`}>{name}</p>
      <p className="mt-2 text-4xl font-black">{price}</p>
      <p className="mt-1 text-sm text-muted-foreground">{cadence}</p>
      <p className="mt-4 text-sm text-muted-foreground">{blurb}</p>
      <ul className="mt-5 space-y-2 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-green-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={href} className="mt-6">
        <Button className="w-full" variant={featured ? 'default' : 'outline'}>{cta}</Button>
      </Link>
    </article>
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
