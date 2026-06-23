import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import MeshTraceDiagram from '../../components/MeshTraceDiagram';

export const metadata: Metadata = {
  title: 'Govern organizations & processes - Capability Host Protocol',
  description:
    'Stitch one correlated, replayable trace across hosts, machines, and partner organizations. A demonstration of how CHP would work; built with design partners.',
};

const STEPS = [
  {
    n: '01',
    title: 'One correlation, many hosts',
    body: 'A correlation ID flows with every invocation. Whether the work touches a laptop, a server, an edge device, or a partner’s host, the events all carry the same causal thread.',
  },
  {
    n: '02',
    title: 'A gateway stitches the trace',
    body: 'A gateway fans a replay query out to every host in the mesh and merges the evidence into one ordered timeline — across machines you run and, eventually, across organizational boundaries.',
  },
  {
    n: '03',
    title: 'Replay the whole story',
    body: 'Reconstruct what happened end to end: which host did what, in what order, with which outcomes and denials — not a pile of disconnected logs.',
  },
];

export default function GovernOrganizationsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="eyebrow mb-4">
            Govern · Organizations &amp; processes
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            One trace across every host and partner.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Real work crosses machines, teams, and organizations. CHP carries one
            correlation through all of it, so a process spanning many hosts
            produces a single, replayable record instead of fragments nobody can
            reassemble after the fact.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-y border-zinc-800/60">
          <div className="mb-10">
            <MeshTraceDiagram />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6"
              >
                <p className="font-mono text-xs text-zinc-600 mb-3">{s.n}</p>
                <h2 className="text-base font-semibold text-zinc-100 mb-2">
                  {s.title}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed mt-8 max-w-3xl">
            Demonstrated, not yet shipped: correlation and local mesh replay exist
            today across hosts you operate. Multi-host stitching across
            organizational boundaries, with retention and access, is what we build
            with a design partner.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Work that spans hosts or partners?
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                If you cannot currently reconstruct a process that crosses systems,
                that is exactly the trace CHP is built to stitch. Bring the
                workflow and we will design the mesh with you.
              </p>
            </div>
            <a
              href="/design-partners"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              Build it with us
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
