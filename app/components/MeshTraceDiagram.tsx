const HOSTS = [
  { label: 'Laptop', event: 'plan.create' },
  { label: 'Server', event: 'retrieval.query' },
  { label: 'Edge device', event: 'sensor.read' },
  { label: 'Partner host', event: 'claim.decide' },
];

export default function MeshTraceDiagram() {
  return (
    <div className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)] p-5 md:p-6 shadow-[var(--shadow-surface)]">
      <p className="font-mono text-[10px] uppercase text-zinc-400 mb-4">
        correlation_id: session-abc
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-5">
        {HOSTS.map((h) => (
          <div
            key={h.label}
            className="rounded-md border border-zinc-700 bg-[color:var(--color-host-background)] px-3 py-2.5"
          >
            <p className="font-mono text-[10px] uppercase text-zinc-400">{h.label}</p>
            <p className="font-mono text-xs text-zinc-300 mt-1">{h.event}</p>
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="flex items-center justify-center text-zinc-500 font-mono text-sm mb-5">
        &#8595;&nbsp;&nbsp;gateway stitches by correlation&nbsp;&nbsp;&#8595;
      </div>

      <div className="rounded-md border border-zinc-600 bg-[color:var(--color-host-background)] px-4 py-3">
        <p className="font-mono text-[10px] uppercase text-zinc-400 mb-2">
          one ordered replay
        </p>
        <p className="font-mono text-xs text-zinc-400 leading-relaxed">
          plan.create → retrieval.query → sensor.read → claim.decide
        </p>
      </div>

      <p className="font-mono text-xs text-zinc-400 mt-5 pt-4 border-t border-[color:var(--color-border-subtle)]">
        Four hosts, one causal thread, a single replayable timeline.
      </p>
    </div>
  );
}
