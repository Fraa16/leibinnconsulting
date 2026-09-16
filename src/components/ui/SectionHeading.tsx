import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Reveal } from './Reveal';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: 'ink' | 'light';
}

/** The small tracked-out label above a section headline. */
export function Eyebrow({ children, className, tone = 'ink' }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-2xs font-medium uppercase tracking-eyebrow',
        tone === 'ink' ? 'text-ink-500' : 'text-white/75',
        className,
      )}
    >
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  /** Heading level. Keeps the document outline correct per section. */
  as?: 'h2' | 'h3';
  id?: string;
  align?: 'left' | 'center';
  tone?: 'ink' | 'light';
  rule?: boolean;
  className?: string;
}

/**
 * The standard section opener: optional eyebrow, headline, optional intro.
 *
 * Centralising this is what makes every section share one type scale and one
 * vertical rhythm — previously each section hand-rolled its own sizes and
 * margins, which is why the page read as a set of unrelated blocks.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = 'h2',
  id,
  align = 'left',
  tone = 'ink',
  rule = false,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn(centered && 'flex flex-col items-center text-center', className)}>
      {rule && (
        <Reveal variant="fade">
          <span className={cn('rule-accent mb-6', centered && 'mx-auto')} />
        </Reveal>
      )}

      {eyebrow && (
        <Reveal variant="fade">
          <Eyebrow tone={tone} className="mb-3">
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}

      <Reveal index={1}>
        <Tag
          id={id}
          className={cn(
            'font-display text-display-sm font-semibold md:text-display-md',
            tone === 'light' ? 'text-white' : 'text-ink-900',
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {intro && (
        <Reveal index={2}>
          <p
            className={cn(
              'mt-5 text-base leading-relaxed md:text-lg',
              centered ? 'mx-auto max-w-2xl' : 'text-measure',
              tone === 'light' ? 'text-white/85' : 'text-ink-600',
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
