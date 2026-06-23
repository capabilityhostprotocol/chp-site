import {
  capabilityCategories,
  adaptersByCategory,
  type CapabilityAdapter,
} from '../lib/capabilities';

/**
 * CapabilityConstellation — a visual map of the open adapter ecosystem. Each
 * category is a cluster; each adapter a node sized by how many capabilities it
 * declares. Shows the protocol's breadth at a glance instead of describing it.
 *
 * Static catalog data only — the capabilities the open adapters declare, never
 * a live readout of running systems. Deterministic layout (server component).
 */

const CATEGORY_LABEL: Record<string, string> = {
  network: 'Network & APIs',
  filesystem: 'Files & storage',
  ai: 'AI & inference',
  code: 'Code & DevOps',
  infra: 'Infrastructure',
  agents: 'Agent operations',
  cloud: 'Cloud',
  messaging: 'Messaging',
  data: 'Data & knowledge',
  platform: 'Platform',
  other: 'Other',
};

function nodeSize(count: number): number {
  // diameter, gently scaled so a 1-cap adapter still reads and a big one stands out
  return Math.round(Math.min(8 + count * 1.1, 20));
}

function Cluster({ category }: { category: string }) {
  const adapters: CapabilityAdapter[] = adaptersByCategory(category);
  return (
    <div className="border border-zinc-800/80 bg-zinc-900/40 rounded-xl p-5">
      <div className="flex items-baseline justify-between gap-2 mb-4">
        <h3 className="text-sm font-semibold text-zinc-200">
          {CATEGORY_LABEL[category] ?? category}
        </h3>
        <span className="font-mono text-[10px] uppercase text-zinc-400">
          {adapters.length} adapters
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {adapters.map((a) => {
          const d = nodeSize(a.capabilities.length);
          return (
            <a
              key={a.slug}
              href={`/adapters/${a.slug}`}
              title={`${a.name} · ${a.capabilities.length} capabilit${a.capabilities.length === 1 ? 'y' : 'ies'}`}
              className="block rounded-full border border-[color:var(--color-signal-cyan)]/40 bg-[color:var(--color-signal-cyan)]/[0.12] hover:bg-[color:var(--color-signal-cyan)]/30 hover:border-[color:var(--color-signal-cyan)] transition-colors"
              style={{ width: d, height: d }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function CapabilityConstellation() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-y border-zinc-800/60">
      <p className="eyebrow mb-3">The surface, mapped</p>
      <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
        One ecosystem of governed capabilities.
      </h2>
      <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl mb-10">
        Every node is an adapter in the open ecosystem, sized by the capabilities
        it declares — each one named, versioned, and evidence-wrapped. This is the
        surface the protocol can host, not a readout of anyone&apos;s running
        systems.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {capabilityCategories.map((c) => (
          <Cluster key={c} category={c} />
        ))}
      </div>
      <div className="flex items-center gap-5 mt-6 font-mono text-[11px] text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="block h-2 w-2 rounded-full border border-[color:var(--color-signal-cyan)]/40 bg-[color:var(--color-signal-cyan)]/[0.12]" />
          fewer capabilities
        </span>
        <span className="flex items-center gap-2">
          <span className="block h-4 w-4 rounded-full border border-[color:var(--color-signal-cyan)]/40 bg-[color:var(--color-signal-cyan)]/[0.12]" />
          more
        </span>
        <span>· hover a node for the adapter</span>
      </div>
    </section>
  );
}
