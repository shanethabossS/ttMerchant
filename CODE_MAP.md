# LaunchTT — code map

Next.js 16 app (App Router). Concierge onboarding for businesses: marketing pages, a lead
form, and a few service landing pages. Last reviewed 2026-10-28.

| Where | What it is |
|---|---|
| `src/app/page.tsx`, `about/`, `services/`, `locations/`, `store/`, `stores/`, `drive/`, `food/`, `web-design/`, `join/` | Public marketing and service pages |
| `src/app/start/` + `components/start/StartForm.tsx` | Main lead form (posts to `/api/intake/submit`) |
| `src/app/api/intake/submit` | Lead intake. Signed-in merchants save to the central API (`/api/merchants/me`); **signed-out leads go to the central contact queue** (`/api/contact/messages/public`) |
| `src/app/api/food-application`, `web-design-contact` | Email the team through Resend; log a warning (never the body) if no key |
| `src/app/api/auth/*` | Cookie-setting proxies to central auth |
| `src/app/api/listings`, `shops` | Return 410 on purpose: marketplace APIs are off in phase 1 |
| `src/app/api/merchants/[...path]` | Pass-through to central merchant API (needs a real SOV token) |
| `src/lib/intake/` | Legacy file-based lead store + `db.ts` Prisma tables. **Dead on Vercel** (read-only disk, no `DATABASE_URL`) — see launch list |
| `src/auth.ts`, `src/lib/prisma.ts`, `prisma/` | NextAuth + Prisma. **Not configured in production** (`/api/auth/session` returns 500). Nothing user-facing depends on it |
| `src/proxy.ts` | Redirects signed-out visitors from `/dashboard`, `/onboarding`, `/admin` |

Conventions: never trust a `local_` cookie as an identity; never log submission bodies.
