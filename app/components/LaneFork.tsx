const LANES = [
  {
    label: 'Agents',
    href: '/govern/agents',
    title: 'What my AI agents did',
    body: 'Capture every tool call as replayable, tamper-evident evidence.',
    status: 'Real today',
  },
  {
    label: 'Human decisions',
    href: '/govern/human-decisions',
    title: 'High-stakes approvals',
    body: 'Make consent, approval, and denial part of the record — not a side note.',
    status: 'Demonstrated',
  },
  {
    label: 'Products & services',
    href: '/govern/products',
    title: 'What my product exposes',
    body: 'Turn a capability surface into a governed, discoverable, provable boundary.',
    status: 'Demonstrated',
  },
  {
    label: 'Organizations',
    href: '/govern/organizations',
    title: 'Cross-host & cross-org work',
    body: 'Stitch one correlated, replayable trace across hosts and partners.',
    status: 'Demonstrated',
  },
];

export default function LaneFork() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
          Self-select
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-3 max-w-3xl">
          What do you need to govern?
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-10">
          The same evidence contract covers all four — a human approval and an
          agent&apos;s action are the same kind of governed, provable event.
          Agents are where it is easiest to start.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LANES.map((lane) => (
            <a
              key={lane.label}
              href={lane.href}
              className="group border border-zinc-800 bg-zinc-900/70 rounded-lg p-5 flex flex-col hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="font-mono text-xs text-zinc-500 uppercase">
                  {lane.label}
                </p>
                <span className="font-mono text-[10px] uppercase text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 whitespace-nowrap">
                  {lane.status}
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                {lane.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                {lane.body}
              </p>
              <span className="mt-4 text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                Explore -&gt;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
