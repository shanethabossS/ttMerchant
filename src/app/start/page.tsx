import { Suspense } from 'react';
import { StartForm } from '@/components/start/StartForm';

export const metadata = {
  title: 'Start Your Launch — LaunchTT',
  description: '5-minute form. Free quote in 24 hours. We launch your business online — done for you.',
};

export default function StartPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-16">
      <Suspense fallback={<div className="text-center text-muted-foreground">Loading…</div>}>
        <StartForm />
      </Suspense>
    </div>
  );
}
