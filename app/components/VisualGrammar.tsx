import { FIELD_SERVICE_EXAMPLE } from '../lib/content';
import HostFrame from './HostFrame';
import InvocationTrace from './InvocationTrace';
import PolicyBoundary from './PolicyBoundary';
import AuditTrace from './AuditTrace';

const FS = FIELD_SERVICE_EXAMPLE;

const AUDIT_EVENTS = [
  {
    sequence: 1,
    eventType: 'execution_started',
    outcome: 'success' as const,
    actor: 'agent://planning-assistant',
    timestamp: '2026-06-16T15:14:20.001Z',
    detail: 'Invocation admitted through the boundary; handler begins.',
  },
  {
    sequence: 2,
    eventType: 'approval_granted',
    outcome: 'success' as const,
    actor: 'human://shift-manager',
    timestamp: '2026-06-16T15:14:21.488Z',
    detail: 'Manager approved the dispatch — a governed human decision in the trace.',
  },
  {
    sequence: 3,
    eventType: 'execution_completed',
    outcome: 'success' as const,
    actor: 'host://ServiceOpsHost',
    timestamp: '2026-06-16T15:14:22.104Z',
    detail: 'Technician reserved; appointment confirmed.',
  },
];

const BLOCKS = [
  {
    label: 'A host exposes capabilities',
    body: 'A host declares what it can do — each capability with a version, a policy, and a lifecycle state — before anyone calls it.',
    visual: (
      <HostFrame
        hostType="Business process host"
        hostName={FS.host}
        policySummary="High-value actions require approval; every invocation is evidenced."
        health="Available"
        capabilities={FS.capabilities}
      />
    ),
  },
  {
    label: 'An invocation crosses the boundary',
    body: 'A caller invokes through actor, capability, host, policy, and context — and the boundary returns a result.',
    visual: (
      <InvocationTrace
        actor={FS.actor}
        capability={FS.capability}
        host={FS.host}
        policy={FS.policy}
        context={FS.context}
        result={FS.result}
      />
    ),
  },
  {
    label: 'Policy is visible before the action',
    body: 'Governance is part of the contract: a capability declares whether it is open, restricted, or needs approval — before it runs.',
    visual: (
      <PolicyBoundary
        state="approval_required"
        label={FS.capability}
        description="Dispatching a technician needs manager approval. Without it, the boundary denies the action and records the denial."
      />
    ),
  },
  {
    label: 'Every attempt leaves evidence',
    body: 'The result is a replayable, tamper-evident trail — including the human approval — correlated by one id.',
    visual: <AuditTrace correlationId="session-abc" events={AUDIT_EVENTS} />,
  },
];

export default function VisualGrammar() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-b border-zinc-800/60">
      <p className="eyebrow mb-3">
        The protocol, drawn
      </p>
      <h2 className="display-2 text-zinc-100 mb-3 max-w-3xl">
        One example, through every primitive.
      </h2>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-12">
        The same field-service action — a planning agent scheduling a technician,
        gated by a manager&apos;s approval — drawn through the host, the
        invocation, the policy boundary, and the evidence it leaves.
      </p>

      <div className="space-y-12">
        {BLOCKS.map((b) => (
          <div key={b.label} className="grid lg:grid-cols-[0.7fr_1.3fr] gap-8 items-start">
            <div className="lg:pt-2">
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                {b.label}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{b.body}</p>
            </div>
            <div>{b.visual}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
