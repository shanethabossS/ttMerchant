import type { Metadata } from 'next';
import Link from 'next/link';
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
import { Button } from '@/components/ui/button';

const SITE_URL = 'https://launchtt.com';
const TITLE = 'LaunchTT | Website Design, Online Ordering and Business Setup in Trinidad and Tobago';
const DESCRIPTION =
  'LaunchTT helps Trinidad and Tobago businesses get online with websites, online ordering, bookings, invoicing, WhatsApp integration, SEO, and done-for-you launch support.';

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
  { icon: ClipboardList, title: 'Business setup support', desc: 'We collect your info once, then structure your launch across the SOV ecosystem for you.' },
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
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeStatusStrip />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-blue-50 via-background to-cyan-50 dark:from-blue-950/30 dark:via-background dark:to-cyan-950/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Rocket className="size-3.5" />
            Done-for-you online launch for Trinidad and Tobago
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            We launch your business{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              online the right way
            </span>
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            LaunchTT is built for Trinidad and Tobago business owners who need a proper website, online ordering,
            bookings, payments, and support without learning five different tools first.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="gap-2 text-base">
                <Rocket className="size-5" />
                Start my launch
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="gap-2 text-base">
                See pricing
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            No credit card. Free quote in 24 hours. WhatsApp{' '}
            <a className="font-bold text-blue-600 hover:underline" href="https://wa.me/18685550199">
              +1 (868) 555-0199
            </a>
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-primary md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">Everything you need to launch</h2>
          <p className="mt-3 text-base text-muted-foreground">
            One path, one team, and the core systems most local businesses need to get online and stay organized.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {includedFeatures.map((feature) => (
            <div key={feature.title} className="group rounded-2xl border border-border bg-card p-5 transition hover:border-blue-300 hover:shadow-md dark:hover:border-blue-700">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  <feature.icon className="size-5" />
                </div>
                <CheckCircle2 className="ml-auto size-5 text-green-600" />
              </div>
              <h3 className="text-base font-bold">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:py-18">
          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Who we help in Trinidad and Tobago</h2>
            <p className="mt-3 text-base text-muted-foreground">
              LaunchTT is especially useful for local businesses that need to move fast online without building an
              in-house tech team first.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {businessTypes.map((type) => (
                <div key={type} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold">
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Areas we serve</h2>
            <p className="mt-3 text-base text-muted-foreground">
              We work with businesses across the country, from one-person operations to growing teams.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              If you are searching for website design in Trinidad, online ordering in Trinidad and Tobago, or help getting
              your business online, this is exactly what LaunchTT is built for.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-gradient-to-b from-muted/30 to-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
              <Sparkles className="size-3.5" />
              Concierge service
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">We handle the digital setup for you</h2>
            <p className="mt-3 text-base text-muted-foreground">
              The goal is to get you live quickly without making you become your own web team first.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {conciergeServices.map((service) => (
              <article key={service.title} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <service.icon className="size-6" />
                </div>
                <h3 className="text-lg font-black">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Also available</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Need delivery help too? Our separate{' '}
              <Link href="/drive" className="font-semibold text-blue-600 hover:underline dark:text-cyan-300">
                Delivery Service
              </Link>{' '}
              page explains the driver network, grouped drops, and commission model.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">How it works</h2>
          <p className="mt-3 text-base text-muted-foreground">From account setup to live launch in a clear, guided flow.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="text-5xl font-black text-blue-200 dark:text-blue-900">{step.num}</span>
              <h3 className="mt-3 text-base font-black">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-y border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Simple, local pricing</h2>
            <p className="mt-3 text-base text-muted-foreground">
              Flexible packages for businesses at different launch stages.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Starter</p>
              <p className="mt-2 text-4xl font-black">$199<span className="text-base font-medium text-muted-foreground"> TTD</span></p>
              <p className="mt-1 text-sm text-muted-foreground">One-time setup</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> SOV ecosystem signups and listings</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> WhatsApp setup</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Basic SEO foundations</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> One revision round</li>
              </ul>
              <Link href="/start?plan=starter" className="mt-6">
                <Button variant="outline" className="w-full">Start with Starter</Button>
              </Link>
            </div>

            <div className="relative flex flex-col rounded-2xl border-2 border-blue-500 bg-card p-6 shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">Most popular</span>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Pro</p>
              <p className="mt-2 text-4xl font-black">$499<span className="text-base font-medium text-muted-foreground"> TTD</span></p>
              <p className="mt-1 text-sm text-muted-foreground">Setup plus 3 months management</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Everything in Starter</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Custom website and online ordering</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Booking system and invoice tools</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> AI assistant setup</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Ongoing menu and listing support</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Priority WhatsApp support</li>
              </ul>
              <Link href="/start?plan=pro" className="mt-6">
                <Button className="w-full gap-2">
                  Start with Pro <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Concierge</p>
              <p className="mt-2 text-4xl font-black">$1,499<span className="text-base font-medium text-muted-foreground"> TTD</span></p>
              <p className="mt-1 text-sm text-muted-foreground">Setup plus 6 months support</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Everything in Pro</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Monthly content updates</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Review and messaging guidance</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Dedicated account support</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Priority launch revisions</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Multi-platform rollout help</li>
              </ul>
              <Link href="/start?plan=concierge" className="mt-6">
                <Button variant="outline" className="w-full">Talk to us</Button>
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Custom needs?{' '}
            <a href="https://wa.me/18685550199" className="font-bold text-blue-600 hover:underline">
              WhatsApp us
            </a>{' '}
            for a tailored quote.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 md:py-18">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Questions local businesses usually ask</h2>
            <p className="mt-3 text-base text-muted-foreground">
              Short answers for the most common Trinidad-focused search questions around websites, ordering, and launch support.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            {seoFaq.map((item) => (
              <details key={item.q} className="rounded-2xl border border-border bg-card p-5">
                <summary className="cursor-pointer text-left text-base font-bold">{item.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-16 text-center md:py-24">
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Rocket className="size-8" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-black tracking-tight md:text-5xl">Ready to launch?</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          The setup starts with a simple signup, then we guide you into the right LaunchTT flow for your business.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/signup">
            <Button size="lg" className="gap-2 text-base">
              <Zap className="size-5" />
              Start now
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <a href="https://wa.me/18685550199" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="gap-2 text-base">
              <MessageCircle className="size-5" />
              WhatsApp instead
            </Button>
          </a>
        </div>
        <p className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="ml-1">Trusted by local businesses across Trinidad and Tobago</span>
        </p>
      </section>
    </div>
  );
}
