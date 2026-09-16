import { useState, useEffect, useRef } from 'react';

interface Problem {
  id: number;
  title: string;
  short: string;
  full: string;
}

const problems: Problem[] = [
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

function ProblemCard({ problem, isActive, onToggle }: {
  problem: Problem;
  isActive: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? contentRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  return (
    <button
      onClick={onToggle}
      aria-expanded={isActive}
      className={`
        bg-white/95 rounded-2xl text-left
        transition-all duration-300 ease-in-out
        border-2
        ${
          isActive
            ? 'border-[#75AED4] shadow-[0_18px_60px_rgba(0,0,0,0.16)]'
            : 'border-transparent shadow-[0_10px_40px_rgba(0,0,0,0.08)]'
        }
      `}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-2 mb-3">
          <span className="mt-[6px] h-2 w-2 rounded-full bg-[#75AED4] flex-shrink-0" />
          <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">
            {problem.title}
          </h3>
        </div>

        <p className="text-sm md:text-base text-[#0A0A0A]/80 leading-relaxed mb-3">
          {problem.short}
        </p>

        <p
          className="text-xs text-[#75AED4] font-medium transition-opacity duration-300 ease-in-out"
          style={{
            opacity: isActive ? 0 : 1,
            pointerEvents: isActive ? 'none' : 'auto'
          }}
        >
          Mehr erfahren
        </p>
      </div>

      <div
        className="overflow-hidden"
        style={{
          height: `${height}px`,
          transition: 'height 300ms ease-in-out',
        }}
      >
        <div ref={contentRef}>
          <div className="px-5 md:px-6 pb-5 md:pb-6">
            <p className="text-sm md:text-base text-[#0A0A0A]/80 leading-relaxed">
              {problem.full}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function ProblemSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = scrolled + rect.top;
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const offset = (scrolled - elementTop) * 0.4;
        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (id: number) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section className="bg-[#F2F2F2] py-0">
      <div className="max-w-[1600px] mx-auto px-[6px] md:px-6 w-full">
        <div ref={sectionRef} className="relative overflow-hidden rounded-3xl bg-[#75AED4] px-6 md:px-10 py-12 md:py-16">
          <div
            className="absolute inset-0 opacity-[0.12] bg-cover bg-center transition-transform duration-0"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1920)',
              backgroundPosition: 'center',
              transform: `translateY(${parallaxOffset}px)`
            }}
          />
          <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.18em] text-white/80 mb-2">
            Ihre aktuelle Situation
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Das Problem: Hohe Steuerlast, wenig Zeit – und zu viele Unsicherheiten.
          </h2>

          <p className="text-base md:text-lg text-white/90 max-w-2xl mb-8">
            Vermutlich erkennen Sie sich in einem oder mehreren dieser Punkte wieder:
          </p>

          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            {problems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                isActive={activeCard === problem.id}
                onToggle={() => handleCardClick(problem.id)}
              />
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
