import Image from './ui/Image';
import Reveal from './ui/Reveal';
import SectionHead, { Accent } from './ui/SectionHead';
import { meetingImage } from '../lib/images';

/**
 * Partner banks for the "Finanzierung über renommierte Partnerbanken" row.
 *
 * Empty until the client supplies the real logos; the row stays hidden while
 * it is. Add entries as `{ name: 'Musterbank', logo: importedSvgUrl }`; each
 * logo is shown in a 132×48 slot.
 */
const PARTNER_BANKS: { name: string; logo: string }[] = [];

const SCORES = [
  { label: 'Lage', value: '9,2', width: '92%' },
  { label: 'Bausubstanz', value: '8,8', width: '88%' },
  { label: 'Mietpotenzial', value: '8,4', width: '84%' },
  { label: 'Wirtschaftlichkeit', value: '9,0', width: '90%', accent: true },
];

export default function LeistungenSection() {
  return (
    <section id="leistungen" aria-labelledby="leistungen-title" className="panel-light">
      <div className="shell">
        <SectionHead
          tone="light"
          id="leistungen-title"
          eyebrow="01 · Ihr Immobilienpartner"
          title={
            <>
              Immobilien, die sich <Accent>steuerlich rechnen</Accent> und langfristig tragen.
            </>
          }
          lead="Wir verbinden Steuerwissen, Marktanalyse und ein Netzwerk vertrauenswürdiger Partner. So finden Sie Objekte, die zu Ihrer Situation passen, statt Objekte, die einfach verkauft werden sollen."
        />

        <div className="section-body grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {/* Marktzugang */}
          <Reveal className="grid items-center gap-7 rounded-[24px] bg-white p-[clamp(24px,3vw,36px)] sm:col-span-2 sm:grid-cols-2 xl:col-span-4">
            <div className="flex flex-col gap-3">
              <span className="label text-copper-dark">Marktzugang</span>
              <h3 className="text-[26px] font-medium leading-[1.15] tracking-[-.02em]">Geprüfte Objekte, auch off-market.</h3>
              <p className="text-[16px] leading-[1.6] text-stone">
                Über unser Netzwerk erhalten Sie Zugang zu Immobilien in verschiedenen Märkten, auch zu solchen, die
                nie öffentlich angeboten werden. Jedes Objekt durchläuft unser Prüfraster.
              </p>
            </div>
            <div className="rounded-[18px] border border-line-soft bg-ivory p-5" aria-label="Beispielhafter Objekt-Check">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold">Objekt-Check</span>
                <span className="flex h-6 items-center rounded-full bg-ink px-2.5 font-mono text-[10px] font-medium uppercase tracking-[.08em] text-white">
                  Geprüft
                </span>
              </div>
              <div className="mt-1 text-[12px] text-stone-subtle">Neubau-Wohnung · 3 Zimmer · 78 m²</div>
              <div className="mt-[18px] flex flex-col gap-3">
                {SCORES.map((s) => (
                  <div key={s.label} className="grid grid-cols-[110px_minmax(0,1fr)_28px] items-center gap-3 text-[13px]">
                    <span className="text-stone">{s.label}</span>
                    <span aria-hidden="true" className="h-1.5 overflow-hidden rounded-[3px] bg-line-soft">
                      <span className={`block h-full ${s.accent ? 'bg-copper' : 'bg-ink'}`} style={{ width: s.width }} />
                    </span>
                    <span className="text-right font-mono text-[12px] font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 font-mono text-[10px] tracking-[.06em] text-stone-faint">BEISPIELHAFTE DARSTELLUNG</div>
            </div>
          </Reveal>

          {/* Expertenberatung */}
          <Reveal
            delay={80}
            className="flex min-h-[340px] flex-col gap-3 rounded-[24px] bg-ink p-[clamp(24px,3vw,32px)] text-white xl:col-span-2"
          >
            <span className="label text-copper-light">Expertenberatung</span>
            <h3 className="text-[22px] font-medium leading-[1.2] tracking-[-.02em]">Steuern verstehen, bevor man investiert.</h3>
            <div className="mt-auto rounded-2xl bg-navy-850 p-[18px]">
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-mist">Spitzensteuersatz</span>
                <span className="text-[32px] font-normal tracking-[-.04em]">42 %</span>
              </div>
              <div
                aria-hidden="true"
                className="relative mt-3.5 h-2 rounded"
                style={{ background: 'linear-gradient(90deg,#24406A,#8FB3D9 70%,#D6AE84)' }}
              >
                <span className="absolute left-[93%] top-[-5px] h-[18px] w-[3px] rounded-sm bg-white" />
              </div>
              <div aria-hidden="true" className="mt-2 flex justify-between font-mono text-[10px] text-mist-subtle">
                <span>14 %</span>
                <span>24 %</span>
                <span>42 %</span>
                <span>45 %</span>
              </div>
            </div>
            <p className="text-[14px] leading-[1.55] text-mist">
              Fast jeder zweite zusätzliche Euro geht ans Finanzamt. Genau hier setzen wir an.
            </p>
          </Reveal>

          {/* Transparente Prozesse */}
          <Reveal className="flex min-h-[340px] flex-col gap-3 rounded-[24px] bg-white p-[clamp(24px,3vw,32px)] xl:col-span-2">
            <span className="label text-copper-dark">Transparente Prozesse</span>
            <h3 className="text-[22px] font-medium leading-[1.2] tracking-[-.02em]">Sie wissen jederzeit, wo Sie stehen.</h3>
            <div className="mt-auto flex flex-col gap-3 rounded-2xl border border-line-soft bg-ivory p-[18px]">
              <div className="flex justify-between text-[12px]">
                <span className="font-semibold">Ihr Fortschritt</span>
                <span className="font-mono text-stone-subtle">2 / 4</span>
              </div>
              <div aria-hidden="true" className="grid grid-cols-4 gap-1">
                <span className="h-1.5 rounded-[3px] bg-ink" />
                <span className="h-1.5 rounded-[3px] bg-copper" />
                <span className="h-1.5 rounded-[3px] bg-line-soft" />
                <span className="h-1.5 rounded-[3px] bg-line-soft" />
              </div>
              <ul className="flex flex-col gap-2 text-[13px]">
                <li className="flex items-center gap-2.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] text-white" aria-hidden="true">
                    ✓
                  </span>
                  Analyse abgeschlossen
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-4 w-4 rounded-full border-2 border-copper" aria-hidden="true" />
                  <span className="font-semibold">Objektprüfung läuft</span>
                </li>
                <li className="flex items-center gap-2.5 text-stone-faint">
                  <span className="h-4 w-4 rounded-full border-[1.5px] border-line-ring" aria-hidden="true" />
                  Entscheidung
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Persönlicher Service */}
          <Reveal
            delay={80}
            className="relative min-h-[340px] overflow-hidden rounded-[24px] bg-navy-850 text-white sm:col-span-2 xl:col-span-4"
          >
            <Image
              image={meetingImage}
              alt="Cedrik Leibinn im Beratungsgespräch"
              sizes="(min-width: 1100px) 800px, calc(100vw - 40px)"
              wrapperClassName="absolute inset-0"
              className="h-full w-full object-cover"
              style={{ objectPosition: '30% 30%' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg,rgba(8,17,31,.82) 0%,rgba(8,17,31,.45) 45%,rgba(8,17,31,0) 75%)',
              }}
            />
            {/* On phones the text spans the whole card, past the side gradient. */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/40 via-50% to-navy-950/0 sm:hidden" />
            <div className="relative flex h-full min-h-[340px] max-w-[420px] flex-col justify-end gap-3 p-[clamp(24px,3vw,36px)]">
              <span className="label text-copper-light">Persönlicher Service</span>
              <h3 className="text-[26px] font-medium leading-[1.15] tracking-[-.02em]">
                Ein Ansprechpartner. Von der ersten Frage bis zum Schlüssel.
              </h3>
              <p className="text-[15px] leading-[1.55] text-white/80">
                Maßgeschneiderte Lösungen für Ihre Situation, keine Standardprodukte.
              </p>
            </div>
          </Reveal>
        </div>

        {PARTNER_BANKS.length > 0 && (
          <div className="mt-14 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line pt-7">
            <span className="label text-stone-subtle">Finanzierung über renommierte Partnerbanken</span>
            <ul className="flex flex-wrap gap-3">
              {PARTNER_BANKS.map((bank) => (
                <li key={bank.name} className="flex h-12 w-[132px] items-center justify-center rounded-xl border border-line px-3">
                  <img src={bank.logo} alt={bank.name} loading="lazy" className="max-h-7 max-w-full object-contain" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
