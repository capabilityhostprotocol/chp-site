import CompareTable from './motif/CompareTable';

export default function DifferentiationSection() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="band">
        <p className="eyebrow mb-4">Why it is different</p>
        <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
          Evidence, not telemetry. A protocol, not a feature.
        </h2>
        <p className="lede max-w-2xl mb-10 text-zinc-400">
          Tool protocols govern what an agent can call. Observability watches
          machines. CHP treats a human approval, an agent action, and a product
          call as the same governed, provable event — so you can prove an entire
          process end to end.
        </p>
        <CompareTable
          columns={[
            { label: 'Tool protocols', sub: 'MCP, tool-calling' },
            { label: 'Observability', sub: 'traces, spans' },
            { label: 'CHP', sub: 'evidence', accent: true },
          ]}
          rows={[
            {
              dimension: 'Answers',
              cells: [
                'What can the agent call?',
                'Is the system healthy?',
                'What happened — and can I prove it?',
              ],
            },
            {
              dimension: 'Record',
              cells: [
                'Tool calls, if logged',
                'Sampled traces, mutable',
                'Mandatory, tamper-evident evidence',
              ],
            },
            {
              dimension: 'Denials',
              cells: [
                'Protocol errors',
                'A failed span',
                'First-class outcomes, with reason',
              ],
            },
            {
              dimension: 'Spans',
              cells: [
                'One agent, one app',
                'One system',
                'People, agents, products — one trace',
              ],
            },
          ]}
        />
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm">
          <a
            href="/why-a-protocol"
            className="text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            Why a protocol, not a feature →
          </a>
          <a
            href="/agentic-web"
            className="text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            CHP and the agentic web →
          </a>
          <a
            href="/blog/evidence-is-not-telemetry"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Evidence vs telemetry →
          </a>
          <a
            href="/blog/chp-and-mcp"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            CHP and MCP →
          </a>
        </div>
      </div>
    </section>
  );
}
