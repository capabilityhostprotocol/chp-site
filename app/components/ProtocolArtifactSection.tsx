import {
  ARTIFACT_EXAMPLE,
  INVOCATION_EXAMPLE,
  OUTCOME_EXAMPLE,
} from '../lib/content';

const ARTIFACTS = [
  {
    label: 'Manifest',
    title: 'Discover what exists before planning.',
    code: ARTIFACT_EXAMPLE,
  },
  {
    label: 'Invocation',
    title: 'Carry caller context and timeout intent.',
    code: INVOCATION_EXAMPLE,
  },
  {
    label: 'Outcome',
    title: 'Fail closed with a machine-readable result.',
    code: OUTCOME_EXAMPLE,
  },
];

export default function ProtocolArtifactSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
        <div>
          <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
            Concrete artifact
          </p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
            A host contract an agent can inspect.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            CHP gives callers concrete manifests, invocation envelopes, and
            structured outcomes they can validate before trusting a capability.
          </p>
        </div>
        <a
          href="/examples"
          className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap"
        >
          See examples -&gt;
        </a>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {ARTIFACTS.map((artifact) => (
          <div
            key={artifact.label}
            className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/70"
          >
            <div className="border-b border-zinc-800 px-4 py-3">
              <p className="font-mono text-[11px] uppercase text-zinc-600 mb-1">
                {artifact.label}
              </p>
              <h3 className="text-sm font-semibold text-zinc-100">
                {artifact.title}
              </h3>
            </div>
            <pre className="min-h-72 overflow-x-auto p-4 text-xs leading-relaxed text-zinc-300">
              <code>{artifact.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </section>
  );
}
