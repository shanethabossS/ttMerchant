import Link from 'next/link';
import { CheckCircle2, FileBadge2, ShieldCheck, WalletCards } from 'lucide-react';

const requirements = [
  'Government-issued ID',
  'Proof of address',
  'Selfie or live identity check',
  'Business registration if you are signing up as a company',
];

const benefits = [
  'Full posting and selling access across the SOV ecosystem',
  'Payments, invoicing, and payout features',
  'Priority onboarding for LaunchTT projects',
  'Faster approvals for delivery and platform applications',
];

export const metadata = {
  title: 'KYC Verification',
  description: 'Complete your LaunchTT KYC verification to unlock full SOV ecosystem access.',
};

export default function KycPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
            <ShieldCheck className="size-3.5" />
            Trust and verification
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Complete your KYC on LaunchTT</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            One verification unlocks smoother access across the SOV ecosystem. If you are launching a business,
            this is the fastest way to move from browse-only into full account access.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-muted/30 p-5">
            <p className="flex items-center gap-2 text-sm font-bold">
              <FileBadge2 className="size-4 text-blue-600 dark:text-cyan-300" />
              What you should have ready
            </p>
            <div className="mt-4 space-y-3">
              {requirements.map((item) => (
                <div key={item} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-muted/30 p-5">
            <p className="flex items-center gap-2 text-sm font-bold">
              <WalletCards className="size-4 text-blue-600 dark:text-cyan-300" />
              What verification unlocks
            </p>
            <div className="mt-4 space-y-3">
              {benefits.map((item) => (
                <div key={item} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
          <h2 className="text-lg font-black">Next step</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start by creating your account or signing in with the email you use on other SOV sites. If you are
            already verified elsewhere in the network, we can often recognize that automatically.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted"
            >
              Sign in
            </Link>
            <a
              href="https://wa.me/18685550199"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
