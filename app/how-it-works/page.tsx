import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import ConcreteCapabilityExample from '../components/ConcreteCapabilityExample';
import VisualGrammar from '../components/VisualGrammar';
import ProtocolArtifactSection from '../components/ProtocolArtifactSection';
import ProtocolGuaranteesSection from '../components/ProtocolGuaranteesSection';
import EvidenceFoundation from '../components/EvidenceFoundation';
import PositioningSection from '../components/PositioningSection';
import HomepageFAQ from '../components/HomepageFAQ';

export const metadata: Metadata = {
  title: 'How it works - Capability Host Protocol',
  description:
    'The mechanics of CHP: what a capability is, the manifest/invocation/outcome artifacts, the protocol guarantees, the evidence model, and what CHP is and is not.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="eyebrow mb-4">
            How it works
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            From a single capability to a replayable record.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            A walk through the mechanics: what a capability is, the contract a
            host declares, the guarantees the protocol makes, and the evidence
            every invocation leaves behind. For the formal surface see the{' '}
            <a href="/protocol" className="text-zinc-200 underline underline-offset-4 hover:text-zinc-50">
              protocol reference
            </a>
            ; for runnable code see the{' '}
            <a href="/examples" className="text-zinc-200 underline underline-offset-4 hover:text-zinc-50">
              examples
            </a>
            .
          </p>
        </section>

        <ConcreteCapabilityExample />
        <VisualGrammar />
        <ProtocolArtifactSection />
        <ProtocolGuaranteesSection />
        <EvidenceFoundation />
        <PositioningSection />
        <HomepageFAQ />

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Go deeper.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                Read the protocol surface, the conformance model, or the full
                documentation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/protocol"
                className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
              >
                Protocol surface
              </a>
              <a
                href="https://docs.capabilityhostprotocol.com"
                className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors whitespace-nowrap"
              >
                Documentation
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
