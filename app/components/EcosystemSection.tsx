import { PROTOCOL_AUDIENCES } from '../lib/content';
import { adapterCount } from '../lib/adapters';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import SurfacePanel from './SurfacePanel';

const PROBLEMS = [
  'Every product and agent framework invents its own tool contract.',
  'Hosts expose powerful actions without portable lifecycle semantics.',
  'Applications need audit trails that survive provider and runtime changes.',
];

export default function EcosystemSection() {
  return (
    <SectionShell>
      <div className="grid lg:grid-cols-[0.95fr_1.35fr] gap-10 items-start">
        <div>
          <SectionHeader
            eyebrow="Why CHP exists"
            title="Hosted capability needs a public protocol boundary."
            body="CHP separates the hosts that expose capabilities from the actors and systems that call them. The protocol makes discovery, invocation, governance, evidence, and replay portable across independent implementations."
            className="mb-7 md:block"
          />
          <div className="space-y-3">
            {PROBLEMS.map((problem) => (
              <div key={problem} className="flex gap-3 text-sm text-zinc-400">
                <span className="mt-2 h-px w-5 bg-zinc-700 flex-shrink-0" />
                <span>{problem}</span>
              </div>
            ))}
          </div>
          <a
            href="/adapters"
            className="mt-6 inline-flex text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            Browse the {adapterCount} governed adapters -&gt;
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {PROTOCOL_AUDIENCES.map((audience) => (
            <SurfacePanel key={audience.role}>
              <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
                {audience.role}
              </p>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                {audience.headline}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {audience.body}
              </p>
            </SurfacePanel>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
