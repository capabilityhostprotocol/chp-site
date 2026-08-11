export default function InstallSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <h2 className="text-lg font-semibold text-zinc-100 mb-7">Install</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="eyebrow tracking-widest mb-3">
            Python reference host
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-200 select-all">
            pip install chp-core
          </div>
          <a
            href="https://pypi.org/project/chp-core/"
            className="text-xs text-zinc-400 mt-2 inline-block hover:text-zinc-400 transition-colors font-mono"
          >
            pypi.org/project/chp-core ↗
          </a>
        </div>
        <div>
          <p className="eyebrow tracking-widest mb-3">
            TypeScript types
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-200 select-all">
            npm install @capabilityhostprotocol/types
          </div>
          <a
            href="https://www.npmjs.com/package/@capabilityhostprotocol/types"
            className="text-xs text-zinc-400 mt-2 inline-block hover:text-zinc-400 transition-colors font-mono"
          >
            npmjs.com/@capabilityhostprotocol/types ↗
          </a>
        </div>
      </div>
      <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/50">
        <p className="eyebrow tracking-widest mb-3">Verify your setup</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-200 mb-2">
          chp host verify
        </div>
        <p className="text-xs text-zinc-400">
          Smoke-tests host + evidence in &lt;1s. Prints{' '}
          <span className="font-mono text-zinc-400">
            chp host is healthy — evidence recorded and replayed
          </span>{' '}
          on pass.
        </p>
      </div>
    </section>
  );
}
