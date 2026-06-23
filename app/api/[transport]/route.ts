import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { createHash } from 'node:crypto';
import {
  capabilityAdapters,
  capabilityCategories,
  adaptersByCategory,
} from '../../lib/capabilities';

// --- Dogfooding: every tool call is wrapped as a real, hash-chained CHP
// evidence event. The hash is a genuine SHA256 over the prior event + this
// call, demonstrating tamper-evidence live. (Best-effort per server instance.)
let chain: string[] = [];
function emitEvidence(tool: string, args: unknown) {
  const prev = chain[chain.length - 1] ?? '00000000';
  const payload = JSON.stringify({ tool, args, ts: Date.now() });
  const hash = createHash('sha256')
    .update(prev + payload)
    .digest('hex')
    .slice(0, 8);
  chain.push(hash);
  return {
    event_type: 'execution_completed',
    capability_id: `chp.site.mcp.${tool}`,
    correlation_id: 'mcp-session',
    outcome: 'success',
    sequence: chain.length,
    prev_hash: prev,
    hash,
    redacted: true,
    timestamp: new Date().toISOString(),
  };
}

function wrap(tool: string, args: unknown, data: unknown) {
  const evidence = emitEvidence(tool, args);
  return {
    content: [
      { type: 'text' as const, text: JSON.stringify(data, null, 2) },
      {
        type: 'text' as const,
        text:
          `— wrapped as CHP evidence — ${JSON.stringify(evidence)}\n` +
          `Each call hash-chains to the prior one; this is the protocol demonstrating itself.`,
      },
    ],
  };
}

const GLOSSARY: Record<string, string> = {
  capability: 'A named, invokable unit of useful work, declared with id, version, schema, and policy before anyone calls it.',
  'capability boundary': 'The line an action crosses to go from intent into effect — the one place to declare, govern, and prove what happens.',
  host: 'Anything that exposes and runs capabilities under the protocol — a person, process, device, app, or another vendor’s framework.',
  invocation: 'A single attempt to call a capability, carried in an envelope with subject and correlation; always produces an outcome and evidence.',
  evidence: 'A structured, tamper-evident record of what happened at the boundary — portable and verifiable on its own terms.',
  'hash chain': 'SHA256 links making any alteration detectable; CHP evidence is hash-chained — chain of custody by math.',
  correlation: 'The id tying every action in one process together, even across hosts, so a distributed process replays as one ordered trace.',
  denial: 'A refused action recorded as a first-class outcome with a reason code and deciding subject — not a swallowed exception.',
  replay: 'Reconstructing a process from its evidence, in order, by correlation id.',
  conformance: 'A versioned check that an implementation declares, governs, and proves capabilities as the spec requires.',
};

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'list_capabilities',
      {
        title: 'List capabilities',
        description:
          'List the capabilities the open CHP adapter ecosystem declares, optionally filtered by category.',
        inputSchema: { category: z.string().optional() },
      },
      async ({ category }) => {
        const adapters = category
          ? adaptersByCategory(category)
          : capabilityAdapters;
        const data = {
          categories: capabilityCategories,
          capabilities: adapters.flatMap((a) =>
            a.capabilities.map((c) => ({
              id: c.id,
              version: c.version,
              description: c.description,
              adapter: a.adapterId,
              category: a.category,
            })),
          ),
        };
        return wrap('list_capabilities', { category }, data);
      },
    );

    server.registerTool(
      'get_capability',
      {
        title: 'Get a capability descriptor',
        description: 'Resolve a capability id to its descriptor.',
        inputSchema: { id: z.string() },
      },
      async ({ id }) => {
        const adapter = capabilityAdapters.find((a) =>
          a.capabilities.some((c) => c.id === id),
        );
        const cap = adapter?.capabilities.find((c) => c.id === id);
        const data = cap
          ? {
              id: cap.id,
              version: cap.version,
              description: cap.description,
              adapter: adapter!.adapterId,
              category: adapter!.category,
              capability_uri: `chp://capabilityhostprotocol.com/${cap.id}`,
            }
          : { error: 'capability_not_found', id };
        return wrap('get_capability', { id }, data);
      },
    );

    server.registerTool(
      'list_adapters',
      {
        title: 'List adapters',
        description:
          'Browse the open adapter ecosystem, optionally by category.',
        inputSchema: { category: z.string().optional() },
      },
      async ({ category }) => {
        const adapters = (
          category ? adaptersByCategory(category) : capabilityAdapters
        ).map((a) => ({
          adapterId: a.adapterId,
          name: a.name,
          category: a.category,
          status: a.status,
          capabilities: a.capabilities.length,
        }));
        return wrap('list_adapters', { category }, { adapters });
      },
    );

    server.registerTool(
      'get_glossary_term',
      {
        title: 'Define a CHP term',
        description:
          'Define a CHP primitive (capability, boundary, evidence, denial, …).',
        inputSchema: { term: z.string() },
      },
      async ({ term }) => {
        const key = term.toLowerCase().trim();
        const def = GLOSSARY[key];
        return wrap(
          'get_glossary_term',
          { term },
          def
            ? { term, definition: def }
            : { error: 'term_not_found', term, known: Object.keys(GLOSSARY) },
        );
      },
    );

    server.registerTool(
      'search_docs',
      {
        title: 'Search CHP',
        description:
          'Search CHP concepts, the glossary, and the capability catalog.',
        inputSchema: { query: z.string() },
      },
      async ({ query }) => {
        const q = query.toLowerCase();
        const terms = Object.entries(GLOSSARY)
          .filter(([k, v]) => k.includes(q) || v.toLowerCase().includes(q))
          .map(([k, v]) => ({ term: k, definition: v }));
        const caps = capabilityAdapters
          .flatMap((a) => a.capabilities)
          .filter(
            (c) =>
              c.id.toLowerCase().includes(q) ||
              (c.description ?? '').toLowerCase().includes(q),
          )
          .slice(0, 10)
          .map((c) => ({ id: c.id, description: c.description }));
        return wrap(
          'search_docs',
          { query },
          {
            glossary: terms,
            capabilities: caps,
            docs: 'https://docs.capabilityhostprotocol.com',
          },
        );
      },
    );
  },
  {},
  { basePath: '/api', maxDuration: 60 },
);

export { handler as GET, handler as POST };
