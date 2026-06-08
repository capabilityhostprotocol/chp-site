import { PLATFORM_GROUPS } from '../lib/content';

export default function PlatformGrid() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800/60">
      <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">Platform</p>
      <h2 className="text-2xl font-semibold text-zinc-100 mb-2">
        Every layer of a production AI system.
      </h2>
      <p className="text-sm text-zinc-400 mb-10 max-w-2xl">
        CHP ships 25+ governed capability types across six functional groups. Every group
        uses the same evidence model — one replay API, one correlation space.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLATFORM_GROUPS.map((group) => (
          <div
            key={group.label}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-3"
          >
            <h3 className="text-sm font-semibold text-zinc-100">{group.label}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed flex-1">{group.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-zinc-800">
              {group.exports.map((exp) => (
                <span
                  key={exp}
                  className="font-mono text-xs text-zinc-500 bg-zinc-800/60 rounded px-1.5 py-0.5"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
