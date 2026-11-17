/**
 * Datenschutzerklärung, shared by all Leibinn sites.
 * The same file lives in every repo (like consent.ts): change it in one, copy it to the others.
 *
 * Each site renders it with its own legal layout and says which features it has
 * (form, Calendly). Google Analytics 4 and Google Ads appear only when their IDs
 * are configured, exactly like in the cookie banner.
 *
 * Inline markup in the texts: [Text](https://…) for links, a line break as \n,
 * and {{settings}} for the button that reopens the cookie settings.
 *
 * Every change must be reviewed legally before it goes live.
 */

export type PrivacyBlock = { p: string } | { ul: string[] } | { h3: string };

export interface PrivacySection {
  /** Anchor, e.g. /datenschutz#calendly */
  id: string;
  /** Numbered heading, e.g. "8. Terminbuchung mit Calendly" */
  title: string;
  blocks: PrivacyBlock[];
}

export interface PrivacyOptions {
  /** The site's form: none, the callback field (phone number only) or a full contact form. */
  form: 'none' | 'callback' | 'contact';
  /** The site embeds the Calendly booking calendar. */
  calendly: boolean;
  /** Google Analytics 4 is configured (same ID as in the cookie banner). */
  ga4?: boolean;
  /** Google Ads conversion tracking is configured. */
  googleAds?: boolean;
}

export const PRIVACY_UPDATED = 'November 2026';

const EMAIL = 'beratung@leibinn-consulting.de';
const MAIL = `[${EMAIL}](mailto:${EMAIL})`;
const GOOGLE = 'Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland';

type Draft = { id: string; title: string; blocks: PrivacyBlock[]; when?: boolean };

/** "A", "A und B", "A, B und C" */
const joinDe = (items: Array<string | false>) => {
  const list = items.filter((x): x is string => Boolean(x));
  return list.length < 2 ? (list[0] ?? '') : `${list.slice(0, -1).join(', ')} und ${list[list.length - 1]}`;
};

