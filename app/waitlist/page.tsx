import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import WaitlistForm from '../components/WaitlistForm';

export const metadata: Metadata = {
  title: 'Join the waitlist - Capability Host Protocol',
  description:
    'Join the waitlist for CHP products — a2a.computer, CHP Home, and CHP Legal.',
  robots: { index: false }, // conversion page, not for search
};

const PRODUCTS: Record<
  string,
  { label: string; blurb: string; designPartner: boolean }
> = {
  'a2a-computer': {
    label: 'a2a.computer',
    blurb: 'Distributed capability compute, governed and evidenced.',
    designPartner: false,
  },
  'chp-home': {
    label: 'CHP Home',
    blurb: 'Turn the devices, models, and storage you own into a governed capability mesh.',
    designPartner: false,
  },
  'chp-legal': {
    label: 'CHP Legal',
    blurb: 'Governed AI-assisted legal work — defensible by construction.',
    designPartner: true,
  },
  chp: {
    label: 'CHP',
    blurb: 'Be first to hear as new CHP products open up.',
    designPartner: false,
  },
};

export default async function WaitlistPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; waitlist?: string }>;
}) {
  const { product, waitlist } = await searchParams;
  const key = product && product in PRODUCTS ? product : 'chp';
  const p = PRODUCTS[key];
  // A product may offer both paths; `?waitlist=1` forces the plain waitlist over design-partner.
  const designPartner = waitlist ? false : p.designPartner;

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-2xl mx-auto px-6 pt-16 pb-20 md:pt-24">
          <p className="eyebrow mb-4">
            {designPartner ? 'Design partners' : 'Waitlist'}
            {key !== 'chp' ? ` · ${p.label}` : ''}
          </p>
          <h1 className="display-2 text-zinc-50 mb-4">
            {designPartner ? `Build ${p.label} with us.` : `Get early access to ${p.label}.`}
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed mb-8">{p.blurb}</p>
          <WaitlistForm product={key} designPartner={designPartner} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
