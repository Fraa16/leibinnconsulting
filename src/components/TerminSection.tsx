import CalendlyEmbed from './CalendlyEmbed';
import MockCalendar from './MockCalendar';
import Image from './ui/Image';
import Reveal from './ui/Reveal';
import { Accent } from './ui/SectionHead';
import { cedrikAvatar, windowImage } from '../lib/images';

/**
 * The Calendly scheduling link. While it is unset the card shows the design's
 * mock calendar; set it in the host's environment to switch to the real one.
 */
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL?.trim();

const POINTS = ['Persönlich mit Cedrik', 'Individuelle Einschätzung', 'Klare nächste Schritte'];

export default function TerminSection() {
  return (
    <section id="termin" aria-labelledby="termin-title" className="section-dark">
      <div className="shell grid items-start gap-x-[clamp(40px,6vw,96px)] gap-y-12 lg:grid-cols-2">
        <Reveal className="flex flex-col">
          <p className="eyebrow text-copper-light">10 · Erstgespräch buchen</p>
          <h2 id="termin-title" className="t-h2-xl mt-6">
            Sprechen wir über <Accent>Ihre Situation.</Accent>
          </h2>
          <p className="t-lead mt-6 text-mist">
            15 Minuten, kostenlos und unverbindlich. Danach wissen Sie, ob und wie eine Immobilienstrategie für Sie
            sinnvoll ist.
          </p>
          <div className="relative mt-9 aspect-[16/10] overflow-hidden rounded-[24px] bg-navy-850">
            <Image
              image={windowImage}
              alt="Cedrik Leibinn"
              sizes="(min-width: 1000px) 600px, calc(100vw - 40px)"
              wrapperClassName="absolute inset-0"
              className="h-full w-full object-cover"
              style={{ objectPosition: '60% 30%' }}
            />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3 whitespace-nowrap">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[14px] text-mist-strong">
                <span
                  aria-hidden="true"
                  className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-copper-light/16 text-[11px] text-copper-light"
                >
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={100}
          className="rounded-[28px] bg-white p-[clamp(22px,3vw,36px)] text-ink shadow-booking [color-scheme:light]"
        >
          <div className="flex flex-wrap items-center gap-3.5">
            <Image image={cedrikAvatar} alt="Cedrik Leibinn" sizes="52px" className="h-[52px] w-[52px] rounded-full object-cover" />
            <div className="flex min-w-[180px] flex-1 flex-col gap-[3px]">
              <span className="text-[17px] font-semibold">Erstgespräch mit Cedrik Leibinn</span>
              <span className="text-[13px] text-stone-subtle">15 Min · Video oder Telefon · kostenlos</span>
            </div>
          </div>
          <div className="my-[22px] h-px bg-line-faint" />
          {CALENDLY_URL ? <CalendlyEmbed url={CALENDLY_URL} /> : <MockCalendar />}
        </Reveal>
      </div>
    </section>
  );
}
