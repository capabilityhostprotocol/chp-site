export const revalidate = false;

const BODY = `# Authentication — Capability Host Protocol

CHP's public agent surface is **read-only and requires no authentication**. Any
agent or client may call these endpoints directly, with no key, token, or OAuth
flow.

## Public endpoints (no auth)
- \`GET https://capabilityhostprotocol.com/openapi.json\` — the OpenAPI 3.1 spec.
- \`GET|POST https://capabilityhostprotocol.com/ask\` — natural-language query.
- \`POST https://capabilityhostprotocol.com/api/mcp\` — the MCP server (Streamable HTTP). No auth required.
- \`GET https://capabilityhostprotocol.com/.well-known/agent-card.json\` — A2A agent card.
- \`GET https://capabilityhostprotocol.com/.well-known/mcp.json\` — MCP discovery manifest.
- \`GET https://capabilityhostprotocol.com/.well-known/capabilities.json\` — capability discovery manifest.

These are informational/discovery endpoints. They do not mutate state, so no
credentials or scopes are needed.

## Errors
Errors are returned as JSON: \`{ "error": { "code": string, "message": string, "hint"?: string } }\`.

## Self-hosted CHP (your own host)
When you run CHP yourself (the Python reference host, an MCP-wrapped host, or a
managed host), **you** own authentication and authorization at the capability
boundary — CHP records the deciding subject and emits evidence, but the auth
mechanism is yours (OAuth, mTLS, entitlements, human approval). See the docs:
https://docs.capabilityhostprotocol.com

## Production / design-partner access
Hosted retention, role-based access, and compliance export are arranged directly
with the team: https://capabilityhostprotocol.com/design-partners
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
