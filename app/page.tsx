const EXAMPLE = `from chp_core import LocalCapabilityHost, capability

host = LocalCapabilityHost("my-host")

@capability(id="math.add", version="1.0.0", description="Add two numbers.")
def add(a: int, b: int):
    return {"sum": a + b}

host.register(add)

result = host.invoke("math.add", {"a": 2, "b": 3}, correlation_id="demo")
events = host.replay("demo")
# → [execution_started, execution_completed]`;

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
              is always available for debugging and audit — local-first.
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
        <p className="text-xs font-mono text-zinc-600 mt-3">
          The host emits{' '}
          <span className="text-zinc-500">execution_started</span> and{' '}
          <span className="text-zinc-500">execution_completed</span> evidence
          automatically. Evidence payloads are redacted for sensitive keys by
          default.
        </p>
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
            The spec, schemas, local host, SDK primitives, conformance runner,
            and local replay are open source. Commercial value lives around
            production trust: hosted capability graph, multi-host trace stitching,
            compliance exports, and enterprise identity.
          </p>
        </blockquote>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-8 px-6 mt-8">
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
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/LICENSE"
              className="hover:text-zinc-400 transition-colors"
            >
              Apache-2.0
            </a>
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/LICENSE-DOCS"
              className="hover:text-zinc-400 transition-colors"
            >
              CC BY 4.0
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
