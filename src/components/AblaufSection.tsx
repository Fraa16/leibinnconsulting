import type { ReactNode } from 'react';
import BrandLine from './ui/BrandLine';
import Image from './ui/Image';
import Reveal from './ui/Reveal';
import SectionHead, { Accent } from './ui/SectionHead';
import { cedrikAvatar } from '../lib/images';
import { HERO_RESULT, eur } from '../lib/calculator';

function Check({ done, children }: { done: boolean; children: ReactNode }) {
  return (
    <li className={`flex items-center gap-2.5 ${done ? '' : 'text-mist'}`}>
      {done ? (
        <span
          aria-hidden="true"
          className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-copper text-[10px] font-bold text-navy-950"
        >
          ✓
        </span>
      ) : (
        <span aria-hidden="true" className="h-[18px] w-[18px] rounded-full border-[1.5px] border-copper-light" />
      )}
      {children}
    </li>
  );
}

const LOCATION = [
  { label: 'Mikrolage', width: '86%' },
  { label: 'Nachfrage', width: '78%' },
  { label: 'Infrastruktur', width: '92%' },
  { label: 'Entwicklung', width: '70%', accent: true },
];

const STEPS: { title: string; text: string; ui: ReactNode }[] = [
  {
    title: 'Erstgespräch & Analyse',
    text: 'Ihre steuerliche Situation, Ihre Ziele und Ihre finanzielle Ausgangslage.',
    ui: (
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center gap-2.5">
          <Image image={cedrikAvatar} alt="" sizes="36px" className="h-9 w-9 rounded-full object-cover" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold">Erstgespräch</span>
            <span className="text-[11px] text-mist-subtle">mit Cedrik Leibinn</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 font-mono text-[11px] font-medium">
          <span className="flex h-[26px] items-center rounded-full bg-copper px-2.5 text-navy-950">15 MIN</span>
          <span className="flex h-[26px] items-center rounded-full border border-white/16 px-2.5 text-mist">VIDEO</span>
          <span className="flex h-[26px] items-center rounded-full border border-white/16 px-2.5 text-mist">TELEFON</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Standort- & Objektprüfung',
    text: 'Wir vergleichen Märkte und Standorte und finden Objekte nach klaren Kriterien.',
    ui: (
      <div className="flex h-full flex-col justify-center gap-2.5">
        {LOCATION.map((l) => (
          <div key={l.label} className="grid grid-cols-[84px_minmax(0,1fr)] items-center gap-2.5 text-[12px]">
            <span className="text-mist">{l.label}</span>
            <span aria-hidden="true" className="h-[5px] rounded-[3px] bg-white/8">
              <span
                className={`block h-full rounded-[3px] ${l.accent ? 'bg-copper-light' : 'bg-sky'}`}
                style={{ width: l.width }}
              />
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Entscheidung mit Kennzahlen',
    text: 'Transparente Bewertung: Wirtschaftlichkeit, Risiken und Potenzial.',
    ui: (
      <dl className="flex h-full flex-col justify-center text-[12px]">
        {[
          ['Mietrendite', '3,6 %'],
          ['Steuervorteil p. a.', `≈ ${eur(HERO_RESULT.benefit)}`],
          ['Puffer / Rücklage', 'eingeplant'],
          ['Risiko-Szenarien', '3 geprüft'],
        ].map(([label, value], i, rows) => (
          <div key={label} className={`flex justify-between py-[7px] ${i < rows.length - 1 ? 'border-b border-white/8' : ''}`}>
            <dt className="text-mist">{label}</dt>
            <dd className={`font-mono ${i === 1 ? 'text-copper-light' : ''}`}>{value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    title: 'Begleitung beim Ankauf',
    text: 'Finanzierung, Prüfung und Vertragsdetails bis zur reibungslosen Abwicklung.',
    ui: (
      <ul className="flex h-full flex-col justify-center gap-2.5 text-[13px]">
        <Check done>Finanzierung bestätigt</Check>
        <Check done>Vertrag geprüft</Check>
        <Check done={false}>Notartermin</Check>
      </ul>
    ),
  },
];

export default function AblaufSection() {
  return (
    <section id="prozess" aria-labelledby="prozess-title" className="section-dark relative overflow-hidden">
      <BrandLine line="b" color="copper" className="absolute right-[-8%] top-8 w-[min(820px,64vw)] opacity-12" />

      <div className="shell relative">
        <SectionHead
          tone="dark"
          id="prozess-title"
          eyebrow="06 · Ablauf"
          title={
            <>
              In vier Schritten zu Ihrer <Accent>Immobilienstrategie.</Accent>
            </>
          }
          lead="Klar strukturiert und jederzeit nachvollziehbar. Sie entscheiden bei jedem Schritt selbst."
        />

        <ol className="section-body grid gap-4 xs:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 70}
              className="flex flex-col gap-3.5 rounded-[24px] border border-white/8 bg-navy-900 p-[22px]"
            >
              <div className="h-[150px] rounded-2xl bg-navy-850 p-4">{step.ui}</div>
              <span className="mt-1.5 font-mono text-[12px] font-medium text-copper-light">
                SCHRITT {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[20px] font-medium tracking-[-.015em]">{step.title}</h3>
              <p className="text-[15px] leading-[1.55] text-mist">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
