import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Protocol Surface - Capability Host Protocol',
  description:
    'The CHP protocol surface: host descriptors, discovery, invocation, lifecycle, policy checks, structured errors, evidence, replay, and conformance.',
};

const SURFACE = [
  {
    name: 'Manifests',
    detail:
      'Hosts declare identity, capabilities, versions, invocation modes, policy metadata, and evidence behavior before clients invoke anything.',
  },
  {
    name: 'Discovery',
    detail:
      'Agents and applications can reason about what a host offers, what is online, and which capability versions are compatible.',
  },
  {
    name: 'Invocation',
    detail:
      'Calls carry invocation identity, capability identity, mode, subject attributes, payload, correlation, and structured response semantics.',
  },
  {
    name: 'Lifecycle',
    detail:
      'Unknown hosts, stopped services, unavailable capabilities, disabled executors, and premature calls are explicit protocol states.',
  },
  {
    name: 'Permissions',
    detail:
      'Capabilities can require subject entitlements or policy approval before execution, returning denials as structured outcomes instead of ambiguous failures.',
  },
  {
    name: 'Evidence',
    detail:
      'Every execution attempt emits ordered, replayable evidence for audit, debugging, telemetry export, and compliance reporting.',
  },
];

const FAILURE_MODES = [
  'Malformed manifest',
  'Unsupported protocol version',
  'Unknown host',
  'Unavailable capability',
  'Unauthorized invocation',
  'Lifecycle violation',
  'Timeout',
  'Structured host error',
];

const CONTRACTS = [
  ['Before invocation', 'HostDescriptor validation, version compatibility, host identity, mode support, and declared policy metadata.'],
  ['During invocation', 'Correlation context, subject handling, payload validation, authorization, host timeout policy, and lifecycle checks.'],
  ['After invocation', 'Structured response status, denial/error code, evidence emission, replay, and telemetry export.'],
];

export default function ProtocolPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-4">
            Protocol surface
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-50 mb-6 max-w-4xl">
            The contract between capability hosts and the systems that call them.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            CHP defines the operational boundary for governed AI capabilities:
            how they are declared, discovered, invoked, authorized, observed, and
            verified across independent implementations.
          </p>
        </section>

        <section className="border-y border-zinc-800/60 bg-zinc-900/40">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-zinc-500">
            {['Spec', 'Schemas', 'Reference host', 'Structured errors', 'Replay', 'Conformance'].map(
              (item) => (
                <span key={item}>{item}</span>
              ),
            )}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-b border-zinc-800/60">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SURFACE.map((item) => (
              <div key={item.name} className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-5">
                <h2 className="text-base font-semibold text-zinc-100 mb-2">{item.name}</h2>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-b border-zinc-800/60">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
                Failure semantics
              </p>
              <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
                Public protocols need predictable failure.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                CHP treats bad inputs and unsafe invocations as part of the
                protocol, not as incidental implementation details. Clients should
                be able to distinguish incompatibility, unavailability, denial,
                timeout, and host failure.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {FAILURE_MODES.map((mode) => (
                <div key={mode} className="border border-zinc-800 bg-zinc-950/70 rounded-lg px-4 py-3">
                  <p className="text-sm text-zinc-300">{mode}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-8">
            <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
              End-to-end contract
            </p>
            <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
              From declaration to replay.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {CONTRACTS.map(([phase, detail], index) => (
              <div key={phase} className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-5">
                <p className="font-mono text-xs text-zinc-600 mb-6">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{phase}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors"
            >
              Read the spec
            </a>
            <a
              href="/conformance"
              className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
            >
              Conformance model
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
