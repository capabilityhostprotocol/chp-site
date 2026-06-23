import type { ReactNode } from 'react';

type Tone = 'note' | 'key' | 'warning';

const TONES: Record<Tone, { border: string; dot: string; label: string }> = {
  note: {
    border: 'border-l-[color:var(--color-protocol-blue)]',
    dot: 'bg-[color:var(--color-protocol-blue)]',
    label: 'Note',
  },
  key: {
    border: 'border-l-[color:var(--color-signal-cyan)]',
    dot: 'bg-[color:var(--color-signal-cyan)]',
    label: 'Key point',
  },
  warning: {
    border: 'border-l-[color:var(--color-governance-amber)]',
    dot: 'bg-[color:var(--color-governance-amber)]',
    label: 'Worth being precise',
  },
};

/**
 * Callout — a labelled aside that breaks a wall of prose and flags the line
 * that matters (key point, honesty note, caveat).
 */
export default function Callout({
  children,
  tone = 'note',
  label,
}: {
  children: ReactNode;
  tone?: Tone;
  label?: string;
}) {
  const t = TONES[tone];
  return (
    <aside
      className={`my-8 border-l-2 ${t.border} bg-zinc-900/40 rounded-r-lg px-5 py-4`}
    >
      <p className="flex items-center gap-2 mb-2">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${t.dot}`} />
        <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-400">
          {label ?? t.label}
        </span>
      </p>
      <div className="text-sm text-zinc-300 leading-relaxed [&>p]:mb-0">
        {children}
      </div>
    </aside>
  );
}
