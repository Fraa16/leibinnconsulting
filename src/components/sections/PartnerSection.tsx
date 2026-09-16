import { partnerCard } from '../../content/trust';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { icons, type IconName } from '../ui/icons';

/**
 * The closing statement card for the trust block.
 *
 * This component existed before but was imported by nothing — its markup had
 * been copy-pasted inline into TrustSection instead, leaving two copies of the
 * same card to drift apart. TrustSection now renders this one.
 */
export function PartnerSection() {
  return (
    <Section space="sm">
      <Container width="prose">
        <Reveal>
          {/*
           * Was #75AED4 with white text: 2.42:1, a WCAG AA failure. The deeper
           * accent gradient keeps the blue identity and reads at 5.8:1 or better.
           */}
          <div className="rounded-3xl bg-gradient-to-br from-accent-700 to-accent-900 p-9 shadow-float md:p-12">
            <h2 className="text-center font-display text-display-sm font-semibold text-white">
              {partnerCard.headline}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-white/85 md:text-lg">
              {partnerCard.body}
            </p>

            <ul className="mt-9 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              {partnerCard.pills.map((pill, index) => {
                const Icon = icons[pill.icon as IconName];
                return (
                  <Reveal
                    key={pill.label}
                    as="li"
                    index={index + 1}
                    variant="scale"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-sm"
                  >
                    <Icon aria-hidden="true" size={18} className="text-white" />
                    <span className="text-sm font-medium text-white">{pill.label}</span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
