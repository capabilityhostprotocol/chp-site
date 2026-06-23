import type { ReactNode } from 'react';

/**
 * PullQuote — a large, set-apart line that gives the eye a rest and elevates
 * the single sentence worth remembering.
 */
export default function PullQuote({
  children,
  cite,
}: {
  children: ReactNode;
  cite?: string;
}) {
  return (
    <figure className="my-12">
      <blockquote className="border-l-2 border-[color:var(--color-signal-cyan)] pl-6">
        <p className="text-xl md:text-2xl font-medium text-zinc-100 leading-snug">
          {children}
        </p>
      </blockquote>
      {cite && (
        <figcaption className="mt-3 pl-6 font-mono text-xs text-zinc-400">
          {cite}
        </figcaption>
      )}
    </figure>
  );
}
