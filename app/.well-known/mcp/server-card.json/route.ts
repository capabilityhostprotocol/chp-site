export const revalidate = false;

const BASE = 'https://capabilityhostprotocol.com';

/**
 * MCP Server Card — advertises the CHP remote MCP server so agents can connect
 * and invoke. The server is dogfooded: every tool call is wrapped as a CHP
 * evidence event.
 */
export function GET() {
  const card = {
    name: 'capability-host-protocol',
    title: 'Capability Host Protocol',
    description:
      'A CHP learning + information server. Learn what CHP is, how the evidence model works, and how to adopt it; browse the capability catalog and adapters. Dogfooded — every tool call is wrapped as a hash-chained CHP evidence event you can replay.',
    version: '0.8.0',
    endpoint: `${BASE}/api/mcp`,
    transport: 'streamable-http',
    documentationUrl: 'https://docs.capabilityhostprotocol.com',
    provider: { name: 'Capability Host Protocol', url: BASE },
    tools: [
      { name: 'explain', description: 'Learn a CHP concept (what-is-chp, evidence-model, governance, agentic-web, …).' },
      { name: 'define', description: 'Define a CHP primitive (capability, boundary, evidence, denial, …).' },
      { name: 'how_to_adopt', description: 'Steps to start using CHP.' },
      { name: 'get_example', description: 'Runnable CHP code examples.' },
      { name: 'faq', description: 'Common questions about CHP.' },
      { name: 'list_capabilities', description: 'List declared capabilities, optionally by category.' },
      { name: 'get_capability', description: 'Resolve a capability id to its descriptor.' },
      { name: 'list_adapters', description: 'Browse the open adapter ecosystem.' },
      { name: 'search', description: 'Search CHP concepts, glossary, FAQs, and capabilities.' },
    ],
    resources: [
      { uri: 'chp://glossary', description: 'Definitions of every CHP primitive.' },
      { uri: 'chp://concepts', description: 'What CHP is, the evidence model, governance, agentic-web role.' },
      { uri: 'chp://quickstart', description: 'How to adopt CHP.' },
      { uri: 'chp://capabilities', description: 'The capability catalog.' },
    ],
    'x-chp': {
      role: 'evidence-layer',
      agentCard: `${BASE}/.well-known/agent-card.json`,
      capabilitiesTxt: `${BASE}/capabilities.txt`,
      note: 'Every tool call emits replayable, tamper-evident CHP evidence — the protocol demonstrating itself.',
    },
  };

  return new Response(JSON.stringify(card, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
