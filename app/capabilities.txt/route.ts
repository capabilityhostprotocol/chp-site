import { capabilityCategories, adaptersByCategory } from '../lib/capabilities';

export const revalidate = false;

export function GET() {
  let body = `# capabilities.txt

> The capability surface capabilityhostprotocol.com declares — named, versioned, governed, evidence-wrapped units an agent can discover and invoke. A discovery sibling to robots.txt and llms.txt, for the agentic web.
>
> Structured form: https://capabilityhostprotocol.com/.well-known/capabilities.json
> Proposal: https://capabilityhostprotocol.com/capabilities-txt
> Invocation, governance, and evidence are defined by the Capability Host Protocol: https://capabilityhostprotocol.com

`;

  for (const category of capabilityCategories) {
    body += `## ${category}\n\n`;
    for (const a of adaptersByCategory(category)) {
      body += `### ${a.name} (${a.adapterId})\n\n`;
      for (const c of a.capabilities) {
        const v = c.version ? ` (v${c.version})` : '';
        const d = c.description ? ` — ${c.description}` : '';
        body += `- ${c.id}${v}${d}\n`;
      }
      body += '\n';
    }
  }

  return new Response(body, { headers: { 'Content-Type': 'text/markdown' } });
}
