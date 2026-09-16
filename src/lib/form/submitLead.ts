/**
 * The single point where a lead leaves the browser.
 *
 * Swapping the backend (Web3Forms, Formspree, a CRM webhook, Supabase) means
 * editing this one function — no component imports anything else.
 */

export interface LeadRequest {
  firstname?: string;
  lastname?: string;
  name?: string;
  email: string;
  message?: string;
  consent: boolean;
  source: string;
  company: string;
  renderedAt: number;
}

export interface LeadResponse {
  ok: boolean;
  error?: string;
  field?: string;
  /** True when the server has no mail credentials yet and only logged the lead. */
  devMode?: boolean;
}

const ENDPOINT = '/api/lead';

export async function submitLead(payload: LeadRequest): Promise<LeadResponse> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let body: LeadResponse;
  try {
    body = (await response.json()) as LeadResponse;
  } catch {
    return { ok: false, error: 'Unerwartete Antwort vom Server.' };
  }

  if (!response.ok) {
    return {
      ok: false,
      error: body.error ?? 'Die Anfrage konnte nicht gesendet werden.',
      field: body.field,
    };
  }

  return body;
}
