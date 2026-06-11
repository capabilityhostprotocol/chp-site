const EXCHANGE_NODES = [
  {
    label: 'Human',
    title: 'Approve discount',
    detail: 'Consent, ownership, policy',
    accent: 'border-[color:var(--color-human-border)] text-zinc-100',
  },
  {
    label: 'Agents',
    title: 'Classify ticket',
    detail: 'Autonomy, context, trace',
    accent: 'border-[color:var(--color-agent-border)] text-violet-200',
  },
  {
    label: 'Product',
    title: 'Query inventory',
    detail: 'Inputs, outputs, lifecycle',
    accent: 'border-[color:var(--color-product-border)] text-blue-200',
  },
  {
    label: 'Business',
    title: 'Schedule service',
    detail: 'Policy, composition, result',
    accent: 'border-[color:var(--color-business-border)] text-amber-200',
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-border-subtle)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(161,161,170,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.25)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="font-mono text-xs text-zinc-500 mb-5 uppercase">
          Capability Host Protocol
        </p>
        <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] text-zinc-50 mb-7 max-w-4xl">
          Host what the world can do.
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed mb-9">
          CHP lets people, agents, products, services, processes, and
          organizations expose what they can do as composable, governable
          capabilities.
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-14">
          <a
            href="/map"
            className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors"
          >
            Map your first capability
          </a>
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/why-chp.md"
            className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
          >
            Read the white paper
          </a>
          <div className="font-mono text-sm text-zinc-500 px-1 select-all">
            pip install chp-core
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch">
          {EXCHANGE_NODES.map((node, index) => (
            <div key={node.label} className="contents">
              <div
                className={`min-h-36 rounded-lg border bg-[color:var(--color-host-background)] p-4 shadow-[var(--shadow-surface)] ${node.accent}`}
              >
                <p className="font-mono text-[11px] uppercase text-zinc-500 mb-3">
                  {node.label}
                </p>
                <h2 className="text-sm font-semibold text-zinc-100 mb-2">{node.title}</h2>
                <p className="text-xs text-zinc-500 leading-relaxed">{node.detail}</p>
              </div>
              {index < EXCHANGE_NODES.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:flex items-center justify-center text-zinc-700 font-mono text-lg"
                >
                  -&gt;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
