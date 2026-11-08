/**
 * Vectorises the supplied brand logo into path data the Logo component inlines.
 *
 *   npm run logo          (requires `potrace` on PATH: apt-get install potrace)
 *
 * The brand package ships the logo only as raster art — a black and a white
 * horizontal lockup, plus a full-colour stacked version. A header logo wants
 * to be a vector: crisp at any size, recolourable per surface, and free of a
 * second network round trip. So the lockup is traced once, here, and the
 * result is committed as src/components/ui/logo-paths.ts.
 *
 * The horizontal lockup is traced from the black master (clean alpha, no
 * gradient to confuse the threshold) and split into two groups by x position:
 * the wing mark on the left, the two lines of type on the right. That split is
 * what lets the component paint the mark in the brand gradient while the type
 * follows the surrounding text colour.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const BRAND = resolve('src/assets/brand');
const OUT = resolve('src/components/ui/logo-paths.ts');
/** Same data for the build scripts, which cannot import the TypeScript module. */
const OUT_JSON = resolve('src/assets/brand/logo-paths.json');

/** Coordinate space of the emitted paths. Integers at this scale land well
 *  inside a tenth of a device pixel at any size the logo is ever drawn. */
const UNITS = 2000;
/** x below this (in UNITS) belongs to the wing mark, above it to the type. */
const MARK_SPLIT = 0.24;

const tmp = mkdtempSync(join(tmpdir(), 'lc-logo-'));

/** Renders an image's alpha channel as a black-on-white PGM for potrace. */
async function toPgm(src, name, scale, crop) {
  const base = sharp(src).ensureAlpha();
  const { data, info } = await (crop ? base.extract(crop) : base)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const gray = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) gray[i] = 255 - data[i * channels + 3];

  const png = await sharp(gray, { raw: { width, height, channels: 1 } })
    .resize(width * scale, height * scale, { kernel: 'lanczos3' })
    .png()
    .toBuffer();

  const out = join(tmp, `${name}.pgm`);
  const { data: trimmed, info: tInfo } = await sharp(png)
    .trim({ background: '#ffffff', threshold: 20 })
    .toColourspace('b-w')
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (tInfo.channels !== 1) throw new Error(`expected 1 channel, got ${tInfo.channels}`);
  // PGM P5, one channel
  const header = Buffer.from(`P5\n${tInfo.width} ${tInfo.height}\n255\n`, 'ascii');
  writeFileSync(out, Buffer.concat([header, trimmed]));
  return out;
}

