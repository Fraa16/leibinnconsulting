import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently occupying the reading area, so the
 * header can mark the matching nav link with `aria-current`.
 *
 * Uses a rootMargin that ignores the top band (under the fixed header) and the
 * bottom two-thirds of the viewport, so "active" means "at the top of what you
 * are reading" rather than "anywhere on screen".
 */
export function useScrollSpy(ids: string[], offset = 96) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;
        // Of the sections in the reading band, take the highest one.
        const [topMost] = [...visible.entries()].sort((a, b) => a[1] - b[1]);
        setActiveId(topMost[0]);
      },
      { rootMargin: `-${offset}px 0px -66% 0px`, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));

    // Scrolled back to the very top: no section is "current".
    const onScroll = () => {
      if (window.scrollY < offset) setActiveId(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids, offset]);

  return activeId;
}
