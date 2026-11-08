import Image from './ui/Image';
import Reveal from './ui/Reveal';
import { Accent } from './ui/SectionHead';
import { presentingImage } from '../lib/images';

const GAINS = [
  {
    n: 'i.',
    title: 'Steueroptimierter Vermögensaufbau',
    text: 'Steuerlast senken und gleichzeitig ein stabiles Sachwertvermögen aufbauen.',
  },
  {
    n: 'ii.',
    title: 'Zugang zu geprüften Immobilien',
    text: 'Lage, Wirtschaftlichkeit und Potenzial werden transparent bewertet.',
  },
  {
    n: 'iii.',
    title: 'Struktur statt Komplexität',
    text: 'Ein klarer Fahrplan und nachvollziehbare Entscheidungsgrundlagen.',
  },
  {
    n: 'iv.',
    title: 'Begleitung auf Augenhöhe',
    text: 'Ein fester Ansprechpartner, der Ihre Situation und Ihre Ziele kennt.',
  },
];

export default function MehrwertSection() {
  return (
    <section aria-labelledby="mehrwert-title" className="panel-light">
      <div className="shell grid items-center gap-x-[clamp(40px,6vw,96px)] gap-y-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-sand">
            <Image
              image={presentingImage}
              alt="Cedrik Leibinn bei einer Strategiepräsentation"
              sizes="(min-width: 1000px) 600px, calc(100vw - 40px)"
              wrapperClassName="absolute inset-0"
              className="h-full w-full object-cover"
              style={{ objectPosition: '55% 40%' }}
            />
          </div>
          <div
            className="absolute bottom-[clamp(12px,2vw,24px)] right-[clamp(12px,2vw,24px)] flex w-[min(280px,72%)] flex-col gap-2.5
                       rounded-[18px] bg-white px-5 py-[18px] shadow-float-light"
          >
            <span className="font-mono text-[10px] font-medium uppercase tracking-[.1em] text-copper-dark">Ihr Fahrplan</span>
            <dl className="flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-stone">Zielrendite</dt>
                <dd className="font-semibold">definiert</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone">Finanzierungsrahmen</dt>
                <dd className="font-semibold">geklärt</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone">Objektauswahl</dt>
                <dd className="font-semibold text-copper-dark">in Prüfung</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={100} className="flex flex-col">
          <p className="eyebrow text-copper-dark">05 · Ihr Mehrwert</p>
          <h2 id="mehrwert-title" className="t-h2 mt-6">
            Was Sie mit einer klaren Strategie <Accent>gewinnen.</Accent>
          </h2>
          <p className="t-lead mt-6 text-stone">
            Aus komplexen Entscheidungen wird ein nachvollziehbarer Weg, mit Zahlen, die Sie verstehen.
          </p>
          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {GAINS.map((g) => (
              <li key={g.n} className="flex flex-col gap-2 rounded-[18px] bg-white p-[22px]">
                <span className="font-mono text-[11px] font-medium text-copper-dark" aria-hidden="true">
                  {g.n}
                </span>
                <h3 className="text-[18px] font-semibold tracking-[-.01em]">{g.title}</h3>
                <p className="text-[14px] leading-[1.55] text-stone">{g.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
