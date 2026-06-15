export default function Footer() {
  return (
    <section className="bg-[#75AED4] pt-10 pb-0 rounded-t-3xl">
      <div className="max-w-[1600px] mx-auto px-[6px] md:px-6 pb-6">
        <div className="rounded-3xl bg-white border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.14)] px-6 md:px-10 py-6 md:py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-sm font-semibold text-[#0A0A0A]">
                Leibinn Consulting
              </p>
              <p className="text-xs md:text-sm text-[#0A0A0A]/80 mt-1 leading-relaxed">
                Strukturierte Immobilien- und Steuerstrategien für Unternehmer, Führungskräfte und Privatanleger.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs md:text-sm text-[#0A0A0A]/80">
              <a href="/datenschutz" className="hover:text-[#0A0A0A] transition">
                Datenschutz
              </a>
              <a href="/impressum" className="hover:text-[#0A0A0A] transition">
                Impressum
              </a>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E2E7E8] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-[11px] md:text-xs text-[#0A0A0A]/60">
              © {new Date().getFullYear()} Leibinn Consulting. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
