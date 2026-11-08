import Image from './ui/Image';
import Reveal from './ui/Reveal';
import { Accent } from './ui/SectionHead';
import { towersImage } from '../lib/images';

const PAINS = [
  {
    title: 'Steuerliche Unsicherheit trotz hoher Belastung',
    text: 'Sie wissen nicht genau, wie Sie Ihre Steuerlast sinnvoll und legal reduzieren können.',
  },
  {
    title: 'Hoher Aufwand bei Analyse und Standortwahl',
    text: 'Der Markt ist unübersichtlich, Objekte sind schwer zu bewerten, und die Zeit fehlt.',
  },
  {
    title: 'Risiko von Leerstand und schwankender Nachfrage',
    text: 'Leerstand und Mieterwechsel können die Rendite spürbar schmälern.',
  },
  {
    title: 'Komplexe Finanzierung und Kaufnebenkosten',
    text: 'Zinsen, Bankanforderungen und Nebenkosten sind schwer abzuschätzen. Fehlkalkulationen kosten Rendite.',
  },
];

export default function SituationSection() {
  return (
    <section aria-labelledby="situation-title" className="section-dark">
      <div className="shell grid items-center gap-x-[clamp(40px,6vw,96px)] gap-y-14 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] max-h-[680px] overflow-hidden rounded-[28px] bg-navy-850">
            <Image
              image={towersImage}
              alt="Bankenviertel mit historischer Altstadt"
              sizes="(min-width: 1000px) 980px, 190vw"
              wrapperClassName="absolute inset-0"
              className="h-full w-full object-cover"
              style={{ objectPosition: '62% 50%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/0 from-50% to-navy-950/70" />
          </div>
          <div
            className="absolute bottom-[clamp(12px,2vw,24px)] left-[clamp(12px,2vw,24px)] right-[clamp(12px,2vw,24px)] max-w-[340px]
                       rounded-[18px] border border-white/10 bg-navy-900/88 p-[22px] backdrop-blur-[12px]"
          >
            <div className="flex items-baseline gap-3">
              <span className="flex-none whitespace-nowrap text-[48px] font-light leading-none tracking-[-.05em] text-copper-light">
                42 %
              </span>
              <span className="text-[13px] leading-[1.35] text-mist">Spitzensteuersatz in Deutschland</span>
            </div>
            <div className="mt-3.5 border-t border-white/10 pt-3.5 text-[14px] leading-[1.5] text-mist-strong">
              Wer gut verdient, zahlt viel. Die Frage ist, ob daraus Vermögen entsteht.
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="flex flex-col">
          <p className="eyebrow text-copper-light">02 · Ihre Ausgangslage</p>
          <h2 id="situation-title" className="t-h2 mt-6">
            Hohe Steuerlast, wenig Zeit und zu viele <Accent>Unsicherheiten.</Accent>
          </h2>
          <p className="t-lead mt-6 text-mist">Vermutlich erkennen Sie sich in mindestens einem dieser Punkte wieder.</p>
          <ol className="mt-10 flex flex-col border-t border-white/12">
            {PAINS.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-b border-white/12 py-[22px]">
                <span className="font-mono text-[12px] font-medium leading-[26px] text-copper-light">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[19px] font-medium tracking-[-.01em]">{p.title}</span>
                  <span className="text-[15px] leading-[1.55] text-mist">{p.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
