import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister';

const themeScript = `(function(){try{var t=localStorage.getItem('sov-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})();`;
const siteUrl = 'https://launchtt.com';
const defaultTitle = 'LaunchTT | Website Design, Online Ordering and Business Setup in Trinidad and Tobago';
const defaultDescription =
  'LaunchTT helps Trinidad & Tobago businesses get online, sell better, and manage their digital presence without hiring an expensive agency.';
const defaultKeywords = [
  'website design Trinidad',
  'website design Trinidad and Tobago',
  'small business website Trinidad',
  'online store Trinidad',
  'food ordering website Trinidad',
  'booking website Trinidad',
  'business launch Trinidad',
  'digital services Trinidad',
  'get my business online Trinidad',
  'WhatsApp ordering Trinidad',
  'invoice system Trinidad',
  'SEO services Trinidad',
];

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s | LaunchTT',
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    type: 'website',
    siteName: 'LaunchTT',
    locale: 'en_TT',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
  category: 'business',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1d4ed8',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  name: 'LaunchTT',
                  url: siteUrl,
                  description: defaultDescription,
                  inLanguage: 'en-TT',
                  areaServed: 'Trinidad and Tobago',
                },
                {
                  '@type': 'Organization',
                  '@id': `${siteUrl}/#organization`,
                  name: 'LaunchTT',
                  url: siteUrl,
                  description: defaultDescription,
                  areaServed: 'Trinidad and Tobago',
                  parentOrganization: {
                    '@type': 'Organization',
                    name: 'Sovereign Digital Group Ltd',
                    url: 'https://sovdigitalgroup.com',
                  },
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': `${siteUrl}/#localbusiness`,
                  name: 'LaunchTT',
                  url: siteUrl,
                  description: defaultDescription,
                  areaServed: [
                    'Trinidad and Tobago',
                    'Port of Spain',
                    'San Fernando',
                    'Chaguanas',
                    'Arima',
                    'Point Fortin',
                    'Tunapuna',
                    'Tobago',
                  ],
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'TT',
                    addressRegion: 'Trinidad and Tobago',
                  },
                  sameAs: ['https://sovdigitalgroup.com'],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
          <ServiceWorkerRegister />
        </AuthProvider>
      </body>
    </html>
  );
}
