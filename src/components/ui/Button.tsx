import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';
type Size = 'sm' | 'md' | 'lg';

/*
 * Contrast is baked in here rather than left to each call site. The previous
 * build used #75AED4 as a button background with white text (2.42:1 — a WCAG
 * failure); every variant below clears AA.
 */
const variants: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white shadow-card hover:bg-primary-700 hover:shadow-card-hover active:bg-primary-800',
  secondary:
    'border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white active:bg-ink-950',
  ghost: 'text-ink-700 hover:bg-ink-900/[0.06] hover:text-ink-900',
  /* For placement on ink/accent panels: white surface, dark label. */
  onDark: 'bg-white text-ink-900 shadow-card hover:bg-paper-100 hover:shadow-card-hover',
};

/*
 * Min-height plus vertical padding, not a fixed height: the German labels are
 * long ("Jetzt unverbindliche Beratung anfragen") and wrap to two lines on a
 * phone, which a fixed height would let the text overflow.
 */
const sizes: Record<Size, string> = {
  sm: 'min-h-9 gap-1.5 rounded-full px-4 py-2 text-sm',
  md: 'min-h-11 gap-2 rounded-xl px-6 py-2.5 text-sm',
  lg: 'min-h-[3.25rem] gap-2 rounded-xl px-8 py-3.5 text-base',
};

const base =
  'group relative inline-flex items-center justify-center text-center font-medium transition-all duration-200 ease-standard disabled:pointer-events-none disabled:opacity-60';

interface StyleProps {
  variant?: Variant;
  size?: Size;
  /** Appends a chevron that nudges right on hover. */
  withArrow?: boolean;
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="h-4 w-4 flex-shrink-0 transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
    />
  );
}

type ButtonProps = StyleProps & ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

type ButtonLinkProps = StyleProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string };

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </a>
  );
}
