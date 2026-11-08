/**
 * Generates responsive AVIF + WebP derivatives from the photo masters.
 *
 * The Bolt export shipped unprocessed camera originals (25.7 MB total) straight
 * into the bundle. This produces the width variants each image is actually
 * displayed at, so the browser downloads kilobytes instead of megabytes.
 *
 *   npm run images
 *
 * Add a new photo by dropping it in assets-source/ and adding an entry below.
 */
import sharp from 'sharp';
import { mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SRC = resolve('assets-source');
const OUT = resolve('src/assets/images');

/**
 * widths: the CSS pixel widths each image is rendered at, x1 and x2.
 *
 * Most photos sit in `object-fit: cover` frames whose aspect differs from the
 * photo's, so the width the browser needs is the *covered* width, not the
 * frame's. The notes give that number at 1440px; `sizes` in src/ matches it.
 *
 * crop: optional `extract` region (in master pixels) applied before resizing.
 */
const IMAGES = [
  // Hero: 4:5 frame, ~460px wide beside the headline; full-bleed stacked.
  { in: 'cedrik-standing.jpg', out: 'cedrik-standing', widths: [480, 720, 960, 1400] },
  // Leistungen bento, large card: ~790×340 at desktop.
  { in: 'cedrik-meeting.jpg', out: 'cedrik-meeting', widths: [640, 960, 1280, 1600] },
  // Situation: 4:5 portrait frame over a landscape photo, so the covered
  // width is ~1.9× the frame width (≈ 980px at desktop).
  { in: 'ffm-towers.jpg', out: 'ffm-towers', widths: [640, 1000, 1400, 2000] },
  // Mehrwert: 5:4 frame, ~575px wide.
  { in: 'cedrik-presenting.jpg', out: 'cedrik-presenting', widths: [720, 1080, 1440] },
  // Vertrauen: 4:5 frame over a landscape photo (≈ 910px covered at desktop).
  { in: 'cedrik-portrait.jpg', out: 'cedrik-portrait', widths: [640, 960, 1400, 1900] },
  // Avatars (36–52px): the same photo, square-cropped the way the design's
  // `object-position: 45% 22%` frames it, so a 52px circle does not pull a
  // 2200px photo.
  {
    in: 'cedrik-portrait.jpg',
    out: 'cedrik-avatar',
    crop: { left: 283, top: 0, width: 1572, height: 1572 },
    widths: [104, 160],
  },
  // Termin: 16:10 frame, ~550px wide.
  { in: 'cedrik-window.jpg', out: 'cedrik-window', widths: [640, 960, 1280] },
  // Client avatars in the trust row and testimonials. The supplied files are
  // 71px; nothing larger exists.
  { in: 'client-okafor.png', out: 'client-okafor', widths: [71] },
  { in: 'client-mueller.png', out: 'client-mueller', widths: [71] },
  { in: 'client-silic.png', out: 'client-silic', widths: [71] },
];

const AVIF = { quality: 52, effort: 6 };
const WEBP = { quality: 80, effort: 5 };

const kb = (b) => (b / 1024).toFixed(0) + ' KB';
const mb = (b) => (b / 1024 / 1024).toFixed(1) + ' MB';

if (!existsSync(SRC)) {
  console.error(`No assets-source/ directory. Photo masters must live there.`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

let before = 0;
let after = 0;

// `npm run images -- cedrik-cutout` regenerates just the named outputs.
const only = process.argv.slice(2);
const selected = only.length ? IMAGES.filter((img) => only.includes(img.out)) : IMAGES;

for (const img of selected) {
  const src = join(SRC, img.in);
  if (!existsSync(src)) {
    console.warn(`skip ${img.in} — not found in assets-source/`);
    continue;
  }
  const srcBytes = statSync(src).size;
  before += srcBytes;

  const meta = await sharp(src).metadata();
  const srcWidth = img.crop ? img.crop.width : meta.width;
  console.log(`\n${img.in} → ${img.out}  ${srcWidth}×${img.crop ? img.crop.height : meta.height}  ${mb(srcBytes)}`);

  for (const w of img.widths) {
    if (w > srcWidth) continue;
    const source = img.crop ? sharp(src).extract(img.crop) : sharp(src);
    const base = source.resize({ width: w, withoutEnlargement: true });

    const avifPath = join(OUT, `${img.out}-${w}.avif`);
    const webpPath = join(OUT, `${img.out}-${w}.webp`);

    await base.clone().avif(AVIF).toFile(avifPath);
    await base.clone().webp(WEBP).toFile(webpPath);

    const a = statSync(avifPath).size;
    const b = statSync(webpPath).size;
    after += a + b;
    console.log(`  ${String(w).padStart(4)}w   avif ${kb(a).padStart(8)}   webp ${kb(b).padStart(8)}`);
  }
}

console.log(`\nmasters ${mb(before)}  →  derivatives ${mb(after)}`);
console.log(`(the browser loads one width, not all of them)`);

const generated = readdirSync(OUT).length;
console.log(`${generated} files in src/assets/images/`);
