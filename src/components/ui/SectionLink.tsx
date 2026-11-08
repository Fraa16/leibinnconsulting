import type { MouseEventHandler, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

type SectionLinkProps = {
  /** Section id on the homepage, without the hash. */
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  'aria-label'?: string;
};

/**
 * A link to a homepage section that works from every route.
 *
 * On the homepage it is a plain fragment link, so the browser's smooth scroll
 * and `scroll-padding-top` do the work. From /impressum or /datenschutz it
 * routes home and `ScrollManager` (App.tsx) lands on the section.
 */
export default function SectionLink({ to, children, ...rest }: SectionLinkProps) {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return (
      <a href={`#${to}`} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={{ pathname: '/', hash: `#${to}` }} {...rest}>
      {children}
    </Link>
  );
}
