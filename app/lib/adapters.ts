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

// Display priority — lead with the categories the hero names first
// (HTTP, files, models). Anything not listed falls to the end, then by name.
const CATEGORY_ORDER = [
  'network',
  'filesystem',
  'ai',
  'code',
  'infra',
  'agents',
  'cloud',
  'messaging',
  'data',
  'platform',
];

function categoryRank(category: string): number {
  const i = CATEGORY_ORDER.indexOf(category);
  return i === -1 ? CATEGORY_ORDER.length : i;
}

// Filter tabs follow the same priority, restricted to categories in use.
export const categories: string[] = [...catalog.categories].sort(
  (a, b) => categoryRank(a) - categoryRank(b),
);

// Ordered by category priority then name. Tier grouping is applied in the UI,
// so within each tier section adapters still read network → filesystem → ai → …
export const officialAdapters: Adapter[] = [...catalog.official].sort(
  (a, b) => categoryRank(a.category) - categoryRank(b.category) || a.id.localeCompare(b.id),
);

export const adapterCount = officialAdapters.length;

/** Tier 1 = core (shipped + maintained); tier 2+ = extended. */
export const TIERS: { tier: number; label: string; blurb: string }[] = [
  { tier: 1, label: 'Core', blurb: 'Shipped and maintained' },
  { tier: 2, label: 'Extended', blurb: 'Available, broader surface' },
];

/** "chp-adapter-http" -> "http" for display. */
export function displayName(id: string): string {
  return id.replace(/^chp-adapter-/, '');
}
