import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Portfolio from '@/components/web-design/Portfolio';

export const metadata: Metadata = {
  title: 'Our Work: Live Trinidad & Tobago Platforms | LaunchTT',
  description: 'Every site in the LaunchTT portfolio is live and in production across Trinidad and Tobago.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">A growing portfolio of T&amp;T platforms.</h2>
            <p className="mt-4 text-muted-foreground">Every site below is live, in production, and built by the LaunchTT team.</p>
          </div>
          <Portfolio />

          <div className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  <Sparkles className="size-3.5" /> Built with AI on the team
                </div>
                <h3 className="text-xl font-black tracking-tight md:text-2xl">Real engineers, real AI partners.</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  LaunchTT ships fast because we pair human engineering with the best AI coding tools available.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {[
                  { name: 'Claude Opus', by: 'Anthropic' },
                  { name: 'Codex', by: 'OpenAI' },
                  { name: 'MiniMax', by: 'MiniMax AI' },
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


      <section className="border-t border-border bg-muted/30 py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-black tracking-tight">Want one for your business?</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/start"><Button size="lg" className="gap-2">Start my project <ArrowRight className="size-4" /></Button></Link>
            <Link href="/pricing"><Button size="lg" variant="outline">See pricing</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