/** potrace → list of absolute path strings in a 0..UNITS box, plus the height. */
function trace(pgm) {
  const svgPath = pgm.replace(/\.pgm$/, '.svg');
  execFileSync('potrace', [
    '-s', '-o', svgPath,
    '--turdsize', '3',
    '--alphamax', '1.0',
    '--opttolerance', '0.6',
    pgm,
  ]);
  const svg = readFileSync(svgPath, 'utf8');

  const [, , vbW, vbH] = svg.match(/viewBox="([\d.\s-]+)"/)[1].trim().split(/\s+/).map(Number);
  const [tx, ty, sx, sy] = svg
    .match(/transform="translate\(([-\d.]+),([-\d.]+)\)\s*scale\(([-\d.]+),([-\d.]+)\)"/)
    .slice(1)
    .map(Number);

  const k = UNITS / vbW;

  /*
   * potrace writes an absolute `M` and then relative `c` / `l` / `z`, inside a
   * group that flips the y axis and divides by ten. Resolving every point to
   * an absolute coordinate and baking the group transform in lets the output
   * drop the wrapper, and rounding to whole units then costs a third of the
   * bytes potrace's own tenths-of-a-pixel numbers do.
   */
  const rewrite = (d) => {
    const tokens = d.replace(/([A-Za-z])/g, ' $1 ').trim().split(/[\s,]+/);
    let out = '';
    let cmd = '';
    let cx = 0;
    let cy = 0;
    let sxStart = 0;
    let syStart = 0;
    const queue = [];

    /** source point -> rounded point in the output unit box */
    const emit = (x, y) => {
      const px = Math.round((tx + x * sx) * k);
      const py = Math.round((ty + y * sy) * k);
      for (const n of [px, py]) {
        const last = out[out.length - 1];
        out += (n >= 0 && last !== undefined && !/[A-Z]/.test(last) ? ' ' : '') + n;
      }
    };

    const flush = () => {
      if (!queue.length) return;
      const rel = cmd === cmd.toLowerCase();
      if (cmd.toLowerCase() === 'm') {
        cx = rel ? cx + queue[0] : queue[0];
        cy = rel ? cy + queue[1] : queue[1];
        sxStart = cx;
        syStart = cy;
        out += 'M';
        emit(cx, cy);
        // further pairs after an M are implicit lineto
        for (let i = 2; i < queue.length; i += 2) {
          cx = rel ? cx + queue[i] : queue[i];
          cy = rel ? cy + queue[i + 1] : queue[i + 1];
          out += 'L';
          emit(cx, cy);
        }
      } else if (cmd.toLowerCase() === 'l') {
        for (let i = 0; i < queue.length; i += 2) {
          cx = rel ? cx + queue[i] : queue[i];
          cy = rel ? cy + queue[i + 1] : queue[i + 1];
          out += 'L';
          emit(cx, cy);
        }
      } else if (cmd.toLowerCase() === 'c') {
        for (let i = 0; i < queue.length; i += 6) {
          const pts = [];
          for (let j = 0; j < 6; j += 2) {
            pts.push([
              rel ? cx + queue[i + j] : queue[i + j],
              rel ? cy + queue[i + j + 1] : queue[i + j + 1],
            ]);
          }
          out += 'C';
          for (const [x, y] of pts) emit(x, y);
          [cx, cy] = pts[2];
        }
      } else if (cmd.toLowerCase() === 'h' || cmd.toLowerCase() === 'v') {
        for (const v of queue) {
          if (cmd.toLowerCase() === 'h') cx = rel ? cx + v : v;
          else cy = rel ? cy + v : v;
          out += 'L';
          emit(cx, cy);
        }
      } else {
        throw new Error(`unhandled path command "${cmd}" in potrace output`);
      }
      queue.length = 0;
    };

    for (const t of tokens) {
      if (/^[A-Za-z]$/.test(t)) {
        flush();
        if (t === 'z' || t === 'Z') {
          out += 'Z';
          cx = sxStart;
          cy = syStart;
          cmd = '';
        } else {
          cmd = t;
        }
      } else if (t !== '') {
        queue.push(Number(t));
      }
    }
    flush();
    return out;
  };

  const paths = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => rewrite(m[1]));
  return { paths, height: Math.round(vbH * k) };
}

/** The rows of a stacked lockup that hold actual ink, top to bottom. */
async function bands(src) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = [];
  let start = null;
  for (let y = 0; y <= height; y++) {
    let ink = false;
    for (let x = 0; x < width && !ink; x++) if (data[(y * width + x) * channels + 3] > 12) ink = true;
    if (ink && start === null) start = y;
    if (!ink && start !== null) {
      out.push({ top: start, height: y - start });
      start = null;
    }
  }
  return out;
}

/** The x / y extremes a path reaches, used to sort the lockup into groups. */
const extent = (d) => {
  const nums = (d.match(/-?\d+/g) ?? []).map(Number);
  let maxX = 0;
  let minY = Infinity;
  let maxY = 0;
  for (let i = 0; i < nums.length; i += 2) {
    maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]);
    maxY = Math.max(maxY, nums[i + 1]);
  }
  return { maxX, minY, maxY };
};

/** The y of the gap between the two lines of type, or null if there is one line. */
function lineSplit(paths, height) {
  const rows = new Uint8Array(height + 1);
  for (const d of paths) {
    const { minY, maxY } = extent(d);
    for (let y = Math.max(0, minY); y <= Math.min(height, maxY); y++) rows[y] = 1;
  }
  let best = null;
  let run = 0;
  for (let y = 0; y <= height; y++) {
    if (!rows[y]) {
      run++;
    } else {
      if (run && (!best || run > best.run)) best = { run, y: y - Math.ceil(run / 2) };
      run = 0;
    }
  }
  return best && best.run > height * 0.04 ? best.y : null;
}

const lockupPgm = await toPgm(join(BRAND, 'lockup-dark.webp'), 'lockup', 3);
const lockup = trace(lockupPgm);

const markPaths = lockup.paths.filter((d) => extent(d).maxX < UNITS * MARK_SPLIT);
const typePaths = lockup.paths.filter((d) => extent(d).maxX >= UNITS * MARK_SPLIT);

/*
 * The type is two lines — the name over a smaller tracked tagline. Split them,
 * because the tagline is a 3px smudge once the lockup is shrunk to a header
 * and the name wants to stand alone there.
 */
