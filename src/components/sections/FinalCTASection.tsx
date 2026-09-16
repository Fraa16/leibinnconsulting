import { finalCta } from '../../content/contact';
import { resolvePhoto } from '../../lib/images';
import { useLeadForm } from '../../lib/form/useLeadForm';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { Picture } from '../ui/Picture';
import { Button } from '../ui/Button';
import { Field, Honeypot, TextAreaField } from '../form/Field';
import { ConsentCheckbox } from '../form/ConsentCheckbox';
import { FormStatus } from '../form/FormStatus';

const image = resolvePhoto('finalCta');

export function FinalCTASection() {
  const form = useLeadForm({
    source: 'erstgespraech',
    fields: {
      name: { rules: ['required'] },
      email: { rules: ['required', 'email'] },
      message: { rules: [] },
    },
  });

  return (
    <Section id="kontakt" space="lg" aria-labelledby="kontakt-heading">
      <Container width="content">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-panel">
            {/*
             * Was a single centred column capped at max-w-2xl inside a max-w-5xl
             * card, leaving the right third of the card empty on desktop. Split
             * into a real two-column composition instead.
             */}
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[240px] lg:min-h-full">
                <Picture
                  image={image}
                  alt="Moderne Immobilie"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent lg:bg-gradient-to-r"
                />
              </div>

              <div className="px-6 py-10 md:px-10 md:py-12">
                <span aria-hidden="true" className="rule-accent mb-6" />

                <h2
                  id="kontakt-heading"
                  className="font-display text-display-sm font-semibold text-ink-900"
                >
                  {finalCta.headline}
                </h2>

                <p className="mt-5 text-base leading-relaxed text-ink-600 md:text-lg">
                  {finalCta.body}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2 text-sm text-ink-600">
                  {finalCta.pills.map((pill) => (
                    <li
                      key={pill}
                      className="inline-flex items-center gap-2 rounded-full bg-paper-600 px-3 py-1.5"
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                      {pill}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {form.status === 'success' ? (
                    <FormStatus status={form.status} devMode={form.devMode} />
                  ) : (
                    <form onSubmit={form.handleSubmit} noValidate className="relative space-y-4">
                      <Honeypot value={form.honeypot} onChange={form.setHoneypot} />

                      <Field
                        id={form.fieldId('name')}
                        name="name"
                        label={finalCta.fields.name.label}
                        placeholder={finalCta.fields.name.placeholder}
                        autoComplete="name"
                        value={form.values.name}
                        error={form.errors.name}
                        onChange={(event) => form.setValue('name', event.target.value)}
                        onBlur={() => form.blurField('name')}
                      />

                      <Field
                        id={form.fieldId('email')}
                        name="email"
                        type="email"
                        inputMode="email"
                        label={finalCta.fields.email.label}
                        placeholder={finalCta.fields.email.placeholder}
                        autoComplete="email"
                        value={form.values.email}
                        error={form.errors.email}
                        onChange={(event) => form.setValue('email', event.target.value)}
                        onBlur={() => form.blurField('email')}
                      />

                      <TextAreaField
                        id={form.fieldId('message')}
                        name="message"
                        label={finalCta.fields.message.label}
                        placeholder={finalCta.fields.message.placeholder}
                        value={form.values.message}
                        error={form.errors.message}
                        onChange={(event) => form.setValue('message', event.target.value)}
                        onBlur={() => form.blurField('message')}
                      />

                      <ConsentCheckbox
                        id={form.fieldId('consent')}
                        checked={form.consent}
                        onChange={form.toggleConsent}
                        error={form.consentError}
                      />

                      <FormStatus status={form.status} error={form.formError} />

                      <Button
                        type="submit"
                        size="lg"
                        withArrow={form.status !== 'submitting'}
                        disabled={form.status === 'submitting'}
                      >
                        {form.status === 'submitting' ? 'Wird gesendet …' : finalCta.submit}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
