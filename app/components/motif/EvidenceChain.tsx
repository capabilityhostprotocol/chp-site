'use client';

import { useState } from 'react';

type ChainEvent = { seq: string; type: string; hash: string };

const DEFAULT_EVENTS: ChainEvent[] = [
  { seq: '01', type: 'execution_started', hash: 'a3f1' },
  { seq: '02', type: 'approval_granted', hash: '9c7e' },
  { seq: '03', type: 'execution_completed', hash: '1d04' },
  { seq: '04', type: 'evidence_sealed', hash: 'e8b2' },
];

/**
 * EvidenceChain — the signature motif. Hash-labelled evidence blocks joined by
 * chain-links: each block hashes the one before it. Interactive mode lets a
 * visitor "tamper" a block and watch every link after it break — the visceral
 * proof of tamper-evidence. Fully usable without motion (it is state, not
 * animation); links are SVG, not canvas.
 */
export default function EvidenceChain({
  events = DEFAULT_EVENTS,
  interactive = true,
}: {
  events?: ChainEvent[];
  interactive?: boolean;
}) {
  const [tampered, setTampered] = useState<number | null>(null);
  const broken = (i: number) => tampered !== null && i >= tampered;

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 mb-5">
        <p className="eyebrow">evidence chain · tamper-evident</p>
        {interactive && (
          <button
            type="button"
            onClick={() => setTampered(null)}
            disabled={tampered === null}
            className="font-mono text-[11px] text-zinc-500 hover:text-zinc-200 disabled:opacity-40 disabled:hover:text-zinc-500 transition-colors"
          >
            reset ↺
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-stretch gap-y-4">
        {events.map((e, i) => (
          <div key={e.seq} className="flex items-stretch">
            <button
              type="button"
              onClick={interactive ? () => setTampered(i) : undefined}
              aria-label={
                interactive ? `Tamper with event ${e.seq}` : undefined
              }
              className={`group relative w-[120px] text-left rounded-lg border px-3 py-2.5 transition-colors ${
                broken(i)
                  ? 'border-[color:var(--color-critical-red)]/70 bg-[color:var(--color-critical-red)]/[0.06]'
                  : 'border-[color:var(--color-signal-cyan)]/40 bg-[color:var(--color-host-background)]'
              } ${interactive ? 'cursor-pointer hover:border-[color:var(--color-signal-cyan)]' : 'cursor-default'} ${
                tampered === i ? 'ring-1 ring-[color:var(--color-critical-red)]' : ''
              }`}
            >
              <p className="font-mono text-[10px] uppercase text-zinc-500">
                evt {e.seq}
              </p>
              <p className="text-[11px] text-zinc-300 leading-tight mt-1 mb-2 break-words">
                {e.type}
              </p>
              <p
                className={`font-mono text-[11px] ${
                  broken(i)
                    ? 'text-[color:var(--color-critical-red)] line-through'
                    : 'text-[color:var(--color-signal-cyan)]'
                }`}
              >
                #{broken(i) ? '????' : e.hash}
              </p>
            </button>

            {i < events.length - 1 && (
              <span
                aria-hidden="true"
                className="flex items-center px-1.5"
                title={broken(i) ? 'link broken' : 'hash-linked'}
              >
                <ChainLink broken={broken(i)} />
              </span>
            )}
          </div>
        ))}
      </div>

      <p
        className={`mt-5 font-mono text-xs ${
          tampered === null
            ? 'text-zinc-500'
            : 'text-[color:var(--color-critical-red)]'
        }`}
      >
        {tampered === null
          ? 'each block hashes the one before it — chain verifies ✓'
          : `tamper detected at evt ${events[tampered].seq} — every link after it breaks ✕`}
      </p>
      {interactive && tampered === null && (
        <p className="mt-1 font-mono text-[11px] text-zinc-600">
          tip: click a block to alter it
        </p>
      )}
    </div>
  );
}

function ChainLink({ broken }: { broken: boolean }) {
  const color = broken
    ? 'var(--color-critical-red)'
    : 'var(--color-signal-cyan)';
  return (
    <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
      <rect
        x="2.5"
        y="5"
        width="11"
        height="6"
        rx="3"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity={broken ? 0.9 : 0.55}
      />
      <rect
        x={broken ? '14.5' : '12.5'}
        y="5"
        width="11"
        height="6"
        rx="3"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity={broken ? 0.9 : 0.55}
        strokeDasharray={broken ? '2 2' : undefined}
      />
    </svg>
  );
}
