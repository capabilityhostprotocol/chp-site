import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import EvidenceChain from '../components/motif/EvidenceChain';

export const metadata: Metadata = {
  title: 'CHP and the agentic web — the evidence layer',
  description:
    'The agentic web is converging on standards for discovery (llms.txt, capabilities.txt), invocation (MCP), and identity (Web Bot Auth). One layer is still unsolved: evidence — what an agent actually did, whether it was allowed, and whether you can prove it. CHP is that layer.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/agentic-web' },
};

const LAYERS = [
  {
    name: 'Discovery',
    question: 'What can this host do?',
    standards: 'robots.txt · sitemap · llms.txt · capabilities.txt',
    chp: 'CHP contributes capabilities.txt (governance-aware discovery).',
  },
  {
    name: 'Invocation',
    question: 'How do I call it?',
    standards: 'MCP · HTTP · A2A',
    chp: 'CHP runs a live MCP server — agents query and invoke it directly.',
  },
  {
    name: 'Identity',
    question: 'Who is this agent?',
    standards: 'Web Bot Auth (cryptographic agent identity)',
    chp: 'CHP aligns with it — identity is the input to accountable evidence.',
  },
  {
    name: 'Evidence',
    question: 'What did it do? Was it allowed? Can I prove it?',
    standards: 'CHP',
    chp: 'The layer CHP owns: governed, provable, replayable execution.',
    own: true,
  },
];

const FAQ: [string, string][] = [
  [
    'Does CHP replace MCP?',
    'No — they are complementary layers. MCP answers "what can the model call" (invocation). CHP answers "what actually happened, who was denied, and can I replay it" (evidence). An MCP server can be wrapped as a CHP host so its tool calls emit evidence; a CHP capability can be exposed through an MCP tool surface. CHP even runs its own MCP server.',
  ],
  [
    'Does CHP replace Web Bot Auth?',
    'No. Web Bot Auth (Cloudflare/IETF) cryptographically proves WHO an agent is. It does not record WHAT the agent did or whether it was allowed. CHP is that remainder. The two compose: identity in, accountable evidence out.',
  ],
  [
    'Is CHP itself agent-ready?',
    'Yes. CHP publishes an A2A agent card at /.well-known/agent-card.json, an MCP server-card, capabilities.txt, and a live MCP server at /api/mcp that any agent can connect to and learn from — every call dogfooded as hash-chained CHP evidence.',
  ],
  [
    'How does capabilities.txt relate to the A2A agent card?',
    'They are complementary discovery layers, and CHP publishes both. capabilities.txt is the static, crawlable, governance- and evidence-aware advertisement; the A2A agent card is the recognized capability manifest agents look for at a well-known path.',
  ],
];

const ARTICLE_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CHP and the agentic web: the evidence layer',
  description:
    'How the Capability Host Protocol fits the 2026 agentic-web stack — and why the unsolved layer (evidence) is the one CHP owns.',
  author: { '@type': 'Organization', name: 'Capability Host Protocol' },
  publisher: { '@type': 'Organization', name: 'Capability Host Protocol' },
  url: 'https://capabilityhostprotocol.com/agentic-web',
};

