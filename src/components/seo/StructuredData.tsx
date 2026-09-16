import { useEffect } from 'react';
import { site } from '../../content/site';
import { faqItems } from '../../content/faq';

/**
 * JSON-LD for the landing page.
 *
 * The FAQPage graph is generated from the same content module the FAQ section
 * renders, so the markup and the visible answers can never drift apart — which
 * is both a correctness matter and a Google requirement (structured data must
 * reflect what the user actually sees).
 */
function buildGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/icon-512.png`,
        image: `${site.url}/og-image.png`,
        description: site.description,
        founder: { '@id': `${site.url}/#founder` },
        areaServed: { '@type': 'Country', name: 'Deutschland' },
      },
      {
        '@type': 'Person',
        '@id': `${site.url}/#founder`,
        name: site.founder,
        jobTitle: 'Gründer',
        worksFor: { '@id': `${site.url}/#organization` },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#service`,
        name: site.name,
        url: site.url,
        parentOrganization: { '@id': `${site.url}/#organization` },
        serviceType: 'Immobilien- und Steuerstrategieberatung',
        areaServed: { '@type': 'Country', name: 'Deutschland' },
        /* TODO before go-live: add address, telephone and openingHours here once
           the Impressum data is supplied — they materially improve local results. */
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: site.locale,
        publisher: { '@id': `${site.url}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
}

export function StructuredData() {
  useEffect(() => {
    const id = 'structured-data';
    document.getElementById(id)?.remove();

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(buildGraph());
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return null;
}
