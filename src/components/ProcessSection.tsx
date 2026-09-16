import { FadeInUp } from './FadeInUp';

const processSteps = [
  {
    stepNumber: 1,
    label: "STEP 01",
    title: "Erstgespräch und Analyse",
    text: "Wir verstehen Ihre aktuelle steuerliche Situation, Ihre Ziele und Ihre finanzielle Ausgangslage."
  },
  {
    stepNumber: 2,
    label: "STEP 02",
    title: "Standort- und Objektprüfung",
    text: "Wir prüfen Märkte, vergleichen Standorte und identifizieren passende Immobilien anhand klarer Kriterien."
  },
  {
    stepNumber: 3,
    label: "STEP 03",
    title: "Entscheidung mit klaren Kennzahlen",
    text: "Sie erhalten eine transparente Bewertung der Immobilien, inklusive Wirtschaftlichkeit, Risiken und Potenzial."
  },
  {
    stepNumber: 4,
    label: "STEP 04",
    title: "Begleitung beim Ankauf",
    text: "Wir unterstützen bei Finanzierung, Prüfung, Vertragsdetails und sorgen für eine reibungslose Abwicklung."
  }
];

export default function ProcessSection() {
  return (
    <section className="process-area bg-[#F4F6F9] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1F2841]">
              So läuft Ihr Weg zur steueroptimierten Immobilienstrategie.
            </h2>
          </FadeInUp>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10">
          {processSteps.map((step, index) => (
            <FadeInUp key={index} delay={0.3 + index * 0.1}>
              <div className="group relative px-8 py-10 flex flex-col gap-4 overflow-hidden">

                <div className="absolute -top-9 right-4 text-[280px] md:text-[320px] lg:text-[250px] leading-none font-bold text-[#75AED4]/20 pointer-events-none select-none transition-transform duration-250 ease-out group-hover:-translate-y-0.5 bg-gradient-to-b from-[#75AED4]/20 via-[#75AED4]/20 to-transparent bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #75AED4 0%, #75AED4 66%, transparent 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: 0.2 }}>
                  {step.stepNumber}
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1F2841] mb-3 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-sm md:text-base text-[#1F2841]/70 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp delay={0.7}>
          <div className="mt-12 flex justify-center">
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 text-[#1F2841] font-medium text-lg hover:text-[#75AED4] transition-colors duration-300"
            >
              <span className="relative">
                Unverbindliche Beratung anfragen
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1F2841] group-hover:bg-[#75AED4] transition-colors duration-300"></span>
              </span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
