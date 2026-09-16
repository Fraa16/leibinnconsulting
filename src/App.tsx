import { useState } from 'react';
import { ArrowRight, Globe, Users, Heart, FileText, Check, Menu, X } from 'lucide-react';
import logo from './Images/lc-logo-lang-d.webp';
import ProblemSection from './components/ProblemSection';
import OrientationSection from './components/OrientationSection';
import QuickContactCTASection from './components/QuickContactCTASection';
import ValuePropositionSection from './components/ValuePropositionSection';
import ProcessSection from './components/ProcessSection';
import TrustSection from './components/TrustSection';
import FAQSection from './components/FAQSection';
import TestimonialsSection from './components/TestimonialsSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';

const NAV_LINKS = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Prozess', href: '#prozess' },
  { label: 'Vertrauen', href: '#vertrauen' },
  { label: 'FAQ', href: '#faq' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4">
      <nav className="flex items-center justify-between px-5 h-16 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.07] shadow-sm shadow-black/5 max-w-3xl mx-auto">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <img src={logo} alt="LC Logo" className="h-7 w-auto" />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-[#0A0A0A]/65 hover:text-[#0A0A0A] hover:bg-black/5 transition-all duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#kontakt"
          className="hidden md:inline-flex items-center gap-2 bg-[#016FB9] text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-[#014f87] transition-colors duration-200 shadow-sm"
        >
          Beratung anfragen
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.06] shadow-lg shadow-black/5 overflow-hidden max-w-3xl mx-auto">
          <ul className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-[#0A0A0A]/70 hover:text-[#0A0A0A] hover:bg-black/5 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-1 p-1">
              <a
                href="#kontakt"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#016FB9] text-white rounded-xl px-4 py-3 text-sm font-medium hover:bg-[#014f87] transition-colors"
              >
                Beratung anfragen
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#F7F7F7]">
      <Navbar />

      <section className="pb-0 pt-20 md:pt-24 flex items-start justify-center">
        <div className="max-w-[1600px] mx-auto px-[6px] md:px-6 w-full">
          <div className="relative overflow-hidden rounded-t-3xl min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)]">
            <img
              src="https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[#F7F7F7]/75" />

            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#F2F2F2] z-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] px-6 md:px-10 py-8 md:py-10">
              {/* Centered hero content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-[3px] rounded-full bg-[#75AED4] mb-5" />

                <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#0A0A0A] max-w-3xl">
                  Verwandeln Sie Ihre Steuerlast in langfristiges Immobilienvermögen.
                </h1>

                <p className="mt-5 text-base md:text-lg text-[#0A0A0A]/75 max-w-2xl leading-relaxed">
                  Für Unternehmer, leitende Angestellte und Normalverdiener, die mit einer klaren, steueroptimierten Immobilienstrategie Vermögen aufbauen möchten.
                </p>

                {/* Trust badges */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {[
                    'Geprüfte Immobilien in Top-Lagen',
                    'Steueroptimierte Investments',
                    'Planbare Cashflows',
                    'Persönliche Begleitung',
                  ].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#75AED4]/40 rounded-full px-4 py-2 text-sm font-medium text-[#0A0A0A]/80"
                    >
                      <Check className="w-3.5 h-3.5 text-[#016FB9] flex-shrink-0" />
                      {label}
                    </span>
                  ))}
                </div>

                <a
                  href="#kontakt"
                  style={{ backgroundColor: '#016FB9' }}
                  className="mt-8 relative z-30 inline-flex items-center gap-2 text-white rounded-xl px-8 py-3.5 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:brightness-90"
                >
                  Jetzt unverbindliche Beratung anfragen
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F2F2F2] py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0A0A0A] leading-tight mb-6">
                Ihr Immobilienpartner.
              </h2>

              <p className="text-base md:text-lg text-[#0A0A0A]/70 mb-8 max-w-xl leading-relaxed">
                Wir sind Ihr verlässlicher Partner für Immobilieninvestments. Mit einem globalen Netzwerk vertrauenswürdiger Partner verbinden wir Käufer und Verkäufer über Grenzen hinweg.
              </p>

              <a href="#vertrauen" className="inline-flex items-center gap-2 border-2 border-[#0A0A0A] text-[#0A0A0A] rounded-xl px-6 py-3 font-medium hover:bg-[#0A0A0A] hover:text-white transition-all duration-200">
                Über uns
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0A0A0A]/5 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">Globale Reichweite</h3>
                <p className="text-sm md:text-base text-[#0A0A0A]/70 leading-relaxed">
                  Zugang zu Immobilien in verschiedenen Märkten weltweit.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0A0A0A]/5 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">Expertenberatung</h3>
                <p className="text-sm md:text-base text-[#0A0A0A]/70 leading-relaxed">
                  Profitieren Sie von fundiertem Marktwissen und Fachkompetenz.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0A0A0A]/5 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">Persönlicher Service</h3>
                <p className="text-sm md:text-base text-[#0A0A0A]/70 leading-relaxed">
                  Maßgeschneiderte Lösungen für Ihre individuellen Bedürfnisse.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0A0A0A]/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A]">Transparente Prozesse</h3>
                <p className="text-sm md:text-base text-[#0A0A0A]/70 leading-relaxed">
                  Bleiben Sie während des gesamten Prozesses informiert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProblemSection />
      <OrientationSection />
      <QuickContactCTASection />
      <section id="leistungen" className="scroll-mt-24"><ValuePropositionSection /></section>
      <section id="prozess" className="scroll-mt-24"><ProcessSection /></section>
      <section id="vertrauen" className="scroll-mt-24"><TrustSection /></section>
      <section id="faq" className="scroll-mt-24"><FAQSection /></section>
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}

export default App;
