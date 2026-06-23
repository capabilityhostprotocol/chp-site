import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import CodePanel from '../../components/CodePanel';
import { OUTCOME_EXAMPLE } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Govern human decisions - Capability Host Protocol',
  description:
    'Make high-stakes human approvals, consent, and denials part of the record — the same governed, provable event as an agent action. A demonstration of how CHP would work; built with design partners.',
};

export default function GovernHumanDecisionsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">
            Govern · Human decisions
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Make high-stakes approvals part of the record.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            A manager approving a discount, an adjuster authorizing a payout, a
            clinician signing off — these are consequential actions too. CHP
            treats a human approval, consent, or denial as the same governed,
            provable event as an agent&apos;s tool call.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div>
              <p className="eyebrow mb-3">
                How it would work
              </p>
              <h2 className="display-2 text-zinc-100 mb-4">
                Approval and denial, as first-class outcomes.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                A capability that requires approval emits a structured outcome
                when consent is withheld — denial code, reason, and the evidence
                ID, tied to the same correlation as everything else in the
                session. The record shows not just what happened, but who was
                allowed to make it happen.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Demonstrated, not yet shipped: the approval and denial primitives
                exist in the protocol today. The human-in-the-loop workflow and UI
                are what we build with a design partner.
              </p>
            </div>
            <CodePanel code={OUTCOME_EXAMPLE} label="outcome — denied at the boundary" language="json" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="surface-raised p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Have a high-stakes approval flow?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Bring the decision that has to be defensible later. We will show
                you how it maps onto the protocol and build the human-in-command
                workflow with you.
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
