import { FAILURE_MODES } from '../lib/content';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

export default function FailureModesSection() {
  return (
    <SectionShell>
      <div className="grid lg:grid-cols-[0.8fr_1.4fr] gap-10 items-start">
        <SectionHeader
          eyebrow="If this has happened"
          title="The protocol should meet the failure before the demo does."
          body="CHP is for teams that have already learned that hosted capabilities need more than a callable function and a hopeful log line."
          className="md:block"
        />

        <div className="divide-y divide-zinc-800 border-y border-zinc-800">
          {FAILURE_MODES.map((mode) => (
            <div
              key={mode.pain}
              className="grid gap-4 py-5 md:grid-cols-[0.8fr_1fr_1fr]"
            >
              <h3 className="text-sm font-semibold text-zinc-100">{mode.pain}</h3>
              <p className="text-xs leading-relaxed text-zinc-500">{mode.cost}</p>
              <p className="text-xs leading-relaxed text-zinc-300">{mode.chp}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
