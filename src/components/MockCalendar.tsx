import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/cn';

const TIMES = ['09:00', '10:30', '13:00', '15:30', '17:00'];
const WEEKDAYS = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];

const isWeekday = (d: Date) => d.getDay() !== 0 && d.getDay() !== 6;

/**
 * The month to show: the current one, or the next once fewer than three
 * bookable weekdays are left in it. Bookable means a weekday from tomorrow on.
 */
function visibleMonth(today: Date) {
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  let left = 0;
  for (let d = tomorrow.getDate(); d <= end && tomorrow.getMonth() === today.getMonth(); d++) {
    if (isWeekday(new Date(today.getFullYear(), today.getMonth(), d))) left++;
  }
  const month = left < 3 ? new Date(today.getFullYear(), today.getMonth() + 1, 1) : new Date(today.getFullYear(), today.getMonth(), 1);
  return { year: month.getFullYear(), month: month.getMonth(), tomorrow };
}

/**
 * The design's booking flow: pick a weekday, a time, then Vorname + E-Mail.
 *
 * This is the prototype's mock, kept at the client's request until the
 * Calendly URL is available (set VITE_CALENDLY_URL to switch to the real
 * calendar). It does not send or store anything.
 */
export default function MockCalendar() {
  const { year, month, tomorrow } = useMemo(() => visibleMonth(new Date()), []);
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [name, setName] = useState('');

  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = new Date(year, month, 1).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
  const dayLabel = day
    ? new Date(year, month, day).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })
    : '';

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setName(String(data.get('first') ?? '').trim());
    setBooked(true);
  };

  const reset = () => {
    setBooked(false);
    setDay(null);
    setTime(null);
    setName('');
  };

  if (booked) {
    return (
      <div className="flex min-h-[360px] flex-col justify-center gap-4" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory text-[22px] text-copper-dark" aria-hidden="true">
          ✓
        </span>
        <h3 className="text-[30px] font-normal leading-[1.15] tracking-[-.03em]">
          Danke{name ? ` ${name}` : ''}, Ihr Termin ist reserviert.
        </h3>
        <div className="rounded-[14px] bg-ivory p-4 text-[15px] leading-[1.5]">
          <strong className="font-semibold">{dayLabel}</strong> · {time} Uhr
          <br />
          <span className="text-stone-subtle">Die Einladung kommt per E-Mail.</span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="self-start text-[14px] font-semibold text-ink underline underline-offset-[5px]"
        >
          Anderen Termin wählen
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-semibold">{monthLabel}</span>
        <span className="font-mono text-[11px] font-medium tracking-[.08em] text-stone-faint">MEZ</span>
      </div>

      <div
        aria-hidden="true"
        className="mt-4 grid grid-cols-7 gap-1.5 text-center font-mono text-[11px] font-medium text-stone-faint"
      >
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div role="group" aria-label={`Tag wählen, ${monthLabel}`} className="mt-2 grid grid-cols-7 gap-1.5">
        {Array.from({ length: offset }, (_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = i + 1;
          const date = new Date(year, month, d);
          const available = isWeekday(date) && date >= tomorrow;
          const selected = day === d;
          return (
            <button
              key={d}
              type="button"
              disabled={!available}
              aria-pressed={available ? selected : undefined}
              aria-label={date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
              onClick={() => {
                setDay(d);
                setTime(null);
              }}
              className={cn(
                'h-11 rounded-xl text-[14px] transition-colors duration-150',
                selected
                  ? 'bg-ink font-semibold text-white'
                  : available
                    ? 'bg-ivory font-semibold text-ink hover:bg-line-soft'
                    : 'cursor-default bg-transparent font-normal text-stone-off',
              )}
            >
              {d}
            </button>
          );
        })}
      </div>

      {day === null ? (
        <p className="mt-[18px] text-[14px] text-stone-subtle">Wählen Sie einen Tag, um verfügbare Zeiten zu sehen.</p>
      ) : (
        <>
          <div className="mt-5 text-[14px] font-semibold">
            Verfügbare Zeiten · <span className="font-normal text-stone-subtle">{dayLabel}</span>
          </div>
          <div role="group" aria-label="Uhrzeit wählen" className="mt-2.5 flex flex-wrap gap-2">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={time === t}
                onClick={() => setTime(t)}
                className={cn(
                  'h-[42px] rounded-full border px-4 font-mono text-[14px] font-medium transition-colors',
                  time === t ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink',
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </>
      )}

      {day !== null && time && (
        <form onSubmit={onBook} className="mt-5 flex flex-col gap-3 border-t border-line-faint pt-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-2.5">
            <input
              name="first"
              required
              autoComplete="given-name"
              placeholder="Vorname"
              aria-label="Vorname"
              className="h-[50px] rounded-xl border border-line bg-white px-4 text-[16px] text-ink outline-none focus:border-ink"
            />
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="E-Mail"
              aria-label="E-Mail"
              className="h-[50px] rounded-xl border border-line bg-white px-4 text-[16px] text-ink outline-none focus:border-ink"
            />
          </div>
          <button
            type="submit"
            className="h-[54px] rounded-full bg-copper text-[16px] font-semibold text-navy-950 transition-colors hover:bg-ink hover:text-white"
          >
            Termin bestätigen · {time} Uhr
          </button>
          <p className="text-[12px] leading-[1.5] text-stone-subtle">
            Mit der Buchung stimmen Sie der{' '}
            <Link to="/datenschutz" className="text-ink underline underline-offset-[3px] hover:text-copper-dark">
              Datenschutzerklärung
            </Link>{' '}
            zu.
          </p>
        </form>
      )}
    </div>
  );
}
