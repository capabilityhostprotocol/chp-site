import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import {
  capabilityCategories,
  adaptersByCategory,
} from '../lib/capabilities';

export const metadata: Metadata = {
  title: 'Capabilities - Capability Host Protocol',
  description:
    'The capability surface CHP exposes today — governed, evidence-wrapped, invokable units across network, files, AI, cloud, code, data, and more, grouped by category.',
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
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-4">
            Capabilities
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-50 mb-6 max-w-4xl">
            What CHP can do — declared, governed, provable.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Every capability below is a named, versioned, evidence-wrapped unit an
            agent or application can invoke through a host. They come from the open
            adapter ecosystem — install one and the host discovers its capabilities
            automatically.
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
                  className="group border border-zinc-800 bg-zinc-900/70 rounded-lg p-5 hover:border-zinc-600 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-base font-semibold text-zinc-100">
                      {a.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5">
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
                      <span className="font-mono text-[11px] text-zinc-600 px-1 py-0.5">
                        +{a.capabilities.length - 8} more
                      </span>
                    )}
                  </div>
                  <span className="mt-4 inline-block text-sm text-zinc-500 group-hover:text-zinc-100 transition-colors">
                    {a.name} capabilities -&gt;
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Machine-readable, too.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
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
