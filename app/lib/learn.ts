import {
  HOOKS_INSTALL,
  HOOKS_INSPECT,
  MINIMAL_EXAMPLE,
  AGENTIC_EXAMPLE,
  RAG_EXAMPLE,
  SAFETY_EXAMPLE,
  PERSISTENCE_EXAMPLE,
  EVIDENCE_OUTPUT,
  HOMEPAGE_FAQS,
  PROTOCOL_GUARANTEES,
} from './content';

/**
 * The CHP knowledge base — the content behind the MCP learning/information
 * server. Definitions + concepts authored to match the site/spec; code
 * examples and FAQs are the real ones from content.ts. Lets an agent learn
 * what CHP is, why it matters, and how to adopt it.
 */

const DOCS = 'https://docs.capabilityhostprotocol.com';
const SITE = 'https://capabilityhostprotocol.com';

export const GLOSSARY: Record<string, string> = {
  capability:
    'A named, invokable unit of useful work (e.g. schedule_technician, transfer_funds). Declared with a stable id, version, input schema, and the policy it requires — before anyone calls it. Capabilities are what the protocol governs and proves.',
  'capability boundary':
    'The line an action crosses to go from intent into effect. The same line regardless of who initiated it — person, agent, or product — which is why it is the right place to declare, govern, and prove what happens. Governance lives at the boundary, not in the model.',
  host: 'A capability host: anything that exposes and runs capabilities under the protocol — a person approving something, a business process, a device, an application, or another vendor’s agent framework. CHP is host-agnostic.',
  invocation:
    'A single attempt to call a capability, carried in an InvocationEnvelope with the capability id, inputs, subject, and a correlation. Every invocation produces an outcome (success, denial, unavailable) and an evidence event.',
  evidence:
    'A structured, tamper-evident record of what happened at the boundary: an ExecutionEvidence event with a stable id, host, correlation, explicit outcome, and a hash linking it to the prior event. Designed to outlive the system that produced it — portable and verifiable on its own terms.',
  'hash chain':
    'SHA256 links that make any alteration detectable: each evidence event includes a hash of the previous one. Alter or drop any record and the chain breaks visibly — chain of custody by math.',
  correlation:
    'The id that ties every action in one process together — across a session, matter, or multiple hosts — so a distributed process reconstructs as a single ordered trace instead of scattered logs.',
  denial:
    'A refused action recorded as a first-class outcome: when a policy or entitlement check fails at the boundary, CHP records why (reason code, deciding subject, evidence id) rather than swallowing it as an exception.',
  replay:
    'Reconstructing a process from its evidence, in order, by correlation id — how “show me what happened” is answered.',
  conformance:
    'A versioned check that an implementation declares, governs, and proves capabilities as the spec requires — what makes the protocol trustworthy across independent vendors.',
  'capability descriptor':
    'The schema defining a capability declaration: id, version, description, input schema, and governance metadata (who may invoke it, under what policy, whether it emits evidence). The unit behind the catalog and capabilities.txt.',
  adapter:
    'A package that exposes a provider’s actions (SaaS APIs, databases, devices) as governed CHP capabilities, so an action through it is recorded the same way as any other.',
  'capabilities.txt':
    'A public, well-known file advertising what a host can do — a discovery sibling to robots.txt and llms.txt, pointing to an MCP/HTTP endpoint for invocation. Discovery, not invocation.',
};

export type Concept = { title: string; body: string; learnMore: string };

