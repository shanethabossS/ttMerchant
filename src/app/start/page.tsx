import type { Metadata } from 'next';
import { Suspense } from 'react';
import { StartForm } from '@/components/start/StartForm';

export const metadata: Metadata = {
  title: 'Start Your Launch in Trinidad and Tobago',
  description: 'Fill out the LaunchTT start form for websites, online stores, invoicing, and digital support in Trinidad and Tobago.',
  alternates: { canonical: '/start' },
  keywords: [
    'start business website Trinidad',
    'launch business online Trinidad',
    'website quote Trinidad',
    'LaunchTT start form',
  ],
};

export default function StartPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-16">
      <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
        <StartForm />
      </Suspense>
    </div>
  );
}
