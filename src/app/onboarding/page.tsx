import Link from 'next/link';

export default function OnboardingLegacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 text-center">
      <h1 className="text-3xl font-black tracking-tight">New Intake Flow Available</h1>
      <p className="mt-3 text-muted-foreground">Please use the new step-by-step flow built for SOV merchant lead capture.</p>
      <Link href="/start" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">Go to /start</Link>
    </div>
  );
}
