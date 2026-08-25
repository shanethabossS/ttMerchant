import type { Metadata } from 'next';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardList,
  Clock,
  CreditCard,
  Gift,
  Image as ImageIcon,
  MapPin,
  Play,
  QrCode,
  Receipt,
  Store,
  Timer,
  Utensils,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import RestaurantApplyForm from '@/components/food/RestaurantApplyForm';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

const SITE_URL = 'https://launchtt.com';
const TITLE = 'Join FoodSTT | Online Ordering for Trinidad & Tobago Restaurants';
const DESCRIPTION =
  'FoodSTT is onboarding 20 founding restaurants in Trinidad & Tobago. 60 days free, then TT$200/month or TT$1,800/year. Your own ordering page, prep timers, and QR pickup. Apply now.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/food' },
  keywords: [
    'restaurant online ordering Trinidad',
    'food delivery Trinidad and Tobago',
    'FoodSTT',
    'sell food online Trinidad',
    'restaurant app Trinidad',
    'takeaway ordering Trinidad',
    'QR pickup Trinidad',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: `${SITE_URL}/food`,
    locale: 'en_TT',
    siteName: 'LaunchTT',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const included = [
  { icon: Store, title: 'Your own ordering page', desc: 'A branded FoodSTT profile with your menu, photos, hours, and location — no app for customers to download.' },
  { icon: Receipt, title: 'Order requests, organised', desc: 'Every order lands in one clean dashboard. Accept, prep, and mark ready without WhatsApp chaos.' },
  { icon: Timer, title: 'Live prep timer', desc: 'Set how long each order takes. Customers see a countdown, so fewer “is it ready?” calls.' },
  { icon: QrCode, title: 'QR pickup', desc: 'Customers show a code, you scan, order handed over. Simple, fast, no mix-ups.' },
  { icon: CreditCard, title: 'Card & wallet payments', desc: 'Take payment online through the SOV payment rails, or keep cash-on-pickup — your choice.' },
  { icon: BadgeCheck, title: 'Founding-restaurant badge', desc: 'Be one of the first 20. Featured placement and a “founding restaurant” badge on your profile.' },
];

const orderSteps = [
  { icon: Utensils, title: 'Customer browses your menu', desc: 'They open your FoodSTT page, pick items, and choose delivery or pickup.' },
  { icon: Receipt, title: 'Order request hits your dashboard', desc: 'You get the order instantly. Accept it and the prep timer starts.' },
  { icon: Timer, title: 'You prep — they watch the countdown', desc: 'The customer sees a live timer instead of guessing or calling.' },
  { icon: QrCode, title: 'QR pickup / handoff', desc: 'Scan the customer’s code (or send it out for delivery) and you’re done.' },
];

const uploadList = [
  { icon: ImageIcon, label: 'Your logo' },
  { icon: Camera, label: '3–6 clear food photos' },
  { icon: ClipboardList, label: 'Your menu with prices' },
  { icon: Clock, label: 'Opening hours' },
  { icon: MapPin, label: 'Location / delivery areas' },
  { icon: CreditCard, label: 'How you want to get paid' },
];

const faqs = [
  {
    q: 'What does it cost?',
    a: 'Your first 60 days are completely free. After that it’s TT$200/month, or TT$1,800/year if you pay yearly (that’s 3 months free). No setup fee for founding restaurants.',
  },
  {
    q: 'Do my customers need an app?',
    a: 'No. Customers order straight from your FoodSTT page in any browser. You get the dashboard; they just tap and order.',
  },
  {
    q: 'What do I need to get started?',
    a: 'Your logo, a few food photos, your menu with prices, hours, location, and how you’d like to get paid. We help you set the rest up.',
  },
  {
    q: 'What happens after I apply?',
    a: 'You’ll get a confirmation email with an onboarding checklist, then a quick review by our team. Once approved, we build your page and you go live.',
  },
];

export default function FoodJoinPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className={`${fraunces.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-orange-50/60 to-background dark:from-orange-950/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300">
              <Gift className="size-3.5" /> Onboarding 20 founding restaurants
            </span>
            <h1
              className="mt-6 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Put your restaurant online with <span className="text-orange-600 dark:text-orange-400">FoodSTT</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Your own ordering page, live prep timers, and QR pickup — built for Trinidad & Tobago.
              <strong className="text-foreground"> 60 days free</strong>, then just TT$200/month.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="#apply">
                <Button size="lg" className="rounded-sm bg-gradient-to-r from-orange-600 to-rose-500 text-white hover:from-orange-700 hover:to-rose-600">
                  Apply now <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="#how">
                <Button size="lg" variant="outline" className="rounded-sm">See how ordering works</Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No setup fee · Cancel anytime · We help you go live</p>
          </div>
        </div>
      </section>

      {/* Pricing strip */}
      <section className="border-b border-border bg-card/40">
        <div className="container mx-auto grid gap-4 px-4 py-10 md:grid-cols-3">
          <PriceCard highlight badge="Start here" title="60 days free" sub="Full access, no card charged. See real orders before you pay a cent." />
          <PriceCard title="TT$200 / month" sub="After your free trial. Cancel anytime — no lock-in." />
          <PriceCard title="TT$1,800 / year" sub="Pay yearly and get 3 months free versus monthly." />
        </div>
      </section>

      {/* What you get */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            Everything you need to sell food online
          </h2>
          <p className="mt-3 text-muted-foreground">One page for your customers, one dashboard for you.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {included.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How ordering works + video placeholder */}
      <section id="how" className="border-y border-border bg-card/40">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              How ordering works
            </h2>
            <p className="mt-3 text-muted-foreground">From tap to pickup in four steps.</p>
          </div>

          {/* Video placeholder */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-orange-500/10 to-rose-500/10">
              <div className="text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/90 text-orange-600 shadow-lg dark:bg-neutral-900/90">
                  <Play className="ml-1 size-7" />
                </div>
                <p className="mt-4 text-sm font-semibold text-muted-foreground">
                  45-second walkthrough — profile → menu → order → prep timer → QR pickup
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Video coming soon</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-4">
            {orderSteps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="absolute right-4 top-4 text-3xl font-black text-orange-100 dark:text-orange-950">{i + 1}</span>
                <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you upload */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              What you need to upload
            </h2>
            <p className="mt-3 text-muted-foreground">
              Have these ready and we can get your page live fast. Don&apos;t have everything? Apply anyway — we&apos;ll help you fill the gaps.
            </p>
            <Link href="#apply" className="mt-6 inline-block">
              <Button size="lg" className="rounded-sm bg-gradient-to-r from-orange-600 to-rose-500 text-white hover:from-orange-700 hover:to-rose-600">
                Start your application <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {uploadList.map((u) => (
              <div key={u.label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                  <u.icon className="size-4" />
                </div>
                <span className="text-sm font-semibold">{u.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="border-t border-border bg-card/40">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                Apply to be a founding restaurant
              </h2>
              <p className="mt-3 text-muted-foreground">
                Fill this out and our team reviews every application by hand. You&apos;ll hear back within 1 business day.
              </p>
            </div>
            <div className="mt-8">
              <RestaurantApplyForm />
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              After you submit: confirmation email → onboarding checklist → upload your items → admin approval → you go live.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-black tracking-tight md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            Questions
          </h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-bold">
                  {f.q}
                  <span className="ml-4 text-orange-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link href="#apply">
              <Button size="lg" className="rounded-sm bg-gradient-to-r from-orange-600 to-rose-500 text-white hover:from-orange-700 hover:to-rose-600">
                <CheckCircle2 className="mr-2 size-4" /> Apply now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PriceCard({ title, sub, badge, highlight }: { title: string; sub: string; badge?: string; highlight?: boolean }) {
  return (
    <div
      className={`relative rounded-2xl border p-6 shadow-sm ${
        highlight
          ? 'border-orange-300 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30'
          : 'border-border bg-card'
      }`}
    >
      {badge ? (
        <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-orange-600 to-rose-500 px-3 py-1 text-xs font-bold text-white">
          {badge}
        </span>
      ) : null}
      <p className="text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}
