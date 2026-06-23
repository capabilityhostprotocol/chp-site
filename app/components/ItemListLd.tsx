/**
 * ItemListLd — emits schema.org ItemList JSON-LD for a listicle/catalog page.
 * Structured "Top-N" content is the single strongest GEO signal (the majority
 * of AI citations come from it), and it complements Article/FAQPage stacking.
 */
export default function ItemListLd({
  name,
  items,
}: {
  name: string;
  items: { name: string; url: string; description?: string }[];
}) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: it.url,
      ...(it.description ? { description: it.description } : {}),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