export const CONCEPTS: Record<string, Concept> = {
  'what-is-chp': {
    title: 'What is CHP?',
    body: 'The Capability Host Protocol (CHP) is an open protocol and evidence layer for what AI agents, products, and organizations do. It turns every consequential action — by a person, an agent, a product, or a business — into a declared, governable, tamper-evidently provable event at the capability boundary. Start where the proof is real: one command captures exactly what your AI agents did, as replayable, tamper-evident evidence.',
    learnMore: `${SITE}/how-it-works`,
  },
  'evidence-model': {
    title: 'The evidence model',
    body: 'Every invocation at the boundary emits a structured event — started, completed, failed, or denied — mandatorily, not when someone remembered to log. Events are SHA256 hash-chained (tamper-evident), correlated by one id (replayable in order), and decision-aware (denials and approvals are first-class). Evidence is portable and verifiable independent of the application that produced it.',
    learnMore: `${SITE}/blog/logs-arent-evidence`,
  },
  'why-a-protocol': {
    title: 'Why a protocol, not a feature',
    body: 'A feature inside one system can record what that system did; it cannot be the neutral thing a second system, an auditor, or a regulator will trust. Evidence is only useful when it outlives its producer and means the same thing across independent implementations. That is a protocol problem — a small, versioned, conformance-backed contract — not a library you sprinkle in.',
    learnMore: `${SITE}/why-a-protocol`,
  },
  governance: {
    title: 'Governance at the boundary',
    body: 'A capability can declare a risk tier, required authorization, and required approval before it can be invoked. An invocation that fails those checks is denied at the boundary and recorded with a reason — a first-class outcome, not a swallowed exception. The controls are in the contract, not just the code review.',
    learnMore: `${SITE}/govern/agents`,
  },
  'agentic-web': {
    title: 'CHP and the agentic web',
    body: 'The agentic web has a discovery layer (llms.txt, capabilities.txt), an invocation layer (MCP), and an identity layer (Web Bot Auth — cryptographic agent identity). But identity only answers WHO an agent is, not WHAT it did or whether it was allowed. CHP is the evidence/trust layer that completes the stack: governed, provable, replayable execution. Discovery → invocation → identity → evidence.',
    learnMore: `${SITE}/capabilities-txt`,
  },
  'evidence-vs-telemetry': {
    title: 'Evidence is not telemetry',
    body: 'Telemetry (OpenTelemetry) is built to understand a running system: sampled, mutable, ops-owned, no notion of a denial or approval. Evidence is built to be defended: mandatory, tamper-evident (hash-chained), decision-aware, replayable by correlation. They compose — map CHP correlation ids to trace ids — but one was never trying to be the other.',
    learnMore: `${SITE}/blog/evidence-is-not-telemetry`,
  },
  'chp-vs-mcp': {
    title: 'CHP and MCP',
    body: 'MCP answers “what can the model call” (a stateful connect-and-invoke protocol). CHP answers “what actually happened, who was denied, and can I replay it.” They are complementary layers: an MCP server can be wrapped as a CHP host so its tool calls emit evidence; a CHP capability can be exposed through an MCP tool surface. CHP does not replace MCP.',
    learnMore: `${SITE}/blog/chp-and-mcp`,
  },
  conformance: {
    title: 'Conformance',
    body: 'CHP ships a conformance suite so independent hosts can demonstrate they declare, govern, and prove capabilities correctly. Conformance is what makes a record mean the same thing no matter who produced it.',
    learnMore: `${SITE}/conformance`,
  },
};

export type Example = { name: string; description: string; code: string };

export const EXAMPLES: Example[] = [
  { name: 'hooks-install', description: 'Capture every agent tool call as evidence — one command, no code changes (real today).', code: HOOKS_INSTALL },
  { name: 'inspect-session', description: 'Inspect / replay a captured agent session.', code: HOOKS_INSPECT },
  { name: 'minimal', description: 'The minimal Python host: declare a capability and invoke it.', code: MINIMAL_EXAMPLE },
  { name: 'agentic', description: 'An AgentSession with a planning context; plan steps emit evidence automatically.', code: AGENTIC_EXAMPLE },
  { name: 'rag', description: 'Auditable RAG: retrieval capabilities that leave replayable evidence.', code: RAG_EXAMPLE },
  { name: 'safety', description: 'Risk-tiered safety: invocations above a risk tier emit execution_denied.', code: SAFETY_EXAMPLE },
  { name: 'persistence', description: 'SQLite-backed evidence store and capabilities.', code: PERSISTENCE_EXAMPLE },
  { name: 'evidence-output', description: 'The shape of a CHP evidence event (JSON).', code: EVIDENCE_OUTPUT },
];

export const ADOPT = {
  title: 'How to adopt CHP',
  steps: [
    'Start with agents — the real-today wedge: run `chp hooks install` to capture every tool call (Claude Code, Codex, Gemini CLI, or any Python host) as replayable, tamper-evident evidence. No application code changes.',
    'Inspect: `chp session list`, `chp session tree <id>`, `chp session replay <id>`. Export to your observability stack with `chp session otel`.',
    'Build with the Python SDK: a LocalCapabilityHost, @capability decorators, and a SQLiteEvidenceStore. See the Python SDK + CLI reference in the docs.',
    'For production trust (hosted retention, role-based access, compliance export) — become a design partner.',
  ],
  docs: `${DOCS}`,
  designPartners: `${SITE}/design-partners`,
};

export const FAQS = HOMEPAGE_FAQS;
export const GUARANTEES = PROTOCOL_GUARANTEES;
