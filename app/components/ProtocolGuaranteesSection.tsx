import { PROTOCOL_GUARANTEES } from '../lib/content';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import SurfacePanel from './SurfacePanel';

const FLOW = ['discover', 'validate', 'authorize', 'invoke', 'record'];

export default function ProtocolGuaranteesSection() {
  return (
    <SectionShell>
      <SectionHeader
        eyebrow="Protocol guarantees"
        title="Interoperability needs more than a tool schema."
        body="CHP treats malformed inputs, unavailable capabilities, lifecycle violations, authorization failures, and version mismatches as first-class protocol outcomes."
        className="mb-10"
        action={
          <a
            href="/protocol"
            className="whitespace-nowrap text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Explore the protocol -&gt;
          </a>
        }
      />

      <SurfacePanel className="mb-6 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {FLOW.map((step, index) => (
            <div key={step} className="relative">
              <div className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3">
                <p className="font-mono text-[11px] text-zinc-400 mb-1">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="text-sm font-medium text-zinc-200">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </SurfacePanel>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROTOCOL_GUARANTEES.map((guarantee) => (
          <SurfacePanel key={guarantee.title} variant="muted">
            <h3 className="text-sm font-semibold text-zinc-100 mb-2">
              {guarantee.title}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {guarantee.body}
            </p>
          </SurfacePanel>
        ))}
      </div>
    </SectionShell>
  );
}
