import { ADOPTION_PATHS } from '../lib/content';

export default function AdoptionPathsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
      <div className="mb-10">
        <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
          Adoption paths
        </p>
        <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
          Adopt the protocol one boundary at a time.
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
          CHP is useful as a local host, a remote invocation boundary, a
          manifest contract, or a conformance target for infrastructure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ADOPTION_PATHS.map((path) => (
          <div
            key={path.step}
            className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-5 flex flex-col min-h-64"
          >
            <p className="font-mono text-xs text-zinc-600 mb-8">{path.step}</p>
            <h3 className="text-base font-semibold text-zinc-100 mb-2">{path.title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed flex-1">{path.body}</p>
            <a
              href={path.href}
              className="mt-5 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
            >
              {path.cta} -&gt;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
