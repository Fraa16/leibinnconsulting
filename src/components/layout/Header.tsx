import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { navLinks, primaryCta, site } from '../../content/site';
import { useScrollSpy } from '../../lib/hooks/useScrollSpy';
import { useLockBodyScroll } from '../../lib/hooks/useLockBodyScroll';
import { useFocusTrap } from '../../lib/hooks/useFocusTrap';
import logoDark from '../../Images/lc-logo-lang-d.webp';

const SECTION_IDS = navLinks.map((link) => link.id);

interface HeaderProps {
  /**
   * Legal and 404 routes get a reduced bar: the section links are in-page hashes
   * that mean nothing off the landing page, so they are replaced by a single
   * route link home.
   */
  minimal?: boolean;
}

export function Header({ minimal = false }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  useLockBodyScroll(mobileOpen);
  const menuRef = useFocusTrap<HTMLDivElement>(mobileOpen, closeMenu);

  /* Condense the bar once the visitor has left the hero. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /*
   * Slide a single pill behind the active link rather than restyling each link.
   * Measured after layout so the first paint is already correct.
   */
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (!activeId) {
      setIndicator(null);
      return;
    }

    const item = list.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
    if (!item) {
      setIndicator(null);
      return;
    }

    setIndicator({ left: item.offsetLeft, width: item.offsetWidth });
  }, [activeId]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav
        aria-label="Hauptnavigation"
        className={cn(
          'mx-auto flex h-16 max-w-3xl items-center justify-between rounded-full border px-5',
          'transition-[background-color,box-shadow,border-color] duration-300 ease-standard',
          scrolled
            ? 'border-ink-900/[0.07] bg-white/90 shadow-header backdrop-blur-md'
            : 'border-white/40 bg-white/70 shadow-card backdrop-blur-sm',
        )}
      >
        <Link
          to="/"
          className="flex-shrink-0 rounded-md"
          aria-label={`${site.name} — zur Startseite`}
        >
          <img src={logoDark} alt={site.name} width={1416} height={232} className="h-7 w-auto" />
        </Link>

        {minimal && (
          <Link
            to="/"
            className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
          >
            Zur Startseite
          </Link>
        )}

        <ul
          ref={listRef}
          className={cn('relative hidden items-center gap-1', !minimal && 'md:flex')}
        >
          {/* The sliding indicator sits behind the links. */}
          <li
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-y-1 rounded-full bg-ink-900/[0.06]',
              'transition-[left,width,opacity] duration-300 ease-entrance',
              indicator ? 'opacity-100' : 'opacity-0',
            )}
            style={{ left: indicator?.left ?? 0, width: indicator?.width ?? 0 }}
          />

          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id} data-nav-id={link.id} className="relative">
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150',
                    isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900',
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <Link
          to={minimal ? `/${primaryCta.href}` : primaryCta.href}
          className="group hidden items-center gap-2 rounded-full bg-primary-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-primary-700 md:inline-flex"
        >
          {primaryCta.label}
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>

        {!minimal && (
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-full p-2 transition-colors hover:bg-ink-900/[0.06] md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </nav>

      {mobileOpen && !minimal && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="mx-auto mt-2 max-w-3xl animate-scale-in overflow-hidden rounded-3xl border border-ink-900/[0.06] bg-white/95 shadow-panel backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col p-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={cn(
                    'block rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    activeId === link.id
                      ? 'bg-ink-900/[0.06] text-ink-900'
                      : 'text-ink-600 hover:bg-ink-900/[0.04] hover:text-ink-900',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-1 p-1">
              <a
                href={primaryCta.href}
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                {primaryCta.label}
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
