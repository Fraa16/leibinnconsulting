import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'white' | 'panel' | 'ink' | 'accent';
type Elevation = 'flat' | 'card' | 'panel' | 'float';

const tones: Record<Tone, string> = {
  white: 'bg-white border border-ink-900/[0.06]',
  panel: 'bg-paper-600 border border-white/70',
  ink: 'bg-ink-900 border border-white/10 text-white',
  accent: 'bg-accent-400 border border-accent-500/30',
};

const elevations: Record<Elevation, string> = {
  flat: '',
  card: 'shadow-card',
  panel: 'shadow-panel',
  float: 'shadow-float',
};

interface CardProps {
  children: ReactNode;
  tone?: Tone;
  elevation?: Elevation;
  /** Adds the lift-on-hover treatment used by the content card grids. */
  interactive?: boolean;
  className?: string;
}

export function Card({
  children,
  tone = 'white',
  elevation = 'card',
  interactive = false,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl',
        tones[tone],
        elevations[elevation],
        interactive &&
          'transition-[transform,box-shadow] duration-300 ease-entrance hover:-translate-y-1 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface IconBadgeProps {
  children: ReactNode;
  tone?: 'accent' | 'ink' | 'light';
  className?: string;
}

/** The rounded icon chip used across the trust and feature grids. */
export function IconBadge({ children, tone = 'accent', className }: IconBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl',
        tone === 'accent' && 'border border-accent-300/60 bg-accent-100 text-accent-700',
        tone === 'ink' && 'bg-ink-900/[0.05] text-ink-800',
        tone === 'light' && 'border border-white/25 bg-white/15 text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}
