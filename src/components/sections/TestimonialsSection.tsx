import { testimonialSection, testimonials } from '../../content/testimonials';
import { resolveAvatar } from '../../lib/images';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Picture } from '../ui/Picture';

export function TestimonialsSection() {
  return (
    <Section space="lg" aria-labelledby="stimmen-heading">
      <Container width="content">
        <SectionHeading
          id="stimmen-heading"
          rule
          align="center"
          eyebrow={testimonialSection.eyebrow}
          title={testimonialSection.headline}
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} as="li" index={index} className="h-full">
              {/*
               * <figure>/<blockquote>/<cite> instead of a bare div stack: the
               * quote is now programmatically attributed to its author rather
               * than merely sitting above a name.
               */}
              <figure className="flex h-full flex-col rounded-3xl border border-ink-900/[0.07] bg-white p-7 shadow-card transition-[transform,box-shadow] duration-300 ease-entrance hover:-translate-y-1 hover:shadow-card-hover md:p-8">
                <span
                  aria-hidden="true"
                  className="mb-4 block select-none font-display text-6xl leading-[0.7] text-accent-300"
                >
                  &ldquo;
                </span>

                <blockquote className="flex-1 text-sm leading-relaxed text-ink-600 md:text-base">
                  {testimonial.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-ink-900/[0.07] pt-5">
                  <Picture
                    image={resolveAvatar(testimonial.avatar)}
                    alt=""
                    sizes="48px"
                    className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                  />
                  <span>
                    <cite className="block text-sm font-semibold not-italic text-ink-900">
                      {testimonial.name}
                    </cite>
                    <span className="block text-xs text-ink-500">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
