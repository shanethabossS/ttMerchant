import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, FileBadge2, ShieldCheck, WalletCards } from 'lucide-react';
import { buildFaqJsonLd } from '@/lib/seo/launchtt-pages';
import { supportWhatsAppUrl } from '@/lib/contact';

// Written for someone who has never done this before: plain words, one step at a time, large text.

const steps = [
  ['Make your account', 'Tap "Sign up". Use your email and make a password you will remember. Write it down somewhere safe.'],
  ['Open "Verification"', 'After you sign in, look for Verification in your account menu. It tells you what to do next, one thing at a time.'],
  ['Take a photo of your ID', 'Lay your ID flat on a table in good light. Make sure all four corners and every word can be read. Your phone camera is fine.'],
  ['Take a photo of your face', "Hold the phone at arm's length and look at the camera, like a passport photo. This shows us the ID is really yours."],
  ['Add proof of your address', 'Take a photo of a recent bill or a letter from your bank with your name and address on it.'],
  ['Wait for our email', 'A real person checks your photos, usually within a couple of days. We will email you as soon as you are approved.'],
];

const whatYouNeed = [
  ['A photo ID', "Your ID card, driver's permit or passport."],
  ['A bill or bank letter', 'It must show your name and address. Light, water or phone bills all work.'],
  ['A phone with a camera', 'Any smartphone. You can also ask a family member to help you.'],
  ['For a company only', 'Your business registration papers.'],
];

const why = [
  ['It stops scammers', 'Nobody can pretend to be you or your business, because we have checked who you really are.'],
  ['It makes customers trust you', 'People are more willing to pay and book when they know you have been checked.'],
  ['It keeps money safe', 'Before any money moves (payments or payouts), we must be sure it goes to the right person.'],
];

const faq = [
  { q: 'What does KYC mean?', a: 'It stands for "Know Your Customer". It simply means showing us that you are a real person or a real business. Banks do exactly the same thing when you open an account.' },
  { q: 'Do I have to do it right now?', a: 'No. You can look around and set up your account first. You only need to be verified before money moves, for example to take payments or get paid out.' },
  { q: 'Is it safe to send my ID?', a: 'Your documents are kept private. Only the small team that checks them can see them. They are never shown on the website.' },
  { q: 'What if I make a mistake or get stuck?', a: 'That is completely fine. Message us on WhatsApp or call 868-259-3200 and we will walk you through it.' },
  { q: 'Can a business in Trinidad and Tobago be verified too?', a: "Yes. A business sends its registration papers as well as the owner's ID." },
];

export const metadata: Metadata = {
  title: 'KYC Verification for Trinidad and Tobago Users',
  description: 'Complete your LaunchTT KYC verification to unlock full SOV ecosystem access, payments, and faster onboarding in Trinidad and Tobago.',
  alternates: { canonical: '/kyc' },
  keywords: [
    'KYC Trinidad',
    'business verification Trinidad',
    'LaunchTT KYC',
    'verify account Trinidad and Tobago',
  ],
  openGraph: {
    title: 'LaunchTT KYC Verification',
    description: 'Complete your LaunchTT KYC verification to unlock full SOV ecosystem access, payments, and faster onboarding.',
    type: 'website',
    url: 'https://launchtt.com/kyc',
    locale: 'en_TT',
    siteName: 'LaunchTT',
  },
};

export default function KycPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://launchtt.com/kyc#service',
        name: 'LaunchTT KYC Verification',
        serviceType: 'Identity and business verification',
        description: metadata.description,
        provider: { '@type': 'Organization', name: 'LaunchTT', url: 'https://launchtt.com' },
      },
      buildFaqJsonLd(faq),
    ],
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
        <ShieldCheck className="size-3.5" />
        Verification made simple
      </div>
      <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Show us who you are, once. Stay safe everywhere.</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Verification (some people call it KYC) just means proving you are a real person, or a real business. It takes a few
        photos from your phone. Take your time. You can stop and come back whenever you like.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-black">Why do we ask?</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {why.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-lg font-bold">{t}</p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-2xl font-black"><FileBadge2 className="size-6 text-blue-600" /> What you need</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {whatYouNeed.map(([t, d]) => (
            <li key={t} className="flex gap-3 rounded-2xl border border-border bg-muted/30 p-4">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-emerald-600" />
              <span><span className="block text-lg font-bold">{t}</span><span className="text-base text-muted-foreground">{d}</span></span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black">Step by step</h2>
        <ol className="mt-4 space-y-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-black text-primary-foreground">{i + 1}</span>
              <span><span className="block text-lg font-bold">{t}</span><span className="mt-1 block text-base leading-relaxed text-muted-foreground">{d}</span></span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/40">
        <h2 className="flex items-center gap-2 text-2xl font-black"><WalletCards className="size-6 text-blue-600" /> Ready to start?</h2>
        <p className="mt-2 text-base text-muted-foreground">
          Already have an account on another SOV site? Sign in with the same email and we can often see you are already verified.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/signup" className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition hover:opacity-90">Sign up</Link>
          <Link href="/login" className="inline-flex items-center rounded-lg border border-border bg-background px-6 py-3 text-base font-bold transition hover:bg-muted">Sign in</Link>
          <a
            href={supportWhatsAppUrl('Hi LaunchTT — I need help with verification (KYC).')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border bg-background px-6 py-3 text-base font-bold transition hover:bg-muted"
          >
            Ask us on WhatsApp
          </a>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Prefer to talk? Call 868-259-3200 and we will help you step by step.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black">Questions people ask</h2>
        <div className="mt-4 space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="rounded-2xl border border-border bg-muted/20 p-5">
              <summary className="cursor-pointer text-left text-lg font-bold">{item.q}</summary>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
