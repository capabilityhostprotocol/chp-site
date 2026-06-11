export const PROTOCOL_AUDIENCES = [
  {
    role: 'Capability hosts',
    headline: 'Expose reliable capability surfaces.',
    body: 'Publish typed manifests, lifecycle state, version compatibility, permission requirements, and structured invocation outcomes.',
  },
  {
    role: 'Agents and frameworks',
    headline: 'Call tools through a stable contract.',
    body: 'Discover available capabilities, request invocations with correlation context, and handle denials or unavailable hosts predictably.',
  },
  {
    role: 'Applications',
    headline: 'Compose governed workflows.',
    body: 'Route high-value actions through capability hosts without baking every provider, policy engine, or audit path into the app.',
  },
  {
    role: 'Infrastructure providers',
    headline: 'Build trust layers around the protocol.',
    body: 'Validate manifests, enforce permissions, stitch evidence, export telemetry, and run conformance for independent hosts.',
  },
];

export const PROTOCOL_GUARANTEES = [
  {
    title: 'Manifest-first discovery',
    body: 'Hosts declare capabilities, products, versions, permissions, and availability before invocation.',
  },
  {
    title: 'Version compatibility',
    body: 'Protocol and capability versions are explicit so agents can fail closed on incompatible surfaces.',
  },
  {
    title: 'Permissioned invocation',
    body: 'Invocations carry caller identity, audience context, timeout intent, and entitlement checks.',
  },
  {
    title: 'Lifecycle enforcement',
    body: 'Unavailable hosts, disabled capabilities, malformed frames, and premature calls are protocol outcomes.',
  },
  {
    title: 'Structured errors',
    body: 'Denials, validation failures, timeouts, and host errors return machine-readable codes and details.',
  },
  {
    title: 'Evidence and replay',
    body: 'Every accepted invocation can emit ordered evidence for audit, debugging, telemetry, and compliance.',
  },
];

export const ADOPTION_PATHS = [
  {
    step: '01',
    title: 'Implement a host',
    body: 'Wrap local functions or managed services behind CHP manifests and invocation handlers.',
    cta: 'Implementer paths',
    href: '/implementers',
  },
  {
    step: '02',
    title: 'Call a host',
    body: 'Use the local or remote client shape to invoke capabilities and replay evidence by correlation ID.',
    cta: 'Protocol surface',
    href: '/protocol',
  },
  {
    step: '03',
    title: 'Validate the surface',
    body: 'Treat manifests, unknown hosts, unavailable capabilities, and malformed requests as protocol concerns.',
    cta: 'Read the spec',
    href: 'https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md',
  },
  {
    step: '04',
    title: 'Run conformance',
    body: 'Use tests and protocol checks to prove independent implementations behave consistently.',
    cta: 'Conformance model',
    href: '/conformance',
  },
];

export const MINIMAL_EXAMPLE = `from chp_core import LocalCapabilityHost, capability

host = LocalCapabilityHost("my-host")

@capability(id="payments.transfer", version="1.0.0", description="Transfer funds.")
def transfer(amount: float, to: str):
    execute_transfer(amount, to)
    return {"status": "ok", "amount": amount}

host.register(transfer)

result = host.invoke(
    "payments.transfer",
    {"amount": 100.0, "to": "acct_456"},
    correlation_id="session-abc",
)

events = host.replay("session-abc")
# → execution_started, execution_completed`;

export const EVIDENCE_OUTPUT = `{
  "event_id": "evt_8f3a1c",
  "evidence_type": "execution_completed",
  "capability_id": "payments.transfer",
  "capability_version": "1.0.0",
  "correlation_id": "session-abc",
  "host_id": "my-host",
  "sequence": 2,
  "prev_hash": "sha256:a3f1...",
  "hash": "sha256:9c2d...",
  "timestamp": "2026-06-03T00:14:22.104Z",
  "outcome": "success",
  "duration_ms": 43
}`;

export const AGENTIC_EXAMPLE = `async with AgentSession(host, intent="answer user query", model="claude-opus-4") as session:
    async with PlanningContext(session) as plan:
        await plan.add_step("retrieve relevant docs")
        await plan.add_step("summarize and respond")
    # plan_created, plan_step_started/completed evidence emitted automatically`;

export const RAG_EXAMPLE = `host = LocalCapabilityHost("rag-agent")
register_retrieval_capability(
    host, InMemoryVectorRetrievalCapability(embed_fn, corpus)
)

result = host.invoke(
    "retrieval.query",
    {"query": "agent governance", "top_k": 3},
    correlation_id="rag-001",
)
# result.data["source_refs"] → [{source_id, title, score}, ...]

events = host.replay("rag-001")
# → retrieval_started, retrieval_completed — auditable RAG`;

export const SAFETY_EXAMPLE = `evaluator = RuleBasedSafetyEvaluator(max_risk_tier="medium")
register_safety_capability(host, evaluator)

# Invocations above "medium" risk emit execution_denied — not an exception
result = host.invoke("finance.wire_transfer", payload)
if not result.success:
    print(result.denial.code)  # → "risk_tier_exceeded"`;

