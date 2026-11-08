/**
 * Builds the social share image (public/og-image.jpg, 1200×630).
 *
 *   npm run og
 *
 * The card is laid out as HTML and photographed with the pre-installed
 * Chromium, so it is typeset in the site's own self-hosted Host Grotesk and
 * Geist Mono rather than whatever a server-side SVG renderer finds installed.
 * Same palette and type styles as the hero.
 */
import { chromium } from 'playwright';
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { launchOptions } from './chrome.mjs';

const OUT = resolve('public/og-image.jpg');
const W = 1200;
const H = 630;

const { lockup } = JSON.parse(readFileSync(resolve('src/assets/brand/logo-paths.json'), 'utf8'));
const file = (p) => pathToFileURL(resolve(p)).href;
// CSS masks are fetched in CORS mode, which file:// cannot satisfy, so inline it.
const lineA = `data:image/svg+xml;base64,${readFileSync(resolve('src/assets/brand/line-a.svg')).toString('base64')}`;

const logo = `<svg viewBox="${lockup.viewBox}" fill="#fff" style="height:24px;display:block">
  ${[...lockup.mark, ...lockup.name, ...lockup.tagline].map((d) => `<path d="${d}"/>`).join('')}
</svg>`;

const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<style>
  @font-face { font-family: 'Host Grotesk'; font-weight: 300 800; font-style: normal;
    src: url(${file('node_modules/@fontsource-variable/host-grotesk/files/host-grotesk-latin-wght-normal.woff2')}) format('woff2'); }
  @font-face { font-family: 'Host Grotesk'; font-weight: 300 800; font-style: italic;
    src: url(${file('node_modules/@fontsource-variable/host-grotesk/files/host-grotesk-latin-wght-italic.woff2')}) format('woff2'); }
  @font-face { font-family: 'Geist Mono'; font-weight: 500;
    src: url(${file('node_modules/@fontsource/geist-mono/files/geist-mono-latin-500-normal.woff2')}) format('woff2'); }
  * { box-sizing: border-box; margin: 0; }
  body { width: ${W}px; height: ${H}px; overflow: hidden; background: #08111F; color: #fff;
    font-family: 'Host Grotesk', sans-serif; -webkit-font-smoothing: antialiased; position: relative; }
  .line { position: absolute; left: -90px; bottom: -120px; width: 760px; aspect-ratio: 926/657; opacity: .1;
    background: #D6AE84; -webkit-mask: url(${lineA}) center/100% 100% no-repeat; }
  .photo { position: absolute; top: 40px; right: 40px; bottom: 40px; width: 420px; border-radius: 28px; overflow: hidden; background: #14233A; }
  .photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 18%; }
  .photo::after { content: ''; position: absolute; inset: auto 0 0 0; height: 40%;
    background: linear-gradient(0deg, rgba(8,17,31,.78), rgba(8,17,31,0)); }
  .copy { position: absolute; left: 72px; top: 64px; width: 600px; }
  .eyebrow { margin-top: 64px; display: flex; align-items: center; gap: 12px; color: #D6AE84;
    font: 500 14px/1 'Geist Mono', monospace; letter-spacing: .12em; text-transform: uppercase; }
  .eyebrow::before { content: ''; width: 22px; height: 1px; background: currentColor; }
  h1 { margin-top: 28px; font-weight: 400; font-size: 70px; line-height: .98; letter-spacing: -.045em; }
  em { font-style: italic; font-weight: 300; color: #D6AE84; }
  .cta { position: absolute; left: 72px; bottom: 64px; display: flex; align-items: center; gap: 16px; font-size: 19px; color: #A7B2C1; }
  .pill { height: 48px; padding: 0 22px; display: flex; align-items: center; border-radius: 999px;
    background: #B8875A; color: #08111F; font-weight: 600; font-size: 17px; }
</style></head>
<body>
  <div class="line"></div>
  <div class="photo"><img src="${file('assets-source/cedrik-standing.jpg')}" alt=""></div>
  <div class="copy">
    ${logo}
    <div class="eyebrow">Immobilien &amp; Steuern</div>
    <h1>Verwandeln Sie Steuerlast in <em>bleibendes Vermögen.</em></h1>
  </div>
  <div class="cta"><span class="pill">Kostenloses Erstgespräch</span><span>15 Min · mit Cedrik Leibinn</span></div>
</body></html>`;

// Loaded from a file:// page, because about:blank may not read local fonts and photos.
const dir = mkdtempSync(join(tmpdir(), 'lc-og-'));
const htmlPath = join(dir, 'og.html');
writeFileSync(htmlPath, html);

const browser = await chromium.launch(launchOptions());
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: 'png' });
await browser.close();
rmSync(dir, { recursive: true, force: true });

await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(OUT);
console.log(`og-image.jpg  ${(statSync(OUT).size / 1024).toFixed(0)} KB`);
