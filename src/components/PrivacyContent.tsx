import { Fragment } from 'react';
import { LegalBlock } from './LegalLayout';
import { inlineParts, privacyPolicy, type PrivacyOptions } from '../lib/privacy';

/**
 * The shared privacy policy (src/lib/privacy.ts) in this site's legal layout.
 * Same file on lp2, lp3 and B2B; the text itself lives in privacy.ts.
 */
export default function PrivacyContent(options: PrivacyOptions) {
  return (
    <>
      {privacyPolicy(options).map((section) => (
        <div key={section.id} id={section.id} className="scroll-mt-28">
          <LegalBlock heading={section.title}>
            {section.blocks.map((block, i) =>
              'h3' in block ? (
                <h3 key={i} className="pt-3 text-[17px] font-medium leading-[1.3]">
                  {block.h3}
                </h3>
              ) : 'ul' in block ? (
                <ul key={i}>
                  {block.ul.map((item, j) => (
                    <li key={j}>
                      <Inline text={item} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={i}>
                  <Inline text={block.p} />
                </p>
              )
            )}
          </LegalBlock>
        </div>
      ))}
    </>
  );
}

function Inline({ text }: { text: string }) {
  return (
    <>
      {inlineParts(text).map((part, i) => {
        if (part.type === 'br') return <br key={i} />;
        if (part.type === 'link') {
          return part.external ? (
            <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
              {part.text}
            </a>
          ) : (
            <a key={i} href={part.href}>
              {part.text}
            </a>
          );
        }
        if (part.type === 'settings') {
          // consent.ts opens the settings for any element with data-cookie-settings.
          return (
            <button key={i} type="button" data-cookie-settings className="font-medium underline underline-offset-4">
              {part.text}
            </button>
          );
        }
        return <Fragment key={i}>{part.text}</Fragment>;
      })}
    </>
  );
}
