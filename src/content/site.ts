/**
 * Site-wide identity, navigation and metadata.
 *
 * All German copy on this site lives under src/content/. Components read from
 * here and contain no hard-coded prose, so copy can be edited without touching
 * markup. Every string in these files is the client's approved wording and is
 * reproduced verbatim from the original build.
 */

export const site = {
  name: 'Leibinn Consulting',
  legalName: 'Leibinn Consulting',
  founder: 'Cedrik Leibinn',
  /* Used for canonical URLs, sitemap and JSON-LD. Update before go-live. */
  url: 'https://www.leibinn-consulting.de',
  locale: 'de-DE',
  /* NEW STRING — SEO only, never rendered on the page. Listed in CONTENT.md. */
  title: 'Leibinn Consulting — Steueroptimierte Immobilienstrategien',
  description:
    'Verwandeln Sie Ihre Steuerlast in langfristiges Immobilienvermögen. Strukturierte Immobilien- und Steuerstrategien für Unternehmer, Führungskräfte und Privatanleger.',
} as const;

export const navLinks = [
  { label: 'Leistungen', href: '#leistungen', id: 'leistungen' },
  { label: 'Prozess', href: '#prozess', id: 'prozess' },
  { label: 'Vertrauen', href: '#vertrauen', id: 'vertrauen' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
] as const;

export const primaryCta = {
  label: 'Beratung anfragen',
  href: '#kontakt',
} as const;

export const legalLinks = [
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'Impressum', href: '/impressum' },
] as const;
