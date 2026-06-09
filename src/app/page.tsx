import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  Globe,
  MessageCircle,
  Receipt,
  Rocket,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Users,
  Utensils,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const includedFeatures = [
  { icon: Globe, title: 'Website', desc: 'Branded online presence — mobile-ready in days, not months.' },
  { icon: ShoppingBag, title: 'Online Ordering', desc: 'Take orders 24/7 — your menu, your products, your prices.' },
  { icon: Receipt, title: 'Invoice System', desc: 'Send invoices, track payments, follow up — all from one place.' },
  { icon: Calendar, title: 'Booking System', desc: 'Customers book appointments online — no more WhatsApp chaos.' },
  { icon: Bot, title: 'AI Assistant', desc: 'Answers customer questions, takes bookings, qualifies leads — even when you sleep.' },
  { icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Get orders & inquiries direct to your WhatsApp — no new app to learn.' },
  { icon: CreditCard, title: 'Payments', desc: 'Accept cards, LINX, Fygaro, bank transfer — money straight to your account.' },
  { icon: Search, title: 'SEO', desc: 'Found on Google when locals search for what you sell.' },
];

const conciergeServices = [
  { icon: ClipboardList, title: 'Signups & listings', desc: 'We sign you up across the SOV network and create your listings — FoodsTT, FixNowTT, RentMeTT, FindWorkTT and more.' },
  { icon: Utensils, title: 'Menu updates', desc: "New dish? Changed your price? Send it to us — we update your menu everywhere it lives." },
  { icon: FileText, title: 'Resume creation', desc: 'Professional, locally-tailored resumes that get callbacks. Posted to FindWorkTT for you.' },
  { icon: Truck, title: 'Driver hiring for deliveries', desc: "Need delivery drivers? We screen, vet and connect you with verified local drivers." },
  { icon: Sparkles, title: 'Ongoing updates', desc: 'Photos, descriptions, opening hours, holiday closures — keep us posted, we keep it fresh.' },
  { icon: Users, title: 'Customer support training', desc: 'Quick coaching on responding to reviews, handling WhatsApp inquiries, and growing your following.' },
];

const steps = [
  { num: '01', title: 'Tell us about your business', desc: 'A 5-min form. Photos, basic info, what you sell. That\'s it.' },
  { num: '02', title: 'Pick what you need', desc: 'Just a website? Full launch package? Resume only? Choose your bundle.' },
  { num: '03', title: 'We build, you approve', desc: 'Within 48-72 hours we send you a preview. Tweak it as much as you want.' },
  { num: '04', title: 'You go live', desc: 'Your website, listings, and tools go live. We stay on call for updates.' },
];

const stats = [
  { value: '48hr', label: 'Average launch time' },
  { value: '$0', label: 'To get a quote' },
  { value: '10+', label: 'Connected platforms' },
  { value: '100%', label: 'Done for you' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-blue-50 via-background to-cyan-50 dark:from-blue-950/30 dark:via-background dark:to-cyan-950/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Rocket className="size-3.5" />
            Done-For-You Online Launch · Trinidad &amp; Tobago
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            We launch your business{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              online — done for you
            </span>
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Pay a small fee. Our team handles the website, the listings, the menu, the resume, the driver hiring — all of it.
            You focus on running your business. We focus on getting you found, booked and paid.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/start">
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
            No credit card · Free quote in 24 hours · WhatsApp <a className="font-bold text-blue-600 hover:underline" href="https://wa.me/18685550199">+1 (868) 555-0199</a>
          </p>
        </div>
      </section>

      {/* ───── Stats strip ───── */}
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

      {/* ───── What's included (the 8 checkmarks) ───── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">Everything you need to launch</h2>
          <p className="mt-3 text-base text-muted-foreground">
            One package. Eight tools. Built, configured and maintained by us so you never touch a dashboard if you don&apos;t want to.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {includedFeatures.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-5 transition hover:border-blue-300 hover:shadow-md dark:hover:border-blue-700">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  <f.icon className="size-5" />
                </div>
                <CheckCircle2 className="ml-auto size-5 text-green-600" />
              </div>
              <h3 className="text-base font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── What we DO FOR YOU (the concierge piece) ───── */}
      <section className="border-y border-border bg-gradient-to-b from-muted/30 to-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
              <Sparkles className="size-3.5" />
              Concierge Service
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">We do the work — you run the business</h2>
            <p className="mt-3 text-base text-muted-foreground">
              You&apos;re busy serving customers. We&apos;re here to handle the digital busywork.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {conciergeServices.map((s) => (
              <article key={s.title} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <s.icon className="size-6" />
                </div>
                <h3 className="text-lg font-black">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───── How it works ───── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">How it works</h2>
          <p className="mt-3 text-base text-muted-foreground">From form to live website in under a week.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="text-5xl font-black text-blue-200 dark:text-blue-900">{s.num}</span>
              <h3 className="mt-3 text-base font-black">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Pricing ───── */}
      <section id="pricing" className="border-y border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Simple, local pricing</h2>
            <p className="mt-3 text-base text-muted-foreground">
              Trinidad-friendly prices. Pay once, or split it over months — we&apos;ll work with you.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Starter</p>
              <p className="mt-2 text-4xl font-black">$199<span className="text-base font-medium text-muted-foreground"> TTD</span></p>
              <p className="mt-1 text-sm text-muted-foreground">One-time setup</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> SOV network signups + listings</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> WhatsApp integration</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Basic SEO setup</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> 1 round of revisions</li>
              </ul>
              <Link href="/start?plan=starter" className="mt-6">
                <Button variant="outline" className="w-full">Start with Starter</Button>
              </Link>
            </div>

            {/* Pro — featured */}
            <div className="relative flex flex-col rounded-2xl border-2 border-blue-500 bg-card p-6 shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">MOST POPULAR</span>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Pro</p>
              <p className="mt-2 text-4xl font-black">$499<span className="text-base font-medium text-muted-foreground"> TTD</span></p>
              <p className="mt-1 text-sm text-muted-foreground">Setup + 3 months management</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Everything in Starter</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Custom website + online ordering</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Booking system + invoice tools</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> AI assistant trained on your business</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Menu/listing updates included</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Priority WhatsApp support</li>
              </ul>
              <Link href="/start?plan=pro" className="mt-6">
                <Button className="w-full gap-2">
                  Start with Pro <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            {/* Concierge */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Concierge</p>
              <p className="mt-2 text-4xl font-black">$1,499<span className="text-base font-medium text-muted-foreground"> TTD</span></p>
              <p className="mt-1 text-sm text-muted-foreground">Setup + 6 months full-service</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Everything in Pro</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Driver hiring & screening</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Resume creation (2 included)</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Monthly content updates</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Customer-service training</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" /> Dedicated account manager</li>
              </ul>
              <Link href="/start?plan=concierge" className="mt-6">
                <Button variant="outline" className="w-full">Talk to us</Button>
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Custom needs? <a href="https://wa.me/18685550199" className="font-bold text-blue-600 hover:underline">WhatsApp us</a> for a tailored quote.
          </p>
        </div>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="mx-auto w-full max-w-4xl px-4 py-16 text-center md:py-24">
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Rocket className="size-8" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-black tracking-tight md:text-5xl">
          Ready to launch?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          The form takes 5 minutes. We&apos;ll come back with a quote in 24 hours. You only pay when you&apos;re ready to go live.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/start">
            <Button size="lg" className="gap-2 text-base">
              <Zap className="size-5" />
              Start now — it&apos;s free
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
          <span className="ml-1">Trusted by local businesses across Trinidad &amp; Tobago</span>
        </p>
      </section>
    </div>
  );
}
