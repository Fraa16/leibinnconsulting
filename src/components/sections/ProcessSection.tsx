import { processSection, processSteps } from '../../content/process';
import { useReducedMotion } from '../../lib/hooks/useReducedMotion';
import { useScrollProgress } from '../../lib/hooks/useScrollProgress';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

export function ProcessSection() {
  const reduceMotion = useReducedMotion();
  /* Fills the connecting rule in step with the reader's scroll position. */
  const trackRef = useScrollProgress<HTMLDivElement>({ start: 0.85, end: 0.55 });

  return (
    <Section tone="cool" space="lg" aria-labelledby="prozess-heading">
      <Container width="content">
        <Reveal variant="fade">
          <span className="rule-accent mb-6" />
        </Reveal>

        <Reveal>
          <h2
            id="prozess-heading"
            className="max-w-3xl font-display text-display-md font-semibold text-ink-900"
          >
            {processSection.headline}
          </h2>
        </Reveal>

        <div ref={trackRef} className="relative mt-16">
          {/* Track and its filling rule. Horizontal from lg up; hidden below. */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-[1.125rem] hidden h-px w-full bg-ink-900/[0.10] lg:block"
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-[1.125rem] hidden h-px w-full origin-left bg-accent-500 lg:block"
            style={{ transform: `scaleX(${reduceMotion ? 1 : 'var(--progress, 0)'})` }}
          />

          <ol className="grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.stepNumber} as="li" index={index} className="relative">
                {/* Node on the track. */}
                <span
                  aria-hidden="true"
                  className="relative z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-accent-300 bg-paper-300 text-xs font-semibold text-accent-700 lg:flex"
                >
                  {String(step.stepNumber).padStart(2, '0')}
                </span>

                {/*
                 * The original rendered a 280–320px ghost numeral with a
                 * Tailwind gradient class and an inline style gradient fighting
                 * over the same element. One treatment, applied once.
                 */}
                <span
                  aria-hidden="true"
                  className="font-display text-5xl font-semibold text-accent-300/70 lg:hidden"
                >
                  {String(step.stepNumber).padStart(2, '0')}
                </span>

                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-ink-900 md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal index={3}>
          <div className="mt-16 flex justify-center">
            <a
              href={processSection.cta.href}
              className="group inline-flex items-center gap-2 text-base font-medium text-ink-900 transition-colors duration-300 hover:text-primary-700"
            >
              <span className="relative">
                {processSection.cta.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-ink-900 transition-colors duration-300 group-hover:bg-primary-700"
                />
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
