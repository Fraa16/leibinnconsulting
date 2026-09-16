import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

/**
 * Tracks the OS "reduce motion" setting and updates if the user changes it
 * mid-session. CSS handles the bulk of the damping (see index.css); this hook is
 * for the cases JS has to decide, such as skipping a scroll-linked animation
 * entirely rather than running it at zero duration.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false, // SSR / prerender default: assume motion is fine
  );
}
