import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister';

const themeScript = `(function(){try{var t=localStorage.getItem('sov-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})();`;
const siteUrl = 'https://launchtt.com';
const defaultTitle = 'LaunchTT | Done-for-you Online Launch | Trinidad and Tobago';
const defaultDescription =
  'We launch your business online, done for you. Websites, ordering, invoicing, booking, AI support, WhatsApp setup, payments, and search visibility for businesses across Trinidad and Tobago.';

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
              '@type': 'WebSite',
              name: 'LaunchTT',
              url: siteUrl,
              description: defaultDescription,
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
