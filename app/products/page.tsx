import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import Badge from '../components/Badge';

export const metadata: Metadata = {
  title: 'Products - Capability Host Protocol',
  description:
    'Products built on CHP — CHP Home, CHP Legal, and a2a.computer. Each is a materialized capability system: it provisions governed capabilities rather than reimplementing them, so what an agent can do, who may do it, and what it did are all part of the same contract.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/products' },
};

type Product = {
  slug: string;
  name: string;
  tagline: string;
  body: string;
  status: string;
  tone: 'signal' | 'required' | 'approved' | 'neutral';
};

const PRODUCTS: Product[] = [
  {
    slug: 'a2a-computer',
    name: 'a2a.computer',
    tagline: 'Distributed capability compute.',
    body: 'Describe the state you want. a2a.computer finds a governed capability path across machines, models, and storage — and returns a verified result with the evidence to back it. The interaction contract for distributed execution, not another cloud vendor.',
    status: 'Preview',
    tone: 'signal',
  },
  {
    slug: 'chp-home',
    name: 'CHP Home',
    tagline: 'Your home as a capability mesh.',
    body: 'A local-first mesh across the devices, models, and storage you already own. Each becomes a governed capability an agent can discover and invoke — with approvals and evidence, on hardware you control. Not a cloud assistant; your own capability environment.',
    status: 'Preview',
    tone: 'signal',
  },
  {
    slug: 'chp-legal',
    name: 'CHP Legal',
    tagline: 'Governed legal work.',
    body: 'A governed operating plane for the daily practice of law: AI-assisted drafting, docketing, and filing with chain of custody, privilege-aware operations, and defensible time capture — where observed, billable, and invoiced time are never silently conflated.',
    status: 'Design partners',
    tone: 'required',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
          <p className="eyebrow mb-4">Products</p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Products are materialized capability systems.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            The protocol gives software a governed boundary for what it can do. Products are
            what that makes possible. Each one below <em>provisions</em> governed capabilities
            rather than reimplementing them — so what an agent can do, who is allowed to do it,
            and what it actually did are part of one contract, not bolted on after. They arise
            from the protocol without becoming part of it.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid gap-4 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <a
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group surface-raised hover-lift p-6 flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="text-lg font-semibold text-zinc-100">{p.name}</h2>
                  <Badge tone={p.tone}>{p.status}</Badge>
                </div>
                <p className="text-sm font-medium text-zinc-300 mb-2">{p.tagline}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{p.body}</p>
                <span className="mt-5 inline-block text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                  Explore {p.name} →
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
