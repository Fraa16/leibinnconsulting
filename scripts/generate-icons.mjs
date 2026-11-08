/**
 * Builds the browser and home-screen icons from the traced brand mark.
 *
 *   npm run icons        (after `npm run logo`)
 *
 * The wing mark is wide — a 1.6:1 shape — so it cannot simply be dropped into
 * a square. It is centred on a navy tile with generous margin, which is also
 * how it survives being shrunk to the 16px favicon slot: at that size the
 * mark reads as one silhouette rather than as two strokes.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const { glyph } = JSON.parse(readFileSync(resolve('src/assets/brand/logo-paths.json'), 'utf8'));

const SVG_OUT = resolve('public/favicon.svg');
const TOUCH_OUT = resolve('public/apple-touch-icon.png');
const MASK_OUT = resolve('public/icon-512.png');

/** Tile */
const SIZE = 64;
const RADIUS = 14;
const TILE = '#08111F'; // navy-950, the page background
const MARK = '#D6AE84'; // copper-light, the accent on dark
/** Share of the tile's width the mark spans. */
const INSET = 0.74;

const [, , vw, vh] = glyph.viewBox.split(' ').map(Number);
const markWidth = SIZE * INSET;
const markHeight = (markWidth * vh) / vw;
const scale = markWidth / vw;
const dx = (SIZE - markWidth) / 2;
const dy = (SIZE - markHeight) / 2;

/*
 * The redesign shows the lockup in one colour, so the mark is solid copper on
 * the navy tile: the accent colour the page uses on dark surfaces.
 */
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="Leibinn Consulting">
  <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" fill="${TILE}"/>
  <g fill="${MARK}" transform="translate(${dx.toFixed(2)} ${dy.toFixed(2)}) scale(${scale.toFixed(5)})">
${glyph.paths.map((d) => `    <path d="${d}"/>`).join('\n')}
  </g>
</svg>
`;

writeFileSync(SVG_OUT, icon);

// Raster fallbacks. apple-touch-icon is composited on its own tile already,
// so it needs no rounding from iOS; the 512 is for the web app manifest.
await sharp(Buffer.from(icon)).resize(180, 180).png({ compressionLevel: 9 }).toFile(TOUCH_OUT);
await sharp(Buffer.from(icon)).resize(512, 512).png({ compressionLevel: 9 }).toFile(MASK_OUT);

const kb = (p) => `${(statSync(p).size / 1024).toFixed(1)} KB`;
console.log(`favicon.svg           ${kb(SVG_OUT)}`);
console.log(`apple-touch-icon.png  ${kb(TOUCH_OUT)}`);
console.log(`icon-512.png          ${kb(MASK_OUT)}`);
