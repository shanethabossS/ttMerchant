import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Wrench,
  Sparkles,
  Star,
  ShieldCheck,
  Mail,
  Clock,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/web-design/ContactForm';
import Portfolio from '@/components/web-design/Portfolio';

const SITE_URL = 'https://launchtt.com';
const EMAIL = 'info@sovdigitalgroup.com';

const TITLE = 'Web Design & Repair in Trinidad & Tobago | LaunchTT';
const DESC  = 'Premium website design and honest site repair for Trinidad & Tobago businesses. Mobile-first, fast turnaround, fixed pricing in TTD. Built by the LaunchTT team.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/web-design' },
  keywords: [
    'web design Trinidad', 'web design Tobago', 'website designer Trinidad',
    'website repair Trinidad', 'fix my website Trinidad', 'mobile website Trinidad',
    'cheap website Trinidad', 'small business website T&T', 'rebuild website Trinidad',
    'Next.js Trinidad', 'PWA Trinidad', 'LaunchTT web design',
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

const BUILD_PACKAGES = [
  {
    name: 'Starter',
    price: 'TT$1,200',
    cadence: 'one-time',
    blurb: 'A clean, mobile-first one-page site for sole traders, contractors, and side hustles.',
    features: [
      'Single-page site, 4 sections',
      'Mobile-first responsive',
      'WhatsApp + Maps integration',
      'Contact form to your email',
      'Domain + SSL setup',
      'Delivered in 7 days',
    ],
    cta: 'Start with Starter',
  },
  {
    name: 'Business',
    price: 'TT$2,800',
    cadence: 'one-time',
    blurb: 'A full multi-page site with everything a real business needs to win clients online.',
    features: [
      'Up to 6 custom pages',
      'Mobile-first responsive',
      'Bookings or quote-request flow',
      'Google reviews + SEO basics',
      'CMS so you can edit copy',
      '2 revision rounds · 14 days',
    ],
    cta: 'Build my business site',
    featured: true,
  },
  {
    name: 'Premium',
    price: 'TT$5,500+',
    cadence: 'one-time',
    blurb: 'Custom design, animations, e-commerce, and the polish bigger brands need.',
    features: [
      '10+ custom pages or store',
      'Custom animations + branding',
      'E-commerce or member login',
      'Performance-tuned (<1s load)',
      'Analytics + monitoring',
      'Unlimited revisions · 21 days',
    ],
    cta: 'Talk premium',
  },
];

const REPAIR_PACKAGES = [
  {
    name: 'Diagnose',
    price: 'TT$150',
    cadence: 'one-time',
    blurb: 'Full audit of your current site — what\'s broken, what\'s slow, what\'s costing you leads.',
    features: [
      '12-point health audit',
      'Mobile + desktop tested',
      'Lighthouse score + report',
      'Prioritised fix list',
      'Credit applied to repair tier',
    ],
    cta: 'Audit my site',
  },
  {
    name: 'Tune-Up',
    price: 'TT$650',
    cadence: 'one-time',
    blurb: 'For sites that work but feel old, slow, or off-brand. We refresh without rebuilding.',
    features: [
      'Mobile responsiveness fix',
      'Speed + image optimisation',
      'Copy refresh (your input)',
      'Broken links + contact form',
      'SSL + security headers',
      'Delivered in 5 days',
    ],
    cta: 'Tune up my site',
    featured: true,
  },
  {
    name: 'Rebuild',
    price: 'TT$1,800',
    cadence: 'one-time',
    blurb: 'The site is beyond repair. We rebuild it from scratch on modern tech — same domain, no downtime.',
    features: [
      'Full rebuild, modern stack',
      'Migrate existing content',
      'Same domain, zero downtime',
      'Mobile-first redesign',
      'SEO redirects preserved',
      'Delivered in 10 days',
    ],
    cta: 'Rebuild my site',
  },
];

const STATS = [
  { num: '72hrs',  label: 'Repair turnaround' },
  { num: '7 days', label: 'New site delivery' },
  { num: '100%',   label: 'Mobile-first' },
  { num: '<1s',    label: 'Avg load time' },
];

const PROCESS = [
  { n: 1, t: 'You email us',   d: `Send what's broken or what you need at ${EMAIL}.` },
  { n: 2, t: 'Free quote',     d: 'We reply within 1 business day with a fixed quote and timeline.' },
  { n: 3, t: 'We build',        d: 'You get a preview link to approve before anything goes live.' },
  { n: 4, t: 'Go live',         d: 'Your site is live on your domain. Mobile-perfect from day one.' },
];

const FAQ = [
  { q: 'Is this different from a LaunchTT done-for-you bundle?', a: 'Yes. The done-for-you bundle includes listings, menus, AI assistant, payments and more. Web Design is just the website (or repair). Many clients start here, then graduate to the full LaunchTT bundle.' },
  { q: 'How do I pay?', a: 'TT bank transfer or Fygaro card link. 50% on start, 50% on go-live for builds. Repair packages are paid upfront.' },
  { q: 'Do you host the site?', a: 'We deploy on Vercel — fast, reliable, and free tier covers most small business traffic. We can also deploy to your existing host.' },
  { q: 'What if my site is on WordPress?', a: 'We can tune it up in place or rebuild on modern Next.js — your choice. We migrate the content and keep your URLs so SEO holds.' },
  { q: 'Can I edit my own site after?', a: 'Yes. On Business and Premium tiers we ship a simple CMS so non-developers can change text and images.' },
  { q: 'Do you do mobile apps too?', a: 'We build mobile-ready web apps (PWAs) that install to home screen. For native iOS/Android, ask for a Premium quote.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/web-design#service`,
      serviceType: 'Website Design and Repair',
      name: 'LaunchTT Web Design & Repair',
      description: DESC,
      provider: { '@type': 'Organization', name: 'LaunchTT', url: SITE_URL, parentOrganization: { '@type': 'Organization', name: 'Sovereign Digital Group Ltd', url: 'https://sovdigitalgroup.com' } },
      areaServed: [
        { '@type': 'Country', name: 'Trinidad and Tobago' },
        { '@type': 'AdministrativeArea', name: 'Trinidad' },
        { '@type': 'AdministrativeArea', name: 'Tobago' },
      ],
      offers: [
        ...BUILD_PACKAGES.map((p) => ({ '@type': 'Offer', name: `Website Build — ${p.name}`, price: p.price.replace(/[^\d]/g, ''), priceCurrency: 'TTD', description: p.blurb })),
        ...REPAIR_PACKAGES.map((p) => ({ '@type': 'Offer', name: `Website Repair — ${p.name}`, price: p.price.replace(/[^\d]/g, ''), priceCurrency: 'TTD', description: p.blurb })),
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',       item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Web Design', item: `${SITE_URL}/web-design` },
      ],
    },
  ],
};

