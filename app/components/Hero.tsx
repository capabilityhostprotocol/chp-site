export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
      <p className="font-mono text-xs text-zinc-500 mb-5 tracking-widest uppercase">
        Open Protocol · Apache-2.0
      </p>
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-zinc-50 mb-6">
        The governed capability platform<br className="hidden sm:block" /> for production AI agents.
      </h1>
      <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10">
        Register any function as a capability. Every invocation emits structured
        evidence — started, completed, denied. Replay by correlation ID, export to OTel,
        query with vector retrieval, compose across agents. Open source, zero mandatory deps.
      </p>
      <div className="flex flex-wrap gap-3">
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 font-mono text-sm text-zinc-100 select-all">
          pip install chp-core
        </div>
        <a
          href="/quickstart"
          className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
        >
          Read the quickstart →
        </a>
      </div>
    </section>
  );
}
