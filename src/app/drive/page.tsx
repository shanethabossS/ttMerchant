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

const SITE_URL = 'https://launchtt.com';
const TITLE = 'Drive with LaunchTT — Earn on Grouped Deliveries | LaunchTT';
const DESC =
  'Drive part-time or full-time with the SOV delivery network. Commission-based pay, grouped deliveries kept to safe areas, flexible hours. Sign up in 5 minutes.';

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
    body: 'We batch nearby orders into one route so you’re not crossing the island for a single drop. Less fuel, less time, more pay per trip.',
  },
  {
    icon: MapPin,
    title: 'Safe areas only',
    body: 'Routes stay inside vetted neighbourhoods. We do not push drivers into high-risk zones — your safety is part of dispatch.',
  },
  {
    icon: Clock,
    title: 'Flexible hours',
    body: 'Pick your shifts. Drive lunch rush, drive evenings, drive weekends — work around school, a day job, or family.',
  },
];

const HOW_IT_WORKS = [
  { n: 1, t: 'Apply', d: 'Fill out the driver form below. Takes about 5 minutes — name, vehicle, area, contact.' },
  { n: 2, t: 'KYC + vehicle check', d: 'We verify your ID and that the vehicle is roadworthy and insured. Usually same-day approval.' },
  { n: 3, t: 'Get matched', d: 'Once approved, we send you grouped delivery runs in your area. Accept what fits your schedule.' },
  { n: 4, t: 'Get paid', d: 'Payouts go to your bank weekly. Tips and bonuses on top of base commission.' },
];

const FAQ = [
  {
    q: 'Who can drive?',
    a: 'Anyone 21+ with a valid TT driver’s permit, a vehicle (car, SUV, or van) in good condition, and current insurance. Motorbikes accepted for select routes.',
  },
  {
    q: 'How much can I make?',
    a: 'Commission per delivery plus tips. A driver running grouped routes during peak hours typically earns more than single-drop apps — exact rates are shared during onboarding.',
  },
  {
    q: 'Is it really commission only?',
    a: 'Yes — you keep a percentage of each completed drop. No base hourly wage. Grouping deliveries is how we make sure per-hour earnings stay strong.',
  },
  {
    q: 'What if a stop is in a risky area?',
    a: 'Dispatch will not assign it to you. We use known unsafe-zone lists from TTPS bulletins and driver feedback. If you ever feel unsafe at a pickup or drop, abort and call dispatch — no penalty.',
  },
  {
    q: 'Do I need to buy anything?',
    a: 'A working phone with mobile data, and an insulated bag for hot/cold food deliveries. We can supply the bag at cost once you’re approved.',
  },
  {
    q: 'When do I get paid?',
    a: 'Weekly direct deposit to RBC, Republic, FCB, Scotia, or First Citizens accounts. Statement shows every drop, tip, and bonus.',
  },
];

export default function DrivePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 md:py-16">
      {/* Hero */}
      <section className="mb-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-300">
          Driver program
        </p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Drive grouped routes.
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Stay in safe areas. Get paid weekly.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          LaunchTT runs the delivery layer for the SOV network — FoodsTT orders, DealzTT pickups,
          TTClassifieds drop-offs, and more. We bundle orders so you’re not chasing single drops, and
          we keep routes inside vetted neighbourhoods.
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

      {/* Highlights grid */}
      <section className="mb-14 grid gap-4 md:grid-cols-2">
        {HIGHLIGHTS.map((h) => {
          const Icon = h.icon;
          return (
            <div
              key={h.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/15 to-cyan-500/15 text-blue-600 dark:text-cyan-300">
                <Icon className="size-5" />
              </div>
              <h3 className="text-lg font-bold">{h.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
            </div>
          );
        })}
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mb-14">
        <h2 className="mb-1 text-3xl font-black tracking-tight md:text-4xl">How it works</h2>
        <p className="mb-6 text-muted-foreground">Four steps to your first paid run.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {HOW_IT_WORKS.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-2 flex size-7 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                {s.n}
              </div>
              <h4 className="text-base font-bold">{s.t}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safe-area & community */}
      <section className="mb-14 rounded-2xl border border-border bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-6 md:p-8">
        <div className="grid items-start gap-5 md:grid-cols-[auto_1fr]">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-600/15 text-blue-600 dark:text-cyan-300">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Safety is part of dispatch</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We use known unsafe-zone lists from TTPS bulletins and from driver feedback. Routes
              that pass through flagged areas are not pushed to drivers automatically. If you ever
              feel unsafe at a pickup or drop, abort and call dispatch — no penalty, no rating hit.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-cyan-500" />
                <span>Vetted neighbourhoods only.</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="mt-0.5 size-4 shrink-0 text-cyan-500" />
                <span>Driver community channel — share tips, flag spots, get help fast.</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-cyan-500" />
                <span>Curfew-aware routing — late-night runs only in areas that stay safe at that hour.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="mb-6 text-3xl font-black tracking-tight md:text-4xl">Common questions</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-xl border border-border bg-card p-5">
              <h4 className="text-base font-bold">{item.q}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 p-8 text-center">
        <h2 className="text-3xl font-black tracking-tight md:text-4xl">Ready to start?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          The driver form takes about 5 minutes. Same-day approval in most cases. You’ll be on
          dispatch within 48 hours of submitting your ID and vehicle docs.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/join/driver">
            <Button size="lg" className="gap-2">
              Apply to drive <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/web-design">
            <Button variant="outline" size="lg">See LaunchTT for businesses</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
