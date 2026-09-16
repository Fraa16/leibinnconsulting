import { quickContact } from '../../content/contact';
import { resolvePhoto } from '../../lib/images';
import { useParallax } from '../../lib/hooks/useParallax';
import { useLeadForm } from '../../lib/form/useLeadForm';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { Field, Honeypot } from '../form/Field';
import { ConsentCheckbox } from '../form/ConsentCheckbox';
import { FormStatus } from '../form/FormStatus';

const texture = resolvePhoto('contactTexture');

export function QuickContactSection() {
  const parallaxRef = useParallax<HTMLDivElement>({ speed: 0.14, maxOffset: 60 });

  const form = useLeadForm({
    source: 'kurzkontakt',
    fields: {
      firstname: { rules: ['required'] },
      lastname: { rules: ['required'] },
      email: { rules: ['required', 'email'] },
    },
  });

  return (
    <Section space="sm">
      <div className="mx-auto w-full max-w-[1200px] px-1.5 md:px-6">
        <Reveal>
          <div
            ref={parallaxRef}
            className="relative overflow-hidden rounded-3xl bg-ink-900 shadow-panel"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 scale-110 bg-cover bg-center opacity-[0.09] will-change-transform"
              style={{
                backgroundImage: `url(${texture.src})`,
                transform: 'translate3d(0, var(--parallax-y, 0px), 0)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-transparent to-accent-900/30"
            />

            <div className="relative z-10 grid gap-8 px-6 py-10 md:grid-cols-[1.1fr_1fr] md:gap-12 md:px-12 md:py-12">
              <div className="flex flex-col justify-center">
                <span className="rule-accent mb-6" />

                <h2 className="font-display text-display-sm font-semibold leading-tight text-white">
                  {quickContact.headline}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-white/80">{quickContact.body}</p>

                <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-white/75">
                  {quickContact.pills.map((pill) => (
                    <li key={pill} className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                      {pill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center">
                {form.status === 'success' ? (
                  <FormStatus status={form.status} devMode={form.devMode} tone="dark" />
                ) : (
                  <form onSubmit={form.handleSubmit} noValidate className="relative space-y-3">
                    <Honeypot value={form.honeypot} onChange={form.setHoneypot} />

                    <Field
                      id={form.fieldId('firstname')}
                      name="firstname"
                      label={quickContact.fields.firstname.label}
                      placeholder={quickContact.fields.firstname.placeholder}
                      autoComplete="given-name"
                      tone="dark"
                      value={form.values.firstname}
                      error={form.errors.firstname}
                      onChange={(event) => form.setValue('firstname', event.target.value)}
                      onBlur={() => form.blurField('firstname')}
                    />

                    <Field
                      id={form.fieldId('lastname')}
                      name="lastname"
                      label={quickContact.fields.lastname.label}
                      placeholder={quickContact.fields.lastname.placeholder}
                      autoComplete="family-name"
                      tone="dark"
                      value={form.values.lastname}
                      error={form.errors.lastname}
                      onChange={(event) => form.setValue('lastname', event.target.value)}
                      onBlur={() => form.blurField('lastname')}
                    />

                    <Field
                      id={form.fieldId('email')}
                      name="email"
                      type="email"
                      inputMode="email"
                      label={quickContact.fields.email.label}
                      placeholder={quickContact.fields.email.placeholder}
                      autoComplete="email"
                      tone="dark"
                      value={form.values.email}
                      error={form.errors.email}
                      onChange={(event) => form.setValue('email', event.target.value)}
                      onBlur={() => form.blurField('email')}
                    />

                    <ConsentCheckbox
                      id={form.fieldId('consent')}
                      checked={form.consent}
                      onChange={form.toggleConsent}
                      error={form.consentError}
                      tone="dark"
                    />

                    <FormStatus status={form.status} error={form.formError} tone="dark" />

                    <Button
                      type="submit"
                      size="lg"
                      withArrow={form.status !== 'submitting'}
                      disabled={form.status === 'submitting'}
                      className="w-full"
                    >
                      {form.status === 'submitting' ? 'Wird gesendet …' : quickContact.submit}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
