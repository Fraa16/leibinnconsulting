import { ArrowRight } from 'lucide-react';
import { FadeInUp } from './FadeInUp';

export default function FinalCTASection() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-[#F7F7F7] py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <FadeInUp delay={0.1}>
          <div className="rounded-3xl bg-white border border-white/60 shadow-[0_24px_80px_rgba(0,0,0,0.12)] overflow-hidden">

            <div className="h-[220px] md:h-[360px] w-full">
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Moderne Immobilie"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="px-6 md:px-10 py-8 md:py-10 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] mb-4">
                Bereit für Ihre steueroptimierte Immobilienstrategie?
              </h2>

              <p className="text-base md:text-lg text-[#0A0A0A]/80 mb-4 leading-relaxed">
                Ob erste Fragen oder eine konkrete Zielsetzung – im persönlichen Gespräch prüfen wir gemeinsam,
                wie wir Sie sinnvoll unterstützen können. Transparent, strukturiert und vollkommen unverbindlich.
              </p>

              <ul className="flex flex-wrap gap-3 mb-6 text-sm text-[#0A0A0A]/80">
                <li className="inline-flex items-center gap-2 rounded-full bg-[#E2E7E8] px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#75AED4]" />
                  Kostenloses Erstgespräch
                </li>
                <li className="inline-flex items-center gap-2 rounded-full bg-[#E2E7E8] px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#75AED4]" />
                  Individuelle Einschätzung
                </li>
                <li className="inline-flex items-center gap-2 rounded-full bg-[#E2E7E8] px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#75AED4]" />
                  Klare nächste Schritte
                </li>
              </ul>

              <form className="space-y-4">
                <div>
                  <label htmlFor="final-name" className="block text-xs md:text-sm font-medium text-[#0A0A0A] mb-1">
                    Ihr Name
                  </label>
                  <input
                    type="text"
                    id="final-name"
                    name="name"
                    placeholder="Max Mustermann"
                    className="w-full rounded-xl border border-transparent bg-[#E2E7E8] px-4 py-3 text-sm md:text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 outline-none focus:border-[#75AED4] focus:ring-2 focus:ring-[#75AED4]/40 transition"
                  />
                </div>

                <div>
                  <label htmlFor="final-email" className="block text-xs md:text-sm font-medium text-[#0A0A0A] mb-1">
                    Ihre E-Mail-Adresse
                  </label>
                  <input
                    type="email"
                    id="final-email"
                    name="email"
                    placeholder="name@beispiel.de"
                    className="w-full rounded-xl border border-transparent bg-[#E2E7E8] px-4 py-3 text-sm md:text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 outline-none focus:border-[#75AED4] focus:ring-2 focus:ring-[#75AED4]/40 transition"
                  />
                </div>

                <div>
                  <label htmlFor="final-message" className="block text-xs md:text-sm font-medium text-[#0A0A0A] mb-1">
                    Ihr Anliegen
                  </label>
                  <textarea
                    id="final-message"
                    name="message"
                    rows={4}
                    placeholder="Worum geht es bei Ihnen?"
                    className="w-full rounded-xl border border-transparent bg-[#E2E7E8] px-4 py-3 text-sm md:text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 outline-none focus:border-[#75AED4] focus:ring-2 focus:ring-[#75AED4]/40 transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#016FB9] px-6 py-3 text-sm md:text-base font-medium text-white shadow-md hover:bg-[#014f87] hover:shadow-lg transition"
                >
                  Unverbindliches Erstgespräch anfragen
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
