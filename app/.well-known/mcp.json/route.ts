export const revalidate = false;

const BASE = 'https://capabilityhostprotocol.com';

/**
 * MCP discovery manifest at the practical well-known path (/.well-known/mcp.json),
 * alongside the SEP-1649 server-card. Lets agents learn the endpoint, transport,
 * auth, and tools with one GET before opening a session.
 */
export function GET() {
  const manifest = {
    name: 'capability-host-protocol',
    description:
      'A CHP learning + information server. Learn what CHP is and how to adopt it; browse the capability catalog. Every tool call is wrapped as hash-chained CHP evidence.',
    version: '0.8.0',
    registry: {
      name: 'io.github.capabilityhostprotocol/chp',
      url: 'https://registry.modelcontextprotocol.io/v0/servers?search=io.github.capabilityhostprotocol/chp',
    },
    servers: [
      {
        url: `${BASE}/api/mcp`,
        transport: 'streamable-http',
      },
    ],
    authentication: { type: 'none' },
    documentation: 'https://docs.capabilityhostprotocol.com',
    serverCard: `${BASE}/.well-known/mcp/server-card.json`,
    openapi: `${BASE}/openapi.json`,
    tools: [
      'explain',
      'define',
      'how_to_adopt',
      'get_example',
      'faq',
      'list_capabilities',
      'get_capability',
      'list_adapters',
      'search',
    ],
    resources: [
      'chp://glossary',
      'chp://concepts',
      'chp://quickstart',
      'chp://capabilities',
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
