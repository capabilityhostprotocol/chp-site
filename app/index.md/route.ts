export const revalidate = false;

const BODY = `# Capability Host Protocol (CHP)

> The open protocol and evidence layer for what AI agents, products, and
> organizations do. CHP turns every consequential action into a declared,
> governable, tamper-evidently provable event at the capability boundary.

**See exactly what your AI agents did.** Your agent reads files, runs commands,
calls tools. Then a security review asks what it actually did — and the launch
stalls. CHP captures every tool call as replayable, tamper-evident evidence.
One command, no application code changes: \`chp hooks install\`.

## What CHP is
- **Capability boundary** — the line an action crosses from intent into effect; the one place to govern and prove what happens.
- **Evidence** — every attempt emits a structured, SHA256 hash-chained, replayable event. Tamper-evident by design.
- **Denial** — a refused action is a first-class outcome with a reason, not a swallowed exception.
- **A protocol, not a feature** — neutral, conformance-backed, portable across independent hosts.

## CHP and the agentic web
CHP is the **evidence layer**. Discovery (llms.txt, capabilities.txt) → invocation (MCP) → identity (Web Bot Auth) → **evidence (CHP)**. Web Bot Auth answers *who* an agent is; CHP answers *what it did, whether it was allowed, and proves it*. See https://capabilityhostprotocol.com/agentic-web

## For agents
- MCP server: https://capabilityhostprotocol.com/api/mcp (learn CHP, browse capabilities; every call emits evidence)
- Ask: https://capabilityhostprotocol.com/ask?q=how+does+CHP+work
- OpenAPI: https://capabilityhostprotocol.com/openapi.json
- Developer resources: https://capabilityhostprotocol.com/developers

## Learn more
- How it works: https://capabilityhostprotocol.com/how-it-works
- Use cases: https://capabilityhostprotocol.com/use-cases
- Docs: https://docs.capabilityhostprotocol.com
- Become a design partner: https://capabilityhostprotocol.com/design-partners
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
