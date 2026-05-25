import Link from 'next/link';
import { ArrowRight, Building2, Car, CheckCircle2, Globe, ShieldCheck, Smartphone, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  { icon: Zap, title: 'Done in minutes', desc: 'Simple form, no tech skills needed. We handle everything.' },
  { icon: Globe, title: 'Get found online', desc: 'Your business or service listed across the SOV network.' },
  { icon: ShieldCheck, title: 'KYC fast-track', desc: 'Already verified on a SOV site? Skip the paperwork.' },
  { icon: Smartphone, title: 'WhatsApp ready', desc: 'Customers reach you directly on WhatsApp.' },
];

const stats = [
  { value: '10+', label: 'SOV platforms' },
  { value: '5 min', label: 'Average signup' },
  { value: '24hr', label: 'Review turnaround' },
  { value: '100%', label: 'Free to start' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-blue-50 via-background to-cyan-50 dark:from-blue-950/30 dark:via-background dark:to-cyan-950/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Star className="size-3.5" />
            Trinidad & Tobago&apos;s Digital Onboarding Hub
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Get your business or skills{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              online today
            </span>
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Whether you run a shop, a food stall, a salon, or you drive for a living — SOV Connect gets you set up fast. Submit your info, we handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/join/business">
              <Button size="lg" className="gap-2 text-base">
                <Building2 className="size-5" />
                I&apos;m a business
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/join/driver">
              <Button size="lg" variant="outline" className="gap-2 text-base">
                <Car className="size-5" />
                I&apos;m a driver
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-primary md:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two paths */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <h2 className="mb-8 text-center text-2xl font-black tracking-tight md:text-3xl">Choose your path</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/join/business" className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-700 md:p-8">
            <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              <Building2 className="size-7" />
            </div>
            <h3 className="text-xl font-black">Business Owner</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Mom & pop shop, food vendor, salon, mechanic — any small business. We create your online storefront, list your products, and connect you with customers.
            </p>
            <ul className="mt-4 space-y-2">
              {['Online storefront on SOV platforms', 'WhatsApp ordering setup', 'Product & service listings', 'Google Maps visibility'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary">
              Start business signup <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link href="/join/driver" className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-cyan-300 hover:shadow-lg dark:hover:border-cyan-700 md:p-8">
            <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300">
              <Car className="size-7" />
            </div>
            <h3 className="text-xl font-black">Driver / Courier</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Delivery driver, taxi, courier — get listed for gigs across the SOV network. Upload your info once, get matched to jobs.
            </p>
            <ul className="mt-4 space-y-2">
              {['Listed across SOV delivery network', 'Choose your areas & schedule', 'Upload license & resume once', 'WhatsApp job notifications'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary">
              Start driver signup <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-border bg-muted/30 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-black tracking-tight md:text-3xl">Why SOV Connect?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-card p-5">
                <b.icon className="mb-3 size-8 text-primary" />
                <h3 className="font-bold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-4xl px-4 py-12 text-center md:py-16">
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Ready to get started?</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          It takes less than 5 minutes. No tech skills needed. We handle everything from setup to publishing.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/join/business"><Button size="lg">Business signup</Button></Link>
          <Link href="/join/driver"><Button size="lg" variant="outline">Driver signup</Button></Link>
        </div>
      </section>
    </div>
  );
}
