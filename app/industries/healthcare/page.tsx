import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import CodePanel from '../../components/CodePanel';
import { INVOCATION_EXAMPLE } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Healthcare operations - Capability Host Protocol',
  description:
    'Let AI act on the record with a clinician in command — every AI action and human sign-off in one replayable, tamper-evident trace. A demonstration of how CHP would work in healthcare; built with design partners.',
};

const FLOW = [
  {
    step: 'The pain',
    body: 'AI scribes and agents draft notes, summarize charts, and prepare orders. A clinician has to stay in command and sign off — and when something is questioned, you need to show what the AI did, who approved it, and that the record is intact, under HIPAA scrutiny.',
  },
  {
    step: 'The trigger',
    body: 'A safety event, a payer audit, or a malpractice inquiry asks: “What did the automated step do, and who authorized it?” Reconstructing that from application logs is slow and not defensible.',
  },
  {
    step: 'Who owns it',
    body: 'The CMIO and clinical operations, with compliance — accountable for patient safety, the integrity of the record, and what automation is allowed to touch.',
  },
  {
    step: 'What CHP would do',
    body: 'Each AI action crosses a capability boundary that records a structured event with the acting subject and correlation; the clinician sign-off is a governed approval in the same trace. Payloads are redacted by default, so the evidence captures who-did-what without storing the PHI body.',
  },
];

export default function HealthcareIndustryPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="flex items-center gap-3 mb-4">
            <p className="eyebrow">
              Industries · Healthcare operations
            </p>
            <span className="font-mono text-[10px] uppercase text-zinc-400 border border-zinc-700 rounded px-2 py-1">
              Demonstrated · design partner wanted
            </span>
          </div>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Let AI act on the record — with a clinician in command.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            A human approval and an AI action are the same kind of governed event
            in CHP — which is exactly what a clinical sign-off needs. This page
            shows how it would work with today’s primitives; the access and
            retention layer an audit requires is what we build with a design
            partner.
          </p>
          <a
            href="/blog/who-authorized-the-ai-step"
            className="inline-block mt-6 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            Read the essay: “Who authorized the AI step?” →
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
                The AI action — attributed, before sign-off.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                This is a CHP invocation: the capability, the acting subject, and
                the correlation that ties it to the encounter. The clinician
                approval is recorded as the next governed event in the same trace,
                so the record shows both what was proposed and who authorized it.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Demonstrated, not yet shipped: invocation, approval, and redacted
                evidence exist today. Role-based access and compliant retention
                are what we build with a design partner.
              </p>
            </div>
            <CodePanel code={INVOCATION_EXAMPLE} label="invocation — the attributed AI action" language="json" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-raised p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Putting AI into clinical workflows?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Bring a real sign-off flow. We’ll map the AI action and clinician
                approval onto the protocol and build the access and retention your
                compliance team requires, together.
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
