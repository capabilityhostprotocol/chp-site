import type { MetadataRoute } from 'next';

const BASE = 'https://capabilityhostprotocol.com';

const ROUTES = [
  '',
  '/how-it-works',
  '/use-cases',
  '/why-a-protocol',
  '/design-partners',
  '/protocol',
  '/examples',
  '/implementers',
  '/conformance',
  '/adapters',
  '/quickstart',
  '/map',
  '/govern/agents',
  '/govern/human-decisions',
  '/govern/products',
  '/govern/organizations',
  '/industries/software',
  '/industries/insurance',
  '/industries/legal',
  '/industries/healthcare',
  '/industries/manufacturing',
  '/industries/financial',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
