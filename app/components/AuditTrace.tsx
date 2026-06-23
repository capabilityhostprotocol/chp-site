import Badge from './Badge';

type AuditOutcome = 'success' | 'denied' | 'failure' | 'skipped';

type AuditEvent = {
  sequence: number;
  eventType: string;
  outcome: AuditOutcome;
  actor: string;
  timestamp: string;
  detail: string;
  code?: string;
};

type AuditTraceProps = {
  correlationId: string;
  events: AuditEvent[];
};

const OUTCOME_TONES: Record<
  AuditOutcome,
  'neutral' | 'signal' | 'approved' | 'required' | 'blocked'
> = {
  success: 'approved',
  denied: 'required',
  failure: 'blocked',
  skipped: 'neutral',
};

export default function AuditTrace({ correlationId, events }: AuditTraceProps) {
  return (
    <section className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-field)]/75 shadow-[var(--shadow-surface)]">
      <div className="border-b border-[color:var(--color-border-subtle)] px-4 py-3">
        <p className="font-mono text-[11px] uppercase text-zinc-400">
          Audit trace
        </p>
        <h3 className="mt-2 break-words font-mono text-sm text-zinc-100">
          {correlationId}
        </h3>
      </div>
      <ol className="divide-y divide-[color:var(--color-border-subtle)]">
        {events.map((event) => (
          <li
            key={`${event.sequence}-${event.eventType}`}
            className="grid gap-3 px-4 py-4 sm:grid-cols-[0.25fr_0.75fr_0.5fr_1.3fr]"
          >
            <p className="font-mono text-[11px] text-zinc-400">
              {String(event.sequence).padStart(2, '0')}
            </p>
            <div>
              <p className="break-words font-mono text-xs text-zinc-300">
                {event.eventType}
              </p>
              <p className="mt-1 font-mono text-[11px] text-zinc-400">
                {event.timestamp}
              </p>
            </div>
            <div>
              <Badge tone={OUTCOME_TONES[event.outcome]}>{event.outcome}</Badge>
            </div>
            <div>
              <p className="text-xs leading-relaxed text-zinc-400">
                {event.detail}
              </p>
              {event.code && (
                <p className="mt-2 font-mono text-[11px] text-zinc-400">
                  code: {event.code}
                </p>
              )}
              <p className="mt-2 font-mono text-[11px] text-zinc-500">
                actor: {event.actor}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
