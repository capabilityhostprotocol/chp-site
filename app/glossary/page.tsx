import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import Glyph, { type GlyphName } from '../components/motif/Glyph';

export const metadata: Metadata = {
  title: 'Glossary — Capability Host Protocol',
  description:
    'Definitions of the core terms in the Capability Host Protocol: capability, capability boundary, host, invocation, evidence, hash chain, correlation, denial, replay, conformance, and more.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/glossary' },
};

type Term = {
  term: string;
  short: string;
  body: string;
  href?: string;
  hrefLabel?: string;
};

// Each primitive gets its identifying glyph — wayfinding marks that frame the
// vocabulary visually.
const TERM_GLYPHS: Record<string, GlyphName> = {
  Capability: 'capability',
  'Capability boundary': 'boundary',
  'Capability host': 'host',
  Invocation: 'invocation',
  Evidence: 'evidence',
  'Hash chain': 'chain',
  Correlation: 'correlation',
  Denial: 'denial',
  Replay: 'replay',
  Conformance: 'conformance',
  'Capability descriptor': 'descriptor',
  Adapter: 'adapter',
  'capabilities.txt': 'discovery',
};

const TERMS: Term[] = [
  {
    term: 'Capability',
    short: 'A named, invokable unit of useful work.',
    body: 'The atomic thing a system can do — schedule_technician, transfer_funds, approve_discount, read_file. In CHP a capability is declared with a stable id, a version, an input schema, and the policy it requires, before anyone calls it. Capabilities are what the protocol governs and proves.',
    href: '/capabilities',
    hrefLabel: 'Browse the capabilities catalog',
  },
  {
    term: 'Capability boundary',
    short: 'The line an action crosses to go from intent into effect.',
    body: 'The moment an invocation stops being a decision and becomes a real effect on the world. It is the same line regardless of who initiated it — a person, an agent, or a product — which is why it is the right place to declare, govern, and prove what happens. Governance lives at the boundary, not in the model.',
    href: '/blog/the-capability-boundary',
    hrefLabel: 'Read: the capability boundary',
  },
  {
    term: 'Capability host',
    short: 'Anything that exposes and runs capabilities under the protocol.',
    body: 'A host can be a person approving something, a business process, a device, an application, or another vendor’s agent framework. The host declares its capabilities, enforces policy at the boundary, and emits evidence. CHP is host-agnostic by design — that breadth is why it is a protocol rather than a feature.',
    href: '/how-it-works',
    hrefLabel: 'How hosts work',
  },
  {
    term: 'Invocation',
    short: 'A single attempt to call a capability.',
    body: 'Carried in an InvocationEnvelope with the capability id, the inputs, the subject making the call, and a correlation that ties it to everything else in the session. Every invocation produces an outcome — success, denial, or unavailable — and an evidence event, every time.',
  },
  {
    term: 'Evidence',
    short: 'A structured, tamper-evident record of what happened at the boundary.',
    body: 'Each invocation emits an ExecutionEvidence event: a stable action id, the host, the correlation, an explicit outcome, and a hash linking it to the prior event. Evidence is designed to outlive the system that produced it — portable and verifiable on its own terms, which is what makes it trustworthy to a skeptic.',
    href: '/blog/logs-arent-evidence',
    hrefLabel: 'Read: logs aren’t evidence',
  },
  {
    term: 'Hash chain',
    short: 'SHA256 links that make any alteration detectable.',
    body: 'Each evidence event includes a hash of the previous one, so the records form a chain. Alter or remove any record and the chain breaks visibly. This is, almost literally, chain of custody — the property defensibility and audit actually require, and the reason CHP’s evidence is more than a log.',
  },
  {
    term: 'Correlation',
    short: 'The id that ties every action in one process together.',
    body: 'A shared correlation runs through every invocation in a session, matter, or workflow — even across multiple hosts. It is what lets a distributed process reconstruct as a single ordered trace instead of being inferred from scattered logs.',
  },
  {
    term: 'Denial',
    short: 'A refused action, recorded as a first-class outcome.',
    body: 'When a policy or entitlement check fails at the boundary, CHP denies the action and records why — an explicit reason code, the deciding subject, and an evidence id — rather than swallowing it as an exception. “Why was this denied?” becomes a query, not a reconstruction.',
    href: '/govern',
    hrefLabel: 'Governing actions',
  },
  {
    term: 'Replay',
    short: 'Reconstructing a process from its evidence, in order.',
    body: 'Because every action shares a correlation and is recorded as the same kind of event, the whole sequence — what an agent touched, what a person decided, in what order — can be replayed from the evidence store. Replay is how “show me what happened” is answered.',
  },
  {
    term: 'Conformance',
    short: 'A versioned check that an implementation behaves as the spec requires.',
    body: 'CHP ships a conformance suite so independent hosts can demonstrate they declare, govern, and prove capabilities correctly. Conformance is what makes the protocol trustworthy across vendors — a record means the same thing no matter who produced it.',
    href: '/conformance',
    hrefLabel: 'Conformance',
  },
  {
    term: 'Capability descriptor',
    short: 'The schema that defines a capability declaration.',
    body: 'The CapabilityDescriptor carries a capability’s id, version, description, input schema, and governance metadata — who may invoke it, under what policy, and whether it emits evidence. It is the unit behind both the catalog and capabilities.txt.',
    href: '/capabilities-txt',
    hrefLabel: 'capabilities.txt',
  },
  {
    term: 'Adapter',
    short: 'A package that exposes a provider’s actions as CHP capabilities.',
    body: 'Adapters turn external systems — SaaS APIs, databases, devices — into declared, governed capabilities, so an action through them is recorded the same way as any other. The open adapter ecosystem is what the capabilities catalog draws from.',
    href: '/adapters',
    hrefLabel: 'Browse adapters',
  },
  {
    term: 'capabilities.txt',
    short: 'A public, well-known file advertising what a host can do.',
    body: 'A discovery sibling to robots.txt and llms.txt: a crawlable, static declaration of the capabilities a host exposes, pointing to an MCP, HTTP, or CHP endpoint for the actual call. Discovery and invocation are different jobs — capabilities.txt does discovery.',
    href: '/capabilities-txt',
    hrefLabel: 'The proposal',
  },
];

