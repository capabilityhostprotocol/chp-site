import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Conformance - Capability Host Protocol',
  description:
    'What CHP conformance should prove for host descriptors, versions, lifecycle, policy checks, invocation safety, errors, evidence, and replay.',
};

const AREAS = [
  {
    title: 'Manifest validity',
    body: 'Reject malformed descriptors, duplicate identifiers, invalid versions, and capability references that cannot be resolved safely.',
  },
  {
    title: 'Version compatibility',
    body: 'Fail closed when protocol or capability versions are unsupported, ambiguous, or incompatible with the caller.',
  },
  {
    title: 'Invocation safety',
    body: 'Validate subject identity, payload shape, target host, mode support, lifecycle state, and capability availability before execution.',
  },
  {
    title: 'Permission checks',
    body: 'Return structured denials for missing entitlements, policy blocks, revoked grants, and actions requiring human review.',
  },
  {
    title: 'Structured errors',
    body: 'Use machine-readable codes and details for malformed inputs, unavailable hosts, timeouts, and host failures.',
  },
  {
    title: 'Evidence and replay',
    body: 'Emit ordered evidence for every execution attempt and make replay by correlation ID predictable.',
  },
];

const TEST_SHAPE = [
  ['Accept', 'Known-good manifests, compatible versions, authorized invocations, and replayable successful executions.'],
  ['Reject', 'Malformed inputs, mismatched frames, unknown hosts, unavailable capabilities, and unsupported versions.'],
  ['Deny', 'Permission failures, policy blocks, disabled capabilities, and lifecycle violations.'],
  ['Observe', 'Structured logs, evidence events, correlation IDs, timing, and trace export hooks.'],
];

export default function ConformancePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">
            Conformance
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Independent hosts should fail, deny, and prove behavior the same way.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Conformance turns CHP from a convention into an ecosystem contract:
            implementers can prove that manifests, invocations, lifecycle rules,
            policy checks, errors, evidence, and replay behave predictably.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AREAS.map((area) => (
              <div key={area.title} className="border border-zinc-800/80 bg-zinc-900/50 rounded-xl p-5">
                <h2 className="text-base font-semibold text-zinc-100 mb-2">{area.title}</h2>
                <p className="text-sm text-zinc-500 leading-relaxed">{area.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <div className="mb-8">
            <p className="eyebrow mb-3">
              Test shape
            </p>
            <h2 className="display-2 text-zinc-100 mb-3">
              A useful suite covers the whole lifecycle.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
              Public protocol tests should cover success paths and protocol
              failures equally. The negative cases are what make independent
              implementations safe to call.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {TEST_SHAPE.map(([title, body], index) => (
              <div key={title} className="border border-zinc-800 bg-zinc-950/70 rounded-lg p-5">
                <p className="font-mono text-xs text-zinc-600 mb-6">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="border border-zinc-800/80 bg-zinc-900/50 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Use the suite as a public trust signal.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                Host providers can publish conformance results alongside their
                manifests so agents and applications know which protocol guarantees
                are implemented.
              </p>
            </div>
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/tree/main/conformance"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              View conformance
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
