import ButtonLink from './ButtonLink';
import SectionShell from './SectionShell';

export default function GitHubCTA() {
  return (
    <SectionShell width="narrow" padding="compact">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 mb-1">
            Build against the open protocol.
          </h2>
          <p className="text-sm text-zinc-400">
            Spec, schemas, reference host, examples, and conformance suite are public.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/map">Map a capability</ButtonLink>
          <ButtonLink href="/docs" variant="secondary">
            Read the docs →
          </ButtonLink>
          <ButtonLink href="/examples" variant="secondary">
            See examples →
          </ButtonLink>
        </div>
      </div>
    </SectionShell>
  );
}
