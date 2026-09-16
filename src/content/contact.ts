/** Copy for the two lead-capture forms. */

export const quickContact = {
  headline: 'Investieren leicht gemacht:',
  body: 'Wir übernehmen den Aufwand, Sie wählen den passenden Moment zum Starten.',
  pills: ['Unverbindlich', 'Kostenlos', '15 Minuten'],
  fields: {
    firstname: { label: 'Vorname', placeholder: 'Max' },
    lastname: { label: 'Nachname', placeholder: 'Mustermann' },
    email: { label: 'Email', placeholder: 'name@beispiel.de' },
  },
  submit: 'Jetzt unverbindliche Beratung anfordern',
} as const;

export const finalCta = {
  headline: 'Bereit für Ihre steueroptimierte Immobilienstrategie?',
  body: 'Ob erste Fragen oder eine konkrete Zielsetzung – im persönlichen Gespräch prüfen wir gemeinsam, wie wir Sie sinnvoll unterstützen können. Transparent, strukturiert und vollkommen unverbindlich.',
  pills: ['Kostenloses Erstgespräch', 'Individuelle Einschätzung', 'Klare nächste Schritte'],
  fields: {
    name: { label: 'Ihr Name', placeholder: 'Max Mustermann' },
    email: { label: 'Ihre E-Mail-Adresse', placeholder: 'name@beispiel.de' },
    message: { label: 'Ihr Anliegen', placeholder: 'Worum geht es bei Ihnen?' },
  },
  submit: 'Unverbindliches Erstgespräch anfragen',
} as const;

/*
 * NEW STRINGS below — functional UI text that did not exist before, because the
 * forms had no validation, no consent and no result states at all.
 * All listed in CONTENT.md for client sign-off.
 */
export const formMessages = {
  required: 'Bitte füllen Sie dieses Feld aus.',
  invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  tooShort: 'Bitte geben Sie etwas mehr Kontext an.',
  consentRequired: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
  consentLabel: 'Ich habe die',
  consentLinkLabel: 'Datenschutzerklärung',
  consentLabelSuffix: 'gelesen und stimme der Verarbeitung meiner Daten zu.',
  submitting: 'Wird gesendet …',
  successTitle: 'Vielen Dank für Ihre Anfrage.',
  successBody: 'Wir melden uns zeitnah persönlich bei Ihnen.',
  errorTitle: 'Das hat leider nicht geklappt.',
  errorBody: 'Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.',
} as const;
