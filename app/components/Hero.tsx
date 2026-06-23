import FieldMotif from './FieldMotif';

const EXCHANGE_NODES = [
  {
    label: 'Human',
    title: 'Approve discount',
    detail: 'Consent, ownership, policy',
    accent: 'border-[color:var(--color-human-border)] text-zinc-100',
  },
  {
    label: 'Agents',
    title: 'Classify ticket',
    detail: 'Autonomy, context, trace',
    accent: 'border-[color:var(--color-agent-border)] text-violet-200',
  },
  {
    label: 'Product',
    title: 'Query inventory',
    detail: 'Inputs, outputs, lifecycle',
    accent: 'border-[color:var(--color-product-border)] text-blue-200',
  },
  {
    label: 'Business',
    title: 'Schedule service',
    detail: 'Policy, composition, result',
    accent: 'border-[color:var(--color-business-border)] text-amber-200',
  },
];

// One governed, provable event — whichever actor takes the action.

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-border-subtle)]">
      <div aria-hidden="true" className="absolute inset-0 opacity-60">
        <FieldMotif />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(161,161,170,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.25)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="font-mono text-xs text-zinc-500 mb-5 uppercase">
          Capability Host Protocol · an evidence layer for what AI agents and
          automation do
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold leading-[1.02] text-zinc-50 mb-7 max-w-4xl">
          Stay in command of what agents, products, and organizations can do —
          and prove what they did.
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed mb-4">
          Start where the proof is real: see exactly what your AI agents did —
          every tool call captured, replayable, and tamper-evident. One command,
          no application code changes.
        </p>
        <p className="text-base text-zinc-400 max-w-3xl leading-relaxed mb-9">
          CHP is the open protocol underneath — it turns every consequential
          action, by a person, an agent, a product, or a business, into a
          declared, governable, provable event.
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <a
            href="/govern/agents"
            data-event="see_agents"
            data-event-label="hero"
            className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors"
          >
            See what your agents did
          </a>
          <a
            href="/design-partners"
            data-event="design_partner"
            data-event-label="hero"
            className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
          >
            Build a vertical with us
          </a>
        </div>
        <div className="font-mono text-sm text-zinc-500 mb-14 select-all">
          $ chp hooks install
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch">
          {EXCHANGE_NODES.map((node, index) => (
            <div key={node.label} className="contents">
              <div
                className={`min-h-36 rounded-lg border bg-[color:var(--color-host-background)] p-4 shadow-[var(--shadow-surface)] ${node.accent}`}
              >
                <p className="font-mono text-[11px] uppercase text-zinc-500 mb-3">
                  {node.label}
                </p>
                <h2 className="text-sm font-semibold text-zinc-100 mb-2">{node.title}</h2>
                <p className="text-xs text-zinc-500 leading-relaxed">{node.detail}</p>
              </div>
              {index < EXCHANGE_NODES.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:flex items-center justify-center text-zinc-700 font-mono text-lg"
                >
                  -&gt;
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-zinc-600 max-w-3xl leading-relaxed">
          One evidence contract — whether the actor is a person, an agent, a
          product, or a business. The same declared, governed, replayable event.
        </p>
      </div>
    </section>
  );
}
