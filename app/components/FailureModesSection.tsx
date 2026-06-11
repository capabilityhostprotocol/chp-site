import { FAILURE_MODES } from '../lib/content';

export default function FailureModesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
      <div className="grid lg:grid-cols-[0.8fr_1.4fr] gap-10 items-start">
        <div>
          <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
            If this has happened
          </p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
            The protocol should meet the failure before the demo does.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            CHP is for teams that have already learned that hosted capabilities
            need more than a callable function and a hopeful log line.
          </p>
        </div>

        <div className="divide-y divide-zinc-800 border-y border-zinc-800">
          {FAILURE_MODES.map((mode) => (
            <div
              key={mode.pain}
              className="grid gap-4 py-5 md:grid-cols-[0.8fr_1fr_1fr]"
            >
              <h3 className="text-sm font-semibold text-zinc-100">{mode.pain}</h3>
              <p className="text-xs leading-relaxed text-zinc-500">{mode.cost}</p>
              <p className="text-xs leading-relaxed text-zinc-300">{mode.chp}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
