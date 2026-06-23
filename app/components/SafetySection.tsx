import { SAFETY_EXAMPLE } from '../lib/content';

const SAFETY_FEATURES = [
  {
    title: 'Pre-execution safety gate',
    desc: 'RuleBasedSafetyEvaluator blocks invocations before they run. Risk tier enforcement, allowlists, audit-only mode. CAPABILITY_RISK_MAP covers all built-in adapters. Denials emit evidence — not exceptions.',
    exports: ['RuleBasedSafetyEvaluator', 'register_safety_capability', 'CAPABILITY_RISK_MAP'],
  },
  {
    title: 'Incident lifecycle',
    desc: 'SQLiteIncidentManager tracks incidents with severity, status, and remediation actions. Incidents are evidence events — queryable and replayable like any capability invocation.',
    exports: ['SQLiteIncidentManager', 'IncidentSeverity', 'IncidentStatus'],
  },
];

export default function SafetySection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow tracking-widest mb-3">Safety &amp; Governance</p>
      <h2 className="text-lg font-semibold text-zinc-100 mb-2">
        Governance isn&apos;t an add-on.
      </h2>
      <p className="text-sm text-zinc-400 mb-10 max-w-2xl leading-relaxed">
        Safety evaluation and incident tracking are first-class capability families.
        Policy enforcement happens <em className="not-italic text-zinc-300">before execution</em>,
        not after the fact. Every denial is queryable evidence.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-0">
        <div className="space-y-4">
          {SAFETY_FEATURES.map((f) => (
            <div key={f.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-200 mb-2">{f.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">{f.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {f.exports.map((exp) => (
                  <span
                    key={exp}
                    className="font-mono text-xs text-zinc-400 bg-zinc-800/60 rounded px-1.5 py-0.5"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden self-start">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="ml-2 font-mono text-xs text-zinc-400">safety gate</span>
          </div>
          <pre className="p-5 font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
            <code>{SAFETY_EXAMPLE}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
