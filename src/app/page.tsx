import type { Metadata } from 'next';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Globe,
  MessageCircle,
  Receipt,
  Rocket,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  Utensils,
  Zap,
} from 'lucide-react';
import { HomeStatusStrip } from '@/components/home/HomeStatusStrip';
import { RevealOnScroll } from '@/components/home/RevealOnScroll';
import { Button } from '@/components/ui/button';
import { supportWhatsAppUrl } from '@/lib/contact';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const SITE_URL = 'https://launchtt.com';
const TITLE = 'LaunchTT | Website Design, Online Ordering and Business Setup in Trinidad and Tobago';
const DESCRIPTION =
  'LaunchTT helps Trinidad & Tobago businesses get online, sell better, and manage their digital presence without hiring an expensive agency.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  keywords: [
    'website design Trinidad',
    'website design Trinidad and Tobago',
    'small business website Trinidad',
    'online store Trinidad',
    'food ordering website Trinidad',
    'booking website Trinidad',
    'business launch Trinidad',
    'digital services Trinidad',
    'get my business online Trinidad',
    'WhatsApp ordering Trinidad',
    'invoice system Trinidad',
    'SEO services Trinidad',
    'website for restaurant Trinidad',
    'website for salon Trinidad',
    'website for mechanic Trinidad',
    'website for contractor Trinidad',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    locale: 'en_TT',
    siteName: 'LaunchTT',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const includedFeatures = [
  { icon: Globe, title: 'Website', desc: 'Branded online presence built for mobile, search, and trust from day one.' },
  { icon: ShoppingBag, title: 'Online ordering', desc: 'Menus, products, and order flows configured so customers can buy without confusion.' },
  { icon: Receipt, title: 'Invoice system', desc: 'Professional invoices, payment tracking, and follow-up support in one place.' },
  { icon: Calendar, title: 'Booking system', desc: 'Appointments and service requests organized without the WhatsApp scramble.' },
  { icon: Bot, title: 'AI assistant', desc: 'Answers basic questions, captures leads, and keeps your business responsive after hours.' },
  { icon: MessageCircle, title: 'WhatsApp integration', desc: 'Bring inquiries and orders into the channel your customers already use.' },
  { icon: CreditCard, title: 'Payments', desc: 'Card and transfer-ready checkout guidance built into your launch plan.' },
  { icon: Search, title: 'SEO setup', desc: 'Show up when nearby customers search for the work you do.' },
];

const conciergeServices = [
  { icon: ClipboardList, title: 'Business setup support', desc: 'We collect your info once, then structure your launch across the SOV ecosystem for you.', featured: true },
  { icon: Utensils, title: 'Menu and catalog updates', desc: 'Need changes later? Send the update once and we roll it across the places your customers see.' },
  { icon: Sparkles, title: 'Launch polish', desc: 'Photos, descriptions, offers, hours, and call-to-action cleanup before you go live.' },
  { icon: Users, title: 'Customer handling guidance', desc: 'Simple coaching for WhatsApp replies, reviews, and converting curious visitors into paying customers.' },
];

const steps = [
  { num: '01', title: 'Create your account', desc: 'Pick personal or business, choose your structure, and get the right onboarding path.' },
  { num: '02', title: 'Tell us about the business', desc: 'Share your services, photos, contact info, and launch goals in one intake flow.' },
  { num: '03', title: 'We build the launch', desc: 'Our team prepares your site, listings, ordering setup, and launch assets for review.' },
  { num: '04', title: 'Approve and go live', desc: 'You review, we refine, and then your business launches with ongoing support options.' },
];

const stats = [
  { value: '48hr', label: 'Average first response' },
  { value: '$0', label: 'To get a quote' },
  { value: '10+', label: 'Connected platforms' },
  { value: 'Done', label: 'For you' },
];

const businessTypes = [
  'Restaurants and food vendors',
  'Salons and barbers',
  'Mechanics and auto services',
  'Contractors and tradesmen',
  'Small shops and online sellers',
  'Consultants and service professionals',
];

const serviceAreas = [
  'Port of Spain',
  'San Fernando',
  'Chaguanas',
  'Arima',
  'Point Fortin',
  'Tunapuna',
  'Tobago',
];

