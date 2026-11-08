import BrandLine from './ui/BrandLine';
import Reveal from './ui/Reveal';
import SectionHead, { Accent } from './ui/SectionHead';
import { cn } from '../lib/cn';

const NEEDS = [
  {
    tag: 'Analyse',
    title: 'Transparente Analyse ohne Informationsflut',
    text: 'Eine klare Einordnung Ihrer steuerlichen und finanziellen Ausgangslage als Basis jeder Entscheidung.',
  },
  {
    tag: 'Bewertung',
    title: 'Strukturierte Bewertung statt Bauchgefühl',
    text: 'Objekte werden nach festen Kriterien geprüft, nicht nach Hoffnung oder Vermutungen.',
  },
  {
    tag: 'Begleitung',
    title: 'Professionelle Begleitung für Ihre Ziele',
    text: 'Ein erfahrener Partner gibt Sicherheit, spart Zeit und hilft, teure Fehler zu vermeiden.',
    inverted: true,
  },
  {
    tag: 'Risiko',
    title: 'Klarheit über Risiken und Szenarien',
    text: 'Welche Risiken realistisch sind, wie Märkte reagieren und welche Puffer Sie einplanen sollten.',
  },
  {
    tag: 'Strategie',
    title: 'Fokus auf langfristigen Vermögensaufbau',
    text: 'Jede Immobilie im Kontext Ihrer Gesamtstrategie und Ihrer persönlichen Lebensplanung.',
  },
  {
    tag: 'Zeit',
    title: 'Weniger Aufwand im Alltag',
    text: 'Vorbereitete Unterlagen und abgestimmte Schritte. Sie behalten die Kontrolle, ohne die Arbeit.',
  },
];

export default function OrientierungSection() {
  return (
    <section aria-labelledby="orientierung-title" className="panel-light relative overflow-hidden">
      <BrandLine line="b" color="ink" className="absolute right-[-6%] top-10 w-[min(760px,60vw)] opacity-7" />

      <div className="shell relative">
        <SectionHead
          tone="light"
          id="orientierung-title"
          eyebrow="03 · Ihre Orientierung"
          title={
            <>
              Was Sie in Ihrer Situation <Accent>wirklich</Accent> brauchen.
            </>
          }
          lead="Aus vielen Gesprächen mit Unternehmern, Führungskräften und Angestellten wissen wir, worauf es am Ende ankommt."
        />

        <ul className="section-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NEEDS.map((n, i) => (
            <Reveal
              as="li"
              key={n.tag}
              delay={(i % 3) * 70}
              className={cn('flex flex-col gap-3.5 rounded-[22px] p-7', n.inverted ? 'bg-ink text-white' : 'bg-white')}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-[44px] font-light leading-none tracking-[-.05em]',
                    n.inverted ? 'text-copper-light' : 'text-copper',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'flex h-[26px] items-center rounded-full px-2.5 font-mono text-[10px] font-medium uppercase tracking-[.08em]',
                    n.inverted ? 'bg-navy-850 text-copper-light' : 'bg-ivory text-stone',
                  )}
                >
                  {n.tag}
                </span>
              </div>
              <h3 className="mt-2 text-[20px] font-medium tracking-[-.015em]">{n.title}</h3>
              <p className={cn('text-[15px] leading-[1.6]', n.inverted ? 'text-mist' : 'text-stone')}>{n.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
