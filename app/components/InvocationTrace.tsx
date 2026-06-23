type InvocationTraceProps = {
  actor: string;
  capability: string;
  host: string;
  policy: string;
  context: string;
  result: string;
};

const STEP_LABELS = [
  'Actor',
  'Capability',
  'Host',
  'Policy',
  'Context',
  'Result',
] as const;

export default function InvocationTrace({
  actor,
  capability,
  host,
  policy,
  context,
  result,
}: InvocationTraceProps) {
  const values = [actor, capability, host, policy, context, result];

  return (
    <div className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)]/75 p-4">
      <p className="mb-4 font-mono text-[11px] uppercase text-zinc-400">
        Invocation trace
      </p>
      <ol className="grid gap-3 md:grid-cols-6">
        {STEP_LABELS.map((label, index) => (
          <li key={label} className="relative">
            <div className="min-h-24 rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-field-950)]/80 p-3">
              <span className="font-mono text-[10px] uppercase text-zinc-500">
                {String(index + 1).padStart(2, '0')} {label}
              </span>
              <p className="mt-3 break-words font-mono text-xs leading-relaxed text-zinc-300">
                {values[index]}
              </p>
            </div>
            {index < STEP_LABELS.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-2 top-10 hidden font-mono text-zinc-500 md:block"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
