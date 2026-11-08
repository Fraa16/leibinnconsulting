import { useState } from 'react';
import BrandLine from './ui/BrandLine';
import Image from './ui/Image';
import Reveal from './ui/Reveal';
import SectionHead, { Accent } from './ui/SectionHead';
import { PlayIcon } from './ui/icons';
import { clientAvatars } from '../lib/images';
import type { ResponsiveImage } from '../lib/images';

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: ResponsiveImage;
  /**
   * The client's video, once it exists: a self-hosted .mp4/.webm URL. While
   * it is unset the card shows the quote without a play button, so nothing
   * on the live page reads as unfinished.
   */
  video?: string;
  /** Poster frame for the video. */
  poster?: string;
  /** Where the brand line sits in the card's video area. */
  line: { line: 'a' | 'b'; className: string };
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Winsome Okafor',
    role: 'Lehrerin',
    quote:
      'Cedrik überzeugt durch herausragende Beratung, hohe Kundenorientierung und tiefes Fachwissen. Ein idealer Ansprechpartner.',
    avatar: clientAvatars.okafor,
    line: { line: 'a', className: 'right-[-20%] top-[-10%] w-[90%]' },
  },
  {
    name: 'Tom Müller',
    role: 'Selbstständiger Tätowierer',
    quote:
      'Ich konnte mich voll auf mein Kerngeschäft konzentrieren, ohne mir Sorgen um meinen Vermögensaufbau machen zu müssen.',
    avatar: clientAvatars.mueller,
    line: { line: 'b', className: 'bottom-[-10%] left-[-20%] w-[110%]' },
  },
  {
    name: 'Luka Šilić',
    role: 'Anwalt',
    quote:
      'Bei meinen Investments verlasse ich mich voll auf die Expertise von Herrn Leibinn, besonders auf die transparente Kommunikation.',
    avatar: clientAvatars.silic,
    line: { line: 'a', className: 'left-[-10%] top-[10%] w-[80%]' },
  },
];

function VideoArea({ t }: { t: Testimonial }) {
  const [playing, setPlaying] = useState(false);

  if (t.video && playing) {
    return (
      <div className="relative aspect-[16/10] bg-black">
        <video src={t.video} poster={t.poster} controls autoPlay playsInline className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-navy-850">
      {t.poster ? (
        <img src={t.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <BrandLine line={t.line.line} color="copper" className={`absolute opacity-18 ${t.line.className}`} />
      )}
      <Image
        image={t.avatar}
        alt={t.name}
        sizes="64px"
        className="absolute bottom-[22px] left-6 h-16 w-16 rounded-full border-2 border-white/20 object-cover"
      />
      {t.video && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Video von ${t.name} abspielen`}
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center
                     rounded-full bg-copper text-navy-950 shadow-play transition-colors hover:bg-copper-light"
        >
          <PlayIcon />
        </button>
      )}
    </div>
  );
}

export default function StimmenSection() {
  return (
    <section aria-labelledby="stimmen-title" className="section-dark">
      <div className="shell">
        <SectionHead
          tone="dark"
          id="stimmen-title"
          eyebrow="08 · Mandantenstimmen"
          title={
            <>
              Echte Mandanten. <Accent>Echte Ergebnisse.</Accent>
            </>
          }
          lead="Was Menschen sagen, die ihre Steuerlast bereits in Vermögen verwandeln."
        />

        <ul className="section-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 80} className="flex">
              <figure className="m-0 flex w-full flex-col overflow-hidden rounded-[24px] border border-white/8 bg-navy-900">
                <VideoArea t={t} />
                <blockquote className="flex-1 px-6 pt-6 text-[16px] leading-[1.6] text-mist-strong">„{t.quote}“</blockquote>
                <figcaption className="flex flex-col gap-0.5 px-6 pb-6 pt-5">
                  <span className="text-[15px] font-semibold">{t.name}</span>
                  <span className="text-[13px] text-mist-subtle">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
