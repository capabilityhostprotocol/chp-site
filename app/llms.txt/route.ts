export const revalidate = false;

const BODY = `# Capability Host Protocol (CHP)

> An open protocol and evidence layer for what AI agents, products, and organizations do. CHP turns every consequential action — by a person, an agent, a product, or a business — into a declared, governable, tamper-evidently provable event. Start where the proof is real: capture exactly what your AI agents did, in one command.

## Start here
- [How it works](https://capabilityhostprotocol.com/how-it-works): the mechanics — capability, host, invocation, evidence.
- [Why a protocol](https://capabilityhostprotocol.com/why-a-protocol): why an open, conformance-backed boundary, not a feature.
- [CHP and the agentic web](https://capabilityhostprotocol.com/agentic-web): CHP is the governed execution layer — discovery (llms.txt/capabilities.txt) → invocation (MCP) → identity (Web Bot Auth) → governed execution + evidence (CHP).
- [Use cases](https://capabilityhostprotocol.com/use-cases): the concrete jobs CHP does.
- [Glossary](https://capabilityhostprotocol.com/glossary): the core terms — capability, boundary, host, invocation, evidence, hash chain, correlation, denial, replay, conformance — defined.

## Govern (what you can govern)
- [Agents](https://capabilityhostprotocol.com/govern/agents): capture every agent tool call as replayable, tamper-evident evidence (real today).
- [Human decisions](https://capabilityhostprotocol.com/govern/human-decisions): approvals and denials as first-class, provable events.
- [Products & services](https://capabilityhostprotocol.com/govern/products): expose product capabilities as a governed boundary.
- [Organizations](https://capabilityhostprotocol.com/govern/organizations): one correlated, replayable trace across hosts and partners.

## Industries
- [AI-native software](https://capabilityhostprotocol.com/industries/software)
- [Insurance](https://capabilityhostprotocol.com/industries/insurance)
- [Legal](https://capabilityhostprotocol.com/industries/legal)
- [Healthcare](https://capabilityhostprotocol.com/industries/healthcare)
- [Manufacturing](https://capabilityhostprotocol.com/industries/manufacturing)
- [Financial services](https://capabilityhostprotocol.com/industries/financial)

## Developer resources & API
- [Developer resources](https://capabilityhostprotocol.com/developers): every CHP API and agent resource at predictable URLs.
- [OpenAPI specification](https://capabilityhostprotocol.com/openapi.json): OpenAPI 3.1 description of the public HTTP API (/ask, the manifests, the MCP endpoint).
- [Authentication](https://capabilityhostprotocol.com/auth.md): the public endpoints need no auth; self-hosted CHP owns auth at the boundary.
- [API catalog](https://capabilityhostprotocol.com/.well-known/api-catalog): RFC 9727 linkset of the API resources.
- [AGENTS.md](https://capabilityhostprotocol.com/AGENTS.md): coding-agent guidance for this repo.
- [Python SDK reference](https://docs.capabilityhostprotocol.com/docs/reference/python-sdk) · [CLI reference](https://docs.capabilityhostprotocol.com/docs/reference/cli)

## For agents (discover + invoke)
- [MCP server](https://capabilityhostprotocol.com/api/mcp): connect over the Model Context Protocol to query capabilities, adapters, the spec, and the glossary — every call emits replayable CHP evidence.
- [MCP discovery manifest](https://capabilityhostprotocol.com/.well-known/mcp.json): MCP endpoint, transport, auth, and tools.
- [Official MCP registry listing](https://registry.modelcontextprotocol.io/v0/servers?search=io.github.capabilityhostprotocol/chp): published as \`io.github.capabilityhostprotocol/chp\` on registry.modelcontextprotocol.io.
- [/ask](https://capabilityhostprotocol.com/ask): a structured natural-language query endpoint — GET /ask?q=... returns the best-matching concept, definition, FAQ, and capabilities. No MCP client needed.
- [A2A agent card](https://capabilityhostprotocol.com/.well-known/agent-card.json): the recognized capability-advertisement manifest.
- [MCP server card](https://capabilityhostprotocol.com/.well-known/mcp/server-card.json): the MCP server descriptor.

## Capabilities (agent-discoverable)
- [capabilities.txt](https://capabilityhostprotocol.com/capabilities.txt): the capability surface this host declares, as markdown.
- [/.well-known/capabilities.json](https://capabilityhostprotocol.com/.well-known/capabilities.json): the structured discovery manifest.
- [capabilities.txt proposal](https://capabilityhostprotocol.com/capabilities-txt): a discovery standard for the agentic web (vs robots.txt, llms.txt, MCP).
- [Capability catalog](https://capabilityhostprotocol.com/capabilities): browsable by category.

## Build with us
- [Become a design partner](https://capabilityhostprotocol.com/design-partners)

## Documentation
- [Docs](https://docs.capabilityhostprotocol.com)
- [Docs as markdown (llms.txt)](https://docs.capabilityhostprotocol.com/llms.txt)
- [Full docs as markdown](https://docs.capabilityhostprotocol.com/llms-full.txt)
- [Protocol spec](https://docs.capabilityhostprotocol.com/docs/reference/spec)
- [Python SDK](https://docs.capabilityhostprotocol.com/docs/reference/python-sdk)
- [CLI reference](https://docs.capabilityhostprotocol.com/docs/reference/cli)
`;

export function GET() {
  return new Response(BODY, { headers: { 'Content-Type': 'text/markdown' } });
}
