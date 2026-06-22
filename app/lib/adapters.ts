import adaptersData from '@/data/adapters.json';

export type AdapterStatus = 'certified' | 'experimental';

export type Adapter = {
  id: string;
  pypi: string;
  category: string;
  description: string;
  status: AdapterStatus;
  tier: number;
};

type AdapterCatalog = {
  version: string;
  generated: string;
  categories: string[];
  official: Adapter[];
  community: Adapter[];
};

const catalog = adaptersData as AdapterCatalog;

export const categories: string[] = catalog.categories;

// Tier 1 (core) first, then by category, then by name — stable display order.
export const officialAdapters: Adapter[] = [...catalog.official].sort(
  (a, b) => a.tier - b.tier || a.category.localeCompare(b.category) || a.id.localeCompare(b.id),
);

export const adapterCount = officialAdapters.length;

/** "chp-adapter-http" -> "http" for display. */
export function displayName(id: string): string {
  return id.replace(/^chp-adapter-/, '');
}
