import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Banknote,
  Clock,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { buildFaqJsonLd } from '@/lib/seo/launchtt-pages';

const SITE_URL = 'https://launchtt.com';
const TITLE = 'Drive with LaunchTT | Earn on Grouped Deliveries in Trinidad and Tobago';
const DESC =
  'Drive part-time or full-time with the SOV delivery network. Commission-based pay, grouped deliveries kept to safer areas, flexible hours, and weekly payouts in Trinidad and Tobago.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/drive' },
  openGraph: {
    title: TITLE,
    description: DESC,
    type: 'website',
    url: `${SITE_URL}/drive`,
    locale: 'en_TT',
    siteName: 'LaunchTT',
  },
};

const HIGHLIGHTS = [
  {
    icon: Banknote,
    title: 'Commission on every drop',
    body: 'You earn a percentage of each delivery you complete. The more drops you bundle into a single run, the more you make per hour on the road.',
  },
  {
    icon: Package,
    title: 'Grouped deliveries',
    body: 'We batch nearby orders into one route so you are not crossing the island for a single drop. Less fuel, less time, more pay per trip.',
  },
  {
    icon: MapPin,
    title: 'Safer areas only',
    body: 'Routes stay inside vetted neighborhoods. We do not push drivers into high-risk zones because your safety is part of dispatch.',
  },
  {
    icon: Clock,
    title: 'Flexible hours',
    body: 'Pick your shifts. Drive lunch rush, drive evenings, or drive weekends around school, another job, or family.',
  },
];

const HOW_IT_WORKS = [
  { n: 1, t: 'Apply', d: 'Fill out the driver form. It takes about 5 minutes for your name, vehicle, area, and contact details.' },
  { n: 2, t: 'KYC and vehicle check', d: 'We verify your ID and that the vehicle is roadworthy and insured. Approval is often same day.' },
  { n: 3, t: 'Get matched', d: 'Once approved, we send grouped delivery runs in your area. Accept what fits your schedule.' },
  { n: 4, t: 'Get paid', d: 'Payouts go to your bank weekly, with tips and bonuses on top of base commission.' },
];

const FAQ = [
  {
    q: 'Who can drive?',
    a: 'Anyone 21 or older with a valid Trinidad and Tobago driver permit, a vehicle in good condition, and current insurance. Motorbikes are accepted for select routes.',
  },
  {
    q: 'How much can I make?',
    a: 'Commission per delivery plus tips. Grouped routes are designed to help drivers earn more per hour than single-drop runs.',
  },
  {
    q: 'Is it really commission only?',
    a: 'Yes. You keep a percentage of each completed drop. Grouping deliveries is part of how we help that model stay worthwhile.',
  },
  {
    q: 'What if a stop is in a risky area?',
    a: 'Dispatch will not assign it to you. We use local safety feedback and route rules so drivers are not pushed into flagged zones.',
  },
  {
    q: 'When do I get paid?',
    a: 'Weekly direct deposit to local bank accounts, with a statement showing each drop, tip, and bonus.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/drive#service`,
      name: 'LaunchTT Delivery Driver Program',
      serviceType: 'Driver onboarding and delivery network participation',
      description: DESC,
      provider: {
        '@type': 'Organization',
        name: 'LaunchTT',
        url: SITE_URL,
      },
      areaServed: { '@type': 'Country', name: 'Trinidad and Tobago' },
    },
    buildFaqJsonLd(FAQ),
  ],
};

export default function DrivePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mb-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-300">
          Driver program
        </p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Drive grouped routes.
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Stay in safer areas. Get paid weekly.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          LaunchTT runs the delivery layer for the SOV network. We bundle orders so you are not chasing
          single drops, and we keep routes inside vetted neighborhoods where possible.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/join/driver">
            <Button size="lg" className="gap-2">
              Apply to drive <ArrowRight className="size-4" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg">How it works</Button>
          </a>
        </div>
      </section>

      <section className="mb-14 grid gap-4 md:grid-cols-2">
        {HIGHLIGHTS.map((highlight) => {
          const Icon = highlight.icon;
          return (
            <div key={highlight.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/15 to-cyan-500/15 text-blue-600 dark:text-cyan-300">
                <Icon className="size-5" />
              </div>
              <h2 className="text-lg font-bold">{highlight.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{highlight.body}</p>
            </div>
          );
        })}
      </section>

      <section id="how-it-works" className="mb-14">
        <h2 className="mb-1 text-3xl font-black tracking-tight md:text-4xl">How it works</h2>
        <p className="mb-6 text-muted-foreground">Four steps to your first paid run.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.n} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-2 flex size-7 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                {step.n}
              </div>
              <h3 className="text-base font-bold">{step.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border border-border bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-6 md:p-8">
        <div className="grid items-start gap-5 md:grid-cols-[auto_1fr]">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-600/15 text-blue-600 dark:text-cyan-300">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Safety is part of dispatch</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We use local safety feedback and route rules to reduce risky assignments. If you ever feel unsafe
              at a pickup or drop, you should be able to abort and contact dispatch without pressure.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-cyan-500" />
                <span>Vetted neighborhoods only where possible.</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="mt-0.5 size-4 shrink-0 text-cyan-500" />
                <span>Driver community feedback to flag issues quickly.</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-cyan-500" />
                <span>Time-aware routing instead of pushing late risky runs.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 text-3xl font-black tracking-tight md:text-4xl">Common questions</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <details key={item.q} className="rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer text-left text-base font-bold">{item.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 p-8 text-center">
        <h2 className="text-3xl font-black tracking-tight md:text-4xl">Ready to start?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          The driver form takes about 5 minutes. Same-day approval is possible in many cases, and you can be
          on dispatch quickly once your documents are in order.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/join/driver">
            <Button size="lg" className="gap-2">
              Apply to drive <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/services/business-launch">
            <Button variant="outline" size="lg">See LaunchTT for businesses</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
