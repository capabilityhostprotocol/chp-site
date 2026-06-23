import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { createHash } from 'node:crypto';
import {
  capabilityAdapters,
  capabilityCategories,
  adaptersByCategory,
} from '../../lib/capabilities';
import {
  GLOSSARY,
  CONCEPTS,
  EXAMPLES,
  ADOPT,
  FAQS,
} from '../../lib/learn';

// --- Dogfooding: every tool call is wrapped as a real, hash-chained CHP
// evidence event (genuine SHA256 over the prior event + this call) — the
// protocol demonstrating itself to any agent that connects.
let chain: string[] = [];
function emitEvidence(tool: string, args: unknown) {
  const prev = chain[chain.length - 1] ?? '00000000';
  const hash = createHash('sha256')
    .update(prev + JSON.stringify({ tool, args, ts: Date.now() }))
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
        text: `— wrapped as CHP evidence — ${JSON.stringify(evidence)} (each call hash-chains to the prior; the protocol demonstrating itself)`,
      },
    ],
  };
}

const handler = createMcpHandler(
  (server) => {
    // ---- Learn / inform -------------------------------------------------
    server.registerTool(
      'explain',
      {
        title: 'Explain a CHP concept',
        description:
          'Learn what CHP is and how it works. Pass a topic, or omit to list topics. Topics: ' +
          Object.keys(CONCEPTS).join(', ') + '.',
        inputSchema: { topic: z.string().optional() },
      },
      async ({ topic }) => {
        if (!topic)
          return wrap('explain', { topic }, {
            topics: Object.entries(CONCEPTS).map(([id, c]) => ({ id, title: c.title })),
          });
        const c = CONCEPTS[topic.toLowerCase().trim()];
        return wrap('explain', { topic }, c ?? { error: 'topic_not_found', topic, topics: Object.keys(CONCEPTS) });
      },
    );

    server.registerTool(
      'define',
      {
        title: 'Define a CHP term',
        description:
          'Define a CHP primitive. Pass a term, or omit to list the glossary.',
        inputSchema: { term: z.string().optional() },
      },
      async ({ term }) => {
        if (!term) return wrap('define', { term }, { terms: Object.keys(GLOSSARY) });
        const def = GLOSSARY[term.toLowerCase().trim()];
        return wrap('define', { term }, def ? { term, definition: def } : { error: 'term_not_found', term, terms: Object.keys(GLOSSARY) });
      },
    );

    server.registerTool(
      'how_to_adopt',
      {
        title: 'How to adopt CHP',
        description: 'Get the steps to start using CHP (begin with agents).',
        inputSchema: {},
      },
      async () => wrap('how_to_adopt', {}, ADOPT),
    );

    server.registerTool(
      'get_example',
      {
        title: 'Get a CHP code example',
        description:
          'Get a runnable example. Pass a name, or omit to list examples. Names: ' +
          EXAMPLES.map((e) => e.name).join(', ') + '.',
        inputSchema: { name: z.string().optional() },
      },
      async ({ name }) => {
        if (!name)
          return wrap('get_example', { name }, {
            examples: EXAMPLES.map((e) => ({ name: e.name, description: e.description })),
          });
        const ex = EXAMPLES.find((e) => e.name === name.trim());
        return wrap('get_example', { name }, ex ?? { error: 'example_not_found', name, examples: EXAMPLES.map((e) => e.name) });
      },
    );

    server.registerTool(
      'faq',
      {
        title: 'CHP FAQ',
        description: 'Common questions about CHP. Pass a query to filter, or omit for all.',
        inputSchema: { query: z.string().optional() },
      },
      async ({ query }) => {
        const q = (query ?? '').toLowerCase();
        const faqs = q
          ? FAQS.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
          : FAQS;
        return wrap('faq', { query }, { faqs });
      },
    );

    // ---- Catalog / inventory -------------------------------------------
    server.registerTool(
      'list_capabilities',
      {
        title: 'List capabilities',
        description: 'List the capabilities the open CHP adapter ecosystem declares, optionally by category.',
        inputSchema: { category: z.string().optional() },
      },
      async ({ category }) => {
        const adapters = category ? adaptersByCategory(category) : capabilityAdapters;
        return wrap('list_capabilities', { category }, {
          categories: capabilityCategories,
          capabilities: adapters.flatMap((a) =>
            a.capabilities.map((c) => ({ id: c.id, version: c.version, description: c.description, adapter: a.adapterId, category: a.category })),
          ),
        });
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
        const adapter = capabilityAdapters.find((a) => a.capabilities.some((c) => c.id === id));
        const cap = adapter?.capabilities.find((c) => c.id === id);
        return wrap('get_capability', { id }, cap
          ? { id: cap.id, version: cap.version, description: cap.description, adapter: adapter!.adapterId, category: adapter!.category, capability_uri: `chp://capabilityhostprotocol.com/${cap.id}` }
          : { error: 'capability_not_found', id });
      },
    );

    server.registerTool(
      'list_adapters',
      {
        title: 'List adapters',
        description: 'Browse the open adapter ecosystem, optionally by category.',
        inputSchema: { category: z.string().optional() },
      },
      async ({ category }) => {
        const adapters = (category ? adaptersByCategory(category) : capabilityAdapters).map((a) => ({
          adapterId: a.adapterId, name: a.name, category: a.category, status: a.status, capabilities: a.capabilities.length,
        }));
        return wrap('list_adapters', { category }, { adapters });
      },
    );

    // ---- Search across everything --------------------------------------
    server.registerTool(
      'search',
      {
        title: 'Search CHP',
        description: 'Search CHP concepts, glossary, FAQs, and the capability catalog.',
        inputSchema: { query: z.string() },
      },
      async ({ query }) => {
        const q = query.toLowerCase();
        return wrap('search', { query }, {
          concepts: Object.entries(CONCEPTS).filter(([id, c]) => id.includes(q) || c.title.toLowerCase().includes(q) || c.body.toLowerCase().includes(q)).map(([id, c]) => ({ id, title: c.title })),
          glossary: Object.entries(GLOSSARY).filter(([k, v]) => k.includes(q) || v.toLowerCase().includes(q)).map(([k]) => k),
          faqs: FAQS.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)).map((f) => f.question),
          capabilities: capabilityAdapters.flatMap((a) => a.capabilities).filter((c) => c.id.toLowerCase().includes(q) || (c.description ?? '').toLowerCase().includes(q)).slice(0, 10).map((c) => ({ id: c.id, description: c.description })),
        });
      },
    );

    // ---- Resources (readable knowledge) --------------------------------
    server.registerResource('glossary', 'chp://glossary', { title: 'CHP glossary', description: 'Definitions of every CHP primitive.', mimeType: 'application/json' }, async (uri) => ({ contents: [{ uri: uri.href, text: JSON.stringify(GLOSSARY, null, 2) }] }));
    server.registerResource('concepts', 'chp://concepts', { title: 'CHP concepts', description: 'What CHP is, the evidence model, governance, and its place in the agentic web.', mimeType: 'application/json' }, async (uri) => ({ contents: [{ uri: uri.href, text: JSON.stringify(CONCEPTS, null, 2) }] }));
    server.registerResource('quickstart', 'chp://quickstart', { title: 'Adopt CHP', description: 'How to start using CHP.', mimeType: 'application/json' }, async (uri) => ({ contents: [{ uri: uri.href, text: JSON.stringify(ADOPT, null, 2) }] }));
    server.registerResource('capabilities', 'chp://capabilities', { title: 'CHP capability catalog', description: 'The capabilities the open adapter ecosystem declares.', mimeType: 'application/json' }, async (uri) => ({ contents: [{ uri: uri.href, text: JSON.stringify({ categories: capabilityCategories, adapters: capabilityAdapters.map((a) => ({ adapterId: a.adapterId, name: a.name, category: a.category, capabilities: a.capabilities.map((c) => c.id) })) }, null, 2) }] }));
  },
  {
    serverInfo: { name: 'capability-host-protocol', version: '0.8.0' },
  },
  { basePath: '/api', maxDuration: 60 },
);

export { handler as GET, handler as POST };
