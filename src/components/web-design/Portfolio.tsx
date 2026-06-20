'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

type Project = { slug: string; name: string; url: string; tag: string; blurb: string };

const PROJECTS: Project[] = [
  { slug: 'ttclassifieds', name: 'TTClassifieds',  url: 'https://ttclassifieds.com',                tag: 'Marketplace',   blurb: 'T&T’s buy/sell classifieds platform — listings, photos, search, messaging.' },
  { slug: 'fixnowtt',      name: 'FixNowTT',        url: 'https://fixnowtt.com',                     tag: 'Services',      blurb: 'On-demand handymen, plumbers, electricians — booking and quotes.' },
  { slug: 'findworktt',    name: 'FindWorkTT',      url: 'https://findworktt.com',                   tag: 'Jobs',          blurb: 'Job board for Trinidad & Tobago — employers post, candidates apply.' },
  { slug: 'rentmett',      name: 'RentMeTT',        url: 'https://rentmett.com',                     tag: 'Rentals',       blurb: 'Apartments, rooms, and short-stay rentals across the twin-island.' },
  { slug: 'showlovett',    name: 'ShowLoveTT',      url: 'https://showlovett.com',                   tag: 'Crowdfunding',  blurb: 'Local crowdfunding — raise for medical, school, and community causes.' },
  { slug: 'talkfreett',    name: 'TalkFreeTT',      url: 'https://talkfreett.com',                   tag: 'Social',        blurb: 'Open community forum — posts, comments, votes.' },
  { slug: 'foodtt',        name: 'FoodsTT',         url: 'https://www.foodstt.com',                  tag: 'Food',          blurb: 'Restaurants, menus, daily specials — the food platform for T&T.' },
  { slug: 'auctionsite',   name: 'DealzTT',         url: 'https://dealztt.com',                      tag: 'Auctions',      blurb: 'Live online auctions with bidding, watch-lists, seller dashboards.' },
  { slug: 'shop868',       name: 'Shop868',         url: 'https://shop868-web.vercel.app',           tag: 'E-commerce',    blurb: 'Mom-and-pop marketplace — small T&T shops selling directly online.' },
  { slug: 'launchtt',      name: 'LaunchTT',        url: 'https://launchtt.com',                     tag: 'Done-for-you',  blurb: '“Your business online in 48 hours” — turnkey launches for T&T merchants.' },
  { slug: 'sov-invoice',   name: 'Sov Invoice',     url: 'https://sov-invoice-saas.vercel.app',      tag: 'SaaS',          blurb: 'Invoicing SaaS — quotes, invoices, payment links, client management.' },
  { slug: 'weeklytop10',   name: 'Weekly Top 10',   url: 'https://weekly-top-10-plays.vercel.app',   tag: 'Sports',        blurb: 'Weekly highlight reel platform — voting, embeds, rankings.' },
  { slug: 'reviews',       name: 'ReviewTT',        url: 'https://reviewtt.vercel.app',              tag: 'Reviews',       blurb: 'Cross-platform review system powering ratings on every SOV site.' },
  { slug: 'admin',         name: 'SOV Admin',       url: 'https://admin.sovdigitalgroup.com',        tag: 'Internal',      blurb: 'Unified admin — users, moderation, analytics, queues.' },
  { slug: 'finance',       name: 'Finance Admin',   url: 'https://finance.sovdigitalgroup.com',      tag: 'Internal',      blurb: 'Finance back-office — revenue, payouts, reconciliations, reports.' },
  { slug: 'sovdigital',    name: 'SOV Digital',     url: 'https://sovdigitalgroup.com',              tag: 'Group',         blurb: 'The parent group site — portfolio, story, contact.' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<string>('All');
  const tags = ['All', ...Array.from(new Set(PROJECTS.map(p => p.tag)))];
  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.tag === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tags.map((t) => {
          const active = t === filter;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                active
                  ? 'border-transparent bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                  : 'border-border text-muted-foreground hover:border-blue-400 hover:text-foreground'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <a
            key={p.slug}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-slate-950">
              <Image
                src={`/portfolio/${p.slug}.png`}
                alt={`${p.name} screenshot`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur">
                {p.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black tracking-tight">{p.name}</h3>
                <ExternalLink className="size-3.5 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
              <div className="mt-3 truncate text-xs text-muted-foreground/70">{p.url.replace(/^https?:\/\//, '')}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
