import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import {
  EVIDENCE_OUTPUT,
  HOOKS_INSTALL,
  MINIMAL_EXAMPLE,
  MODEL_ADAPTERS_EXAMPLE,
  POLICY_FILE,
  SAFETY_EXAMPLE,
} from '../lib/content';

export const metadata: Metadata = {
  title: 'Examples - Capability Host Protocol',
  description:
    'Concrete CHP examples for hosts, agents, applications, infrastructure, policy, evidence, and model adapters.',
};

type Example = {
  role: string;
  title: string;
  body: string;
  label: string;
  code: string;
};

const EXAMPLES: Example[] = [
  {
    role: 'Host',
    title: 'Register and invoke a capability.',
    body: 'Start with one stable capability ID, invoke through the host, and replay the evidence by correlation ID.',
    label: 'host.py',
    code: MINIMAL_EXAMPLE,
  },
  {
    role: 'Agent',
    title: 'Capture tool calls as evidence.',
    body: 'Agent CLIs can route tool calls through CHP hooks without changing application code.',
    label: 'terminal',
    code: HOOKS_INSTALL,
  },
  {
    role: 'Application',
    title: 'Wrap model calls behind one contract.',
    body: 'Provider adapters make model calls look like governed capabilities with shared evidence fields.',
    label: 'models.py',
    code: MODEL_ADAPTERS_EXAMPLE,
  },
  {
    role: 'Infrastructure',
    title: 'Publish policy as a trust layer.',
    body: 'Policy files let hosts return structured denials before unsafe invocations execute.',
    label: '.chp/policy.json',
    code: POLICY_FILE,
  },
];

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="ml-2 font-mono text-xs text-zinc-600">{label}</span>
      </div>
      <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ExamplesPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">Examples</p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            See the protocol from each side of the boundary.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            These examples show how CHP appears to host implementers, agent
            frameworks, application teams, and infrastructure providers.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid gap-8">
            {EXAMPLES.map((example) => (
              <div key={example.role} className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 items-start">
                <div>
                  <p className="eyebrow mb-3">
                    {example.role}
                  </p>
                  <h2 className="text-2xl font-semibold text-zinc-100 mb-3">
                    {example.title}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed">{example.body}</p>
                </div>
                <CodeBlock label={example.label} code={example.code} />
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 items-start">
            <div>
              <p className="eyebrow mb-3">
                Evidence
              </p>
              <h2 className="text-2xl font-semibold text-zinc-100 mb-3">
                Every example should produce replayable evidence.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The output is not just a log line. It is a typed event with
                capability identity, version, correlation, outcome, timing, and
                integrity fields.
              </p>
            </div>
            <CodeBlock label="evidence.json" code={EVIDENCE_OUTPUT} />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="border border-zinc-800/80 bg-zinc-900/50 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Add safety before broad exposure.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                Denials should be protocol outcomes. Start with explicit safety
                checks before capabilities become available to independent callers.
              </p>
            </div>
            <a
              href="/conformance"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              Review conformance
            </a>
          </div>
          <div className="mt-6">
            <CodeBlock label="safety.py" code={SAFETY_EXAMPLE} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
