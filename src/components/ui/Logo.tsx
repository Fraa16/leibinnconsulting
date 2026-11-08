import { cn } from '../../lib/cn';
import { LOCKUP_MARK, LOCKUP_NAME, LOCKUP_TAGLINE, LOCKUP_VIEWBOX } from './logo-paths';

type LogoProps = {
  className?: string;
};

/**
 * The brand lockup (wing mark, name, "Investment Consulting"), traced to
 * vector from the supplied artwork (see scripts/trace-logo.mjs).
 *
 * The redesign shows the lockup in one colour, white on navy, so every group
 * paints in `currentColor` and the surrounding text colour decides. Size it
 * by height; the width follows the 2000×267 viewBox.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      role="img"
      aria-label="Leibinn Consulting"
      fill="currentColor"
      className={cn('block w-auto', className)}
    >
      {[...LOCKUP_MARK, ...LOCKUP_NAME, ...LOCKUP_TAGLINE].map((d) => (
        <path key={d.length + d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
}
