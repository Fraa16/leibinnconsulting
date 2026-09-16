import { Check } from 'lucide-react';
import { hero } from '../../content/hero';
import { resolvePhoto } from '../../lib/images';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';
import { ButtonLink } from '../ui/Button';

const heroImage = resolvePhoto('hero');

export function HeroSection() {
  return (
    /* The gradient carries the page background from the canvas tone into the
       next section's tone, so the hero card's side gutters don't leave a visible
       seam where the two meet. */
    <section
      id="top"
      className="flex items-start justify-center bg-gradient-to-b from-paper-200 to-paper-400 pt-20 md:pt-24"
    >
      <div className="mx-auto w-full max-w-wide px-1.5 md:px-6">
        <div className="relative min-h-[calc(100svh-5rem)] overflow-hidden rounded-t-3xl md:min-h-[calc(100svh-6rem)]">
          <Picture
            image={heroImage}
            alt=""
            sizes="100vw"
            priority
            className="absolute inset-0 h-full w-full"
          />

          {/*
           * The original hero laid a flat 75% white sheet over the photograph,
           * which fogged it into a grey texture. A directional scrim keeps the
           * image legible at the top while still guaranteeing text contrast
           * where the copy actually sits.
           */}
          <div
            aria-hidden="true"
            className="to-paper-200/92 absolute inset-0 bg-gradient-to-b from-paper-200/55 via-paper-200/80"
          />
          {/* Fades the photograph into the next section. Must stay below the
              z-10 content layer — at z-20 it painted over the CTA and washed it
              out, which is why the original markup had to force the button to
              z-30 to escape it. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-paper-400"
          />

          <div className="relative z-10 flex min-h-[calc(100svh-5rem)] flex-col px-6 py-10 md:min-h-[calc(100svh-6rem)] md:px-10">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <Reveal variant="fade">
                <span className="rule-accent mb-6" />
              </Reveal>

              <Reveal variant="clip" index={1}>
                <h1 className="max-w-4xl font-display text-display-lg font-semibold text-ink-900">
                  {hero.headline}
                </h1>
              </Reveal>

              <Reveal index={3}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg">
                  {hero.subline}
                </p>
              </Reveal>

              <ul className="mt-9 flex flex-wrap justify-center gap-2.5">
                {hero.badges.map((label, index) => (
                  <Reveal
                    key={label}
                    as="li"
                    index={4 + index}
                    variant="scale"
                    className="inline-flex items-center gap-2 rounded-full border border-accent-300/60 bg-white/75 px-4 py-2 text-sm font-medium text-ink-700 backdrop-blur-sm"
                  >
                    <Check
                      aria-hidden="true"
                      className="h-3.5 w-3.5 flex-shrink-0 text-primary-600"
                    />
                    {label}
                  </Reveal>
                ))}
              </ul>

              <Reveal index={8}>
                <ButtonLink href={hero.cta.href} size="lg" withArrow className="mt-10">
                  {hero.cta.label}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
