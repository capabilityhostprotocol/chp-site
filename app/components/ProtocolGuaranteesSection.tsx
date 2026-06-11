import { PROTOCOL_GUARANTEES } from '../lib/content';

const FLOW = ['discover', 'validate', 'authorize', 'invoke', 'record'];

export default function ProtocolGuaranteesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
        <div>
          <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
            Protocol guarantees
          </p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
            Interoperability needs more than a tool schema.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            CHP treats malformed inputs, unavailable capabilities, lifecycle
            violations, authorization failures, and version mismatches as
            first-class protocol outcomes.
          </p>
        </div>
        <a
          href="/protocol"
          className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap"
        >
          Explore the protocol -&gt;
        </a>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {FLOW.map((step, index) => (
            <div key={step} className="relative">
              <div className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3">
                <p className="font-mono text-[11px] text-zinc-600 mb-1">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="text-sm font-medium text-zinc-200">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROTOCOL_GUARANTEES.map((guarantee) => (
          <div
            key={guarantee.title}
            className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5"
          >
            <h3 className="text-sm font-semibold text-zinc-100 mb-2">
              {guarantee.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{guarantee.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
