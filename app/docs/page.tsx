import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Docs - Capability Host Protocol',
  description:
    'Documentation hub for CHP concepts, manifests, invocation lifecycle, errors, evidence, replay, and conformance.',
};

const TOPICS = [
  {
    title: 'Protocol concepts',
    body: 'The nouns CHP standardizes: hosts, manifests, capabilities, products, invocations, evidence, and replay.',
    href: '/protocol',
  },
  {
    title: 'Manifest model',
    body: 'How hosts describe identity, capability versions, lifecycle state, availability, and permission requirements.',
    href: 'https://github.com/capabilityhostprotocol/chp-core/tree/main/schemas',
  },
  {
    title: 'Invocation lifecycle',
    body: 'Discovery, validation, authorization, execution, response, evidence, and replay as one governed boundary.',
    href: '/protocol',
  },
  {
    title: 'Errors and denials',
    body: 'How malformed input, lifecycle violations, unavailable hosts, timeouts, and policy denials should be handled.',
    href: '/conformance',
  },
  {
    title: 'Evidence and replay',
    body: 'How accepted invocations become ordered evidence that can be replayed by correlation ID.',
    href: '/examples',
  },
  {
    title: 'Conformance',
    body: 'What independent hosts should prove before agents and applications trust them.',
    href: '/conformance',
  },
];

const REFERENCES = [
  ['Protocol spec', 'https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md'],
  ['Schemas', 'https://github.com/capabilityhostprotocol/chp-core/tree/main/schemas'],
  ['Reference host', 'https://github.com/capabilityhostprotocol/chp-core/tree/main/packages/python/chp_core'],
  ['Conformance suite', 'https://github.com/capabilityhostprotocol/chp-core/tree/main/conformance'],
  ['Quickstart', '/quickstart'],
  ['Examples', '/examples'],
];

const FLOW = [
  ['Declare', 'A host publishes stable identity, capabilities, versions, and requirements.'],
  ['Discover', 'A caller selects a compatible capability and understands availability before invoking.'],
  ['Authorize', 'The host checks lifecycle, entitlements, policy, timeout, and payload validity.'],
  ['Execute', 'The capability runs or returns a structured denial/error without ambiguous failure.'],
  ['Replay', 'Evidence can be queried by correlation ID and exported into operational systems.'],
];

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-4">Docs</p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-50 mb-6 max-w-4xl">
            Learn the protocol boundary before you implement it.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            CHP documentation is organized around the guarantees independent
            hosts and callers need to agree on: declaration, discovery,
            invocation safety, structured outcomes, evidence, and conformance.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-y border-zinc-800/60">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS.map((topic) => (
              <a
                key={topic.title}
                href={topic.href}
                className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-5 hover:border-zinc-600 transition-colors"
              >
                <h2 className="text-base font-semibold text-zinc-100 mb-2">{topic.title}</h2>
                <p className="text-sm text-zinc-500 leading-relaxed">{topic.body}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-b border-zinc-800/60">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
                Lifecycle
              </p>
              <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
                The minimum shared flow.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The protocol is useful because callers can reason about the same
                lifecycle regardless of which host, agent framework, application,
                or infrastructure provider implements it.
              </p>
            </div>
            <div className="space-y-3">
              {FLOW.map(([step, body], index) => (
                <div
                  key={step}
                  className="grid grid-cols-[3rem_1fr] gap-4 border border-zinc-800 bg-zinc-950/70 rounded-lg p-4"
                >
                  <span className="font-mono text-xs text-zinc-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100 mb-1">{step}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-8">
            <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
              Reference artifacts
            </p>
            <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
              Read from the protocol out.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {REFERENCES.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="border border-zinc-800 bg-zinc-900/70 rounded-lg px-4 py-3 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-600 transition-colors"
              >
                {label} -&gt;
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
