import type { CSSProperties } from 'react';
import type { ResponsiveImage } from '../../lib/images';
import { cn } from '../../lib/cn';

type ImageProps = {
  image: ResponsiveImage;
  /** Empty string marks the image as decorative. */
  alt: string;
  /** The `sizes` hint — how wide the image renders at each breakpoint. */
  sizes: string;
  className?: string;
  /**
   * Classes for the <picture> itself. A <picture> is inline by default, so an
   * <img> inside it cannot resolve a percentage height; a background image
   * that has to fill its container needs the wrapper positioned too.
   */
  wrapperClassName?: string;
  style?: CSSProperties;
  /** Only the hero should be eager; everything else lazy-loads. */
  priority?: boolean;
};

/**
 * Serves AVIF with a WebP fallback at the width the layout actually needs.
 *
 * The Bolt build pointed <img src> straight at unprocessed camera originals —
 * a 3807×5710 / 11.8 MB JPEG rendered into a 448px card, and 24.4 MB of
 * imagery on the homepage alone.
 */
export default function Image({
  image,
  alt,
  sizes,
  className,
  wrapperClassName,
  style,
  priority = false,
}: ImageProps) {
  return (
    <picture className={wrapperClassName}>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.fallback}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        // fetchPriority is valid HTML but missing from this React version's types.
        {...{ fetchpriority: priority ? 'high' : undefined }}
        decoding={priority ? 'sync' : 'async'}
        className={cn('block', className)}
        style={style}
      />
    </picture>
  );
}
