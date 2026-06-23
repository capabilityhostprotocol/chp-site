import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import CodePanel from '../../components/CodePanel';
import { ARTIFACT_EXAMPLE } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Financial services - Capability Host Protocol',
  description:
    'Prove the controls around AI in financial workflows — high-risk actions declared, approved, and evidenced as a replayable bundle. A demonstration of how CHP would work in financial services; built with design partners.',
};

const FLOW = [
  {
    step: 'The pain',
    body: 'AI and automation sit inside trading, credit, payments, and onboarding decisions. Risk and compliance need to show what the model was allowed to do, that approvals were enforced, and that the whole decision can be replayed — not just that an outcome was logged.',
  },
  {
    step: 'The trigger',
    body: 'A model-risk review, an internal audit, or a regulator asks: “Demonstrate the controls around this automated decision.” Assembling that evidence after the fact is expensive and incomplete.',
  },
  {
    step: 'Who owns it',
    body: 'Risk and compliance, with the platform team — accountable for model governance and for the evidence that the controls actually held.',
  },
  {
    step: 'What CHP would do',
    body: 'High-risk capabilities are declared with a risk tier, required authorization, and required approval before they can be invoked; every invocation emits evidence, and the decision replays as a single bundle. The controls are in the contract, not just the code review.',
  },
];

export default function FinancialIndustryPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="flex items-center gap-3 mb-4">
            <p className="eyebrow">
              Industries · Financial services
            </p>
            <span className="font-mono text-[10px] uppercase text-zinc-400 border border-zinc-700 rounded px-2 py-1">
              Demonstrated · design partner wanted
            </span>
          </div>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Prove the controls around AI in financial workflows.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Risk tiers, required approval, and per-invocation evidence are
            declared in the manifest today. This page shows how they would back a
            model-risk review; the compliance export your regulator expects is what
            we build with a design partner.
          </p>
          <a
            href="/blog/controls-in-the-contract"
            className="inline-block mt-6 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            Read the essay: “Controls in the contract, not the code review” -&gt;
          </a>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid md:grid-cols-2 gap-4">
            {FLOW.map((f) => (
              <div
                key={f.step}
                className="surface-raised p-6"
              >
                <p className="eyebrow mb-3">
                  {f.step}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div>
              <p className="eyebrow mb-3">
                The demonstrated record
              </p>
              <h2 className="display-2 text-zinc-100 mb-4">
                The controls, declared up front.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                This is a CHP host manifest: the capability declares a high risk
                tier, that authorization is required, and that approval is
                required — before anything can invoke it. Callers see the controls,
                and every invocation against them is evidenced.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Demonstrated, not yet shipped: risk tiers, approval, and evidence
                exist today. Compliance export and enterprise identity are what we
                build with a design partner.
              </p>
            </div>
            <CodePanel code={ARTIFACT_EXAMPLE} label="host manifest — high-risk, approval-gated" language="json" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-raised p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Putting AI into regulated financial decisions?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Bring a real decision flow. We’ll declare the controls in the
                protocol and build the compliance export your risk function needs,
                together.
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
