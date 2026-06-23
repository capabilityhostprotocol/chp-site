import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import FailureModesSection from '../components/FailureModesSection';
import EcosystemSection from '../components/EcosystemSection';
import EvidenceChain from '../components/motif/EvidenceChain';
import CompareTable from '../components/motif/CompareTable';

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

const NOT_REPLACING: { system: string; does: string; adds: string }[] = [
  {
    system: 'MCP / tool calling',
    does: 'Exposes tools to a model.',
    adds: 'Records and governs the execution around those calls.',
  },
  {
    system: 'OpenTelemetry',
    does: 'Observes systems with traces and spans.',
    adds: 'Makes evidence and denial part of the invocation contract — not optional logs.',
  },
  {
    system: 'Temporal / workflow engines',
    does: 'Orchestrate durable workflows.',
    adds: 'Evidences the individual capability calls inside them.',
  },
  {
    system: 'Application authorization',
    does: 'Decides who may act.',
    adds: 'Records that the decision happened, and lets you replay it.',
  },
];

export default function WhyAProtocolPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">
            Why a protocol
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Evidence you can trust has to outlive the system that made it.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            The hard part of governing agents and automation is not calling a
            tool. It is being able to prove, later and to someone skeptical, what
            was done and that it was allowed. That only works if the record is
            neutral, portable, and means the same thing across independent
            systems — which is what a protocol is for.
          </p>
          <div className="mt-12 max-w-3xl">
            <EvidenceChain />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid lg:grid-cols-2 gap-4">
            {ARGUMENTS.map((item) => (
              <div
                key={item.q}
                className="surface-raised p-6"
              >
                <h2 className="text-lg font-semibold text-zinc-100 mb-3">
                  {item.q}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <p className="eyebrow mb-3">
            What it does not replace
          </p>
          <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
            CHP is deliberately narrow.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl mb-10">
            It standardizes one boundary — how capabilities are declared, called,
            governed, and proven — and stays out of the model, framework, cloud,
            and policy engine you already chose.
          </p>
          <CompareTable
            columns={[
              { label: 'You already chose' },
              { label: 'What CHP adds', accent: true },
            ]}
            rows={NOT_REPLACING.map((x) => ({
              dimension: x.system,
              cells: [x.does, x.adds],
            }))}
          />
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm">
            <a
              href="/blog/chp-and-mcp"
              className="text-zinc-300 hover:text-zinc-50 transition-colors"
            >
              CHP and MCP →
            </a>
            <a
              href="/blog/evidence-is-not-telemetry"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Evidence vs telemetry →
            </a>
            <a
              href="/glossary"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Glossary →
            </a>
            <a
              href="https://docs.capabilityhostprotocol.com/docs/compare/chp-vs-mcp"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Full comparisons →
            </a>
          </div>
        </section>

        <FailureModesSection />
        <EcosystemSection />

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="surface-raised p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                See the boundary where the proof is already real.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
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
