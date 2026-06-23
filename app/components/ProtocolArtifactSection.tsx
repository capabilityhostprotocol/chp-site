import {
  ARTIFACT_EXAMPLE,
  INVOCATION_EXAMPLE,
  OUTCOME_EXAMPLE,
} from '../lib/content';
import CodePanel from './CodePanel';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

const ARTIFACTS = [
  {
    label: 'Manifest',
    title: 'Discover what exists before planning.',
    code: ARTIFACT_EXAMPLE,
  },
  {
    label: 'Invocation',
    title: 'Carry subject, mode, payload, and correlation.',
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
    <SectionShell>
      <SectionHeader
        eyebrow="Concrete artifact"
        title="A host contract an agent can inspect."
        body="CHP gives callers concrete manifests, invocation envelopes, and structured outcomes they can validate before trusting a capability."
        className="mb-10"
        action={
          <a
            href="/examples"
            className="whitespace-nowrap text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            See examples -&gt;
          </a>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {ARTIFACTS.map((artifact) => (
          <article key={artifact.label} className="grid gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase text-zinc-400 mb-1">
                {artifact.label}
              </p>
              <h3 className="text-sm font-semibold text-zinc-100">
                {artifact.title}
              </h3>
            </div>
            <CodePanel
              code={artifact.code}
              label={`${artifact.label.toLowerCase()}.json`}
              language="json"
            />
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
