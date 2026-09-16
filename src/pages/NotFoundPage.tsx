import { Link } from 'react-router-dom';
import { site } from '../content/site';
import { useDocumentMeta } from '../lib/hooks/useDocumentMeta';
import { Container } from '../components/ui/Container';
import { ButtonLink } from '../components/ui/Button';

export default function NotFoundPage() {
  useDocumentMeta({
    title: `Seite nicht gefunden — ${site.name}`,
    description: 'Die aufgerufene Seite existiert nicht.',
    path: '/404',
    noindex: true,
  });

  return (
    <div className="flex min-h-[70vh] items-center bg-paper-200 pb-24 pt-32">
      <Container width="narrow">
        <div className="text-center">
          <span aria-hidden="true" className="rule-accent mx-auto mb-8" />

          <p className="font-display text-7xl font-semibold text-accent-600">404</p>

          <h1 className="mt-4 font-display text-display-sm font-semibold text-ink-900">
            Diese Seite gibt es nicht.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-600">
            Möglicherweise wurde die Adresse falsch eingegeben oder der Inhalt ist nicht mehr
            verfügbar.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/" size="lg" withArrow>
              Zur Startseite
            </ButtonLink>
            <Link
              to="/#kontakt"
              className="text-sm font-medium text-primary-700 underline underline-offset-4 transition-colors hover:text-primary-800"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
