/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional override; defaults to the shared 60-minute Calendly event. */
  readonly VITE_CALENDLY_URL?: string;
  /** Ad tracking, loaded only after consent. Empty = not loaded. */
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_LINKEDIN_PARTNER_ID?: string;
  readonly VITE_LINKEDIN_CONVERSION_LEAD?: string;
  readonly VITE_LINKEDIN_CONVERSION_BOOKING?: string;
  /** Central lead service (forms and consent log), e.g. https://leads.leibinn-consulting.de */
  readonly VITE_LEADS_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
