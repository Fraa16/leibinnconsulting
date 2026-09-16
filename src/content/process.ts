export const processSection = {
  headline: 'So läuft Ihr Weg zur steueroptimierten Immobilienstrategie.',
  cta: { label: 'Unverbindliche Beratung anfragen', href: '#kontakt' },
} as const;

export const processSteps = [
  {
    stepNumber: 1,
    label: 'STEP 01',
    title: 'Erstgespräch und Analyse',
    text: 'Wir verstehen Ihre aktuelle steuerliche Situation, Ihre Ziele und Ihre finanzielle Ausgangslage.',
  },
  {
    stepNumber: 2,
    label: 'STEP 02',
    title: 'Standort- und Objektprüfung',
    text: 'Wir prüfen Märkte, vergleichen Standorte und identifizieren passende Immobilien anhand klarer Kriterien.',
  },
  {
    stepNumber: 3,
    label: 'STEP 03',
    title: 'Entscheidung mit klaren Kennzahlen',
    text: 'Sie erhalten eine transparente Bewertung der Immobilien, inklusive Wirtschaftlichkeit, Risiken und Potenzial.',
  },
  {
    stepNumber: 4,
    label: 'STEP 04',
    title: 'Begleitung beim Ankauf',
    text: 'Wir unterstützen bei Finanzierung, Prüfung, Vertragsdetails und sorgen für eine reibungslose Abwicklung.',
  },
] as const;
