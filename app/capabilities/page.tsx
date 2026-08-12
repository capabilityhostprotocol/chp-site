import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import {
  capabilityCategories,
  adaptersByCategory,
  capabilityAdapters,
} from '../lib/capabilities';
import ItemListLd from '../components/ItemListLd';
import SessionInspector from '../components/motif/SessionInspector';
import LifecycleDiagram from '../components/motif/LifecycleDiagram';

export const metadata: Metadata = {
  title: 'Capabilities - Capability Host Protocol',
  description:
    'What a capability is, how it differs from an API, and its lifecycle — declared, discovered, invoked, governed, executed, evidenced — plus the live catalog of governed capabilities CHP exposes across network, files, AI, cloud, code, and data.',
};

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

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen">
      <ItemListLd
        name="CHP capabilities by adapter"
        items={capabilityAdapters.map((a) => ({
          name: a.name,
          url: `https://capabilityhostprotocol.com/adapters/${a.slug}`,
          description: `${a.capabilities.length} governed capabilities (${a.category})`,
        }))}
      />
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">
            Capabilities
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            What CHP can do — declared, governed, provable.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            A capability is a named, versioned unit of behavior that software declares
            it can do — with a contract, a risk tier, and the invariants that govern it.
            An agent or application discovers it, invokes it through a host, and the host
            decides whether that invocation is allowed before anything runs. Every result —
            success or denial — becomes replayable, tamper-evident evidence. The catalog
            below comes from the open adapter ecosystem: install one and the host discovers
            its capabilities automatically.
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {capabilityCategories.map((c) => (
              <a
                key={c}
                href={`#${c}`}
                className="font-mono text-[11px] uppercase border border-zinc-800 rounded px-2.5 py-1 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
              >
                {CATEGORY_LABEL[c] ?? c}
              </a>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800/60">
          <p className="eyebrow mb-4">The capability lifecycle</p>
          <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
            Declared, discovered, invoked — and governed at the boundary.
          </h2>
          <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
            The same six steps run whether a capability is called locally or across a mesh.
            It is the point where intent becomes effect — and the point where CHP puts a
            governed boundary.
          </p>
          <LifecycleDiagram />
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800/60">
          <p className="eyebrow mb-4">Capability vs. API</p>
          <h2 className="display-2 text-zinc-100 mb-8 max-w-3xl">
            A capability is not an API call.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="surface-flat p-5">
              <h3 className="text-base font-semibold text-zinc-300 mb-2">An API endpoint</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                A way to call a function over the network. It tells you the shape of the
                request. It does not, by itself, tell you who may call it, under what
                conditions it is allowed, or what actually happened when they did.
              </p>
            </div>
            <div className="surface-raised p-5">
              <h3 className="text-base font-semibold text-zinc-100 mb-2">A CHP capability</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                A governed contract. It declares its authority and invariants, every
                invocation is checked against policy before it runs, and every outcome —
                allowed or denied — becomes evidence. The same capability can be reused and
                moved across environments without rewriting the integration.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800/60">
          <p className="eyebrow mb-4">What an invocation leaves behind</p>
          <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
            Inspect a real session.
          </h2>
          <p className="text-zinc-400 leading-relaxed max-w-3xl mb-8">
            A denial, a human approval, and a completed run — one hash-chained, replayable
            session. Open the denial to see its reason code; tamper a block and watch the
            chain break.
          </p>
          <SessionInspector />
        </section>

        {capabilityCategories.map((category) => (
          <section
            key={category}
            id={category}
            className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800/60 scroll-mt-20"
          >
            <h2 className="text-2xl font-semibold text-zinc-100 mb-8">
              {CATEGORY_LABEL[category] ?? category}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {adaptersByCategory(category).map((a) => (
                <a
                  key={a.slug}
                  href={`/adapters/${a.slug}`}
                  className="group surface-raised hover-lift p-5 hover:border-zinc-600 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-base font-semibold text-zinc-100">
                      {a.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase text-zinc-400 border border-zinc-800 rounded px-1.5 py-0.5">
                      {a.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {a.capabilities.slice(0, 8).map((c) => (
                      <span
                        key={c.id}
                        className="font-mono text-[11px] text-zinc-400 bg-zinc-950/70 border border-zinc-800 rounded px-2 py-0.5"
                      >
                        {c.method}
                      </span>
                    ))}
                    {a.capabilities.length > 8 && (
                      <span className="font-mono text-[11px] text-zinc-400 px-1 py-0.5">
                        +{a.capabilities.length - 8} more
                      </span>
                    )}
                  </div>
                  <span className="mt-4 inline-block text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                    {a.name} capabilities →
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Machine-readable, too.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                This catalog is published for agents at{' '}
                <code className="font-mono text-zinc-300">/capabilities.txt</code>{' '}
                and{' '}
                <code className="font-mono text-zinc-300">
                  /.well-known/capabilities.json
                </code>
                .
              </p>
            </div>
            <a
              href="/adapters"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              Browse adapters
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
