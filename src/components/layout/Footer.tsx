import { Link } from 'react-router-dom';
import { footer } from '../../content/footer';
import { legalLinks, navLinks, site } from '../../content/site';
import logoLight from '../../Images/lc-logo-lang.webp';

/**
 * Site footer.
 *
 * Uses the white logo variant (lc-logo-lang.webp), which was committed to the
 * repository but imported by nothing — the dark variant was being used on every
 * surface, including dark ones.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 pt-16">
      <div className="mx-auto w-full max-w-content px-5 md:px-8">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <img
              src={logoLight}
              alt={site.name}
              width={1761}
              height={254}
              className="h-7 w-auto"
              loading="lazy"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{footer.tagline}</p>
          </div>

          <nav aria-label="Seitenbereiche">
            <h2 className="text-2xs font-medium uppercase tracking-eyebrow text-white/65">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliches">
            <h2 className="text-2xs font-medium uppercase tracking-eyebrow text-white/65">
              Rechtliches
            </h2>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10 py-6">
          <p className="text-xs text-white/65">
            {footer.copyright.replace('{year}', String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}
