import EvidenceContractDiagram from './EvidenceContractDiagram';

export default function DifferentiationSection() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
          Why it is different
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-3 max-w-3xl">
          One evidence contract across every layer.
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-8">
          Tool protocols govern what an agent can call. Observability watches
          machines. CHP treats a human approval, an agent action, and a product
          call as the same governed, provable event — which is what lets you
          reason about, and prove, an entire process end to end.
        </p>
        <EvidenceContractDiagram />
        <a
          href="/why-a-protocol"
          className="inline-block mt-6 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
        >
          Why this is a protocol, not a feature -&gt;
        </a>
      </div>
    </section>
  );
}
