import { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';

// The landing page loads eagerly; the legal pages are split out so the first
// paint only carries what it needs.
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'));

/**
 * Scroll on route changes: to the top, or to the section named in the hash
 * (e.g. `/#faq` from a legal page).
 *
 * Only a change of *page* is handled here. A same-page fragment click changes
 * the hash too, but the browser's smooth scroll already handles that, and an
 * instant jump from here would cut it short.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const id = decodeURIComponent(hash.replace(/^#/, ''));
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    /*
     * Re-align a few times: images above the target load lazily and can push
     * it down after the first jump. Each pass is a no-op once layout settles.
     */
    const align = () =>
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
    const frame = requestAnimationFrame(align);
    const timers = [window.setTimeout(align, 250), window.setTimeout(align, 700)];
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full
                   focus:bg-copper focus:px-5 focus:py-3 focus:text-[14px] focus:font-semibold focus:text-navy-950"
      >
        Zum Inhalt springen
      </a>
      <Suspense fallback={<div className="min-h-screen bg-navy-950" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
