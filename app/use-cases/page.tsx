import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import { USE_CASES } from '../components/UseCasesSection';
import ItemListLd from '../components/ItemListLd';

export const metadata: Metadata = {
  title: 'Use cases - Capability Host Protocol',
  description:
    'Concrete jobs CHP does: see what an agent did, prove an automated decision, capture a human approval, replay a process across hosts, gate a high-risk action, and expose a product capability safely.',
};

const CONTEXT: Record<string, string> = {
  'See what an AI agent did':
    'The boundary that is real today. One command hooks your agent CLI and records every tool call as replayable, tamper-evident evidence — the answer to a security review.',
  'Prove why an automated decision happened':
    'Denial is a first-class outcome in CHP, so an automated approve/deny carries an explicit reason, the deciding subject, and an evidence id you can replay.',
  'Put a human approval in the record':
    'A sign-off, consent, or authorization becomes the same kind of governed, provable event as an agent action — not a side note in a log.',
  'Replay a process across hosts':
    'One correlation id flows across machines, services, and partners, so a process spanning many hosts replays as a single ordered trace.',
  'Gate a high-risk action':
    'A capability can require entitlement, approval, or a safety check; when one fails, the action is denied at the boundary and the denial is recorded.',
  'Expose a product capability safely':
    'Publish what your product can do as a governed, discoverable capability with a stable contract and per-invocation evidence.',
};

export default function UseCasesPage() {
  return (
    <div className="min-h-screen">
      <ItemListLd
        name="What people use CHP for"
        items={USE_CASES.map((u) => ({
          name: u.title,
          url: `https://capabilityhostprotocol.com${u.href}`,
          description: u.body,
        }))}
      />
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">
            Use cases
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            What people use CHP for.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Concrete jobs the protocol does. One is provable today; the rest are
            demonstrations of how the same primitives would work in your domain —
            each an invitation to build it with us.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid md:grid-cols-2 gap-4">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="surface-raised p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="text-lg font-semibold text-zinc-100">
                    {u.title}
                  </h2>
                  <span className="font-mono text-[10px] uppercase text-zinc-400 border border-zinc-700 rounded px-2 py-1 whitespace-nowrap">
                    {u.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                  {CONTEXT[u.title] ?? u.body}
                </p>
                <a
                  href={u.href}
                  className="mt-5 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
                >
                  {u.status === 'Live' ? 'See it' : 'How it would work'} →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Have a job that needs a provable record?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                If your work needs to show what people, agents, and systems did,
                the protocol probably fits. Tell us the workflow and we will map
                it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/govern/agents"
                className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
              >
                See what your agents did
              </a>
              <a
                href="/design-partners"
                className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors whitespace-nowrap"
              >
                Build a vertical with us
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
