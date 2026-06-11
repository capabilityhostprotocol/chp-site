const EXCHANGE_NODES = [
  {
    label: 'Hosts',
    title: 'Expose capabilities',
    detail: 'Typed manifests, versions, lifecycle, availability',
    accent: 'border-sky-500/40 text-sky-200',
  },
  {
    label: 'Agents',
    title: 'Invoke safely',
    detail: 'Permissioned calls with correlation and timeout policy',
    accent: 'border-emerald-500/40 text-emerald-200',
  },
  {
    label: 'Apps',
    title: 'Compose workflows',
    detail: 'Stable contracts across local, remote, and managed hosts',
    accent: 'border-amber-500/40 text-amber-200',
  },
  {
    label: 'Infra',
    title: 'Verify trust',
    detail: 'Evidence, replay, structured errors, conformance checks',
    accent: 'border-fuchsia-500/40 text-fuchsia-200',
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/70">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(161,161,170,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.25)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="font-mono text-xs text-zinc-500 mb-5 uppercase">
          Open protocol for governed AI capabilities
        </p>
        <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] text-zinc-50 mb-7 max-w-4xl">
          Capability Host Protocol
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed mb-9">
          A shared contract for hosts, agents, applications, and infrastructure to
          discover, invoke, govern, and audit capabilities across organizational
          and runtime boundaries.
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-14">
          <a
            href="/quickstart"
            className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors"
          >
            Start building
          </a>
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md"
            className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
          >
            Read the spec
          </a>
          <div className="font-mono text-sm text-zinc-500 px-1 select-all">
            pip install chp-core
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch">
          {EXCHANGE_NODES.map((node, index) => (
            <div key={node.label} className="contents">
              <div
                className={`min-h-36 rounded-lg border bg-zinc-950/80 p-4 ${node.accent}`}
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
