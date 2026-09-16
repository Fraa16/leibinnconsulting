import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Width = 'narrow' | 'prose' | 'default' | 'content' | 'wide' | 'bleed';

const widths: Record<Width, string> = {
  narrow: 'max-w-3xl',
  prose: 'max-w-4xl',
  default: 'max-w-7xl',
  content: 'max-w-content',
  wide: 'max-w-wide',
  /* Edge-to-edge cards: a hairline gutter on mobile, a real one from md up. */
  bleed: 'max-w-wide px-1.5 md:px-6',
};

interface ContainerProps {
  children: ReactNode;
  width?: Width;
  className?: string;
  as?: ElementType;
}

/** The single source of truth for horizontal rhythm and page gutters. */
export function Container({
  children,
  width = 'default',
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full',
        widths[width],
        width !== 'bleed' && 'px-5 md:px-8',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
