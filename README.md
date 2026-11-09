# Leibinn Consulting

One-page site for Leibinn Consulting: steueroptimierte Immobilienstrategien for
entrepreneurs, executives and employees in Germany. One conversion goal:
booking the free 15-minute Erstgespräch with Cedrik Leibinn.

Vite · React 18 · TypeScript · Tailwind · self-hosted fonts

The design is the v4 redesign (`Leibinn Website v4`), rebuilt from its HTML
prototype at high fidelity: at 768, 1280 and 1440px every section renders
within about 1 % of the prototype pixel for pixel.

---

## Running it

```bash
npm install
cp .env.example .env     # optional: set VITE_CALENDLY_URL
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output on :4173 |
| `npm run typecheck` | `tsc --noEmit` (strict, no unused locals/params) |
| `npm run lint` | ESLint |
| `npm run images` | Regenerate responsive AVIF/WebP derivatives from `assets-source/` |
| `npm run logo` | Re-trace the brand lockup to vector paths (needs `potrace`) |
| `npm run lines` | Re-trace the brand line pattern to SVG masks (needs `potrace`) |
| `npm run icons` | Regenerate `public/favicon.svg` and the touch icons |
| `npm run og` | Regenerate `public/og-image.jpg` (renders with Playwright) |

Verification (needs `npm run preview` running):

```bash
node scripts/test-nav.mjs              # every CTA, routing, calculator, FAQ, booking, overflow, a11y, mobile menu
node scripts/copyguard.mjs out.txt     # dumps all rendered copy, for diffing
node scripts/shoot.mjs out/ http://localhost:4173 tag --reduced
node scripts/shoot-section.mjs out/ 1440 "#rechner" "#faq=faq"
```

---

## Before this goes live

1. **Calendly.** The booking card loads the shared 60-minute event
   (`https://calendly.com/beratung-leibinn-consulting/60min`, the same link on
   every Leibinn site) behind a click-to-load consent step; nothing is requested
   from Calendly before the click. `VITE_CALENDLY_URL` can override it. Styling is
   passed as URL parameters (copper `B8875A`, ink `0D1A2D`, white background).
   The link also carries the visitor's campaign (`utm_*`) and a source tag, and a
   completed booking is reported to the lead service, so it appears in the lead
   overview with "LP3" and its campaign.
2. **Tax adviser sign-off** on the calculator model (`src/lib/calculator.ts`)
   and every figure that comes from it (hero card, Rechner, Ablauf step 03).
   The model is implemented exactly as the design handoff specifies; the
   disclaimer next to the result must stay.
3. **Partner-bank logos.** The "Finanzierung über renommierte Partnerbanken"
   row is hidden until `PARTNER_BANKS` in
   `src/components/LeistungenSection.tsx` has entries.
4. **Testimonial videos.** The three quotes show without a play button until a
   `video` (and ideally a `poster`) is set per entry in
   `src/components/StimmenSection.tsx`. Self-hosted files keep the page free of
   third-party embeds. Confirm in writing that the three clients agreed to be
   quoted with name, role and photo.
5. **Datenschutz.** The Impressum is copied 1:1 from the main website (all
   Leibinn sites share it). The Datenschutz page is still scaffolding: it gets
   aligned with the main site's text once the shared services are decided, then
   needs a lawyer's review.
6. **Image licence.** `ffm-towers.jpg` (Situation section) is from Unsplash.
   Check the licence and whether a credit is wanted.
7. **Production domain.** `https://leibinn-consulting.de` is assumed in
   `index.html` (canonical, OG, JSON-LD), `public/sitemap.xml`,
   `public/robots.txt` and `SITE_ORIGIN` in `src/hooks/useDocumentMeta.ts`.
8. **Logo.** The header and footer draw a vector trace of the supplied raster
   lockup. Swap in the original vector file if the client has one
   (`scripts/trace-logo.mjs` explains the format).
9. **SPA rewrite.** `public/_redirects` (Netlify) and `vercel.json` are both
   included; one of them must apply, or a direct load of `/impressum` 404s.

This replaces the earlier Bolt-generated page ("Cedrik LP3"). Its two contact
forms had no submit handler, so they never delivered an enquiry; the booking
card in `#termin` is now the single path. The unused Supabase, framer-motion
and lucide-react dependencies are gone. `/impressum` and `/datenschutz`, which
the old footer linked to but which did not exist, are now real routes.

