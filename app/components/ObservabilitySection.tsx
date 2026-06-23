import { COMPARISON_ROWS, PROTOCOL_SURFACE } from '../lib/content';

export default function ObservabilitySection() {
  return (
    <>
      {/* Comparison table */}
      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <h2 className="text-lg font-semibold text-zinc-100 mb-7">
          CHP is not a replacement for logs or tracing.
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-zinc-400 border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left font-mono text-xs text-zinc-400 uppercase tracking-widest pb-3 pr-6">
                  Question
                </th>
                <th className="text-left font-mono text-xs text-zinc-400 uppercase tracking-widest pb-3 pr-6">
                  Logs
                </th>
                <th className="text-left font-mono text-xs text-zinc-400 uppercase tracking-widest pb-3 pr-6">
                  OpenTelemetry
                </th>
                <th className="text-left font-mono text-xs text-zinc-400 uppercase tracking-widest pb-3">
                  CHP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {COMPARISON_ROWS.map(([q, log, otel, chp]) => (
                <tr key={q}>
                  <td className="py-3 pr-6 text-zinc-300">{q}</td>
                  <td className="py-3 pr-6 text-zinc-400">{log}</td>
                  <td className="py-3 pr-6 text-zinc-400">{otel}</td>
                  <td className="py-3 text-zinc-300">{chp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-4">
          CHP composes with OpenTelemetry. Export any evidence event to an OTLP span via{' '}
          <code className="font-mono text-zinc-400">evidence_to_otel_span()</code>. Export full
          session traces via{' '}
          <code className="font-mono text-zinc-400">replay_to_otel_spans()</code>. See{' '}
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/comparisons/chp-and-opentelemetry.md"
            className="text-zinc-400 hover:text-zinc-300 transition-colors underline"
          >
            CHP and OpenTelemetry
          </a>{' '}
          for details.
        </p>
        <p className="text-xs text-zinc-400 mt-2">
          <code className="font-mono text-zinc-400">aggregate_session_metrics()</code> and{' '}
          <code className="font-mono text-zinc-400">format_prometheus()</code> expose
          session-level metrics in Prometheus text format.{' '}
          <code className="font-mono text-zinc-400">assess_maturity()</code> returns a{' '}
          <code className="font-mono text-zinc-400">MaturityAssessment</code> for self-hosted
          certification.
        </p>
      </section>

      {/* Protocol surface */}
      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
        <h2 className="text-lg font-semibold text-zinc-100 mb-7">
          What independent hosts agree on
        </h2>
        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
          {PROTOCOL_SURFACE.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-zinc-400">
              <span className="w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
