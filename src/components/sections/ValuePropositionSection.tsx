import { valueSection, values } from '../../content/values';
import { resolveLocal } from '../../lib/images';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Picture } from '../ui/Picture';
import { site } from '../../content/site';

const portrait = resolveLocal('portrait');

export function ValuePropositionSection() {
  return (
    <Section space="lg" aria-labelledby="mehrwert-heading">
      <div className="mx-auto w-full max-w-wide px-1.5 md:px-6">
        <div className="rounded-3xl border border-white/70 bg-paper-600 px-6 py-12 shadow-panel md:px-12 md:py-16">
          <SectionHeading
            id="mehrwert-heading"
            rule
            eyebrow={valueSection.eyebrow}
            title={valueSection.headline}
            intro={valueSection.intro}
          />

          <div className="mt-14 grid items-start gap-12 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-16">
            {/*
             * These cards previously rendered as <button>s whose only effect was
             * to restyle themselves — a control that announces itself as
             * actionable but does nothing. They are ordinary list items now, and
             * the highlight is pure CSS hover/focus-within.
             */}
            <ol className="space-y-4">
              {values.map((value, index) => (
                <Reveal key={value.id} as="li" index={index}>
                  <article className="group relative overflow-hidden rounded-2xl border border-paper-700 bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-entrance hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-card-hover md:p-7">
                    {/* Accent rule that draws in on hover. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent-400 transition-transform duration-300 ease-entrance group-hover:scale-y-100"
                    />

                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden="true"
                        className="font-display text-2xl font-semibold text-accent-300 transition-colors duration-300 group-hover:text-accent-500"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-base font-semibold text-ink-900 md:text-lg">
                        {value.title}
                      </h3>
                    </div>

                    <p className="mt-3 pl-11 text-sm leading-relaxed text-ink-600 md:text-base">
                      {value.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ol>

            <Reveal index={2} className="md:sticky md:top-28">
              <figure>
                {/*
                 * The source photograph is a 2787×1990 landscape frame. It used
                 * to be dropped into a 260–360px tall box with object-cover,
                 * which sliced the subject apart. The asset pipeline now emits a
                 * real 3:4 portrait crop composed around him.
                 */}
                <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-panel">
                  <Picture
                    image={portrait}
                    alt={`${site.founder}, Gründer von ${site.name}`}
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="aspect-[3/4] w-full"
                  />
                </div>
                <figcaption className="mt-4 text-center text-xs text-ink-500">
                  {valueSection.portraitCaption}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
