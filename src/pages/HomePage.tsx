import { site } from '../content/site';
import { useDocumentMeta } from '../lib/hooks/useDocumentMeta';
import { StructuredData } from '../components/seo/StructuredData';
import { HeroSection } from '../components/sections/HeroSection';
import { BrandIntroSection } from '../components/sections/BrandIntroSection';
import { ProblemSection } from '../components/sections/ProblemSection';
import { OrientationSection } from '../components/sections/OrientationSection';
import { QuickContactSection } from '../components/sections/QuickContactSection';
import { ValuePropositionSection } from '../components/sections/ValuePropositionSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { TrustSection } from '../components/sections/TrustSection';
import { PartnerSection } from '../components/sections/PartnerSection';
import { FAQSection } from '../components/sections/FAQSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';

export default function HomePage() {
  useDocumentMeta({ title: site.title, description: site.description, path: '/' });

  return (
    <>
      <StructuredData />

      <HeroSection />
      <BrandIntroSection />
      <ProblemSection />
      <OrientationSection />
      <QuickContactSection />

      {/* Anchor targets for the header navigation. */}
      <div id="leistungen">
        <ValuePropositionSection />
      </div>
      <div id="prozess">
        <ProcessSection />
      </div>
      <div id="vertrauen">
        <TrustSection />
        <PartnerSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>

      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
}