export function privacyPolicy(o: PrivacyOptions): PrivacySection[] {
  const forms = o.form !== 'none';
  const stores = forms || o.calendly;
  const google = Boolean(o.ga4 || o.googleAds);
  const what = joinDe([forms && 'Anfragen', o.calendly && 'Terminbuchungen']);
  const adServices = o.googleAds ? 'Meta, LinkedIn und Google' : 'Meta und LinkedIn';
  const formTitle = o.form === 'callback' ? 'Rückruf-Anfrage' : 'Kontaktformular';

  const drafts: Draft[] = [
    {
      id: 'verantwortlicher',
      title: 'Verantwortlicher',
      blocks: [
        { p: 'Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:' },
        { p: 'Leibinn Consulting / Cedrik Robin Leibinn\nKonrad-Zuse-Straße 98\n71034 Böblingen' },
        { p: `Telefon: [+49 176 34529336](tel:+4917634529336)\nE-Mail: ${MAIL}` },
        {
          p: 'Alle Websites von Leibinn Consulting nutzen dieselben Dienste. Diese Erklärung beschreibt die Funktionen, die es auf dieser Website gibt.',
        },
        {
          p: 'Einen Datenschutzbeauftragten haben wir nicht benannt, weil die gesetzlichen Voraussetzungen dafür nicht vorliegen. Fragen zum Datenschutz beantworten wir unter den oben genannten Kontaktdaten.',
        },
      ],
    },
    {
      id: 'ueberblick',
      title: 'Das Wichtigste in Kürze',
      blocks: [
        {
          ul: [
            'Beim Aufruf dieser Website wird nur unser Hosting-Anbieter kontaktiert. Schriftarten liegen auf unserem Server.',
            'Die Reichweitenmessung kommt ohne Cookies aus und erkennt Sie nicht über Tage oder Websites hinweg wieder.',
            `${o.ga4 ? 'Google Analytics und Werbedienste' : 'Werbedienste'} (${adServices}) laden nur, wenn Sie im Cookie-Banner zustimmen. Ihre Auswahl können Sie jederzeit ändern: {{settings}}.`,
            ...(o.calendly ? ['Der Terminkalender von Calendly lädt erst, wenn Sie auf „Kalender laden“ klicken.'] : []),
            ...(stores
              ? [
                  `${what} speichern wir in einer zentralen Datenbank mit Serverstandort in Frankfurt am Main und löschen sie nach 12 Monaten, wenn daraus keine Zusammenarbeit entsteht.`,
                ]
              : []),
            'Unsere Rechner laufen in Ihrem Browser. Ihre Eingaben werden nicht übertragen.',
          ],
        },
      ],
    },
    {
      id: 'rechtsgrundlagen',
      title: 'Rechtsgrundlagen',
      blocks: [
        { p: 'Wir verarbeiten personenbezogene Daten nur, wenn eine Rechtsgrundlage besteht. Je nach Zweck ist das:' },
        {
          ul: [
            'Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); für das Speichern von Informationen auf Ihrem Endgerät und das Auslesen daraus zusätzlich § 25 Abs. 1 TDDDG,',
            'die Erfüllung eines Vertrags oder vorvertragliche Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO),',
            'eine rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO),',
            'unser berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO), etwa am sicheren und wirtschaftlichen Betrieb der Website. Speicherungen auf Ihrem Endgerät, die für einen von Ihnen gewünschten Dienst unbedingt erforderlich sind, beruhen auf § 25 Abs. 2 Nr. 2 TDDDG.',
          ],
        },
        { p: 'Welche Grundlage gilt, steht bei der jeweiligen Verarbeitung.' },
      ],
    },
    {
      id: 'hosting',
      title: 'Hosting und Server-Logfiles',
      blocks: [
        {
          p: 'Diese Website und unser zentraler Dienst für Anfragen und Einwilligungsnachweise werden bei Vercel Inc., USA, betrieben. Vercel liefert die Seiten über ein weltweites Servernetz aus.',
        },
        {
          p: 'Bei jedem Aufruf verarbeitet Vercel technisch notwendige Daten: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, die zuvor besuchte Seite (Referrer), Browser und Betriebssystem. Das ist erforderlich, um die Website auszuliefern, Fehler zu finden und Angriffe abzuwehren (Art. 6 Abs. 1 lit. f DSGVO). Die Logdaten werden nur so lange gespeichert, wie es dafür erforderlich ist.',
        },
        {
          p: 'Vercel verarbeitet die Daten in unserem Auftrag (Art. 28 DSGVO) und ist nach dem EU-US Data Privacy Framework zertifiziert. Weitere Informationen: [Datenschutzhinweise von Vercel](https://vercel.com/legal/privacy-notice).',
        },
      ],
    },
    {
      id: 'verschluesselung',
      title: 'Verschlüsselung',
      blocks: [
        {
          p: 'Diese Website nutzt eine TLS-Verschlüsselung, erkennbar an „https://“ in der Adresszeile. Daten, die Sie an uns senden, können Dritte dadurch nicht mitlesen.',
        },
      ],
    },
    {
      id: 'schriftarten',
      title: 'Schriftarten',
      blocks: [
        {
          p: 'Die Schriftarten sind lokal auf unserem Server eingebunden. Beim Laden der Seite wird keine Verbindung zu Google Fonts oder anderen Anbietern aufgebaut.',
        },
      ],
    },
    {
      id: 'reichweitenmessung',
      title: 'Reichweitenmessung ohne Cookies',
      blocks: [
        {
          p: 'Um zu verstehen, welche Seiten genutzt werden, setzen wir Vercel Web Analytics ein (Vercel Inc., siehe „Hosting“). Erfasst werden aufgerufene Seiten, Referrer, Land, Gerätetyp, Browser und Betriebssystem. Es werden keine Cookies gesetzt und keine Informationen auf Ihrem Endgerät gespeichert. Besucher werden über einen Hashwert aus der Anfrage unterschieden, den Vercel nach eigenen Angaben nach 24 Stunden verwirft; eine Wiedererkennung über Tage oder Websites hinweg findet nicht statt. Wir sehen nur zusammengefasste Zahlen.',
        },
        {
          p: 'Rechtsgrundlage ist unser berechtigtes Interesse an einer bedarfsgerechten Gestaltung der Website (Art. 6 Abs. 1 lit. f DSGVO). Sie können dieser Verarbeitung widersprechen (siehe „Ihre Rechte“).',
        },
      ],
    },
    {
      id: 'cookie-banner',
      title: 'Cookie-Banner und Einwilligungen',
      blocks: [
        {
          p: 'Für Einwilligungen nutzen wir ein Cookie-Banner, das auf unserem eigenen Server läuft (Open-Source-Software „CookieConsent“). Es lädt nichts von Dritten.',
        },
        {
          p: 'Ihre Auswahl speichern wir im Cookie „lc_consent“ auf Ihrem Gerät, damit das Banner nicht bei jedem Aufruf erscheint. Das ist unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Ihre Einwilligung gilt 6 Monate; danach fragen wir erneut.',
        },
        {
          p: 'Damit wir Einwilligungen nachweisen können (Art. 7 Abs. 1 DSGVO), speichern wir bei jeder Entscheidung eine zufällige Einwilligungs-ID, Ihre Auswahl, die Version des Banners, den Zeitpunkt und die aufgerufene Seite in unserer Datenbank (Supabase, Serverstandort Frankfurt am Main). IP-Adresse, Name oder andere Angaben zu Ihrer Person speichern wir dabei nicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. c DSGVO in Verbindung mit Art. 7 Abs. 1 DSGVO. Die Einträge löschen wir nach 12 Monaten.',
        },
        {
          p: 'Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft ändern oder widerrufen: {{settings}}. Den Link finden Sie auch am Ende jeder Seite.',
        },
      ],
    },
    {
      id: 'formular',
      title: formTitle,
      when: forms,
      blocks: [
        {
          p:
            o.form === 'callback'
              ? 'Im Feld „Rückruf“ können Sie uns Ihre Telefonnummer senden, damit wir Sie zurückrufen.'
              : 'Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Ihre Angaben aus dem Formular, je nach Formular also Name, E-Mail-Adresse, Telefonnummer, Unternehmen, Position, Mitarbeiterzahl, Anliegen, Ihre Auswahl im Formular und Ihre Nachricht.',
        },
        {
          p: 'Zusätzlich speichern wir, von welcher Seite die Anfrage kam, die zuvor besuchte Seite (Referrer), die Kampagnenparameter aus dem Link, über den Sie gekommen sind (utm_source, utm_medium, utm_campaign, utm_content, utm_term), und den Zeitpunkt. Haben Sie im Cookie-Banner den Marketing-Diensten zugestimmt, speichern wir außerdem die Klick-Kennung der Anzeige (fbclid, li_fat_id oder gclid). So sehen wir, welche Anzeigen zu Anfragen führen.',
        },
        {
          p: 'Zweck ist die Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Die Zuordnung zu Kampagnen beruht auf unserem berechtigten Interesse an der Erfolgsmessung unserer Werbung (Art. 6 Abs. 1 lit. f DSGVO), die Klick-Kennung auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).',
        },
        {
          p: 'Die Anfrage geht an unseren zentralen Anfrage-Dienst (betrieben bei Vercel), wird in unserer Datenbank bei Supabase Inc., USA, mit Serverstandort Frankfurt am Main gespeichert und per E-Mail an unser Team weitergeleitet. Die E-Mail versendet Resend (Plus Five Five, Inc., USA). Alle drei Anbieter verarbeiten die Daten in unserem Auftrag (Art. 28 DSGVO).',
        },
        {
          p: 'Zum Schutz vor Spam nutzen wir ein unsichtbares Prüffeld und eine Mindestzeit für das Ausfüllen. Ein Captcha oder Dienste Dritter setzen wir dafür nicht ein.',
        },
        {
          p: 'Anfragen löschen wir 12 Monate nach Eingang automatisch, es sei denn, daraus entsteht eine Zusammenarbeit. Dann speichern wir die Daten für deren Dauer und darüber hinaus, soweit gesetzliche Aufbewahrungspflichten bestehen (nach Handels- und Steuerrecht bis zu zehn Jahre). Auf Wunsch löschen wir Ihre Anfrage sofort.',
        },
        {
          p: 'Ihre Angaben sind freiwillig. Ohne Telefonnummer oder E-Mail-Adresse können wir Ihnen allerdings nicht antworten.',
        },
      ],
    },
    {
      id: 'kontakt',
      title: 'Kontakt per E-Mail oder Telefon',
      blocks: [
        {
          p: 'Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu bearbeiten (Art. 6 Abs. 1 lit. b DSGVO, bei allgemeinen Anfragen Art. 6 Abs. 1 lit. f DSGVO). Wir löschen sie, sobald sie dafür nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen.',
        },
      ],
    },
    {
      id: 'calendly',
      title: 'Terminbuchung mit Calendly',
      when: o.calendly,
      blocks: [
        {
          p: 'Für die Buchung eines Erstgesprächs binden wir den Kalender von Calendly ein (Calendly LLC, 271 17th St NW, Ste 1000, Atlanta, GA 30363, USA).',
        },
        {
          p: 'Der Kalender lädt erst, wenn Sie auf „Kalender laden“ klicken. Vorher besteht keine Verbindung zu Calendly. Mit dem Klick willigen Sie ein, dass Calendly Ihre IP-Adresse und technische Daten Ihres Geräts erhält und dafür Cookies oder ähnliche Technologien einsetzen kann (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG).',
        },
        {
          p: 'Wenn Sie einen Termin buchen, verarbeitet Calendly in unserem Auftrag die Angaben aus der Buchung: Name, E-Mail-Adresse, gewählter Termin, Ihre Antworten im Buchungsformular und, falls angegeben, Ihre Telefonnummer. Zweck ist die Vereinbarung und Durchführung des Gesprächs (Art. 6 Abs. 1 lit. b DSGVO).',
        },
        {
          p: 'Damit wir sehen, über welche Website und welche Kampagne eine Buchung zustande kam, geben wir dem Kalender die Kampagnenparameter aus Ihrem Link (utm_…) und eine zufällige Kennung mit, die die Website und den Buchungsvorgang bezeichnet. Klick-Kennungen von Anzeigen geben wir nicht an Calendly weiter. Nach der Buchung meldet Ihr Browser die Buchungsnummer an unseren Anfrage-Dienst. Dieser ruft die Buchungsdaten bei Calendly ab und speichert sie in unserer Datenbank (Supabase, Frankfurt am Main); Absagen und Verschiebungen übernehmen wir dort ebenfalls. Grundlage ist unser berechtigtes Interesse an der Organisation unserer Termine und der Erfolgsmessung unserer Werbung (Art. 6 Abs. 1 lit. f DSGVO). Es gilt die Löschfrist von 12 Monaten wie bei Anfragen.',
        },
        {
          p: 'Calendly ist nach dem EU-US Data Privacy Framework zertifiziert. Weitere Informationen: [Datenschutzhinweise von Calendly](https://calendly.com/legal/privacy-notice).',
        },
      ],
    },
    {
      id: 'statistik',
      title: 'Statistik mit Google Analytics 4',
      when: Boolean(o.ga4),
      blocks: [
        {
          p: `Wenn Sie im Cookie-Banner der Kategorie „Statistik“ zustimmen, setzen wir Google Analytics 4 ein (${GOOGLE}), um die Nutzung der Website genauer auszuwerten (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Ohne Ihre Zustimmung lädt Google Analytics nicht.`,
        },
        {
          p: 'Verarbeitet werden unter anderem aufgerufene Seiten, Verweildauer, Referrer, ungefährer Standort, Geräte- und Browserinformationen sowie Ereignisse wie eine gesendete Anfrage oder eine Terminbuchung (mit einer zufälligen Ereignis-ID). Google Analytics 4 speichert keine vollständigen IP-Adressen. Gesetzt werden Cookies wie „_ga“ und „_ga_…“ mit einer Laufzeit von bis zu 2 Jahren.',
        },
        {
          p: 'Wir haben die Aufbewahrung der Analysedaten bei Google auf 2 Monate begrenzt und Google Signals sowie die Weitergabe an andere Google-Produkte deaktiviert. Google verarbeitet die Daten in unserem Auftrag (Art. 28 DSGVO); dabei können Daten in die USA übermittelt werden. Google LLC ist nach dem EU-US Data Privacy Framework zertifiziert.',
        },
        {
          p: 'Sie können Ihre Einwilligung jederzeit widerrufen: {{settings}}. Weitere Informationen: [Datenschutzerklärung von Google](https://policies.google.com/privacy).',
        },
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing-Dienste',
      blocks: [
        {
          p: 'Die folgenden Dienste laden wir nur, wenn Sie im Cookie-Banner der Kategorie „Marketing“ oder dem einzelnen Dienst zustimmen (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Ohne Zustimmung wird keine Verbindung zu den Anbietern aufgebaut. Sie können Ihre Einwilligung jederzeit widerrufen: {{settings}}. Bereits gesetzte Cookies dieser Dienste werden dann gelöscht.',
        },
        {
          p: 'Zweck ist, die Wirkung unserer Anzeigen zu messen und Anzeigen Personen zu zeigen, die sich für unsere Leistungen interessieren könnten. Wenn Sie eine Anfrage senden oder einen Termin buchen, melden wir dieses Ereignis mit einer zufälligen Ereignis-ID an die Dienste, denen Sie zugestimmt haben. Name, E-Mail-Adresse oder Telefonnummer übermitteln wir dabei nicht.',
        },
        {
          p: 'Die Anbieter können die Daten mit Ihrem Nutzerkonto bei ihnen verknüpfen und für eigene Zwecke verwenden, etwa zur Verbesserung ihrer Werbesysteme. Für die Erhebung und Übermittlung der Daten an den jeweiligen Anbieter sind wir gemeinsam mit ihm verantwortlich (Art. 26 DSGVO); für die weitere Verarbeitung ist allein der Anbieter verantwortlich. Soweit Daten in die USA übermittelt werden, sind die Anbieter nach dem EU-US Data Privacy Framework zertifiziert.',
        },
        { h3: 'Meta-Pixel (Facebook, Instagram)' },
        {
          p: 'Anbieter: Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland. Verarbeitet werden unter anderem IP-Adresse, Browser- und Geräteinformationen, aufgerufene Seiten, Ereignisse wie eine gesendete Anfrage und die Klick-Kennung (fbclid). Gesetzt wird das Cookie „_fbp“ mit einer Laufzeit von bis zu 90 Tagen. Vereinbarung zur gemeinsamen Verantwortlichkeit: [Meta Controller Addendum](https://www.facebook.com/legal/controller_addendum). Weitere Informationen: [Datenschutzrichtlinie von Meta](https://www.facebook.com/privacy/policy).',
        },
        { h3: 'LinkedIn Insight Tag' },
        {
          p: 'Anbieter: LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2, Irland. Verarbeitet werden unter anderem IP-Adresse, Browser- und Geräteinformationen, aufgerufene Seiten, Zeitpunkt, Ereignisse wie eine gesendete Anfrage und die Klick-Kennung (li_fat_id). LinkedIn setzt dafür Cookies wie „li_sugr“, „bcookie“, „lidc“ und „UserMatchHistory“ mit einer Laufzeit von bis zu einem Jahr. Weitere Informationen: [Datenschutzrichtlinie von LinkedIn](https://www.linkedin.com/legal/privacy-policy) und [Cookie-Richtlinie von LinkedIn](https://www.linkedin.com/legal/cookie-policy).',
        },
        ...(o.googleAds
          ? ([
              { h3: 'Google Ads Conversion-Tracking' },
              {
                p: `Anbieter: ${GOOGLE}. Verarbeitet werden unter anderem IP-Adresse, Browser- und Geräteinformationen, aufgerufene Seiten, Ereignisse wie eine gesendete Anfrage und die Klick-Kennung (gclid). Gesetzt werden Cookies wie „_gcl_au“ mit einer Laufzeit von bis zu 90 Tagen. Wir nutzen den Einwilligungsmodus von Google: Die Google-Tags laden erst nach Ihrer Zustimmung. Weitere Informationen: [Datenschutzerklärung von Google](https://policies.google.com/privacy).`,
              },
            ] as PrivacyBlock[])
          : []),
      ],
    },
    {
      id: 'rechner',
      title: 'Rechner',
      blocks: [
        {
          p: 'Unsere Rechner und Auswahlhilfen rechnen ausschließlich in Ihrem Browser. Ihre Eingaben werden nicht an uns übertragen und nicht gespeichert.',
        },
      ],
    },
    {
      id: 'empfaenger',
      title: 'Empfänger und Auftragsverarbeiter',
      blocks: [
        {
          p: 'Innerhalb unseres Unternehmens erhalten nur die Personen Ihre Daten, die sie für die Bearbeitung brauchen. Außerdem setzen wir Dienstleister ein, die Daten in unserem Auftrag verarbeiten und vertraglich an unsere Weisungen gebunden sind (Art. 28 DSGVO):',
        },
        {
          ul: [
            'Vercel Inc., USA: Hosting der Website und unseres Anfrage-Dienstes, Reichweitenmessung',
            `Supabase Inc., USA, Serverstandort Frankfurt am Main: Datenbank für ${joinDe([forms && 'Anfragen', o.calendly && 'Terminbuchungen', 'Einwilligungsnachweise'])}`,
            ...(forms ? ['Plus Five Five, Inc. (Resend), USA: Versand der Benachrichtigungs-E-Mails'] : []),
            ...(o.calendly ? ['Calendly LLC, USA: Terminbuchung'] : []),
            ...(o.ga4 ? ['Google Ireland Limited, Irland: Google Analytics 4'] : []),
            'ein IT-Dienstleister, der unsere Websites technisch betreut und dabei Zugriff auf diese Systeme haben kann',
          ],
        },
        {
          p: `${adServices} erhalten Daten nur mit Ihrer Einwilligung und sind dafür, wie unter „Marketing-Dienste“ beschrieben, gemeinsam mit uns oder allein verantwortlich. An sonstige Dritte geben wir Daten nur weiter, wenn wir gesetzlich dazu verpflichtet sind.`,
        },
      ],
    },
    {
      id: 'drittlaender',
      title: 'Übermittlung in Drittländer',
      blocks: [
        {
          p: `Einige Dienstleister haben ihren Sitz in den USA oder können Daten dorthin übermitteln. Für Unternehmen, die nach dem EU-US Data Privacy Framework zertifiziert sind, hat die EU-Kommission ein angemessenes Datenschutzniveau festgestellt (Art. 45 DSGVO). Das gilt für ${joinDe(['Vercel', forms && 'Resend', o.calendly && 'Calendly', 'Meta', 'LinkedIn', google && 'Google'])}. Supabase ist nicht zertifiziert; mit Supabase gelten die Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO). Unsere Datenbank liegt in Frankfurt am Main; ein Zugriff aus den USA lässt sich dennoch nicht vollständig ausschließen.`,
        },
      ],
    },
    {
      id: 'speicherdauer',
      title: 'Speicherdauer',
      blocks: [
        {
          ul: [
            ...(stores
              ? [
                  `${what}: 12 Monate nach Eingang; bei einer Zusammenarbeit für deren Dauer und die gesetzlichen Aufbewahrungsfristen`,
                ]
              : []),
            'Einwilligungsnachweise: 12 Monate',
            'Cookie mit Ihrer Cookie-Auswahl („lc_consent“): 6 Monate',
            'Server-Logfiles: nur so lange, wie es für Betrieb und Sicherheit erforderlich ist',
            ...(o.ga4 ? ['Google Analytics 4: Analysedaten 2 Monate'] : []),
            'Cookies der Marketing-Dienste: siehe den jeweiligen Dienst',
          ],
        },
        { p: 'Die Löschung nach Ablauf der Fristen läuft automatisch, einmal täglich.' },
      ],
    },
    {
      id: 'rechte',
      title: 'Ihre Rechte',
      blocks: [
        {
          p: `Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO). Eine Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Eine formlose Nachricht an ${MAIL} genügt.`,
        },
        { h3: 'Widerspruchsrecht (Art. 21 DSGVO)' },
        {
          p: 'Verarbeiten wir Daten auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO), können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen. Der Verarbeitung zu Zwecken der Direktwerbung können Sie jederzeit ohne Angabe von Gründen widersprechen.',
        },
        { h3: 'Beschwerderecht' },
        {
          p: 'Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für uns zuständig ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart, [www.baden-wuerttemberg.datenschutz.de](https://www.baden-wuerttemberg.datenschutz.de).',
        },
        { p: 'Automatisierte Entscheidungen im Sinne von Art. 22 DSGVO treffen wir nicht.' },
      ],
    },
    {
      id: 'aenderungen',
      title: 'Änderungen',
      blocks: [
        {
          p: `Wir passen diese Datenschutzerklärung an, wenn sich unsere Websites oder die eingesetzten Dienste ändern. Stand: ${PRIVACY_UPDATED}.`,
        },
      ],
    },
  ];

  return drafts
    .filter((d) => d.when !== false)
    .map((d, i) => ({ id: d.id, title: `${i + 1}. ${d.title}`, blocks: d.blocks }));
}

export type InlinePart =
  | { type: 'text'; text: string }
  | { type: 'br' }
  | { type: 'link'; text: string; href: string; external: boolean }
  | { type: 'settings'; text: string };

/** Splits a text into plain text, line breaks, links and the cookie-settings button. */
export function inlineParts(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\{\{settings\}\}|\n/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) parts.push({ type: 'text', text: text.slice(last, m.index) });
    if (m[0] === '\n') parts.push({ type: 'br' });
    else if (m[0] === '{{settings}}') parts.push({ type: 'settings', text: 'Cookie-Einstellungen' });
    else parts.push({ type: 'link', text: m[1], href: m[2], external: /^https?:/.test(m[2]) });
    last = re.lastIndex;
  }
  if (last < text.length) parts.push({ type: 'text', text: text.slice(last) });
  return parts;
}
