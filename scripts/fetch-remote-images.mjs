/**
 * Downloads the four stock photographs the site currently hot-links from Pexels
 * into assets-src/, so `npm run assets` can generate self-hosted variants.
 *
 *   npm run assets:fetch && npm run assets
 *   then set USE_LOCAL_PHOTOS = true in src/lib/images.ts
 *
 * Why bother: self-hosting removes a third-party request that transmits every
 * visitor's IP address to Pexels (declared in the Datenschutzerklärung while it
 * remains), and takes a DNS + TLS round trip off the critical path for the
 * largest image on the page.
 *
 * The photographs themselves are unchanged — same Pexels IDs, same images. This
 * only changes where they are served from.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'assets-src');

/** Pexels IDs, matching src/lib/images.ts. */
const PHOTOS = [830891, 466685, 3184291, 323780];

/** Pulled at 2400px; the pipeline downsamples from there. */
const WIDTH = 2400;

await mkdir(OUT, { recursive: true });

let failed = 0;

for (const id of PHOTOS) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${WIDTH}`;
  const target = join(OUT, `pexels-${id}.jpg`);

  process.stdout.write(`  ${id} … `);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(target, buffer);
    console.log(`${(buffer.length / 1024).toFixed(0)} KB`);
  } catch (error) {
    failed += 1;
    console.log(`failed — ${error.message}`);
  }
}

if (failed > 0) {
  console.error(
    `\n${failed} download(s) failed. If this is a restricted network, run it somewhere with open access.`,
  );
  process.exit(1);
}

console.log('\nNow run: npm run assets\nThen set USE_LOCAL_PHOTOS = true in src/lib/images.ts\n');
