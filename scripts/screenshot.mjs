/**
 * Captures full-page screenshots of the running preview server at three widths.
 *
 *   npm run build && npx vite preview --port 4173 &
 *   node scripts/screenshot.mjs [outDir] [baseUrl]
 *
 * Development aid, not part of the build.
 */

import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const outDir = process.argv[2] ?? 'screenshots';
const baseUrl = process.argv[3] ?? 'http://localhost:4173';

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'impressum', path: '/impressum' },
  { name: 'datenschutz', path: '/datenschutz' },
  { name: '404', path: '/gibt-es-nicht' },
];

await mkdir(outDir, { recursive: true });

/*
 * Some environments ship a pre-installed Chromium whose build number differs
 * from the one this Playwright version expects. Point at it explicitly when
 * PLAYWRIGHT_CHROMIUM_PATH is set; otherwise use Playwright's own download.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;
const browser = await chromium.launch({ executablePath });

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'networkidle' });

    // Walk the page so every IntersectionObserver reveal has fired.
    await page.evaluate(async () => {
      // The site sets `scroll-behavior: smooth`, which makes programmatic
      // scrollTo animate — the loop below would retarget mid-animation and
      // never actually reach the lower sections.
      const previous = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';

      const step = window.innerHeight * 0.75;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 500));

      document.documentElement.style.scrollBehavior = previous;
    });

    const file = `${outDir}/${route.name}-${viewport.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
  }

  await context.close();
}

await browser.close();
