import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useReveal } from '../../hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Delay in ms before this block starts to rise. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/** A block that fades up once it scrolls into view. */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className, style, id }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={cn('a-rise', className)}
      style={delay ? ({ '--d': `${delay}ms`, ...style } as CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}
