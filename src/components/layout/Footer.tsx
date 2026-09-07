import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import { getEcosystemLinks } from '@/lib/sov-ecosystem';

const NETWORK_SITES = getEcosystemLinks('sovconnect');
const fraunces = Fraunces({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-display', display: 'swap' });

export function Footer() {
  return (
    <footer className={`${fraunces.variable} mt-auto border-t border-border bg-muted/35`}>
      <div className="lt-fretwork" />
      <div className="container mx-auto flex flex-col justify-between gap-6 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-sm bg-foreground text-[10px] font-black text-background">SOV</span>
            <span className="lt-serif font-semibold text-foreground">Connect</span>
          </div>
          <p className="max-w-xs text-xs leading-5">The easiest way for Trinidad businesses and drivers to get online. Powered by Sovereign Digital Solutions Limited.</p>
          <p className="text-xs">&copy; {new Date().getFullYear()} Sovereign Digital Solutions Limited.</p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Get Started</h4>
            <div className="flex flex-col gap-1.5">
              <Link href="/signup" className="hover:text-foreground">Sign up</Link>
              <Link href="/web-design#services" className="hover:text-foreground">Services</Link>
              <Link href="/drive" className="hover:text-foreground">Delivery service</Link>
              <Link href="/login" className="hover:text-foreground">Sign in</Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Company</h4>
            <div className="flex flex-col gap-1.5">
              <Link href="/about" className="hover:text-foreground">About</Link>
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">SOV Ecosystem</h4>
            <div className="flex flex-wrap gap-1.5">
              {NETWORK_SITES.map((site) => (
                <a key={site.slug} href={site.url} target="_blank" rel="noopener noreferrer"
                  className="rounded-md border border-border/60 bg-muted/50 px-2 py-1 text-xs hover:text-foreground hover:border-primary/40 transition-colors">
                  {site.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
