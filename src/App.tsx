import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SkipLink } from './components/layout/SkipLink';
import HomePage from './pages/HomePage';

/* Legal pages are rarely visited — keep them out of the landing bundle. */
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/**
 * Restores scroll position on navigation, and honours a hash target when one is
 * present (e.g. arriving at /#kontakt from a legal page).
 */
function ScrollBehaviour() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

function PageFallback() {
  return <div className="min-h-[70vh] bg-paper-200" aria-hidden="true" />;
}

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <ScrollBehaviour />
      <SkipLink />
      <Header minimal={!isHome} />

      <main id="hauptinhalt" tabIndex={-1} className="bg-paper-200 outline-none">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
