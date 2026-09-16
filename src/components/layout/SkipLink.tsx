/**
 * Lets keyboard and screen-reader users jump past the header straight to the
 * content. Visually hidden until it receives focus.
 */
export function SkipLink() {
  return (
    <a
      href="#hauptinhalt"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-primary-600 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white focus:shadow-panel"
    >
      Zum Inhalt springen
    </a>
  );
}
