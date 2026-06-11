import { PROTOCOL_AUDIENCES } from '../lib/content';

const PROBLEMS = [
  'Every product and agent framework invents its own tool contract.',
  'Hosts expose powerful actions without portable lifecycle semantics.',
  'Applications need audit trails that survive provider and runtime changes.',
];

export default function EcosystemSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
      <div className="grid lg:grid-cols-[0.95fr_1.35fr] gap-10 items-start">
        <div>
          <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
            Why CHP exists
          </p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
            Hosted capability needs a public protocol boundary.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-7">
            CHP separates the hosts that expose capabilities from the actors and
            systems that call them. The protocol makes discovery, invocation,
            governance, evidence, and replay portable across independent
            implementations.
          </p>
          <div className="space-y-3">
            {PROBLEMS.map((problem) => (
              <div key={problem} className="flex gap-3 text-sm text-zinc-400">
                <span className="mt-2 h-px w-5 bg-zinc-700 flex-shrink-0" />
                <span>{problem}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {PROTOCOL_AUDIENCES.map((audience) => (
            <div
              key={audience.role}
              className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-5"
            >
              <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
                {audience.role}
              </p>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                {audience.headline}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{audience.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
