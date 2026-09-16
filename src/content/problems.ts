export interface Problem {
  id: number;
  title: string;
  short: string;
  full: string;
}

export const problemSection = {
  eyebrow: 'Ihre aktuelle Situation',
  headline: 'Das Problem: Hohe Steuerlast, wenig Zeit – und zu viele Unsicherheiten.',
  intro: 'Vermutlich erkennen Sie sich in einem oder mehreren dieser Punkte wieder:',
  expandLabel: 'Mehr erfahren',
} as const;

export const problems: Problem[] = [
  {
    id: 1,
    title: 'Steuerliche Unsicherheit trotz hoher Belastung',
    short: 'Sie wissen nicht genau, wie Sie Ihre Steuerlast sinnvoll reduzieren können.',
    full: 'Viele Anleger wissen nicht genau, wie sie ihre bestehende Steuerlast sinnvoll reduzieren können. Gleichzeitig ist unklar, wie Immobilieninvestitionen steuerlich optimal gestaltet werden, ohne Risiken einzugehen oder unerwartete Kosten auszulösen.',
  },
  {
    id: 2,
    title: 'Hoher Aufwand bei Analyse und Standortwahl',
    short: 'Der Markt ist unübersichtlich und schwer zu bewerten.',
    full: 'Der Immobilienmarkt ist unübersichtlich. Viele Objekte sind nur schwer vergleichbar oder werden ohne klare Datenlage angeboten. Dadurch fällt es schwer, echte Chancen zu erkennen und verlässliche Entscheidungen zu treffen.',
  },
  {
    id: 3,
    title: 'Risiko von Leerstand und schwankender Nachfrage',
    short: 'Leerstand und Mieterwechsel können Ihre Rendite schmälern.',
    full: 'Leerstand, Mieterwechsel oder eine unerwartete Veränderung der regionalen Nachfrage können die Rendite erheblich beeinträchtigen. Besonders schwierig wird es, wenn Immobilien nicht regelmäßig überwacht oder professionell betreut werden.',
  },
  {
    id: 4,
    title: 'Komplexität rund um Finanzierung und Kaufnebenkosten',
    short: 'Finanzierung, Zinsen und Nebenkosten sind oft schwer abzuschätzen.',
    full: 'Zwischen Finanzierungsbedingungen, steigenden Zinsen, Bankanforderungen und nicht immer transparenten Nebenkosten verlieren viele den Überblick. Eine ungenaue Kalkulation kann dazu führen, dass ein vermeintlich gutes Objekt am Ende nicht wirtschaftlich ist.',
  },
  {
    id: 5,
    title: 'Zeitmangel und fehlende fachliche Unterstützung',
    short: 'Ihnen fehlt Zeit für gründliche Prüfung und fachliche Begleitung.',
    full: 'Unternehmer und Berufstätige haben kaum Zeit für gründliche Marktanalysen, Vertragsprüfungen, steuerliche Bewertungen oder Objektvergleiche. Ohne erfahrene Begleitung steigt das Risiko, strategisch wichtige Details zu übersehen.',
  },
];
