/**
 * Responsive image manifest.
 *
 * Collects the derivatives produced by `npm run images` and groups them into
 * per-format srcsets, so adding a width to scripts/optimize-images.mjs is
 * picked up here automatically.
 */

const files = import.meta.glob('../assets/images/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

type Format = 'avif' | 'webp';
type Entry = { url: string; width: number };

/** name → format → entries, ascending by width */
const groups: Record<string, Partial<Record<Format, Entry[]>>> = {};

for (const [path, url] of Object.entries(files)) {
  const match = path.match(/\/([a-z-]+)-(\d+)\.(avif|webp)$/);
  if (!match) continue;
  const [, name, width, format] = match;
  ((groups[name] ??= {})[format as Format] ??= []).push({ url, width: Number(width) });
}

// Numeric sort — sorting the "<url> 768w" strings lexically would rank 768w
// above 1600w and pick the wrong fallback.
for (const formats of Object.values(groups)) {
  for (const entries of Object.values(formats)) entries.sort((a, b) => a.width - b.width);
}

const srcSet = (name: string, format: Format) =>
  (groups[name]?.[format] ?? []).map((e) => `${e.url} ${e.width}w`).join(', ');

export type ResponsiveImage = {
  avif: string;
  webp: string;
  /** Widest derivative, used as the <img> fallback src. */
  fallback: string;
  width: number;
  height: number;
};

function build(name: string, width: number, height: number): ResponsiveImage {
  const webp = groups[name]?.webp ?? [];
  return {
    avif: srcSet(name, 'avif'),
    webp: srcSet(name, 'webp'),
    fallback: webp.length ? webp[webp.length - 1].url : '',
    width,
    height,
  };
}

// Intrinsic dimensions come from the masters; they set the aspect ratio that
// prevents layout shift while the image loads.
export const standingImage = build('cedrik-standing', 1400, 1960);
export const meetingImage = build('cedrik-meeting', 2200, 1466);
export const towersImage = build('ffm-towers', 2200, 1462);
export const presentingImage = build('cedrik-presenting', 2200, 1467);
export const portraitImage = build('cedrik-portrait', 2200, 1572);
export const windowImage = build('cedrik-window', 2000, 1428);

/** Cedrik, square-cropped for the 36–52px avatars. */
export const cedrikAvatar = build('cedrik-avatar', 160, 160);

export const clientAvatars = {
  okafor: build('client-okafor', 71, 71),
  mueller: build('client-mueller', 71, 71),
  silic: build('client-silic', 71, 71),
};
