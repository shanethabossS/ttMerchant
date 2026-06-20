/**
 * SOV Digital Group - Ecosystem site directory
 *
 * CANONICAL SOURCE: Copy this file to every SOV app's src/lib/sov-ecosystem.ts
 * When adding/removing a site, update this file and copy to all apps.
 *
 * Last updated: 2026-06-20
 */

export interface SovSite {
  name: string;
  slug: string;
  url: string;
  description: string;
  category: 'marketplace' | 'service' | 'social' | 'finance' | 'admin' | 'mobile';
  live: boolean;
}

export const SOV_ECOSYSTEM: SovSite[] = [
  { name: 'TTClassifieds', slug: 'ttclassifieds', url: 'https://ttclassifieds.com', description: 'Buy and sell classifieds', category: 'marketplace', live: true },
  { name: 'RentMeTT', slug: 'rentmett', url: 'https://rentmett.com', description: 'Property rentals', category: 'marketplace', live: true },
  { name: 'FindWorkTT', slug: 'findworktt', url: 'https://findworktt.com', description: 'Job listings and hiring', category: 'service', live: true },
  { name: 'FixNowTT', slug: 'fixnowtt', url: 'https://fixnowtt.com', description: 'Home repair and trades', category: 'service', live: true },
  { name: 'ShowLoveTT', slug: 'showlovett', url: 'https://showlovett.com', description: 'Crowdfunding and donations', category: 'finance', live: true },
  { name: 'TalkFreeTT', slug: 'talkfreett', url: 'https://talkfreett.com', description: 'Community forum', category: 'social', live: true },
  { name: 'DealzTT', slug: 'auctiontt', url: 'https://dealztt.com', description: 'Online auctions', category: 'marketplace', live: true },
  { name: 'FoodsTT', slug: 'foodtt', url: 'https://foodstt.com', description: 'Food delivery and ordering', category: 'marketplace', live: true },
  { name: 'LaunchTT', slug: 'sovconnect', url: 'https://launchtt.com', description: 'Business launch and delivery services', category: 'service', live: true },
  { name: 'SOV Invoice', slug: 'sovinvoice', url: 'https://finance.sovdigitalgroup.com', description: 'Invoicing and billing SaaS', category: 'finance', live: true },
  { name: 'ReviewTT', slug: 'reviewtt', url: 'https://reviewtt.vercel.app', description: 'Cross-platform ratings and reviews', category: 'service', live: true },
];

export const SOV_LIVE_SITES = SOV_ECOSYSTEM.filter((site) => site.live);

export function getEcosystemLinks(currentSlug?: string) {
  return SOV_LIVE_SITES.filter((site) => site.slug !== currentSlug && site.category !== 'admin');
}
