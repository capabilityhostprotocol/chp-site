import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import CodePanel from '../../components/CodePanel';
import { OUTCOME_EXAMPLE } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Insurance - Capability Host Protocol',
  description:
    'Turn automated claim and underwriting decisions into a provable record of why — defensible in a dispute and to a regulator. A demonstration of how CHP would work in insurance; built with design partners.',
};

const FLOW = [
  {
    step: 'The pain',
    body: 'Models and agents increasingly approve, deny, and price claims. When a decision is challenged — by a policyholder, an adjuster, or a regulator — you need to show not just the outcome, but why it happened and that it was allowed to happen. Logs scattered across services are not a defensible answer.',
  },
  {
    step: 'The trigger',
    body: 'A complaint, an audit, or a market-conduct exam asks: “Show us how this automated decision was made, and prove the record hasn’t changed.” Today that reconstruction is slow, manual, and contestable.',
  },
  {
    step: 'Who owns it',
    body: 'Claims and underwriting operations leaders, paired with compliance and legal — the people accountable when an automated decision has to stand up to scrutiny.',
  },
  {
    step: 'What CHP would do',
    body: 'Every decision crosses a capability boundary that emits a structured outcome — approved, denied, or referred — with a stable reason code, the deciding subject, and a tamper-evident evidence id, all replayable by case. A denial is a first-class, explainable record, not an inference from logs.',
  },
];

export default function InsuranceIndustryPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <div className="flex items-center gap-3 mb-4">
            <p className="font-mono text-xs text-zinc-500 uppercase">
              Industries · Insurance
            </p>
            <span className="font-mono text-[10px] uppercase text-zinc-500 border border-zinc-700 rounded px-2 py-1">
              Demonstrated · design partner wanted
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-50 mb-6 max-w-4xl">
            Prove why an automated claim decision went the way it did.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Denial is a first-class outcome in CHP — which makes insurance one of
            the closest fits for the protocol. This page shows how it would work
            with today’s primitives; the production audit layer is what we build
            with a design partner.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-y border-zinc-800/60">
          <div className="grid md:grid-cols-2 gap-4">
            {FLOW.map((f) => (
              <div
                key={f.step}
                className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6"
              >
                <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
                  {f.step}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
                The demonstrated record
              </p>
              <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
                A decision, with its reason attached.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                This is the actual shape of a CHP outcome: the decision, an
                explicit denial reason and code, the correlation that ties it to
                the case, and the evidence ids that back it. It is the record an
                adjuster, a policyholder, and a regulator can all replay.
              </p>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Demonstrated, not yet shipped: the decision and denial primitives
                exist today. Hosted retention and regulator-shaped audit export
                are what we build with a design partner.
              </p>
            </div>
            <CodePanel code={OUTCOME_EXAMPLE} label="decision outcome — with reason" language="json" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
          <div className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Building automated claims decisions?
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                Bring a real approve/deny flow. We’ll map it onto the protocol and
                build the retention and audit export your compliance function
                needs, together.
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
