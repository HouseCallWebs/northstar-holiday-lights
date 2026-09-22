# Northstar Holiday Lights — Housecallwebs Demo

A fictional Christmas light installation company built to demonstrate the
Housecallwebs productized website + booking system for home-service
businesses. Built with **Next.js 16 (App Router) + TypeScript + Tailwind
CSS v4**, deploy-ready on Vercel.

> This is a demo. "Northstar Holiday Lights" is not a real business — all
> pricing, reviews, and contact details are illustrative only. A slim
> banner and footer credit on every page make that clear to anyone who
> sees the site.

## Quick Start

```bash
npm install
npm run dev -- --port 3040
```

Open [http://localhost:3040](http://localhost:3040).

## Environment Variables

Copy `.env.example` to `.env.local`. **Nothing is required to run the
demo** — bookings and quotes save to `/data/*.json` and log to the server
console regardless of what's configured.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Used in metadata, `sitemap.xml`, and JSON-LD. Set to your real domain when deployed. |
| `ADMIN_PASSWORD` | Password for `/admin`. Defaults to `northstar-demo`. |
| `BOOKING_WEBHOOK_URL` | Optional — POSTs every booking/quote payload here (e.g. a Zapier/Make webhook). |
| `RESEND_API_KEY` + `OWNER_NOTIFY_EMAIL` | Optional — sends an email via [Resend](https://resend.com) for every new booking/quote. Both must be set. |

## How Data Is Stored (demo-grade persistence)

Bookings and quotes are written to `data/bookings.json` and
`data/quotes.json` on disk (see [lib/storage.ts](lib/storage.ts)). This
is intentionally simple so the demo runs with zero setup — no database,
no external services.

**For a real deployment on serverless hosting (Vercel, etc.)**, swap this
for a real database (Postgres/Supabase/PlanetScale/etc.) — the
filesystem on serverless functions is ephemeral outside of `/tmp` and
won't reliably persist between requests. The `saveBooking` /
`saveQuote` / `getBookings` / `getQuotes` functions in
`lib/storage.ts` are the swap-in points; the rest of the app doesn't
care where the data lives.

## Routes

| Route | Description |
| --- | --- |
| `/` | Homepage — hero, trust row, services, packages, gallery, how-it-works, service areas, testimonials, FAQ, final CTA |
| `/book` | **Auto-booking flow** — 4-step wizard (service → schedule → contact → review) with a real calendar date picker and time windows. Saves to `data/bookings.json`. |
| `/quote` | Lead/quote request form. Saves to `data/quotes.json`. |
| `/services` | Services overview |
| `/services/[slug]` | Individual service pages: `residential-install`, `commercial-hoa`, `maintenance`, `takedown-storage` |
| `/areas` | Full service-area city list (12 Denver-metro cities) |
| `/areas/[city]` | Local SEO landing pages for 3 sample cities: `denver`, `highlands-ranch`, `littleton` |
| `/admin` | Password-protected lead dashboard — lists all bookings and quotes, newest first, with JSON export buttons |
| `/sitemap.xml`, `/robots.txt` | Auto-generated SEO files |

### API Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/book` | `POST` | Validates + saves a booking, fires notification |
| `/api/quote` | `POST` | Validates + saves a quote request, fires notification |
| `/api/admin/login` | `POST` / `DELETE` | Admin login / logout (cookie-based) |
| `/api/admin/export` | `GET` | Downloads `bookings.json` or `quotes.json` (auth required) |

## Features Completed

- ✅ Full marketing homepage (hero, trust badges, services, Good/Better/Best
  pricing, gallery, how-it-works, service-area map placeholder,
  testimonials, FAQ accordion, final CTA)
- ✅ **Auto booking** — real calendar UI, time windows, multi-step form,
  confirmation number, success screen, persisted to disk
- ✅ Quote/lead form with success state
- ✅ Click-to-call (`tel:`) and click-to-text (`sms:`) links throughout,
  plus a sticky mobile call/book bar
- ✅ Individual service pages + commercial/HOA page
- ✅ Local SEO: unique metadata per page, JSON-LD `LocalBusiness` +
  `Service` schema, `sitemap.xml`, `robots.txt`, 3 city landing pages
- ✅ Spam protection: honeypot field + basic in-memory rate limiting on
  both form endpoints
- ✅ Admin-lite lead dashboard at `/admin` (password via env var) with
  JSON export
- ✅ Mobile-first responsive design, accessible form labels, loading/empty
  states
- ✅ Housecallwebs demo banner (sticky, top of every page) + footer credit

## Demo Script (what to click when selling)

1. **Homepage** — scroll through hero → packages → gallery → FAQ. Point
   out the premium look and the "Booked Online" trust badge.
2. **Click "Book Your Install"** — walk through the 4-step booking
   wizard live: pick a package, pick a date on the real calendar, pick a
   time window, enter contact info, hit Confirm. Show the confirmation
   number.
3. **Open `/admin`** in a new tab (password: value of `ADMIN_PASSWORD`,
   defaults to `northstar-demo`) — show the booking that just landed,
   in real time. This is the "see, leads land here" moment.
4. **Show `/quote`** as the lower-commitment lead-capture alternative.
5. **Show a city page** (`/areas/denver`) to demonstrate the local-SEO
   play, and mention the sitemap/schema work happening under the hood.
6. **Resize to mobile** (or open on a phone) to show the sticky
   call/book bar — the moment that sells a busy contractor on "I need
   this before Thanksgiving."

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Zod (form validation)
- Framer Motion, lucide-react (icons), clsx + tailwind-merge

## Deploying to Vercel

```bash
npm run build
```

Push to a Git repo and import into Vercel, or run `vercel deploy`. Set
the environment variables above in the Vercel project settings. Remember
to swap the JSON-file storage for a real database before relying on this
in production (see "How Data Is Stored" above).
