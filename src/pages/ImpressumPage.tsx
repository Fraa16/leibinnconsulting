import LegalLayout, { LegalBlock } from '../components/LegalLayout';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

/*
 * Copied 1:1 from the main website (leibinn-consulting.de/impressum).
 * All Leibinn sites share this Impressum: change it there first, then here.
 */
const INTRO = 'Anbieterangaben, Zulassungen und Registereintrag von Leibinn Consulting auf einen Blick.';

export default function ImpressumPage() {
  useDocumentMeta({
    title: 'Impressum | Leibinn Consulting',
    description: INTRO,
    path: '/impressum',
    noindex: true,
  });

  return (
    <LegalLayout title="Impressum" intro={INTRO} draft={false}>
      <LegalBlock heading="Angaben gemäß § 5 DDG">
        <p>
          Leibinn Consulting / Cedrik Robin Leibinn
          <br />
          Konrad-Zuse-Straße 98
          <br />
          71034 Böblingen
        </p>
        <p>
          Telefon: <a href="tel:+4917634529336">+49 176 34529336</a>
          <br />
          E-Mail: <a href="mailto:beratung@leibinn-consulting.de">beratung@leibinn-consulting.de</a>
        </p>
        <p>Geschäftsführung: Cedrik Robin Leibinn</p>
      </LegalBlock>

      <LegalBlock heading="Inhaltlich verantwortlich i.S.d. § 18 Abs. 2 MStV">
        <p>Cedrik Robin Leibinn (Anschrift wie oben)</p>
      </LegalBlock>

      <LegalBlock heading="Rechtliche Informationen">
        <p>
          Erlaubnis: nach § 34d Abs. 1 Gewerbeordnung (Versicherungsmakler)
          <br />
          Erlaubnis: nach § 34c Abs. 1 Gewerbeordnung (Immobilienmakler)
          <br />
          Aufsichtsbehörde: Industrie- und Handelskammer Region Stuttgart, Jägerstraße 30, 70174 Stuttgart
        </p>
        <p>
          Vermittlerregister:{' '}
          <a href="https://www.vermittlerregister.info" target="_blank" rel="noopener noreferrer">
            www.vermittlerregister.info
          </a>
          <br />
          Registrierungs-Nr.: D-LLF9-5XQCE-01
        </p>
      </LegalBlock>

      <LegalBlock heading="Streitbeilegung">
        <p>
          Beschwerdeverfahren via Online-Streitbeilegung für Verbraucher (OS):{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
            ec.europa.eu/consumers/odr
          </a>
          . Wir sind zur Teilnahme am Streitschlichtungsverfahren verpflichtet. Eine Liste mit den Kontaktdaten der
          anerkannten Streitschlichtungsstellen finden Sie unter der angegebenen Website.
        </p>
      </LegalBlock>

      <LegalBlock heading="Berufsbezeichnung und Berufskammer">
        <p>
          Berufsbezeichnungen: Versicherungsmakler (Erlaubnis nach § 34d Abs. 1 Gewerbeordnung) und Immobilienmakler
          (Erlaubnis nach § 34c Abs. 1 Gewerbeordnung), Bundesrepublik Deutschland
          <br />
          Zuständige Berufskammer: Industrie- und Handelskammer Region Stuttgart, Jägerstraße 30, 70174 Stuttgart
        </p>
      </LegalBlock>

      <LegalBlock heading="Berufsrechtliche Regelungen">
        <p>Die berufsrechtlichen Regelungen umfassen:</p>
        <ul>
          <li>§ 34d Gewerbeordnung (GewO)</li>
          <li>Verordnung über die Versicherungsvermittlung und -beratung (VersVermV)</li>
          <li>§ 34c Gewerbeordnung (GewO)</li>
          <li>Makler- und Bauträgerverordnung (MaBV)</li>
        </ul>
        <p>
          Diese Regelungen können auf der Website{' '}
          <a href="https://www.gesetze-im-internet.de" target="_blank" rel="noopener noreferrer">
            www.gesetze-im-internet.de
          </a>{' '}
          eingesehen werden.
        </p>
      </LegalBlock>

      <LegalBlock heading="Nachhaltigkeitsrisiken">
        <p>
          Definition: Nachhaltigkeitsrisiken (ESG-Risiken) sind Ereignisse oder Bedingungen aus den Bereichen Umwelt,
          Soziales und Unternehmensführung, die negative Auswirkungen auf den Wert von Investitionen haben können.
        </p>
        <p>Beispiele:</p>
        <ul>
          <li>Umwelt: Extremwetterereignisse durch den Klimawandel</li>
          <li>Soziales: Nichteinhaltung arbeitsrechtlicher Standards</li>
          <li>Unternehmensführung: Korruption oder mangelnde Steuerehrlichkeit</li>
        </ul>
        <p>
          Vergütung und Nachhaltigkeitsfaktoren: Die Vergütung für die Vermittlung von Finanzprodukten wird grundsätzlich
          nicht durch Nachhaltigkeitsrisiken beeinflusst. Anbieter, die Nachhaltigkeitsrisiken berücksichtigen, könnten
          eine höhere Vergütung bieten, sofern dies den Kundeninteressen nicht widerspricht.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
