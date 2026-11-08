import { useId, useState } from 'react';
import Reveal from './ui/Reveal';
import { Accent } from './ui/SectionHead';
import { cn } from '../lib/cn';

const FAQS = [
  {
    q: 'Wie läuft das Erstgespräch ab?',
    a: 'In rund 15 Minuten besprechen wir Ihre Ausgangslage: Einkommen, steuerliche Situation, Ziele und Zeithorizont. Danach wissen Sie, ob eine Immobilienstrategie für Sie sinnvoll ist. Unverbindlich und ohne Verkaufsdruck.',
  },
  {
    q: 'Wie viel Eigenkapital benötige ich?',
    a: 'Oft weniger als erwartet. Entscheidend sind Einkommen, Bonität und Finanzierungsrahmen. Was für Sie realistisch ist, klären wir im Erstgespräch.',
  },
  {
    q: 'Welche Risiken gibt es bei Immobilieninvestments?',
    a: 'Leerstand, Zinsänderungen, Instandhaltung und die Entwicklung des Standorts. Wir machen diese Risiken transparent, rechnen Szenarien durch und planen Puffer ein, bevor Sie entscheiden.',
  },
  {
    q: 'Wie finde ich rentable Objekte in der aktuellen Marktlage?',
    a: 'Mit klaren Kriterien statt Bauchgefühl: Lage, Bausubstanz, Mietpotenzial und Wirtschaftlichkeit. Über unser Netzwerk erhalten Sie zusätzlich Zugang zu Off-Market-Objekten.',
  },
  {
    q: 'Entstehen Kosten für das Erstgespräch?',
    a: 'Nein. Das Erstgespräch ist kostenlos und unverbindlich.',
  },
  {
    q: 'Begleiten Sie auch den Ankauf?',
    a: 'Ja. Wir unterstützen bei Finanzierung, Prüfung und Vertragsdetails bis zum Notartermin und bleiben danach Ihr Ansprechpartner.',
  },
  {
    q: 'Kann ich auch als Normalverdiener investieren?',
    a: 'Ja. Entscheidend ist nicht ein besonders hohes Einkommen, sondern eine Strategie, die zu Budget, Lebensplanung und Zielen passt.',
  },
];

/** One answer open at a time; the first is open on load. */
export default function FaqSection() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="panel-light">
      <div className="shell grid items-start gap-x-[clamp(40px,6vw,96px)] gap-y-12 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
        <Reveal className="flex flex-col gap-6 lg:sticky lg:top-[120px]">
          <p className="eyebrow text-copper-dark">09 · Häufige Fragen</p>
          <h2 id="faq-title" className="t-h2">
            Gut zu <Accent>wissen.</Accent>
          </h2>
          <p className="t-lead max-w-[30em] text-stone">
            Ihre Frage ist nicht dabei? Im Erstgespräch nehmen wir uns Zeit für alles, was Sie beschäftigt.
          </p>
          <a href="#termin" className="btn btn-ink h-[52px] self-start px-[22px] text-[15px]">
            Frage im Gespräch klären →
          </a>
        </Reveal>

        <Reveal delay={100} className="flex flex-col gap-2">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={f.q} className="rounded-[18px] bg-white">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="grid w-full grid-cols-[minmax(0,1fr)_34px] items-center gap-5 px-6 py-[22px] text-left text-ink"
                  >
                    <span className="text-[18px] font-medium tracking-[-.01em] [text-wrap:wrap]">{f.q}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line text-[18px] transition-all duration-[250ms]',
                        isOpen ? 'rotate-45 bg-ink text-white' : 'bg-white text-ink',
                      )}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className="acc-panel" data-open={isOpen}>
                  <div>
                    <p className="mb-6 ml-6 mr-6 mt-[-6px] text-[16px] leading-[1.7] text-stone sm:mr-[78px]">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
