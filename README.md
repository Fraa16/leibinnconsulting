# Leibinn Consulting — Website

Single-page marketing site for Leibinn Consulting (tax-optimised real-estate
investment consulting), plus the legally required Impressum and
Datenschutzerklärung.

**Stack:** Vite 7 · React 18 · TypeScript · Tailwind 3 · React Router 7
**Hosting:** Vercel (static build + one Edge Function for the contact forms)

---

## Quick start

```bash
npm install
npm run assets     # generates fonts, icons and image variants into public/
npm run dev        # http://localhost:5173
```

`npm run assets` only needs re-running when a source image or the font packages
change; its output is committed.

### Scripts

| Script                 | What it does                                                  |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Dev server, including a working `/api/lead` endpoint          |
| `npm run build`        | Production build into `dist/`                                 |
| `npm run preview`      | Serves `dist/` locally on port 4173                           |
| `npm run check`        | typecheck + lint + build — run before pushing                 |
| `npm run typecheck`    | `tsc --noEmit` over the app and the build/serverless code     |
| `npm run lint`         | ESLint, including `jsx-a11y` accessibility rules              |
| `npm run format`       | Prettier, with Tailwind class sorting                         |
| `npm run test:e2e`     | Playwright: end-to-end, keyboard and axe accessibility checks |
| `npm run assets`       | Regenerates fonts, favicons, OG card and responsive images    |
| `npm run assets:fetch` | Downloads the stock photographs so they can be self-hosted    |

---

## Editing the copy

**All German text lives in `src/content/`.** Components contain no prose, so
copy changes never require touching markup.

| File              | Section                                          |
| ----------------- | ------------------------------------------------ |
| `site.ts`         | Brand, navigation labels, meta description       |
| `hero.ts`         | Hero and "Ihr Immobilienpartner"                 |
| `problems.ts`     | "Das Problem …" cards                            |
| `orientation.ts`  | "Was Sie … wirklich brauchen"                    |
| `values.ts`       | "Ihr Mehrwert"                                   |
| `process.ts`      | The four-step process                            |
| `trust.ts`        | Trust grid and the partner card                  |
| `faq.ts`          | FAQ — **also feeds the FAQPage structured data** |
| `testimonials.ts` | Client quotes                                    |
| `contact.ts`      | Both forms, including validation messages        |
| `footer.ts`       | Footer                                           |

Editing `faq.ts` updates both the visible accordion and the JSON-LD Google reads
for rich results; they cannot drift apart.

---

## Before go-live — checklist

1. **Fill in the legal pages.** `/impressum` and `/datenschutz` render every
   missing value as a yellow `Todo` marker. Search for `<Todo>` in
   `src/pages/ImpressumPage.tsx` and `src/pages/DatenschutzPage.tsx`. Have the
   final text reviewed by a lawyer — the scaffold is not legal advice.
2. **Set the live domain** in `src/content/site.ts` (`site.url`),
   `index.html` (canonical + OG URLs), `public/robots.txt` and
   `public/sitemap.xml`.
3. **Configure mail delivery** (below), or leads are only logged, not sent.
4. **Self-host the photographs** (below) to remove the third-party request.
5. **Retire the leaked Supabase credentials** (see below).
6. Review `CONTENT.md` — every string not written by the client is listed there.

### Leaked Supabase credentials in git history

