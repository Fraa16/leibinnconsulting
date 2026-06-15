import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeInUp } from './FadeInUp';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Wie läuft das Erstgespräch ab?',
    answer: 'Im Erstgespräch klären wir Ihre Ziele, Ihre steuerliche Ausgangssituation und Ihre finanzielle Richtung. Sie erhalten eine erste Einschätzung, ob Immobilien für Ihre Strategie sinnvoll sind und welche nächsten Schritte passen.',
  },
  {
    question: 'Wie viel Kapital benötige ich für den Einstieg?',
    answer: 'Die meisten unserer Mandanten starten mit einem Eigenkapitalrahmen zwischen 20.000 und 50.000 Euro. Der genaue Betrag hängt jedoch von Objekt, Standort und Finanzierungsmodell ab.',
  },
  {
    question: 'Welche Risiken gibt es bei Immobilieninvestments?',
    answer: 'Jede Immobilie wird auf Risiken wie Leerstand, Standortentwicklung, Instandhaltung oder Mietpreisentwicklung geprüft. Unser Ziel ist es, Risiken transparent zu machen und Sie bei einer fundierten Entscheidung zu unterstützen.',
  },
  {
    question: 'Wie finde ich rentable Immobilien in der aktuellen Marktlage?',
    answer: 'Wir prüfen Märkte, Standorte und Objekte anhand klarer Kriterien. Wirtschaftlichkeit, Cashflow, Nachfrage und steuerliche Auswirkungen fließen in die Analyse ein. So erhalten Sie Zugang zu Immobilien, die strategisch sinnvoll sind.',
  },
  {
    question: 'Entstehen Kosten für das Erstgespräch?',
    answer: 'Nein. Das Erstgespräch ist unverbindlich und kostenlos. Sie entscheiden erst danach, ob Sie eine Zusammenarbeit wünschen.',
  },
  {
    question: 'Begleiten Sie auch den Ankauf?',
    answer: 'Ja. Wir unterstützen bei der Auswahl, der Finanzierung, der Prüfung der Unterlagen und den entscheidenden Schritten im Kaufprozess.',
  },
  {
    question: 'Was unterscheidet Sie von klassischen Maklern?',
    answer: 'Wir verkaufen keine Immobilien. Wir entwickeln eine steuerlich sinnvolle Gesamtstrategie, analysieren Objekte neutral und begleiten Sie unabhängig durch den gesamten Prozess.',
  },
  {
    question: 'Kann ich auch als Normalverdiener investieren?',
    answer: 'Ja. Viele unserer Mandanten sind keine Großinvestoren, sondern Angestellte und Selbstständige, die langfristig Vermögen aufbauen möchten.',
  },
];

// Individual FAQ accordion item component
function FAQAccordionItem({ item, index, isOpen, onToggle }: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  // Calculate content height whenever isOpen changes
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  // Generate unique IDs for ARIA attributes
  const headerId = `faq-header-${index}`;
  const bodyId = `faq-body-${index}`;

  // Handle keyboard interaction (Space and Enter keys)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="bg-white border border-[#0A0A0A]/10 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-[#75AED4]/30">
      {/* Accordion Header - Clickable button with ARIA attributes */}
      <div
        id={headerId}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between p-5 md:p-6 cursor-pointer"
      >
        <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A] pr-4">
          {item.question}
        </h3>
        {/* Chevron icon with 180deg rotation animation */}
        <span className="flex-shrink-0">
          <ChevronDown
            className="w-5 h-5 text-[#75AED4] transition-transform duration-300 ease-in-out"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </span>
      </div>

      {/* Accordion Body - Height-based animation from 0px to content height */}
      <div
        id={bodyId}
        role="region"
        aria-labelledby={headerId}
        className="overflow-hidden"
        style={{
          height: `${height}px`,
          transition: 'height 300ms ease-in-out',
        }}
      >
        {/* Inner content wrapper - ref needed to measure scrollHeight */}
        <div ref={contentRef}>
          <div className="px-5 md:px-6 pb-5 md:pb-6">
            <p className="text-sm md:text-base text-[#0A0A0A]/70 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F2F2F2] py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <FadeInUp delay={0.1}>
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-[#0A0A0A]/60">
              Häufige Fragen
            </p>
          </div>
        </FadeInUp>

        <div className="space-y-3 max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <FadeInUp key={index} delay={0.15 + index * 0.05}>
              <FAQAccordionItem
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
