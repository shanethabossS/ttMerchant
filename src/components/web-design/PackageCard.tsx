import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PACKAGES = [
  {
    name: 'Starter Website',
    price: 'TT$1,500 setup',
    cadence: 'TT$150/month',
    blurb: 'Best for small businesses that need a simple online presence.',
    features: [
      '1-3 page website',
      'Mobile responsive design',
      'Contact form',
      'WhatsApp button',
      'Basic SEO setup',
      'Google Maps embed',
      'Hosting and maintenance included in monthly fee',
    ],
    cta: 'Start Website',
    href: '/start?plan=starter',
  },
  {
    name: 'Business Website',
    price: 'TT$3,500 setup',
    cadence: 'TT$250/month',
    blurb: 'Best for businesses that need a stronger website with service pages and lead generation.',
    features: [
      'Up to 6 pages',
      'Service/product sections',
      'Contact form',
      'WhatsApp integration',
      'Basic SEO',
      'Google Maps',
      'Image gallery',
      'Admin-editable content where applicable',
      'Hosting, updates, and maintenance included',
    ],
    cta: 'Build My Business Site',
    href: '/start?plan=business',
    featured: true,
  },
  {
    name: 'Shop868 Store',
    price: 'TT$2,500 setup',
    cadence: 'TT$300/month',
    blurb: 'Best for businesses that want to sell products online.',
    features: [
      'Shop868 business profile',
      'Online storefront',
      'Product catalog setup',
      'WhatsApp ordering',
      'Basic inventory/product management',
      'Customer inquiry/order flow',
      'Future TTPay integration when available',
      'Hosting and support included',
    ],
    cta: 'Launch My Store',
    href: '/start?plan=store',
  },
  {
    name: 'Premium Digital Package',
    price: 'TT$6,500 setup',
    cadence: 'TT$500/month',
    blurb: 'Best for businesses that want a complete digital system.',
    features: [
      'Full business website',
      'Shop868 storefront',
      'InvoiceTT setup',
      'Product/service catalog',
      'WhatsApp integration',
      'SEO setup',
      'Google Maps',
      'Analytics setup',
      'Monthly support',
      'Priority updates',
    ],
    cta: 'Get Full Package',
    href: '/start?plan=premium',
  },
];

export function PackageCard({
  name,
  price,
  cadence,
  blurb,
  features,
  cta,
  href,
  featured,
}: {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <article className={`flex flex-col rounded-2xl border bg-card p-6 shadow-sm ${featured ? 'border-blue-500 ring-2 ring-blue-500/15' : 'border-border'}`}>
      <p className={`text-sm font-bold uppercase tracking-wider ${featured ? 'text-blue-600' : 'text-muted-foreground'}`}>{name}</p>
      <p className="mt-2 text-4xl font-black">{price}</p>
      <p className="mt-1 text-sm text-muted-foreground">{cadence}</p>
      <p className="mt-4 text-sm text-muted-foreground">{blurb}</p>
      <ul className="mt-5 space-y-2 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-green-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={href} className="mt-6">
        <Button className="w-full" variant={featured ? 'default' : 'outline'}>{cta}</Button>
      </Link>
    </article>
  );
}
