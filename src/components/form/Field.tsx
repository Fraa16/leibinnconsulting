import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/cn';

export type FieldTone = 'light' | 'dark';

interface BaseProps {
  id: string;
  label: string;
  error?: string;
  tone?: FieldTone;
  className?: string;
}

const controlBase =
  'w-full rounded-xl border-2 px-4 text-base outline-none transition-colors duration-200 ease-standard placeholder:text-ink-400';

const controlTone: Record<FieldTone, string> = {
  light: 'bg-paper-600 text-ink-900 border-transparent focus:border-primary-600 focus:bg-white',
  dark: 'bg-white text-ink-900 border-transparent focus:border-primary-600',
};

const labelTone: Record<FieldTone, string> = {
  light: 'text-ink-800',
  dark: 'text-white',
};

function ErrorText({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
      <AlertCircle aria-hidden="true" className="h-4 w-4 flex-shrink-0" />
      {children}
    </p>
  );
}

type InputProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'>;

/**
 * Labelled text input with an accessible error.
 *
 * The error is wired through `aria-describedby` and `aria-invalid`, so a screen
 * reader announces the problem when focus reaches the field rather than leaving
 * the visitor to infer it from a red outline.
 */
export function Field({ id, label, error, tone = 'light', className, ...rest }: InputProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className={cn('mb-1.5 block text-sm font-medium', labelTone[tone])}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          controlBase,
          controlTone[tone],
          'h-12',
          error && 'border-red-500 focus:border-red-600',
        )}
        {...rest}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

type TextAreaProps = BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'>;

export function TextAreaField({
  id,
  label,
  error,
  tone = 'light',
  className,
  rows = 4,
  ...rest
}: TextAreaProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className={cn('mb-1.5 block text-sm font-medium', labelTone[tone])}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          controlBase,
          controlTone[tone],
          'resize-none py-3',
          error && 'border-red-500 focus:border-red-600',
        )}
        {...rest}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

interface HoneypotProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Off-screen decoy field. Hidden from assistive technology and from tab order,
 * so only a scripted submitter fills it — and any submission that does is
 * accepted with a 200 and quietly dropped.
 */
export function Honeypot({ value, onChange }: HoneypotProps) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="company-website">Firma (nicht ausfüllen)</label>
      <input
        id="company-website"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
