export default function GitHubCTA() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 mb-1">Open source on GitHub</h2>
          <p className="text-sm text-zinc-500">
            Spec, schemas, Python host, conformance suite, and examples.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/capabilityhostprotocol/chp-core"
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-100 hover:border-zinc-500 transition-colors whitespace-nowrap"
          >
            View on GitHub →
          </a>
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/onboarding.md"
            className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors whitespace-nowrap"
          >
            Onboarding guide →
          </a>
        </div>
      </div>
    </section>
  );
}
