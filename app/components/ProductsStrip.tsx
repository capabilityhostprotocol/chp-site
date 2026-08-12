import Badge from './Badge';

const PRODUCTS = [
  {
    slug: 'a2a-computer',
    name: 'a2a.computer',
    tagline: 'Distributed capability compute.',
    status: 'Preview',
    tone: 'signal' as const,
  },
  {
    slug: 'chp-home',
    name: 'CHP Home',
    tagline: 'Your home as a capability mesh.',
    status: 'Preview',
    tone: 'signal' as const,
  },
  {
    slug: 'chp-legal',
    name: 'CHP Legal',
    tagline: 'Governed legal work.',
    status: 'Design partners',
    tone: 'required' as const,
  },
];

export default function ProductsStrip() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="band-tight">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="eyebrow mb-3">Products</p>
            <h2 className="display-2 text-zinc-100 max-w-2xl">
              Built on the protocol.
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-2xl mt-3">
              Products are materialized capability systems — they provision governed
              capabilities rather than reimplementing them.
            </p>
          </div>
          <a
            href="/products"
            className="text-sm text-zinc-300 hover:text-zinc-50 transition-colors whitespace-nowrap"
          >
            All products →
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <a
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group surface-raised hover-lift p-5 flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-base font-semibold text-zinc-100">{p.name}</h3>
                <Badge tone={p.tone}>{p.status}</Badge>
              </div>
              <p className="text-sm text-zinc-400">{p.tagline}</p>
              <span className="mt-4 text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                Explore →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
