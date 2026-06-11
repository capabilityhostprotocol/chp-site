type PolicyState = 'open' | 'restricted' | 'approval_required' | 'audited' | 'blocked';

type PolicyBoundaryProps = {
  state: PolicyState;
  label: string;
  description: string;
};

const STATE_STYLES: Record<PolicyState, string> = {
  open: 'border-[color:var(--color-policy-approved)]',
  restricted: 'border-[color:var(--color-policy-required)]',
  approval_required: 'border-[color:var(--color-policy-required)] shadow-[var(--shadow-glow-policy)]',
  audited: 'border-[color:var(--color-protocol-blue)]',
  blocked: 'border-[color:var(--color-policy-blocked)]',
};

const STATE_LABELS: Record<PolicyState, string> = {
  open: 'Open',
  restricted: 'Restricted',
  approval_required: 'Approval required',
  audited: 'Audited',
  blocked: 'Blocked',
};

export default function PolicyBoundary({
  state,
  label,
  description,
}: PolicyBoundaryProps) {
  return (
    <div
      className={`rounded-lg border bg-[color:var(--color-surface-900)]/75 p-4 ${STATE_STYLES[state]}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-[11px] uppercase text-zinc-600">Policy boundary</p>
        <span className="rounded-full border border-[color:var(--color-border-subtle)] px-2 py-0.5 text-[11px] text-zinc-400">
          {STATE_LABELS[state]}
        </span>
      </div>
      <h3 className="mt-3 text-sm font-semibold text-zinc-100">{label}</h3>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{description}</p>
    </div>
  );
}