export const PERSISTENCE_EXAMPLE = `from chp_core import LocalCapabilityHost, SQLiteEvidenceStore
from chp_core import setup_sqlite_capabilities

store = SQLiteEvidenceStore(".chp/evidence.sqlite")
host = LocalCapabilityHost("my-agent", store=store)

# Wire 6 SQLite-backed capabilities in one call:
# state_machine, event_bus, ingestion, retrieval, graph, incident
managers = setup_sqlite_capabilities(host, base_dir=".chp")`;

export const HOOKS_INSTALL = `# One command — no application code changes required
chp hooks install

# → Hooks registered for Claude Code
# → Every tool call intercepted: Bash, Read, Edit, Write, WebFetch...
# → Evidence stored to ~/.chp/evidence.sqlite automatically

# Then inspect any session:
chp session list
chp session tree <session_id>
chp session autonomy-report <session_id>
chp session otel <session_id> --endpoint http://localhost:4318`;

export const HOOKS_INSPECT = `# Full session tree across parent + child agents
chp session tree sess_abc123
# ├── agent_session_started  (model: claude-opus-4-8, intent: "fix the bug")
# ├── claude_code.read       input: src/host.py
# ├── claude_code.bash       input: python -m pytest tests/
# ├── claude_code.edit       input: src/host.py
# └── agent_session_completed  outcome: success, tools: 3

# Export the full trace to any OTLP collector
chp session otel sess_abc123 --endpoint http://localhost:4318`;

export const MODEL_ADAPTERS_EXAMPLE = `from chp_core import LocalCapabilityHost, register_adapter
from chp_core.adapters import ClaudeAdapter, OpenAIAdapter, GeminiAdapter

host = LocalCapabilityHost("my-agent")

# Same governance layer regardless of provider
register_adapter(host, ClaudeAdapter(api_key=ANTHROPIC_KEY))
register_adapter(host, OpenAIAdapter(api_key=OPENAI_KEY))
register_adapter(host, GeminiAdapter(api_key=GOOGLE_KEY))

# Every LLM call → governed, auditable, replayable
result = host.invoke("claude.messages_create", {
    "model": "claude-opus-4-8",
    "messages": [{"role": "user", "content": "Summarize this document."}],
    "max_tokens": 1024,
})
# Captured automatically: input_tokens, output_tokens, latency_ms, finish_reason`;

export const POLICY_FILE = `// .chp/policy.json — loaded automatically on host startup
{
  "max_risk_tier": "medium",
  "audit_only": false,
  "block_patterns": [
    { "capability_id": "claude_code.bash", "payload_pattern": "rm -rf" },
    { "capability_id": "claude_code.bash", "payload_pattern": "DROP TABLE" },
    { "capability_id": "*.delete",         "payload_pattern": "production" }
  ],
  "allowed_capability_ids": ["payments.*", "retrieval.*", "memory.*"],
  "block_capability_ids":   ["claude_code.web_fetch"]
}`;

export const POLICY_CODE = `# Policy loaded from .chp/policy.json or CHP_POLICY_FILE env var
# No code changes needed — deploy the JSON file, enforcement is automatic

# Violations are evidence, not exceptions:
result = host.invoke("claude_code.bash", {"command": "rm -rf /tmp/data"})
# → result.success = False
# → result.denial.code = "policy_block_pattern_matched"
# → execution_denied event written to evidence store`;

export const MATURITY_LEVELS = [
  { level: 'L1', label: 'Registered', desc: 'Descriptor declared with id, version, description' },
  { level: 'L2', label: 'Invoked',    desc: 'At least one successful invocation recorded' },
  { level: 'L3', label: 'Emitting',   desc: 'Declares domain-specific evidence events' },
  { level: 'L4', label: 'Classified', desc: 'Category and tags set on descriptor' },
  { level: 'L5', label: 'Verified',   desc: 'All declared emits appear in evidence' },
  { level: 'L6', label: 'Proven',     desc: 'Invoked across multiple distinct sessions' },
  { level: 'L7', label: 'Documented', desc: 'Input/output schemas inferred, docs present' },
];

