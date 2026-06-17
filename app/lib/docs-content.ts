type PolicyState =
  | 'open'
  | 'restricted'
  | 'approval_required'
  | 'audited'
  | 'blocked'
  | 'revoked';

type CapabilityState =
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

export type DocsPage = {
  slug: string;
  group: 'Introduction' | 'Concepts' | 'Guides' | 'Examples' | 'Reference' | 'Comparisons';
  title: string;
  summary: string;
  plain: string;
  why: string;
  formal: string;
  example: string;
  relationships: string[];
  visualModel: string[];
  implementationNotes: string[];
  commonMistakes: string[];
  related: { title: string; href: string }[];
  capability?: {
    name: string;
    description: string;
    host: string;
    policy: string;
    version: string;
    state: CapabilityState;
  };
  trace?: {
    actor: string;
    capability: string;
    host: string;
    policy: string;
    context: string;
    result: string;
  };
  policy?: {
    state: PolicyState;
    label: string;
    description: string;
  };
  code?: {
    label: string;
    language: string;
    code: string;
  };
  comparison?: {
    comparedTo: string;
    theyCenter: string;
    chpCenters: string;
    guidance: string[];
  };
  referenceTable?: {
    title: string;
    description: string;
    columns: [string, string, string];
    rows: {
      name: string;
      value: string;
      detail: string;
    }[];
  };
  productSurface?: boolean;
};

type ConceptInput = Omit<DocsPage, 'slug' | 'group' | 'related'> & {
  slug: string;
  related?: { title: string; href: string }[];
};

type DocsPageDefaults = Pick<
  DocsPage,
  'relationships' | 'visualModel' | 'implementationNotes' | 'commonMistakes' | 'related'
>;

type ReferencePageInput = Omit<DocsPage, 'group' | keyof DocsPageDefaults> &
  Partial<DocsPageDefaults>;

const DEFAULT_TRACE = {
  actor: 'Planning Agent',
  capability: 'schedule_technician',
  host: 'ServiceOpsHost',
  policy: 'manager_approval',
  context: 'job_context',
  result: 'Confirmed Appointment',
};

const DEFAULT_CAPABILITY = {
  name: 'schedule_technician',
  description: 'Finds an available qualified technician and reserves a service window.',
  host: 'ServiceOpsHost',
  policy: 'approval_required',
  version: '1.0.0',
  state: 'invokable' as const,
};

const DEFAULT_POLICY = {
  state: 'approval_required' as const,
  label: 'manager_approval',
  description:
    'A manager must approve technician scheduling before the host returns a confirmed appointment.',
};

const MANIFEST_FRAGMENT = `{
  "id": "service-ops-host",
  "version": "0.1.0",
  "protocol_version": "0.1",
  "kind": "service",
  "capabilities": [{
    "id": "schedule_technician",
    "version": "1.0.0",
    "description": "Finds an available qualified technician and reserves a service window.",
    "status": "experimental",
    "modes": ["sync"],
    "emits": ["execution_started", "execution_completed", "execution_denied"],
    "policy": {
      "risk_tier": "high",
      "auth_required": true,
      "approval_required": true,
      "allowed_actors": ["agent://planning-assistant"]
    },
    "metadata": {
      "required_permissions": ["service:dispatch"],
      "lifecycle": "invokable"
    }
  }],
  "evidence": {
    "store": "local-append-only",
    "append_only": true
  }
}`;

const INVOCATION_FRAGMENT = `{
  "invocation_id": "inv_session_abc_001",
  "capability_id": "schedule_technician",
  "version": "1.0.0",
  "mode": "sync",
  "correlation": { "correlation_id": "session-abc" },
  "subject": {
    "id": "agent://planning-assistant",
    "roles": ["dispatcher"]
  },
  "payload": {
    "job_id": "job_456",
    "window": "tomorrow"
  },
  "requested_at": "2026-06-16T15:14:20.000Z"
}`;

const OUTCOME_FRAGMENT = `{
  "invocation_id": "inv_session_abc_001",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "correlation": { "correlation_id": "session-abc" },
  "outcome": "denied",
  "success": false,
  "data": null,
  "error": null,
  "denial": {
    "code": "approval_required",
    "message": "manager_approval must approve before execution.",
    "retryable": true,
    "details": { "policy": "manager_approval" }
  },
  "evidence_ids": ["evt_8f3a1c"],
  "started_at": null,
  "completed_at": "2026-06-16T15:14:22.104Z"
}`;

function conceptPage(input: ConceptInput): DocsPage {
  return {
    ...input,
    slug: `concepts/${input.slug}`,
    group: 'Concepts',
    related: input.related ?? [
      { title: 'Host', href: '/docs/concepts/host' },
      { title: 'Invocation', href: '/docs/concepts/invocation' },
      { title: 'Policy', href: '/docs/concepts/policy' },
    ],
  };
}

function docsPage(page: DocsPage): DocsPage {
  return page;
}

function referencePage(input: ReferencePageInput): DocsPage {
  return docsPage({
    ...input,
    group: 'Reference',
    relationships: input.relationships ?? [
      'Reference pages turn protocol concepts into implementation checks.',
      'Field names, outcome codes, and conformance cases should stay stable across hosts.',
      'Examples should map every field back to capability, host, policy, context, or evidence.',
    ],
    visualModel: input.visualModel ?? [
      'Read the field or code before implementation.',
      'Map it into manifest, invocation, outcome, or evidence behavior.',
      'Add route, conformance, or unit coverage for each failure-sensitive field.',
    ],
    implementationNotes: input.implementationNotes ?? [
      'Prefer explicit protocol fields over framework-specific inference.',
      'Treat absent required fields as malformed protocol input.',
      'Keep examples close to the failure cases they are meant to prevent.',
    ],
    commonMistakes: input.commonMistakes ?? [
      'Letting transport status codes carry protocol meaning alone.',
      'Hiding required protocol state in logs or application glue.',
      'Testing only successful invocations.',
    ],
    related: input.related ?? [
      { title: 'Invocation', href: '/docs/concepts/invocation' },
      { title: 'Evidence', href: '/docs/concepts/evidence' },
      { title: 'Conformance', href: '/docs/concepts/conformance' },
    ],
  });
}

function failureModePage(input: {
  slug: string;
  title: string;
  summary: string;
  trigger: string;
  code: string;
  message: string;
  evidence: string;
  exampleCode: string;
}): DocsPage {
  return referencePage({
    slug: `reference/failure-modes/${input.slug}`,
    title: input.title,
    summary: input.summary,
    plain: `This failure mode should return a structured protocol record with ${input.code}, not an ambiguous framework or transport failure.`,
    why:
      'Independent callers need to branch on predictable protocol outcomes when a capability cannot safely execute.',
    formal:
      'A failure mode is a first-class protocol outcome with a stable denial.code or error.code, message, optional details, and evidence semantics.',
    example: input.trigger,
    relationships: [
      'Failure outcomes are produced during discovery, validation, authorization, lifecycle checks, execution, or timeout handling.',
      'Evidence should record the decision path when an invocation reaches the host boundary.',
      'Conformance should include both this failure and the neighboring happy path.',
    ],
    visualModel: [
      'Caller sends or discovers a protocol surface.',
      'Host or infrastructure detects the failure condition.',
      `Caller receives ${input.code} with structured details.`,
    ],
    implementationNotes: [
      'Return a stable code that callers can match programmatically.',
      'Include a human-readable message without depending on it for control flow.',
      'Attach evidence when the host boundary received and evaluated the request.',
    ],
    commonMistakes: [
      'Throwing a raw exception instead of a protocol outcome.',
      'Using different codes for the same failure across hosts.',
      'Omitting evidence for denied or rejected requests that reached policy or lifecycle checks.',
    ],
    related: [
      { title: 'Outcome codes', href: '/docs/reference/outcome-codes' },
      { title: 'Conformance cases', href: '/docs/reference/conformance-cases' },
      { title: 'Govern invocation', href: '/docs/guides/govern-invocation' },
    ],
    referenceTable: {
      title: `${input.title} outcome contract`,
      description:
        'Use this as the minimum machine-readable shape for tests and independent callers.',
      columns: ['Field', 'Value', 'Meaning'],
      rows: [
        { name: 'trigger', value: 'condition', detail: input.trigger },
        { name: 'denial.code or error.code', value: input.code, detail: input.message },
        { name: 'event_type', value: input.evidence, detail: 'Evidence type or absence expected for this failure.' },
      ],
    },
    code: {
      label: `${input.slug}.outcome.json`,
      language: 'json',
      code: input.exampleCode,
    },
  });
}

