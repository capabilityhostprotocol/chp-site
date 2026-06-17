import Badge from './Badge';

type OperationalState =
  | 'empty'
  | 'loading'
  | 'unavailable'
  | 'revoked'
  | 'error';

type OperationalStatePanelProps = {
  state: OperationalState;
  title: string;
  body: string;
  evidence?: string;
};

const STATE_LABELS: Record<OperationalState, string> = {
  empty: 'Empty',
  loading: 'Loading',
  unavailable: 'Unavailable',
  revoked: 'Revoked',
  error: 'Error',
};

const STATE_TONES: Record<
  OperationalState,
  'neutral' | 'signal' | 'approved' | 'required' | 'blocked'
> = {
  empty: 'neutral',
  loading: 'signal',
  unavailable: 'blocked',
  revoked: 'blocked',
  error: 'blocked',
};

const STATE_STYLES: Record<OperationalState, string> = {
  empty: 'border-[color:var(--color-border-subtle)]',
  loading: 'border-[color:var(--color-protocol-blue)]',
  unavailable: 'border-[color:var(--color-policy-blocked)]',
  revoked: 'border-[color:var(--color-policy-blocked)]',
  error: 'border-[color:var(--color-policy-blocked)]',
};

export default function OperationalStatePanel({
  state,
  title,
  body,
  evidence,
}: OperationalStatePanelProps) {
  const busyProps = state === 'loading' ? { 'aria-busy': true } : {};

  return (
    <div
      className={`rounded-lg border bg-[color:var(--color-surface-900)]/70 p-4 shadow-[var(--shadow-surface)] ${STATE_STYLES[state]}`}
      {...busyProps}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase text-zinc-600">
          Product state
        </p>
        <Badge tone={STATE_TONES[state]}>{STATE_LABELS[state]}</Badge>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-zinc-100">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{body}</p>
      {state === 'loading' && (
        <div className="mt-4 grid gap-2" aria-hidden="true">
          <div className="h-2 rounded bg-zinc-800" />
          <div className="h-2 w-2/3 rounded bg-zinc-800" />
        </div>
      )}
      {evidence && (
        <p className="mt-4 break-words border-t border-[color:var(--color-border-subtle)] pt-3 font-mono text-[11px] text-zinc-600">
          {evidence}
        </p>
      )}
    </div>
  );
}
