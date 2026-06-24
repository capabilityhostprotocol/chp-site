export const revalidate = false;

const BASE = 'https://capabilityhostprotocol.com';

/**
 * RFC 9727 API Catalog — a linkset advertising CHP's API descriptions so agents
 * can enumerate the surface from one well-known document.
 */
export function GET() {
  const linkset = {
    linkset: [
      {
        anchor: `${BASE}/ask`,
        'service-desc': [{ href: `${BASE}/openapi.json`, type: 'application/json' }],
        'service-doc': [{ href: `${BASE}/developers`, type: 'text/html' }],
      },
      {
        anchor: `${BASE}/api/mcp`,
        'service-desc': [{ href: `${BASE}/.well-known/mcp.json`, type: 'application/json' }],
        describedby: [{ href: `${BASE}/.well-known/mcp/server-card.json`, type: 'application/json' }],
      },
      {
        anchor: BASE,
        describedby: [
          { href: `${BASE}/.well-known/agent-card.json`, type: 'application/json' },
          { href: `${BASE}/.well-known/capabilities.json`, type: 'application/json' },
        ],
        author: [{ href: `${BASE}/developers` }],
      },
    ],
  };

  return new Response(JSON.stringify(linkset, null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
