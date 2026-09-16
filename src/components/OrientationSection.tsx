import { Check } from 'lucide-react';
import { FadeInUp } from './FadeInUp';

const benefits = [
  {
    title: "Transparente Analyse ohne Informationsflut",
    text: "Sie brauchen eine klare Einordnung Ihrer steuerlichen und finanziellen Ausgangssituation. Nur so erkennen Sie, welche Immobilienstrategie sinnvoll und realistisch ist."
  },
  {
    title: "Strukturierte Bewertung statt Bauchgefühl",
    text: "Objekte sollten nach klaren Kriterien geprüft werden, damit Entscheidungen nicht nach Hoffnung oder Vermutungen getroffen werden, sondern auf einer verlässlichen Grundlage."
  },
  {
    title: "Professionelle Begleitung für Ihre Ziele",
    text: "Ein erfahrener Partner gibt Sicherheit, spart Zeit und hilft, Fehler zu vermeiden. Gerade bei steuerlichen und finanziellen Themen ist eine kompetente Begleitung entscheidend."
  },
  {
    title: "Klarheit über Risiken und Szenarien",
    text: "Sie verstehen, welche Risiken realistisch sind, wie sich verschiedene Marktszenarien auswirken und welche Puffer in Ihre Entscheidung einkalkuliert werden sollten."
  },
  {
    title: "Fokus auf langfristigen Vermögensaufbau",
    text: "Statt nur auf den nächsten Kauf zu schauen, betrachten wir Ihre Immobilien immer im Kontext Ihrer Gesamtstrategie, Ihres Vermögens und Ihrer persönlichen Lebensplanung."
  },
  {
    title: "Weniger Aufwand im Alltag",
    text: "Durch klar strukturierte Prozesse, vorbereitete Unterlagen und abgestimmte Schritte reduzieren Sie Ihren Zeitaufwand deutlich und behalten trotzdem jederzeit die Kontrolle."
  }
];

export default function OrientationSection() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <FadeInUp delay={0.1}>
          <p className="text-xs uppercase tracking-[0.18em] text-[#1F2841]/60 mb-3">
            Ihre Orientierung
          </p>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1F2841] mb-5">
            Was Sie in Ihrer Situation wirklich brauchen.
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <p className="text-base md:text-lg text-[#1F2841]/70 max-w-3xl mb-12 leading-relaxed">
            Viele Anleger stehen vor denselben Fragen. Nach zahlreichen Beratungen mit Unternehmern, leitenden Angestellten und Normalverdienern zeigt sich immer wieder, worauf es wirklich ankommt.
          </p>
        </FadeInUp>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-fr">
          {benefits.map((benefit, index) => (
            <FadeInUp key={index} delay={0.4 + index * 0.1}>
              <div className="group bg-[#E2E7E8]/95 backdrop-blur-sm rounded-2xl border border-[#DFE7F0] p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 h-full">
                <div className="flex items-center gap-3">
                  <Check className="flex-shrink-0 text-[#75AED4]" size={22} strokeWidth={2} />
                  <h3 className="text-base md:text-lg font-semibold text-[#1F2841] leading-tight">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-[#1F2841]/70 leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
