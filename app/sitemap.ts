import type { MetadataRoute } from 'next';
import { officialAdapters } from './lib/adapters';
import { adapterSlug } from './lib/capabilities';
import { getPostSlugs } from './lib/blog';

const BASE = 'https://capabilityhostprotocol.com';

const ROUTES = [
  '',
  '/how-it-works',
  '/use-cases',
  '/blog',
  '/why-a-protocol',
  '/design-partners',
  '/protocol',
  '/examples',
  '/implementers',
  '/conformance',
  '/adapters',
  '/capabilities',
  '/capabilities-txt',
  '/agentic-web',
  '/glossary',
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
  const pages: MetadataRoute.Sitemap = ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
  const adapterPages: MetadataRoute.Sitemap = officialAdapters.map((a) => ({
    url: `${BASE}/adapters/${adapterSlug(a.id)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));
  const blogPages: MetadataRoute.Sitemap = getPostSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  return [...pages, ...adapterPages, ...blogPages];
}
