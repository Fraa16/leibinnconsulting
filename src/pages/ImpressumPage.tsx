import { site } from '../content/site';
import { useDocumentMeta } from '../lib/hooks/useDocumentMeta';
import { LegalLayout, LegalSection, Todo } from '../components/legal/LegalLayout';

/**
 * Impressum per § 5 DDG (formerly § 5 TMG) and § 18 MStV.
 *
 * Every value the client has not supplied is a <Todo>. Nothing here is invented:
 * a wrong Impressum carries the same Abmahnung risk as a missing one.
 */
export default function ImpressumPage() {
  useDocumentMeta({
    title: `Impressum — ${site.name}`,
    description: `Impressum und Anbieterkennzeichnung von ${site.name}.`,
    path: '/impressum',
    noindex: true,
  });

  return (
    <LegalLayout title="Impressum">
      <LegalSection title="Angaben gemäß § 5 DDG">
        <p>
          <Todo>Firmierung laut Handelsregister / Gewerbeanmeldung</Todo>
          <br />
          <Todo>Straße und Hausnummer</Todo>
          <br />
          <Todo>PLZ und Ort</Todo>
          <br />
          Deutschland
        </p>
        <p>
          Rechtsform: <Todo>z. B. Einzelunternehmen, GmbH, UG (haftungsbeschränkt)</Todo>
        </p>
      </LegalSection>

      <LegalSection title="Vertreten durch">
        <p>{site.founder}</p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon: <Todo>Telefonnummer</Todo>
          <br />
          E-Mail: <Todo>E-Mail-Adresse</Todo>
        </p>
      </LegalSection>

      <LegalSection title="Registereintrag">
        <p>
          Registergericht: <Todo>Amtsgericht</Todo>
          <br />
          Registernummer: <Todo>HRB / HRA-Nummer</Todo>
        </p>
        <p className="text-ink-500">
          Entfällt, sofern kein Eintrag im Handels-, Vereins-, Partnerschafts- oder
          Genossenschaftsregister besteht.
        </p>
      </LegalSection>

      <LegalSection title="Umsatzsteuer-Identifikationsnummer">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{' '}
          <Todo>USt-IdNr.</Todo>
        </p>
      </LegalSection>

      <LegalSection title="Berufsrechtliche Angaben">
        <p>
          Sofern eine erlaubnispflichtige Tätigkeit ausgeübt wird (etwa nach § 34c, § 34d, § 34f
          oder § 34i GewO), sind hier die gesetzliche Berufsbezeichnung, der Staat der Verleihung,
          die zuständige Aufsichtsbehörde sowie die einschlägigen berufsrechtlichen Regelungen
          anzugeben.
        </p>
        <p>
          Erlaubnis nach: <Todo>z. B. § 34c GewO</Todo>
          <br />
          Zuständige Aufsichtsbehörde: <Todo>Behörde und Anschrift</Todo>
          <br />
          Registernummer im Vermittlerregister: <Todo>Registernummer</Todo>
        </p>
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          {site.founder}
          <br />
          <Todo>Anschrift (wie oben)</Todo>
        </p>
      </LegalSection>

      <LegalSection title="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-800"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </LegalSection>

      <LegalSection title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
          allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
          erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
          entfernen.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Links">
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
          mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren zum Zeitpunkt der
          Verlinkung nicht erkennbar.
        </p>
      </LegalSection>

      <LegalSection title="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </LegalSection>

      <LegalSection title="Bildnachweise">
        <p>
          Stockfotografien: Pexels (Pexels-Lizenz). Porträt- und Personenaufnahmen:{' '}
          <Todo>Fotograf bzw. Rechteinhaber</Todo>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
