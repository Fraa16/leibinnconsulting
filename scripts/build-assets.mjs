/**
 * Asset pipeline.
 *
 *   node scripts/build-assets.mjs
 *
 * Generates everything under public/ that is derived from a source file, so the
 * outputs are reproducible rather than hand-made binaries nobody can regenerate:
 *
 *   • self-hosted webfont files      (from the @fontsource-variable packages)
 *   • responsive portrait variants   (from src/Images/cedrik.webp)
 *   • testimonial avatars            (from src/Images/sm*.jpg)
 *   • favicon / apple-touch / PWA icons and the OG card (from the logo)
 *   • responsive photo variants      (from assets-src/, when present)
 *
 * Run it after replacing any source image.
 */

import { mkdir, copyFile, writeFile, access, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'src/Images');
const OUT_IMG = join(root, 'public/img');
const OUT_FONTS = join(root, 'public/fonts');
const OUT_ICONS = join(root, 'public');
const REMOTE_SRC = join(root, 'assets-src');

const INK = '#1F2841';
const ACCENT = '#75AED4';

const exists = async (p) => access(p).then(() => true).catch(() => false);
const log = (...a) => console.log('  ', ...a);

/* ------------------------------------------------------------------ fonts */

const FONTS = [
  ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'inter-latin.woff2'],
  ['@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2', 'inter-latin-ext.woff2'],
  [
    '@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2',
    'playfair-display-latin.woff2',
  ],
  [
    '@fontsource-variable/playfair-display/files/playfair-display-latin-ext-wght-normal.woff2',
    'playfair-display-latin-ext.woff2',
  ],
];

async function syncFonts() {
  console.log('\nFonts → public/fonts');
  await mkdir(OUT_FONTS, { recursive: true });
  for (const [from, to] of FONTS) {
    const source = join(root, 'node_modules', from);
    if (!(await exists(source))) {
      throw new Error(
        `Missing font file: ${from}\nRun \`npm install\` first, or check the @fontsource-variable version.`,
      );
    }
    await copyFile(source, join(OUT_FONTS, to));
    log(to);
  }
}

/* --------------------------------------------------------------- pictures */

/** Emit avif + webp + jpg at each width. */
async function emitVariants(pipeline, id, widths, { fit = 'cover' } = {}) {
  for (const width of widths) {
    const base = pipeline.clone().resize({ width, fit, withoutEnlargement: true });
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(join(OUT_IMG, `${id}-${width}.avif`));
    await base.clone().webp({ quality: 74 }).toFile(join(OUT_IMG, `${id}-${width}.webp`));
    await base
      .clone()
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toFile(join(OUT_IMG, `${id}-${width}.jpg`));
  }
  log(`${id}: ${widths.join(', ')}`);
}

/**
 * The portrait is a 2787×1990 landscape frame. The original site dropped it into
 * a 260–360px tall box with object-cover, which cropped the subject badly.
 * Crop to a real 3:4 portrait around the subject instead.
 */
async function buildPortrait() {
  console.log('\nPortrait → public/img');
  const source = join(SRC, 'cedrik.webp');
  const { width, height } = await sharp(source).metadata();

  const cropHeight = height;
  const cropWidth = Math.round(cropHeight * (3 / 4));
  // Subject sits right of centre in the frame.
  const subjectCentreX = Math.round(width * 0.615);
  const left = Math.max(0, Math.min(width - cropWidth, subjectCentreX - Math.round(cropWidth / 2)));

  const pipeline = sharp(source).extract({ left, top: 0, width: cropWidth, height: cropHeight });
  await emitVariants(pipeline, 'cedrik', [480, 720, 960]);
}

async function buildAvatars() {
  console.log('\nAvatars → public/img');
  for (const [file, id] of [
    ['sm.jpg', 'avatar-winsome'],
    ['sm-2.jpg', 'avatar-tom'],
    ['sm-1.jpg', 'avatar-luka'],
  ]) {
    const pipeline = sharp(join(SRC, file));
    await emitVariants(pipeline, id, [96, 192]);
  }
}

/* ------------------------------------------------------------------ icons */

