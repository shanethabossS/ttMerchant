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

export default function HomePage() {
  return (
    <div className="flex flex-col">
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
            LaunchTT is built for business owners who need a proper website, ordering setup, listings,
            payments, and support without learning five different tools first.
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
