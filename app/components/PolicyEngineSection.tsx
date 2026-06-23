import { POLICY_FILE, POLICY_CODE, MATURITY_LEVELS } from '../lib/content';

export default function PolicyEngineSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow tracking-widest mb-3">Policy &amp; Maturity</p>
      <h2 className="text-lg font-semibold text-zinc-100 mb-2">
        Declarative policy. Formal maturity.
      </h2>
      <p className="text-sm text-zinc-400 mb-10 max-w-2xl leading-relaxed">
        Deploy a JSON file to enforce governance rules — no code compilation, no redeployment.
        Track capability readiness across seven formal maturity levels.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Policy engine */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-200 mb-1">Policy engine</h3>
          <p className="text-xs text-zinc-500 leading-relaxed mb-4">
            Drop <code className="font-mono text-zinc-400">.chp/policy.json</code> in your project.
            Capability blocklists, allowlists, max risk tier, and regex input pattern matching.
            Violations are evidence events — not exceptions — so every denial is queryable.
          </p>
          <div className="space-y-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                <span className="ml-2 font-mono text-xs text-zinc-600">.chp/policy.json</span>
              </div>
              <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{POLICY_FILE}</code>
              </pre>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                <span className="ml-2 font-mono text-xs text-zinc-600">result</span>
              </div>
              <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{POLICY_CODE}</code>
              </pre>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {['chp policy lint', 'audit_only: true', 'block_patterns', 'max_risk_tier'].map((tag) => (
              <span key={tag} className="font-mono text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Maturity levels */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-200 mb-1">Capability maturity (L1–L7)</h3>
          <p className="text-xs text-zinc-500 leading-relaxed mb-4">
            <code className="font-mono text-zinc-400">chp registry assess-maturity</code> scores
            every capability across seven levels — from descriptor registered to fully documented
            with inferred schemas. Teams use it to gate production promotion.
          </p>
          <div className="space-y-2">
            {MATURITY_LEVELS.map(({ level, label, desc }) => (
              <div
                key={level}
                className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
              >
                <span className="font-mono text-xs text-zinc-600 min-w-[1.75rem] mt-0.5">{level}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-zinc-300">{label}</span>
                  <span className="text-xs text-zinc-600 ml-2">{desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {['chp registry assess-maturity', 'chp registry certify', 'assess_maturity()'].map((tag) => (
              <span key={tag} className="font-mono text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance/GDPR strip */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <h4 className="text-xs font-semibold text-zinc-300 mb-1">Retention policies</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              <code className="font-mono text-zinc-400">SQLiteComplianceManager</code> purges or
              redacts evidence events after a configurable number of days. GLOB patterns target
              specific capabilities.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-300 mb-1">Right to be forgotten</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Payload redaction clears content while preserving the event structure and
              correlation chain. Compliance reports are themselves evidence events.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-300 mb-1">Append-only schema</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Evidence events are never modified after insert. The SQLite schema is insert-only,
              suitable for SOC 2, financial audit trails, and regulated ML systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
