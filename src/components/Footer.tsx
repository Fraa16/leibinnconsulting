import { Link } from 'react-router-dom';
import BrandLine from './ui/BrandLine';
import Logo from './ui/Logo';
import SectionLink from './ui/SectionLink';

const PAGE_LINKS = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'rechner', label: 'Rechner' },
  { id: 'prozess', label: 'Ablauf' },
  { id: 'faq', label: 'FAQ' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-navy-975">
      <BrandLine line="a" color="copper" className="absolute bottom-[-30%] right-[-4%] w-[min(720px,60vw)] opacity-8" />

      <div className="shell relative pb-7 pt-[clamp(56px,7vw,88px)]">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex flex-[1_1_320px] flex-col gap-[18px]">
            <Logo className="my-[5px] h-[18px] self-start text-white" />
            <p className="max-w-[36ch] text-[15px] leading-[1.6] text-mist">
              Steueroptimierte Immobilienstrategien für Unternehmer, Führungskräfte und Angestellte.
            </p>
            <SectionLink to="termin" className="btn btn-copper h-12 self-start px-[22px] text-[14px]">
              Erstgespräch buchen
            </SectionLink>
          </div>

          <div className="flex flex-wrap gap-x-[72px] gap-y-10 text-[15px]">
            <nav aria-label="Seite" className="flex flex-col gap-3">
              <span className="label text-mist-subtle">Seite</span>
              {PAGE_LINKS.map((l) => (
                <SectionLink key={l.id} to={l.id} className="text-mist-strong">
                  {l.label}
                </SectionLink>
              ))}
            </nav>
            <nav aria-label="Rechtliches" className="flex flex-col gap-3">
              <span className="label text-mist-subtle">Rechtliches</span>
              <Link to="/impressum" className="text-mist-strong">
                Impressum
              </Link>
              <Link to="/datenschutz" className="text-mist-strong">
                Datenschutz
              </Link>
              <button type="button" data-cookie-settings className="text-left text-mist-strong">
                Cookie-Einstellungen
              </button>
            </nav>
          </div>
        </div>

        <div
          className="mt-14 flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-white/8 pt-6 text-[12px] leading-[1.6]
                     text-mist-subtle"
        >
          <span>© {new Date().getFullYear()} Leibinn Consulting</span>
          <span>
            Erlaubnis nach § 34c Abs. 1 GewO (Immobilienmakler) · Erlaubnis nach § 34d Abs. 1 GewO (Versicherungsmakler)
          </span>
          <span>Modellrechnungen ersetzen keine Steuerberatung.</span>
        </div>
      </div>
    </footer>
  );
}