/**
 * Isolate the ribbon mark from the left of the wordmark, trimmed and squared.
 *
 * Each stage is buffered: sharp reorders `trim` ahead of `extract` within a
 * single pipeline, which would crop against the wrong dimensions.
 */
async function markBuffer(size, { light = false } = {}) {
  const logo = join(SRC, light ? 'lc-logo-lang.webp' : 'lc-logo-lang-d.webp');

  // 1. Remove the transparent margin so proportions are measured off real content.
  const trimmed = await sharp(logo).trim().toBuffer();
  const { width, height } = await sharp(trimmed).metadata();

  // 2. The mark occupies roughly the first 18% of the lockup.
  const markWidth = Math.round(width * 0.18);
  const extracted = await sharp(trimmed)
    .extract({ left: 0, top: 0, width: markWidth, height })
    .toBuffer();

  // 3. Tighten again, now that the wordmark is gone.
  const cropped = await sharp(extracted).trim().toBuffer();

  const inner = Math.round(size * 0.68);
  const scaled = await sharp(cropped)
    .resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: light ? INK : '#FFFFFF' },
  })
    .composite([{ input: scaled, gravity: 'centre' }])
    .png()
    .toBuffer();
}

async function buildIcons() {
  console.log('\nIcons → public');

  for (const size of [192, 512]) {
    await writeFile(join(OUT_ICONS, `icon-${size}.png`), await markBuffer(size, { light: true }));
    log(`icon-${size}.png`);
  }

  await writeFile(join(OUT_ICONS, 'apple-touch-icon.png'), await markBuffer(180, { light: true }));
  log('apple-touch-icon.png');

  // favicon.ico as a 48px PNG — every current browser accepts PNG here.
  await writeFile(join(OUT_ICONS, 'favicon.png'), await markBuffer(64, { light: true }));
  log('favicon.png');
}

/** 1200×630 share card: white lockup on brand ink with an accent rule. */
async function buildOgImage() {
  console.log('\nOG image → public');
  const W = 1200;
  const H = 630;

  const logo = await sharp(join(SRC, 'lc-logo-lang.webp'))
    .resize({ width: Math.round(W * 0.62), fit: 'inside' })
    .toBuffer();

  const rule = await sharp({
    create: { width: 96, height: 4, channels: 4, background: ACCENT },
  })
    .png()
    .toBuffer();

  const card = sharp({ create: { width: W, height: H, channels: 4, background: INK } }).composite([
    { input: logo, gravity: 'centre', top: Math.round(H * 0.38), left: Math.round(W * 0.19) },
    { input: rule, top: Math.round(H * 0.6), left: Math.round(W / 2 - 48) },
  ]);

  await card.png().toFile(join(OUT_ICONS, 'og-image.png'));
  log('og-image.png (1200×630)');
}

/* ----------------------------------------------- optional: remote photos */

const REMOTE = [
  ['pexels-830891.jpg', 'hero', [640, 960, 1280, 1600, 1920, 2400]],
  ['pexels-466685.jpg', 'problem-texture', [960, 1280, 1920]],
  ['pexels-3184291.jpg', 'contact-texture', [960, 1280, 1920]],
  ['pexels-323780.jpg', 'final-cta', [640, 960, 1280, 1600, 1920]],
];

async function buildRemotePhotos() {
  if (!(await exists(REMOTE_SRC))) {
    console.log('\nPhotos — skipped (no assets-src/).');
    console.log('   Run `npm run assets:fetch` on a machine with network access,');
    console.log('   then re-run this script and set USE_LOCAL_PHOTOS = true in src/lib/images.ts.');
    return;
  }

  const present = await readdir(REMOTE_SRC);
  console.log('\nPhotos → public/img');
  for (const [file, id, widths] of REMOTE) {
    if (!present.includes(file)) {
      log(`skipped ${id} (missing ${file})`);
      continue;
    }
    await emitVariants(sharp(join(REMOTE_SRC, file)), id, widths);
  }
}

/* ------------------------------------------------------------------- run */

await mkdir(OUT_IMG, { recursive: true });
await syncFonts();
await buildPortrait();
await buildAvatars();
await buildIcons();
await buildOgImage();
await buildRemotePhotos();
console.log('\nDone.\n');
