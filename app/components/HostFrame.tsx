import Badge from './Badge';
import CapabilityUnit from './CapabilityUnit';
import type { CapabilityState } from './CapabilityUnit';

type HostCapability = {
  name: string;
  description: string;
  status: CapabilityState;
  policy: string;
  version: string;
};

type HostFrameProps = {
  hostType: string;
  hostName: string;
  policySummary: string;
  health: string;
  capabilities: HostCapability[];
};

export default function HostFrame({
  hostType,
  hostName,
  policySummary,
  health,
  capabilities,
}: HostFrameProps) {
  return (
    <div className="rounded-lg border border-[color:var(--color-host-border)] bg-[color:var(--color-host-background)] shadow-[var(--shadow-glow-signal)]">
      <div className="border-b border-[color:var(--color-border-subtle)] px-5 py-4">
        <p className="font-mono text-[11px] uppercase text-zinc-600">{hostType}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-zinc-100">{hostName}</h3>
          <Badge tone={health.toLowerCase() === 'available' ? 'approved' : 'blocked'}>
            {health}
          </Badge>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">{policySummary}</p>
      </div>
      <div className="grid gap-3 p-4">
        {capabilities.map((capability) => (
          <CapabilityUnit
            key={capability.name}
            name={capability.name}
            description={capability.description}
            host={hostName}
            policy={capability.policy}
            version={capability.version}
            state={capability.status}
          />
        ))}
      </div>
    </div>
  );
}
