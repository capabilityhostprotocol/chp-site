import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import FailureModesSection from '../components/FailureModesSection';
import EcosystemSection from '../components/EcosystemSection';

export const metadata: Metadata = {
  title: 'Why a protocol - Capability Host Protocol',
  description:
    'Why CHP is an open protocol and not a feature inside one vendor’s framework — and why a neutral, conformance-backed evidence boundary is what audit, trust, and portability actually require.',
};

const ARGUMENTS = [
  {
    q: 'Why not just a feature of my agent framework?',
    a: 'A framework can record what its own tools did. It cannot be the neutral boundary that an auditor, a regulator, or a second framework will trust. Evidence is only useful when it outlives the system that produced it and means the same thing across independent implementations. That is a protocol problem, not a feature.',
  },
  {
    q: 'Won’t MCP or a model vendor just absorb this?',
    a: 'MCP and tool-calling answer “what can the model call.” CHP answers “what actually happened, who was denied, and can I replay it” — across hosts that no single vendor controls. A capability host can be a person, a business process, a device, or another vendor’s framework. The value is precisely the part a single vendor cannot own: independence and portability.',
  },
  {
    q: 'Why now?',
    a: 'Agents are being put into consequential work faster than anyone can prove what they did. The gap between “the agent acted” and “we can show what it did, and that it was allowed to” is becoming a launch blocker — first in software, then everywhere a wrong action is expensive.',
  },
  {
    q: 'Why an open, conformance-backed boundary?',
    a: 'Trust that depends on one vendor staying in business, or one framework staying in fashion, is not trust. A small, versioned spec with a conformance suite lets independent hosts prove they behave the same way — so the evidence is portable and the boundary survives vendor moves.',
  },
];

const NOT_REPLACING = [
  ['MCP / tool calling', 'Exposes tools to a model. CHP records and governs the execution around those calls.'],
  ['OpenTelemetry', 'Observes systems with traces and spans. CHP makes evidence and denial part of the invocation contract, not optional logs.'],
  ['Temporal / workflow engines', 'Orchestrate durable workflows. CHP evidences the individual capability calls inside them.'],
  ['Application authorization', 'Decides who may act. CHP records that the decision happened, and lets you replay it.'],
];

export default function WhyAProtocolPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-4">
            Why a protocol
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-50 mb-6 max-w-4xl">
            Evidence you can trust has to outlive the system that made it.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            The hard part of governing agents and automation is not calling a
            tool. It is being able to prove, later and to someone skeptical, what
            was done and that it was allowed. That only works if the record is
            neutral, portable, and means the same thing across independent
            systems — which is what a protocol is for.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-y border-zinc-800/60">
          <div className="grid lg:grid-cols-2 gap-4">
            {ARGUMENTS.map((item) => (
              <div
                key={item.q}
                className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold text-zinc-100 mb-3">
                  {item.q}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-b border-zinc-800/60">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
            What it does not replace
          </p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-4 max-w-3xl">
            CHP is deliberately narrow.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-10">
            It standardizes one boundary — how capabilities are declared, called,
            governed, and proven — and stays out of the model, framework, cloud,
            and policy engine you already chose.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {NOT_REPLACING.map(([name, body]) => (
              <div
                key={name}
                className="border border-zinc-800 bg-zinc-950/70 rounded-lg px-5 py-4"
              >
                <p className="font-mono text-xs text-zinc-300 mb-2">{name}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <a
            href="https://docs.capabilityhostprotocol.com/docs/compare/chp-vs-mcp"
            className="inline-block mt-8 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            Read the full comparisons -&gt;
          </a>
        </section>

        <FailureModesSection />
        <EcosystemSection />

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                See the boundary where the proof is already real.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                Start with agents: one command captures every tool call as
                replayable, tamper-evident evidence — then read the spec to see
                how narrow the contract really is.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/govern/agents"
                className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
              >
                Govern your agents
              </a>
              <a
                href="/protocol"
                className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors whitespace-nowrap"
              >
                Protocol surface
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
