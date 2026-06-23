import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import CodePanel from '../../components/CodePanel';
import { ARTIFACT_EXAMPLE } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Govern products & services - Capability Host Protocol',
  description:
    'Turn what your product can do into a governed, discoverable, provable boundary — typed manifests, versions, permissions, and evidence. A demonstration of how CHP would work; built with design partners.',
};

export default function GovernProductsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">
            Govern · Products &amp; services
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Turn what your product can do into a governed boundary.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Every product already exposes abilities — query inventory, schedule
            service, generate an invoice. CHP lets you publish them as capabilities
            with stable identity, versions, permission requirements, and evidence,
            so agents and applications can call them through a contract that
            doesn&apos;t change quietly underneath them.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div>
              <p className="eyebrow mb-3">
                How it would work
              </p>
              <h2 className="display-2 text-zinc-100 mb-4">
                A capability surface, declared.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                A host manifest declares each capability — id, version, modes, the
                evidence it emits, and its policy. Callers discover what is
                available and how to call it safely; every invocation leaves a
                replayable record. The HTTP, OpenAPI, and GraphQL adapters already
                wrap existing APIs as CHP capabilities.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Demonstrated, not yet shipped: the manifest, invocation, and
                evidence primitives exist today. The managed product surface and
                its lifecycle tooling are what we build with a design partner.
              </p>
            </div>
            <CodePanel code={ARTIFACT_EXAMPLE} label="host manifest" language="json" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Exposing capabilities to agents?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                If callers depend on what your product can do, a governed boundary
                keeps that contract stable and provable. Bring the surface and we
                will map it onto the protocol with you.
              </p>
            </div>
            <a
              href="/design-partners"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              Build it with us
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
