import type { Metadata } from 'next';
import LifecycleDiagram from '../components/motif/LifecycleDiagram';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import ConcreteCapabilityExample from '../components/ConcreteCapabilityExample';
import VisualGrammar from '../components/VisualGrammar';
import ProtocolArtifactSection from '../components/ProtocolArtifactSection';
import ProtocolGuaranteesSection from '../components/ProtocolGuaranteesSection';
import EvidenceFoundation from '../components/EvidenceFoundation';
import PositioningSection from '../components/PositioningSection';
import HomepageFAQ from '../components/HomepageFAQ';
import { HOMEPAGE_FAQS } from '../lib/content';

const URL = 'https://capabilityhostprotocol.com/how-it-works';

export const metadata: Metadata = {
  title: 'How it works - Capability Host Protocol',
  description:
    'The mechanics of CHP: what a capability is, the manifest/invocation/outcome artifacts, the protocol guarantees, the evidence model, and what CHP is and is not.',
  alternates: { canonical: URL },
};

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How CHP works: from a single capability to a replayable record',
    description:
      'The mechanics of CHP: what a capability is, the manifest/invocation/outcome artifacts, the protocol guarantees, the evidence model, and what CHP is and is not.',
    author: { '@type': 'Organization', name: 'Capability Host Protocol', url: 'https://capabilityhostprotocol.com' },
    publisher: { '@type': 'Organization', name: 'Capability Host Protocol' },
    mainEntityOfPage: URL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://capabilityhostprotocol.com' },
      { '@type': 'ListItem', position: 2, name: 'How it works', item: URL },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {JSON_LD.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
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

        <section className="max-w-6xl mx-auto px-6 py-10 border-y border-zinc-800/60">
          <p className="eyebrow mb-6">The lifecycle at a glance</p>
          <LifecycleDiagram />
        </section>

        <ConcreteCapabilityExample />
        <VisualGrammar />
        <ProtocolArtifactSection />
        <ProtocolGuaranteesSection />
        <EvidenceFoundation />
        <PositioningSection />
        <HomepageFAQ />

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Go deeper.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
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
