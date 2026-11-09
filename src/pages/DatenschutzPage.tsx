import LegalLayout, { LegalBlock, Placeholder } from '../components/LegalLayout';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function DatenschutzPage() {
  useDocumentMeta({
    title: 'Datenschutzerklärung | Leibinn Consulting',
    description: 'Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 und 14 DSGVO.',
    path: '/datenschutz',
    noindex: true,
  });

  return (
    <LegalLayout
      title={'Datenschutz\u00ADerklärung' /* soft hyphen: breaks as Datenschutz-erklärung on small phones */}
      intro="Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 und 14 DSGVO."
    >
      <LegalBlock heading="Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          <Placeholder>Firmenname</Placeholder>
          <br />
          <Placeholder>Anschrift</Placeholder>
          <br />
          E-Mail: <Placeholder>E-Mail-Adresse</Placeholder>
        </p>
        <p>
          Datenschutzbeauftragte:r: <Placeholder>Name und Kontakt, sofern benannt</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Hosting">
        <p>
          Diese Website wird bei <Placeholder>Hosting-Anbieter, Anschrift</Placeholder> gehostet.
          Der Anbieter verarbeitet in unserem Auftrag Daten, die beim Aufruf der Website anfallen.
          Grundlage ist ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO.
        </p>
      </LegalBlock>

      <LegalBlock heading="Server-Logfiles">
        <p>
          Beim Aufruf dieser Website werden automatisch Informationen verarbeitet, die Ihr Browser
          übermittelt, insbesondere IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite,
          Referrer-URL sowie Browser- und Betriebssystemangaben. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO; unser berechtigtes Interesse liegt im sicheren und stabilen Betrieb der
          Website. Speicherdauer: <Placeholder>Aufbewahrungsfrist</Placeholder>.
        </p>
      </LegalBlock>

      <LegalBlock heading="Schriftarten">
        <p>
          Die verwendeten Schriftarten werden lokal von unserem Server ausgeliefert. Beim Seitenaufruf
          wird dafür keine Verbindung zu Servern Dritter hergestellt.
        </p>
      </LegalBlock>

      <LegalBlock heading="Terminbuchung über Calendly">
        <p>
          Für die Buchung des Erstgesprächs kann ein Kalender des Anbieters Calendly LLC eingebunden
          werden. Er wird erst geladen, wenn Sie auf „Kalender laden“ klicken; vorher besteht keine
          Verbindung zu Calendly. Mit dem Laden werden unter anderem Ihre IP-Adresse sowie die von
          Ihnen eingegebenen Angaben (Name, E-Mail-Adresse, gewählter Termin) an Calendly übertragen.
        </p>
        <p>
          Rechtsgrundlage ist <Placeholder>Art. 6 Abs. 1 lit. a bzw. lit. b DSGVO</Placeholder>.
          Sitz des Anbieters, Datenübermittlung in Drittländer und Speicherdauer:{' '}
          <Placeholder>Angaben zu Calendly, Auftragsverarbeitungsvertrag und Drittlandtransfer</Placeholder>.
        </p>
      </LegalBlock>

      <LegalBlock heading="Cookies und Reichweitenmessung">
        <p>
          <Placeholder>
            Anzugeben, sofern Cookies, Analyse- oder Marketing-Dienste eingesetzt werden, inklusive
            Einwilligungsmanagement nach § 25 TDDDG
          </Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung
          (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit
          (Art. 20 DSGVO) sowie ein Widerspruchsrecht gegen Verarbeitungen auf Grundlage von Art. 6
          Abs. 1 lit. f DSGVO (Art. 21 DSGVO).
        </p>
        <p>
          Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zur
          Ausübung Ihrer Rechte genügt eine Nachricht an die oben genannte Adresse.
        </p>
      </LegalBlock>

      <LegalBlock heading="Beschwerderecht bei der Aufsichtsbehörde">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
          Ihrer personenbezogenen Daten zu beschweren. Zuständig ist in der Regel die Behörde Ihres
          Wohnsitzes oder unseres Unternehmenssitzes:
          <br />
          <Placeholder>Zuständige Aufsichtsbehörde</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Stand dieser Erklärung">
        <p>
          <Placeholder>Datum der letzten Aktualisierung</Placeholder>
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
