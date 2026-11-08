import BrandLine from './ui/BrandLine';
import Image from './ui/Image';
import { Accent } from './ui/SectionHead';
import { CalendarIcon, ShieldIcon } from './ui/icons';
import { clientAvatars, standingImage } from '../lib/images';
import { HERO_RESULT, eur } from '../lib/calculator';

const STATS = [
  { value: '55+', label: 'Mandanten betreut' },
  { value: '§ 34c', label: 'IHK-Erlaubnis Immobilienmakler' },
  { value: '§ 34d', label: 'IHK-Erlaubnis Versicherungsmakler' },
  { value: '15 Min', label: 'Kostenloses Erstgespräch' },
];

const AVATARS = [clientAvatars.okafor, clientAvatars.mueller, clientAvatars.silic];

/** Case 02's year-by-year benefit as a 10-bar sparkline, 40px tall. */
const maxBenefit = Math.max(...HERO_RESULT.years.map((y) => y.benefit));
const HERO_BARS = HERO_RESULT.years.map((y) => Math.max(3, (y.benefit / maxBenefit) * 40));

export default function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <BrandLine
        line="a"
        color="copper"
        className="absolute bottom-[-6%] left-[-8%] w-[min(980px,76vw)] opacity-10"
      />

      <div
        className="shell relative grid items-center gap-x-[clamp(40px,5vw,88px)] gap-y-16
                   pb-[clamp(48px,6vw,80px)] pt-[clamp(48px,6vw,88px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)]"
      >
        <div className="flex flex-col items-start">
          <p className="eyebrow text-copper-light">Investment Consulting · Immobilien &amp; Steuern</p>
          <h1 id="hero-title" className="t-h1 mt-8">
            Verwandeln Sie Steuerlast in <Accent>bleibendes Vermögen.</Accent>
          </h1>
          <p className="mt-8 max-w-[34em] text-[clamp(17px,1.35vw,19px)] leading-[1.6] text-mist">
            Steueroptimierte Immobilienstrategien für Unternehmer, Führungskräfte und Angestellte. Geprüfte
            Objekte, klare Kennzahlen und ein Ansprechpartner, der Sie vom ersten Gespräch bis zum Notartermin
            begleitet.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#termin" className="btn btn-copper h-[58px] gap-3 px-7 text-[16px]">
              <CalendarIcon />
              Kostenloses Erstgespräch buchen
            </a>
            <a href="#rechner" className="btn btn-outline h-[58px] px-[26px] text-[16px]">
              Steuervorteil berechnen
            </a>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-5">
            <div className="flex items-center gap-3.5">
              <div className="flex">
                {AVATARS.map((img, i) => (
                  <Image
                    key={img.fallback}
                    image={img}
                    alt=""
                    sizes="40px"
                    priority
                    className={`h-10 w-10 rounded-full border-2 border-navy-950 object-cover ${i ? '-ml-2.5' : ''}`}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-[3px]">
                <span className="text-[15px] font-semibold">55+ Mandanten</span>
                <span className="text-[13px] text-mist-subtle">vertrauen auf unsere Beratung</span>
              </div>
            </div>
            <span aria-hidden="true" className="h-9 w-px bg-white/12" />
            <div className="flex items-center gap-3 text-copper-light">
              <ShieldIcon size={26} />
              <div className="flex flex-col gap-[3px]">
                <span className="text-[15px] font-semibold text-white">IHK-Erlaubnis</span>
                <span className="text-[13px] text-mist-subtle">nach § 34c und § 34d GewO</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative xs:pl-12">
          <div className="relative aspect-[4/5] max-h-[720px] overflow-hidden rounded-[28px] bg-navy-850">
            <Image
              image={standingImage}
              alt="Cedrik Leibinn, Gründer von Leibinn Consulting"
              sizes="(min-width: 1000px) min(470px, 36vw), (min-width: 600px) calc(100vw - 110px), calc(100vw - 40px)"
              priority
              wrapperClassName="absolute inset-0"
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 18%' }}
            />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950/[.78] to-navy-950/0" />
            <div className="absolute bottom-[22px] left-6 flex flex-col gap-1">
              <span className="text-[17px] font-semibold">Cedrik Leibinn</span>
              <span className="label text-white/72">Gründer · Ihr Ansprechpartner</span>
            </div>
          </div>

          {/* Sits at 46% so it never covers the face. */}
          <div
            className="absolute left-0 top-[46%] w-[min(270px,70%)] rounded-[18px] border border-white/10
                       bg-navy-900 p-5 shadow-float"
          >
            <div className="flex justify-between font-mono text-[10px] font-medium uppercase tracking-[.1em] text-mist-subtle">
              <span>Modellrechnung</span>
              <span>Fall 02</span>
            </div>
            <div className="mt-3.5 text-[13px] text-mist">Steuervorteil im 1. Jahr</div>
            <div className="tnum mt-1 text-[34px] font-medium tracking-[-.04em]">≈ {eur(HERO_RESULT.benefit)}</div>
            <div aria-hidden="true" className="mt-3.5 flex h-10 items-end gap-1">
              {HERO_BARS.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-[3px_3px_1px_1px] ${i === 0 ? 'bg-copper-light' : 'bg-copper-light/30'}`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            <div className="mt-2.5 text-[11px] text-mist-subtle">Leitende Angestellte · 140.000 € brutto</div>
          </div>

          {/* Hangs over the photo's bottom-right edge. */}
          <div
            className="absolute bottom-[-28px] right-[-20px] flex w-[min(250px,66%)] flex-col gap-3 rounded-[18px]
                       bg-ivory p-[18px] text-ink shadow-float"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-ink text-copper-light">
                <CalendarIcon />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold">Erstgespräch</span>
                <span className="text-[12px] text-stone-subtle">15 Min · kostenlos · online</span>
              </div>
            </div>
            <a href="#termin" className="btn btn-ink h-10 gap-2 text-[13px]">
              Termin wählen →
            </a>
          </div>
        </div>
      </div>

      <div className="shell relative pb-[clamp(56px,7vw,96px)]">
        <dl className="grid gap-x-8 gap-y-7 border-t border-white/10 pt-8 xs:grid-cols-2 xl:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2">
              <dt className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[.1em] text-mist-subtle">
                {s.label}
              </dt>
              <dd className="text-[40px] font-light leading-none tracking-[-.04em]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
