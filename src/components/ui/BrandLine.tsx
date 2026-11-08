import type { CSSProperties } from 'react';
import lineA from '../../assets/brand/line-a.svg';
import lineB from '../../assets/brand/line-b.svg';
import { cn } from '../../lib/cn';

const LINES = {
  a: { url: lineA, ratio: '926 / 657' },
  b: { url: lineB, ratio: '940 / 307' },
};

const COLORS = {
  copper: '#D6AE84',
  ink: '#0D1A2D',
  light: '#FFFFFF',
};

type BrandLineProps = {
  line: keyof typeof LINES;
  color: keyof typeof COLORS;
  /** Position, width and opacity, as the design places each instance. */
  className?: string;
  style?: CSSProperties;
};

/**
 * The brand's line pattern, used as a quiet background ornament.
 *
 * One traced SVG per shape serves as a CSS mask, and the colour comes from
 * the background behind it, so copper, ink and white need no separate files
 * (scripts/trace-brand-lines.mjs).
 */
export default function BrandLine({ line, color, className, style }: BrandLineProps) {
  const { url, ratio } = LINES[line];
  const mask = `url("${url}") center / 100% 100% no-repeat`;

  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none block select-none', className)}
      style={{
        aspectRatio: ratio,
        backgroundColor: COLORS[color],
        WebkitMask: mask,
        mask,
        ...style,
      }}
    />
  );
}
