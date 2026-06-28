import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import CompareTable from '../components/motif/CompareTable';

const PUBLISHED = '2026-06-28';

const TLDR =
  'An AI agent audit trail is a record of what an agent did that can be defended, not just read. Application logs tell you a request happened; an audit trail proves which agent invoked which capability, whether it was authorized, what the outcome was, and that the record has not been altered. CHP produces one automatically at the capability boundary — every governed action captured as a hash-chained, replayable evidence record.';

export const metadata: Metadata = {
  title: 'AI agent audit trail — what it is and how to build one',
  description: TLDR,
  alternates: { canonical: 'https://capabilityhostprotocol.com/ai-agent-audit-trail' },
};

const FAQ: [string, string][] = [
  [
    'What is an AI agent audit trail?',
    'A durable, ordered record of the consequential actions an AI agent took — which agent, which capability, under what authorization, with what inputs and outcome — captured in a form that can be independently verified later. The defining property is defensibility: it is built to answer "what happened and prove it," not just to help you debug.',
  ],
  [
    'Why are application logs not an audit trail?',
    'Logs are written by the application for the application — unstructured, scattered across services, mutable, and easy to drop or rotate away. They can tell you an error occurred; they cannot prove that a specific agent was authorized to take a specific action and that the record is complete and unaltered. Different job, different guarantees.',
  ],
  [
    'What has to be in the trail for it to hold up under scrutiny?',
    'Identity (which agent/principal), the capability invoked, the authorization decision (allowed or denied, under which policy), the inputs and the outcome, a correlation id tying multi-step work together, and tamper-evidence (a hash chain) so any later alteration is detectable. CHP records exactly these as first-class fields.',
  ],
  [
    'Do I have to instrument every line of my agent code?',
    'No. CHP captures evidence at the capability boundary — the moment an action crosses from intent into effect — so you record the actions that matter without scattering audit logic through your model or prompt code. One integration at the boundary, not a hundred log statements.',
  ],
  [
    'How is an audit trail different from observability/telemetry?',
    'Telemetry (metrics, traces, OpenTelemetry) is built to help you understand and operate a system. An audit trail is built to be defended to a third party — an auditor, a regulator, a counterparty. They compose: keep your telemetry for operations, add an evidence layer for the actions you may have to prove.',
  ],
];

const ARTICLE_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI agent audit trail — what it is and how to build one',
  description: TLDR,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Organization', name: 'Capability Host Protocol', url: 'https://capabilityhostprotocol.com' },
  publisher: { '@type': 'Organization', name: 'Capability Host Protocol' },
  mainEntityOfPage: 'https://capabilityhostprotocol.com/ai-agent-audit-trail',
};

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const BREADCRUMB_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://capabilityhostprotocol.com' },
    { '@type': 'ListItem', position: 2, name: 'AI agent audit trail', item: 'https://capabilityhostprotocol.com/ai-agent-audit-trail' },
  ],
};

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="display-2 text-zinc-100 mb-6 max-w-3xl">{title}</h2>
      {children}
    </section>
  );
}

export default function AiAgentAuditTrailPage() {
  return (
    <div className="min-h-screen">
      {[ARTICLE_LD, FAQ_LD, BREADCRUMB_LD].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <p className="eyebrow mb-4">Evidence · the audit trail</p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">An audit trail for AI agents</h1>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl mb-4">{TLDR}</p>
          <p className="text-sm text-zinc-500">By Capability Host Protocol · {PUBLISHED}</p>
        </section>

        <Section eyebrow="The distinction" title="A log records that something happened. An audit trail proves it.">
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl mb-2">
            When an AI agent does something consequential — moves money, denies a claim, dispatches a machine, changes a
            record — and someone later asks <em>what happened and were you allowed to</em>, scattered application logs
            are not an answer. An audit trail is a different artifact, with different guarantees.
          </p>
          <CompareTable
            columns={[
              { label: 'Application logs' },
              { label: 'AI agent audit trail', accent: true },
            ]}
            rows={[
              { dimension: 'Built for', cells: ['Debugging the system', 'Being defended to a third party'] },
              { dimension: 'Identity', cells: ['Often implicit / missing', 'Which agent + principal, explicit'] },
              { dimension: 'Authorization', cells: ['Not recorded', 'Allowed/denied + the policy applied'] },
              { dimension: 'Integrity', cells: ['Mutable, rotatable', 'Hash-chained, tamper-evident'] },
              { dimension: 'Completeness', cells: ['Best-effort', 'Every governed action at the boundary'] },
            ]}
            caption="Logs and evidence are different jobs — keep both."
          />
        </Section>

        <Section eyebrow="What goes in it" title="The fields that make a record defensible.">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['Identity', 'Which agent and which principal initiated the action.'],
              ['Capability', 'The named, versioned capability that was invoked.'],
              ['Authorization', 'The allow/deny decision and the policy it was evaluated against.'],
              ['Outcome', 'What actually happened — including denial as a first-class, recorded result.'],
              ['Correlation', 'An id that ties multi-step, multi-host work into one trace.'],
              ['Integrity', 'A hash chain so any later tampering with the record is detectable.'],
            ].map(([h, b]) => (
              <div key={h} className="surface-raised p-5">
                <h3 className="text-base font-semibold text-zinc-100 mb-1">{h}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="How CHP builds it" title="Captured at the capability boundary, not bolted on after.">
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl mb-4">
            CHP records evidence at the moment an action crosses from intent into effect — the capability boundary — so
            you get a complete trail from one integration instead of audit code scattered through your agent. The result
            is replayable: you can reconstruct exactly what the agent did and verify the record was not altered. This is,
            almost literally, chain of custody for agent actions.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
            Related reading:{' '}
            <a className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50" href="/blog/logs-arent-evidence">
              Logs aren&apos;t evidence
            </a>
            ,{' '}
            <a className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50" href="/blog/evidence-is-not-telemetry">
              Evidence is not telemetry
            </a>
            , and{' '}
            <a className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50" href="/prove-what-an-ai-agent-did">
              how you prove what an agent did
            </a>
            .
          </p>
        </Section>

        <Section eyebrow="Questions" title="What teams ask about agent audit trails.">
          <div className="grid md:grid-cols-2 gap-4">
            {FAQ.map(([q, a]) => (
              <div key={q} className="surface-raised p-6">
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{q}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </Section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">See your agents&apos; audit trail.</h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Discovery starts with{' '}
                <a className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50" href="https://capabilitiestxt.org">
                  the capabilities.txt standard
                </a>
                ; the audit trail is where CHP picks up. Capture every governed action as replayable evidence in one
                command.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/design-partners" className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap">
                Build it with us
              </a>
              <a href="/how-it-works" className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors whitespace-nowrap">
                How it works
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