A `.env` containing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` was
committed in `b6197e9` and deleted again in `ba4a7c2`. Deleting a file does not
remove it from git history — both values are still readable to anyone with
access to this repository:

```bash
git show b6197e9:.env
```

Impact is limited: the `anon` key is a publishable key, meant to be visible in
browser code, and it is only as safe as the Row Level Security policies on that
Supabase project. This site no longer uses Supabase at all — the dependency has
been removed.

**Recommended:** delete that Supabase project, or at minimum rotate its keys and
confirm RLS is enabled on every table. If the repository is ever made public,
purge the file from history (`git filter-repo --path .env --invert-paths`) — note
that this rewrites history and requires a force push coordinated with everyone
working on the repo.

`.env` is now in `.gitignore`; use `.env.example` as the template.

---

## Contact forms

Both forms post JSON to `POST /api/lead`, an Edge Function that relays the
enquiry by email through [Resend](https://resend.com).

Set these in **Vercel → Settings → Environment Variables** (and in a local
`.env` for development):

```
RESEND_API_KEY=re_...              # from resend.com
LEAD_TO_EMAIL=info@example.de      # where enquiries should arrive
LEAD_FROM_EMAIL=website@example.de # a sender on a domain verified in Resend
```

The API key is only ever read server-side and is never sent to the browser.

**Without these variables the form still works**: it validates, submits and
shows the success state, but the lead is written to the server log instead of
emailed, and the success panel says so. It never fails silently.

The same handler runs under `npm run dev` via a small Vite plugin
(`scripts/lead-api-dev-plugin.ts`), so the Vercel CLI is not needed locally.

**Switching provider** (Web3Forms, Formspree, a CRM webhook, a database) means
editing one file: `src/lib/form/submitLead.ts`. No component imports anything
else.

### Anti-spam

A hidden honeypot field and a minimum fill time. Submissions that trip either are
answered with a `200` and discarded, so a bot gets no signal to adapt to. There is
also a best-effort per-IP rate limit.

---

## Images

Photographs are declared once in `src/lib/images.ts` and rendered through the
`<Picture>` primitive, which emits `srcset`, `sizes`, AVIF/WebP sources and the
right loading hints.

### Self-hosting the stock photographs

Four Pexels photographs are still loaded from `images.pexels.com`. Self-hosting
them removes a third-party request that transmits every visitor's IP address
(currently declared in the Datenschutzerklärung) and takes a DNS + TLS round trip
off the critical path for the largest image on the page.

```bash
npm run assets:fetch   # downloads the originals into assets-src/
npm run assets         # generates AVIF/WebP/JPEG variants into public/img/
```

Then set `USE_LOCAL_PHOTOS = true` in `src/lib/images.ts`. No component changes
are needed, and the Pexels section of the Datenschutzerklärung removes itself.

_(The download needs unrestricted network access; it was not possible from the
environment this was built in, which is why the flag is still `false`.)_

### Replacing an image

Drop the new file into `src/Images/`, adjust `scripts/build-assets.mjs` if the
crop should change, and run `npm run assets`.

---

## Design system

Every colour, size, shadow and easing value lives in `tailwind.config.js`.
Components use tokens (`bg-paper-200`, `text-ink-600`, `shadow-card`) and never
raw hex values, so the site can be re-skinned from that one file.

**Contrast rule worth knowing:** `accent-400` (`#75AED4`) is the brand light blue,
but it only reaches 2.42:1 against white. It is for surfaces, borders and icon
tints — never a background under light text. Use `accent-700` or darker when a
surface has to carry text. The accessibility tests will catch violations.

Typography is Playfair Display (display, echoing the Didone logo) over Inter
(body), both self-hosted from `public/fonts` — deliberately not from the Google
Fonts CDN, which would make every page view a data transfer to a third party.

---

## Testing

```bash
npm run test:e2e
```

Playwright runs against the production build at two viewports and covers:

- **zero axe violations** on all four routes (WCAG 2.0/2.1/2.2 A + AA)
- keyboard paths: skip link, mobile menu focus trap and Escape, FAQ arrow keys
- both forms: validation, mandatory DSGVO consent, success and failure states
- no horizontal overflow on a 360px phone
- `prefers-reduced-motion` renders content unanimated
- FAQPage structured data matches the content module

CI (`.github/workflows/ci.yml`) runs formatting, lint, typecheck, build and the
full test suite on every pull request, and reports gzip bundle sizes.

---

## Performance notes

Initial JavaScript is roughly **90 KB gzip**, below the original build's 97 KB,
despite adding a router, three extra routes and the whole form layer.

Two decisions carry most of that:

- **No animation library.** Scroll reveals are CSS transitions triggered by an
  IntersectionObserver (`src/components/ui/Reveal.tsx`). Dropping framer-motion
  saved ~30 KB gzip for effects the browser does natively on the compositor.
- **Scroll effects never call `setState`.** `useParallax` and `useScrollProgress`
  are rAF-throttled, gated by an IntersectionObserver so they do nothing
  off-screen, and write CSS custom properties rather than triggering renders.

`manualChunks` in `vite.config.ts` uses the **function** form on purpose: the
object form (`{ router: ['react-router-dom'] }`) promotes a package to an entry
point and disables tree-shaking for it.

---

## Project layout

```
api/                  Vercel Edge Function for lead submission
scripts/              Asset pipeline, dev-server plugin, screenshot helper
src/
  components/
    form/             Field, consent checkbox, status banner
    layout/           Header, Footer, SkipLink
    legal/            Legal page scaffolding and the Todo marker
    sections/         One component per page section
    seo/              JSON-LD
    ui/               Container, Section, Button, Card, Reveal, Picture …
  content/            All German copy — edit here
  lib/
    form/             Submission adapter and the shared form hook
    hooks/            Scroll, viewport, focus and motion hooks
  pages/              Route components
tests/                Playwright end-to-end and accessibility specs
```
