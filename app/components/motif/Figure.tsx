import type { ReactNode } from 'react';

/**
 * Figure — wraps any visual aid with an optional caption. Breaks out slightly
 * wider than prose (max-w-3xl articles) so diagrams have room to breathe.
 */
export default function Figure({
  children,
  caption,
  eyebrow,
  wide = false,
}: {
  children: ReactNode;
  caption?: ReactNode;
  eyebrow?: string;
  wide?: boolean;
}) {
  return (
    <figure className={`my-10 ${wide ? 'lg:-mx-16' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      {children}
      {caption && (
        <figcaption className="mt-3 text-sm text-zinc-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
