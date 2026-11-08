/**
 * Copy guard.
 *
 * Extracts every piece of visible text the site renders, so a redesign can be
 * verified to have changed no wording at all.
 *
 *   node scripts/copyguard.mjs <out-file> [baseUrl]
 *
 * Uses innerText rather than raw text nodes, so wrapping a phrase in <strong>
 * or splitting a paragraph does not register as a copy change — only the
 * words matter. Captured at a mobile and a desktop viewport, since some
 * blocks render at only one breakpoint.
 */
import { chromium } from 'playwright';
import { launchOptions } from './chrome.mjs';
import { writeFileSync } from 'node:fs';

const OUT = process.argv[2];
const BASE = process.argv[3] || 'http://localhost:4173';
const ROUTES = ['/', '/impressum', '/datenschutz'];
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
];

const browser = await chromium.launch(launchOptions());
const found = new Set();

for (const viewport of VIEWPORTS) {
  const page = await browser.newPage({ viewport });

  const capture = async () => {
    const texts = await page.evaluate(() => {
      const out = [];
      for (const line of (document.body.innerText || '').split('\n')) {
        const s = line.replace(/\s+/g, ' ').trim();
        if (s) out.push(s);
      }
      for (const el of document.querySelectorAll('[placeholder]')) {
        if (el.placeholder?.trim()) out.push('@placeholder: ' + el.placeholder.trim());
      }
      for (const el of document.querySelectorAll('img[alt]')) {
        if (el.alt.trim()) out.push('@alt: ' + el.alt.trim());
      }
      for (const el of document.querySelectorAll('[aria-label]')) {
        const v = el.getAttribute('aria-label')?.trim();
        if (v) out.push('@aria: ' + v);
      }
      for (const el of document.querySelectorAll('option')) {
        const v = el.textContent?.trim();
        if (v) out.push('@option: ' + v);
      }
      return out;
    });
    texts.forEach((t) => found.add(t));
  };

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    await capture();

    /*
     * Deterministic pass: strip every `hidden` attribute so collapsed panels
     * are readable regardless of single-open behaviour. Clicking alone is
     * flaky — one missed click silently looks like deleted copy.
     */
    await page.evaluate(() => {
      document.querySelectorAll('[hidden]').forEach((el) => el.removeAttribute('hidden'));
    });
    await page.waitForTimeout(120);
    await capture();

    /*
     * Disclosures are re-queried on every iteration: accordions here are
     * single-open, and each click re-renders the list, so handles collected
     * up front go stale and the later panels would never be read.
     */
    const disclosures = page.locator('button[aria-expanded]');
    const disclosureCount = await disclosures.count();
    for (let i = 0; i < disclosureCount; i++) {
      try {
        const button = disclosures.nth(i);
        await button.scrollIntoViewIfNeeded({ timeout: 900 });
        await button.click({ timeout: 900 });
        await page.waitForTimeout(160);
        await capture();
      } catch {
        /* not reachable at this breakpoint */
      }
    }

    // Then anything else that swaps visible content: tabs, toggles, carousels.
    const others = page.locator('button:not([aria-expanded]), [role="radio"]');
    const otherCount = await others.count();
    for (let i = 0; i < otherCount; i++) {
      try {
        const button = others.nth(i);
        const label = ((await button.innerText()) || '').trim();
        if (/anfragen|sichern|senden|absenden|bestätigen|kalender laden/i.test(label)) continue;
        await button.click({ timeout: 600 });
        await page.waitForTimeout(140);
        await capture();
      } catch {
        /* not clickable at this breakpoint */
      }
    }
  }

  await page.close();
}

await browser.close();

const sorted = [...found].sort((a, b) => a.localeCompare(b, 'de'));
writeFileSync(OUT, sorted.join('\n') + '\n');
console.log(`${sorted.length} unique strings → ${OUT}`);
