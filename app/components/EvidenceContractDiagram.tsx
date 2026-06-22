const ACTORS = [
  { label: 'Human', action: 'Approve discount', accent: 'border-[color:var(--color-human-border)]' },
  { label: 'Agent', action: 'Run a tool call', accent: 'border-[color:var(--color-agent-border)]' },
  { label: 'Product', action: 'Query inventory', accent: 'border-[color:var(--color-product-border)]' },
];

const STAGES = ['Declared', 'Governed', 'Provable', 'Replayable'];

export default function EvidenceContractDiagram() {
  return (
    <div className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)] p-5 md:p-6 shadow-[var(--shadow-surface)]">
      <div className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.4fr)] md:items-center">
        {/* Actors */}
        <div className="space-y-2.5">
          {ACTORS.map((a) => (
            <div
              key={a.label}
              className={`rounded-md border ${a.accent} bg-[color:var(--color-host-background)] px-3 py-2.5`}
            >
              <p className="font-mono text-[10px] uppercase text-zinc-500">{a.label}</p>
              <p className="text-sm text-zinc-200">{a.action}</p>
            </div>
          ))}
        </div>

        {/* Boundary connector */}
        <div className="flex flex-col items-center justify-center py-2 md:py-0">
          <div className="font-mono text-[10px] uppercase text-zinc-600 md:[writing-mode:vertical-rl] md:rotate-180">
            capability boundary
          </div>
          <div aria-hidden="true" className="hidden md:block h-24 w-px bg-zinc-700 my-2" />
          <div aria-hidden="true" className="text-zinc-700 font-mono md:hidden">-&gt;</div>
        </div>

        {/* One evidence chain */}
        <div>
          <p className="font-mono text-[10px] uppercase text-zinc-500 mb-2.5">
            One evidence event
          </p>
          <div className="flex flex-wrap items-stretch gap-2">
            {STAGES.map((s, i) => (
              <div key={s} className="contents">
                <div className="rounded-md border border-zinc-700 bg-[color:var(--color-host-background)] px-3 py-2 flex-1 min-w-[88px] text-center">
                  <span className="text-xs text-zinc-300">{s}</span>
                </div>
                {i < STAGES.length - 1 && (
                  <div aria-hidden="true" className="flex items-center text-zinc-700 font-mono text-xs">
                    -&gt;
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed mt-3">
            SHA256-chained · correlated · queryable by replay
          </p>
        </div>
      </div>

      <p className="font-mono text-xs text-zinc-600 mt-5 pt-4 border-t border-[color:var(--color-border-subtle)]">
        Whoever takes the action, it becomes the same declared, governed,
        provable event.
      </p>
    </div>
  );
}
