import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { FadeInUp } from './FadeInUp';

export default function QuickContactCTASection() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = scrolled + rect.top;
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const offset = (scrolled - elementTop) * 0.3;
        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-[#F7F7F7] py-12 md:py-14">
      <div className="max-w-[1200px] mx-auto px-[6px] md:px-6">
        <FadeInUp delay={0.1}>
          <div
            ref={sectionRef}
            className="relative overflow-hidden rounded-3xl bg-[#1F2841] shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
          >
            <div
              className="absolute inset-0 opacity-[0.08] bg-cover bg-center transition-transform duration-0"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)',
                backgroundPosition: 'center',
                transform: `translateY(${parallaxOffset}px)`
              }}
            />

            <div className="relative z-10 grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 px-6 md:px-10 py-8 md:py-9">
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 leading-tight">
                  Investieren leicht gemacht:
                </h2>

                <p className="text-sm md:text-base text-white/90 mb-4 leading-relaxed">
                  Wir übernehmen den Aufwand, Sie wählen den passenden Moment zum Starten.
                </p>

                <div className="flex flex-wrap gap-2.5 text-sm text-white/80">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#75AED4]" />
                    Unverbindlich
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#75AED4]" />
                    Kostenlos
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#75AED4]" />
                    15 Minuten
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <form className="space-y-3">
                  <div>
                    <label htmlFor="quick-firstname" className="block text-xs md:text-sm font-medium text-white/90 mb-1">
                      Vorname
                    </label>
                    <input
                      type="text"
                      id="quick-firstname"
                      name="firstname"
                      placeholder="Max"
                      className="w-full rounded-xl border-2 border-transparent bg-white/95 px-4 py-2.5 text-sm md:text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 outline-none focus:border-[#75AED4] focus:ring-2 focus:ring-[#75AED4]/40 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="quick-lastname" className="block text-xs md:text-sm font-medium text-white/90 mb-1">
                      Nachname
                    </label>
                    <input
                      type="text"
                      id="quick-lastname"
                      name="lastname"
                      placeholder="Mustermann"
                      className="w-full rounded-xl border-2 border-transparent bg-white/95 px-4 py-2.5 text-sm md:text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 outline-none focus:border-[#75AED4] focus:ring-2 focus:ring-[#75AED4]/40 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="quick-email" className="block text-xs md:text-sm font-medium text-white/90 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="quick-email"
                      name="email"
                      placeholder="name@beispiel.de"
                      className="w-full rounded-xl border-2 border-transparent bg-white/95 px-4 py-2.5 text-sm md:text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 outline-none focus:border-[#75AED4] focus:ring-2 focus:ring-[#75AED4]/40 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#75AED4] px-6 py-3.5 text-sm md:text-base font-semibold text-white shadow-lg hover:bg-[#5c9dc4] hover:shadow-xl transition-all duration-200"
                  >
                    Jetzt unverbindliche Beratung anfordern
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
