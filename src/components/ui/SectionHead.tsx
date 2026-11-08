import type { ReactNode } from 'react';
import Reveal from './Reveal';
import { cn } from '../../lib/cn';

type SectionHeadProps = {
  /** "01 · Ihr Immobilienpartner" */
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  /** Surface the head sits on; sets the eyebrow and lead colours. */
  tone: 'dark' | 'light';
  id?: string;
};

/**
 * The recurring section header: eyebrow and H2 on the left, the lead on the
 * right, bottom-aligned. Stacks below 1000px.
 */
export default function SectionHead({ eyebrow, title, lead, tone, id }: SectionHeadProps) {
  const light = tone === 'light';
  return (
    <Reveal className="section-head">
      <div className="flex flex-col gap-6">
        <p className={cn('eyebrow', light ? 'text-copper-dark' : 'text-copper-light')}>{eyebrow}</p>
        <h2 id={id} className="t-h2">
          {title}
        </h2>
      </div>
      <p className={cn('t-lead', light ? 'text-stone' : 'text-mist')}>{lead}</p>
    </Reveal>
  );
}

/** The italic accent phrase inside a headline. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="t-accent">{children}</em>;
}
