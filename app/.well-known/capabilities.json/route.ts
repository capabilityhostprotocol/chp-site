import { capabilityAdapters } from '../../lib/capabilities';

export const revalidate = false;

// A capabilities.txt discovery manifest: the static capability surface this
// host declares, for agents to discover. Each entry carries the capability's
// identity; the full CapabilityDescriptor (modes, emits, policy, schemas) is
// resolved from the host. See https://capabilityhostprotocol.com/capabilities-txt
export function GET() {
  const capabilities = capabilityAdapters.flatMap((a) =>
    a.capabilities.map((c) => ({
      id: c.id,
      capability_uri: `chp://capabilityhostprotocol.com/${c.id}`,
      version: c.version || undefined,
      description: c.description || undefined,
      adapter: a.adapterId,
      category: a.category,
    })),
  );

  const body = {
    $schema:
      'https://github.com/capabilityhostprotocol/chp-core/blob/main/schemas/capability-descriptor.schema.json',
    protocol: 'CHP',
    spec: 'https://capabilityhostprotocol.com/capabilities-txt',
    host: 'capabilityhostprotocol.com',
    docs: 'https://docs.capabilityhostprotocol.com',
    generated: new Date().toISOString(),
    note: 'Discovery manifest. Each entry is a capability reference; resolve capability_uri to its full CapabilityDescriptor on the host.',
    capabilities,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
