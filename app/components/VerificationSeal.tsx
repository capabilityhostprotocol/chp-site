import Badge from './Badge';

type VerificationStatus = 'verified' | 'candidate' | 'stale' | 'failed';

type VerificationSealProps = {
  status: VerificationStatus;
  label: string;
  summary: string;
  evidenceCount: number;
  checkedAt: string;
  conformanceCase: string;
};

const STATUS_LABELS: Record<VerificationStatus, string> = {
  verified: 'Verified',
  candidate: 'Candidate',
  stale: 'Stale',
  failed: 'Failed',
};

const STATUS_TONES: Record<
  VerificationStatus,
  'neutral' | 'signal' | 'approved' | 'required' | 'blocked'
> = {
  verified: 'approved',
  candidate: 'signal',
  stale: 'required',
  failed: 'blocked',
};

const STATUS_STYLES: Record<VerificationStatus, string> = {
  verified: 'border-[color:var(--color-policy-approved)]',
  candidate: 'border-[color:var(--color-protocol-blue)]',
  stale: 'border-[color:var(--color-policy-required)]',
  failed: 'border-[color:var(--color-policy-blocked)]',
};

export default function VerificationSeal({
  status,
  label,
  summary,
  evidenceCount,
  checkedAt,
  conformanceCase,
}: VerificationSealProps) {
  return (
    <div
      className={`rounded-lg border bg-[color:var(--color-surface-900)]/75 p-4 shadow-[var(--shadow-surface)] ${STATUS_STYLES[status]}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase text-zinc-600">
          Verification seal
        </p>
        <Badge tone={STATUS_TONES[status]}>{STATUS_LABELS[status]}</Badge>
      </div>
      <h3 className="mt-3 text-base font-semibold text-zinc-100">{label}</h3>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{summary}</p>
      <dl className="mt-4 grid gap-3 border-t border-[color:var(--color-border-subtle)] pt-4 font-mono text-[11px] text-zinc-500 sm:grid-cols-3">
        <div>
          <dt className="uppercase text-zinc-700">Evidence</dt>
          <dd className="mt-1 text-zinc-300">{evidenceCount} events</dd>
        </div>
        <div>
          <dt className="uppercase text-zinc-700">Case</dt>
          <dd className="mt-1 break-words text-zinc-300">{conformanceCase}</dd>
        </div>
        <div>
          <dt className="uppercase text-zinc-700">Checked</dt>
          <dd className="mt-1 text-zinc-300">{checkedAt}</dd>
        </div>
      </dl>
    </div>
  );
}
