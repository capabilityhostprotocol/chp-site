import { getAllPosts } from '../lib/blog';

export const revalidate = false;

const BASE = 'https://capabilityhostprotocol.com';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${BASE}/blog/${p.slug}</link>
      <guid>${BASE}/blog/${p.slug}</guid>
      <pubDate>${p.date ? new Date(p.date).toUTCString() : ''}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Capability Host Protocol — Blog</title>
    <link>${BASE}/blog</link>
    <description>On governing and proving what AI agents and systems do.</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
