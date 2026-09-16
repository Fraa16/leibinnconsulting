import { useEffect, useRef } from 'react';

interface Options {
  /** Viewport fraction at which progress starts (1 = bottom edge). */
  start?: number;
  /** Viewport fraction at which progress reaches 1. */
  end?: number;
}

/**
 * Writes the element's scroll-through progress (0 → 1) to a `--progress` custom
 * property on itself.
 *
 * Used for the process timeline's filling rule. Like useParallax, it updates a
 * CSS variable rather than React state, so the animation runs without a render,
 * and it only listens while the element is on screen.
 */
export function useScrollProgress<T extends HTMLElement>({
  start = 0.85,
  end = 0.55,
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;

      const startY = viewport * start;
      const endY = viewport * end;
      // How far the element's top edge has travelled between the two lines.
      const travelled = startY - rect.top;
      const distance = startY - endY + rect.height;
      const progress = distance <= 0 ? 1 : travelled / distance;

      element.style.setProperty('--progress', Math.max(0, Math.min(1, progress)).toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (listening) return;
          listening = true;
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll, { passive: true });
          update();
        } else if (listening) {
          listening = false;
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      },
      { rootMargin: '100px 0px' },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [start, end]);

  return ref;
}