const typeSplit = lineSplit(typePaths, lockup.height);
if (typeSplit === null) throw new Error('could not find the gap between the two lines of type');
const namePaths = typePaths.filter((d) => extent(d).maxY <= typeSplit);
const taglinePaths = typePaths.filter((d) => extent(d).maxY > typeSplit);
/*
 * Compact form: the same artwork with the tagline dropped. In the full lockup
 * the two lines of type are centred as a block against the mark, so removing
 * the lower one leaves the name riding high. Nudge it back onto the mark's
 * optical centre rather than letting it sit off-axis.
 */
const centreOf = (paths) => {
  const top = Math.min(...paths.map((d) => extent(d).minY));
  const bottom = Math.max(...paths.map((d) => extent(d).maxY));
  return (top + bottom) / 2;
};
const compactShift = Math.round(centreOf(markPaths) - centreOf(namePaths));

/*
 * The wing mark on its own, for the favicon and the oversized footer glyph.
 * The stacked master is the better source — the mark is drawn larger there —
 * so take its first ink band, which is the mark above the two lines of type.
 */
const stacked = join(BRAND, 'lockup-stacked-colour.png');
const [markBand] = await bands(stacked);
const { width: stackedWidth } = await sharp(stacked).metadata();
const glyphPgm = await toPgm(stacked, 'glyph', 4, {
  left: 0,
  top: markBand.top,
  width: stackedWidth,
  height: markBand.height,
});
const glyph = trace(glyphPgm);

const chars = (arr) => arr.join('').length;
console.log(`lockup    ${lockup.paths.length} paths  ${chars(lockup.paths)} chars  viewBox 0 0 ${UNITS} ${lockup.height}`);
console.log(`  mark    ${markPaths.length} paths  ${chars(markPaths)} chars`);
console.log(`  name    ${namePaths.length} paths  ${chars(namePaths)} chars`);
console.log(`  tagline ${taglinePaths.length} paths  ${chars(taglinePaths)} chars  (split at y=${typeSplit})`);
console.log(`compact   name shifted ${compactShift} units onto the mark's centre`);
console.log(`glyph     ${glyph.paths.length} paths  ${chars(glyph.paths)} chars`);

const list = (arr) => arr.map((d) => `  '${d}',`).join('\n');

writeFileSync(
  OUT,
  `/*
 * GENERATED by scripts/trace-logo.mjs — do not hand-edit.
 *
 * Vector tracing of the supplied brand lockup (src/assets/brand/). Coordinates
 * are integers in a ${UNITS}-unit-wide box, which is finer than a tenth of a
 * device pixel at any size the logo is drawn at.
 *
 * The lockup comes apart into three groups so each surface can paint them
 * differently: the mark takes the brand gradient, the type follows the text
 * colour around it, and the tagline drops out at small sizes.
 */

/** The wing mark, left of the type. */
export const LOCKUP_MARK = [
${list(markPaths)}
];

/** "LEIBINN CONSULTING". */
export const LOCKUP_NAME = [
${list(namePaths)}
];

/** "INVESTMENT CONSULTING", the smaller line beneath the name. */
export const LOCKUP_TAGLINE = [
${list(taglinePaths)}
];

/** Mark, name and tagline. */
export const LOCKUP_VIEWBOX = '0 0 ${UNITS} ${lockup.height}';

/** Units to drop the name by when the tagline is not drawn, so that it sits
 *  on the mark's optical centre instead of where the two-line block put it. */
export const LOCKUP_COMPACT_SHIFT = ${compactShift};

/** The wing mark on its own, traced from the larger stacked master. */
export const GLYPH = [
${list(glyph.paths)}
];

export const GLYPH_VIEWBOX = '0 0 ${UNITS} ${glyph.height}';
`
);

writeFileSync(
  OUT_JSON,
  JSON.stringify(
    {
      lockup: {
        viewBox: `0 0 ${UNITS} ${lockup.height}`,
        mark: markPaths,
        name: namePaths,
        tagline: taglinePaths,
        compactShift,
      },
      glyph: { viewBox: `0 0 ${UNITS} ${glyph.height}`, paths: glyph.paths },
      gradient: { from: '#A1CEE5', to: '#2A2D7C' },
    },
    null,
    0
  ) + '\n'
);

rmSync(tmp, { recursive: true, force: true });
console.log(`\nwrote ${OUT}`);
console.log(`wrote ${OUT_JSON}`);
