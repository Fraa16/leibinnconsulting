import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Fraction of the element that must be visible before it counts. */
  threshold?: number;
  /** Shrinks the viewport from the bottom so elements reveal slightly early. */
  rootMargin?: string;
  /** Stop observing after the first intersection. */
  once?: boolean;
}

/**
 * Reports whether an element has entered the viewport.
 *
 * This is what drives the scroll reveals, replacing framer-motion's
 * `whileInView`. One IntersectionObserver per element, disconnected as soon as
 * it has fired, and the actual animation runs in CSS on the compositor.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0,
  rootMargin = '0px 0px -12% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Older engines without IntersectionObserver simply show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
