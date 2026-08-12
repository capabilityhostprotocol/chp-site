import AccessMatrix from './AccessMatrix';
import AuditTrace from './AuditTrace';
import CapabilityRegistryRow from './CapabilityRegistryRow';
import OperationalStatePanel from './OperationalStatePanel';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import TrustPanel from './TrustPanel';
import VerificationSeal from './VerificationSeal';

const REGISTRY_ROWS = [
  {
    capability: 'schedule_technician',
    host: 'service-ops-host',
    version: '1.0.0',
    lifecycle: 'verified' as const,
    policy: 'approval_required' as const,
    modes: ['sync'],
    evidence: ['execution_started', 'execution_denied'],
    summary:
      'Dispatch scheduling is verified for approval-required denial and successful execution paths.',
    checkedAt: '2026-06-16',
  },
  {
    capability: 'notify_customer',
    host: 'customer-comms-host',
    version: '1.4.0',
    lifecycle: 'deprecated' as const,
    policy: 'audited' as const,
    modes: ['async'],
    evidence: ['execution_started', 'execution_completed'],
    summary:
      'The current notification contract remains callable while clients migrate to notify_customer.v2.',
    checkedAt: '2026-06-15',
  },
  {
    capability: 'issue_refund',
    host: 'billing-host',
    version: '0.9.0',
    lifecycle: 'unavailable' as const,
    policy: 'revoked' as const,
    modes: ['sync'],
    evidence: ['execution_denied'],
    summary:
      'Refund issuance is visible in discovery, but the current grant is revoked until billing policy is reapproved.',
    checkedAt: '2026-06-14',
  },
];

const TRUST_CHECKS = [
  {
    label: 'Descriptor',
    state: 'pass' as const,
    detail: 'HostDescriptor validates and protocol_version is 0.1.',
  },
  {
    label: 'Evidence',
    state: 'pass' as const,
    detail: 'ExecutionEvidence includes event_type, correlation, sequence, and assurance metadata.',
  },
  {
    label: 'Policy',
    state: 'review' as const,
    detail: 'approval_required paths are covered; revoked access still needs operator review.',
  },
  {
    label: 'Lifecycle',
    state: 'pass' as const,
    detail: 'Deprecated and unavailable capabilities remain discoverable with structured outcomes.',
  },
];

const ACCESS_GRANTS = [
  {
    subject: 'agent://planning-assistant',
    capability: 'schedule_technician',
    access: 'approval_required' as const,
    policy: 'manager_approval',
    evidence: 'execution_denied',
  },
  {
    subject: 'user://dispatch-manager',
    capability: 'schedule_technician',
    access: 'allowed' as const,
    policy: 'service:dispatch',
    evidence: 'execution_completed',
  },
  {
    subject: 'agent://billing-helper',
    capability: 'issue_refund',
    access: 'revoked' as const,
    policy: 'grant_2026_04 revoked',
    evidence: 'execution_denied',
  },
  {
    subject: 'agent://ops-summary',
    capability: 'delete_service_job',
    access: 'blocked' as const,
    policy: 'risk_tier_exceeded',
    evidence: 'execution_denied',
  },
];

const AUDIT_EVENTS = [
  {
    sequence: 1,
    eventType: 'execution_started',
    outcome: 'success' as const,
    actor: 'agent://planning-assistant',
    timestamp: '15:14:20.000Z',
    detail: 'InvocationEnvelope accepted for schedule_technician.',
  },
  {
    sequence: 2,
    eventType: 'execution_denied',
    outcome: 'denied' as const,
    actor: 'service-ops-host',
    timestamp: '15:14:22.104Z',
    detail: 'manager_approval must approve before execution.',
    code: 'approval_required',
  },
  {
    sequence: 3,
    eventType: 'execution_skipped',
    outcome: 'skipped' as const,
    actor: 'billing-host',
    timestamp: '15:15:02.402Z',
    detail: 'issue_refund exists but is unavailable for the current grant.',
    code: 'capability_disabled',
  },
];

const PRODUCT_STATES = [
  {
    state: 'empty' as const,
    title: 'No capabilities match the filter',
    body: 'Keep the registry frame visible and explain which filter produced an empty result.',
  },
  {
    state: 'loading' as const,
    title: 'Refreshing host descriptors',
    body: 'Loading states should preserve table dimensions so registry rows do not jump.',
  },
  {
    state: 'unavailable' as const,
    title: 'Capability unavailable',
    body: 'The capability exists, but lifecycle state prevents invocation.',
    evidence: 'denial.code = capability_disabled',
  },
  {
    state: 'revoked' as const,
    title: 'Access grant revoked',
    body: 'A subject may have existed before, but current policy denies the invocation.',
    evidence: 'denial.code = policy_blocked',
  },
  {
    state: 'error' as const,
    title: 'Host evidence failed validation',
    body: 'Runtime or validation failures need a stable error code and next inspection target.',
    evidence: 'error.code = host_error',
  },
];

export default function ProductSurfaceShowcase() {
  return (
    <>
      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <SectionHeader
              eyebrow="Registry and trust"
              title="Expose capability state before invocation."
              body="Product surfaces should let operators scan lifecycle, policy, version, evidence, and verification without opening raw JSON first."
              className="mb-6 md:block"
            />
            <div className="grid gap-3">
              {REGISTRY_ROWS.map((row) => (
                <CapabilityRegistryRow key={row.capability} {...row} />
              ))}
            </div>
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <TrustPanel
              host="service-ops-host"
              summary="Trust is a composed view of descriptor validity, policy handling, lifecycle enforcement, and evidence quality."
              checks={TRUST_CHECKS}
            />
            <VerificationSeal
              status="verified"
              label="schedule_technician v1.0.0"
              summary="Conformance evidence covers success, approval_required denial, and replay by correlation ID."
              evidenceCount={18}
              checkedAt="2026-06-16"
              conformanceCase="approval_required_denial"
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="min-w-0">
            <SectionHeader
              eyebrow="Access"
              title="Make subject policy inspectable."
              body="Access views should distinguish allowed, approval-required, revoked, and blocked states without relying on color alone."
              className="mb-6 md:block"
            />
            <AccessMatrix title="Dispatch operations grants" grants={ACCESS_GRANTS} />
          </div>
          <div className="min-w-0">
            <SectionHeader
              eyebrow="Audit"
              title="Preserve the protocol trail."
              body="Audit traces should expose event type, outcome, denial or error code, actor, sequence, and timestamp in one scan path."
              className="mb-6 md:block"
            />
            <AuditTrace correlationId="session-abc" events={AUDIT_EVENTS} />
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeader
          eyebrow="Operational states"
          title="Design empty, loading, unavailable, revoked, and error states first."
          body="These states carry protocol meaning and should be ready before a registry, console, or managed provider surface depends on them."
          className="mb-8"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {PRODUCT_STATES.map((state) => (
            <OperationalStatePanel key={state.state} {...state} />
          ))}
        </div>
      </SectionShell>
    </>
  );
}
