import { useMemo, useState } from 'react';
import SectionHead, { Accent } from './ui/SectionHead';
import Reveal from './ui/Reveal';
import { CASES, DEFAULT_CASE, DISCLAIMER, calculate, eur } from '../lib/calculator';
import { cn } from '../lib/cn';

/** Index of the "Ihre Werte" tab, after the three cases. */
const OWN_VALUES = CASES.length;

const TABS = [...CASES.map((c) => c.label), 'Ihre Werte'];

export default function RechnerSection() {
  const [income, setIncome] = useState(CASES[DEFAULT_CASE].income);
  const [price, setPrice] = useState(CASES[DEFAULT_CASE].price);
  const [newBuild, setNewBuild] = useState(true);
  const [active, setActive] = useState(DEFAULT_CASE);

  const r = useMemo(() => calculate(income, price, newBuild), [income, price, newBuild]);
  const maxBenefit = Math.max(...r.years.map((y) => y.benefit), 1);

  const selectTab = (i: number) => {
    setActive(i);
    if (i < OWN_VALUES) {
      setIncome(CASES[i].income);
      setPrice(CASES[i].price);
      setNewBuild(true);
    }
  };

  // Every case is a Neubau, so Bestand turns a case into the visitor's own values.
  const selectType = (nb: boolean) => {
    setNewBuild(nb);
    if (!nb && active < OWN_VALUES) setActive(OWN_VALUES);
  };

  const caseNote =
    active < OWN_VALUES
      ? `Fall 0${active + 1} · ${CASES[active].label}, ${CASES[active].sub}`
      : `Ihre Werte · ${eur(income)} brutto`;

  const ledger = [
    { label: 'Mieteinnahmen p. a.', value: `+ ${eur(r.rent)}` },
    { label: 'Zinsen', value: `− ${eur(r.interest)}` },
    { label: 'Abschreibung (AfA)', value: `− ${eur(r.afa)}` },
    { label: 'Bewirtschaftung', value: `− ${eur(r.costs)}` },
  ];

  return (
    <section id="rechner" aria-labelledby="rechner-title" className="section-dark">
      <div className="shell">
        <SectionHead
          tone="dark"
          id="rechner-title"
          eyebrow="04 · Rechner & Fallbeispiele"
          title={
            <>
              Was Ihre Steuerlast <Accent>leisten kann.</Accent>
            </>
          }
          lead="Wählen Sie ein Fallbeispiel aus unserer Beratung oder geben Sie Ihre eigenen Werte ein. Im Erstgespräch rechnen wir mit Ihren tatsächlichen Zahlen."
        />

        <Reveal>
          <div role="group" aria-label="Fallbeispiel wählen" className="mt-[clamp(40px,5vw,64px)] flex flex-wrap gap-2">
            {TABS.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-pressed={active === i}
                onClick={() => selectTab(i)}
                className={cn(
                  'h-[46px] rounded-full border px-5 text-[14px] font-semibold transition-all duration-200',
                  active === i
                    ? 'border-copper bg-copper text-navy-950'
                    : 'border-white/16 bg-transparent text-mist hover:border-white/40 hover:text-white',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-5 rounded-[28px] border border-white/8 bg-navy-900 p-[clamp(20px,2.4vw,28px)] lg:grid-cols-2">
            {/* Inputs and ledger */}
            <div className="flex flex-col p-[clamp(4px,1vw,12px)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="label text-mist-subtle">{caseNote}</span>
                <div role="group" aria-label="Objektart" className="flex rounded-full bg-navy-850 p-[3px]">
                  {(
                    [
                      ['Neubau', true],
                      ['Bestand', false],
                    ] as const
                  ).map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={newBuild === value}
                      onClick={() => selectType(value)}
                      className={cn(
                        'h-[34px] rounded-full px-4 text-[13px] font-semibold transition-colors',
                        newBuild === value ? 'bg-white text-navy-950' : 'bg-transparent text-mist hover:text-white',
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <label htmlFor="calc-income" className="mt-7 flex justify-between text-[15px] text-mist">
                <span>Bruttojahreseinkommen</span>
                <span className="tnum font-semibold text-white">{eur(income)}</span>
              </label>
              <input
                id="calc-income"
                type="range"
                min={40000}
                max={300000}
                step={5000}
                value={income}
                aria-valuetext={eur(income)}
                onChange={(e) => {
                  setIncome(Number(e.target.value));
                  setActive(OWN_VALUES);
                }}
                className="mt-3 w-full"
              />

              <label htmlFor="calc-price" className="mt-[22px] flex justify-between text-[15px] text-mist">
                <span>Kaufpreis der Immobilie</span>
                <span className="tnum font-semibold text-white">{eur(price)}</span>
              </label>
              <input
                id="calc-price"
                type="range"
                min={200000}
                max={900000}
                step={10000}
                value={price}
                aria-valuetext={eur(price)}
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                  setActive(OWN_VALUES);
                }}
                className="mt-3 w-full"
              />

              <dl className="mt-7 border-t border-white/10">
                {ledger.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 border-b border-white/6 py-3 text-[15px]">
                    <dt className="text-mist">{row.label}</dt>
                    <dd className="whitespace-nowrap font-mono text-[14px]">{row.value}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 border-b border-white/20 py-3.5 text-[16px] font-semibold">
                  <dt>= Steuerlicher Verlust</dt>
                  <dd className="whitespace-nowrap font-mono text-[14px]">− {eur(r.loss)}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3 text-[15px]">
                  <dt className="text-mist">× Persönlicher Grenzsteuersatz</dt>
                  <dd className="whitespace-nowrap font-mono text-[14px]">{Math.round(r.rate * 100)} %</dd>
                </div>
              </dl>
            </div>

            {/* Result */}
            <div className="flex flex-col rounded-[22px] bg-ivory p-[clamp(24px,3vw,36px)] text-ink">
              <span className="label text-copper-dark">Steuervorteil im ersten Jahr</span>
              <output
                htmlFor="calc-income calc-price"
                aria-live="polite"
                className="tnum mt-3 text-[clamp(52px,6vw,84px)] font-light leading-none tracking-[-.05em]"
              >
                ≈ {eur(r.benefit)}
              </output>

              {/* Three across from 600px; below that a tile is too narrow for "62.460 €". */}
              <dl className="mt-7 grid gap-3 xs:grid-cols-3">
                {[
                  ['10 Jahre gesamt', eur(r.total)],
                  ['Eigenaufwand / Monat', eur(r.monthly)],
                  ['Tilgung / Monat', eur(r.tilgMonthly)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex min-w-0 items-baseline justify-between gap-1.5 rounded-[14px] bg-white p-3.5
                               xs:flex-col xs:items-stretch xs:justify-start"
                  >
                    <dt className="text-[12px] text-stone-subtle">{label}</dt>
                    <dd className="tnum text-[19px] font-semibold tracking-[-.02em]">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto pt-7">
                <div className="flex justify-between font-mono text-[10px] font-medium uppercase tracking-[.1em] text-stone-subtle">
                  <span>Steuervorteil je Jahr</span>
                  <span>Jahr 1–10</span>
                </div>
                <div
                  role="img"
                  aria-label={`Steuervorteil je Jahr: ${r.years.map((y, i) => `Jahr ${i + 1} ${eur(y.benefit)}`).join(', ')}`}
                  className="mt-3.5 flex h-[146px] items-end gap-2"
                >
                  {r.years.map((y, i) => (
                    <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <div
                        className={cn(
                          'w-full rounded-[6px_6px_2px_2px] transition-[height] duration-300',
                          i === 0 ? 'bg-copper' : 'bg-sand-bar',
                        )}
                        style={{ height: `${Math.max(3, (y.benefit / maxBenefit) * 120)}px` }}
                      />
                      <span aria-hidden="true" className="font-mono text-[10px] text-stone-faint">
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3.5 border-t border-line pt-5">
                <p className="max-w-[300px] text-[12px] leading-[1.5] text-stone-subtle">{DISCLAIMER}</p>
                <a href="#termin" className="btn btn-ink h-12 px-5 text-[14px]">
                  Ergebnis prüfen lassen →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
