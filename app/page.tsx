const EXAMPLE = `from chp_core import LocalCapabilityHost, capability

host = LocalCapabilityHost("my-host")

@capability(id="payments.transfer", version="1.0.0", description="Transfer funds.")
def transfer(amount: float, to: str):
    execute_transfer(amount, to)
    return {"status": "ok", "amount": amount}

host.register(transfer)

result = host.invoke(
    "payments.transfer",
    {"amount": 100.0, "to": "acct_456"},
    correlation_id="session-abc",
)

events = host.replay("session-abc")
# → execution_started, execution_completed`;

const EVIDENCE_OUTPUT = `{
  "event_id": "evt_8f3a1c",
  "evidence_type": "execution_completed",
  "capability_id": "payments.transfer",
  "capability_version": "1.0.0",
  "correlation_id": "session-abc",
  "host_id": "my-host",
  "sequence": 2,
  "timestamp": "2026-06-03T00:14:22.104Z",
  "outcome": "success",
  "duration_ms": 43,
  "payload": {
    "status": "ok",
    "amount": 100.0
  }
}`;

const PROTOCOL_SURFACE = [
  'Capability descriptors',
  'Host descriptors',
  'Invocation envelopes',
  'Correlation context',
  'Structured execution evidence',
  'Outcome, error, and denial semantics',
  'Replay queries and results',
  'Minimal conformance requirements',
];

