import { POSITIONING_POINTS } from '../lib/content';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import SurfacePanel from './SurfacePanel';

export default function PositioningSection() {
  return (
    <SectionShell>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.35fr] items-start">
        <SectionHeader
          eyebrow="Positioning"
          title="The boundary between hosted capability and real-world use."
          body="CHP is deliberately narrow: it standardizes how independent systems expose, call, govern, and audit capabilities without choosing the model, framework, cloud, or policy engine for you."
          className="md:block"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {POSITIONING_POINTS.map((group) => (
            <SurfacePanel key={group.label}>
              <h3 className="text-base font-semibold text-zinc-100 mb-5">
                {group.label}
              </h3>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-zinc-400">
                    <span className="mt-2 h-px w-5 flex-shrink-0 bg-zinc-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </SurfacePanel>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
