import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  /** Pixels of drift per pixel scrolled. 0.15–0.4 reads as depth; above that it reads as a glitch. */
  speed?: number;
  /** Clamp the drift so the layer can never expose an edge. */
  maxOffset?: number;
}

/**
 * Scroll-linked parallax that costs nothing when off-screen.
 *
 * The original implementation called `setState` on every scroll event in two
 * separate components, forcing a React re-render of the whole section per frame,
 * with no rAF throttle, no `{ passive: true }`, and no viewport gating.
 *
 * This version:
 *   - only listens while the element is actually in the viewport (IntersectionObserver)
 *   - coalesces to one write per animation frame
 *   - writes a CSS custom property, so React never re-renders
 *   - is neutralised by the `prefers-reduced-motion` block in index.css, which
 *     forces `--parallax-y` to 0px
 *
 * Usage:
 *   const ref = useParallax<HTMLDivElement>({ speed: 0.3 });
 *   <div ref={ref}><div className="translate-y-[var(--parallax-y,0px)]" /></div>
 */
export function useParallax<T extends HTMLElement>({
  speed = 0.25,
  maxOffset = 120,
}: ParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Distance of the element's centre from the viewport's centre.
      const fromCentre = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, fromCentre * speed));
      el.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const startListening = () => {
      if (listening) return;
      listening = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      update();
    };

    const stopListening = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startListening() : stopListening()),
      { rootMargin: '100px 0px' },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      stopListening();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, maxOffset]);

  return ref;
}
