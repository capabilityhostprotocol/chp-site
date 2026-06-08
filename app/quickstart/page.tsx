import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Quickstart — Capability Host Protocol',
  description: 'Get started with CHP in 15 minutes. Install, declare a capability, add SQLite persistence, verify, and serve.',
};

const STEP1 = `pip install chp-core`;

const STEP2 = `from chp_core import LocalCapabilityHost, capability

host = LocalCapabilityHost("my-host")

@capability(
    id="demo.greet",
    version="1.0.0",
    description="Return a greeting.",
)
def greet(name: str):
    return {"message": f"Hello {name}"}

host.register(greet)

result = host.invoke(
    "demo.greet",
    {"name": "CHP"},
    correlation_id="qs-001",
)
print(result.outcome)       # → "success"
print(result.data)          # → {"message": "Hello CHP"}

events = host.replay("qs-001")
# → [execution_started, execution_completed]`;

const STEP3 = `from chp_core import LocalCapabilityHost, SQLiteEvidenceStore
from chp_core import setup_sqlite_capabilities

store = SQLiteEvidenceStore(".chp/evidence.sqlite")
host = LocalCapabilityHost("my-agent", store=store)

# Wire 6 SQLite-backed capabilities in one call:
# state_machine, event_bus, ingestion, retrieval, graph, incident
managers = setup_sqlite_capabilities(host, base_dir=".chp")`;

const STEP4 = `chp host verify
# → chp host is healthy — evidence recorded and replayed

# With a persistent store directory:
chp host verify --store-dir .chp`;

const STEP5 = `# In app.py — expose your host via a factory function
from chp_core import LocalCapabilityHost, setup_sqlite_capabilities

def create_host() -> LocalCapabilityHost:
    host = LocalCapabilityHost("my-agent")
    setup_sqlite_capabilities(host)
    return host`;

const STEP5B = `chp serve-http --module app:create_host --port 8765
# Listening on http://127.0.0.1:8765
# Routes: GET /health, GET /host, GET /capabilities,
#         POST /invoke, GET /replay/{id}, POST /replay`;

const STEP6 = `from chp_core import (
    LocalCapabilityHost,
    InMemoryVectorRetrievalCapability,
    register_retrieval_capability,
)

def embed(text: str) -> list[float]:
    # Replace with openai.embeddings.create(), cohere.embed(), etc.
    raise NotImplementedError

corpus = [
    {"source_id": "doc-1", "title": "Getting Started", "content": "..."},
    {"source_id": "doc-2", "title": "Evidence Model",  "content": "..."},
]

host = LocalCapabilityHost("rag-agent")
register_retrieval_capability(
    host, InMemoryVectorRetrievalCapability(embed, corpus)
)

result = host.invoke(
    "retrieval.query",
    {"query": "how does evidence work?", "top_k": 3},
    correlation_id="rag-001",
)
for ref in result.data["source_refs"]:
    print(f"[{ref['score']:.3f}]  {ref['title']}")`;

const STEP7 = `# Cross-host composition — Agent B calls Agent A over HTTP
from chp_core import RemoteCapabilityHost

agent_b = RemoteCapabilityHost("http://127.0.0.1:8765")

result = agent_b.invoke(
    "payments.transfer",
    {"amount": 100.0, "to": "acct_456"},
    correlation={"correlation_id": "cross-001"},
)
print(result.outcome)    # → "success"

# Replay evidence on Agent A from Agent B
events = agent_b.replay("cross-001")
# → retrieval_started, retrieval_completed`;

type Step = {
  number: string;
  title: string;
  description: string;
  code?: string;
  code2?: string;
  note?: string;
  label?: string;
  label2?: string;
};

const STEPS: Step[] = [
  {
    number: '1',
    title: 'Install',
    description: 'Zero mandatory dependencies.',
    code: STEP1,
    label: 'terminal',
  },
  {
    number: '2',
    title: 'Declare and invoke a capability',
    description: 'Wrap any function with @capability. The host handles evidence emission automatically.',
    code: STEP2,
    label: 'my_app.py',
  },
  {
    number: '3',
    title: 'Add SQLite persistence',
    description: 'setup_sqlite_capabilities() wires six SQLite-backed capability families in one call — evidence, state machine, event bus, ingestion, retrieval, knowledge graph, and incident tracking.',
    code: STEP3,
    label: 'my_app.py',
  },
  {
    number: '4',
    title: 'Verify your setup',
    description: 'chp host verify smoke-tests the host and evidence store in under 1 second. Pass --store-dir to also verify persistent storage.',
    code: STEP4,
    label: 'terminal',
  },
  {
    number: '5',
    title: 'Serve over HTTP',
    description: 'Expose any host via a factory function. chp serve-http loads it and starts the server — GET /health, POST /invoke, GET /replay/{id}.',
    code: STEP5,
    code2: STEP5B,
    label: 'app.py',
    label2: 'terminal',
  },
  {
    number: '6',
    title: 'Add vector retrieval',
    description: 'Supply your own embedding function — any provider works. InMemoryVectorRetrievalCapability for dev, SQLiteVectorRetrievalCapability for prod. Every query emits retrieval_started/completed evidence.',
    code: STEP6,
    label: 'rag_agent.py',
  },
  {
    number: '7',
    title: 'Compose across hosts',
    description: 'RemoteCapabilityHost mirrors the local invoke/replay API over HTTP. No new dependencies — just stdlib urllib.request.',
    code: STEP7,
    label: 'agent_b.py',
  },
];

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        {label && (
          <span className="ml-2 font-mono text-xs text-zinc-600">{label}</span>
        )}
      </div>
      <pre className="p-4 font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function QuickstartPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <p className="font-mono text-xs text-zinc-500 mb-4 tracking-widest uppercase">
          Quickstart
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 mb-4">
          Get started with CHP in 15 minutes.
        </h1>
        <p className="text-base text-zinc-400 mb-14 leading-relaxed">
          Install the Python host, declare your first capability, add persistence, verify,
          and serve over HTTP.
        </p>

        <div className="space-y-14">
          {STEPS.map((step) => (
            <div key={step.number}>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-xs text-zinc-600 min-w-[1.5rem]">
                  {step.number}.
                </span>
                <h2 className="text-base font-semibold text-zinc-100">{step.title}</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 pl-[calc(1.5rem+0.75rem)]">
                {step.description}
              </p>
              <div className="space-y-3">
                {step.code && (
                  <CodeBlock code={step.code} label={step.label} />
                )}
                {step.code2 && (
                  <CodeBlock code={step.code2} label={step.label2} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-zinc-800 space-y-2">
          <p className="text-sm font-semibold text-zinc-300 mb-4">Read next</p>
          {[
            ['Protocol Spec', 'https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md'],
            ['Onboarding guide', 'https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/onboarding.md'],
            ['Adopter quickstart', 'https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/adopter-quickstart.md'],
            ['Conformance suite', 'https://github.com/capabilityhostprotocol/chp-core/tree/main/conformance'],
            ['Why CHP?', 'https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/why-chp.md'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              <span className="font-mono text-zinc-700">→</span>
              {label}
            </a>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
