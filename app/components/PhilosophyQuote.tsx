export default function PhilosophyQuote() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <blockquote className="border-l-2 border-zinc-700 pl-6">
        <p className="text-zinc-300 text-base font-medium mb-3 leading-relaxed">
          Local visibility should be free.<br />
          Production trust should be paid.
        </p>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
          The spec, schemas, local host, SDK primitives, conformance runner, and local replay
          are open source. Commercial value lives around production trust: hosted capability
          graph, multi-host trace stitching, compliance exports, and enterprise identity.
        </p>
      </blockquote>
    </section>
  );
}