export default function WebDesignPage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-blue-50 via-background to-cyan-50 dark:from-blue-950/30 dark:via-background dark:to-cyan-950/20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-4 py-16 text-center md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Sparkles className="size-3.5" />
            Web Design · Trinidad &amp; Tobago
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            We build{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">beautiful websites.</span>{' '}
            We fix{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">broken ones.</span>
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Premium build, honest repair, mobile-first — for T&amp;T businesses. Sites delivered in 7–14 days,
            repairs in 72 hours, all in TT dollars with no surprises.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="#contact">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600">
                Get a free quote <ArrowRight className="size-4" />
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

      {/* ───── Build vs Repair (two-column) ───── */}
      <section id="services" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {/* Build */}
            <div id="build" className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                <Globe className="size-3.5" /> Website Design
              </div>
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">A new site, built right.</h2>
              <p className="mt-3 text-muted-foreground">For businesses launching online or upgrading from a site that&apos;s holding them back.</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {[
                  ['Mobile-first design',    'Looks perfect on the phones your customers actually use.'],
                  ['Lightning-fast load',     'Under 1 second on 4G — Google rewards it, customers stay.'],
                  ['Real SEO foundations',    'Schema, sitemaps, meta — built in, not bolted on.'],
                  ['Built-in lead capture',   'WhatsApp, contact form, click-to-call — wired up.'],
                  ['Editable copy',           'Change text without calling a developer.'],
                  ['You own everything',      'Code, domain, content. No vendor lock-in.'],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 flex-shrink-0 text-blue-500" />
                    <span><span className="font-semibold">{t}.</span> <span className="text-muted-foreground">{d}</span></span>
                  </li>
                ))}
              </ul>
              <Link href="#pricing" className="mt-6 inline-block">
                <Button variant="outline" className="gap-2">See build packages <ArrowRight className="size-4" /></Button>
              </Link>
            </div>

            {/* Repair */}
            <div id="repair" className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-xs font-bold text-fuchsia-700 dark:border-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300">
                <Wrench className="size-3.5" /> Site Repair & Redesign
              </div>
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">Got a site from 2014? We fix that.</h2>
              <p className="mt-3 text-muted-foreground">For sites that are broken, slow, ugly, or just not delivering anymore.</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {[
                  ['Looks broken on phones',    'Re-flow the layout to be mobile-first.'],
                  ['Loads slow / fails on 4G',  'Image opt, caching, CDN — usually 5–8× faster.'],
                  ['Contact form goes nowhere', 'We wire it back to your email or WhatsApp.'],
                  ['Looks like 2014',            'Modern type, real photography, proper spacing.'],
                  ['Can\'t add new content',    'Add a simple CMS or rebuild on modern tech.'],
                  ['Search engines can\'t find it', 'SEO audit + sitemap + schema, redirects preserved.'],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 flex-shrink-0 text-fuchsia-500" />
                    <span><span className="font-semibold">{t}.</span> <span className="text-muted-foreground">{d}</span></span>
                  </li>
                ))}
              </ul>
              <Link href="#pricing" className="mt-6 inline-block">
                <Button variant="outline" className="gap-2">See repair packages <ArrowRight className="size-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Process ───── */}
      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">From email to live in days, not months.</h2>
            <p className="mt-4 text-muted-foreground">Four steps. No surprises. No drag-out projects.</p>
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

      {/* ───── Pricing ───── */}
      <section id="pricing" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Clear pricing, no surprises.</h2>
            <p className="mt-4 text-muted-foreground">Fixed quotes in TT dollars. What you see is what you pay.</p>
          </div>

          <div className="mt-12">
            <h3 className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
              <Globe className="size-3.5" /> Build a new site
            </h3>
            <div className="grid gap-5 md:grid-cols-3">
              {BUILD_PACKAGES.map((p) => <PackageCard key={p.name} {...p} accent="blue" />)}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-fuchsia-700 dark:border-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300">
              <Wrench className="size-3.5" /> Repair an existing site
            </h3>
            <div className="grid gap-5 md:grid-cols-3">
              {REPAIR_PACKAGES.map((p) => <PackageCard key={p.name} {...p} accent="fuchsia" />)}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Portfolio ───── */}
      <section id="work" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">A growing portfolio of T&amp;T platforms.</h2>
            <p className="mt-4 text-muted-foreground">Every site below is live, in production, and built by the LaunchTT team.</p>
          </div>
          <Portfolio />

          <div className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  <Sparkles className="size-3.5" /> Built with AI on the team
                </div>
                <h3 className="text-xl font-black tracking-tight md:text-2xl">Real engineers, real AI partners.</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  LaunchTT ships fast because we pair human engineering with the best AI coding tools available.
                  Credit where it&apos;s due — these platforms helped build the portfolio above:
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {[
                  { name: 'Claude Opus', by: 'Anthropic' },
                  { name: 'Codex',       by: 'OpenAI' },
                  { name: 'MiniMax',     by: 'MiniMax AI' },
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

      {/* ───── FAQ ───── */}
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

      {/* ───── Contact ───── */}
      <section id="contact" className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                <Mail className="size-3.5" /> Get in touch
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">Let&apos;s build something good.</h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                Tell us about your business and what you need. We reply with a fixed quote within 1 business day —
                no sales calls, no upsells.
              </p>

              <div className="mt-8 space-y-3">
                <ContactRow
                  icon={<Mail className="size-5" />}
                  label="Email"
                  value={EMAIL}
                  href={`mailto:${EMAIL}?subject=LaunchTT%20Web%20Design%20Enquiry`}
                />
                <ContactRow
                  icon={<Clock className="size-5" />}
                  label="Reply time"
                  value="Within 1 business day · Mon–Fri"
                />
                <ContactRow
                  icon={<MapPin className="size-5" />}
                  label="Where"
                  value="Trinidad & Tobago — serving the whole twin-island"
                />
                <ContactRow
                  icon={<ShieldCheck className="size-5" />}
                  label="Trust"
                  value="Part of Sovereign Digital Group · 16+ live platforms"
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function PackageCard({ name, price, cadence, blurb, features, cta, featured, accent }: {
  name: string; price: string; cadence: string; blurb: string; features: string[]; cta: string; featured?: boolean; accent: 'blue' | 'fuchsia';
}) {
  const checkColor = accent === 'blue' ? 'text-blue-500' : 'text-fuchsia-500';
  const ringClass = featured ? (accent === 'blue' ? 'ring-2 ring-blue-400/50' : 'ring-2 ring-fuchsia-400/50') : '';
  const gradient = accent === 'blue' ? 'from-blue-600 to-cyan-500' : 'from-fuchsia-600 to-pink-500';

  return (
    <div className={`relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm ${ringClass}`}>
      {featured && (
        <div className={`absolute -top-3 left-6 rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white`}>
          Most popular
        </div>
      )}
      <div className="text-lg font-black tracking-tight">{name}</div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-3xl font-black tracking-tight text-transparent`}>{price}</span>
        <span className="text-xs text-muted-foreground">{cadence}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <CheckCircle2 className={`mt-0.5 size-4 flex-shrink-0 ${checkColor}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link href="#contact" className="mt-6 block">
        <Button variant={featured ? 'default' : 'outline'} className={`w-full gap-2 ${featured ? `bg-gradient-to-r ${gradient} text-white hover:opacity-90` : ''}`}>
          {cta} <ArrowRight className="size-4" />
        </Button>
      </Link>
    </div>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400">
      <span className="grid size-10 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-mono">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

