import { ADOPTION_STATUS } from '../lib/content';

export default function AdoptionStatusSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
      <div className="mb-10">
        <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
          Adoption status
        </p>
        <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
          Early, open, and built for independent implementations.
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Public protocol surfaces earn trust by being explicit about maturity.
          CHP is ready for experimentation, reference implementations, and
          conformance-driven feedback.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {ADOPTION_STATUS.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5"
          >
            <h3 className="text-sm font-semibold text-zinc-100 mb-2">
              {item.label}
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
