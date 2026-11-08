import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './ui/Logo';
import SectionLink from './ui/SectionLink';
import { CalendarIcon } from './ui/icons';

const NAV_LINKS = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'rechner', label: 'Rechner' },
  { id: 'prozess', label: 'Ablauf' },
  { id: 'vertrauen', label: 'Über uns' },
  { id: 'faq', label: 'FAQ' },
];

/**
 * Sticky floating pill bar. From 1000px it carries the nav and the CTA; below
 * that both fold into a "Menü" button with a dropdown panel.
 */
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const close = () => setOpen(false);

  // The dropdown only exists below 1000px; leaving that range closes it, as
  // does Escape.
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1000px)');
    const onChange = () => wide.matches && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    wide.addEventListener('change', onChange);
    window.addEventListener('keydown', onKey);
    return () => {
      wide.removeEventListener('change', onChange);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const logo = <Logo className="h-4 text-white" />;

  return (
    <header className="sticky top-0 z-[60] px-[clamp(8px,1.2vw,16px)] pt-3">
      <div
        className="mx-auto flex h-[72px] max-w-nav items-center justify-between gap-6 rounded-full border
                   border-white/8 bg-navy-900/80 pl-[clamp(18px,2vw,28px)] pr-3 backdrop-blur-[16px]"
      >
        {pathname === '/' ? (
          <a href="#top" className="flex-none py-2 hover:text-white">
            {logo}
          </a>
        ) : (
          <Link to="/" className="flex-none py-2 hover:text-white">
            {logo}
          </Link>
        )}

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-[clamp(18px,2.2vw,34px)] text-[14px] font-medium text-white/72">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <SectionLink to={l.id}>{l.label}</SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <SectionLink to="termin" className="btn btn-copper hidden h-12 px-[22px] text-[14px] lg:inline-flex">
          <CalendarIcon size={17} />
          Erstgespräch buchen
        </SectionLink>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="h-12 rounded-full border border-white/18 bg-transparent px-5 text-[14px] font-semibold text-white lg:hidden"
        >
          {open ? 'Schließen' : 'Menü'}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Hauptnavigation"
        hidden={!open}
        className="mx-auto mt-2 flex max-w-nav flex-col rounded-[24px] border border-white/8 bg-navy-900 px-6 pb-6 pt-3
                   text-[18px] font-medium lg:hidden"
      >
        {NAV_LINKS.map((l) => (
          <SectionLink key={l.id} to={l.id} onClick={close} className="border-b border-white/8 py-3.5">
            {l.label}
          </SectionLink>
        ))}
        <SectionLink to="termin" onClick={close} className="btn btn-copper mt-4 h-[54px] w-full text-[18px]">
          Erstgespräch buchen
        </SectionLink>
      </nav>
    </header>
  );
}
