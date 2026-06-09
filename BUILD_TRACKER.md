# LaunchTT — Build Tracker

**Project**: LaunchTT (formerly TTMerchant — T&T Business & Driver Onboarding)
**Location**: `C:\AI_WORKSPACE\01_PRODUCTS\WEB_APPS\ttmerchant`
**Repo**: `shanethabossS/ttMerchant`
**Vercel**: `launchtt.com`
**API Backend**: `api.sovdigitalgroup.com/api/shop868/*` (Express + VPS Postgres)
**Auth**: Central SOV Auth via proxy routes (HttpOnly cookies) + NextAuth Google OAuth
**Stack**: Next.js 16, TailwindCSS, TypeScript, mobile-first, light/dark mode

---

## Phase 1 — Core (MVP)

- [x] Project scaffolded (Next.js 16, Tailwind, shadcn)
- [x] Security headers in next.config.ts
- [x] Auth system (proxy routes: login, register, me, logout, accept-token)
- [x] Auth context provider + rate limiter
- [x] Auth proxy (proxy.ts) for protected routes
- [x] Landing page (hero, value props, search, CTA)
- [x] Login page (email/password + Google OAuth)
- [x] Signup page (full name, email, phone, password + Google)
- [x] Onboarding wizard (6-step: details → services → business info → uploads → plan → submit)
- [x] API proxy routes for shop868 backend (shops, listings)
- [x] Merchant dashboard (stats, catalog CRUD, launch checklist)
- [x] Public storefront (/store/[slug]) with SEO, products, deals, reviews, about tabs

## Phase 1.5 — LaunchTT Rebrand + Driver Intake (Session 2, 2026-05-25)

- [x] Rebranded from "Merchant Intake" → "LaunchTT"
- [x] New landing page with two paths: Business + Driver
- [x] Dark mode toggle (persisted to localStorage, respects system preference, no flash)
- [x] Dark mode CSS variables (already existed, now wired up with toggle)
- [x] Driver intake wizard (6-step: personal → vehicle/license → areas → availability → docs → review)
- [x] Driver intake API route (`/api/intake/driver-submit`)
- [x] Driver application store (JSON file-based, same as business leads)
- [x] Business intake moved to `/join/business` (old `/start` redirects)
- [x] Driver intake at `/join/driver`
- [x] Google OAuth on login + signup (NextAuth + Google provider)
- [x] Phone/WhatsApp verification UI component (OTP input, placeholder API)
- [x] KYC cross-check badge (checks if user verified on another SOV site, shows bonus badge)
- [x] Updated Navbar with theme toggle, new nav links (Business / Driver / Admin)
- [x] Updated Footer with new branding + links
- [x] Updated MobileMenu with new routes
- [x] Updated metadata/SEO for LaunchTT branding
- [x] Build passes, all routes compiled

## Phase 2 — Growth

- [ ] Subscription management (Starter/Growth/Business tiers)
- [ ] Analytics dashboard (views, clicks, WhatsApp taps)
- [ ] QR code generation
- [ ] Reviews integration
- [ ] KYC/verification flow (real API, not placeholder)
- [ ] WhatsApp automation templates
- [ ] Real OTP verification (Twilio or similar)
- [ ] Driver admin queue (in admin page)

## Phase 3 — Scale

- [ ] AI listing generator
- [ ] AI business assistant
- [ ] Delivery system prep (driver matching, route optimization)
- [ ] Ecosystem integrations (FixNowTT, FindWorkTT, FoodTT, etc.)
- [ ] Advanced admin moderation (use existing admin dashboard)

---

## Routes

### Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page — choose Business or Driver path |
| `/join/business` | Business intake wizard (6 steps) |
| `/join/driver` | Driver intake wizard (6 steps) |
| `/login` | Sign in (email/password + Google OAuth) |
| `/signup` | Create account (email/password + Google OAuth) |
| `/start` | Redirects → `/join/business` |
| `/dashboard` | Merchant dashboard |
| `/admin` | Admin queue board |
| `/stores` | Browse stores |
| `/store/[slug]` | Public storefront |
| `/onboarding` | Legacy onboarding |
| `/about` | About page |
| `/terms` | Terms page |
| `/privacy` | Privacy page |

### API Routes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/login | Proxy login to central API |
| POST | /api/auth/register | Proxy register to central API |
| GET | /api/auth/me | Get current user |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/accept-token | Accept auth token |
| GET/POST | /api/auth/[...nextauth] | NextAuth (Google OAuth) |
| POST | /api/intake/submit | Submit business application |
| POST | /api/intake/driver-submit | Submit driver application |
| POST | /api/intake/upload | Upload files (R2) |
| GET | /api/intake/leads | List leads |
| GET | /api/intake/queues | Queue counts |
| PATCH | /api/intake/lead/[id]/status | Update lead status |
| GET | /api/shops | Proxy to shop868 |
| GET | /api/listings | Proxy to shop868 |

---

## Key Components

| Component | File | Purpose |
|-----------|------|---------|
| IntakeWizard | `src/components/intake/IntakeWizard.tsx` | Business 6-step wizard |
| DriverWizard | `src/components/intake/DriverWizard.tsx` | Driver 6-step wizard |
| PhoneVerification | `src/components/intake/PhoneVerification.tsx` | OTP verify via SMS/WhatsApp |
| KycBadge | `src/components/intake/KycBadge.tsx` | Shows verified status from other SOV sites |
| ThemeToggle | `src/components/ThemeToggle.tsx` | Dark/light mode toggle |
| Navbar | `src/components/layout/Navbar.tsx` | Top nav with SOV network bar |
| Footer | `src/components/layout/Footer.tsx` | Footer with links |
| MobileMenu | `src/components/layout/MobileMenu.tsx` | Mobile hamburger menu |
| AuthProvider | `src/lib/auth-context.tsx` | Auth context (cookie-based) |

## Data Store

- File-based JSON store at `.data/merchant-intake.json`
- Collections: `users`, `leads`, `drivers`, `forms`, `media`, `subscriptions`, `notes`, `history`
- Driver applications stored in `drivers` array
- Business leads stored in `leads` array

---

## Change Log

### Session 1 — Initial Build
- Created BUILD_TRACKER.md
- Set up auth system, landing page, login/signup, onboarding wizard
- Built merchant dashboard and public storefront

### Session 2 — LaunchTT Rebrand + Driver Intake (2026-05-25)
- Rebranded entire app from "Merchant Intake" to "LaunchTT"
- New landing page with hero, stats, two-path cards (Business/Driver), benefits, CTA
- Added dark mode: CSS vars (already existed), ThemeToggle component, anti-flash script in layout
- Built DriverWizard (6 steps): personal info, vehicle/license, areas, availability/services, docs, review
- Created /api/intake/driver-submit route + createDriverApplication in store
- Added Google OAuth button to login + signup pages (NextAuth + signIn('google'))
- Built PhoneVerification component (WhatsApp/SMS OTP UI, placeholder backend)
- Built KycBadge component (checks /api/auth/me for kyc_status, shows bonus badge)
- Moved business wizard to /join/business, /start redirects
- Updated all layout components (Navbar, Footer, MobileMenu) with new branding
- Build compiles clean, all routes working

### TODO for next session
- Deploy to Vercel (push to GitHub → auto-deploy)
- Set up real OTP API (Twilio/MessageBird) for phone verification
- Add driver applications to admin queue page
- Test Google OAuth with real credentials on Vercel
- Custom domain setup if needed
