/**
 * Lead handling core, shared by the Vercel Edge function (api/lead.ts) and the
 * local dev server (scripts/lead-api-dev-plugin.ts).
 *
 * Validation is deliberately repeated here even though the client validates too:
 * client-side checks are a usability feature, server-side checks are the actual
 * guarantee. Never trust the former.
 */

export interface LeadPayload {
  firstname?: string;
  lastname?: string;
  name?: string;
  email?: string;
  message?: string;
  consent?: boolean;
  /** Which form it came from, for the notification subject. */
  source?: string;
  /** Honeypot — must stay empty. */
  company?: string;
  /** Client timestamp when the form was rendered, for the time trap. */
  renderedAt?: number;
}

export interface HandlerResult {
  status: number;
  body: { ok: boolean; error?: string; field?: string; devMode?: boolean };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Humans take more than this to fill a form; bots do not. */
const MIN_FILL_MS = 2500;

const MAX_LENGTHS: Record<string, number> = {
  firstname: 100,
  lastname: 100,
  name: 200,
  email: 254,
  message: 5000,
};

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function validate(payload: LeadPayload): { field: string; error: string } | null {
  const email = clean(payload.email);
  const name = clean(payload.name);
  const firstname = clean(payload.firstname);
  const lastname = clean(payload.lastname);

  if (!email) return { field: 'email', error: 'E-Mail-Adresse fehlt.' };
  if (!EMAIL.test(email)) return { field: 'email', error: 'E-Mail-Adresse ist ungültig.' };

  // The quick form sends firstname/lastname; the long form sends a single name.
  if (!name && !firstname) return { field: 'firstname', error: 'Name fehlt.' };

  if (payload.consent !== true) {
    return { field: 'consent', error: 'Einwilligung in die Datenschutzerklärung fehlt.' };
  }

  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = clean(payload[field as keyof LeadPayload]);
    if (value.length > max) return { field, error: `${field} ist zu lang.` };
  }

  void lastname; // optional
  return null;
}

/** Cheap bot filters that cost a real visitor nothing. */
export function looksAutomated(payload: LeadPayload): boolean {
  if (clean(payload.company) !== '') return true; // honeypot filled
  if (typeof payload.renderedAt === 'number' && payload.renderedAt > 0) {
    if (Date.now() - payload.renderedAt < MIN_FILL_MS) return true;
  }
  return false;
}

/* --------------------------------------------------------- rate limiting */

const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

/**
 * Best-effort per-IP throttle. In-memory, so it resets on cold start and is not
 * shared between regions — enough to blunt a naive flood, not a substitute for
 * a real WAF if this ever gets targeted.
 */
export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);

  if (HITS.size > 5000) HITS.clear(); // crude memory ceiling
  return recent.length > MAX_PER_WINDOW;
}

/* ------------------------------------------------------------ delivering */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderEmail(payload: LeadPayload): string {
  const rows: [string, string][] = [
    [
      'Name',
      [clean(payload.firstname), clean(payload.lastname)].filter(Boolean).join(' ') ||
        clean(payload.name),
    ],
    ['E-Mail', clean(payload.email)],
    ['Anliegen', clean(payload.message) || '—'],
    ['Formular', clean(payload.source) || 'unbekannt'],
    ['Einwilligung', payload.consent ? 'erteilt' : 'nicht erteilt'],
    ['Eingegangen', new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })],
  ];

  return `<table style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:6px 16px 6px 0;color:#5C6E8D;vertical-align:top">${label}</td><td style="padding:6px 0;color:#1F2841"><strong>${escapeHtml(value)}</strong></td></tr>`,
  )
  .join('\n')}
</table>`;
}

export interface LeadEnv {
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
}

/**
 * Processes one submission end to end.
 *
 * With no RESEND_API_KEY configured the submission is logged and reported as a
 * success flagged `devMode`, so the form is demonstrable before the client's
 * mail credentials exist. It never fails silently.
 */
export async function processLead(
  payload: LeadPayload,
  env: LeadEnv,
  ip: string,
): Promise<HandlerResult> {
  if (rateLimited(ip)) {
    return {
      status: 429,
      body: { ok: false, error: 'Zu viele Anfragen. Bitte später erneut versuchen.' },
    };
  }

  // Silently accept bot submissions: telling them why would help them adapt.
  if (looksAutomated(payload)) {
    return { status: 200, body: { ok: true } };
  }

  const invalid = validate(payload);
  if (invalid) {
    return { status: 400, body: { ok: false, error: invalid.error, field: invalid.field } };
  }

  const apiKey = env.RESEND_API_KEY;
  const to = env.LEAD_TO_EMAIL;
  const from = env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn(
      '[lead] RESEND_API_KEY / LEAD_TO_EMAIL / LEAD_FROM_EMAIL not set — running in dev mode, no email sent.',
    );
    console.info('[lead] payload:', JSON.stringify({ ...payload, renderedAt: undefined }));
    return { status: 200, body: { ok: true, devMode: true } };
  }

  const displayName =
    [clean(payload.firstname), clean(payload.lastname)].filter(Boolean).join(' ') ||
    clean(payload.name) ||
    'Unbekannt';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: clean(payload.email),
      subject: `Neue Anfrage über die Website — ${displayName}`,
      html: renderEmail(payload),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error('[lead] Resend rejected the request:', response.status, detail);
    return { status: 502, body: { ok: false, error: 'E-Mail konnte nicht zugestellt werden.' } };
  }

  return { status: 200, body: { ok: true } };
}
