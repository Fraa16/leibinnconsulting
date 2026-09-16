import { site } from '../content/site';
import { useDocumentMeta } from '../lib/hooks/useDocumentMeta';
import { LegalLayout, LegalSection, Todo } from '../components/legal/LegalLayout';
import { USE_LOCAL_PHOTOS } from '../lib/images';

/**
 * Datenschutzerklärung following the Art. 13 DSGVO information duties.
 *
 * The technical facts below are accurate for this build as it stands:
 *   • webfonts are self-hosted, so there is no Google Fonts transfer to declare
 *   • the contact forms post to /api/lead, which relays by email via Resend
 *   • four stock photographs are still loaded from Pexels while
 *     USE_LOCAL_PHOTOS is false — declared honestly below, and the section
 *     disappears on its own once they are self-hosted
 * Everything the client must supply is a <Todo>.
 */
export default function DatenschutzPage() {
  useDocumentMeta({
    title: `Datenschutzerklärung — ${site.name}`,
    description: `Informationen zur Verarbeitung personenbezogener Daten auf der Website von ${site.name}.`,
    path: '/datenschutz',
    noindex: true,
  });

  return (
    <LegalLayout title="Datenschutzerklärung">
      <LegalSection title="1. Verantwortlicher">
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          <br />
          <br />
          <Todo>Firmierung</Todo>
          <br />
          <Todo>Straße und Hausnummer</Todo>
          <br />
          <Todo>PLZ und Ort</Todo>
          <br />
          Vertreten durch: {site.founder}
          <br />
          E-Mail: <Todo>E-Mail-Adresse</Todo>
          <br />
          Telefon: <Todo>Telefonnummer</Todo>
        </p>
        <p>
          Datenschutzbeauftragter: <Todo>falls bestellt, Name und Kontakt — sonst entfällt</Todo>
        </p>
      </LegalSection>

      <LegalSection title="2. Allgemeines zur Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur
          Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen
          erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach Einwilligung der Nutzer
          oder wenn eine Rechtsvorschrift die Verarbeitung gestattet.
        </p>
      </LegalSection>

      <LegalSection title="3. Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA,
          gehostet. Beim Aufruf der Website verarbeitet der Hosting-Anbieter technisch notwendige
          Zugriffsdaten (IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite,
          übertragene Datenmenge, Browsertyp und Betriebssystem, Referrer-URL).
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im
          sicheren, stabilen und effizienten Betrieb dieser Website. Mit dem Anbieter besteht ein
          Auftragsverarbeitungsvertrag nach Art. 28 DSGVO; die Übermittlung in die USA wird auf die
          EU-Standardvertragsklauseln gestützt.{' '}
          <Todo>Auftragsverarbeitungsvertrag mit Vercel abschließen und hier bestätigen</Todo>
        </p>
      </LegalSection>

      <LegalSection title="4. Kontaktformulare">
        <p>
          Auf dieser Website stehen zwei Kontaktformulare zur Verfügung. Übermittelt werden die von
          Ihnen eingegebenen Angaben: Vor- und Nachname beziehungsweise Name, E-Mail-Adresse und –
          sofern angegeben – Ihr Anliegen. Zusätzlich verarbeiten wir den Zeitpunkt der Absendung
          sowie Ihre IP-Adresse, um missbräuchliche Massenanfragen zu unterbinden.
        </p>
        <p>
          Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO,
          die Sie durch Anhaken der Checkbox aktiv erteilen, sowie – bei Anfragen mit Bezug zu einem
          möglichen Vertragsverhältnis – nach Art. 6 Abs. 1 lit. b DSGVO. Ihre Einwilligung können
          Sie jederzeit mit Wirkung für die Zukunft widerrufen; die Rechtmäßigkeit der bis zum
          Widerruf erfolgten Verarbeitung bleibt unberührt.
        </p>
        <p>
          Zur Zustellung der Formularnachrichten setzen wir den E-Mail-Dienst Resend
          (Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA) als
          Auftragsverarbeiter ein. Die Übermittlung in die USA wird auf die
          EU-Standardvertragsklauseln gestützt.{' '}
          <Todo>Auftragsverarbeitungsvertrag mit Resend abschließen und hier bestätigen</Todo>
        </p>
        <p>
          Wir löschen Ihre Anfrage, sobald sie abschließend bearbeitet ist und keine gesetzlichen
          Aufbewahrungsfristen entgegenstehen.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies und Reichweitenmessung">
        <p>
          Diese Website setzt keine Cookies zu Analyse-, Tracking- oder Marketingzwecken ein. Es
          werden keine Dienste zur Reichweitenmessung oder Profilbildung verwendet. Aus diesem
          Grund ist kein Einwilligungsbanner erforderlich.
        </p>
        <p className="text-ink-500">
          Hinweis: Sollten später Webanalyse, Remarketing oder eingebettete Dienste (etwa Google
          Analytics, Meta-Pixel, YouTube oder ein Buchungskalender) ergänzt werden, sind diese
          Abschnitte zu erweitern und ein Consent-Banner nach § 25 TDDDG einzurichten.
        </p>
      </LegalSection>

      <LegalSection title="6. Schriftarten">
        <p>
          Die verwendeten Schriftarten werden lokal von unserem Server ausgeliefert. Es besteht
          keine Verbindung zu Servern Dritter, insbesondere nicht zu Google Fonts. Ihre IP-Adresse
          wird dabei nicht an Dritte übermittelt.
        </p>
      </LegalSection>

      {!USE_LOCAL_PHOTOS && (
        <LegalSection title="7. Einbindung externer Bilddateien">
          <p>
            Einzelne Stockfotografien auf dieser Website werden derzeit vom Content Delivery Network
            der Pexels GmbH (Rungestraße 22, 10179 Berlin) geladen. Beim Aufruf der Seite wird
            hierbei Ihre IP-Adresse an den Anbieter übermittelt, da eine Auslieferung der Bilder
            ohne diese Übermittlung technisch nicht möglich ist.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in
            der performanten Auslieferung der Bildinhalte.
          </p>
          <p className="text-ink-500">
            Hinweis für den Betreiber: Diese Einbindung lässt sich vollständig vermeiden. Sobald die
            Bilder lokal gehostet werden (siehe README, „Bilder selbst hosten“), entfällt die
            Übermittlung — und dieser Abschnitt blendet sich automatisch aus.
          </p>
        </LegalSection>
      )}

      <LegalSection title={USE_LOCAL_PHOTOS ? '7. Ihre Rechte' : '8. Ihre Rechte'}>
        <p>Ihnen stehen gegenüber uns die folgenden Rechte hinsichtlich Ihrer Daten zu:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung dieser Rechte genügt eine formlose Nachricht an die oben genannte
          E-Mail-Adresse.
        </p>
      </LegalSection>

      <LegalSection title={USE_LOCAL_PHOTOS ? '8. Beschwerderecht' : '9. Beschwerderecht'}>
        <p>
          Unbeschadet anderweitiger Rechtsbehelfe steht Ihnen nach Art. 77 DSGVO ein
          Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres
          Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Zuständig
          ist für uns: <Todo>zuständige Landesdatenschutzbehörde</Todo>
        </p>
      </LegalSection>

      <LegalSection title={USE_LOCAL_PHOTOS ? '9. Aktualität' : '10. Aktualität'}>
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand{' '}
          <Todo>Monat / Jahr</Todo>. Durch die Weiterentwicklung unserer Website oder aufgrund
          geänderter gesetzlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu
          ändern.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
