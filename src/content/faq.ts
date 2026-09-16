export interface FAQItem {
  question: string;
  answer: string;
}

export const faqSection = {
  eyebrow: 'Häufige Fragen',
} as const;

/** Also the source for the FAQPage JSON-LD in src/components/seo/StructuredData.tsx. */
export const faqItems: FAQItem[] = [
  {
    question: 'Wie läuft das Erstgespräch ab?',
    answer:
      'Im Erstgespräch klären wir Ihre Ziele, Ihre steuerliche Ausgangssituation und Ihre finanzielle Richtung. Sie erhalten eine erste Einschätzung, ob Immobilien für Ihre Strategie sinnvoll sind und welche nächsten Schritte passen.',
  },
  {
    question: 'Wie viel Kapital benötige ich für den Einstieg?',
    answer:
      'Die meisten unserer Mandanten starten mit einem Eigenkapitalrahmen zwischen 20.000 und 50.000 Euro. Der genaue Betrag hängt jedoch von Objekt, Standort und Finanzierungsmodell ab.',
  },
  {
    question: 'Welche Risiken gibt es bei Immobilieninvestments?',
    answer:
      'Jede Immobilie wird auf Risiken wie Leerstand, Standortentwicklung, Instandhaltung oder Mietpreisentwicklung geprüft. Unser Ziel ist es, Risiken transparent zu machen und Sie bei einer fundierten Entscheidung zu unterstützen.',
  },
  {
    question: 'Wie finde ich rentable Immobilien in der aktuellen Marktlage?',
    answer:
      'Wir prüfen Märkte, Standorte und Objekte anhand klarer Kriterien. Wirtschaftlichkeit, Cashflow, Nachfrage und steuerliche Auswirkungen fließen in die Analyse ein. So erhalten Sie Zugang zu Immobilien, die strategisch sinnvoll sind.',
  },
  {
    question: 'Entstehen Kosten für das Erstgespräch?',
    answer:
      'Nein. Das Erstgespräch ist unverbindlich und kostenlos. Sie entscheiden erst danach, ob Sie eine Zusammenarbeit wünschen.',
  },
  {
    question: 'Begleiten Sie auch den Ankauf?',
    answer:
      'Ja. Wir unterstützen bei der Auswahl, der Finanzierung, der Prüfung der Unterlagen und den entscheidenden Schritten im Kaufprozess.',
  },
  {
    question: 'Was unterscheidet Sie von klassischen Maklern?',
    answer:
      'Wir verkaufen keine Immobilien. Wir entwickeln eine steuerlich sinnvolle Gesamtstrategie, analysieren Objekte neutral und begleiten Sie unabhängig durch den gesamten Prozess.',
  },
  {
    question: 'Kann ich auch als Normalverdiener investieren?',
    answer:
      'Ja. Viele unserer Mandanten sind keine Großinvestoren, sondern Angestellte und Selbstständige, die langfristig Vermögen aufbauen möchten.',
  },
];
