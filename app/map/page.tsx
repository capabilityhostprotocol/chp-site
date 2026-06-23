import type { Metadata } from 'next';
import ButtonLink from '../components/ButtonLink';
import CapabilityMapper from '../components/CapabilityMapper';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Map Your First Capability - Capability Host Protocol',
  description:
    'Turn a real-world ability into CHP notation, manifest shape, policy boundary, and invocation frame.',
};

const READINESS = [
  'The actor is named before the capability is invoked.',
  'The host owns lifecycle, version, availability, and evidence.',
  'The permission and policy state are explicit before execution.',
  'The result is concrete enough for another host, agent, or application to compose.',
];

export default function CapabilityMapPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <p className="mb-4 font-mono text-xs uppercase text-zinc-400">
            Capability mapping
          </p>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_0.75fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-zinc-50 md:text-6xl">
                Map a real-world ability into a hosted capability.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
                CHP starts with the thing someone or something can do. This map
                turns that ability into a host boundary, policy boundary,
                invocation trace, manifest shape, and result.
              </p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-context-surface)] p-5">
              <p className="font-mono text-[11px] uppercase text-zinc-400">
                A good map proves
              </p>
              <ul className="mt-4 space-y-3">
                {READINESS.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1.25rem_1fr] gap-3 text-sm leading-relaxed text-zinc-400"
                  >
                    <span className="font-mono text-[color:var(--color-capability-active)]">
                      +
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-[color:var(--color-border-subtle)]">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <CapabilityMapper />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase text-zinc-400">
                Next step
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-100">
                Turn the map into a reference host.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                Once the boundary is named, implement the capability, verify the
                host, and test the denial and unavailable paths before treating
                it as a public protocol surface.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/quickstart">Build the host</ButtonLink>
              <ButtonLink href="/conformance" variant="secondary">
                Check conformance
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
