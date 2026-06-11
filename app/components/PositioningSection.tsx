import { POSITIONING_POINTS } from '../lib/content';

export default function PositioningSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.35fr] items-start">
        <div>
          <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
            Positioning
          </p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
            The boundary between hosted capability and real-world use.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            CHP is deliberately narrow: it standardizes how independent systems
            expose, call, govern, and audit capabilities without choosing the
            model, framework, cloud, or policy engine for you.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {POSITIONING_POINTS.map((group) => (
            <div
              key={group.label}
              className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-5"
            >
              <h3 className="text-base font-semibold text-zinc-100 mb-5">
                {group.label}
              </h3>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-zinc-400">
                    <span className="mt-2 h-px w-5 flex-shrink-0 bg-zinc-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
