const baseUrl = process.env.CHP_SITE_BASE_URL || 'http://127.0.0.1:3000';

const routes = [
  '/',
  '/map',
  '/protocol',
  '/docs',
  '/docs/introduction/what-is-chp',
  '/docs/introduction/mental-model',
  '/docs/concepts/capability',
  '/docs/concepts/host',
  '/docs/concepts/adapter',
  '/docs/concepts/registry',
  '/docs/concepts/invocation',
  '/docs/concepts/policy',
  '/docs/concepts/context',
  '/docs/concepts/evidence',
  '/docs/concepts/conformance',
  '/docs/concepts/composition',
  '/docs/guides/map-your-first-capability',
  '/docs/guides/define-a-capability-contract',
  '/docs/guides/govern-invocation',
  '/docs/examples/field-service',
  '/docs/examples/agent-operations',
  '/docs/reference/notation',
  '/docs/reference/lifecycle',
  '/docs/reference/policy-states',
  '/docs/reference/glossary',
  '/docs/comparisons/chp-vs-apis',
  '/docs/comparisons/chp-vs-mcp-tools',
  '/docs/comparisons/chp-vs-service-mesh',
  '/docs/comparisons/chp-vs-workflow-automation',
  '/examples',
  '/implementers',
  '/conformance',
  '/quickstart',
  '/icon.svg',
];

const requiredText = {
  '/': ['Host what the world can do.', 'Map your first capability'],
  '/map': [
    'Map a real-world ability',
    'Protocol readiness',
    'CHP notation',
    'manifest.json',
    'outcome.json',
  ],
  '/docs': ['Documentation IA', 'Every major concept includes a concrete capability'],
  '/docs/concepts/capability': ['Capability', 'schedule_technician', 'Formal definition'],
  '/docs/concepts/host': ['Host', 'ServiceOpsHost', 'Common mistakes'],
  '/docs/concepts/invocation': ['Invocation', 'invoke.json', 'structured request'],
  '/docs/concepts/policy': ['Policy', 'approval_required', 'Policy boundary'],
  '/docs/concepts/evidence': ['Evidence', 'evidence-event.json', 'execution_denied'],
  '/docs/concepts/conformance': ['Conformance', 'approval_required_denial'],
  '/docs/comparisons/chp-vs-mcp-tools': ['CHP vs MCP tools', 'MCP can be a caller-facing integration surface'],
  '/docs/reference/glossary': ['Glossary', 'Canonical terms', 'Capability'],
};

const failures = [];

for (const route of routes) {
  const url = new URL(route, baseUrl);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      failures.push(`${route} returned ${response.status}`);
      continue;
    }

    const expected = requiredText[route];
    if (expected) {
      const body = await response.text();
      for (const text of expected) {
        if (!body.includes(text)) {
          failures.push(`${route} did not include "${text}"`);
        }
      }
    }
  } catch (error) {
    failures.push(`${route} failed: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Verified ${routes.length} routes from ${baseUrl}`);
