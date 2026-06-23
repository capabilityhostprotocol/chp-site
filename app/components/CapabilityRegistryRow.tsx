import Badge from './Badge';

type RegistryLifecycle =
  | 'invokable'
  | 'deprecated'
  | 'unavailable'
  | 'verified'
  | 'composed'
  | 'evidence_emitting';

type RegistryPolicy =
  | 'open'
  | 'restricted'
  | 'approval_required'
  | 'audited'
  | 'blocked'
  | 'revoked';

type CapabilityRegistryRowProps = {
  capability: string;
  host: string;
  version: string;
  lifecycle: RegistryLifecycle;
  policy: RegistryPolicy;
  modes: string[];
  evidence: string[];
  summary: string;
  checkedAt: string;
};

const LIFECYCLE_LABELS: Record<RegistryLifecycle, string> = {
  invokable: 'Invokable',
  deprecated: 'Deprecated',
  unavailable: 'Unavailable',
  verified: 'Verified',
  composed: 'Composed',
  evidence_emitting: 'Evidence emitting',
};

const LIFECYCLE_TONES: Record<
  RegistryLifecycle,
  'neutral' | 'signal' | 'approved' | 'required' | 'blocked'
> = {
  invokable: 'signal',
  deprecated: 'required',
  unavailable: 'blocked',
  verified: 'approved',
  composed: 'signal',
  evidence_emitting: 'approved',
};

const POLICY_LABELS: Record<RegistryPolicy, string> = {
  open: 'Open',
  restricted: 'Restricted',
  approval_required: 'Approval required',
  audited: 'Audited',
  blocked: 'Blocked',
  revoked: 'Revoked',
};

const POLICY_TONES: Record<
  RegistryPolicy,
  'neutral' | 'signal' | 'approved' | 'required' | 'blocked'
> = {
  open: 'approved',
  restricted: 'required',
  approval_required: 'required',
  audited: 'signal',
  blocked: 'blocked',
  revoked: 'blocked',
};

export default function CapabilityRegistryRow({
  capability,
  host,
  version,
  lifecycle,
  policy,
  modes,
  evidence,
  summary,
  checkedAt,
}: CapabilityRegistryRowProps) {
  return (
    <article className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)]/70 p-4 shadow-[var(--shadow-surface)]">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.8fr_0.9fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words font-mono text-sm text-zinc-100">
              {capability}
            </h3>
            <Badge tone={LIFECYCLE_TONES[lifecycle]}>
              {LIFECYCLE_LABELS[lifecycle]}
            </Badge>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-zinc-400">{summary}</p>
        </div>
        <dl className="grid gap-2 font-mono text-[11px] text-zinc-400">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <dt className="uppercase text-zinc-500">Host</dt>
            <dd className="break-words text-zinc-300">{host}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <dt className="uppercase text-zinc-500">Version</dt>
            <dd className="text-zinc-300">{version}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <dt className="uppercase text-zinc-500">Checked</dt>
            <dd className="text-zinc-300">{checkedAt}</dd>
          </div>
        </dl>
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge tone={POLICY_TONES[policy]}>{POLICY_LABELS[policy]}</Badge>
            {modes.map((mode) => (
              <Badge key={mode}>{mode}</Badge>
            ))}
          </div>
          <p className="font-mono text-[11px] uppercase text-zinc-500">
            Emits
          </p>
          <div className="flex flex-wrap gap-2">
            {evidence.map((event) => (
              <span
                key={event}
                className="rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-field)] px-2 py-1 font-mono text-[11px] text-zinc-400"
              >
                {event}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
