import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Developer resources — Capability Host Protocol',
  description:
    'Capability Host Protocol (CHP) developer resources: OpenAPI spec, MCP server, A2A agent card, capabilities.txt, the /ask query endpoint, Python SDK and CLI reference, the spec, schemas, and conformance suite — all at predictable URLs.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/developers' },
};

const GROUPS: { heading: string; items: [string, string, string][] }[] = [
  {
    heading: 'API & agents',
    items: [
      ['OpenAPI specification', '/openapi.json', 'OpenAPI 3.1 description of the public HTTP surface.'],
      ['MCP server', '/api/mcp', 'Model Context Protocol (streamable HTTP) — connect an agent to learn CHP, browse capabilities, and adopt it. Every call returns hash-chained evidence.'],
      ['MCP discovery manifest', '/.well-known/mcp.json', 'Endpoint, transport, auth, and tools for the MCP server.'],
      ['A2A agent card', '/.well-known/agent-card.json', 'The recognized capability-advertisement manifest.'],
      ['/ask endpoint', '/ask?q=how+does+CHP+work', 'A natural-language query endpoint — structured answers, no MCP client needed.'],
      ['capabilities.txt', '/capabilities.txt', 'Governance-aware capability discovery (+ /.well-known/capabilities.json).'],
    ],
  },
  {
    heading: 'Build & learn',
    items: [
      ['Documentation', 'https://docs.capabilityhostprotocol.com', 'Concepts, quickstarts, guides, comparisons, reference.'],
      ['Python SDK reference', 'https://docs.capabilityhostprotocol.com/docs/reference/python-sdk', 'LocalCapabilityHost, @capability, the evidence store, replay.'],
      ['CLI reference', 'https://docs.capabilityhostprotocol.com/docs/reference/cli', 'The chp CLI — host, invoke, replay, session, registry, ci.'],
      ['Protocol spec & schemas', 'https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md', 'The versioned spec and JSON schemas.'],
      ['Conformance', '/conformance', 'The checks an independent host must pass.'],
      ['GitHub', 'https://github.com/capabilityhostprotocol/chp-core', 'Reference host, types, adapters — Apache-2.0.'],
    ],
  },
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="band-tight pt-20 md:pt-28">
          <p className="eyebrow mb-5">Developers</p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Build with the Capability Host Protocol.
          </h1>
          <p className="lede max-w-3xl text-zinc-400">
            Every CHP developer and agent resource, at a predictable URL. The
            protocol is built to be consumed by agents — connect to the MCP
            server and it will teach you the rest.
          </p>
        </section>

        {GROUPS.map((g) => (
          <section key={g.heading} className="band-tight border-t border-zinc-800/60">
            <p className="eyebrow mb-6">{g.heading}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {g.items.map(([label, href, note]) => (
                <a
                  key={label}
                  href={href}
                  className="group surface-raised hover-lift p-6 flex flex-col"
                >
                  <p className="font-mono text-xs text-[color:var(--color-signal-cyan)] mb-2 break-all">
                    {href.startsWith('http') ? href.replace('https://', '') : `capabilityhostprotocol.com${href}`}
                  </p>
                  <p className="text-base font-semibold text-zinc-100 mb-1">
                    {label}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{note}</p>
                </a>
              ))}
            </div>
          </section>
        ))}

        <section className="band-tight pb-24 border-t border-zinc-800/60">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Start where the proof is real.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Capture exactly what your AI agents did in one command — every
                tool call as replayable, tamper-evident evidence.
              </p>
            </div>
            <a
              href="/govern/agents"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              See what your agents did
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
