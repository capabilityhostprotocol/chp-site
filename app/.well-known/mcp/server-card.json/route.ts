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
      'Query the CHP capability catalog, adapters, spec, and glossary. Dogfooded — every tool call is wrapped as a CHP evidence event you can replay.',
    version: '0.8.0',
    endpoint: `${BASE}/api/mcp`,
    transport: 'streamable-http',
    documentationUrl: 'https://docs.capabilityhostprotocol.com',
    provider: { name: 'Capability Host Protocol', url: BASE },
    tools: [
      { name: 'list_capabilities', description: 'List declared capabilities, optionally by category.' },
      { name: 'get_capability', description: 'Resolve a capability id to its descriptor.' },
      { name: 'list_adapters', description: 'Browse the open adapter ecosystem.' },
      { name: 'search_docs', description: 'Search CHP concepts, spec, and glossary.' },
      { name: 'get_glossary_term', description: 'Define a CHP primitive (capability, boundary, evidence, …).' },
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
