export default function GitHubCTA() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 mb-1">
            Build against the open protocol.
          </h2>
          <p className="text-sm text-zinc-500">
            Spec, schemas, reference host, examples, and conformance suite are public.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/map"
            className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
          >
            Map a capability
          </a>
          <a
            href="/docs"
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-100 hover:border-zinc-500 transition-colors whitespace-nowrap"
          >
            Read the docs →
          </a>
          <a
            href="/examples"
            className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors whitespace-nowrap"
          >
            See examples →
          </a>
        </div>
      </div>
    </section>
  );
}
