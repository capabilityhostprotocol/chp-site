import { STEPS, EVIDENCE_OUTPUT, MINIMAL_EXAMPLE } from '../lib/content';

export default function EvidenceFoundation() {
  return (
    <>
      {/* How it works — 3 steps */}
      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <h2 className="text-lg font-semibold text-zinc-100 mb-2">The evidence foundation</h2>
        <p className="text-sm text-zinc-400 mb-10">
          Every capability invocation — across any group — runs through the same three-step protocol.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div key={step.number}>
              <div className="text-3xl font-mono text-zinc-800 mb-4 leading-none">{step.number}</div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">{step.body}</p>
              <div className="bg-zinc-900 border border-zinc-800 rounded px-3 py-2 font-mono text-xs text-zinc-400 break-all">
                {step.code}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence output */}
      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 mb-3">Structured evidence, not logs.</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Every invocation emits typed evidence events with stable fields: capability ID,
              version, correlation, sequence, outcome, and timing. Payloads for sensitive keys
              are redacted by default. The store is queryable by correlation ID without any backend.
            </p>
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 mb-5">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-zinc-200 mb-1">SHA256 hash-chained events</p>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-2">
                    Every evidence event includes <code className="font-mono text-zinc-400">prev_hash</code> and{' '}
                    <code className="font-mono text-zinc-400">hash</code> — forming a tamper-detectable chain
                    across the session. No external signing required.
                  </p>
                  <div className="font-mono text-xs text-zinc-400 bg-zinc-950 border border-zinc-800 rounded px-3 py-2">
                    $ chp verify-evidence &lt;session_id&gt;<br />
                    <span className="text-zinc-400">→ 47 events verified · chain intact</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                'execution_started',
                'execution_completed',
                'execution_failed',
                'execution_denied',
              ].map((evt) => (
                <div key={evt} className="flex items-center gap-3 font-mono text-xs text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 flex-shrink-0" />
                  {evt}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="ml-2 font-mono text-xs text-zinc-400">evidence event</span>
            </div>
            <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
              <code>{EVIDENCE_OUTPUT}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Minimal code example */}
      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <h2 className="text-lg font-semibold text-zinc-100 mb-1">Minimal example</h2>
        <p className="text-sm text-zinc-400 mb-6">Register a capability, invoke it, replay the evidence.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <pre className="p-5 font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
            <code>{MINIMAL_EXAMPLE}</code>
          </pre>
        </div>
      </section>
    </>
  );
}
