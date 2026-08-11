import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import SectionShell from '../../components/SectionShell';
import SectionHeader from '../../components/SectionHeader';
import SurfacePanel from '../../components/SurfacePanel';
import ButtonLink from '../../components/ButtonLink';
import Badge from '../../components/Badge';

export const metadata: Metadata = {
  title: 'CHP Home — your home as a capability mesh',
  description:
    'CHP Home turns the devices, models, and storage you already own into a local-first mesh of governed capabilities — discoverable and invokable by agents, with approvals and evidence, on hardware you control. Built on the Capability Host Protocol.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/products/chp-home' },
};

export default function ChpHomeProductPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24">
          <div className="flex items-center gap-3 mb-4">
            <p className="eyebrow">Product · CHP Home</p>
            <Badge tone="signal">Preview</Badge>
          </div>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Your home, as a capability mesh.
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mb-4">
            The devices, models, and storage you already own become a local-first mesh of
            governed capabilities. An agent can discover what your home can do and invoke it —
            run a model on the machine with the GPU, back up to the NAS, summarize a document —
            with approvals and evidence, on hardware you control.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
            Not a cloud assistant that reaches into your life. A capability environment that
            is yours: nodes you enroll, capabilities you provision, a boundary that stays
            governed even when everything runs at home.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <ButtonLink href="/waitlist?product=chp-home">Join the waitlist</ButtonLink>
            <ButtonLink href="/capabilities" variant="secondary">
              Browse capabilities
            </ButtonLink>
          </div>
        </section>

        <SectionShell>
          <SectionHeader
            eyebrow="What participating in CHP makes possible"
            title="A mesh that governs itself."
          />
          <div className="grid gap-4 md:grid-cols-2 mt-8">
            <SurfacePanel>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">Enroll nodes safely</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Devices join by signed invitation — forged or replayed invites fail closed.
                Each node runs with scoped credentials, and the mesh detects the capabilities
                each one can offer.
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">Route work to the right machine</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                An agent reads live inventory — hardware, models, capabilities — and sends GPU
                work to the GPU, storage to the NAS, keeping heavy jobs on the node built for
                them.
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">Approve what matters</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Consequential actions pause for a human decision and resume exactly once —
                durable across restarts. Denials are first-class and recorded, not swallowed.
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">Keep the record at home</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Every invocation is evidenced on your own hardware — replayable, tamper-evident,
                and never leaving the mesh unless you send it.
              </p>
            </SurfacePanel>
          </div>
        </SectionShell>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Turn what you own into what your agents can do.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Join the waitlist for early access to CHP Home.
              </p>
            </div>
            <ButtonLink href="/waitlist?product=chp-home">Join the waitlist</ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
