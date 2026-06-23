'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import EvidenceChain from './EvidenceChain';
import { useReducedMotion } from '../../lib/motion';

/**
 * ScrollStory — the scrollytelling spine. One narrative told on scroll:
 * an action crosses the boundary → emits evidence → events hash-chain →
 * the session replays. Sticky visual on lg; stacked + static under reduced
 * motion or on mobile (each step renders its own visual inline).
 */

const CYAN = 'var(--color-signal-cyan)';

function BoundaryVisual() {
  const actors = ['Human', 'Agent', 'Product'];
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6">
      <p className="eyebrow mb-6">intent → effect</p>
      <div className="flex items-stretch gap-4">
        <div className="flex flex-col gap-2 flex-1">
          {actors.map((a) => (
            <div
              key={a}
              className="rounded-md border border-zinc-700 bg-[color:var(--color-host-background)] px-3 py-2 text-xs text-zinc-300"
            >
              {a}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center px-2">
          <div
            className="w-px flex-1 my-1"
            style={{
              background: `linear-gradient(to bottom, transparent, ${CYAN}, transparent)`,
              boxShadow: `0 0 16px ${CYAN}`,
            }}
          />
          <span className="font-mono text-[9px] uppercase text-zinc-600 my-2 [writing-mode:vertical-rl] rotate-180">
            boundary
          </span>
          <div
            className="w-px flex-1 my-1"
            style={{
              background: `linear-gradient(to bottom, transparent, ${CYAN}, transparent)`,
              boxShadow: `0 0 16px ${CYAN}`,
            }}
          />
        </div>
        <div className="flex items-center justify-center flex-1">
          <div
            className="rounded-md border px-3 py-2 text-xs text-zinc-200 w-full text-center"
            style={{ borderColor: `${CYAN}66`, background: 'rgba(40,217,242,0.06)' }}
          >
            governed effect
          </div>
        </div>
      </div>
    </div>
  );
}

function EvidenceEventVisual() {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-[color:var(--color-surface-900)] overflow-hidden">
      <div className="border-b border-zinc-800/80 px-4 py-2 font-mono text-[11px] text-zinc-500">
        evidence event
      </div>
      <pre className="p-4 font-mono text-xs leading-relaxed text-zinc-300 overflow-x-auto">
        <code>{`{
  "event_type": "execution_completed",
  "capability_id": "schedule_technician",
  "correlation": { "id": "session-abc" },
  "outcome": "success",
  "subject": "agent://planner",
  "hash": "9c7e…",
  "redacted": true
}`}</code>
      </pre>
    </div>
  );
}

function ReplayVisual() {
  const ticks = [
    { label: 'start', tone: 'cyan' },
    { label: 'read', tone: 'zinc' },
    { label: 'approve', tone: 'green' },
    { label: 'denied', tone: 'red' },
    { label: 'done', tone: 'cyan' },
  ] as const;
  const color = (t: string) =>
    t === 'red'
      ? 'var(--color-critical-red)'
      : t === 'green'
        ? 'var(--color-operational-green)'
        : t === 'cyan'
          ? CYAN
          : 'var(--color-graphite-500)';
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6">
      <p className="eyebrow mb-6">correlation: session-abc</p>
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-700" />
        {ticks.map((t) => (
          <div key={t.label} className="relative flex flex-col items-center gap-2">
            <div
              className="h-3 w-3 rounded-full border-2"
              style={{ borderColor: color(t.tone), background: 'var(--color-bg-page)' }}
            />
            <span className="font-mono text-[10px] text-zinc-500">{t.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[11px] text-zinc-600">
        one id · the actual ordered sequence, replayed
      </p>
    </div>
  );
}

type Stage = { num: string; title: string; body: string; visual: ReactNode };

const STAGES: Stage[] = [
  {
    num: '01',
    title: 'An action crosses the boundary.',
    body: 'A person, an agent, or a product invokes a capability. The moment it goes from intent to effect is the capability boundary — the one place to govern and prove what happens.',
    visual: <BoundaryVisual />,
  },
  {
    num: '02',
    title: 'It emits a structured event.',
    body: 'The crossing produces a typed evidence event — outcome, subject, correlation — every time, by contract. Not a log someone remembered to write.',
    visual: <EvidenceEventVisual />,
  },
  {
    num: '03',
    title: 'Events hash-chain.',
    body: 'Each event hashes the one before it. Alter one and every link after it breaks — tamper-evidence you can verify. Try it.',
    visual: <EvidenceChain />,
  },
  {
    num: '04',
    title: 'The whole session replays.',
    body: 'One correlation id reconstructs the causal sequence across tools, agents, and hosts — in order, on demand. Denials and approvals included.',
    visual: <ReplayVisual />,
  },
];

export default function ScrollStory() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <section className="border-b border-zinc-800/60">
      <div className="band">
        <p className="eyebrow mb-4">The proof, end to end</p>
        <h2 className="display-2 text-zinc-100 mb-3 max-w-3xl">
          From one action to a record you can defend.
        </h2>
        <p className="lede max-w-2xl mb-14 text-zinc-400">
          The same four steps, whoever acts — scroll through them.
        </p>

        <div className="grid lg:grid-cols-2 lg:gap-12">
          {/* steps */}
          <div>
            {STAGES.map((s, i) => (
              <div
                key={s.num}
                data-idx={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="lg:min-h-[80vh] flex flex-col justify-center py-8 lg:py-0"
              >
                <div
                  className={`transition-opacity duration-500 ${
                    reduced || active === i ? 'opacity-100' : 'lg:opacity-40'
                  }`}
                >
                  <p className="font-mono text-sm text-[color:var(--color-signal-cyan)] mb-3">
                    {s.num}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-3 max-w-md">
                    {s.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed max-w-md">
                    {s.body}
                  </p>
                  {/* inline visual: mobile + reduced-motion */}
                  <div className="mt-6 lg:hidden">{s.visual}</div>
                </div>
              </div>
            ))}
          </div>

          {/* sticky visual pane: lg + motion */}
          {!reduced && (
            <div className="hidden lg:block">
              <div className="sticky top-0 h-screen flex items-center">
                <div className="relative w-full">
                  {STAGES.map((s, i) => (
                    <div
                      key={s.num}
                      className={`transition-opacity duration-500 ${
                        active === i
                          ? 'opacity-100'
                          : 'opacity-0 pointer-events-none absolute inset-0'
                      }`}
                    >
                      {s.visual}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
