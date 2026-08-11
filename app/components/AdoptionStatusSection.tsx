import { ADOPTION_STATUS } from '../lib/content';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import SurfacePanel from './SurfacePanel';

export default function AdoptionStatusSection() {
  return (
    <SectionShell>
      <SectionHeader
        eyebrow="Adoption status"
        title="Open, proven, and built for independent implementations."
        body="CHP is an open protocol with a frozen, additive wire surface and two independent implementations that pass conformance. Build on it today; help shape what comes next."
        className="mb-10"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {ADOPTION_STATUS.map((item) => (
          <SurfacePanel key={item.label} variant="muted">
            <h3 className="text-sm font-semibold text-zinc-100 mb-2">
              {item.label}
            </h3>
            <p className="text-xs leading-relaxed text-zinc-400">{item.body}</p>
          </SurfacePanel>
        ))}
      </div>
    </SectionShell>
  );
}
