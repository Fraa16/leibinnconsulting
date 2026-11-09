/**
 * Consent banner and ad tracking, shared by all Leibinn sites.
 * The same file lives in every repo: change it in one, copy it to the others.
 *
 * - Self-hosted banner (vanilla-cookieconsent), "Alle akzeptieren" and
 *   "Nur notwendige" with equal weight. Consent is valid for 6 months.
 * - Meta Pixel and LinkedIn Insight Tag load only after consent for that
 *   service, and only once their IDs are configured. Nothing else loads.
 * - Conversions: a completed Calendly booking ("booking") and a sent form
 *   ("lead"). Each gets an event ID, so server-side events can be deduplicated.
 * - Every first consent and every change is logged to the central lead
 *   service (POST /api/consent), once its URL is configured.
 * - Any element with `data-cookie-settings` reopens the settings.
 * - submitLead() sends forms to the lead service, with the campaign the visitor
 *   arrived from (kept in memory only, no browser storage).
 */
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export type SiteKey = 'main' | 'lp1' | 'lp2' | 'lp3' | 'b2b';
export type ConversionKind = 'lead' | 'booking';

export interface ConsentConfig {
  site: SiteKey;
  privacyUrl?: string;
  imprintUrl?: string;
  metaPixelId?: string;
  linkedinPartnerId?: string;
  linkedinConversionLead?: string;
  linkedinConversionBooking?: string;
  /** Base URL of the central lead service, e.g. https://leads.leibinn-consulting.de */
  leadsApiUrl?: string;
}

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: unknown;
  loaded: boolean;
  version: string;
};
type Lintrk = ((...args: unknown[]) => void) & { q: unknown[][] };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    lintrk?: Lintrk;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

let cfg: ConsentConfig = { site: 'main' };
let started = false;
/** URL and referrer of the first page of this visit (in memory, survives in-site navigation). */
let landing = { search: '', referrer: '' };
const loaded = { meta: false, linkedin: false };

const value = (v?: string) => (v ?? '').trim() || undefined;

const newEventId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function loadScript(src: string) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/** Meta's base code, without the <noscript> image (it would bypass consent). */
function loadMeta() {
  const id = value(cfg.metaPixelId);
  if (!id || loaded.meta) return;
  loaded.meta = true;
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = window._fbq ?? fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
  }
  window.fbq('init', id);
  window.fbq('track', 'PageView');
}

/** LinkedIn's Insight Tag base code, without the <noscript> image. */
function loadLinkedIn() {
  const id = value(cfg.linkedinPartnerId);
  if (!id || loaded.linkedin) return;
  loaded.linkedin = true;
  window._linkedin_partner_id = id;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids ?? [];
  window._linkedin_data_partner_ids.push(id);
  if (!window.lintrk) {
    const lintrk = function (a: unknown, b: unknown) {
      lintrk.q.push([a, b]);
    } as Lintrk;
    lintrk.q = [];
    window.lintrk = lintrk;
  }
  loadScript('https://snap.licdn.com/li.lms-analytics/insight.min.js');
}

function applyConsent() {
  if (CookieConsent.acceptedService('meta', 'marketing')) loadMeta();
  if (CookieConsent.acceptedService('linkedin', 'marketing')) loadLinkedIn();
}

/** Pseudonymous proof of consent: random consent ID, choice, banner revision. No IP, no name. */
function logConsent(action: 'first' | 'change') {
  const base = value(cfg.leadsApiUrl);
  if (!base) return;
  const cookie = CookieConsent.getCookie();
  fetch(`${base.replace(/\/+$/, '')}/api/consent`, {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      site: cfg.site,
      consentId: cookie.consentId,
      revision: cookie.revision,
      categories: cookie.categories,
      services: cookie.services,
      action,
      path: window.location.pathname,
    }),
  }).catch(() => {
    /* Logging must never break the page. */
  });
}

/** Reports a conversion to every ad platform the visitor consented to. Returns the event ID. */
export function trackConversion(kind: ConversionKind, eventId: string = newEventId()) {
  if (loaded.meta && window.fbq) {
    window.fbq('track', kind === 'booking' ? 'Schedule' : 'Lead', {}, { eventID: eventId });
  }
  const conversionId = value(kind === 'booking' ? cfg.linkedinConversionBooking : cfg.linkedinConversionLead);
  if (loaded.linkedin && conversionId && window.lintrk) {
    window.lintrk('track', { conversion_id: Number(conversionId), event_id: eventId });
  }
  return eventId;
}

/** True once the visitor has agreed to marketing services (used for campaign attribution). */
export const hasMarketingConsent = () => CookieConsent.acceptedCategory('marketing');

export function openCookieSettings() {
  CookieConsent.showPreferences();
}

function onMessage(e: MessageEvent) {
  if (e.origin !== 'https://calendly.com') return;
  const data = e.data as { event?: string } | null;
  if (data?.event === 'calendly.event_scheduled') trackConversion('booking');
}

function onClick(e: MouseEvent) {
  const target = e.target as Element | null;
  if (target?.closest?.('[data-cookie-settings]')) {
    e.preventDefault();
    CookieConsent.showPreferences();
  }
}

