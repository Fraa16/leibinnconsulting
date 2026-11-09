import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import App from './App.tsx';
import { initConsent } from './lib/consent';
import './index.css';

// Cookie-free visitor statistics (no consent needed), as on the main site.
inject();

// Cookie banner, Meta Pixel and LinkedIn Insight Tag (only after consent).
// IDs come from the Vercel project settings; without them nothing is loaded.
initConsent({
  site: 'lp3',
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID,
  linkedinPartnerId: import.meta.env.VITE_LINKEDIN_PARTNER_ID,
  linkedinConversionLead: import.meta.env.VITE_LINKEDIN_CONVERSION_LEAD,
  linkedinConversionBooking: import.meta.env.VITE_LINKEDIN_CONVERSION_BOOKING,
  leadsApiUrl: import.meta.env.VITE_LEADS_API_URL,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
