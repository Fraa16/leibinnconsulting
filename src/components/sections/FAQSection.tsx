import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import { faqItems, faqSection } from '../../content/faq';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /**
   * Arrow / Home / End navigation between headers, per the WAI-ARIA accordion
   * pattern. The previous implementation used `<div role="button">` with a
   * hand-rolled Space/Enter handler — which loses the implicit button role,
   * the disabled semantics and the native activation behaviour for free.
   */
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = faqItems.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;

    if (next !== null) {
      event.preventDefault();
      buttonRefs.current[next]?.focus();
    }
  };

  return (
    <Section tone="alt" space="lg" aria-labelledby="faq-heading">
      <Container width="prose">
        <Reveal variant="fade">
          <span className="rule-accent mx-auto mb-6" />
        </Reveal>

        {/*
         * "Häufige Fragen" was styled as a small eyebrow paragraph, which left
         * the section with no heading at all and a gap in the document outline.
         * Same words, correct element.
         */}
        <Reveal>
          <h2
            id="faq-heading"
            className="mb-12 text-center font-display text-display-md font-semibold text-ink-900"
          >
            {faqSection.eyebrow}
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const headerId = `faq-header-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <Reveal key={item.question} index={index}>
                <div
                  className={cn(
                    'overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-200',
                    isOpen
                      ? 'border-accent-300 shadow-card-hover'
                      : 'border-ink-900/[0.08] hover:border-accent-300/60 hover:shadow-card',
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={headerId}
                      ref={(element) => {
                        buttonRefs.current[index] = element;
                      }}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      onKeyDown={(event) => onKeyDown(event, index)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                    >
                      <span className="text-base font-semibold text-ink-900 md:text-lg">
                        {item.question}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          'h-5 w-5 flex-shrink-0 text-accent-600 transition-transform duration-300 ease-entrance',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    className="grid transition-[grid-template-rows] duration-300 ease-entrance"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600 md:px-6 md:pb-6 md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
