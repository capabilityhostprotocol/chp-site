import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'capabilities.txt — a discovery standard for the agentic web',
  description:
    'capabilities.txt is a public, well-known file where a host declares the capabilities it exposes, so AI agents can discover what they can invoke. A discovery sibling to robots.txt and llms.txt — complementary to MCP.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/capabilities-txt' },
};

const VS = [
  [
    'robots.txt',
    'Tells crawlers what they may access. capabilities.txt tells agents what a host can do.',
  ],
  [
    'llms.txt',
    'Advertises content for LLMs to read. capabilities.txt advertises actions for agents to take.',
  ],
  [
    'MCP',
    'A stateful connection + invocation protocol (a client connects to a server and calls tools). capabilities.txt is the static, public discovery layer — crawlable with no live connection — that points to your MCP, HTTP, or CHP endpoint for invocation. Complementary, not competing.',
  ],
  [
    'OpenAPI',
    'Describes the shape of an HTTP API. capabilities.txt is governance-aware (policy, evidence, provenance) and agnostic about how you invoke.',
  ],
];

const FAQ = [
  [
    'What is capabilities.txt?',
    'A public file at a well-known location where a host declares the capabilities it exposes — named, versioned units an agent can discover and (elsewhere) invoke. A human/agent-readable /capabilities.txt plus a structured /.well-known/capabilities.json.',
  ],
  [
    'Why does it need to exist?',
    'Agents increasingly navigate the web autonomously. They can find content (llms.txt) and respect crawl rules (robots.txt), but there is no standard way for a host to advertise what it can do. capabilities.txt is that missing discovery layer.',
  ],
  [
    'How is it different from just listing API endpoints?',
    'A capability declaration is governance-aware: it can carry who may invoke it, under what policy, and whether it emits provable evidence — not just a function signature. That is the part an auditor or a careful agent actually needs.',
  ],
  [
    'Do I need CHP to publish one?',
    'No. capabilities.txt is a simple, open convention. CHP grounds it in a real schema (CapabilityDescriptor) and gives the capabilities governance and evidence — but the discovery file stands on its own.',
  ],
];

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="display-2 text-zinc-100 mb-6 max-w-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function CapabilitiesTxtPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <p className="eyebrow mb-4">
            An open standard · with a working reference
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            capabilities.txt
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl mb-4">
            A public, well-known file where a host declares the capabilities it
            exposes — so AI agents can discover what they can invoke. A discovery
            sibling to <code className="font-mono">robots.txt</code> and{' '}
            <code className="font-mono">llms.txt</code>, for the agentic web.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
            robots.txt advertised what crawlers may read. llms.txt advertised what
            LLMs should read. capabilities.txt advertises what agents can{' '}
            <em>do</em>.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl mt-4">
            capabilities.txt is an open standard with its own home at{' '}
            <a
              href="https://capabilitiestxt.org"
              className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50"
            >
              capabilitiestxt.org
            </a>{' '}
            — the spec, a generator, and a conformance checker. This page is about how
            CHP grounds it in a real schema and adds governance and evidence.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="https://capabilitiestxt.org"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors"
            >
              The standard: capabilitiestxt.org
            </a>
            <a
              href="/capabilities.txt"
              className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
            >
              See ours: /capabilities.txt
            </a>
            <a
              href="/.well-known/capabilities.json"
              className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
            >
              /.well-known/capabilities.json
            </a>
          </div>
        </section>

        <Section eyebrow="The format" title="Two files, dead simple.">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="surface-raised p-5">
              <code className="font-mono text-sm text-zinc-100">
                /capabilities.txt
              </code>
              <p className="text-sm text-zinc-400 leading-relaxed mt-2">
                Human- and agent-readable markdown: capabilities grouped by
                category, each with an id, version, and one-line description.
              </p>
            </div>
            <div className="surface-raised p-5">
              <code className="font-mono text-sm text-zinc-100">
                /.well-known/capabilities.json
              </code>
              <p className="text-sm text-zinc-400 leading-relaxed mt-2">
                The structured form — an array of capability references, each
                resolvable to a full descriptor (modes, policy, evidence,
                schemas).
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl mt-6">
            Grounded in a real, open schema:{' '}
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/schemas/capability-descriptor.schema.json"
              className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50"
            >
              CapabilityDescriptor
            </a>
            .
          </p>
        </Section>

        <Section eyebrow="How it relates" title="Complementary, not competitive.">
          <div className="grid sm:grid-cols-2 gap-3">
            {VS.map(([name, body]) => (
              <div
                key={name}
                className="border border-zinc-800 bg-zinc-950/70 rounded-lg px-5 py-4"
              >
                <p className="font-mono text-xs text-zinc-300 mb-2">vs {name}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Where it leads"
          title="Discovery is step one. Governed invocation is where it goes."
        >
          <p className="text-zinc-400 leading-relaxed max-w-3xl mb-6">
            capabilities.txt answers one question — <em>what can this host do?</em> That is
            discovery, and it stands on its own. CHP answers the next three an agent or an
            auditor actually has: <span className="text-zinc-200">may I invoke this</span>{' '}
            (governance), <span className="text-zinc-200">what happened</span> (execution),
            and <span className="text-zinc-200">can I prove it</span> (evidence). A capability
            listed in a capabilities.txt can resolve to a full CapabilityDescriptor and be
            invoked through a host, where every invocation is checked against policy and
            recorded as replayable evidence. Adopt capabilities.txt on its own; CHP is where
            it leads.
          </p>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Read the spec', 'The format + rules live at capabilitiestxt.org.'],
              ['Generate', 'Turn an existing OpenAPI spec into a capabilities.txt with the generator.'],
              ['Validate', 'Check it against the conformance checker.'],
              ['Publish', 'Serve /capabilities.txt and /.well-known/capabilities.json.'],
              ['Discover', 'Agents fetch and parse it — no live connection required.'],
              ['Invoke', 'Point the listing at your MCP, HTTP, or CHP endpoint. Through a CHP host, invocation is governed and evidenced.'],
            ].map(([step, body], i) => (
              <li key={step} className="surface-flat p-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-[11px] text-[color:var(--color-signal-cyan)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold text-zinc-100">{step}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section eyebrow="Questions" title="What a discovery standard has to answer.">
          <div className="grid md:grid-cols-2 gap-4">
            {FAQ.map(([q, a]) => (
              <div
                key={q}
                className="surface-raised p-6"
              >
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{q}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </Section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Want to publish one — or shape the convention?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                It&apos;s an open standard with a live reference — spec, generator,
                and validator. If you expose capabilities agents should find,
                let&apos;s get you on the map.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/design-partners"
                className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
              >
                Build it with us
              </a>
              <a
                href="/capabilities"
                className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors whitespace-nowrap"
              >
                Browse the catalog
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
