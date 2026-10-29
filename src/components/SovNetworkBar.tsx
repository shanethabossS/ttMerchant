/**
 * NetworkBar — the one SOV Network strip, copied byte-for-byte into every site.
 *
 * Self-contained on purpose: it carries its own CSS (classes are prefixed `sovnb-`), so it looks and centres the
 * same on every site whatever that site's globals.css says, and it has no dependencies (no hooks, no icons).
 * To add or remove a site, edit SOV_NETWORK_SITES here, then run `node scripts/sync-network-bar.mjs`
 * from C:\AI_WORKSPACE to copy this file to every app. Never edit an app's copy by hand.
 *
 * Staff tools (admin, finance) are deliberately not listed.
 */

export interface NetworkBarProps {
  /** id of the site rendering the bar; it is shown as the current (non-link) chip. */
  currentSite?: string;
  /** Accepted for backwards compatibility with the old per-site CSS prefixes; ignored. */
  prefix?: string;
}

export const SOV_NETWORK_SITES = [
  { id: 'ttclassifieds', name: 'TTClassifieds', href: 'https://ttclassifieds.com', dot: '#00b7ff' },
  { id: 'fixnowtt', name: 'FixNowTT', href: 'https://fixnowtt.com', dot: '#12b886' },
  { id: 'findworktt', name: 'FindWorkTT', href: 'https://findworktt.com', dot: '#6366f1' },
  { id: 'rentmett', name: 'RentMeTT', href: 'https://rentmett.com', dot: '#f97316' },
  { id: 'showlovett', name: 'ShowLoveTT', href: 'https://showlovett.com', dot: '#ec4899' },
  { id: 'talkfreett', name: 'TalkFreeTT', href: 'https://talkfreett.com', dot: '#a855f7' },
  { id: 'foodtt', name: 'FoodsTT', href: 'https://www.foodstt.com', dot: '#f43f5e' },
  { id: 'dealztt', name: 'DealzTT', href: 'https://dealztt.com', dot: '#eab308' },
  { id: 'farmlinktt', name: 'FarmLinkTT', href: 'https://farmlinktt.vercel.app', dot: '#22c55e' },
  { id: 'shop868', name: 'Shop868', href: 'https://shop868-web.vercel.app', dot: '#0891b2' },
  { id: 'sovpredict', name: 'SOV Predict', href: 'https://sovpredict.vercel.app', dot: '#14b8a6' },
  { id: 'launchtt', name: 'LaunchTT', href: 'https://launchtt.com', dot: '#3b82f6' },
  { id: 'sovinvoice', name: 'SOV Invoice', href: 'https://sov-invoice-saas.vercel.app', dot: '#8b5cf6' },
  { id: 'reviewtt', name: 'ReviewTT', href: 'https://reviewtt.vercel.app', dot: '#f59e0b' },
  { id: 'creatortt', name: 'CreatorTT', href: 'https://creatortt.vercel.app', dot: '#d946ef' },
  { id: 'sovdigital', name: 'SOV Digital', href: 'https://sovdigitalgroup.com', dot: '#94a3b8' },
  { id: 'sovid', name: 'SOV ID', href: 'https://id.sovdigitalgroup.com', dot: '#38bdf8' },
] as const;

const CSS = `
.sovnb{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;box-sizing:border-box;padding:6px 12px;background:#0b1220;border-bottom:1px solid rgba(255,255,255,.08);font:600 11px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#cbd5e1;position:relative;z-index:60}
.sovnb-label{flex:none;letter-spacing:.08em;text-transform:uppercase;color:#64748b;font-weight:700}
.sovnb-chips{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;max-width:100%;margin-inline:0}
.sovnb-chips::-webkit-scrollbar{display:none}
.sovnb-chips>*:first-child{margin-left:auto}.sovnb-chips>*:last-child{margin-right:auto}
.sovnb-chip{flex:none;display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;color:#cbd5e1;text-decoration:none;white-space:nowrap;border:1px solid transparent}
a.sovnb-chip:hover{background:rgba(255,255,255,.08);color:#fff}
.sovnb-current{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.18)}
.sovnb-dot{width:6px;height:6px;border-radius:50%;flex:none}
@media (max-width:760px){.sovnb{justify-content:flex-start;padding:6px 8px}.sovnb-label{display:none}.sovnb-chips{width:100%}}
`;

export function NetworkBar({ currentSite }: NetworkBarProps = {}) {
  return (
    <div className="sovnb" role="navigation" aria-label="SOV Network">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <span className="sovnb-label">SOV Network</span>
      <div className="sovnb-chips">
        {SOV_NETWORK_SITES.map((site) => {
          const dot = <span className="sovnb-dot" style={{ background: site.dot }} />;
          return site.id === currentSite ? (
            <span key={site.id} className="sovnb-chip sovnb-current" aria-current="page">{dot}{site.name}</span>
          ) : (
            <a key={site.id} href={site.href} className="sovnb-chip" target="_blank" rel="noopener noreferrer">{dot}{site.name}</a>
          );
        })}
      </div>
    </div>
  );
}
