import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import AdoptionPathsSection from '../components/AdoptionPathsSection';
import AdoptionStatusSection from '../components/AdoptionStatusSection';

export const metadata: Metadata = {
  title: 'Implementers - Capability Host Protocol',
  description:
    'Role-based CHP adoption paths for host implementers, agent frameworks, application developers, and infrastructure providers.',
};

const PATHS = [
  {
    role: 'Capability host implementer',
    outcome: 'Expose a reliable capability surface that independent agents can trust.',
    first: 'Start with a manifest, stable capability IDs, lifecycle state, and structured invocation outcomes.',
    link: 'Host quickstart',
    href: '/quickstart',
  },
  {
    role: 'Agent or framework author',
    outcome: 'Call capabilities without hardcoding every provider, tool shape, or failure mode.',
    first: 'Use discovery and invocation semantics to handle availability, subject policy, host timeout behavior, and denials.',
    link: 'Protocol surface',
    href: '/protocol',
  },
  {
    role: 'Application developer',
    outcome: 'Move high-value actions behind governed boundaries while preserving product workflow control.',
    first: 'Route actions through hosts, attach correlation IDs, and replay evidence for user-visible operations.',
    link: 'Quickstart',
    href: '/quickstart',
  },
  {
    role: 'Infrastructure provider',
    outcome: 'Build validation, policy, observability, and managed trust services around a portable protocol.',
    first: 'Validate host descriptors, enforce policy checks, stitch evidence, and run conformance checks.',
    link: 'Conformance',
    href: '/conformance',
  },
];

const READINESS = [
  'Capability IDs and versions are stable.',
  'Manifest validation runs before publication.',
  'Unavailable capabilities fail predictably.',
  'Entitlement denials are structured.',
  'Invocations carry correlation context.',
  'Evidence can be replayed by correlation ID.',
  'Malformed input tests exist.',
  'Conformance gaps are documented.',
];

export default function ImplementersPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">
            Implementers
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Adopt CHP from the side of the boundary you own.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            CHP is useful whether you expose capabilities, call them, compose
            them into applications, or operate the infrastructure that validates
            and observes them.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid md:grid-cols-2 gap-4">
            {PATHS.map((path) => (
              <div key={path.role} className="surface-raised p-5 flex flex-col">
                <p className="eyebrow mb-4">{path.role}</p>
                <h2 className="text-lg font-semibold text-zinc-100 mb-3">{path.outcome}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1">{path.first}</p>
                <a
                  href={path.href}
                  className="mt-6 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
                >
                  {path.link} -&gt;
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
            <div>
              <p className="eyebrow mb-3">
                Readiness checklist
              </p>
              <h2 className="display-2 text-zinc-100 mb-4">
                What a credible implementation should prove.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The protocol boundary is only useful if independent callers can
                understand what is available, why a request failed, and where the
                evidence for a decision lives.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {READINESS.map((item) => (
                <div key={item} className="border border-zinc-800 bg-zinc-950/70 rounded-lg px-4 py-3">
                  <p className="text-sm text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AdoptionPathsSection />
        <AdoptionStatusSection />

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="surface-raised p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Start with one governed boundary.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Implement a local reference host, serve it over HTTP, then add
                manifest validation, permission checks, and conformance coverage
                as the surface becomes public.
              </p>
            </div>
            <a
              href="/quickstart"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              Start building
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
