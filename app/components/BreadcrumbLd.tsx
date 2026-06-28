const BASE = 'https://capabilityhostprotocol.com';

/**
 * BreadcrumbLd — emits a schema.org BreadcrumbList as JSON-LD for a page's
 * position in the site hierarchy. Pass items in order; the last item is the
 * current page (its `path` is still included as the canonical URL). Intermediate
 * items must point at real pages — only link category levels that exist.
 */
export default function BreadcrumbLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
