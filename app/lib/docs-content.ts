type PolicyState = 'open' | 'restricted' | 'approval_required' | 'audited' | 'blocked';

type CapabilityState =
  | 'declared'
  | 'hosted'
  | 'discoverable'
  | 'invokable'
  | 'restricted'
  | 'blocked'
  | 'verified';

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
};

type ConceptInput = Omit<DocsPage, 'slug' | 'group' | 'related'> & {
  slug: string;
  related?: { title: string; href: string }[];
};

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
  "host_id": "service-ops-host",
  "protocol_version": "0.1",
  "capabilities": [{
    "id": "schedule_technician",
    "version": "1.0.0",
    "permissions": ["service:dispatch"],
    "available": true,
    "policy": { "state": "approval_required" }
  }]
}`;

const INVOCATION_FRAGMENT = `{
  "capability_id": "schedule_technician",
  "caller": "agent://planning-assistant",
  "correlation_id": "session-abc",
  "timeout_ms": 3000,
  "payload": {
    "job_id": "job_456",
    "window": "tomorrow"
  }
}`;

const OUTCOME_FRAGMENT = `{
  "ok": false,
  "code": "approval_required",
  "message": "manager_approval must approve before execution.",
  "evidence": "execution_denied"
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
      'ServiceOpsHost exposes schedule_technician and query_inventory while enforcing manager approval and service dispatch permissions.',
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
      'Make host_id stable and unique inside the trust boundary.',
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
      'An invocation is a structured request to run a capability with caller context, payload, timeout, and correlation.',
    plain:
      'An invocation is the moment a caller asks a host to do the named thing.',
    why:
      'Sensitive capability calls need more than a function call shape; they need identity, intent, policy checks, timeout behavior, and outcomes.',
    formal:
      'An invocation is a protocol envelope that names the capability, carries payload and caller context, declares timeout intent, and receives a structured result.',
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
      'Carry timeout intent explicitly instead of relying on transport defaults.',
      'Keep denial outcomes machine-readable.',
    ],
    commonMistakes: [
      'Sending raw payloads without caller identity.',
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
      'Expose required permissions before invocation.',
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
      'Keep caller identity separate from business context.',
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
  "evidence_type": "execution_denied",
  "capability_id": "schedule_technician",
  "capability_version": "1.0.0",
  "host_id": "service-ops-host",
  "correlation_id": "session-abc",
  "sequence": 2,
  "outcome": "approval_required"
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
    "ok": false,
    "code": "approval_required",
    "evidence": "execution_denied"
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
      'Write the stable manifest, version, permissions, lifecycle, payload, and outcome shape for a hosted capability.',
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
      'Encoding permissions only in application code.',
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
      'Actor maps to caller identity.',
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
    capability: DEFAULT_CAPABILITY,
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
    description: 'Stable notation, lifecycle, policy, and terminology references.',
    slugs: [
      'reference/notation',
      'reference/lifecycle',
      'reference/policy-states',
      'reference/glossary',
    ],
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
