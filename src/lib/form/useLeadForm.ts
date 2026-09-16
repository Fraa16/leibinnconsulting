import { useCallback, useMemo, useRef, useState } from 'react';
import { formMessages } from '../../content/contact';
import { submitLead, type LeadRequest } from './submitLead';

export type Rule = 'required' | 'email' | 'minLength';

export interface FieldConfig {
  rules: Rule[];
  minLength?: number;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface Options {
  /** Identifies which form the lead came from, in the notification email. */
  source: string;
  fields: Record<string, FieldConfig>;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function validateField(value: string, config: FieldConfig): string | undefined {
  const trimmed = value.trim();

  if (config.rules.includes('required') && trimmed === '') return formMessages.required;
  if (trimmed === '') return undefined; // optional and empty: nothing more to check
  if (config.rules.includes('email') && !EMAIL.test(trimmed)) return formMessages.invalidEmail;
  if (config.rules.includes('minLength') && trimmed.length < (config.minLength ?? 10)) {
    return formMessages.tooShort;
  }
  return undefined;
}

/**
 * Drives both lead forms: values, per-field validation, consent, spam traps and
 * the submit lifecycle.
 *
 * The original forms had none of this — no `onSubmit`, no state, no validation,
 * no consent checkbox and no success or error feedback. Every lead was silently
 * discarded by the browser's default form handling.
 */
export function useLeadForm({ source, fields }: Options) {
  const initialValues = useMemo(
    () => Object.fromEntries(Object.keys(fields).map((name) => [name, ''])),
    [fields],
  );

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | undefined>();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState<string | undefined>();
  const [devMode, setDevMode] = useState(false);

  /** Honeypot: a real visitor never sees or fills this. */
  const [honeypot, setHoneypot] = useState('');
  /** Time trap: submissions faster than a human are rejected server-side. */
  const renderedAt = useRef(Date.now());

  const setValue = useCallback(
    (name: string, value: string) => {
      setValues((previous) => ({ ...previous, [name]: value }));
      // Re-validate only after the visitor has already left the field once, so
      // errors never appear while they are still typing their first attempt.
      setErrors((previous) =>
        touched[name] ? { ...previous, [name]: validateField(value, fields[name]) } : previous,
      );
    },
    [fields, touched],
  );

  const blurField = useCallback(
    (name: string) => {
      setTouched((previous) => ({ ...previous, [name]: true }));
      setErrors((previous) => ({ ...previous, [name]: validateField(values[name] ?? '', fields[name]) }));
    },
    [fields, values],
  );

  const toggleConsent = useCallback((next: boolean) => {
    setConsent(next);
    if (next) setConsentError(undefined);
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setConsent(false);
    setConsentError(undefined);
    setStatus('idle');
    setFormError(undefined);
    renderedAt.current = Date.now();
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (status === 'submitting') return;

      const nextErrors: Record<string, string | undefined> = {};
      for (const [name, config] of Object.entries(fields)) {
        nextErrors[name] = validateField(values[name] ?? '', config);
      }
      setErrors(nextErrors);
      setTouched(Object.fromEntries(Object.keys(fields).map((name) => [name, true])));

      const missingConsent = !consent;
      setConsentError(missingConsent ? formMessages.consentRequired : undefined);

      const firstInvalid = Object.entries(nextErrors).find(([, error]) => error);
      if (firstInvalid || missingConsent) {
        // Send focus to the first problem so keyboard and screen-reader users
        // are not left hunting for it.
        const target = firstInvalid ? firstInvalid[0] : 'consent';
        document.getElementById(`${source}-${target}`)?.focus();
        return;
      }

      setStatus('submitting');
      setFormError(undefined);

      const payload: LeadRequest = {
        ...values,
        email: values.email ?? '',
        consent,
        source,
        company: honeypot,
        renderedAt: renderedAt.current,
      };

      try {
        const result = await submitLead(payload);
        if (result.ok) {
          setDevMode(Boolean(result.devMode));
          setStatus('success');
        } else {
          setFormError(result.error);
          setStatus('error');
        }
      } catch {
        setFormError(formMessages.errorBody);
        setStatus('error');
      }
    },
    [consent, fields, honeypot, source, status, values],
  );

  return {
    values,
    errors,
    consent,
    consentError,
    status,
    formError,
    devMode,
    honeypot,
    setHoneypot,
    setValue,
    blurField,
    toggleConsent,
    handleSubmit,
    reset,
    /** Namespaced so both forms can live on the same page without id collisions. */
    fieldId: (name: string) => `${source}-${name}`,
  };
}
