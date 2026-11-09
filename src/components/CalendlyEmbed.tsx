import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { calendlyUrl } from '../lib/consent';
import { CalendarIcon } from './ui/icons';

type CalendlyEmbedProps = {
  /** Scheduling link, e.g. https://calendly.com/leibinn/erstgespraech */
  url: string;
};

/** Matches the design: copper primary, ink text, white card. */
function embedSrc(url: string) {
  const src = new URL(url);
  src.searchParams.set('embed_domain', window.location.hostname);
  src.searchParams.set('embed_type', 'Inline');
  // The card header already names the event, duration and format.
  src.searchParams.set('hide_event_type_details', '1');
  src.searchParams.set('hide_landing_page_details', '1');
  src.searchParams.set('hide_gdpr_banner', '1');
  src.searchParams.set('primary_color', 'b8875a');
  src.searchParams.set('text_color', '0d1a2d');
  src.searchParams.set('background_color', 'ffffff');
  return src.toString();
}

/**
 * Calendly inline embed behind a click-to-load consent step.
 *
 * Nothing is requested from Calendly until the visitor asks for the calendar,
 * so no third-party cookie or IP transfer happens on page load. The iframe is
 * used directly instead of Calendly's widget.js; its height follows the
 * `calendly.page_height` messages the embed posts.
 */
export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(660);
  // Built once when the calendar loads (campaign + source tag), so re-renders never reload the iframe.
  const src = useMemo(() => (loaded ? embedSrc(calendlyUrl(url)) : ''), [loaded, url]);

  useEffect(() => {
    if (!loaded) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      const data = e.data as { event?: string; payload?: { height?: string | number } };
      if (data?.event === 'calendly.page_height') {
        const h = parseInt(String(data.payload?.height ?? ''), 10);
        if (h > 0) setHeight(Math.max(h, 480));
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [loaded]);

  if (loaded) {
    return (
      <iframe
        src={src}
        title="Erstgespräch mit Cedrik Leibinn buchen"
        className="block w-full rounded-xl border-0"
        style={{ height }}
      />
    );
  }

  return (
    <div className="flex min-h-[360px] flex-col justify-center gap-4">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory text-copper-dark">
        <CalendarIcon size={22} />
      </span>
      <h3 className="text-[24px] font-normal leading-[1.2] tracking-[-.02em]">Termin direkt im Kalender wählen.</h3>
      <p className="text-[14px] leading-[1.6] text-stone-subtle">
        Der Kalender wird von Calendly bereitgestellt. Erst mit dem Klick auf „Kalender laden“ wird eine Verbindung
        zu Calendly aufgebaut und dabei unter anderem Ihre IP-Adresse übertragen. Details in der{' '}
        <Link to="/datenschutz" className="text-ink underline underline-offset-[3px] hover:text-copper-dark">
          Datenschutzerklärung
        </Link>
        .
      </p>
      <button type="button" onClick={() => setLoaded(true)} className="btn btn-copper mt-2 h-[54px] text-[16px]">
        <CalendarIcon />
        Kalender laden
      </button>
    </div>
  );
}
