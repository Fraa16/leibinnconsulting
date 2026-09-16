import type { ReactNode } from 'react';
import { useReducedMotion } from '../../lib/hooks/useReducedMotion';
import { useInView } from '../../lib/hooks/useInView';
import { cn } from '../../lib/cn';

/** Per-item stagger in ms, and the ceiling it may never exceed. */
const STAGGER = 60;
const MAX_DELAY = 300;

type Variant = 'up' | 'fade' | 'clip' | 'scale';

const variantClass: Record<Variant, string> = {
  up: 'reveal-up',
  fade: 'reveal-fade',
  clip: 'reveal-clip',
  scale: 'reveal-scale',
};

interface RevealProps {
  children: ReactNode;
  /** Position in a list. Delay is derived from this and capped at 300ms. */
  index?: number;
  /** Explicit delay in milliseconds, overriding `index`. */
  delay?: number;
  variant?: Variant;
  /** Render as `li` when the parent is a `ul`/`ol`, to keep list markup valid. */
  as?: 'div' | 'li';
  className?: string;
}

/**
 * Scroll-triggered entrance animation. Replaces the old `FadeInUp`.
 *
 * Three things changed. Motion is skipped entirely when the visitor has asked
 * for reduced motion — the old component animated unconditionally. Stagger is
 * derived from `index` and hard-capped at 300ms; the FAQ list previously
 * hand-wrote delays reaching 0.5s, so the last answers visibly lagged the
 * scroll. And the animation itself is now a CSS transition triggered by an
 * IntersectionObserver rather than framer-motion, which took ~30 KB gzip off
 * the bundle for effects CSS does natively on the compositor.
 */
export function Reveal({
  children,
  index,
  delay,
  variant = 'up',
  as = 'div',
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInView<HTMLElement>();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const resolvedDelay = delay ?? Math.min((index ?? 0) * STAGGER, MAX_DELAY);
  const shared = {
    className: cn('reveal', variantClass[variant], inView && 'is-visible', className),
    style: { '--reveal-delay': `${resolvedDelay}ms` } as React.CSSProperties,
  };

  // Branch rather than render a dynamic tag: a union tag makes the ref type an
  // intersection of element types, which nothing can satisfy.
  return as === 'li' ? (
    <li ref={ref as React.RefObject<HTMLLIElement>} {...shared}>
      {children}
    </li>
  ) : (
    <div ref={ref as React.RefObject<HTMLDivElement>} {...shared}>
      {children}
    </div>
  );
}