const seoFaq = [
  {
    q: 'Can LaunchTT build a website for a Trinidad small business?',
    a: 'Yes. LaunchTT is built for Trinidad and Tobago businesses that need a professional website, online ordering, bookings, and launch support without managing the tech themselves.',
  },
  {
    q: 'Does LaunchTT help restaurants and food businesses in Trinidad?',
    a: 'Yes. We support restaurants, food vendors, and caterers with menu setup, online ordering, WhatsApp integration, and launch support.',
  },
  {
    q: 'What areas does LaunchTT serve?',
    a: 'We work with businesses across Trinidad and Tobago, including Port of Spain, San Fernando, Chaguanas, Arima, Point Fortin, Tunapuna, and Tobago.',
  },
  {
    q: 'Can LaunchTT help get my business found on Google in Trinidad?',
    a: 'Yes. We include search-friendly page structure, metadata, indexing basics, and local business content so your business has a stronger chance of being discovered online.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#launch-service`,
      name: 'LaunchTT Business Setup Services',
      serviceType: 'Website design, online ordering, business setup, SEO, bookings, invoicing',
      description: DESCRIPTION,
      provider: {
        '@type': 'Organization',
        name: 'LaunchTT',
        url: SITE_URL,
      },
      areaServed: serviceAreas.map((area) => ({
        '@type': 'AdministrativeArea',
        name: area,
      })),
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Small businesses in Trinidad and Tobago',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: seoFaq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <div className={`${fraunces.variable} flex flex-col`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeStatusStrip />

      {/* ── Hero — asymmetric, left-set headline + browser mock, no gradient wash ── */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="pointer-events-none absolute -top-24 -right-32 size-[26rem] rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] blur-3xl" />
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <p className="lt-kicker">Done-for-you online launch, built in Trinidad &amp; Tobago</p>
            <h1 className="lt-serif mt-5 max-w-2xl text-[2.75rem] font-semibold leading-[1.03] tracking-tight md:text-6xl lg:text-[4rem]">
              Get your business <span className="lt-hl">online</span>&nbsp;— website, store, invoicing, and support.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              LaunchTT helps Trinidad &amp; Tobago businesses get online, sell better, and manage their digital
              presence without hiring an expensive agency.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup">
                <Button size="lg" className="h-12 gap-2 rounded-md px-6 text-base">
                  <Rocket className="size-5" />
                  Start my launch
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button size="lg" variant="outline" className="h-12 rounded-md px-6 text-base">
                  See pricing
                </Button>
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              No credit card. Free quote in 24 hours.{' '}
              <a className="font-semibold text-foreground underline decoration-[color:var(--accent)] decoration-2 underline-offset-4" href="mailto:info@sovdigitalgroup.com">
                info@sovdigitalgroup.com
              </a>
            </p>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end">
            <div className="lt-browser mx-auto max-w-sm rounded-lg lg:mr-0 lg:ml-auto">
              <div className="lt-browser-bar">
                <span className="lt-browser-dot" />
                <span className="lt-browser-dot" />
                <span className="lt-browser-dot" />
                <span className="ml-2 flex-1 truncate rounded-sm bg-background px-2.5 py-1 text-[0.7rem] text-muted-foreground">
                  yourbusiness.tt
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div className="h-3 w-2/3 rounded-full bg-[color-mix(in_oklab,var(--accent)_30%,var(--muted))]" />
                <div className="h-2 w-full rounded-full bg-muted" />
                <div className="h-2 w-5/6 rounded-full bg-muted" />
                <div className="mt-4 h-24 rounded-md border border-border bg-muted/60" />
                <div className="flex gap-2 pt-1">
                  <div className="h-7 w-20 rounded-sm bg-primary" />
                  <div className="h-7 w-20 rounded-sm border border-border" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card px-4 py-3">
                    <p className="lt-serif text-xl font-semibold tabular-nums">{stat.value}</p>
                    <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lt-fretwork" />
      </section>

      {/* ── Everything you need — editorial index list, not a card grid ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="lt-kicker">The full launch stack</p>
            <h2 className="lt-serif mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Everything you need to launch
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              One path, one team, and the core systems most local businesses need to get online and stay organized.
            </p>
          </div>
          <div className="border-t border-border sm:grid sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
            {includedFeatures.map((feature, i) => (
              <RevealOnScroll key={feature.title} delay={(i % 4) * 70}>
                <div className="group flex items-start gap-4 border-b border-border py-6">
                  <span className="lt-index shrink-0 text-3xl font-bold leading-none md:text-4xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <feature.icon className="size-4 text-[color:var(--accent-foreground)] opacity-70" style={{ color: 'color-mix(in oklab, var(--accent) 75%, var(--foreground))' }} />
                      <h3 className="text-base font-semibold">{feature.title}</h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who we help / Areas we serve — split, fretwork rule between ── */}
      <section className="border-y border-border bg-muted/25">
        <div className="lt-fretwork" />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:gap-16 md:py-20">
          <div>
            <h2 className="lt-serif text-3xl font-semibold tracking-tight md:text-4xl">Who we help in Trinidad and Tobago</h2>
            <p className="mt-3 text-base text-muted-foreground">
              LaunchTT is especially useful for local businesses that need to move fast online without building an
              in-house tech team first.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {businessTypes.map((type) => (
                <div key={type} className="rounded-sm border border-border bg-card px-4 py-3 text-sm font-medium">
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="lt-serif text-3xl font-semibold tracking-tight md:text-4xl">Areas we serve</h2>
            <p className="mt-3 text-base text-muted-foreground">
              We work with businesses across the country, from one-person operations to growing teams.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-sm border border-border bg-card px-3 py-1.5 text-sm font-semibold"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              If you are searching for website design in Trinidad, online ordering in Trinidad and Tobago, or help getting
              your business online, this is exactly what LaunchTT is built for.
            </p>
          </div>
        </div>
      </section>

      {/* ── Concierge — first card featured/wider to break the uniform grid ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="lt-kicker">Concierge service</p>
          <h2 className="lt-serif mt-4 text-3xl font-semibold tracking-tight md:text-4xl">We handle the digital setup for you</h2>
          <p className="mt-3 text-base text-muted-foreground">
            The goal is to get you live quickly without making you become your own web team first.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {conciergeServices.map((service, i) => (
            <RevealOnScroll key={service.title} delay={i * 80} className={service.featured ? 'lg:col-span-2' : ''}>
              <article className={`lt-card flex h-full flex-col rounded-md p-6 ${service.featured ? 'bg-primary text-primary-foreground' : ''}`}>
                <div
                  className={`mb-4 flex size-11 items-center justify-center rounded-sm border ${
                    service.featured ? 'border-primary-foreground/25' : 'border-border'
                  }`}
                >
                  <service.icon className="size-5" style={!service.featured ? { color: 'color-mix(in oklab, var(--accent) 80%, var(--foreground))' } : undefined} />
                </div>
                <h3 className="lt-serif text-lg font-semibold">{service.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${service.featured ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                  {service.desc}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-md border border-border bg-muted/40 p-5">
          <Sparkles className="size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Also available.</span> Need delivery help too? Our separate{' '}
            <Link href="/drive" className="font-semibold text-foreground underline decoration-[color:var(--accent)] decoration-2 underline-offset-4">
              Delivery Service
            </Link>{' '}
            page explains the driver network, grouped drops, and commission model.
          </p>
        </div>
      </section>

      {/* ── How it works — numbered rail, offset rhythm ── */}
      <section className="border-y border-border bg-muted/25">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="lt-kicker">Four steps</p>
            <h2 className="lt-serif mt-4 text-3xl font-semibold tracking-tight md:text-4xl">How it works</h2>
            <p className="mt-3 text-base text-muted-foreground">From account setup to live launch in a clear, guided flow.</p>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <RevealOnScroll key={step.num} delay={i * 90} className={i % 2 === 1 ? 'lg:mt-8' : ''}>
                <div className="relative border-t-2 border-foreground pt-4">
                  <span className="lt-index block text-5xl font-bold leading-none">{step.num}</span>
                  <h3 className="lt-serif mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing — one featured plan lifted, others quieter, real legible numbers ── */}
      <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="lt-kicker">Simple, local pricing</p>
          <h2 className="lt-serif mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Choose your launch plan</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Clear setup pricing plus monthly hosting, maintenance, updates, and support.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4 lg:items-start">
          <div className="lt-card flex flex-col rounded-md p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Starter Website</p>
            <p className="lt-serif mt-3 text-4xl font-semibold tabular-nums">TT$1,500</p>
            <p className="mt-1 text-sm text-muted-foreground">Setup + TT$150/month</p>
            <p className="mt-4 text-sm text-muted-foreground">Best for: small businesses that need a simple online presence.</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> 1-3 page website</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Mobile responsive design</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Contact form</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> WhatsApp button</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Basic SEO setup</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Google Maps embed</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Hosting and maintenance included in monthly fee</li>
            </ul>
            <Link href="/start?plan=starter" className="mt-6">
              <Button variant="outline" className="w-full rounded-sm">Start Website</Button>
            </Link>
          </div>

          <div className="lt-featured relative flex flex-col rounded-md bg-card p-6 lg:-translate-y-4">
            <span className="absolute -top-3 left-6 rounded-sm bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
              Most popular
            </span>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Business Website</p>
            <p className="lt-serif mt-3 text-4xl font-semibold tabular-nums">TT$3,500</p>
            <p className="mt-1 text-sm text-muted-foreground">Setup + TT$250/month</p>
            <p className="mt-4 text-sm text-muted-foreground">Best for: businesses that need a stronger website with service pages and lead generation.</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Up to 6 pages</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Service/product sections</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Contact form</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> WhatsApp integration</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Basic SEO</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Google Maps</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Image gallery</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Admin-editable content where applicable</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Hosting, updates, and maintenance included</li>
            </ul>
            <Link href="/start?plan=business" className="mt-6">
              <Button className="w-full gap-2 rounded-sm">
                Build My Business Site <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="lt-card flex flex-col rounded-md p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Shop868 Store</p>
            <p className="lt-serif mt-3 text-4xl font-semibold tabular-nums">TT$2,500</p>
            <p className="mt-1 text-sm text-muted-foreground">Setup + TT$300/month</p>
            <p className="mt-4 text-sm text-muted-foreground">Best for: businesses that want to sell products online.</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Shop868 business profile</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Online storefront</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Product catalog setup</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> WhatsApp ordering</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Basic inventory/product management</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Customer inquiry/order flow</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Future TTPay integration when available</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Hosting and support included</li>
            </ul>
            <Link href="/start?plan=store" className="mt-6">
              <Button variant="outline" className="w-full rounded-sm">Launch My Store</Button>
            </Link>
          </div>

          <div className="lt-card flex flex-col rounded-md p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Premium Digital Package</p>
            <p className="lt-serif mt-3 text-4xl font-semibold tabular-nums">TT$6,500</p>
            <p className="mt-1 text-sm text-muted-foreground">Setup + TT$500/month</p>
            <p className="mt-4 text-sm text-muted-foreground">Best for: businesses that want a complete digital system.</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Full business website</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Shop868 storefront</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> InvoiceTT setup</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Product/service catalog</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> WhatsApp integration</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> SEO setup</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Google Maps</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Analytics setup</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Monthly support</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-muted-foreground" /> Priority updates</li>
            </ul>
            <Link href="/start?plan=premium" className="mt-6">
              <Button variant="outline" className="w-full rounded-sm">Get Full Package</Button>
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Monthly fee covers hosting, maintenance, updates, and support. Custom features, large product uploads, payment gateway setup, booking systems, and advanced integrations may require a separate quote.
        </p>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Custom needs?{' '}
          <a href={supportWhatsAppUrl('Hi LaunchTT — I have a custom project and need a tailored quote.')} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline decoration-[color:var(--accent)] decoration-2 underline-offset-4">
            WhatsApp us
          </a>{' '}
          for a tailored quote.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-border bg-muted/25">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="lt-kicker">FAQ</p>
            <h2 className="lt-serif mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Questions local businesses usually ask</h2>
            <p className="mt-3 text-base text-muted-foreground">
              Short answers for the most common Trinidad-focused search questions around websites, ordering, and launch support.
            </p>
          </div>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {seoFaq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold">
                  {item.q}
                  <span className="shrink-0 text-lg text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA — inverted ink/paper block, always high contrast ── */}
      <section className="bg-foreground text-background">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center md:py-24">
          <div className="flex justify-center">
            <div className="flex size-14 items-center justify-center rounded-md border border-background/20">
              <Rocket className="size-7" style={{ color: 'var(--accent)' }} />
            </div>
          </div>
          <h2 className="lt-serif mt-6 text-3xl font-semibold tracking-tight md:text-5xl">Ready to launch?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-background/75">
            The setup starts with a simple signup, then we guide you into the right LaunchTT flow for your business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="h-12 gap-2 rounded-md bg-background px-6 text-base text-foreground hover:bg-background/90">
                <Zap className="size-5" />
                Start now
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <a href={supportWhatsAppUrl('Hi LaunchTT — I would like to get my business online.')} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-12 gap-2 rounded-md border-background/30 bg-transparent px-6 text-base text-background hover:bg-background/10">
                <MessageCircle className="size-5" />
                WhatsApp instead
              </Button>
            </a>
          </div>
          <p className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-background/70">
            <Star className="size-3.5 fill-current" style={{ color: 'var(--accent)' }} />
            <Star className="size-3.5 fill-current" style={{ color: 'var(--accent)' }} />
            <Star className="size-3.5 fill-current" style={{ color: 'var(--accent)' }} />
            <Star className="size-3.5 fill-current" style={{ color: 'var(--accent)' }} />
            <Star className="size-3.5 fill-current" style={{ color: 'var(--accent)' }} />
            <span className="ml-1">Trusted by local businesses across Trinidad and Tobago</span>
          </p>
        </div>
      </section>
    </div>
  );
}
