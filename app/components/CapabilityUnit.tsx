import Badge from './Badge';

export type CapabilityState =
  | 'declared'
  | 'hosted'
  | 'discoverable'
  | 'invokable'
  | 'restricted'
  | 'blocked'
  | 'verified'
  | 'deprecated'
  | 'unavailable'
  | 'composed'
  | 'evidence_emitting';

type CapabilityUnitProps = {
  name: string;
  description?: string;
  host?: string;
  policy?: string;
  version?: string;
  state?: CapabilityState;
  variant?: 'card' | 'compact';
};

const STATE_STYLES: Record<CapabilityState, string> = {
  declared: 'border-dashed border-[color:var(--color-capability-dormant)]',
  hosted: 'border-[color:var(--color-host-border)]',
  discoverable: 'border-[color:var(--color-protocol-blue)]',
  invokable: 'border-[color:var(--color-capability-active)]',
  restricted: 'border-[color:var(--color-policy-required)]',
  blocked: 'border-[color:var(--color-policy-blocked)]',
  verified: 'border-[color:var(--color-policy-approved)]',
  deprecated: 'border-dashed border-[color:var(--color-policy-required)]',
  unavailable: 'border-[color:var(--color-policy-blocked)] opacity-85',
  composed: 'border-[color:var(--color-protocol-blue)]',
  evidence_emitting: 'border-[color:var(--color-policy-approved)]',
};

const STATE_LABELS: Record<CapabilityState, string> = {
  declared: 'Declared',
  hosted: 'Hosted',
  discoverable: 'Discoverable',
  invokable: 'Invokable',
  restricted: 'Restricted',
  blocked: 'Blocked',
  verified: 'Verified',
  deprecated: 'Deprecated',
  unavailable: 'Unavailable',
  composed: 'Composed',
  evidence_emitting: 'Evidence emitting',
};

const STATE_TONES: Record<
  CapabilityState,
  'neutral' | 'signal' | 'approved' | 'required' | 'blocked'
> = {
  declared: 'neutral',
  hosted: 'signal',
  discoverable: 'signal',
  invokable: 'signal',
  restricted: 'required',
  blocked: 'blocked',
  verified: 'approved',
  deprecated: 'required',
  unavailable: 'blocked',
  composed: 'signal',
  evidence_emitting: 'approved',
};

export default function CapabilityUnit({
  name,
  description,
  host,
  policy,
  version,
  state = 'hosted',
  variant = 'card',
}: CapabilityUnitProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`rounded-lg border bg-[color:var(--color-surface-900)]/80 shadow-[var(--shadow-surface)] ${STATE_STYLES[state]} ${
        isCompact ? 'px-3 py-2' : 'p-4'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-sm text-zinc-100">{name}</span>
        <Badge tone={STATE_TONES[state]}>{STATE_LABELS[state]}</Badge>
      </div>
      {description && !isCompact && (
        <p className="mt-3 text-xs leading-relaxed text-zinc-400">{description}</p>
      )}
      {(host || policy || version) && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-zinc-400">
          {host && <span>host: {host}</span>}
          {policy && <span>policy: {policy}</span>}
          {version && <span>v{version}</span>}
        </div>
      )}
    </div>
  );
}
