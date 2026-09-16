export const trustSection = {
  eyebrow: 'Vertrauen & Expertise',
  headline: 'Ihre Sicherheit ist unser Anspruch.',
} as const;

export const trustAuthority = {
  title: 'Warum Sie uns vertrauen können',
  paragraphs: [
    /* Rendered as one paragraph: the original JSX had a source line break here,
       which JSX collapses to a single space. Preserved exactly as it renders. */
    'Unsere Arbeit basiert auf klaren Prozessen, geprüften Immobilien und einer Beratung, die Ihre Ziele und Ihre steuerliche Situation in den Mittelpunkt stellt. Sie erhalten nachvollziehbare Analysen statt vager Empfehlungen und haben jederzeit volle Transparenz über Chancen, Risiken und wirtschaftliche Kennzahlen.',
    'Wir empfehlen nur Strategien, die wir fachlich vertreten können und die zu Ihrer persönlichen Situation passen. Verlässliche Entscheidungen entstehen durch Transparenz und Erfahrung.',
  ],
} as const;

export const trustCards = [
  {
    id: 'geprueft',
    icon: 'badgeCheck',
    title: 'Geprüfte Immobilien',
    text: 'Jede Immobilie wird anhand klar definierter Kriterien bewertet. Lage, Bausubstanz, Mietpotenzial und Wirtschaftlichkeit werden systematisch geprüft, bevor wir sie in Ihre Auswahl aufnehmen.',
  },
  {
    id: 'offmarket',
    icon: 'keyRound',
    title: 'Zugang zu Off Market Objekten',
    text: 'Sie profitieren von Immobilien, die nicht öffentlich angeboten werden und durch unser Netzwerk verfügbar sind. So erhalten Sie Zugang zu Chancen, die für viele Anleger unsichtbar bleiben, und schaffen sich einen echten Wettbewerbsvorteil.',
  },
  {
    id: 'netzwerk',
    icon: 'users',
    title: 'Starkes Expertennetzwerk',
    text: 'Wir arbeiten mit Banken, Steuerberatern, Finanzierern und regionalen Experten zusammen. Dieses Netzwerk ermöglicht fundierte Standort- und Objektprüfungen und sorgt dafür, dass Sie bei Finanzierung, Bewertung und strategischer Planung professionell begleitet werden.',
  },
  {
    id: 'kennzahlen',
    icon: 'barChart',
    title: 'Transparente Kennzahlen',
    text: 'Sie treffen Ihre Entscheidungen auf Basis nachvollziehbarer Zahlen und Szenarien. Cashflow, Rendite, Risiken und Reserven werden offen gelegt, damit Sie genau wissen, welche Rolle jede Immobilie in Ihrer Strategie übernimmt.',
  },
] as const;

export const partnerCard = {
  headline: 'Ihr verlässlicher Partner für eine klare Immobilienstrategie.',
  body: 'Wir begleiten Sie persönlich durch Analyse, Auswahl und Ankauf. Mit Erfahrung, geprüften Methoden und einem Netzwerk aus Experten schaffen wir Transparenz und Sicherheit bei jeder Entscheidung.',
  pills: [
    { icon: 'barChart', label: 'Strukturierte Analyse' },
    { icon: 'building', label: 'Geprüfte Immobilien' },
    { icon: 'handshake', label: 'Persönliche Begleitung' },
  ],
} as const;
