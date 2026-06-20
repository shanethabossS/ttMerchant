import Link from 'next/link';
import { getEcosystemLinks } from '@/lib/sov-ecosystem';

const NETWORK_SITES = getEcosystemLinks('sovconnect');

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/35 py-8">
      <div className="container mx-auto flex flex-col justify-between gap-6 px-4 text-sm text-muted-foreground md:flex-row md:items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-[10px] font-black text-primary-foreground">SOV</span>
            <span className="font-bold text-foreground">Connect</span>
          </div>
          <p className="max-w-xs text-xs leading-5">The easiest way for Trinidad businesses and drivers to get online. Powered by Sovereign Digital Group Limited.</p>
          <p className="text-xs">&copy; {new Date().getFullYear()} Sovereign Digital Group Limited.</p>
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
