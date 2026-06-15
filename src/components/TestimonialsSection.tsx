import { FadeInUp } from './FadeInUp';
import winsomeImg from '../Images/sm.jpg';
import tomImg from '../Images/sm-2.jpg';
import lukaImg from '../Images/sm-1.jpg';

const testimonials = [
  {
    quote:
      'Cedrik überzeugt durch eine herausragende Beratung, hohe Kundenorientierung und tiefes Fachwissen. Seine Vertrauenswürdigkeit und Zuverlässigkeit machen ihn zu einem idealen Ansprechpartner für alle, die eine professionelle und individuelle Beratung suchen. Kleine Extras wie eine regelmäßige Überprüfung der bestehenden Verträge zeigen, dass er auch langfristig an einer optimalen Absicherung seiner Kunden interessiert ist.',
    name: 'Winsome Okafor',
    role: 'Lehrerin',
    image: winsomeImg,
  },
  {
    quote:
      'Dank der Beratung von Herrn Leibinn konnte ich mich voll und ganz auf mein Kerngeschäft konzentrieren, ohne mir Sorgen um meinen Vermögensaufbau machen zu müssen. Als Selbstständiger ist Zeit für mich das wertvollste Gut, und durch die klaren, effizienten Strategien, die er für mich entwickelt hat, wurde mein finanzieller Fortschritt gesichert.',
    name: 'Tom Müller',
    role: 'Selbstständiger Tätowierer',
    image: tomImg,
  },
  {
    quote:
      'Als Anwalt bin ich es gewohnt, komplexe Sachverhalte zu durchdringen und sichere Entscheidungen zu treffen. Bei meinen Investments und Versicherungen verlasse ich mich deshalb voll und ganz auf die Expertise von Herrn Leibinn. Besonders schätze ich die transparente Kommunikation und das fundierte Fachwissen, das mir bei jeder Entscheidung hilft, die richtigen Weichen für die Zukunft zu stellen.',
    name: 'Luka Šilić',
    role: 'Anwalt',
    image: lukaImg,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <FadeInUp delay={0.1}>
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs uppercase tracking-[0.18em] text-[#0A0A0A]/60 mb-3">
              Das sagen unsere Mandanten
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] max-w-xl mx-auto leading-snug">
              Echte Ergebnisse. Echte Menschen.
            </h2>
          </div>
        </FadeInUp>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <FadeInUp key={t.name} delay={0.15 + i * 0.1}>
              <div className="flex flex-col h-full bg-white rounded-3xl border border-black/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.07)] p-7 md:p-8 hover:shadow-[0_16px_48px_rgba(0,0,0,0.11)] hover:-translate-y-1 transition-all duration-300">
                <span
                  aria-hidden="true"
                  className="block text-5xl font-serif leading-none text-[#75AED4] mb-4 select-none"
                >
                  &ldquo;
                </span>

                <p className="flex-1 text-sm md:text-base text-[#0A0A0A]/75 leading-relaxed mb-7">
                  {t.quote}
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-black/[0.07]">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#0A0A0A]">{t.name}</p>
                    <p className="text-xs text-[#0A0A0A]/50">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
