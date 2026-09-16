import { trustAuthority, trustCards, trustSection } from '../../content/trust';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Card, IconBadge } from '../ui/Card';
import { icons, type IconName } from '../ui/icons';

/* Bento spans, keyed by card id. Replaces the old row-span layout, which relied
 * on implicit row heights and collapsed unpredictably at some breakpoints. */
const spans: Record<string, string> = {
  geprueft: 'lg:col-span-4',
  offmarket: 'lg:col-span-12',
  netzwerk: 'lg:col-span-7',
  kennzahlen: 'lg:col-span-5',
};

export function TrustSection() {
  return (
    <Section space="lg" aria-labelledby="vertrauen-heading">
      <div className="mx-auto w-full max-w-wide px-1.5 md:px-6">
        <div className="rounded-3xl border border-white/70 bg-paper-600 px-6 py-12 shadow-panel md:px-12 md:py-16">
          <SectionHeading
            id="vertrauen-heading"
            rule
            align="center"
            eyebrow={trustSection.eyebrow}
            title={trustSection.headline}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <Card elevation="panel" className="flex h-full flex-col gap-4 p-6 md:p-8">
                <span aria-hidden="true" className="rule-accent" />
                <h3 className="font-display text-xl font-semibold text-ink-900 md:text-2xl">
                  {trustAuthority.title}
                </h3>
                {trustAuthority.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-sm leading-relaxed text-ink-600 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </Card>
            </Reveal>

            {trustCards.map((card, index) => {
              const Icon = icons[card.icon as IconName];
              const wide = card.id === 'offmarket';

              return (
                <Reveal key={card.id} index={index + 1} className={spans[card.id]}>
                  <Card
                    elevation="panel"
                    interactive
                    className={
                      wide
                        ? 'flex h-full items-start gap-5 p-6 md:p-8'
                        : 'flex h-full flex-col gap-4 p-6 md:p-8'
                    }
                  >
                    <IconBadge>
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                    </IconBadge>
                    <div className={wide ? 'flex-1' : undefined}>
                      <h3 className="text-base font-semibold text-ink-900 md:text-lg">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600 md:text-base">
                        {card.text}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
