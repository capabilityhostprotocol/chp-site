import type { MetadataRoute } from 'next';
import { officialAdapters } from './lib/adapters';
import { adapterSlug } from './lib/capabilities';
import { getAllPosts } from './lib/blog';

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
  '/products',
  '/products/a2a-computer',
  '/products/chp-home',
  '/products/chp-legal',
  '/agentic-web',
  '/ai-agent-audit-trail',
  '/prove-what-an-ai-agent-did',
  '/developers',
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

// Real content-update date for stable pages — bump when pages get a substantive edit,
// rather than stamping every route "modified today" on each deploy (false-freshness).
const SITE_UPDATED = new Date('2026-08-11');

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
  const adapterPages: MetadataRoute.Sitemap = officialAdapters.map((a) => ({
    url: `${BASE}/adapters/${adapterSlug(a.id)}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  return [...pages, ...adapterPages, ...blogPages];
}
