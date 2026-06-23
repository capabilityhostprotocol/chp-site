import {
  capabilityCategories,
  adaptersByCategory,
} from '../../lib/capabilities';

export const revalidate = false;

const BASE = 'https://capabilityhostprotocol.com';

const CATEGORY_LABEL: Record<string, string> = {
  network: 'Network & APIs',
  filesystem: 'Files & storage',
  ai: 'AI & inference',
  code: 'Code & DevOps',
  infra: 'Infrastructure',
  agents: 'Agent operations',
  cloud: 'Cloud',
  messaging: 'Messaging',
  data: 'Data & knowledge',
  platform: 'Platform',
  other: 'Other',
};

/**
 * A2A Agent Card (the recognized capability-advertisement manifest), served at
 * the well-known path agents look for. CHP is the evidence layer of the agentic
 * web: discovery here, invocation via MCP, governed + proven by the protocol.
 * Complements (does not replace) /capabilities.txt.
 */
export function GET() {
  const skills = [
    {
      id: 'discover-capabilities',
      name: 'Discover capabilities',
      description:
        'List the named, versioned, evidence-wrapped capabilities the open CHP adapter ecosystem declares, by category.',
      tags: ['discovery', 'capabilities', 'chp'],
      examples: [
        'What capabilities can CHP host?',
        'List the AI & inference capabilities.',
      ],
    },
    {
      id: 'get-capability-descriptor',
      name: 'Get a capability descriptor',
      description:
        'Resolve a capability id to its CapabilityDescriptor — identity, version, policy, and whether it emits provable evidence.',
      tags: ['capabilities', 'descriptor', 'governance'],
      examples: ['Describe chp.adapters.github.create_issue.'],
    },
    {
      id: 'browse-adapters',
      name: 'Browse adapters',
      description:
        'Browse the open adapter ecosystem that turns provider actions into governed CHP capabilities.',
      tags: ['adapters', 'ecosystem'],
      examples: ['What adapters cover code and DevOps?'],
    },
    {
      id: 'explain-protocol',
      name: 'Explain the protocol',
      description:
        'Answer questions about the CHP spec, schemas, evidence model, and conformance.',
      tags: ['spec', 'docs', 'evidence'],
      examples: ['How does CHP make evidence tamper-evident?'],
    },
  ];

  const card = {
    protocolVersion: '0.3.0',
    name: 'Capability Host Protocol',
    description:
      'CHP is the open evidence layer for the agentic web. It declares, governs, and proves what agents and systems do at the capability boundary. Discover capabilities here; invoke them via the MCP endpoint; every action becomes replayable, tamper-evident evidence.',
    version: '0.8.0',
    url: `${BASE}/api/mcp`,
    preferredTransport: 'JSONRPC',
    provider: {
      organization: 'Capability Host Protocol',
      url: BASE,
    },
    documentationUrl: 'https://docs.capabilityhostprotocol.com',
    iconUrl: `${BASE}/icon.svg`,
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: true,
    },
    defaultInputModes: ['application/json', 'text/plain'],
    defaultOutputModes: ['application/json', 'text/markdown'],
    skills,
    // CHP-specific cross-references — be a good citizen of the recognized
    // standards while keeping the governance/evidence layer that is CHP's own.
    additionalInterfaces: [
      { url: `${BASE}/api/mcp`, transport: 'MCP' },
      { url: `${BASE}/.well-known/capabilities.json`, transport: 'capabilities.txt' },
    ],
    'x-chp': {
      role: 'evidence-layer',
      capabilitiesTxt: `${BASE}/capabilities.txt`,
      capabilitiesManifest: `${BASE}/.well-known/capabilities.json`,
      mcpServerCard: `${BASE}/.well-known/mcp/server-card.json`,
      categories: capabilityCategories.map((c) => ({
        id: c,
        label: CATEGORY_LABEL[c] ?? c,
        adapters: adaptersByCategory(c).length,
      })),
      note: 'Web Bot Auth answers who an agent is; CHP answers what it did, whether it was allowed, and proves it.',
    },
  };

  return new Response(JSON.stringify(card, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
