import data from '@/data/capabilities.json';

export type Capability = {
  id: string;
  method: string;
  version: string;
  description: string;
};

export type CapabilityAdapter = {
  slug: string;
  adapterId: string;
  name: string;
  pypi: string;
  category: string;
  status: string;
  tier: number;
  capabilities: Capability[];
};

type CapabilitiesData = { generated: string; adapters: CapabilityAdapter[] };

const catalog = data as CapabilitiesData;

export const capabilityAdapters = catalog.adapters;

export function getCapabilityAdapter(slug: string): CapabilityAdapter | undefined {
  return catalog.adapters.find((a) => a.slug === slug);
}

export const capabilityCategories: string[] = [
  ...new Set(catalog.adapters.map((a) => a.category)),
].sort();

export function adaptersByCategory(category: string): CapabilityAdapter[] {
  return catalog.adapters
    .filter((a) => a.category === category)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function adapterSlug(registryId: string): string {
  return registryId.replace(/^chp-adapter-/, '');
}