const ITEMLIST_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'The agentic web stack',
  itemListElement: LAYERS.map((l, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: l.name,
    description: `${l.question} — ${l.standards}`,
  })),
};

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function AgenticWebPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([ARTICLE_LD, ITEMLIST_LD, FAQ_LD]),
        }}
      />
      <Nav />
      <main>
        {/* Hero — TLDR-first (answer the query in the first screen) */}
        <section className="band-tight pt-20 md:pt-28">
          <p className="eyebrow mb-5">The agentic web</p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            CHP is the evidence layer of the agentic web.
          </h1>
          <p className="lede max-w-3xl text-zinc-300 mb-4">
            The agentic web is converging on standards for{' '}
            <span className="text-zinc-100">discovery</span> (llms.txt,
            capabilities.txt), <span className="text-zinc-100">invocation</span>{' '}
            (MCP), and <span className="text-zinc-100">identity</span> (Web Bot
            Auth). One layer is still unsolved:{' '}
            <span className="text-zinc-100">evidence</span> — what an agent
            actually did, whether it was allowed, and whether you can prove it
            later. CHP is that layer.
          </p>
          <p className="text-base text-zinc-400 max-w-3xl leading-relaxed">
            Identity answers <em>who</em> an agent is. CHP answers <em>what it
            did, whether it was allowed, and proves it</em> — governed,
            tamper-evident, replayable execution at the capability boundary.
          </p>
        </section>

        {/* The stack */}
        <section className="band border-y border-zinc-800/60">
          <p className="eyebrow mb-4">The stack</p>
          <h2 className="display-2 text-zinc-100 mb-10 max-w-3xl">
            Four questions, four layers.
          </h2>
          <div className="flex flex-col gap-3">
            {LAYERS.map((l) => (
              <div
                key={l.name}
                className={`${l.own ? 'surface-signature' : 'surface-raised'} p-6 grid md:grid-cols-[180px_1fr_1.2fr] gap-4 md:items-center`}
              >
                <div>
                  <p
                    className={`text-lg font-semibold ${l.own ? 'text-[color:var(--color-signal-cyan)]' : 'text-zinc-100'}`}
                  >
                    {l.name}
                  </p>
                  <p className="font-mono text-[11px] text-zinc-500 mt-1">
                    {l.standards}
                  </p>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {l.question}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">{l.chp}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mt-6">
            Discovery → invocation → identity → <span className="text-zinc-300">evidence</span>.
            The first three are maturing fast (MCP is near-universal; Web Bot Auth
            went to production in 2026). The hardest question — <em>what
            happened, and can you prove it?</em> — is the one CHP answers.
          </p>
        </section>

        {/* Why evidence is the hard layer */}
        <section className="band">
          <p className="eyebrow mb-4">Why it is the hard layer</p>
          <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
            Evidence has to outlive the agent that produced it.
          </h2>
          <p className="lede max-w-2xl text-zinc-400 mb-10">
            When an agent acts in consequential work, the question arrives later
            and from a skeptic — a security reviewer, an auditor, a regulator.
            A log the framework wrote, in its format, at its discretion, is
            exactly the self-attestation a skeptic discounts. Evidence must be
            portable, structured, and verifiable on its own terms — and that is a
            property of a shared protocol, not a vendor feature.
          </p>
          <div className="max-w-2xl">
            <EvidenceChain />
            <p className="mt-4 font-mono text-xs text-zinc-500 leading-relaxed">
              Each event hash-chains to the prior one — tamper-evidence you can
              verify. Try it.
            </p>
          </div>
        </section>

        {/* CHP is itself agent-ready */}
        <section className="band border-y border-zinc-800/60">
          <p className="eyebrow mb-4">We practice it</p>
          <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
            CHP is built to be consumed by agents.
          </h2>
          <p className="lede max-w-2xl text-zinc-400 mb-8">
            A protocol for governing agent actions should be exemplary at being
            discovered and used <em>by</em> agents. Connect an agent to CHP&apos;s
            MCP server and it can learn the protocol, browse the capability
            catalog, and adopt it — and every call comes back wrapped as
            hash-chained CHP evidence. The protocol demonstrating itself.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ['MCP server', '/api/mcp', 'Connect and learn — explain, define, how_to_adopt, the catalog.'],
              ['A2A agent card', '/.well-known/agent-card.json', 'The recognized capability manifest.'],
              ['MCP server card', '/.well-known/mcp/server-card.json', 'The server descriptor.'],
              ['capabilities.txt', '/capabilities.txt', 'Governance-aware discovery.'],
            ].map(([label, href, note]) => (
              <a
                key={label as string}
                href={href as string}
                className="group surface-raised hover-lift p-5 flex flex-col"
              >
                <p className="font-mono text-xs text-[color:var(--color-signal-cyan)] mb-2">
                  {href}
                </p>
                <p className="text-sm font-semibold text-zinc-100 mb-1">
                  {label}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">{note}</p>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="band">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="display-2 text-zinc-100 mb-10 max-w-3xl">
            Complementary, not competing.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FAQ.map(([q, a]) => (
              <div key={q} className="surface-raised p-6">
                <h3 className="text-base font-semibold text-zinc-100 mb-2">
                  {q}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm">
            <a href="/capabilities-txt" className="text-zinc-300 hover:text-zinc-50 transition-colors">
              The capabilities.txt proposal →
            </a>
            <a href="/blog/chp-and-mcp" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              CHP and MCP →
            </a>
            <a href="/why-a-protocol" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              Why a protocol →
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="band-tight pb-24">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Build on the evidence layer.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Start with agents — capture exactly what yours did in one
                command — or build a vertical with us.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/govern/agents"
                className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
              >
                See what your agents did
              </a>
              <a
                href="/design-partners"
                className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors whitespace-nowrap"
              >
                Become a design partner
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
