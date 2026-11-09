import type { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

type LegalLayoutProps = {
  title: string;
  intro?: string;
  /** Shows the "unfilled scaffolding" warning. The Impressum is final and passes false. */
  draft?: boolean;
  children: ReactNode;
};

/**
 * Shared shell for /impressum and /datenschutz: the site header and footer
 * around an ivory panel, the way the homepage sets its light sections.
 *
 * The content is scaffolding with explicit placeholders, not legal advice.
 */
export default function LegalLayout({ title, intro, draft = true, children }: LegalLayoutProps) {
  return (
    <>
      <Navigation />
      <main id="inhalt" className="pb-[clamp(56px,7vw,96px)] pt-[clamp(32px,4vw,56px)]">
        <section className="panel-light">
          <div className="shell max-w-[880px]">
            <p className="eyebrow text-copper-dark">Rechtliches</p>
            <h1 className="t-h2 mt-6">{title}</h1>
            {intro && <p className="t-lead mt-6 text-stone">{intro}</p>}

            {draft && (
              <div role="note" className="mt-8 flex items-start gap-3 rounded-[14px] border border-line bg-white px-5 py-4">
                <span aria-hidden="true" className="mt-0.5 font-mono text-[12px] font-medium text-copper-dark">
                  !
                </span>
                <p className="text-[14px] leading-[1.6] text-stone">
                  Diese Seite ist ein unausgefülltes Gerüst. Alle mit [PLATZHALTER] markierten Angaben müssen ergänzt und
                  die Texte vor der Veröffentlichung anwaltlich geprüft werden.
                </p>
              </div>
            )}

            <div className="mt-12 divide-y divide-line border-t border-line">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function LegalBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="py-8">
      <h2 className="text-[22px] font-medium leading-[1.2] tracking-[-.015em]">{heading}</h2>
      <div
        className="mt-4 space-y-3 text-[15px] leading-[1.7] text-stone [&_a:hover]:text-copper-dark [&_a]:text-ink [&_a]:underline
                   [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
      >
        {children}
      </div>
    </section>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-white px-1.5 py-0.5 font-medium text-copper-dark">[{children}]</span>
  );
}