const CONCEPT_PAGES: DocsPage[] = [
  conceptPage({
    slug: 'capability',
    title: 'Capability',
    summary:
      'A capability is the named unit of work that CHP makes discoverable, governable, invokable, and auditable.',
    plain:
      'A capability is something a person, agent, product, service, process, or organization can do through a host.',
    why:
      'Callers need to understand the ability they are using before they bind a workflow, policy, or agent plan to it.',
    formal:
      'A capability is a stable, versioned, invokable unit exposed by a host with declared metadata, policy, lifecycle, inputs, outputs, and evidence behavior.',
    example:
      'schedule_technician is a capability because it names a specific hosted ability, declares policy, and returns a concrete result.',
    relationships: [
      'A host owns the capability lifecycle and manifest entry.',
      'A registry or manifest makes the capability discoverable before invocation.',
      'Policy determines whether the capability may execute for a caller.',
    ],
    visualModel: [
      'Caller discovers schedule_technician.',
      'Host validates the requested version and policy.',
      'Invocation produces Confirmed Appointment or a structured denial.',
    ],
    implementationNotes: [
      'Use stable capability IDs that describe the ability, not the transport endpoint.',
      'Publish version and availability before callers invoke the capability.',
      'Return structured outcomes for unavailable, denied, and failed executions.',
    ],
    commonMistakes: [
      'Treating a raw function name as the public protocol contract.',
      'Hiding lifecycle or permission state until after the invocation starts.',
      'Changing payload semantics without changing the capability version.',
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    code: { label: 'manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  conceptPage({
    slug: 'host',
    title: 'Host',
    summary:
      'A host is the accountable boundary that exposes capabilities and enforces lifecycle, policy, and evidence behavior.',
    plain:
      'A host is the system, service, product, process, or organization that owns what can be done.',
    why:
      'Independent callers need to know who owns a capability, whether it is available, and what rules apply before invoking it.',
    formal:
      'A host is a protocol participant that publishes manifest metadata, accepts or rejects invocations, enforces capability lifecycle, and emits outcomes and evidence.',
    example:
      'ServiceOpsHost exposes schedule_technician and query_inventory while enforcing manager approval and host-recognized entitlements.',
    relationships: [
      'A host publishes capabilities through a manifest.',
      'A host validates invocation envelopes and policy before execution.',
      'A host emits evidence that infrastructure can replay and export.',
    ],
    visualModel: [
      'Host identity appears before capability details.',
      'Capabilities sit inside the host boundary.',
      'Policy and evidence are host responsibilities, not caller guesses.',
    ],
    implementationNotes: [
      'Make HostDescriptor.id stable and unique inside the trust boundary.',
      'Expose unavailable capabilities as protocol state instead of transport errors.',
      'Keep host health separate from individual capability lifecycle.',
    ],
    commonMistakes: [
      'Letting each caller infer host identity from a URL.',
      'Returning generic 500 errors for disabled capabilities.',
      'Treating audit logs as optional implementation details.',
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    code: { label: 'manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  conceptPage({
    slug: 'adapter',
    title: 'Adapter',
    summary:
      'An adapter maps an existing system into a CHP capability contract without forcing that system to become CHP-native.',
    plain:
      'An adapter is the bridge from something you already have to a hosted capability interface.',
    why:
      'Most useful capabilities already live inside products, services, databases, scripts, and workflows that need a stable protocol boundary.',
    formal:
      'An adapter translates an existing provider or runtime surface into CHP manifest, invocation, outcome, policy, and evidence semantics.',
    example:
      'A ServiceOps adapter can map an internal dispatch API into schedule_technician while preserving CHP policy and outcome rules.',
    relationships: [
      'Adapters sit behind or beside hosts depending on ownership.',
      'Adapters should not erase lifecycle, permission, or version metadata.',
      'Adapters make conformance possible for existing systems.',
    ],
    visualModel: [
      'Existing system remains behind the adapter bridge.',
      'Adapter publishes a capability-shaped contract.',
      'CHP callers invoke the host boundary, not the private implementation.',
    ],
    implementationNotes: [
      'Map provider errors into structured CHP outcomes.',
      'Keep provider credentials and policy enforcement server-side.',
      'Document which provider semantics are not portable.',
    ],
    commonMistakes: [
      'Exposing provider-specific payloads as the public contract.',
      'Treating adapter availability as identical to provider availability.',
      'Skipping conformance because the underlying provider already has tests.',
    ],
    capability: {
      ...DEFAULT_CAPABILITY,
      name: 'create_project_update',
      host: 'ProjectOpsAdapter',
      policy: 'team_member',
      state: 'discoverable',
    },
    trace: {
      actor: 'Delivery Agent',
      capability: 'create_project_update',
      host: 'ProjectOpsAdapter',
      policy: 'team_member',
      context: 'project_context',
      result: 'Project Update',
    },
    code: { label: 'adapter-manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  conceptPage({
    slug: 'registry',
    title: 'Registry',
    summary:
      'A registry is the discoverable view of host capabilities, versions, availability, and requirements.',
    plain:
      'A registry tells callers what capabilities exist before they try to use them.',
    why:
      'Agents and applications need a trustworthy discovery step so planning does not depend on hidden or stale implementation details.',
    formal:
      'A registry is a manifest-backed capability index that exposes identity, version, lifecycle, permission, and metadata for selection and validation.',
    example:
      'A caller checks the ServiceOpsHost registry and sees that schedule_technician is invokable at version 1.0.0.',
    relationships: [
      'A registry is usually derived from host manifests.',
      'Invocation should use registry facts for compatibility checks.',
      'Conformance should prove registry data is truthful enough for callers.',
    ],
    visualModel: [
      'Caller asks what exists.',
      'Registry returns capability metadata and state.',
      'Caller invokes only after selecting a compatible capability.',
    ],
    implementationNotes: [
      'Include lifecycle and version metadata in the registry view.',
      'Avoid caching registry state beyond its safe freshness window.',
      'Make unavailable capabilities visible when callers need to reason about them.',
    ],
    commonMistakes: [
      'Publishing only names without versions or policy.',
      'Letting stale registry state cause unsafe invocation attempts.',
      'Treating discovery as a developer convenience instead of protocol state.',
    ],
    capability: { ...DEFAULT_CAPABILITY, state: 'discoverable' },
    trace: DEFAULT_TRACE,
    code: { label: 'manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  conceptPage({
    slug: 'invocation',
    title: 'Invocation',
    summary:
      'An invocation is a structured request to run a capability with subject attributes, mode, payload, requested time, and correlation.',
    plain:
      'An invocation is the moment a caller asks a host to do the named thing.',
    why:
      'Sensitive capability calls need more than a function call shape; they need identity, intent, policy checks, timeout behavior, and outcomes.',
    formal:
      'An invocation is a protocol envelope that names the capability, carries payload and subject context, declares mode, preserves correlation, and receives a structured result.',
    example:
      'Planning Agent invokes schedule_technician with job_context and receives either Confirmed Appointment or approval_required.',
    relationships: [
      'Invocation depends on manifest discovery and compatibility checks.',
      'Policy can deny or pause an invocation before execution.',
      'Evidence records accepted or denied invocation outcomes.',
    ],
    visualModel: [
      'Actor sends capability_id and payload.',
      'Host validates lifecycle, permission, and payload.',
      'Host returns a structured success, denial, or error outcome.',
    ],
    implementationNotes: [
      'Require correlation IDs for replay and debugging.',
      'Carry mode, subject, and correlation explicitly instead of relying on transport defaults.',
      'Keep denial outcomes machine-readable.',
    ],
    commonMistakes: [
      'Sending raw payloads without subject identity.',
      'Making policy failures indistinguishable from execution failures.',
      'Dropping correlation context before evidence is emitted.',
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    code: { label: 'invoke.json', language: 'json', code: INVOCATION_FRAGMENT },
  }),
  conceptPage({
    slug: 'policy',
    title: 'Policy',
    summary:
      'Policy is the visible governance rule that decides whether a capability may execute for a caller and context.',
    plain:
      'Policy is the rule at the capability boundary: open, restricted, approval required, audited, or blocked.',
    why:
      'Callers should know when a capability is sensitive before they invoke it, and hosts should return denials predictably.',
    formal:
      'Policy is the host-enforced authorization and governance state attached to a capability, invocation, or context.',
    example:
      'manager_approval requires a manager decision before schedule_technician returns a confirmed appointment.',
    relationships: [
      'Policy is declared in manifest metadata and enforced during invocation.',
      'Policy outcomes must be structured and replayable.',
      'Policy state should be visible as text, not only color.',
    ],
    visualModel: [
      'Caller requests a capability.',
      'Host evaluates permission and policy state.',
      'Invocation proceeds, pauses, or denies with a protocol outcome.',
    ],
    implementationNotes: [
      'Expose required entitlements or subject requirements before invocation.',
      'Return policy denials as structured outcomes.',
      'Separate policy state from host availability.',
    ],
    commonMistakes: [
      'Hiding policy behind generic authorization errors.',
      'Treating approval_required as a successful execution.',
      'Using color without visible state labels.',
    ],
    capability: { ...DEFAULT_CAPABILITY, state: 'restricted' },
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    code: { label: 'outcome.json', language: 'json', code: OUTCOME_FRAGMENT },
  }),
  conceptPage({
    slug: 'context',
    title: 'Context',
    summary:
      'Context is the caller, audience, environment, and payload information a host needs to validate an invocation.',
    plain:
      'Context is the information that makes a capability request meaningful and governable.',
    why:
      'The same capability can be safe or unsafe depending on who calls it, why they call it, and which operational situation it touches.',
    formal:
      'Context is structured invocation metadata and payload state used for validation, authorization, execution, evidence, and replay.',
    example:
      'job_context tells ServiceOpsHost which service job the Planning Agent wants to schedule.',
    relationships: [
      'Context travels inside the invocation envelope.',
      'Policy uses context to decide whether execution is allowed.',
      'Evidence records enough context to replay the decision path safely.',
    ],
    visualModel: [
      'Caller supplies context with the invocation.',
      'Host validates the context shape and policy relevance.',
      'Result and evidence refer back to the same correlation context.',
    ],
    implementationNotes: [
      'Name required context fields in capability metadata.',
      'Redact sensitive payload fields from evidence by default.',
      'Keep subject identity separate from business context.',
    ],
    commonMistakes: [
      'Putting all context into an untyped blob.',
      'Using context for authorization without recording the decision basis.',
      'Leaking sensitive context into replayable evidence.',
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    code: { label: 'invoke.json', language: 'json', code: INVOCATION_FRAGMENT },
  }),
  conceptPage({
    slug: 'evidence',
    title: 'Evidence',
    summary:
      'Evidence is the ordered protocol record that makes accepted, denied, failed, and replayed invocations inspectable.',
    plain:
      'Evidence is the structured record of what happened at the capability boundary.',
    why:
      'Logs are not enough when independent agents, hosts, applications, and infrastructure providers need to reconstruct outcomes.',
    formal:
      'Evidence is ordered invocation metadata emitted by a host and queryable by correlation ID for audit, debugging, verification, and export.',
    example:
      'A denied schedule_technician invocation emits execution_denied with capability ID, version, host, sequence, and correlation ID.',
    relationships: [
      'Evidence is emitted after validation, denial, failure, or execution.',
      'Replay uses evidence to reconstruct the ordered protocol trail.',
      'Conformance tests should prove evidence shape and ordering.',
    ],
    visualModel: [
      'Invocation starts with a correlation ID.',
      'Host emits typed evidence events in order.',
      'Replay returns the evidence stream for inspection.',
    ],
    implementationNotes: [
      'Use stable event types for started, completed, failed, denied, and replayed outcomes.',
      'Redact sensitive payload fields while preserving decision metadata.',
      'Make evidence queryable without requiring private host logs.',
    ],
    commonMistakes: [
      'Calling arbitrary logs evidence.',
      'Recording only successful executions.',
      'Dropping sequence and correlation fields.',
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
    code: {
      label: 'evidence-event.json',
      language: 'json',
      code: `{
  "event_id": "evt_8f3a1c",
  "event_type": "execution_denied",
  "invocation_id": "inv_session_abc_001",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "host_id": "service-ops-host",
  "correlation": { "correlation_id": "session-abc" },
  "sequence": 2,
  "timestamp": "2026-06-16T15:14:22.104Z",
  "outcome": "denied",
  "payload": { "policy": "manager_approval" },
  "redacted": true,
  "assurance": { "level": "S1" }
}`,
    },
  }),
  conceptPage({
    slug: 'conformance',
    title: 'Conformance',
    summary:
      'Conformance is the proof that an independent host handles protocol success and failure paths consistently.',
    plain:
      'Conformance is how a host proves it behaves like CHP says it should.',
    why:
      'Public protocol surfaces need repeatable checks for malformed input, unavailable capabilities, version mismatch, policy denial, and evidence.',
    formal:
      'Conformance is a suite of protocol checks that verifies manifest validation, lifecycle enforcement, authorization behavior, structured outcomes, and evidence semantics.',
    example:
      'A ServiceOpsHost conformance run proves that unknown capabilities and approval_required invocations return structured outcomes.',
    relationships: [
      'Conformance depends on clear manifest and invocation semantics.',
      'Infrastructure providers can run conformance against independent hosts.',
      'Conformance findings feed trust, verification, and release decisions.',
    ],
    visualModel: [
      'Test harness discovers a host manifest.',
      'Harness invokes valid and invalid cases.',
      'Harness records protocol outcomes and evidence shape.',
    ],
    implementationNotes: [
      'Test both success and failure paths.',
      'Treat unknown hosts and unavailable capabilities as first-class cases.',
      'Keep conformance output machine-readable.',
    ],
    commonMistakes: [
      'Testing only happy-path execution.',
      'Assuming transport status is enough to prove protocol behavior.',
      'Skipping authorization and lifecycle violations.',
    ],
    capability: { ...DEFAULT_CAPABILITY, state: 'verified' },
    trace: DEFAULT_TRACE,
    code: {
      label: 'conformance-case.json',
      language: 'json',
      code: `{
  "case": "approval_required_denial",
  "expected": {
    "outcome": "denied",
    "success": false,
    "denial": { "code": "approval_required" },
    "event_type": "execution_denied"
  }
}`,
    },
  }),
  conceptPage({
    slug: 'composition',
    title: 'Composition',
    summary:
      'Composition is using multiple governed capabilities together while preserving host, policy, context, and evidence boundaries.',
    plain:
      'Composition is chaining useful hosted abilities without hiding who owns each step or why a step can fail.',
    why:
      'Agents and applications need to combine capabilities, but operational trust depends on preserving each host boundary.',
    formal:
      'Composition is a protocol-level relationship between invocations where one capability result becomes context for another while keeping lifecycle, policy, and evidence explicit.',
    example:
      'schedule_technician can compose with query_inventory and notify_customer to complete a field-service workflow.',
    relationships: [
      'Composition uses capability results as context for later invocations.',
      'Each host keeps its own policy and evidence boundary.',
      'Failures must identify which capability and host caused the break.',
    ],
    visualModel: [
      'Planning Agent invokes query_inventory.',
      'Result becomes context for schedule_technician.',
      'Confirmed Appointment becomes context for notify_customer.',
    ],
    implementationNotes: [
      'Keep correlation IDs across related invocations.',
      'Represent each step as a separate capability outcome.',
      'Expose partial failure instead of collapsing a composed flow into one error.',
    ],
    commonMistakes: [
      'Hiding multiple host calls behind a single opaque tool.',
      'Losing policy state between steps.',
      'Returning a generic workflow failure without capability evidence.',
    ],
    capability: {
      ...DEFAULT_CAPABILITY,
      name: 'complete_service_visit',
      host: 'ServiceWorkflow',
      policy: 'restricted',
      version: '0.3.0',
      state: 'declared',
    },
    trace: {
      actor: 'Planning Agent',
      capability: 'complete_service_visit',
      host: 'ServiceWorkflow',
      policy: 'restricted',
      context: 'job_context + inventory_snapshot',
      result: 'Customer Notified',
    },
    code: { label: 'composition.json', language: 'json', code: INVOCATION_FRAGMENT },
  }),
];

const SUPPORTING_PAGES: DocsPage[] = [
  docsPage({
    slug: 'introduction/what-is-chp',
    group: 'Introduction',
    title: 'What is CHP?',
    summary:
      'Capability Host Protocol is a public boundary for exposing, invoking, governing, and auditing hosted capabilities.',
    plain:
      'CHP helps independent systems agree on what can be done, who hosts it, who may call it, and what happened.',
    why:
      'Agents, applications, and infrastructure providers need a shared contract that survives provider, runtime, and policy changes.',
    formal:
      'CHP standardizes manifests, discovery, invocation envelopes, lifecycle state, permission checks, structured outcomes, evidence, replay, and conformance.',
    example:
      'A field-service company exposes schedule_technician as a hosted capability that an agent can discover and request under manager approval.',
    relationships: [
      'Capabilities are the named abilities.',
      'Hosts own lifecycle, policy, invocation, and evidence.',
      'Conformance proves independent implementations behave consistently.',
    ],
    visualModel: [
      'Actor discovers a host manifest.',
      'Actor invokes a compatible capability.',
      'Host returns a result or structured protocol outcome.',
    ],
    implementationNotes: [
      'Start with one real capability boundary.',
      'Model denial and unavailable paths before trusting the happy path.',
      'Use evidence and correlation IDs from the first implementation.',
    ],
    commonMistakes: [
      'Positioning CHP as only an agent tool schema.',
      'Skipping policy and lifecycle states in early examples.',
      'Treating logs as a substitute for protocol evidence.',
    ],
    related: [
      { title: 'Capability', href: '/docs/concepts/capability' },
      { title: 'Host', href: '/docs/concepts/host' },
      { title: 'CHP vs MCP tools', href: '/docs/comparisons/chp-vs-mcp-tools' },
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    code: { label: 'manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  docsPage({
    slug: 'introduction/mental-model',
    group: 'Introduction',
    title: 'Mental model',
    summary:
      'Think in hosted abilities: actor, capability, host, policy, context, result, and evidence.',
    plain:
      'CHP gives every useful ability a visible owner, invocation path, rule boundary, and replayable outcome.',
    why:
      'A shared mental model keeps docs, manifests, diagrams, examples, and product surfaces aligned.',
    formal:
      'The CHP model represents capability use as an ordered relationship between actor, capability, host, policy, context, result, and evidence.',
    example:
      '[Planning Agent] -> {schedule_technician} @ ServiceOpsHost | manager_approval | job_context -> Confirmed Appointment',
    relationships: [
      'Actor is the requester.',
      'Capability is the named ability.',
      'Host owns policy, lifecycle, result, and evidence.',
    ],
    visualModel: [
      'Actor chooses an ability.',
      'Host validates the boundary.',
      'Result and evidence make the outcome inspectable.',
    ],
    implementationNotes: [
      'Use the notation in examples before introducing schemas.',
      'Keep policy visible before composition claims.',
      'Make failure paths part of the model.',
    ],
    commonMistakes: [
      'Starting with transport instead of capability meaning.',
      'Drawing diagrams that hide the host boundary.',
      'Explaining composition before governance.',
    ],
    related: [
      { title: 'Invocation', href: '/docs/concepts/invocation' },
      { title: 'Composition', href: '/docs/concepts/composition' },
      { title: 'Notation', href: '/docs/reference/notation' },
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
  }),
  docsPage({
    slug: 'guides/map-your-first-capability',
    group: 'Guides',
    title: 'Map your first capability',
    summary:
      'Turn a real-world ability into a capability ID, host boundary, policy rule, invocation context, result, and evidence expectation.',
    plain:
      'Start with something someone can do, then name the host that owns it and the rules for calling it.',
    why:
      'Good capability maps prevent demos from hiding lifecycle, authorization, and failure semantics.',
    formal:
      'A capability map is an implementation planning artifact that identifies actor, capability, host, policy, context, result, lifecycle, version, and evidence.',
    example:
      'Map schedule_technician before writing the host so denial and unavailable outcomes are known up front.',
    relationships: [
      'Capability mapping feeds manifest design.',
      'Policy mapping feeds invocation safety.',
      'Result mapping feeds composition and evidence.',
    ],
    visualModel: [
      'Name the actor and ability.',
      'Assign a host and policy boundary.',
      'Define result, lifecycle, version, and evidence.',
    ],
    implementationNotes: [
      'Use the interactive mapper for the first pass.',
      'Write one unavailable-path test and one policy-denial test.',
      'Move the map into a manifest only after the boundary is clear.',
    ],
    commonMistakes: [
      'Starting with a framework tool schema before naming the host.',
      'Treating approvals as comments instead of protocol outcomes.',
      'Skipping the result contract.',
    ],
    related: [
      { title: 'Use the mapper', href: '/map' },
      { title: 'Define capability contracts', href: '/docs/guides/define-a-capability-contract' },
      { title: 'Conformance', href: '/docs/concepts/conformance' },
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    code: { label: 'mapped-capability.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  docsPage({
    slug: 'guides/define-a-capability-contract',
    group: 'Guides',
    title: 'Define a capability contract',
    summary:
      'Write the stable manifest, version, entitlement metadata, lifecycle, payload, and outcome shape for a hosted capability.',
    plain:
      'A contract tells independent callers what they can trust before invoking a capability.',
    why:
      'Capability contracts make compatibility, policy, and failure behavior explicit instead of framework-specific.',
    formal:
      'A capability contract is the manifest and invocation agreement for a versioned capability exposed by a host.',
    example:
      'schedule_technician version 1.0.0 requires service:dispatch and can return approval_required before execution.',
    relationships: [
      'Contracts are discovered through host manifests.',
      'Contracts constrain invocation envelopes.',
      'Contracts give conformance something measurable to test.',
    ],
    visualModel: [
      'Manifest declares the contract.',
      'Invocation follows the declared shape.',
      'Outcome uses known result and error semantics.',
    ],
    implementationNotes: [
      'Version the contract when payload or result meaning changes.',
      'Document permission requirements beside capability metadata.',
      'Include denial examples, not only successful results.',
    ],
    commonMistakes: [
      'Changing fields without changing capability version.',
      'Encoding entitlement checks only in application code.',
      'Leaving result semantics vague.',
    ],
    related: [
      { title: 'Manifest model', href: '/docs/reference/lifecycle' },
      { title: 'Invocation', href: '/docs/concepts/invocation' },
      { title: 'Policy states', href: '/docs/reference/policy-states' },
    ],
    capability: DEFAULT_CAPABILITY,
    policy: DEFAULT_POLICY,
    code: { label: 'manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  docsPage({
    slug: 'guides/govern-invocation',
    group: 'Guides',
    title: 'Govern invocation',
    summary:
      'Make authorization, approval, audit, timeout, and denial behavior visible before execution.',
    plain:
      'Governed invocation means the host checks whether the call is allowed before doing the work.',
    why:
      'Sensitive hosted abilities should not look like ordinary functions to agents or applications.',
    formal:
      'Governed invocation is host-side evaluation of caller, permission, policy state, lifecycle, payload, timeout, and context before capability execution.',
    example:
      'manager_approval returns approval_required instead of silently scheduling a technician.',
    relationships: [
      'Policy is declared in the manifest.',
      'Invocation carries caller and context.',
      'Evidence records the decision and outcome.',
    ],
    visualModel: [
      'Caller requests capability.',
      'Host validates policy and lifecycle.',
      'Host executes, pauses, denies, or fails with structured output.',
    ],
    implementationNotes: [
      'Return denials as data with stable codes.',
      'Keep timeouts explicit in the invocation envelope.',
      'Record policy outcomes in evidence.',
    ],
    commonMistakes: [
      'Throwing framework exceptions for expected denials.',
      'Letting policy checks happen after side effects.',
      'Recording only successful policy decisions.',
    ],
    related: [
      { title: 'Policy', href: '/docs/concepts/policy' },
      { title: 'Evidence', href: '/docs/concepts/evidence' },
      { title: 'Conformance', href: '/docs/concepts/conformance' },
    ],
    capability: { ...DEFAULT_CAPABILITY, state: 'restricted' },
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    code: { label: 'outcome.json', language: 'json', code: OUTCOME_FRAGMENT },
  }),
  docsPage({
    slug: 'examples/field-service',
    group: 'Examples',
    title: 'Field service example',
    summary:
      'A field-service company hosts dispatch, inventory, and customer communication capabilities behind governed CHP boundaries.',
    plain:
      'The business can expose scheduling as a capability without giving every caller direct access to its dispatch system.',
    why:
      'This example keeps the protocol grounded in a concrete operational workflow before explaining abstractions.',
    formal:
      'Field service maps schedule_technician, query_inventory, and notify_customer into separate hosted capability contracts with policy and evidence.',
    example:
      'Planning Agent invokes schedule_technician at ServiceOpsHost under manager_approval and receives Confirmed Appointment.',
    relationships: [
      'schedule_technician composes with query_inventory.',
      'notify_customer runs after a confirmed appointment.',
      'Evidence connects the full service workflow by correlation ID.',
    ],
    visualModel: [
      'InventoryHost checks required parts.',
      'ServiceOpsHost schedules the technician.',
      'CustomerCommsHost sends the notification.',
    ],
    implementationNotes: [
      'Keep each host boundary separate.',
      'Use one correlation ID across the composed workflow.',
      'Test policy denial before connecting the workflow to an agent.',
    ],
    commonMistakes: [
      'Making one giant workflow capability for every step.',
      'Hiding manager approval inside app glue.',
      'Losing evidence across host boundaries.',
    ],
    related: [
      { title: 'Composition', href: '/docs/concepts/composition' },
      { title: 'Map your first capability', href: '/docs/guides/map-your-first-capability' },
      { title: 'Examples', href: '/examples' },
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    code: { label: 'field-service-manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  docsPage({
    slug: 'examples/agent-operations',
    group: 'Examples',
    title: 'Agent operations example',
    summary:
      'An operations agent can use hosted capabilities without receiving unrestricted access to production systems.',
    plain:
      'The agent asks hosts to do narrow things, and each host enforces lifecycle, permission, and evidence.',
    why:
      'Operational agents need useful actions, but infrastructure teams need accountable boundaries and replayable decisions.',
    formal:
      'Agent operations uses CHP capabilities as governed action surfaces around ticket classification, status updates, and incident notifications.',
    example:
      'Ops Agent invokes classify_ticket and request_incident_update with audited policy and evidence export.',
    relationships: [
      'Agent frameworks discover host capabilities.',
      'Applications govern high-value operations.',
      'Infrastructure providers export evidence to telemetry systems.',
    ],
    visualModel: [
      'Agent selects a capability.',
      'Host checks policy and context.',
      'Outcome and evidence are visible to operators.',
    ],
    implementationNotes: [
      'Keep dangerous actions blocked or approval_required by default.',
      'Use audited policy for low-risk read and classify actions.',
      'Treat unavailable hosts as protocol outcomes.',
    ],
    commonMistakes: [
      'Giving the agent broad credentials instead of host-scoped capabilities.',
      'Skipping evidence for read-like actions.',
      'Treating host unavailability as agent failure.',
    ],
    related: [
      { title: 'Policy', href: '/docs/concepts/policy' },
      { title: 'Evidence', href: '/docs/concepts/evidence' },
      { title: 'CHP vs MCP tools', href: '/docs/comparisons/chp-vs-mcp-tools' },
    ],
    capability: {
      name: 'classify_ticket',
      description: 'Classifies an operational ticket and proposes a routing label.',
      host: 'OpsSupportHost',
      policy: 'audited',
      version: '1.1.0',
      state: 'invokable',
    },
    trace: {
      actor: 'Ops Agent',
      capability: 'classify_ticket',
      host: 'OpsSupportHost',
      policy: 'audited',
      context: 'ticket_context',
      result: 'Routing Label',
    },
    code: { label: 'agent-ops-invoke.json', language: 'json', code: INVOCATION_FRAGMENT },
  }),
  docsPage({
    slug: 'reference/notation',
    group: 'Reference',
    title: 'Notation reference',
    summary:
      'CHP notation shows actor, capability, host, policy, context, and result in one readable protocol sentence.',
    plain:
      'Notation is the shorthand for explaining a capability invocation before showing JSON.',
    why:
      'Readable notation lets product, security, engineering, and operations review the same boundary.',
    formal:
      '[Actor] -> {capability} @ Host | policy | context -> Result',
    example:
      '[Planning Agent] -> {schedule_technician} @ ServiceOpsHost | manager_approval | job_context -> Confirmed Appointment',
    relationships: [
      'Actor maps to invocation subject identity.',
      'Capability and host map to manifest metadata.',
      'Policy, context, and result map to invocation and outcome semantics.',
    ],
    visualModel: [
      '[Actor]',
      '{capability} @ Host',
      'policy | context -> Result',
    ],
    implementationNotes: [
      'Use notation at the start of concept pages.',
      'Keep capability IDs in code form.',
      'Do not use notation as a replacement for schemas.',
    ],
    commonMistakes: [
      'Leaving out policy.',
      'Treating host as optional.',
      'Using a vague result like done.',
    ],
    related: [
      { title: 'Mental model', href: '/docs/introduction/mental-model' },
      { title: 'Invocation', href: '/docs/concepts/invocation' },
      { title: 'Composition', href: '/docs/concepts/composition' },
    ],
    trace: DEFAULT_TRACE,
  }),
  docsPage({
    slug: 'reference/lifecycle',
    group: 'Reference',
    title: 'Lifecycle reference',
    summary:
      'Capability lifecycle states let callers distinguish declared, hosted, discoverable, invokable, governed, deprecated, and unavailable surfaces.',
    plain:
      'Lifecycle tells callers whether the capability can be used now and how much trust to place in it.',
    why:
      'Without lifecycle state, callers infer availability from transport errors and framework behavior.',
    formal:
      'Lifecycle is host-published metadata and runtime enforcement that describes a capability from declaration through invocation, verification, deprecation, and unavailability.',
    example:
      'schedule_technician is invokable when ServiceOpsHost is available and policy checks can run.',
    relationships: [
      'Lifecycle is declared in manifests and enforced during invocation.',
      'Registry views should expose lifecycle state.',
      'Conformance should test unavailable and disabled paths.',
    ],
    visualModel: [
      'Declared -> Hosted -> Discoverable -> Invokable.',
      'Restricted or blocked can apply through policy.',
      'Deprecated and unavailable must remain visible to callers.',
    ],
    implementationNotes: [
      'Do not hide unavailable capabilities behind 404s when callers need migration paths.',
      'Separate host health from capability availability.',
      'Make deprecated versions visible with replacement guidance.',
    ],
    commonMistakes: [
      'Using boolean available as the entire lifecycle model.',
      'Returning generic transport errors for lifecycle violations.',
      'Forgetting version compatibility when lifecycle changes.',
    ],
    related: [
      { title: 'Registry', href: '/docs/concepts/registry' },
      { title: 'Conformance', href: '/docs/concepts/conformance' },
      { title: 'Policy states', href: '/docs/reference/policy-states' },
    ],
    referenceTable: {
      title: 'Lifecycle state reference',
      description:
        'CHP v0.1 standardizes descriptor maturity and invocation outcomes; hosts may expose richer lifecycle labels through registry views and metadata when they enforce them consistently.',
      columns: ['State', 'v0.1 representation', 'Enforcement meaning'],
      rows: [
        { name: 'declared', value: 'CapabilityDescriptor exists', detail: 'The capability has an id, version, description, modes, and emits but may not be callable yet.' },
        { name: 'hosted', value: 'HostDescriptor.capabilities[]', detail: 'The host claims ownership of the descriptor and evidence behavior for that capability.' },
        { name: 'discoverable', value: 'Published descriptor or registry view', detail: 'Callers can inspect the capability before invocation and check compatibility.' },
        { name: 'invokable', value: 'mode supported and host local state permits execution', detail: 'A compatible invocation may pass boundary validation and reach the handler.' },
        { name: 'composed', value: 'correlation plus causation context', detail: 'The capability participates in a larger flow while preserving each host boundary.' },
        { name: 'evidence_emitting', value: 'emits[] plus ExecutionEvidence events', detail: 'The capability declares and actually emits structured evidence for attempts.' },
        { name: 'verified', value: 'conformance result or assurance metadata', detail: 'The capability or host has passed checks that can be inspected by relying parties.' },
        { name: 'deprecated', value: 'CapabilityDescriptor.status = deprecated', detail: 'Callers should migrate before the capability is removed or behavior changes.' },
        { name: 'unavailable', value: 'InvocationResult.outcome = skipped or denied', detail: 'The capability exists but must not execute; use denial.code such as capability_disabled when explaining why.' },
      ],
    },
    capability: { ...DEFAULT_CAPABILITY, state: 'evidence_emitting' },
    code: { label: 'manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  docsPage({
    slug: 'reference/policy-states',
    group: 'Reference',
    title: 'Policy states',
    summary:
      'Policy states communicate whether a capability is open, restricted, approval required, audited, blocked, or revoked.',
    plain:
      'Policy state is the visible rule status before a caller asks the host to act.',
    why:
      'Independent callers need to distinguish safe execution from expected denial, audit, approval, or blocked behavior.',
    formal:
      'Policy states are host-declared and host-enforced governance labels that shape invocation outcomes and evidence.',
    example:
      'manager_approval is approval_required for schedule_technician.',
    relationships: [
      'Policy state is part of the manifest and registry view.',
      'Policy enforcement happens during invocation validation.',
      'Policy outcomes should be reflected in evidence.',
    ],
    visualModel: [
      'Open permits execution after validation.',
      'Restricted requires entitlement.',
      'Approval required pauses or denies until approved.',
      'Blocked returns a structured denial.',
    ],
    implementationNotes: [
      'Keep policy labels visible as text.',
      'Use stable denial codes for blocked and approval_required.',
      'Plan revoked state before product surfaces depend on policy tables.',
    ],
    commonMistakes: [
      'Using color as the only policy signal.',
      'Merging approval_required and blocked.',
      'Failing open when policy metadata is missing.',
    ],
    related: [
      { title: 'Policy', href: '/docs/concepts/policy' },
      { title: 'Govern invocation', href: '/docs/guides/govern-invocation' },
      { title: 'Conformance', href: '/docs/concepts/conformance' },
    ],
    referenceTable: {
      title: 'Policy state reference',
      description:
        'CHP v0.1 leaves full policy engines to hosts, but policy state still needs stable manifest metadata, denial records, and evidence semantics.',
      columns: ['State', 'v0.1 representation', 'Invocation behavior'],
      rows: [
        { name: 'open', value: 'policy.auth_required = false', detail: 'Execute after normal schema, lifecycle, and mode validation.' },
        { name: 'restricted', value: 'policy.auth_required = true', detail: 'Require host-recognized subject attributes, grants, or entitlements before execution.' },
        { name: 'approval_required', value: 'policy.approval_required = true', detail: 'Return a denied result with denial.code approval_required until approval exists.' },
        { name: 'audited', value: 'emits[] and assurance metadata', detail: 'Allow execution but require evidence records suitable for review and replay.' },
        { name: 'blocked', value: 'invariant or host policy denial', detail: 'Return a denied result before side effects, commonly with policy_block_pattern_matched or invariant_failed.' },
        { name: 'revoked', value: 'host trust or entitlement state', detail: 'Deny a previously authorized subject with entitlement_denied and details explaining the revoked grant.' },
      ],
    },
    policy: DEFAULT_POLICY,
    code: { label: 'outcome.json', language: 'json', code: OUTCOME_FRAGMENT },
  }),
  docsPage({
    slug: 'reference/glossary',
    group: 'Reference',
    title: 'Glossary',
    summary:
      'Canonical terms for capability, host, adapter, registry, invocation, policy, context, evidence, replay, and composition.',
    plain:
      'The glossary keeps CHP language stable across docs, examples, manifests, and product surfaces.',
    why:
      'A protocol surface becomes harder to implement when core terms drift between marketing, docs, code, and tests.',
    formal:
      'The glossary is the governed vocabulary for CHP concepts and their relationships.',
    example:
      'Capability means a named hosted ability, not merely an endpoint, plugin, or function.',
    relationships: [
      'Glossary terms should link to concept pages.',
      'Examples should use glossary terms consistently.',
      'Terminology changes should update docs, pages, and component examples together.',
    ],
    visualModel: [
      'Capability is what can be done.',
      'Host owns where and how it is done.',
      'Invocation is the governed request to do it.',
    ],
    implementationNotes: [
      'Define terms before first use on long-form docs pages.',
      'Prefer hosted capability over generic tool when discussing CHP.',
      'Update route labels and examples when glossary terms change.',
    ],
    commonMistakes: [
      'Using capability, tool, function, and endpoint interchangeably.',
      'Calling logs evidence without protocol fields.',
      'Treating context as a loose prompt string.',
    ],
    related: [
      { title: 'Capability', href: '/docs/concepts/capability' },
      { title: 'Host', href: '/docs/concepts/host' },
      { title: 'Invocation', href: '/docs/concepts/invocation' },
    ],
    capability: DEFAULT_CAPABILITY,
  }),
];

const DEVELOPER_REFERENCE_PAGES: DocsPage[] = [
  referencePage({
    slug: 'reference/manifest-fields',
    title: 'Manifest fields',
    summary:
      'Manifest fields declare host identity, protocol compatibility, capability metadata, lifecycle, permission, and policy before invocation.',
    plain:
      'A manifest is the first thing a caller should inspect before trusting a hosted capability.',
    why:
      'Without a stable manifest shape, independent callers discover incompatibility, unavailable capabilities, or missing subject requirements too late.',
    formal:
      'A CHP manifest is a HostDescriptor: the host-published declaration of protocol version, host identity, capability descriptors, maturity, evidence behavior, and policy metadata.',
    example:
      'ServiceOpsHost declares schedule_technician version 1.0.0 with service:dispatch permission and approval_required policy.',
    referenceTable: {
      title: 'Manifest field reference',
      description:
        'These fields are the minimum interoperable discovery surface for a host capability.',
      columns: ['Field', 'Type', 'Protocol meaning'],
      rows: [
        { name: 'id', value: 'string', detail: 'Stable host identity used in evidence, telemetry, and trust decisions.' },
        { name: 'version', value: 'string', detail: 'Host implementation version, separate from capability and protocol versions.' },
        { name: 'protocol_version', value: 'string', detail: 'CHP protocol version; v0.1 uses 0.1.' },
        { name: 'kind', value: 'string', detail: 'Host implementation kind such as local, service, cli, device, or mcp-wrapper.' },
        { name: 'capabilities[].id', value: 'string', detail: 'Stable capability identifier selected by callers before invocation.' },
        { name: 'capabilities[].version', value: 'string', detail: 'Capability contract version for compatibility checks.' },
        { name: 'capabilities[].status', value: 'draft | experimental | certified | deprecated', detail: 'Capability maturity status; deprecated is the standardized retirement signal.' },
        { name: 'capabilities[].modes', value: 'sync | async | stream | fire_and_forget[]', detail: 'Supported invocation modes that callers may request.' },
        { name: 'capabilities[].emits', value: 'string[]', detail: 'Evidence event types the capability can emit.' },
        { name: 'capabilities[].policy', value: 'PolicyDescriptor', detail: 'Structured policy metadata for risk tier, auth, approval, data classification, and allowed actors.' },
        { name: 'capabilities[].metadata', value: 'object', detail: 'Extension area for host-specific lifecycle or entitlement labels that are still enforced through protocol outcomes.' },
        { name: 'evidence.append_only', value: 'boolean', detail: 'Whether the host declares append-only evidence storage.' },
      ],
    },
    related: [
      { title: 'Capability', href: '/docs/concepts/capability' },
      { title: 'Registry', href: '/docs/concepts/registry' },
      { title: 'Lifecycle reference', href: '/docs/reference/lifecycle' },
    ],
    code: { label: 'manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  referencePage({
    slug: 'reference/invocation-envelope',
    title: 'Invocation envelope fields',
    summary:
      'Invocation envelopes carry the fields a host needs to validate subject, capability, mode, payload, requested time, and correlation.',
    plain:
      'The invocation envelope is the request wrapper around the capability payload.',
    why:
      'A host cannot safely authorize, trace, or replay a capability call if subject identity and correlation are implicit.',
    formal:
      'An InvocationEnvelope is a structured request containing invocation identity, capability identity, mode, correlation context, subject, payload, requested time, and optional metadata.',
    example:
      'Planning Agent invokes schedule_technician with session-abc correlation and job_context payload.',
    referenceTable: {
      title: 'Invocation envelope field reference',
      description:
        'Every invocation should make caller intent and replay context explicit before execution.',
      columns: ['Field', 'Type', 'Protocol meaning'],
      rows: [
        { name: 'invocation_id', value: 'string', detail: 'Unique request identity preserved in results and evidence.' },
        { name: 'capability_id', value: 'string', detail: 'Capability selected from a compatible manifest or registry entry.' },
        { name: 'version', value: 'string | null', detail: 'Requested capability version, when callers need a specific contract.' },
        { name: 'mode', value: 'sync | async | stream | fire_and_forget', detail: 'Invocation mode that must be supported by the capability descriptor.' },
        { name: 'correlation.correlation_id', value: 'string', detail: 'Stable ID used to connect invocation, evidence, replay, and telemetry.' },
        { name: 'subject', value: 'object', detail: 'Caller identity and caller-local attributes used by host policy.' },
        { name: 'payload', value: 'object', detail: 'Capability-specific inputs validated against the capability contract.' },
        { name: 'requested_at', value: 'datetime', detail: 'Caller-side request timestamp used for audit and replay context.' },
        { name: 'metadata', value: 'object', detail: 'Optional extension area for implementation-specific request metadata.' },
      ],
    },
    related: [
      { title: 'Invocation', href: '/docs/concepts/invocation' },
      { title: 'Context', href: '/docs/concepts/context' },
      { title: 'Outcome codes', href: '/docs/reference/outcome-codes' },
    ],
    code: { label: 'invoke.json', language: 'json', code: INVOCATION_FRAGMENT },
  }),
  referencePage({
    slug: 'reference/outcome-codes',
    title: 'Outcome codes',
    summary:
      'Outcome and nested codes let callers distinguish malformed input, version mismatch, unavailability, denial, timeout, and host failure.',
    plain:
      'The top-level outcome says success, failure, denied, or skipped; nested codes explain why.',
    why:
      'Public protocol callers need stable branches for expected failure, not framework-specific exceptions or generic status text.',
    formal:
      'InvocationResult.outcome is one of success, failure, denied, or skipped; denial.code and error.code carry stable protocol reasons for rejected or failed attempts.',
    example:
      'approval_required tells a caller that policy paused or denied schedule_technician before side effects.',
    referenceTable: {
      title: 'Outcome code reference',
      description:
        'Use stable codes so agents, applications, and infrastructure can branch consistently.',
      columns: ['Code', 'Record location', 'Protocol meaning'],
      rows: [
        { name: 'success', value: 'outcome', detail: 'Capability handler completed and returned data.' },
        { name: 'failure', value: 'outcome', detail: 'Execution began but failed; inspect error.code for the reason.' },
        { name: 'denied', value: 'outcome', detail: 'The host rejected execution before the handler completed; inspect denial.code.' },
        { name: 'skipped', value: 'outcome', detail: 'The host intentionally did not execute a registered capability, commonly because it is disabled.' },
        { name: 'input_schema_validation_failed', value: 'denial.code or error.code', detail: 'Invocation or payload shape is invalid or missing required fields.' },
        { name: 'unsupported_protocol_version', value: 'denial.code or discovery error', detail: 'Host and caller do not share a compatible CHP protocol version.' },
        { name: 'unknown_host', value: 'discovery error', detail: 'Caller addressed a host identity that cannot be resolved or trusted before reaching a host boundary.' },
        { name: 'capability_disabled', value: 'denial.code', detail: 'Capability exists but is not currently invokable.' },
        { name: 'entitlement_denied', value: 'denial.code', detail: 'Subject lacks the host-recognized grant or entitlement required by the capability.' },
        { name: 'approval_required', value: 'denial.code', detail: 'Policy requires approval before execution can proceed.' },
        { name: 'timeout', value: 'error.code', detail: 'Execution exceeded a host timeout policy after the boundary accepted the invocation.' },
        { name: 'host_error', value: 'error.code', detail: 'Host failed after accepting the invocation boundary.' },
      ],
    },
    related: [
      { title: 'Failure examples', href: '/docs/reference/failure-modes/malformed-input' },
      { title: 'Conformance cases', href: '/docs/reference/conformance-cases' },
      { title: 'Policy states', href: '/docs/reference/policy-states' },
    ],
    code: { label: 'outcome.json', language: 'json', code: OUTCOME_FRAGMENT },
  }),
  referencePage({
    slug: 'reference/evidence-events',
    title: 'Evidence event fields',
    summary:
      'Evidence events preserve ordered protocol facts for audit, replay, debugging, and telemetry export.',
    plain:
      'Evidence events are not log lines; they are structured records of what happened at the capability boundary.',
    why:
      'Independent infrastructure needs enough stable fields to replay an invocation without reading private host logs.',
    formal:
      'ExecutionEvidence is an ordered record containing event type, invocation identity, capability identity, host identity, correlation context, sequence, timestamp, payload, redaction state, and assurance metadata.',
    example:
      'execution_denied records an approval_required decision for schedule_technician under session-abc.',
    referenceTable: {
      title: 'Evidence event field reference',
      description:
        'Evidence should preserve the minimum stable fields needed to inspect and replay a protocol decision.',
      columns: ['Field', 'Type', 'Protocol meaning'],
      rows: [
        { name: 'event_id', value: 'string', detail: 'Unique evidence event identifier.' },
        { name: 'event_type', value: 'string', detail: 'Stable event type such as execution_started, execution_completed, execution_failed, execution_denied, or execution_skipped.' },
        { name: 'invocation_id', value: 'string', detail: 'Invocation that produced this evidence event.' },
        { name: 'capability_id', value: 'string', detail: 'Capability involved in the decision or execution.' },
        { name: 'capability_version', value: 'string | null', detail: 'Capability contract version at invocation time when known.' },
        { name: 'host_id', value: 'string', detail: 'Host that evaluated or executed the invocation.' },
        { name: 'correlation.correlation_id', value: 'string', detail: 'Replay key shared across invocation, outcome, and telemetry.' },
        { name: 'sequence', value: 'integer', detail: 'Ordered position in the evidence stream.' },
        { name: 'timestamp', value: 'datetime', detail: 'When the event occurred.' },
        { name: 'outcome', value: 'success | failure | denied | skipped | null', detail: 'Protocol result associated with this event.' },
        { name: 'payload', value: 'object', detail: 'Structured, usually redacted event payload.' },
        { name: 'redacted', value: 'boolean', detail: 'Whether sensitive payload values were redacted.' },
        { name: 'assurance', value: 'AssuranceMetadata', detail: 'Evidence assurance level and policy metadata.' },
      ],
    },
    related: [
      { title: 'Evidence', href: '/docs/concepts/evidence' },
      { title: 'Conformance cases', href: '/docs/reference/conformance-cases' },
      { title: 'Outcome codes', href: '/docs/reference/outcome-codes' },
    ],
    code: {
      label: 'evidence-event.json',
      language: 'json',
      code: `{
  "event_id": "evt_8f3a1c",
  "event_type": "execution_denied",
  "invocation_id": "inv_session_abc_001",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "host_id": "service-ops-host",
  "correlation": { "correlation_id": "session-abc" },
  "sequence": 2,
  "timestamp": "2026-06-16T15:14:22.104Z",
  "outcome": "denied",
  "payload": { "policy": "manager_approval" },
  "redacted": true,
  "denial": {
    "code": "approval_required",
    "message": "manager_approval must approve before execution.",
    "retryable": true
  },
  "assurance": { "level": "S1" }
}`,
    },
  }),
  referencePage({
    slug: 'reference/conformance-cases',
    title: 'Conformance cases',
    summary:
      'Conformance cases prove that independent hosts return stable outcomes for valid and invalid protocol paths.',
    plain:
      'Conformance is the test checklist for host behavior, not just a happy-path demo.',
    why:
      'Independent capability hosts need shared tests for malformed inputs, unknown hosts, unavailable capabilities, authorization, lifecycle, timeout, and host errors.',
    formal:
      'A conformance case defines setup, invocation or discovery input, expected structured outcome, evidence expectation, and pass/fail criteria.',
    example:
      'approval_required_denial proves a policy-gated capability returns approval_required before side effects.',
    referenceTable: {
      title: 'Conformance case reference',
      description:
        'Every public host should prove these cases before relying parties treat it as interoperable.',
      columns: ['Case', 'Expected result', 'What it proves'],
      rows: [
        { name: 'valid_invocation', value: 'outcome = success', detail: 'Happy path executes and emits successful evidence.' },
        { name: 'malformed_input', value: 'denial.code = input_schema_validation_failed', detail: 'Host validates envelope and payload shape before execution.' },
        { name: 'version_mismatch', value: 'denial.code = unsupported_protocol_version', detail: 'Host fails closed on incompatible protocol or capability versions.' },
        { name: 'unknown_host', value: 'discovery error = unknown_host', detail: 'Infrastructure distinguishes unresolved host identity from host failure.' },
        { name: 'unavailable_capability', value: 'denial.code = capability_disabled', detail: 'Lifecycle state is enforced before invocation side effects.' },
        { name: 'authorization_denial', value: 'denial.code = entitlement_denied', detail: 'Caller entitlement failures return structured denials.' },
        { name: 'timeout', value: 'error.code = timeout', detail: 'Timeout behavior is predictable and machine-readable.' },
        { name: 'host_error', value: 'error.code = host_error', detail: 'Accepted invocations that fail inside the host return structured errors.' },
      ],
    },
    related: [
      { title: 'Conformance', href: '/docs/concepts/conformance' },
      { title: 'Outcome codes', href: '/docs/reference/outcome-codes' },
      { title: 'Malformed input', href: '/docs/reference/failure-modes/malformed-input' },
    ],
    code: {
      label: 'conformance-case.json',
      language: 'json',
      code: `{
  "case": "authorization_denial",
  "invoke": {
    "invocation_id": "inv_authz_denial_001",
    "capability_id": "schedule_technician",
    "mode": "sync",
    "correlation": { "correlation_id": "case-authz-denial" },
    "subject": { "id": "agent://planning-assistant" },
    "payload": {},
    "requested_at": "2026-06-16T15:14:20.000Z"
  },
  "expected": {
    "outcome": "denied",
    "success": false,
    "denial": { "code": "entitlement_denied" },
    "event_type": "execution_denied"
  }
}`,
    },
  }),
  referencePage({
    slug: 'reference/product-surfaces',
    title: 'Product surface components',
    summary:
      'Product-surface components prepare registry, trust, audit, access, verification, and operational-state views before backend behavior exists.',
    plain:
      'These components show how operators should inspect capability state, policy, evidence, and trust without reading raw JSON first.',
    why:
      'Public protocol surfaces need product patterns that make unavailable, revoked, empty, loading, and error states explicit before a console or managed provider depends on them.',
    formal:
      'A product surface is a static or dynamic view over host descriptors, registry rows, policy grants, evidence events, verification status, and operational state.',
    example:
      'A registry row can show schedule_technician as verified, approval_required, sync, and evidence-emitting before a caller invokes it.',
    relationships: [
      'Registry rows derive from HostDescriptor and CapabilityDescriptor fields.',
      'Trust panels summarize conformance, lifecycle, policy, and evidence checks.',
      'Audit traces and access matrices expose InvocationResult and ExecutionEvidence facts for operators.',
    ],
    visualModel: [
      'Registry makes capability state discoverable.',
      'Trust and verification explain whether the state is reliable.',
      'Access, audit, and operational states explain why a caller may proceed, wait, or stop.',
    ],
    implementationNotes: [
      'Keep product-prep examples static until backend contracts are ready.',
      'Represent empty, loading, unavailable, revoked, and error states before shipping registry or console behavior.',
      'Use protocol terms in visible labels so operators can connect the UI back to evidence and conformance.',
    ],
    commonMistakes: [
      'Showing only green or red status without lifecycle or policy labels.',
      'Hiding revoked access inside a generic authorization failure.',
      'Building a registry table without empty, loading, unavailable, and error states.',
    ],
    related: [
      { title: 'Lifecycle reference', href: '/docs/reference/lifecycle' },
      { title: 'Policy states', href: '/docs/reference/policy-states' },
      { title: 'Evidence events', href: '/docs/reference/evidence-events' },
    ],
    referenceTable: {
      title: 'Product-prep component inventory',
      description:
        'These components are static candidates for future registry, console, provider, and trust surfaces.',
      columns: ['Component', 'Protocol source', 'State coverage'],
      rows: [
        { name: 'CapabilityRegistryRow', value: 'HostDescriptor + CapabilityDescriptor', detail: 'Lifecycle, policy, version, mode, and emitted evidence.' },
        { name: 'TrustPanel', value: 'Conformance + evidence checks', detail: 'Pass, review, and fail states with visible reasons.' },
        { name: 'AuditTrace', value: 'ExecutionEvidence', detail: 'event_type, outcome, code, actor, sequence, and timestamp.' },
        { name: 'AccessMatrix', value: 'PolicyDescriptor + host grants', detail: 'Allowed, approval_required, revoked, and blocked access states.' },
        { name: 'VerificationSeal', value: 'Conformance record', detail: 'Verified, candidate, stale, and failed trust labels.' },
        { name: 'OperationalStatePanel', value: 'Registry and invocation state', detail: 'Empty, loading, unavailable, revoked, and error states.' },
      ],
    },
    capability: {
      ...DEFAULT_CAPABILITY,
      state: 'verified',
    },
    policy: {
      state: 'audited',
      label: 'operator_review',
      description:
        'Operators can inspect lifecycle, access, evidence, and trust state before allowing broad capability adoption.',
    },
    productSurface: true,
  }),
];

const FAILURE_MODE_PAGES: DocsPage[] = [
  failureModePage({
    slug: 'unavailable-capability',
    title: 'Unavailable capability',
    summary:
      'Return skipped or denied with capability_disabled when the host knows a capability but lifecycle state prevents invocation.',
    trigger: 'schedule_technician exists in the HostDescriptor, but host lifecycle metadata marks the executor unavailable.',
    code: 'capability_disabled',
    message: 'Capability schedule_technician is not currently invokable.',
    evidence: 'execution_skipped',
    exampleCode: `{
  "invocation_id": "inv_unavailable_001",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "correlation": { "correlation_id": "case-unavailable" },
  "outcome": "skipped",
  "success": false,
  "data": null,
  "error": null,
  "denial": {
    "code": "capability_disabled",
    "message": "Capability schedule_technician is not currently invokable.",
    "retryable": true,
    "details": {
      "capability_id": "schedule_technician",
      "lifecycle": "unavailable"
    }
  },
  "evidence_ids": ["evt_unavailable_skipped"],
  "started_at": null,
  "completed_at": "2026-06-16T15:14:22.104Z"
}`,
  }),
  failureModePage({
    slug: 'unknown-host',
    title: 'Unknown host',
    summary:
      'Return unknown_host when callers address a host identity that cannot be resolved or trusted.',
    trigger: 'The caller asks for service-ops-host-v2, but no trusted manifest or registry entry exists.',
    code: 'unknown_host',
    message: 'Host service-ops-host-v2 is not registered.',
    evidence: 'none before host boundary',
    exampleCode: `{
  "error": {
    "code": "unknown_host",
    "message": "Host service-ops-host-v2 is not registered.",
    "retryable": false,
    "details": {
      "host_id": "service-ops-host-v2"
    }
  },
  "host_boundary_reached": false,
  "evidence_ids": []
}`,
  }),
  failureModePage({
    slug: 'malformed-input',
    title: 'Malformed input',
    summary:
      'Return input_schema_validation_failed when a manifest, invocation envelope, or payload is missing required protocol fields.',
    trigger: 'The invocation omits subject or sends payload.window as a number when the capability requires a string.',
    code: 'input_schema_validation_failed',
    message: 'Invocation envelope is missing subject.',
    evidence: 'execution_denied',
    exampleCode: `{
  "invocation_id": "inv_malformed_001",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "correlation": { "correlation_id": "case-malformed" },
  "outcome": "denied",
  "success": false,
  "data": null,
  "error": null,
  "denial": {
    "code": "input_schema_validation_failed",
    "message": "Invocation envelope is missing subject.",
    "retryable": true,
    "details": { "field": "subject" }
  },
  "evidence_ids": ["evt_malformed_denied"],
  "started_at": null,
  "completed_at": "2026-06-16T15:14:22.104Z"
}`,
  }),
  failureModePage({
    slug: 'version-mismatch',
    title: 'Version mismatch',
    summary:
      'Return unsupported_protocol_version when host and caller cannot agree on protocol or capability compatibility.',
    trigger: 'The caller requests protocol_version 0.2 but the host only supports 0.1.',
    code: 'unsupported_protocol_version',
    message: 'Host supports CHP 0.1; caller requested 0.2.',
    evidence: 'execution_denied',
    exampleCode: `{
  "invocation_id": "inv_version_001",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "correlation": { "correlation_id": "case-version" },
  "outcome": "denied",
  "success": false,
  "data": null,
  "error": null,
  "denial": {
    "code": "unsupported_protocol_version",
    "message": "Host supports CHP 0.1; caller requested 0.2.",
    "retryable": false,
    "details": {
      "supported": ["0.1"],
      "requested": "0.2"
    }
  },
  "evidence_ids": ["evt_version_denied"],
  "started_at": null,
  "completed_at": "2026-06-16T15:14:22.104Z"
}`,
  }),
  failureModePage({
    slug: 'authorization-denial',
    title: 'Authorization denial',
    summary:
      'Return entitlement_denied when subject identity lacks the entitlement required by the capability.',
    trigger: 'Planning Agent invokes schedule_technician without service:dispatch permission.',
    code: 'entitlement_denied',
    message: 'service:dispatch is required.',
    evidence: 'execution_denied',
    exampleCode: `{
  "invocation_id": "inv_authz_001",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "correlation": { "correlation_id": "case-authz" },
  "outcome": "denied",
  "success": false,
  "data": null,
  "error": null,
  "denial": {
    "code": "entitlement_denied",
    "message": "service:dispatch is required.",
    "retryable": false,
    "details": {
      "required_permission": "service:dispatch"
    }
  },
  "evidence_ids": ["evt_authz_denied"],
  "started_at": null,
  "completed_at": "2026-06-16T15:14:22.104Z"
}`,
  }),
  failureModePage({
    slug: 'timeout',
    title: 'Timeout',
    summary:
      'Return timeout when execution exceeds host timeout policy after the invocation boundary accepts the request.',
    trigger: 'ServiceOpsHost accepts the invocation and cannot complete scheduling inside its configured execution window.',
    code: 'timeout',
    message: 'schedule_technician exceeded host timeout policy.',
    evidence: 'execution_failed',
    exampleCode: `{
  "invocation_id": "inv_timeout_001",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "correlation": { "correlation_id": "case-timeout" },
  "outcome": "failure",
  "success": false,
  "data": null,
  "error": {
    "code": "timeout",
    "message": "schedule_technician exceeded host timeout policy.",
    "details": { "timeout_ms": 3000 }
  },
  "denial": null,
  "evidence_ids": ["evt_timeout_failed"],
  "started_at": "2026-06-16T15:14:20.000Z",
  "completed_at": "2026-06-16T15:14:23.000Z"
}`,
  }),
  failureModePage({
    slug: 'host-error',
    title: 'Host error',
    summary:
      'Return host_error when the host accepted the invocation but failed during execution.',
    trigger: 'ServiceOpsHost validates the invocation, starts execution, and the dispatch backend fails.',
    code: 'host_error',
    message: 'Dispatch backend failed after invocation started.',
    evidence: 'execution_failed',
    exampleCode: `{
  "invocation_id": "inv_host_error_001",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "correlation": { "correlation_id": "case-host-error" },
  "outcome": "failure",
  "success": false,
  "data": null,
  "error": {
    "code": "host_error",
    "message": "Dispatch backend failed after invocation started.",
    "details": { "retryable": true }
  },
  "denial": null,
  "evidence_ids": ["evt_host_error_failed"],
  "started_at": "2026-06-16T15:14:20.000Z",
  "completed_at": "2026-06-16T15:14:22.104Z"
}`,
  }),
];

const COMPARISON_PAGES: DocsPage[] = [
  docsPage({
    slug: 'comparisons/chp-vs-apis',
    group: 'Comparisons',
    title: 'CHP vs APIs',
    summary:
      'APIs center endpoints and services. CHP centers hosted capabilities with lifecycle, policy, invocation, outcomes, and evidence.',
    plain:
      'CHP can sit beside APIs, but it explains what an ability means and how it is governed before it is called.',
    why:
      'An endpoint shape alone does not tell an agent whether a capability is available, authorized, compatible, or auditable.',
    formal:
      'CHP is a capability protocol layer over or beside APIs that standardizes manifest discovery, invocation safety, structured outcomes, and evidence semantics.',
    example:
      'POST /dispatch may exist as an API endpoint; schedule_technician is the CHP capability contract independent callers can reason about.',
    relationships: [
      'APIs can back CHP adapters or hosts.',
      'CHP manifests can point to capabilities implemented by HTTP services.',
      'OpenAPI remains useful for transport and schema details.',
    ],
    visualModel: [
      'API endpoint exposes transport.',
      'CHP capability exposes operational meaning.',
      'Host enforces policy and emits evidence.',
    ],
    implementationNotes: [
      'Keep HTTP implementation details behind the capability boundary.',
      'Map HTTP errors into structured CHP outcomes.',
      'Use OpenAPI where it helps describe transport schemas.',
    ],
    commonMistakes: [
      'Renaming endpoints as capabilities without adding lifecycle or policy.',
      'Letting HTTP status codes carry all protocol meaning.',
      'Assuming API authentication is enough for capability governance.',
    ],
    related: [
      { title: 'Adapter', href: '/docs/concepts/adapter' },
      { title: 'Capability', href: '/docs/concepts/capability' },
      { title: 'Invocation', href: '/docs/concepts/invocation' },
    ],
    capability: DEFAULT_CAPABILITY,
    comparison: {
      comparedTo: 'APIs',
      theyCenter: 'Endpoints, resources, methods, and transport schemas.',
      chpCenters: 'Hosted capabilities, lifecycle, policy, structured outcomes, evidence, and conformance.',
      guidance: [
        'Use APIs to implement services.',
        'Use CHP to expose governed capability contracts to independent callers.',
        'Use adapters when existing APIs need CHP semantics.',
      ],
    },
    code: { label: 'manifest.json', language: 'json', code: MANIFEST_FRAGMENT },
  }),
  docsPage({
    slug: 'comparisons/chp-vs-mcp-tools',
    group: 'Comparisons',
    title: 'CHP vs MCP tools',
    summary:
      'MCP tools center model-callable tool access. CHP centers independent hosted capability boundaries for agents, apps, products, and infrastructure.',
    plain:
      'CHP is not a replacement for model tool protocols; it defines the host-side contract around governed capabilities.',
    why:
      'Agent tool schemas do not by themselves standardize lifecycle, permission, version compatibility, structured denials, evidence, replay, or conformance.',
    formal:
      'CHP is a public capability-host protocol that can be called by agents and frameworks while preserving host identity, policy state, outcome semantics, and evidence.',
    example:
      'An MCP tool can call schedule_technician through CHP instead of encoding dispatch policy and evidence in tool glue.',
    relationships: [
      'MCP can be a caller-facing integration surface.',
      'CHP defines host-side capability semantics.',
      'Adapters can bridge tool ecosystems into CHP hosts.',
    ],
    visualModel: [
      'Agent framework selects a tool.',
      'Tool invokes a CHP capability host.',
      'Host enforces lifecycle, policy, and evidence.',
    ],
    implementationNotes: [
      'Keep model tool schemas aligned with CHP manifest metadata.',
      'Return CHP denials to the agent as structured information.',
      'Do not put host credentials or policy decisions in prompt glue.',
    ],
    commonMistakes: [
      'Treating a tool schema as the full operational contract.',
      'Skipping replayable evidence for agent actions.',
      'Letting every framework invent different denial semantics.',
    ],
    related: [
      { title: 'Host', href: '/docs/concepts/host' },
      { title: 'Policy', href: '/docs/concepts/policy' },
      { title: 'Evidence', href: '/docs/concepts/evidence' },
    ],
    capability: DEFAULT_CAPABILITY,
    trace: DEFAULT_TRACE,
    policy: DEFAULT_POLICY,
    comparison: {
      comparedTo: 'MCP tools',
      theyCenter: 'Model-callable tool descriptions and tool invocation from agent clients.',
      chpCenters: 'Host identity, capability lifecycle, policy, structured outcomes, evidence, replay, and conformance.',
      guidance: [
        'Use MCP where the agent client needs a tool interface.',
        'Use CHP where the capability host needs a portable public protocol boundary.',
        'Use both when an agent tool invokes an independently governed capability host.',
      ],
    },
  }),
  docsPage({
    slug: 'comparisons/chp-vs-service-mesh',
    group: 'Comparisons',
    title: 'CHP vs service mesh',
    summary:
      'Service meshes center service-to-service traffic. CHP centers capability-level meaning, policy, invocation outcomes, and evidence.',
    plain:
      'A service mesh can route packets between services; CHP explains what ability was requested and how the host governed it.',
    why:
      'Capability callers need semantic outcomes and evidence, not only network-level reliability and traffic policy.',
    formal:
      'CHP operates at the capability contract layer, above transport routing, and standardizes discoverability, invocation safety, and audit semantics.',
    example:
      'A mesh may route to ServiceOpsHost; CHP tells the caller whether schedule_technician is invokable and why a denial occurred.',
    relationships: [
      'Service mesh can support host transport and observability.',
      'CHP provides capability semantics above traffic management.',
      'Evidence can be exported into infrastructure telemetry.',
    ],
    visualModel: [
      'Mesh handles network path.',
      'Host handles capability policy.',
      'CHP outcome explains protocol result.',
    ],
    implementationNotes: [
      'Do not rely on mesh routing policy as capability authorization.',
      'Export CHP evidence alongside infrastructure telemetry.',
      'Preserve capability IDs in logs and traces.',
    ],
    commonMistakes: [
      'Assuming service identity equals capability permission.',
      'Treating retries as capability lifecycle logic.',
      'Losing capability-level correlation in network traces.',
    ],
    related: [
      { title: 'Context', href: '/docs/concepts/context' },
      { title: 'Evidence', href: '/docs/concepts/evidence' },
      { title: 'Conformance', href: '/docs/concepts/conformance' },
    ],
    capability: DEFAULT_CAPABILITY,
    comparison: {
      comparedTo: 'Service mesh',
      theyCenter: 'Service-to-service traffic, routing, retries, identity, and network observability.',
      chpCenters: 'Capability identity, host lifecycle, policy decision, structured outcome, evidence, and replay.',
      guidance: [
        'Use service mesh for traffic control and service infrastructure.',
        'Use CHP for capability-level contracts and outcomes.',
        'Connect both through shared correlation and telemetry export.',
      ],
    },
  }),
  docsPage({
    slug: 'comparisons/chp-vs-workflow-automation',
    group: 'Comparisons',
    title: 'CHP vs workflow automation',
    summary:
      'Workflow automation centers predefined flows. CHP centers reusable capability primitives that can be governed and composed.',
    plain:
      'Workflows decide the sequence. CHP defines the trusted units each sequence can call.',
    why:
      'Applications and agents need capability boundaries that remain useful across many workflows, not only one automation graph.',
    formal:
      'CHP describes hosted capability contracts that workflow systems, agents, and applications can invoke while preserving policy, lifecycle, outcome, and evidence semantics.',
    example:
      'complete_service_visit can compose query_inventory, schedule_technician, and notify_customer without hiding each host boundary.',
    relationships: [
      'Workflow automation can orchestrate CHP capabilities.',
      'Composition should preserve each capability result and evidence stream.',
      'Conformance can test host behavior independent of workflow tools.',
    ],
    visualModel: [
      'Workflow selects a sequence.',
      'Each step invokes a CHP capability.',
      'Evidence records the capability-level outcome for each step.',
    ],
    implementationNotes: [
      'Keep capability contracts reusable outside a single workflow.',
      'Represent partial failures by capability and host.',
      'Avoid bundling every step into one opaque capability.',
    ],
    commonMistakes: [
      'Treating workflow steps as private implementation details only.',
      'Losing host identity in composed flows.',
      'Skipping policy checks because the workflow is predefined.',
    ],
    related: [
      { title: 'Composition', href: '/docs/concepts/composition' },
      { title: 'Evidence', href: '/docs/concepts/evidence' },
      { title: 'Field service example', href: '/docs/examples/field-service' },
    ],
    capability: {
      ...DEFAULT_CAPABILITY,
      name: 'complete_service_visit',
      host: 'ServiceWorkflow',
      policy: 'restricted',
      state: 'declared',
    },
    comparison: {
      comparedTo: 'Workflow automation',
      theyCenter: 'Predefined process graphs, triggers, and orchestration logic.',
      chpCenters: 'Reusable hosted capability units with policy, lifecycle, outcome, and evidence.',
      guidance: [
        'Use workflow tools to arrange steps.',
        'Use CHP to make each step independently inspectable and governable.',
        'Use composition evidence to explain partial failure.',
      ],
    },
  }),
];

export const DOC_PAGES: DocsPage[] = [
  ...SUPPORTING_PAGES,
  ...DEVELOPER_REFERENCE_PAGES,
  ...FAILURE_MODE_PAGES,
  ...CONCEPT_PAGES,
  ...COMPARISON_PAGES,
];

export const DOC_NAV_GROUPS = [
  {
    label: 'Introduction',
    description: 'Start with the category, mental model, and protocol boundary.',
    slugs: ['introduction/what-is-chp', 'introduction/mental-model'],
  },
  {
    label: 'Concepts',
    description: 'Protocol primitives that every host and caller needs to share.',
    slugs: CONCEPT_PAGES.map((page) => page.slug),
  },
  {
    label: 'Guides',
    description: 'Practical implementation paths from capability map to governed invocation.',
    slugs: [
      'guides/map-your-first-capability',
      'guides/define-a-capability-contract',
      'guides/govern-invocation',
    ],
  },
  {
    label: 'Examples',
    description: 'Concrete hosted-capability models for operational domains.',
    slugs: ['examples/field-service', 'examples/agent-operations'],
  },
  {
    label: 'Reference',
    description: 'Stable notation, lifecycle, policy, field, outcome, and terminology references.',
    slugs: [
      'reference/notation',
      'reference/lifecycle',
      'reference/policy-states',
      'reference/manifest-fields',
      'reference/invocation-envelope',
      'reference/outcome-codes',
      'reference/evidence-events',
      'reference/conformance-cases',
      'reference/product-surfaces',
      'reference/glossary',
    ],
  },
  {
    label: 'Failure Modes',
    description:
      'Concrete request/outcome examples for first-class protocol failures.',
    slugs: FAILURE_MODE_PAGES.map((page) => page.slug),
  },
  {
    label: 'Comparisons',
    description: 'How CHP differs from adjacent protocols and infrastructure categories.',
    slugs: COMPARISON_PAGES.map((page) => page.slug),
  },
] as const;

export function getDocsPage(slug: string): DocsPage | undefined {
  return DOC_PAGES.find((page) => page.slug === slug);
}

export function getDocsPages(slugs: readonly string[]): DocsPage[] {
  return slugs
    .map((slug) => getDocsPage(slug))
    .filter((page): page is DocsPage => Boolean(page));
}