export const CLI_GROUPS = [
  {
    label: 'Host',
    commands: [
      { cmd: 'chp host verify',              desc: 'Smoke-test host + evidence store' },
      { cmd: 'chp serve-http --module …',    desc: 'Serve any host over HTTP' },
      { cmd: 'chp invoke <cap> --url …',     desc: 'Invoke a remote capability' },
      { cmd: 'chp replay <corr-id>',         desc: 'Replay evidence by correlation ID' },
    ],
  },
  {
    label: 'Hooks',
    commands: [
      { cmd: 'chp hooks install',            desc: 'Intercept Claude Code / Codex / Gemini tool calls' },
      { cmd: 'chp hooks status',             desc: 'Show which agent CLIs are hooked' },
      { cmd: 'chp hook pre-tool',            desc: 'Policy gate (blocks or warns before execution)' },
      { cmd: 'chp hook post-tool',           desc: 'Evidence writer (records after execution)' },
    ],
  },
  {
    label: 'Sessions',
    commands: [
      { cmd: 'chp session list',             desc: 'List stored agent sessions' },
      { cmd: 'chp session tree <id>',        desc: 'Hierarchical event tree' },
      { cmd: 'chp session otel <id>',        desc: 'Export trace to any OTLP endpoint' },
      { cmd: 'chp session autonomy-report',  desc: 'Approvals, denials, budget analysis' },
    ],
  },
  {
    label: 'Reports',
    commands: [
      { cmd: 'chp session metrics-report',   desc: 'Latency p50/p95/p99, invocation counts' },
      { cmd: 'chp session retrieval-report', desc: 'RAG query analysis and source citations' },
      { cmd: 'chp session workflow-report',  desc: 'Multi-step workflow execution summary' },
      { cmd: 'chp session events-report',    desc: 'Domain event bus summary' },
    ],
  },
  {
    label: 'Registry',
    commands: [
      { cmd: 'chp registry list',            desc: 'List all registered capabilities' },
      { cmd: 'chp registry assess-maturity', desc: 'Score capabilities L1–L7' },
      { cmd: 'chp registry certify',         desc: 'Issue a maturity certificate' },
      { cmd: 'chp policy lint',              desc: 'Validate a policy.json file' },
    ],
  },
  {
    label: 'DevOps',
    commands: [
      { cmd: 'chp work vc-precommit',        desc: 'Evidence-gated pre-commit check' },
      { cmd: 'chp work vc-merge-readiness',  desc: 'Merge readiness verification' },
      { cmd: 'chp work check-alignment',     desc: 'Spec ↔ schema ↔ types alignment' },
      { cmd: 'chp ci check',                 desc: 'CI status gate' },
    ],
  },
];

export const STEPS = [
  {
    number: '01',
    title: 'Register',
    body: 'Wrap any function as a capability with a stable ID, version, and description. The host manages the registry.',
    code: '@capability(id="payments.transfer", version="1.0.0")',
  },
  {
    number: '02',
    title: 'Invoke',
    body: 'Call through the host with a correlation ID. Evidence is emitted automatically — started, completed, failed, or denied.',
    code: 'host.invoke("payments.transfer", payload, correlation_id=...)',
  },
  {
    number: '03',
    title: 'Replay',
    body: 'Ask the host for the ordered evidence stream for any correlation ID. Every invocation is queryable locally, without a backend.',
    code: 'events = host.replay("session-abc")',
  },
];

export const PLATFORM_GROUPS = [
  {
    label: 'Evidence & Replay',
    description:
      'SHA256 hash-chained execution events for every invocation. Replay any session by correlation ID — local, no backend, tamper-detectable.',
    exports: ['LocalCapabilityHost', 'SQLiteEvidenceStore', '@capability'],
  },
  {
    label: 'Agentic Intelligence',
    description:
      'Sessions, memory, planning, delegation, autonomy budgets. Make agent reasoning observable and governable.',
    exports: ['AgentSession', 'MemoryCapability', 'PlanningContext', 'DelegationContext', 'AutonomyProfile'],
  },
  {
    label: 'Data Capabilities',
    description:
      'Vector retrieval, text ingestion, transformation, knowledge graph — all evidence-emitting, SQLite-backed.',
    exports: ['InMemoryVectorRetrievalCapability', 'SQLiteIngestionCapability', 'SQLiteKnowledgeGraph'],
  },
  {
    label: 'Safety & Compliance',
    description:
      'Rule-based guardrails, JSON policy files, compliance reporting, incident tracking. Explainable governance, zero ML.',
    exports: ['RuleBasedSafetyEvaluator', 'SQLiteComplianceManager', 'SQLiteIncidentManager'],
  },
  {
    label: 'Model Adapters',
    description:
      'Every Claude, OpenAI, or Gemini call becomes a governed capability. Automatic token counting, latency, and cost attribution.',
    exports: ['ClaudeAdapter', 'OpenAIAdapter', 'GeminiAdapter', 'capability_to_anthropic_tool'],
  },
  {
    label: 'Multi-Agent Composition',
    description:
      'RemoteCapabilityHost mirrors the local API over HTTP. Non-intrusive hooks for Claude Code, Codex, and Gemini CLI.',
    exports: ['RemoteCapabilityHost', 'serve_http', 'auto_register_adapters'],
  },
];

export const PROTOCOL_SURFACE = [
  'Capability descriptors',
  'Host descriptors',
  'Invocation envelopes',
  'Correlation context',
  'Structured execution evidence',
  'Outcome, error, and denial semantics',
  'Replay queries and results',
  'Minimal conformance requirements',
];

export const COMPARISON_ROWS: [string, string, string, string][] = [
  ['Did this tool run?', 'Maybe', 'Yes (span)', 'Yes (evidence)'],
  ['Was it denied before running?', 'Maybe', 'Custom span status', 'First-class outcome'],
  ['What correlated to this session?', 'No', 'Trace context', 'Correlation ID + replay'],
  ['Can I replay by causal ID?', 'No', 'Depends on backend', 'Yes, required'],
  ['What invariants were declared?', 'No', 'No', 'Capability descriptor'],
];
