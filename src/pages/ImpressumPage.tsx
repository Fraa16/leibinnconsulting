import LegalLayout, { LegalBlock, Placeholder } from '../components/LegalLayout';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function ImpressumPage() {
  useDocumentMeta({
    title: 'Impressum | Leibinn Consulting',
    description: 'Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).',
    path: '/impressum',
    noindex: true,
  });

  return (
    <LegalLayout title="Impressum" intro="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).">
      <LegalBlock heading="Diensteanbieter">
        <p>
          <Placeholder>Vollständiger Firmenname inkl. Rechtsform</Placeholder>
          <br />
          <Placeholder>Straße und Hausnummer</Placeholder>
          <br />
          <Placeholder>PLZ und Ort</Placeholder>
          <br />
          <Placeholder>Land</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Vertreten durch">
        <p>
          <Placeholder>Name der vertretungsberechtigten Person</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Kontakt">
        <p>
          Telefon: <Placeholder>Telefonnummer</Placeholder>
          <br />
          E-Mail: <Placeholder>E-Mail-Adresse</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Registereintrag">
        <p>
          Registergericht: <Placeholder>Amtsgericht</Placeholder>
          <br />
          Registernummer: <Placeholder>HRB-Nummer</Placeholder>
        </p>
        <p className="text-stone-subtle">
          Entfällt, sofern kein Eintrag im Handels-, Vereins-, Partnerschafts- oder
          Genossenschaftsregister besteht.
        </p>
      </LegalBlock>

      <LegalBlock heading="Umsatzsteuer-Identifikationsnummer">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          <Placeholder>USt-IdNr.</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Redaktionell verantwortlich">
        <p>
          <Placeholder>Name</Placeholder>
          <br />
          <Placeholder>Anschrift, falls abweichend</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Berufsrechtliche Angaben">
        <p>
          Sofern eine erlaubnispflichtige Tätigkeit ausgeübt wird (etwa als
          Versicherungsvermittler oder -berater nach § 34 d GewO), sind hier zusätzlich
          Berufsbezeichnung, zuständige Aufsichtsbehörde, Registernummer im
          Vermittlerregister sowie die berufsrechtlichen Regelungen anzugeben.
        </p>
        <p>
          <Placeholder>Berufsbezeichnung und verleihender Staat</Placeholder>
          <br />
          <Placeholder>Zuständige Aufsichts-/Erlaubnisbehörde</Placeholder>
          <br />
          <Placeholder>Registernummer</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
          bereit: <a href="https://ec.europa.eu/consumers/odr/" rel="noopener noreferrer" target="_blank">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          Wir sind <Placeholder>nicht bereit / bereit</Placeholder>, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalBlock>

      <LegalBlock heading="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
      </LegalBlock>

      <LegalBlock heading="Haftung für Links">
        <p>
          Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der
          jeweilige Anbieter oder Betreiber verantwortlich.
        </p>
      </LegalBlock>

      <LegalBlock heading="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
          unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche
          gekennzeichnet.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