const DEFINED_TERM_SET = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Capability Host Protocol Glossary',
  url: 'https://capabilityhostprotocol.com/glossary',
  hasDefinedTerm: TERMS.map((t) => ({
    '@type': 'DefinedTerm',
    name: t.term,
    description: `${t.short} ${t.body}`,
    inDefinedTermSet: 'https://capabilityhostprotocol.com/glossary',
  })),
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DEFINED_TERM_SET) }}
      />
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <p className="eyebrow mb-4">
            Reference · glossary
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            The vocabulary of the capability boundary.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            CHP names a small set of primitives precisely, so that what an agent
            or system did can be declared, governed, and proven the same way
            every time. These are the terms, defined.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <dl className="divide-y divide-zinc-800/60 border-t border-zinc-800/60">
            {TERMS.map((t) => (
              <div
                key={t.term}
                id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="grid md:grid-cols-[260px_1fr] gap-x-8 gap-y-2 py-8 scroll-mt-24"
              >
                <dt>
                  {TERM_GLYPHS[t.term] && (
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-zinc-800 bg-zinc-900/60 text-[color:var(--color-signal-cyan)] mb-3">
                      <Glyph name={TERM_GLYPHS[t.term]} size={20} />
                    </span>
                  )}
                  <h2 className="text-xl font-semibold text-zinc-100">
                    {t.term}
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                    {t.short}
                  </p>
                </dt>
                <dd className="text-sm text-zinc-300 leading-relaxed">
                  <p>{t.body}</p>
                  {t.href && (
                    <a
                      href={t.href}
                      className="inline-block mt-3 font-mono text-xs text-[color:var(--color-capability-active)] hover:underline"
                    >
                      {t.hrefLabel} →
                    </a>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-14 border-t border-zinc-800/60">
          <div className="border border-zinc-800/80 bg-zinc-900/50 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Want the full specification?
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                These terms are defined normatively in the protocol spec, with
                schemas and a conformance suite.
              </p>
            </div>
            <a
              href="https://docs.capabilityhostprotocol.com"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              Read the docs
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
