export default function PhilosophyQuote() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <blockquote className="border-l-2 border-zinc-700 pl-6">
        <p className="text-zinc-300 text-base font-medium mb-3 leading-relaxed">
          Capability execution should be portable.<br />
          Production trust should be verifiable.
        </p>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
          The spec, schemas, reference host, SDK primitives, conformance runner, and
          local replay path are open source. Teams can build proprietary hosts,
          agents, policy systems, and infrastructure around the same shared protocol.
        </p>
      </blockquote>
    </section>
  );
}
