import type { Plugin } from 'vite';
import { processLead, type LeadPayload } from '../api/_lead';

/**
 * Mounts POST /api/lead on the Vite dev server using the same handler the Vercel
 * Edge function uses, so `npm run dev` exercises the real code path without the
 * Vercel CLI. Without this the forms would only be testable after deployment.
 */
export function leadApiDevServer(): Plugin {
  return {
    name: 'leibinn:lead-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/lead', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => {
          void (async () => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store');

            let payload: LeadPayload;
            try {
              payload = JSON.parse(Buffer.concat(chunks).toString('utf8')) as LeadPayload;
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: 'Ungültige Anfrage.' }));
              return;
            }

            const env = {
              RESEND_API_KEY: process.env.RESEND_API_KEY,
              LEAD_TO_EMAIL: process.env.LEAD_TO_EMAIL,
              LEAD_FROM_EMAIL: process.env.LEAD_FROM_EMAIL,
            };

            try {
              const result = await processLead(payload, env, req.socket.remoteAddress ?? 'local');
              res.statusCode = result.status;
              res.end(JSON.stringify(result.body));
            } catch (error) {
              console.error('[lead] dev handler failed:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ ok: false, error: 'Interner Fehler.' }));
            }
          })();
        });
      });
    },
  };
}
