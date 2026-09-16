import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';

/**
 * A field the client must supply before go-live.
 *
 * Rendered loudly on purpose: a legal page with a quietly wrong address is worse
 * than one that is visibly incomplete, and an Impressum must not contain invented
 * data. Search for "Todo" in src/pages to find every remaining one.
 */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="mx-0.5 inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-2 py-0.5 text-sm font-medium text-amber-900 ring-1 ring-amber-300">
      <AlertTriangle aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0" />
      <span className="sr-only">Noch auszufüllen: </span>
      {children}
    </mark>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-display text-xl font-semibold text-ink-900 md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-600 md:text-base">
        {children}
      </div>
    </section>
  );
}

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
  /** Shown once at the top when the page still contains TODO fields. */
  incomplete?: boolean;
}

export function LegalLayout({ title, children, incomplete = true }: LegalLayoutProps) {
  return (
    <div className="bg-paper-200 pb-24 pt-32 md:pt-40">
      <Container width="prose">
        <Link
          to="/"
          className="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="mt-6 font-display text-display-md font-semibold text-ink-900">{title}</h1>

        {incomplete && (
          <div
            role="note"
            className="mt-8 flex items-start gap-3 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200"
          >
            <AlertTriangle
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600"
            />
            <div className="text-sm leading-relaxed text-amber-900">
              <p className="font-semibold">Diese Seite ist noch nicht vollständig.</p>
              <p className="mt-1">
                Die gelb markierten Felder müssen vor der Veröffentlichung durch die tatsächlichen
                Angaben ersetzt werden. Bitte lassen Sie den finalen Text vor dem Livegang rechtlich
                prüfen — dieser Entwurf ersetzt keine Rechtsberatung.
              </p>
            </div>
          </div>
        )}

        <div className="mt-12">{children}</div>
      </Container>
    </div>
  );
}
