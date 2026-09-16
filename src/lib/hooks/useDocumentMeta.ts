import { useEffect } from 'react';
import { site } from '../../content/site';

interface Meta {
  title: string;
  description?: string;
  /** Path only, e.g. "/impressum". Combined with site.url for the canonical. */
  path: string;
  /** Keep legal and error pages out of the index. */
  noindex?: boolean;
}

function setTag(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) {
  let element = document.head.querySelector<HTMLElement>(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  apply(element);
}

/**
 * Per-route document metadata.
 *
 * A deliberately small alternative to pulling in react-helmet for four routes:
 * this writes title, description, canonical, robots and the OG/Twitter fields
 * that change per page, and nothing else.
 */
export function useDocumentMeta({ title, description, path, noindex = false }: Meta) {
  useEffect(() => {
    document.title = title;

    const canonical = `${site.url}${path}`;

    setTag(
      'meta[name="description"]',
      () => Object.assign(document.createElement('meta'), { name: 'description' }),
      (el) => el.setAttribute('content', description ?? site.description),
    );

    setTag(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      (el) => el.setAttribute('href', canonical),
    );

    setTag(
      'meta[name="robots"]',
      () => Object.assign(document.createElement('meta'), { name: 'robots' }),
      (el) => el.setAttribute('content', noindex ? 'noindex, follow' : 'index, follow'),
    );

    for (const [selector, attribute, key] of [
      ['meta[property="og:title"]', 'property', 'og:title'],
      ['meta[property="og:url"]', 'property', 'og:url'],
      ['meta[property="og:description"]', 'property', 'og:description'],
      ['meta[name="twitter:title"]', 'name', 'twitter:title'],
      ['meta[name="twitter:description"]', 'name', 'twitter:description'],
    ] as const) {
      const value = key.endsWith('url')
        ? canonical
        : key.endsWith('description')
          ? (description ?? site.description)
          : title;

      setTag(
        selector,
        () => {
          const el = document.createElement('meta');
          el.setAttribute(attribute, key);
          return el;
        },
        (el) => el.setAttribute('content', value),
      );
    }
  }, [title, description, path, noindex]);
}
