import { ADOPTION_PATHS } from '../lib/content';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import SurfacePanel from './SurfacePanel';

export default function AdoptionPathsSection() {
  return (
    <SectionShell>
      <SectionHeader
        eyebrow="Adoption paths"
        title="Adopt the protocol one boundary at a time."
        body="CHP is useful as a local host, a remote invocation boundary, a manifest contract, or a conformance target for infrastructure."
        className="mb-10"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ADOPTION_PATHS.map((path) => (
          <SurfacePanel
            key={path.step}
            className="flex min-h-64 flex-col"
          >
            <p className="font-mono text-xs text-zinc-400 mb-8">{path.step}</p>
            <h3 className="text-base font-semibold text-zinc-100 mb-2">{path.title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed flex-1">{path.body}</p>
            <a
              href={path.href}
              className="mt-5 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
            >
              {path.cta} -&gt;
            </a>
          </SurfacePanel>
        ))}
      </div>
    </SectionShell>
  );
}
