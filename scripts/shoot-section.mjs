/**
 * Screenshots individual sections, for reviewing one part of the page at a
 * time instead of slicing a 16,000px full-page capture.
 *
 *   node scripts/shoot-section.mjs <outDir> <width> <selector>[=name] ...
 *
 * The page is walked top to bottom first so every reveal has fired and every
 * lazy image has loaded; motion is left on, so what you see is the settled
 * state a visitor sees after scrolling.
 */
import { chromium } from 'playwright';
import { launchOptions } from './chrome.mjs';
import { mkdirSync } from 'node:fs';

const [outDir, widthArg, ...targets] = process.argv.slice(2);
const BASE = process.env.BASE || 'http://localhost:4173';
const width = Number(widthArg) || 1440;

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch(launchOptions());
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(BASE + (process.env.ROUTE || '/'), { waitUntil: 'load' });

const pages = await page.evaluate(() => Math.ceil(document.body.scrollHeight / innerHeight));
for (let i = 0; i <= pages; i++) {
  await page.evaluate((i) => scrollTo(0, i * innerHeight), i);
  await page.waitForTimeout(260);
}
await page.evaluate(() =>
  Promise.all(
    [...document.images]
      .filter((img) => !img.complete)
      .map((img) => new Promise((done) => {
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
        setTimeout(done, 5000);
      })),
  ),
);
await page.waitForTimeout(1600);

for (const target of targets) {
  const [selector, name = selector.replace(/[^a-z0-9]+/gi, '')] = target.split('=');
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  // Hide the sticky header so it does not sit over the capture.
  await page.addStyleTag({ content: 'header{visibility:hidden!important}' });
  await el.screenshot({ path: `${outDir}/${name}-${width}.png` });
  console.log(`${name}-${width}.png`);
}

await browser.close();
