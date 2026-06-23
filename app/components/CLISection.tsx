import { CLI_GROUPS } from '../lib/content';

export default function CLISection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow tracking-widest mb-3">CLI</p>
      <h2 className="text-lg font-semibold text-zinc-100 mb-2">
        A complete command surface — no dashboard required.
      </h2>
      <p className="text-sm text-zinc-400 mb-10 max-w-2xl leading-relaxed">
        50+ commands covering host management, session analysis, hooks, reporting, registry
        governance, and DevOps integration. All output is JSON — pipe into any toolchain.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLI_GROUPS.map((group) => (
          <div key={group.label} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800">
              <span className="eyebrow tracking-wider">{group.label}</span>
            </div>
            <div className="divide-y divide-zinc-800/60">
              {group.commands.map(({ cmd, desc }) => (
                <div key={cmd} className="px-4 py-3">
                  <div className="font-mono text-xs text-zinc-300 mb-1">{cmd}</div>
                  <div className="text-xs text-zinc-400 leading-snug">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-zinc-400 mt-6 font-mono">
        Full reference:{' '}
        <a
          href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/adopter-quickstart.md"
          className="text-zinc-400 hover:text-zinc-300 transition-colors underline"
        >
          docs/adopter-quickstart.md
        </a>
        {' '}· Run{' '}
        <span className="text-zinc-400">chp --help</span>
        {' '}or{' '}
        <span className="text-zinc-400">chp &lt;command&gt; --help</span>
        {' '}for flags and examples.
      </p>
    </section>
  );
}
