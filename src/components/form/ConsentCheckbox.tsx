import { AlertCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { formMessages } from '../../content/contact';
import type { FieldTone } from './Field';

interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  tone?: FieldTone;
}

/**
 * DSGVO consent for the lead forms.
 *
 * Art. 6(1)(a) / Art. 13 DSGVO require an informed, freely given and actively
 * declared consent before personal data is collected. The previous forms had no
 * consent control and no link to a privacy notice at all — the notice did not
 * exist either.
 *
 * The checkbox is deliberately unchecked by default: a pre-ticked box is not
 * valid consent (EuGH C-673/17, "Planet49").
 */
export function ConsentCheckbox({ id, checked, onChange, error, tone = 'light' }: ConsentCheckboxProps) {
  const errorId = `${id}-error`;
  const dark = tone === 'dark';

  return (
    <div>
      <div className="flex items-start gap-3">
        <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-ink-300 bg-white transition-colors duration-150 checked:border-primary-600 checked:bg-primary-600"
          />
          <Check
            aria-hidden="true"
            className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
            strokeWidth={3}
          />
        </span>

        <label
          htmlFor={id}
          className={cn('cursor-pointer text-sm leading-relaxed', dark ? 'text-white/85' : 'text-ink-600')}
        >
          {formMessages.consentLabel}{' '}
          <Link
            to="/datenschutz"
            target="_blank"
            className={cn(
              'font-medium underline underline-offset-2 transition-colors',
              dark ? 'text-white hover:text-accent-200' : 'text-primary-700 hover:text-primary-800',
            )}
          >
            {formMessages.consentLinkLabel}
          </Link>{' '}
          {formMessages.consentLabelSuffix}
        </label>
      </div>

      {error && (
        <p id={errorId} className={cn('mt-1.5 flex items-center gap-1.5 text-sm', dark ? 'text-red-200' : 'text-red-600')}>
          <AlertCircle aria-hidden="true" className="h-4 w-4 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
