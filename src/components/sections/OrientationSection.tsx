import { Check } from 'lucide-react';
import { benefits, orientationSection } from '../../content/orientation';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Card } from '../ui/Card';

export function OrientationSection() {
  return (
    <Section space="lg" aria-labelledby="orientierung-heading">
      <Container width="content">
        <SectionHeading
          id="orientierung-heading"
          rule
          eyebrow={orientationSection.eyebrow}
          title={orientationSection.headline}
          intro={orientationSection.intro}
        />

        <ul className="mt-14 grid gap-5 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} as="li" index={index} className="h-full">
              <Card interactive className="flex h-full flex-col gap-4 p-6 md:p-7">
                <div className="flex items-start gap-3">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600"
                    strokeWidth={2.25}
                  />
                  <h3 className="text-base font-semibold leading-snug text-ink-900 md:text-lg">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-ink-600 md:text-base">{benefit.text}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
