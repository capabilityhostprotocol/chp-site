import Badge from './Badge';

type TrustState = 'pass' | 'review' | 'fail';

type TrustCheck = {
  label: string;
  state: TrustState;
  detail: string;
};

type TrustPanelProps = {
  host: string;
  summary: string;
  checks: TrustCheck[];
};

const STATE_LABELS: Record<TrustState, string> = {
  pass: 'Pass',
  review: 'Review',
  fail: 'Fail',
};

const STATE_TONES: Record<
  TrustState,
  'neutral' | 'signal' | 'approved' | 'required' | 'blocked'
> = {
  pass: 'approved',
  review: 'required',
  fail: 'blocked',
};

export default function TrustPanel({ host, summary, checks }: TrustPanelProps) {
  const failedCount = checks.filter((check) => check.state === 'fail').length;
  const reviewCount = checks.filter((check) => check.state === 'review').length;
  const panelState =
    failedCount > 0 ? 'fail' : reviewCount > 0 ? 'review' : 'pass';

  return (
    <section className="rounded-lg border border-[color:var(--color-host-border)] bg-[color:var(--color-host-background)] p-5 shadow-[var(--shadow-glow-signal)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase text-zinc-600">
          Trust panel
        </p>
        <Badge tone={STATE_TONES[panelState]}>
          {STATE_LABELS[panelState]}
        </Badge>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-zinc-100">{host}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{summary}</p>
      <div className="mt-5 divide-y divide-[color:var(--color-border-subtle)] border-y border-[color:var(--color-border-subtle)]">
        {checks.map((check) => (
          <div key={check.label} className="grid gap-2 py-3 sm:grid-cols-[0.7fr_0.4fr_1.2fr]">
            <p className="font-mono text-xs text-zinc-300">{check.label}</p>
            <Badge tone={STATE_TONES[check.state]}>
              {STATE_LABELS[check.state]}
            </Badge>
            <p className="text-xs leading-relaxed text-zinc-500">{check.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
