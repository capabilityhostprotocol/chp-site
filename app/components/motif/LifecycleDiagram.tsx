// The canonical CHP lifecycle as a diagram, not a list. Six stages left-to-right
// (stacking on mobile); Govern is the emphasized boundary, Evidence the sealed output.
// Presentational, token-driven, no motion dependency.

type Stage = {
  n: string;
  name: string;
  body: string;
  accent?: 'boundary' | 'output';
};

const STAGES: Stage[] = [
  { n: '01', name: 'Declare', body: 'A capability, its contract, and the invariants that govern it.' },
  { n: '02', name: 'Discover', body: 'Found by an actor — filtered to what it is allowed to see.' },
  { n: '03', name: 'Invoke', body: 'A request crosses the boundary with a correlation context.' },
  { n: '04', name: 'Govern', body: 'Allowed, conditioned, or denied — before anything runs.', accent: 'boundary' },
  { n: '05', name: 'Execute', body: 'Only if the gates pass does the handler run.' },
  { n: '06', name: 'Evidence', body: 'A tamper-evident, replayable record — including denials.', accent: 'output' },
];

function stageClasses(accent: Stage['accent']): string {
  if (accent === 'boundary')
    return 'border-[color:var(--color-signal-cyan)]/50 bg-[color:var(--color-host-background)] shadow-[var(--shadow-glow-signal)]';
  if (accent === 'output')
    return 'border-[color:var(--color-policy-approved)]/40 bg-[color:var(--color-policy-approved)]/[0.05]';
  return 'border-zinc-800 bg-zinc-950/50';
}

export default function LifecycleDiagram() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {STAGES.map((s, i) => (
        <div key={s.n} className="relative flex">
          <div
            className={`w-full rounded-lg border p-4 flex flex-col ${stageClasses(s.accent)}`}
          >
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-mono text-[11px] text-[color:var(--color-signal-cyan)]">
                {s.n}
              </span>
              <span className="text-sm font-semibold text-zinc-100">{s.name}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{s.body}</p>
          </div>
          {i < STAGES.length - 1 && (
            <span
              aria-hidden="true"
              className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 font-mono text-zinc-600"
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
