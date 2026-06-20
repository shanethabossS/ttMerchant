import type { MetadataRoute } from 'next';
import { LAUNCHTT_LOCATION_PAGES, LAUNCHTT_SERVICE_PAGES } from '@/lib/seo/launchtt-pages';

const baseUrl = 'https://launchtt.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/start`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/web-design`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/drive`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/kyc`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...LAUNCHTT_SERVICE_PAGES.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    ...LAUNCHTT_LOCATION_PAGES.map((location) => ({
      url: `${baseUrl}/locations/${location.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/join/business`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/join/driver`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
