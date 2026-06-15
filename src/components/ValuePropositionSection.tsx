import { useState } from 'react';
import cedrikImage from '../Images/cedrik.webp';

const values = [
  {
    id: 1,
    title: "Steueroptimierter Vermögensaufbau",
    text: "Sie nutzen Immobilien gezielt, um Ihre Steuerlast zu senken und parallel ein stabiles Vermögen in Sachwerten aufzubauen."
  },
  {
    id: 2,
    title: "Zugang zu geprüften Immobilien",
    text: "Sie erhalten Zugang zu Objekten, die anhand klarer Kriterien geprüft wurden. Lage, Wirtschaftlichkeit und Potenzial werden transparent bewertet."
  },
  {
    id: 3,
    title: "Struktur und Klarheit statt Komplexität",
    text: "Sie bekommen einen klaren Fahrplan und nachvollziehbare Entscheidungsgrundlagen an die Hand. So behalten Sie auch bei komplexen Themen den Überblick."
  },
  {
    id: 4,
    title: "Persönliche Begleitung auf Augenhöhe",
    text: "Sie haben einen festen Ansprechpartner, der Ihre Situation kennt, Ihre Ziele versteht und Sie Schritt für Schritt begleitet."
  }
];

export default function ValuePropositionSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const activeValue = values.find(v => v.id === activeId);

  return (
    <section className="bg-[#F7F7F7] py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto px-[6px] md:px-6">
        <div className="bg-[#E2E7E8] rounded-3xl border border-white/70 shadow-[0_24px_80px_rgba(0,0,0,0.16)] px-6 md:px-10 py-8 md:py-10">
          <p className="text-xs uppercase tracking-[0.18em] text-[#0A0A0A]/60 mb-2">
            Ihr Mehrwert
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] mb-3">
            Was Sie mit einer strukturierten Immobilienstrategie gewinnen.
          </h2>

          <p className="text-base md:text-lg text-[#0A0A0A]/80 mb-8 max-w-2xl">
            Mit der richtigen Begleitung wird aus komplexen Entscheidungen ein klarer, nachvollziehbarer Weg. Diese Vorteile stehen für unsere Mandanten im Mittelpunkt.
          </p>

          <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">

            {/* Left column: Scrollable value cards */}
            <div className="space-y-5">
              {values.map((value) => {
                const isActive = activeId === value.id;
                return (
                  <button
                    key={value.id}
                    type="button"
                    className={`
                      w-full text-left bg-white rounded-2xl border p-5 md:p-6 transition-all duration-300
                      ${isActive
                        ? 'border-[#75AED4] shadow-[0_18px_60px_rgba(0,0,0,0.16)] scale-[1.01]'
                        : 'border-[#E2E7E8] shadow-[0_10px_40px_rgba(0,0,0,0.08)]'
                      }
                    `}
                    onMouseEnter={() => setActiveId(value.id)}
                    onFocus={() => setActiveId(value.id)}
                    onClick={() => setActiveId(prev => prev === value.id ? null : value.id)}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#75AED4] flex-shrink-0" />
                      <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-[#0A0A0A]/80 leading-relaxed">
                      {value.text}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right column: Sticky portrait placeholder */}
            <div className="md:sticky md:top-24">
              <div className="relative rounded-3xl bg-white/60 border border-white/70 shadow-[0_18px_60px_rgba(0,0,0,0.14)] h-[260px] md:h-[360px] flex flex-col items-center justify-center overflow-hidden">
                <img
                  src={cedrikImage}
                  alt="Cedrik - Geschäftsführer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-[#0A0A0A]/50 text-center mt-3">
                Ihr Ansprechpartner und Gründer - Cedrik Leibinn
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
