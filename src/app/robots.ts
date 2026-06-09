import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/start', '/join', '/about', '/terms', '/privacy'],
        disallow: ['/admin', '/dashboard', '/login', '/signup', '/offline', '/store'],
      },
    ],
    sitemap: 'https://launchtt.com/sitemap.xml',
    host: 'https://launchtt.com',
  };
}
