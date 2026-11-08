import { useEffect, useRef } from 'react';

/**
 * Reveal on scroll.
 *
 * Adds `.is-revealed` to the element once 10 % of it is in view, then stops
 * observing. Pair it with the `a-rise` class (src/index.css), which the CSS
 * neutralises under prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
