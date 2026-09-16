/**
 * POST /api/lead — Vercel Edge Function.
 *
 * Runs on the edge runtime so it needs no Node dependencies and starts cold in
 * a few milliseconds. The Resend API key stays server-side: it is never shipped
 * to the browser.
 *
 * Required environment variables (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY    re_...                       from resend.com
 *   LEAD_TO_EMAIL     where the leads should land
 *   LEAD_FROM_EMAIL   a verified sender on a domain verified in Resend
 */

import { processLead, type LeadPayload } from './_lead';

export const config = { runtime: 'edge' };

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405);
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return json({ ok: false, error: 'Ungültige Anfrage.' }, 400);
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const env = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LEAD_TO_EMAIL: process.env.LEAD_TO_EMAIL,
    LEAD_FROM_EMAIL: process.env.LEAD_FROM_EMAIL,
  };

  try {
    const result = await processLead(payload, env, ip);
    return json(result.body, result.status);
  } catch (error) {
    console.error('[lead] unexpected failure:', error);
    return json({ ok: false, error: 'Interner Fehler.' }, 500);
  }
}
