import { BarChart3, Building2, Handshake } from 'lucide-react';
import { FadeInUp } from './FadeInUp';

export default function PartnerSection() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <FadeInUp delay={0.15}>
          <div className="bg-[#75AED4] rounded-3xl border border-[#75AED4]/20 shadow-[0_24px_80px_rgba(0,0,0,0.10)] p-8 md:p-10">
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
    </section>
  );
}
