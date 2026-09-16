import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'paper' | 'alt' | 'cool' | 'white';
type Space = 'sm' | 'md' | 'lg';

const tones: Record<Tone, string> = {
  paper: 'bg-paper-200',
  alt: 'bg-paper-400',
  cool: 'bg-paper-300',
  white: 'bg-white',
};

/* One vertical rhythm for the whole page, replacing the ad-hoc py-12/16/20 mix. */
const spacing: Record<Space, string> = {
  sm: 'py-14 md:py-18',
  md: 'py-18 md:py-24',
  lg: 'py-24 md:py-32',
};

interface SectionProps {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  space?: Space;
  className?: string;
  'aria-labelledby'?: string;
}

export function Section({
  children,
  id,
  tone = 'paper',
  space = 'md',
  className,
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={cn(tones[tone], spacing[space], className)} {...rest}>
      {children}
    </section>
  );
}
