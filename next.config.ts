import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@sov/shell'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // This host had no CSP either — found while verifying the other three on
          // 2026-10-14, so the real count was four, not the two first reported.
          //
          // Google entries match the pattern already proven on ttclassifieds and the
          // other auth sites: this app signs in with next-auth's Google provider, and
          // while that is a redirect rather than an embedded frame, Google's own
          // flows can fall back to one. Allowing it costs nothing and a broken login
          // is far worse than a slightly wider policy.
          //
          // static.cloudflareinsights.com is Cloudflare's analytics beacon, injected
          // at the edge rather than by this app — invisible in source, visible only
          // when the page is loaded in a real browser.
          //
          // api.resend.com is deliberately absent: email is sent server-side, so the
          // browser never calls it.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://api.sovdigitalgroup.com https://assets.sovdigitalgroup.com",
              "connect-src 'self' https://api.sovdigitalgroup.com https://accounts.google.com https://cloudflareinsights.com",
              "frame-src https://accounts.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://accounts.google.com",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
