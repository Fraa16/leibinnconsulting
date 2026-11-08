/**
 * Vectorises the two brand line patterns into SVGs the site uses as CSS masks.
 *
 *   npm run lines          (requires `potrace` on PATH: apt-get install potrace)
 *
 * The design handoff ships each line (a, b) as three transparent PNGs, one per
 * colour (copper, ink, light). The shape is the same in all three, so only one
 * is traced; the colour comes from `background-color` behind a CSS mask in
 * `BrandLine`. The canvas is kept untrimmed so the SVG lines up exactly where
 * the PNG did.
 *
 * Masters live in assets-source/brand-lines/. Output: src/assets/brand/line-*.svg
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const SRC = resolve('assets-source/brand-lines');
const OUT = resolve('src/assets/brand');
/** Upscale before tracing so the curves come out smooth. */
const SCALE = 4;

const LINES = [
  { in: 'line-a-ink.png', out: 'line-a.svg' },
  { in: 'line-b-ink.png', out: 'line-b.svg' },
];

const tmp = mkdtempSync(join(tmpdir(), 'lc-lines-'));

try {
  for (const line of LINES) {
    const src = join(SRC, line.in);
    const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Alpha → black ink on white, the polarity potrace expects.
    const gray = Buffer.alloc(width * height);
    for (let i = 0; i < width * height; i++) gray[i] = 255 - data[i * channels + 3];

    const { data: big, info: bigInfo } = await sharp(gray, { raw: { width, height, channels: 1 } })
      .resize(width * SCALE, height * SCALE, { kernel: 'lanczos3' })
      .toColourspace('b-w')
      .raw()
      .toBuffer({ resolveWithObject: true });
    if (bigInfo.channels !== 1) throw new Error(`expected 1 channel, got ${bigInfo.channels}`);

    const pgm = join(tmp, `${line.out}.pgm`);
    writeFileSync(pgm, Buffer.concat([Buffer.from(`P5\n${bigInfo.width} ${bigInfo.height}\n255\n`), big]));

    const svgPath = join(tmp, line.out);
    execFileSync('potrace', ['-s', '-o', svgPath, '--turdsize', '8', '--alphamax', '1.2', '--opttolerance', '0.4', '--unit', '1', pgm]);

    // Drop potrace's metadata and pt sizing; keep the viewBox so the aspect
    // ratio matches the PNG master exactly.
    const svg = readFileSync(svgPath, 'utf8')
      .replace(/<\?xml[^>]*>\s*/, '')
      .replace(/<!DOCTYPE[^>]*>\s*/, '')
      .replace(/<metadata>[\s\S]*?<\/metadata>\s*/, '')
      .replace(/ width="[^"]*" height="[^"]*"/, '')
      .replace(/ preserveAspectRatio="[^"]*"/, '')
      .replace(/\n+/g, '\n');

    writeFileSync(join(OUT, line.out), svg);
    console.log(`${line.in} (${width}×${height}) → src/assets/brand/${line.out}  ${(svg.length / 1024).toFixed(1)} KB`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