export function initConsent(config: ConsentConfig) {
  if (started || typeof window === 'undefined') return;
  started = true;
  cfg = config;
  landing = { search: window.location.search, referrer: document.referrer };
  const privacy = config.privacyUrl ?? '/datenschutz';
  const imprint = config.imprintUrl ?? '/impressum';

  window.addEventListener('message', onMessage);
  document.addEventListener('click', onClick);

  void CookieConsent.run({
    revision: 1,
    cookie: { name: 'lc_consent', expiresAfterDays: 182, sameSite: 'Lax' },
    guiOptions: {
      consentModal: { layout: 'box', position: 'bottom left', equalWeightButtons: true, flipButtons: false },
      preferencesModal: { layout: 'box', equalWeightButtons: true, flipButtons: false },
    },
    onFirstConsent: () => logConsent('first'),
    onConsent: applyConsent,
    onChange: () => {
      logConsent('change');
      applyConsent();
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      marketing: {
        autoClear: { cookies: [{ name: /^_fb/ }, { name: /^li_/ }], reloadPage: true },
        services: {
          meta: { label: 'Meta Pixel (Meta Platforms Ireland Ltd.)' },
          linkedin: { label: 'LinkedIn Insight Tag (LinkedIn Ireland Unlimited Company)' },
        },
      },
    },
    language: {
      default: 'de',
      translations: {
        de: {
          consentModal: {
            title: 'Ihre Privatsphäre',
            description:
              'Wir verwenden technisch notwendige Speicherungen, damit diese Website funktioniert. Mit Ihrer Einwilligung nutzen wir zusätzlich Marketing-Dienste von Meta und LinkedIn, um die Wirkung unserer Anzeigen zu messen. Dabei können Daten auch in die USA übertragen werden. Ihre Auswahl können Sie jederzeit über „Cookie-Einstellungen“ am Seitenende ändern.',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Nur notwendige',
            showPreferencesBtn: 'Einstellungen',
            footer: `<a href="${privacy}">Datenschutz</a><a href="${imprint}">Impressum</a>`,
          },
          preferencesModal: {
            title: 'Cookie-Einstellungen',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Nur notwendige',
            savePreferencesBtn: 'Auswahl speichern',
            closeIconLabel: 'Schließen',
            serviceCounterLabel: 'Dienst|Dienste',
            sections: [
              {
                title: 'Ihre Auswahl',
                description:
                  'Hier legen Sie fest, welche Dienste wir nutzen dürfen. Ihre Einwilligung gilt sechs Monate und lässt sich jederzeit mit Wirkung für die Zukunft widerrufen.',
              },
              {
                title: 'Notwendig',
                description:
                  'Speichert Ihre Auswahl in diesem Dialog. Ohne diese Speicherung kann die Website Ihre Entscheidung nicht berücksichtigen.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Marketing',
                description:
                  'Meta Pixel und LinkedIn Insight Tag messen, ob Besucher über unsere Anzeigen kommen und anschließend einen Termin buchen oder eine Anfrage senden. Dazu werden Cookies gesetzt und Daten an Meta und LinkedIn übermittelt, auch in die USA.',
                linkedCategory: 'marketing',
              },
              {
                title: 'Mehr Informationen',
                description: `Details finden Sie in unserer <a href="${privacy}">Datenschutzerklärung</a>.`,
              },
            ],
          },
        },
      },
    },
  });
}

export interface LeadInput {
  /** Form key, e.g. 'kontakt' or 'rueckruf'. */
  form: string;
  name?: string;
  firma?: string;
  position?: string;
  email?: string;
  telefon?: string;
  mitarbeiteranzahl?: string;
  anliegen?: string;
  nachricht?: string;
  /** Extra form fields, stored as they are. */
  fields?: Record<string, string>;
  /** Honeypot value: must stay empty for real visitors. */
  website?: string;
}

/**
 * Sends a form to the central lead service and reports the "lead" conversion
 * (same event ID on both sides). Throws when the service is not configured or
 * rejects the request, so the form can show its error state.
 */
export async function submitLead(input: LeadInput): Promise<{ eventId: string }> {
  const base = value(cfg.leadsApiUrl);
  if (!base) throw new Error('Lead service not configured');
  const eventId = newEventId();
  const first = new URLSearchParams(landing.search);
  const now = new URLSearchParams(window.location.search);
  const param = (k: string) => first.get(k) || now.get(k) || undefined;
  const marketing = hasMarketingConsent();
  const attribution: Record<string, string | undefined> = {
    page_url: window.location.origin + window.location.pathname,
    referrer: landing.referrer || undefined,
    utm_source: param('utm_source'),
    utm_medium: param('utm_medium'),
    utm_campaign: param('utm_campaign'),
    utm_content: param('utm_content'),
    utm_term: param('utm_term'),
    // Ad click IDs only with marketing consent.
    fbclid: marketing ? param('fbclid') : undefined,
    li_fat_id: marketing ? param('li_fat_id') : undefined,
    gclid: marketing ? param('gclid') : undefined,
  };
  const res = await fetch(`${base.replace(/\/+$/, '')}/api/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      site: cfg.site,
      ...input,
      attribution,
      marketingConsent: marketing,
      eventId,
      elapsedMs: Math.round(performance.now()),
    }),
  });
  if (!res.ok) throw new Error(`Lead service responded ${res.status}`);
  trackConversion('lead', eventId);
  return { eventId };
}
