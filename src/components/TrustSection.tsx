import { FadeInUp } from './FadeInUp';
import { BarChart3, Building2, Handshake } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="bg-[#F7F7F7] py-12 md:py-16">
      <div className="max-w-[1600px] mx-auto px-[6px] md:px-6">
        <div className="bg-[#E2E7E8] rounded-3xl border border-white/70 shadow-[0_24px_80px_rgba(0,0,0,0.16)] px-6 md:px-10 pt-8 md:pt-10 pb-40 md:pb-48">
          <FadeInUp delay={0.1}>
            <p className="text-xs uppercase tracking-[0.18em] text-[#0A0A0A]/60 mb-2 text-center">
              Vertrauen & Expertise
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] mb-8 text-center">
              Ihre Sicherheit ist unser Anspruch.
            </h2>
          </FadeInUp>

          <div className="grid gap-6 md:grid-cols-12 auto-rows-auto">
          {/* Large Card - Authority intro */}
          <FadeInUp delay={0.2} className="md:col-span-8 md:row-span-2">
            <div className="bg-white rounded-3xl border border-white/60 shadow-[0_24px_80px_rgba(0,0,0,0.14)] p-5 md:p-6 flex flex-col gap-3 h-full">
              <div className="w-12 h-1 rounded-full bg-[#75AED4]" />
              <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">
                Warum Sie uns vertrauen können
              </h3>
              <div className="flex flex-col gap-3">
                <p className="text-sm md:text-base text-[#0A0A0A]/80">
                  Unsere Arbeit basiert auf klaren Prozessen, geprüften Immobilien und einer Beratung, die Ihre Ziele und Ihre steuerliche Situation in den Mittelpunkt stellt.
Sie erhalten nachvollziehbare Analysen statt vager Empfehlungen und haben jederzeit volle Transparenz über Chancen, Risiken und wirtschaftliche Kennzahlen.
                </p>
                <p className="text-sm md:text-base text-[#0A0A0A]/80">
                  Wir empfehlen nur Strategien, die wir fachlich vertreten können und die zu Ihrer persönlichen Situation passen. Verlässliche Entscheidungen entstehen durch Transparenz und Erfahrung.
                </p>
              </div>
            </div>
          </FadeInUp>

          {/* Small Card #1 - USP */}
          <FadeInUp delay={0.3} className="md:col-span-4 md:row-span-1">
            <div className="bg-white rounded-3xl border border-white/60 shadow-[0_24px_80px_rgba(0,0,0,0.14)] p-5 md:p-6 flex flex-col gap-3 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#75AED4]/10 border border-[#75AED4]/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#75AED4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">
                Geprüfte Immobilien
              </h3>
              <p className="text-sm md:text-base text-[#0A0A0A]/80">
                Jede Immobilie wird anhand klar definierter Kriterien bewertet. Lage, Bausubstanz, Mietpotenzial und Wirtschaftlichkeit werden systematisch geprüft, bevor wir sie in Ihre Auswahl aufnehmen.
              </p>
            </div>
          </FadeInUp>

          {/* Medium Wide Card - Off-Market */}
          <FadeInUp delay={0.4} className="md:col-span-12 md:row-span-1">
            <div className="bg-white rounded-3xl border border-white/60 shadow-[0_24px_80px_rgba(0,0,0,0.14)] p-5 md:p-6 flex flex-col gap-3 h-full">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#75AED4]/10 border border-[#75AED4]/30 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#75AED4]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A] mb-2">
                    Zugang zu Off Market Objekten
                  </h3>
                  <p className="text-sm md:text-base text-[#0A0A0A]/80">
                    Sie profitieren von Immobilien, die nicht öffentlich angeboten werden und durch unser Netzwerk verfügbar sind. So erhalten Sie Zugang zu Chancen, die für viele Anleger unsichtbar bleiben, und schaffen sich einen echten Wettbewerbsvorteil.
                  </p>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Medium Tall Card - Network */}
          <FadeInUp delay={0.5} className="md:col-span-7 md:row-span-2">
            <div className="bg-white rounded-3xl border border-white/60 shadow-[0_24px_80px_rgba(0,0,0,0.14)] p-5 md:p-6 flex flex-col gap-3 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#75AED4]/10 border border-[#75AED4]/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#75AED4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">
                Starkes Expertennetzwerk
              </h3>
              <p className="text-sm md:text-base text-[#0A0A0A]/80">
                Wir arbeiten mit Banken, Steuerberatern, Finanzierern und regionalen Experten zusammen. Dieses Netzwerk ermöglicht fundierte Standort- und Objektprüfungen und sorgt dafür, dass Sie bei Finanzierung, Bewertung und strategischer Planung professionell begleitet werden.
              </p>
            </div>
          </FadeInUp>

          {/* Small Card #2 - Transparency */}
          <FadeInUp delay={0.6} className="md:col-span-5 md:row-span-1">
            <div className="bg-white rounded-3xl border border-white/60 shadow-[0_24px_80px_rgba(0,0,0,0.14)] p-5 md:p-6 flex flex-col gap-3 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#75AED4]/10 border border-[#75AED4]/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#75AED4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">
                Transparente Kennzahlen
              </h3>
              <p className="text-sm md:text-base text-[#0A0A0A]/80">
                Sie treffen Ihre Entscheidungen auf Basis nachvollziehbarer Zahlen und Szenarien. Cashflow, Rendite, Risiken und Reserven werden offen gelegt, damit Sie genau wissen, welche Rolle jede Immobilie in Ihrer Strategie übernimmt.
              </p>
            </div>
          </FadeInUp>
        </div>
        </div>

        {/* Partner Card - Overlapping at bottom */}
        <div className="relative -mt-32 md:-mt-40 max-w-3xl mx-auto px-4 md:px-6">
          <FadeInUp delay={0.7}>
            <div className="bg-[#75AED4] rounded-3xl border border-[#75AED4]/20 shadow-[0_24px_80px_rgba(0,0,0,0.20)] p-8 md:p-10 relative z-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 text-center">
                Ihr verlässlicher Partner für eine klare Immobilienstrategie.
              </h2>

              <p className="text-base md:text-lg text-white/90 mb-6 text-center leading-relaxed">
                Wir begleiten Sie persönlich durch Analyse, Auswahl und Ankauf. Mit Erfahrung, geprüften Methoden und einem Netzwerk aus Experten schaffen wir Transparenz und Sicherheit bei jeder Entscheidung.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <BarChart3 size={18} className="stroke-white" />
                  <span className="text-sm font-medium text-white">Strukturierte Analyse</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <Building2 size={18} className="stroke-white" />
                  <span className="text-sm font-medium text-white">Geprüfte Immobilien</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <Handshake size={18} className="stroke-white" />
                  <span className="text-sm font-medium text-white">Persönliche Begleitung</span>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