const STEPS = [
  {
    number: '01',
    title: 'Register',
    body: 'Wrap any function as a capability with a stable ID, version, and description. The host manages the registry.',
    code: '@capability(id="payments.transfer", version="1.0.0")',
  },
  {
    number: '02',
    title: 'Invoke',
    body: 'Call the capability through the host with a correlation ID. The host wraps execution, checks invariants, and emits evidence automatically.',
    code: 'host.invoke("payments.transfer", payload, correlation_id=...)',
  },
  {
    number: '03',
    title: 'Replay',
    body: 'Ask the host for the ordered evidence stream for any correlation ID. Every invocation is queryable — locally, without a backend.',
    code: 'events = host.replay("session-abc")',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-zinc-800/60 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-mono text-sm text-zinc-300 tracking-tight">
            chp<span className="text-zinc-600">·</span>v0.1
          </span>
          <div className="flex items-center gap-5 text-sm text-zinc-500">
            <a
              href="https://github.com/capabilityhostprotocol/chp-core"
              className="hover:text-zinc-200 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md"
              className="hover:text-zinc-200 transition-colors"
            >
              Spec
            </a>
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/quickstart.md"
              className="hover:text-zinc-200 transition-colors"
            >
              Quickstart
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <p className="font-mono text-xs text-zinc-500 mb-5 tracking-widest uppercase">
          Open Protocol · Apache-2.0
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-zinc-50 mb-6">
          See what your agents<br className="hidden sm:block" /> and tools actually did.
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10">
          CHP is an open protocol for making agent, tool, and system execution
          visible, replayable, and ready for governance. Not another framework —
          an execution evidence layer at the capability boundary.
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 font-mono text-sm text-zinc-100 select-all">
            pip install chp-core
          </div>
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/quickstart.md"
            className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            Read the quickstart →
          </a>
        </div>
      </section>

      {/* The problem */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">
              Your agent stack tells you what tools exist.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              MCP, tool calling, function APIs — they all answer: what tools are
              available, how do I call them, how do I return output to the model.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              They don&apos;t standardize what happens after the call boundary is
              crossed: whether execution started, whether it completed, what was
              denied, and why. Logs are inconsistent, optional, and not a protocol
              contract.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">
              CHP answers what actually happened.
            </h2>
            <div className="space-y-3">
              {[
                'Which capability ran, and under what correlation?',
                'Did it start, complete, fail, or get denied?',
                'What evidence supports that answer?',
                'What would a replay of this session show?',
              ].map((q) => (
                <div key={q} className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="text-zinc-600 mt-0.5 font-mono">→</span>
                  {q}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <h2 className="text-lg font-semibold text-zinc-100 mb-10">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              <div className="text-3xl font-mono text-zinc-800 mb-4 leading-none">
                {step.number}
              </div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">{step.body}</p>
              <div className="bg-zinc-900 border border-zinc-800 rounded px-3 py-2 font-mono text-xs text-zinc-400 break-all">
                {step.code}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence output */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 mb-3">
              Structured evidence, not logs.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Every invocation emits typed evidence events with stable fields:
              capability ID, version, correlation, sequence, outcome, and timing.
              Evidence is stored locally in an append-only SQLite store.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Payloads for sensitive keys are redacted by default.
              The store is queryable by correlation ID without any backend.
            </p>
            <div className="space-y-2">
              {['execution_started', 'execution_completed', 'execution_failed', 'execution_denied'].map(
                (evt) => (
                  <div key={evt} className="flex items-center gap-3 font-mono text-xs text-zinc-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 flex-shrink-0" />
                    {evt}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="ml-2 font-mono text-xs text-zinc-600">evidence event</span>
            </div>
            <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
              <code>{EVIDENCE_OUTPUT}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <h2 className="text-lg font-semibold text-zinc-100 mb-1">Minimal example</h2>
        <p className="text-sm text-zinc-500 mb-6">
          Register a capability, invoke it, replay the evidence.
        </p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <pre className="p-5 font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
            <code>{EXAMPLE}</code>
          </pre>
        </div>
      </section>

      {/* Three pillars */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
              Visible
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every capability invocation emits structured execution evidence.
              See exactly what ran, when, and with what inputs — automatically.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
              Replayable
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Replay any execution by correlation ID. The ordered event stream
              is always available for debugging and audit — local-first, no backend.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
              Governed
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Denial semantics, outcome tracking, and a conformance model — built
              in. Governance without adopting a new framework.
            </p>
          </div>
        </div>
      </section>

      {/* Protocol surface */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <h2 className="text-lg font-semibold text-zinc-100 mb-7">What CHP defines</h2>
        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
          {PROTOCOL_SURFACE.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-zinc-400">
              <span className="w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CHP vs logs / OTel */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <h2 className="text-lg font-semibold text-zinc-100 mb-7">
          CHP is not a replacement for logs or tracing.
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-zinc-400 border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left font-mono text-xs text-zinc-600 uppercase tracking-widest pb-3 pr-6">Question</th>
                <th className="text-left font-mono text-xs text-zinc-600 uppercase tracking-widest pb-3 pr-6">Logs</th>
                <th className="text-left font-mono text-xs text-zinc-600 uppercase tracking-widest pb-3 pr-6">OpenTelemetry</th>
                <th className="text-left font-mono text-xs text-zinc-600 uppercase tracking-widest pb-3">CHP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {[
                ['Did this tool run?', 'Maybe', 'Yes (span)', 'Yes (evidence)'],
                ['Was it denied before running?', 'Maybe', 'Custom span status', 'First-class outcome'],
                ['What correlated to this session?', 'No', 'Trace context', 'Correlation ID + replay'],
                ['Can I replay by causal ID?', 'No', 'Depends on backend', 'Yes, required'],
                ['What invariants were declared?', 'No', 'No', 'Capability descriptor'],
              ].map(([q, log, otel, chp]) => (
                <tr key={q}>
                  <td className="py-3 pr-6 text-zinc-300">{q}</td>
                  <td className="py-3 pr-6 text-zinc-500">{log}</td>
                  <td className="py-3 pr-6 text-zinc-500">{otel}</td>
                  <td className="py-3 text-zinc-300">{chp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-600 mt-4">
          CHP composes with OpenTelemetry — evidence exports to OTLP spans are planned for v0.6.
          See{' '}
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/comparisons/chp-and-opentelemetry.md"
            className="text-zinc-500 hover:text-zinc-300 transition-colors underline"
          >
            CHP and OpenTelemetry
          </a>{' '}
          for details.
        </p>
      </section>

      {/* Install */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <h2 className="text-lg font-semibold text-zinc-100 mb-7">Install</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
              Python reference host
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-200 select-all">
              pip install chp-core
            </div>
            <a
              href="https://pypi.org/project/chp-core/"
              className="text-xs text-zinc-600 mt-2 inline-block hover:text-zinc-400 transition-colors font-mono"
            >
              pypi.org/project/chp-core ↗
            </a>
          </div>
          <div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
              TypeScript types
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-200 select-all">
              npm install @capabilityhostprotocol/types
            </div>
            <a
              href="https://www.npmjs.com/package/@capabilityhostprotocol/types"
              className="text-xs text-zinc-600 mt-2 inline-block hover:text-zinc-400 transition-colors font-mono"
            >
              npmjs.com/@capabilityhostprotocol/types ↗
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <blockquote className="border-l-2 border-zinc-700 pl-6">
          <p className="text-zinc-300 text-base font-medium mb-3 leading-relaxed">
            Local visibility should be free.<br />
            Production trust should be paid.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
            The spec, schemas, local host, SDK primitives, conformance runner, and local replay
            are open source. Commercial value lives around production trust: hosted capability
            graph, multi-host trace stitching, compliance exports, and enterprise identity.
          </p>
        </blockquote>
      </section>

      {/* GitHub CTA */}
      <section className="max-w-4xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-base font-semibold text-zinc-100 mb-1">
              Open source on GitHub
            </h2>
            <p className="text-sm text-zinc-500">
              Spec, schemas, Python host, conformance suite, and examples.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/capabilityhostprotocol/chp-core"
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-100 hover:border-zinc-500 transition-colors whitespace-nowrap"
            >
              View on GitHub →
            </a>
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/onboarding.md"
              className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors whitespace-nowrap"
            >
              Onboarding guide →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-8 px-6 mt-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <span>Capability Host Protocol v0.1</span>
          <div className="flex gap-6">
            <a
              href="https://github.com/capabilityhostprotocol/chp-core"
              className="hover:text-zinc-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md"
              className="hover:text-zinc-400 transition-colors"
            >
              Spec
            </a>
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/roadmap.md"
              className="hover:text-zinc-400 transition-colors"
            >
              Roadmap
            </a>
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/LICENSE"
              className="hover:text-zinc-400 transition-colors"
            >
              Apache-2.0
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