**Tracking and consent.** Statistics run on Vercel Web Analytics without cookies.
The cookie banner (`src/lib/consent.ts`, the same file on every Leibinn site) loads
Meta Pixel and LinkedIn Insight Tag only after consent and only once their IDs are
set (`VITE_META_PIXEL_ID`, `VITE_LINKEDIN_PARTNER_ID`, `VITE_LINKEDIN_CONVERSION_LEAD`,
`VITE_LINKEDIN_CONVERSION_BOOKING`). A completed Calendly booking counts as a
conversion. Consent records go to the central lead service
([Fraa16/leibinn-leads](https://github.com/Fraa16/leibinn-leads), `VITE_LEADS_API_URL`).

---

## Structure

```
src/
  pages/HomePage.tsx          section order (01–10, as numbered in the eyebrows)
  components/
    Navigation.tsx            floating pill header, "Menü" dropdown below 1000px
    HeroSection.tsx … TerminSection.tsx   one file per section
    MockCalendar.tsx          the prototype's booking mock (default)
    CalendlyEmbed.tsx         Calendly behind click-to-load (when the URL is set)
    Footer.tsx, LegalLayout.tsx
    ui/                       Logo, BrandLine, Image, Reveal, SectionHead, SectionLink, icons
  lib/
    calculator.ts             the tax model, cases and disclaimer
    images.ts                 responsive image manifest
  index.css                   fonts, base rules, type/layout/button component classes
tailwind.config.js            design tokens
```

## Design system

Tokens live in `tailwind.config.js`; combined type styles (`t-h1`, `t-h2`,
`t-h2-xl`, `t-accent`, `t-lead`, `eyebrow`, `label`), layout (`shell`,
`section-dark`, `panel-light`, `section-head`) and buttons (`btn-copper`,
`btn-ink`, `btn-outline`) are component classes in `src/index.css`.

| Token | Hex | Use |
| --- | --- | --- |
| `navy-950` | `#08111F` | page background, text on copper |
| `navy-975` | `#060D18` | footer |
| `navy-900` | `#0E1A2C` | cards on dark, sticky nav (80 % + blur) |
| `navy-850` | `#14233A` | inner panels on dark, image fallback |
| `ink` | `#0D1A2D` | text and dark cards on light |
| `ivory` | `#F4F2ED` | light section panels |
| `copper` / `-light` / `-dark` | `#B8875A` / `#D6AE84` / `#8A5E36` | CTA; accent on dark; accent on light |
| `sky` / `-deep` | `#8FB3D9` / `#24406A` | data bars |
| `mist` / `-subtle` / `-strong` | `#A7B2C1` / `#7F8A99` / `#E2E7EE` | text on dark |
| `stone` / `-subtle` / `-faint` | `#4A5261` / `#6E7480` / `#8C919A` | text on light |
| `line` / `-soft` / `-faint` | `#DDD8CE` / `#E6E1D8` / `#ECE8E1` | borders on light |

Breakpoints follow the handoff: `xs` 600, `sm` 640, `lg` 1000 (nav collapses,
splits stack), `xl` 1100.

**Type.** Host Grotesk (variable, roman and italic) for everything readable,
Geist Mono 400/500 for eyebrows, labels and figures. Both are self-hosted via
`@fontsource`, so no visitor IP reaches Google. Line height is reset to the
font's `normal` globally, as in the prototype, and set explicitly where the
design sets it.

**Motion.** Blocks below the hero fade up 24px once they scroll into view
(`useReveal` + `.a-rise`). The hero itself is not animated, so the LCP image
paints immediately. All of it is off under `prefers-reduced-motion`.

## Images

`assets-source/` holds the masters supplied with the design; nothing in `src/`
imports them. `npm run images` writes AVIF/WebP derivatives at the widths each
frame needs to `src/assets/images/`; `src/lib/images.ts` picks them up and
`ui/Image` serves them via `<picture>`. Many frames crop a landscape photo into
a portrait box, so `sizes` describes the covered width, not the box width.
Only the hero image loads eagerly.

To add a photo: drop it in `assets-source/`, add an entry to
`scripts/optimize-images.mjs`, run `npm run images`, export it from
`src/lib/images.ts`.

## Brand assets

- `src/assets/brand/lockup-*.webp`, `*.png`: the logo as supplied; the source
  of truth. `npm run logo` traces it to `src/components/ui/logo-paths.ts`.
- `src/assets/brand/line-a.svg`, `line-b.svg`: the brand line pattern, traced
  from `assets-source/brand-lines/` by `npm run lines`. `ui/BrandLine` uses
  them as CSS masks, so one file serves the copper, ink and white variants.

## Deviations from the prototype

All intentional, all small:

- The partner-bank row and the testimonial play buttons / "Video · Platzhalter"
  chips are hidden until real logos and videos exist.
- The mock calendar shows the current month (or the next, near month end) with
  past days disabled, instead of a fixed November 2026.
- Below 600px the calculator's three result tiles stack; side by side they
  overflow at phone widths in the prototype.
- Below 640px FAQ answers use the full card width instead of a 78px right
  margin, and the "Persönlicher Service" photo card gets a bottom scrim so
  its full-width text stays legible.
- `text-wrap: balance` / `pretty` apply to all headlines and body text, as the
  handoff README specifies, which re-wraps a few card titles slightly.
- The © year in the footer is the current year.
