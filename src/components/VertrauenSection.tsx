import BrandLine from './ui/BrandLine';
import Image from './ui/Image';
import Reveal from './ui/Reveal';
import { Accent } from './ui/SectionHead';
import { ShieldIcon } from './ui/icons';
import { portraitImage } from '../lib/images';

const PERMITS = [
  {
    law: 'IHK · § 34c Abs. 1 GewO',
    title: 'Erlaubnis als Immobilienmakler',
    text: 'Behördlich erteilte Erlaubnis für die Vermittlung von Immobilien.',
  },
  {
    law: 'IHK · § 34d Abs. 1 GewO',
    title: 'Erlaubnis als Versicherungsmakler',
    text: 'Ganzheitliche Absicherung Ihrer Investments aus einer Hand.',
  },
];

export default function VertrauenSection() {
  return (
    <section id="vertrauen" aria-labelledby="vertrauen-title" className="panel-light">
      <div className="shell grid items-center gap-x-[clamp(40px,6vw,96px)] gap-y-14 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
        <Reveal className="relative aspect-[4/5] max-h-[700px] overflow-hidden rounded-[28px] bg-sand">
          <Image
            image={portraitImage}
            alt="Cedrik Leibinn, Gründer"
            sizes="(min-width: 1000px) 920px, 175vw"
            wrapperClassName="absolute inset-0"
            className="h-full w-full object-cover"
            style={{ objectPosition: '40% 25%' }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-navy-950/80 to-navy-950/0" />
          <div className="absolute bottom-[22px] left-6 right-6 flex items-end justify-between gap-4 text-white">
            <div className="flex flex-col gap-1">
              <span className="text-[20px] font-semibold">Cedrik Leibinn</span>
              <span className="label text-white/75">Gründer, Leibinn Consulting</span>
            </div>
            <BrandLine line="a" color="light" className="w-[72px] flex-none opacity-70" />
          </div>
        </Reveal>

        <Reveal delay={100} className="flex flex-col">
          <p className="eyebrow text-copper-dark">07 · Vertrauen &amp; Expertise</p>
          <h2 id="vertrauen-title" className="t-h2 mt-6">
            Ihre Sicherheit ist <Accent>unser Anspruch.</Accent>
          </h2>
          <p className="t-lead mt-6 max-w-[36em] text-stone">
            Klare Prozesse, geprüfte Objekte und eine Beratung, die Ihre Ziele in den Mittelpunkt stellt. Statt vager
            Empfehlungen erhalten Sie nachvollziehbare Analysen.
          </p>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {PERMITS.map((p) => (
              <li key={p.law} className="flex flex-col gap-2.5 rounded-[18px] bg-ink p-[22px] text-white">
                <div className="flex items-center gap-2.5 text-copper-light">
                  <ShieldIcon />
                  <span className="font-mono text-[11px] font-medium tracking-[.08em]">{p.law}</span>
                </div>
                <h3 className="text-[18px] font-semibold">{p.title}</h3>
                <p className="text-[14px] leading-[1.55] text-mist">{p.text}</p>
              </li>
            ))}
            <li className="flex flex-col gap-2.5 rounded-[18px] bg-white p-[22px]">
              <span className="text-[36px] font-light leading-none tracking-[-.04em]">55+</span>
              <h3 className="text-[18px] font-semibold">Mandanten begleitet</h3>
              <p className="text-[14px] leading-[1.55] text-stone">
                Unternehmer, Führungskräfte und Angestellte mit klarer Strategie.
              </p>
            </li>
            <li className="flex flex-col gap-2.5 rounded-[18px] bg-white p-[22px]">
              <span className="font-mono text-[11px] font-medium tracking-[.08em] text-copper-dark">NETZWERK</span>
              <h3 className="text-[18px] font-semibold">Banken, Steuerberater, Finanzierer</h3>
              <p className="text-[14px] leading-[1.55] text-stone">
                Fundierte Prüfung und Finanzierung durch eng abgestimmte Partner.
              </p>
            </li>
          </ul>

          <blockquote className="mt-9 border-t border-line pt-6 text-[clamp(20px,1.8vw,24px)] font-light leading-[1.45] tracking-[-.01em]">
            „Wir empfehlen nur Strategien, die wir fachlich vertreten können und die zu Ihrer persönlichen Situation
            passen.“
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
