import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/cn';
import { problems, problemSection, type Problem } from '../../content/problems';
import { resolvePhoto } from '../../lib/images';
import { useParallax } from '../../lib/hooks/useParallax';
import { Eyebrow } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const texture = resolvePhoto('problemTexture');

interface CardProps {
  problem: Problem;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Disclosure card.
 *
 * The original wrapped an <h3> inside a <button>, which puts a heading inside an
 * interactive control and breaks how screen readers expose the document outline.
 * The correct shape is the reverse: the heading owns the button.
 *
 * The body also animated by measuring `scrollHeight` in an effect and writing a
 * pixel height. That re-measures on every toggle and goes wrong whenever the text
 * reflows. The `grid-template-rows: 0fr → 1fr` technique animates to the content's
 * natural height with no measurement at all.
 */
function ProblemCard({ problem, isOpen, onToggle }: CardProps) {
  const bodyId = `problem-body-${problem.id}`;

  return (
    <article
      className={cn(
        'rounded-2xl border bg-white/95 text-left transition-[border-color,box-shadow,transform] duration-300 ease-entrance',
        isOpen
          ? 'border-accent-400 shadow-float'
          : 'border-transparent shadow-card hover:-translate-y-0.5 hover:shadow-card-hover',
      )}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={bodyId}
          className="flex w-full items-start gap-3 rounded-2xl p-5 text-left md:p-6"
        >
          <span
            aria-hidden="true"
            className="mt-[7px] h-2 w-2 flex-shrink-0 rounded-full bg-accent-400"
          />
          <span className="flex-1 text-base font-semibold text-ink-900 md:text-lg">
            {problem.title}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700 transition-transform duration-300 ease-entrance',
              isOpen && 'rotate-45',
            )}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </button>
      </h3>

      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <p className="pl-5 text-sm leading-relaxed text-ink-600 md:text-base">{problem.short}</p>

        <div
          id={bodyId}
          role="region"
          className="grid transition-[grid-template-rows] duration-300 ease-entrance"
          style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <p className="mt-4 border-t border-ink-900/[0.07] pl-5 pt-4 text-sm leading-relaxed text-ink-600 md:text-base">
              {problem.full}
            </p>
          </div>
        </div>

        <p
          aria-hidden="true"
          className={cn(
            'pl-5 pt-3 text-xs font-medium text-accent-700 transition-opacity duration-300',
            isOpen && 'pointer-events-none opacity-0',
          )}
        >
          {problemSection.expandLabel}
        </p>
      </div>
    </article>
  );
}

export function ProblemSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const parallaxRef = useParallax<HTMLDivElement>({ speed: 0.18, maxOffset: 80 });

  return (
    <section className="bg-paper-400">
      <div className="mx-auto w-full max-w-wide px-1.5 md:px-6">
        <div
          ref={parallaxRef}
          className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-16 md:px-12 md:py-22"
        >
          {/*
           * The panel was #75AED4 with white text — 2.42:1, failing WCAG AA for
           * both normal and large text. On ink-900 the same white copy reads at
           * 15.8:1, and the accent survives as the rule and bullet colour (6.0:1).
           */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-0 scale-110 bg-cover bg-center opacity-[0.10] will-change-transform"
            style={{
              backgroundImage: `url(${texture.src})`,
              transform: 'translate3d(0, var(--parallax-y, 0px), 0)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-accent-900/40 via-transparent to-primary-900/30"
          />

          <div className="relative z-10">
            <Reveal variant="fade">
              <span className="rule-accent mb-6" />
            </Reveal>

            <Reveal variant="fade">
              <Eyebrow tone="light" className="mb-3">
                {problemSection.eyebrow}
              </Eyebrow>
            </Reveal>

            <Reveal index={1}>
              <h2 className="max-w-3xl font-display text-display-sm font-semibold text-white md:text-display-md">
                {problemSection.headline}
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
                {problemSection.intro}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2 md:items-start">
              {problems.map((problem, index) => (
                <Reveal key={problem.id} index={index}>
                  <ProblemCard
                    problem={problem}
                    isOpen={openId === problem.id}
                    onToggle={() => setOpenId((current) => (current === problem.id ? null : problem.id))}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
