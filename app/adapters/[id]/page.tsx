import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import CodeCopyButton from '../../components/CodeCopyButton';
import { officialAdapters, displayName } from '../../lib/adapters';
import { getCapabilityAdapter, adapterSlug } from '../../lib/capabilities';

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return officialAdapters.map((a) => ({ id: adapterSlug(a.id) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const reg = officialAdapters.find((a) => adapterSlug(a.id) === id);
  const cap = getCapabilityAdapter(id);
  const name = cap?.name || (reg ? displayName(reg.id) : id);
  return {
    title: `${name} adapter - Capability Host Protocol`,
    description:
      reg?.description ||
      `The ${name} CHP adapter and the capabilities it exposes.`,
  };
}

export default async function AdapterDetailPage({ params }: Params) {
  const { id } = await params;
  const reg = officialAdapters.find((a) => adapterSlug(a.id) === id);
  const cap = getCapabilityAdapter(id);
  if (!reg && !cap) notFound();

  const name = cap?.name || (reg ? displayName(reg.id) : id);
  const category = cap?.category || reg?.category || 'other';
  const status = cap?.status || reg?.status || 'experimental';
  const pypi = reg?.pypi || cap?.pypi || `chp-adapter-${id}`;
  const description = reg?.description || '';
  const caps = cap?.capabilities || [];
  const install = `pip install ${pypi}`;

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <a
            href="/adapters"
            className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            &lt;- Adapters
          </a>
          <div className="flex items-center gap-3 mt-4 mb-5">
            <h1 className="text-4xl md:text-5xl font-semibold text-zinc-50">
              {name}
            </h1>
            <span className="font-mono text-[10px] uppercase text-zinc-500 border border-zinc-700 rounded px-2 py-1">
              {status}
            </span>
            <span className="font-mono text-[10px] uppercase text-zinc-600">
              {category}
            </span>
          </div>
          {description && (
            <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-6">
              {description}
            </p>
          )}
          <div className="flex items-center gap-2 rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-field)]/70 px-3 py-2 max-w-md">
            <code className="flex-1 truncate font-mono text-xs text-zinc-300">
              {install}
            </code>
            <CodeCopyButton code={install} label={`${name} install command`} />
          </div>
          <p className="font-mono text-xs text-zinc-600 mt-3">
            Auto-discovered through the <code>chp.adapters</code> entry point — no
            host config needed.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800/60">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-2">
            Capabilities
          </p>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-8">
            What this adapter exposes.
          </h2>
          {caps.length ? (
            <div className="grid md:grid-cols-2 gap-3">
              {caps.map((c) => (
                <div
                  key={c.id}
                  className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <code className="font-mono text-sm text-zinc-100">
                      {c.method}
                    </code>
                    {c.version && (
                      <span className="font-mono text-[10px] text-zinc-600">
                        v{c.version}
                      </span>
                    )}
                  </div>
                  {c.description && (
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {c.description}
                    </p>
                  )}
                  <code className="block mt-2 font-mono text-[10px] text-zinc-700 truncate">
                    {c.id}
                  </code>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              Capability details for this adapter are being catalogued.
            </p>
          )}
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <a
            href="/capabilities"
            className="text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            See the full capability catalog -&gt;
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
