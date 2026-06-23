import { PERSISTENCE_EXAMPLE } from '../lib/content';

const STEPS = [
  {
    number: '01',
    title: 'Install',
    code: 'pip install chp-core',
    body: 'Zero mandatory dependencies. The core host, evidence store, and all capability types ship in one package.',
  },
  {
    number: '02',
    title: 'Persist',
    code: 'setup_sqlite_capabilities(host)',
    body: 'Wire six SQLite-backed capabilities in one call — state machine, event bus, ingestion, retrieval, knowledge graph, and incident.',
  },
  {
    number: '03',
    title: 'Verify',
    code: 'chp host verify',
    body: 'Smoke-tests host + evidence in under 1 second. Prints "chp host is healthy — evidence recorded and replayed" on pass.',
  },
  {
    number: '04',
    title: 'Serve',
    code: 'chp serve-http --module app:host',
    body: 'Serve any host over HTTP. RemoteCapabilityHost on the other side provides the same invoke/replay API.',
  },
];

export default function ProductionPath() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow tracking-widest mb-3">Production Path</p>
      <h2 className="text-lg font-semibold text-zinc-100 mb-2">
        From install to production in four steps.
      </h2>
      <p className="text-sm text-zinc-400 mb-10 max-w-2xl leading-relaxed">
        Each step is independently useful. Start with just evidence and replay — add persistence,
        verification, and cross-host composition as you grow.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STEPS.map((step) => (
          <div key={step.number} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="text-2xl font-mono text-zinc-800 mb-3 leading-none">{step.number}</div>
            <h3 className="text-sm font-semibold text-zinc-200 mb-2">{step.title}</h3>
            <div className="bg-zinc-800/60 rounded px-2.5 py-1.5 font-mono text-xs text-zinc-400 mb-3 break-all">
              {step.code}
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 font-mono text-xs text-zinc-400">persistence setup</span>
        </div>
        <pre className="p-5 font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
          <code>{PERSISTENCE_EXAMPLE}</code>
        </pre>
      </div>
    </section>
  );
}
