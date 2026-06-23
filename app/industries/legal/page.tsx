import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import CodePanel from '../../components/CodePanel';
import { EVIDENCE_OUTPUT } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Legal - Capability Host Protocol',
  description:
    'A defensible chain of custody for AI-assisted review, with privilege decisions captured as governed approve/deny events. A demonstration of how CHP would work in legal; built with design partners.',
};

const FLOW = [
  {
    step: 'The pain',
    body: 'AI now reads, summarizes, and flags documents in review and e-discovery. When the work product is questioned, you need a defensible record of what the model touched, what a person decided, and that the record is intact — chain of custody, not a screenshot.',
  },
  {
    step: 'The trigger',
    body: 'Opposing counsel, a court, or an internal risk review asks: “Show the provenance of this AI-assisted review, and demonstrate it hasn’t been altered.” Without a tamper-evident record, the work product is exposed.',
  },
  {
    step: 'Who owns it',
    body: 'General counsel and legal operations — accountable for defensibility, privilege, and the integrity of the review record.',
  },
  {
    step: 'What CHP would do',
    body: 'Every action — a model reading a document, a reviewer asserting or waiving privilege — is a governed event in a SHA256 hash-chained record, correlated by matter. Privilege becomes an explicit approve/deny decision, and the chain itself proves the record was not altered after the fact.',
  },
];

export default function LegalIndustryPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="flex items-center gap-3 mb-4">
            <p className="eyebrow">
              Industries · Legal
            </p>
            <span className="font-mono text-[10px] uppercase text-zinc-400 border border-zinc-700 rounded px-2 py-1">
              Demonstrated · design partner wanted
            </span>
          </div>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            A defensible chain of custody for AI-assisted review.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            CHP’s evidence is SHA256 hash-chained — which is, almost literally,
            chain of custody. This page shows how it would work for legal work
            with today’s primitives; the matter-level retention and access layer
            is what we build with a design partner.
          </p>
          <a
            href="/blog/chain-of-custody-for-ai-review"
            className="inline-block mt-6 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            Read the essay: “Chain of custody for AI-assisted review” →
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
                Every action, in a chain that proves itself.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                This is a CHP evidence event: a stable action id, the host, the
                correlation that ties it to the matter, an explicit outcome, and a
                hash that links it to the prior event. Alter any record and the
                chain breaks — which is exactly what defensibility requires.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Demonstrated, not yet shipped: hash-chained evidence and replay
                exist today. Matter-level retention, access control, and export
                are what we build with a design partner.
              </p>
            </div>
            <CodePanel code={EVIDENCE_OUTPUT} label="evidence event — hash-chained" language="json" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-raised p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Using AI in review or e-discovery?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Bring a real review workflow. We’ll map provenance and privilege
                onto the protocol and build the retention and access your matters
                require, together.
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
