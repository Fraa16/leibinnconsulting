/**
 * Screenshots each route at a set of viewports.
 *
 *   node scripts/shoot.mjs <outDir> <baseUrl> <tag> [--reduced]
 *
 * Scroll-reveal animations only settle once each section has actually been in
 * the viewport, so the page is walked down slowly before capture. Passing
 * --reduced emulates prefers-reduced-motion instead, which renders everything
 * in its final state immediately.
 */
import { chromium } from 'playwright';
import { launchOptions } from './chrome.mjs';
import { mkdirSync } from 'node:fs';

const [outDir, base, tag] = process.argv.slice(2);
const reduced = process.argv.includes('--reduced');

const ROUTES = [
  ['/', 'home'],
  ['/impressum', 'impressum'],
];
const VIEWPORTS = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch(launchOptions());

for (const [vpName, width, height] of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  });

  for (const [route, name] of ROUTES) {
    await page.goto(base + route, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    /*
     * Walk down a viewport at a time. Under --reduced the reveals need no
     * settling, but the walk still has to happen: every image below the fold
     * is loading="lazy", and a full-page screenshot does not wait for the
     * decode it triggers — skipping the walk photographs empty frames.
     */
    const pages = await page.evaluate(() => Math.ceil(document.body.scrollHeight / window.innerHeight));
    for (let i = 0; i <= pages; i++) {
      await page.evaluate((i) => window.scrollTo(0, i * window.innerHeight), i);
      await page.waitForTimeout(reduced ? 180 : 450);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    // Every <img> that started loading must also have finished. A broken one
    // never fires `load`, so each wait is capped rather than left hanging.
    await page.evaluate(
      () =>
        Promise.all(
          [...document.images]
            .filter((img) => !img.complete)
            .map(
              (img) =>
                new Promise((done) => {
                  const finish = () => done(undefined);
                  img.addEventListener('load', finish, { once: true });
                  img.addEventListener('error', finish, { once: true });
                  setTimeout(finish, 5000);
                }),
            ),
        ),
      undefined,
    );
    await page.waitForTimeout(600);

    await page.screenshot({ path: `${outDir}/${tag}-${name}-${vpName}.png`, fullPage: true });
    console.log(`${tag}-${name}-${vpName}.png`);
  }
  await page.close();
}

await browser.close();
