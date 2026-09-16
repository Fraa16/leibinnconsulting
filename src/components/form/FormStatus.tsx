import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../../lib/cn';
import { formMessages } from '../../content/contact';
import type { FieldTone } from './Field';

interface FormStatusProps {
  status: 'idle' | 'submitting' | 'success' | 'error';
  error?: string;
  /** Server had no mail credentials; the lead was logged, not delivered. */
  devMode?: boolean;
  tone?: FieldTone;
}

/**
 * Result banner for a form submission.
 *
 * Always rendered (as an empty live region when idle) so assistive technology
 * has a stable element to announce into — mounting the region at the same moment
 * as the message is a common reason such announcements get missed.
 */
export function FormStatus({ status, error, devMode, tone = 'light' }: FormStatusProps) {
  const dark = tone === 'dark';

  return (
    <div aria-live="polite" aria-atomic="true" className="empty:hidden">
      {status === 'success' && (
        <div
          className={cn(
            'flex items-start gap-3 rounded-xl p-4',
            dark ? 'bg-white/15 text-white' : 'bg-primary-50 text-ink-800',
          )}
        >
          <CheckCircle2
            aria-hidden="true"
            className={cn('mt-0.5 h-5 w-5 flex-shrink-0', dark ? 'text-white' : 'text-primary-600')}
          />
          <div>
            <p className="font-medium">{formMessages.successTitle}</p>
            <p className={cn('text-sm', dark ? 'text-white/80' : 'text-ink-600')}>
              {formMessages.successBody}
            </p>
            {devMode && (
              <p
                className={cn(
                  'mt-2 flex items-start gap-1.5 text-xs',
                  dark ? 'text-white/70' : 'text-ink-500',
                )}
              >
                <Info aria-hidden="true" className="mt-px h-3.5 w-3.5 flex-shrink-0" />
                Entwicklungsmodus: Es sind noch keine E-Mail-Zugangsdaten hinterlegt, die Anfrage
                wurde nur protokolliert.
              </p>
            )}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div
          className={cn(
            'flex items-start gap-3 rounded-xl p-4',
            dark ? 'bg-red-500/20 text-white' : 'bg-red-50 text-ink-800',
          )}
        >
          <AlertTriangle
            aria-hidden="true"
            className={cn('mt-0.5 h-5 w-5 flex-shrink-0', dark ? 'text-red-200' : 'text-red-600')}
          />
          <div>
            <p className="font-medium">{formMessages.errorTitle}</p>
            <p className={cn('text-sm', dark ? 'text-white/80' : 'text-ink-600')}>
              {error ?? formMessages.errorBody}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
