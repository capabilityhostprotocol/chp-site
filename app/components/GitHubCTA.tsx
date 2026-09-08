import { MeshGradient } from '@chp/ui/mesh-gradient';
import ButtonLink from './ButtonLink';
import SectionShell from './SectionShell';

export default function GitHubCTA() {
  return (
    <SectionShell width="narrow" padding="compact">
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/60 p-6 sm:p-8">
        {/* Ambient WebGPU brand-gradient backdrop; renders nothing without WebGPU (below the fold, no LCP cost). */}
        <div aria-hidden="true" className="absolute inset-0 opacity-40">
          <MeshGradient />
        </div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-base font-semibold text-zinc-100 mb-1">
              Build against the open protocol.
            </h2>
            <p className="text-sm text-zinc-400">
              Spec, schemas, reference host, examples, and conformance suite are public.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="https://github.com/capabilityhostprotocol/chp-core">
              View on GitHub
            </ButtonLink>
            <ButtonLink href="/quickstart" variant="secondary">
              Quickstart →
            </ButtonLink>
            <ButtonLink href="/examples" variant="secondary">
              See examples →
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
