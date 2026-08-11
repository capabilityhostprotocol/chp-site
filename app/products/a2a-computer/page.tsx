import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import SectionShell from '../../components/SectionShell';
import SectionHeader from '../../components/SectionHeader';
import SurfacePanel from '../../components/SurfacePanel';
import ButtonLink from '../../components/ButtonLink';
import Badge from '../../components/Badge';

export const metadata: Metadata = {
  title: 'a2a.computer — distributed capability compute on CHP',
  description:
    'a2a.computer is the front-door to a governed capability mesh: describe the state you want, and it finds a capability path across machines, models, and storage — returning a verified result with evidence. Built on the Capability Host Protocol.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/products/a2a-computer' },
};

export default function A2AProductPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24">
          <div className="flex items-center gap-3 mb-4">
            <p className="eyebrow">Product · a2a.computer</p>
            <Badge tone="signal">Preview</Badge>
          </div>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Describe the state you want. Get there, with evidence.
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mb-4">
            a2a.computer is the front-door to a governed capability mesh. You describe a
            desired outcome; it finds a path through the capabilities that can realize it —
            across machines, models, and storage — runs it through a governed boundary, and
            returns a verified result you can replay.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
            It holds no capability logic of its own. Every action goes through a Capability
            Host Protocol gateway, where it is checked against policy and recorded as
            evidence. a2a.computer is the interaction contract for distributed execution —
            not another cloud-compute vendor.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <ButtonLink href="/waitlist?product=a2a-computer">Join the waitlist</ButtonLink>
            <ButtonLink href="/capabilities" variant="secondary">
              Browse capabilities
            </ButtonLink>
          </div>
        </section>

        <SectionShell>
          <SectionHeader
            eyebrow="What it does"
            title="From a desired state to a governed result."
          />
          <div className="grid gap-4 md:grid-cols-3 mt-8">
            <SurfacePanel>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">Plan a path</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Given where you are and where you want to be, it finds capabilities that can
                bridge the gap — typed by what they consume and produce.
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">Realize it</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Invocations run through a governed gateway across the machines and models
                best suited to them — allowed or denied against policy before anything runs.
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">Prove it</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Every step returns replayable, tamper-evident evidence — so a distributed
                result is as accountable as a local one.
              </p>
            </SurfacePanel>
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="Honest about where it is"
            title="A preview, expanding capability by capability."
            body="a2a.computer is live as a walking skeleton: some capabilities are callable today, others are single-hop or planned as the mesh grows. We label what is real versus planned rather than imply a finished platform. Broad public availability follows a publicly-reachable gateway."
          />
        </SectionShell>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Want distributed capability, governed?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Join the waitlist and we&apos;ll reach out as access opens.
              </p>
            </div>
            <ButtonLink href="/waitlist?product=a2a-computer">Join the waitlist</ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
