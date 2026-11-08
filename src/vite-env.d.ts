/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Calendly scheduling link for the booking card. Unset: the mock calendar shows. */
  readonly VITE_CALENDLY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
