import { useEffect } from 'react';

/** Canonical origin. Update this if the production domain differs. */
export const SITE_ORIGIN = 'https://leibinn-consulting.de';

type Meta = {
  title: string;
  description: string;
  /** Path only, e.g. "/impressum". */
  path: string;
  /** Keep secondary pages out of the index. */
  noindex?: boolean;
};

function setTag(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

/**
 * Per-route title, description and canonical.
 *
 * index.html carries one static set for the whole SPA, so every route shared
 * the homepage's title. Search engines render JS, so keeping these in sync
 * with the route is worth the few lines.
 */
export function useDocumentMeta({ title, description, path, noindex = false }: Meta) {
  useEffect(() => {
    document.title = title;

    setTag('meta[name="description"]', { name: 'description', content: description });
    setTag('meta[property="og:title"]', { property: 'og:title', content: title });
    setTag('meta[property="og:description"]', { property: 'og:description', content: description });
    setTag('meta[property="og:url"]', { property: 'og:url', content: SITE_ORIGIN + path });
    setTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setTag('link[rel="canonical"]', { rel: 'canonical', href: SITE_ORIGIN + path });

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      setTag('meta[name="robots"]', { name: 'robots', content: 'noindex, follow' });
    } else if (robots) {
      robots.remove();
    }
  }, [title, description, path, noindex]);
}
