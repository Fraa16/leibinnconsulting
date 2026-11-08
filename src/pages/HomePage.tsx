import { useDocumentMeta } from '../hooks/useDocumentMeta';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import LeistungenSection from '../components/LeistungenSection';
import SituationSection from '../components/SituationSection';
import OrientierungSection from '../components/OrientierungSection';
import RechnerSection from '../components/RechnerSection';
import MehrwertSection from '../components/MehrwertSection';
import AblaufSection from '../components/AblaufSection';
import VertrauenSection from '../components/VertrauenSection';
import StimmenSection from '../components/StimmenSection';
import FaqSection from '../components/FaqSection';
import TerminSection from '../components/TerminSection';

const HOME_TITLE = 'Leibinn Consulting | Steueroptimierte Immobilienstrategien';
const HOME_DESCRIPTION =
  'Verwandeln Sie Steuerlast in bleibendes Vermögen: steueroptimierte Immobilienstrategien für Unternehmer, Führungskräfte und Angestellte. Kostenloses Erstgespräch mit Cedrik Leibinn.';

/**
 * One page, one goal: booking the free 15-minute Erstgespräch. Dark sections
 * run full-bleed and light ones sit as inset ivory panels, alternating down
 * the page; the eyebrows number the sections 01–10 in this order.
 */
export default function HomePage() {
  useDocumentMeta({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: '/' });

  return (
    <>
      <Navigation />
      <main id="inhalt">
        <HeroSection />
        <LeistungenSection />
        <SituationSection />
        <OrientierungSection />
        <RechnerSection />
        <MehrwertSection />
        <AblaufSection />
        <VertrauenSection />
        <StimmenSection />
        <FaqSection />
        <TerminSection />
      </main>
      <Footer />
    </>
  );
}
