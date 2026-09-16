import { cn } from '../../lib/cn';
import type { ResolvedImage } from '../../lib/images';

interface PictureProps {
  image: ResolvedImage;
  /** Required. Decorative images must pass an explicit empty string. */
  alt: string;
  /** Viewport-relative rendered width, so the browser can pick the right source. */
  sizes: string;
  /**
   * Set on the LCP image only. Loads eagerly at high priority; everything else
   * lazy-loads. The previous build had no such distinction.
   */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Responsive <picture> with AVIF/WebP sources where available.
 *
 * Always emits `sizes`, `loading`, `decoding` and a `fetchpriority` hint, which
 * together are most of the difference between the old hero (one 1920px JPEG for
 * every device, discovered late) and a fast LCP.
 */
export function Picture({
  image,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
}: PictureProps) {
  return (
    <picture className={className}>
      {image.sources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
      ))}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </picture>
  );
}
