import { brandIntro } from '../../content/hero';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { ButtonLink } from '../ui/Button';
import { icons, type IconName } from '../ui/icons';

/**
 * "Ihr Immobilienpartner" — previously ~90 lines inlined in App.tsx with four
 * floating icon boxes. Rebuilt as an editorial feature grid: the boxes are gone
 * and hairline rules carry the structure instead, which is what makes the block
 * read as one composition rather than four cards.
 */
export function BrandIntroSection() {
  return (
    <Section tone="alt" space="md">
      <Container width="content">
        <div className="grid items-start gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <Reveal>
              <h2 className="font-display text-display-md font-semibold text-ink-900">
                {brandIntro.headline}
              </h2>
            </Reveal>

            <Reveal index={1}>
              <p className="text-measure mt-6 text-base leading-relaxed text-ink-600 md:text-lg">
                {brandIntro.body}
              </p>
            </Reveal>

            <Reveal index={2}>
              <ButtonLink
                href={brandIntro.cta.href}
                variant="secondary"
                size="lg"
                withArrow
                className="mt-9"
              >
                {brandIntro.cta.label}
              </ButtonLink>
            </Reveal>
          </div>

          <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {brandIntro.features.map((feature, index) => {
              const Icon = icons[feature.icon as IconName];
              return (
                <Reveal
                  key={feature.title}
                  as="li"
                  index={index + 1}
                  className="group border-t border-ink-900/[0.08] pt-5"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-accent-600 transition-colors duration-300 group-hover:text-primary-600"
                    strokeWidth={1.75}
                  />
                  <h3 className="mt-4 text-base font-semibold text-ink-900 md:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 md:text-base">
                    {feature.text}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
