import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import CompareTable from '../components/motif/CompareTable';

const PUBLISHED = '2026-06-28';

const TLDR =
  'To prove what an AI agent did, you need a record a third party can verify independently — not a screenshot or a log you could have edited. That means tamper-evident integrity (a hash chain), the authorization decision that allowed the action, the actual outcome, and the ability to replay the sequence. CHP captures all four at the capability boundary, so "show me what happened, and prove it" becomes a recorded fact rather than a reconstruction.';

export const metadata: Metadata = {
  title: 'How to prove what an AI agent did',
  description: TLDR,
  alternates: { canonical: 'https://capabilityhostprotocol.com/prove-what-an-ai-agent-did' },
};

const FAQ: [string, string][] = [
  [
    'What does it take to prove what an AI agent did?',
    'A record with four properties: it identifies which agent and principal acted, it captures the authorization decision (allowed or denied, under which policy), it records the real outcome, and it is tamper-evident so any later alteration is detectable. With those, the action can be replayed and independently verified — which is what "proof" means to an auditor or regulator.',
  ],
  [
    'Why is not a log or a screenshot enough?',
    'Because both are assertions you could have produced after the fact. A log can be edited or selectively retained; a screenshot proves nothing about authorization or completeness. Proof requires integrity you do not control unilaterally — a hash chain that makes tampering evident — plus the authorization and outcome captured at the moment of the action.',
  ],
  [
    'What is tamper-evidence and why does it matter here?',
    'Each evidence record is cryptographically linked to the previous one, forming a hash chain. Altering or removing any record breaks the chain, so changes are detectable. This is what lets the record be defended: you are not asking anyone to trust that you did not edit it — they can check.',
  ],
  [
    'Can I prove an agent was NOT allowed to do something?',
    'Yes. In CHP a denial is a first-class, recorded outcome — "the agent attempted X and was denied under policy Y" is captured the same way an allowed action is. Proving the negative (the guardrail held) is often exactly what a security review or regulator wants to see.',
  ],
  [
    'Who actually asks for this?',
    'Anyone operating an agent under scrutiny: a security review gating a rollout, model-risk and compliance teams, regulators in finance, insurance, and healthcare, and counterparties in agent-to-agent transactions. The common thread is provability under scrutiny — the action has to be defensible, not merely logged.',
  ],
];

const ARTICLE_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to prove what an AI agent did',
  description: TLDR,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Organization', name: 'Capability Host Protocol', url: 'https://capabilityhostprotocol.com' },
  publisher: { '@type': 'Organization', name: 'Capability Host Protocol' },
  mainEntityOfPage: 'https://capabilityhostprotocol.com/prove-what-an-ai-agent-did',
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
    { '@type': 'ListItem', position: 2, name: 'Prove what an AI agent did', item: 'https://capabilityhostprotocol.com/prove-what-an-ai-agent-did' },
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

export default function ProveWhatAnAiAgentDidPage() {
  return (
    <div className="min-h-screen">
      {[ARTICLE_LD, FAQ_LD, BREADCRUMB_LD].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <p className="eyebrow mb-4">Evidence · provability</p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">How to prove what an AI agent did</h1>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl mb-4">{TLDR}</p>
          <p className="text-sm text-zinc-500">By Capability Host Protocol · {PUBLISHED}</p>
        </section>

        <Section eyebrow="The bar" title="Proof is a record someone else can verify.">
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl mb-2">
            "We have logs" is not proof. Proof is a record whose integrity you do not control unilaterally, that captures
            the authorization and outcome at the moment of the action, and that can be replayed. Here is the gap between
            what most teams have and what holds up.
          </p>
          <CompareTable
            columns={[
              { label: 'Logs / screenshots' },
              { label: 'Provable evidence', accent: true },
            ]}
            rows={[
              { dimension: 'Can be edited after', cells: ['Yes — unilaterally', 'No — tampering is detectable'] },
              { dimension: 'Authorization', cells: ['Not captured', 'Allow/deny + policy, recorded'] },
              { dimension: 'Denial', cells: ['Usually invisible', 'A first-class recorded outcome'] },
              { dimension: 'Replay', cells: ['Manual reconstruction', 'Deterministic replay of the sequence'] },
              { dimension: 'Verifiable by a third party', cells: ['Take our word', 'Check the hash chain'] },
            ]}
            caption="The difference is whether someone who distrusts you can still verify it."
          />
        </Section>

        <Section eyebrow="The four things you need" title="Identity, authorization, outcome, integrity.">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['Tamper-evident integrity', 'Records are hash-chained, so any later alteration breaks the chain and is detectable.'],
              ['The authorization decision', 'Not just that it happened — that it was allowed (or denied) under a specific policy.'],
              ['The real outcome', 'What actually resulted, with denial captured as a first-class result, not an absence.'],
              ['Replayability', 'The ability to reconstruct and re-verify the exact sequence after the fact.'],
            ].map(([h, b]) => (
              <div key={h} className="surface-raised p-5">
                <h3 className="text-base font-semibold text-zinc-100 mb-1">{h}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="How CHP does it" title="Evidence at the boundary — replayable and hash-chained.">
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl mb-4">
            CHP captures each governed action as an evidence record at the capability boundary, hash-chained to the ones
            before it. You can replay the sequence to show exactly what the agent did, and anyone can verify the chain
            was not altered. That turns "show me why this happened" from a forensic reconstruction into reading a record
            that was designed to be defended.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
            Related reading:{' '}
            <a className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50" href="/blog/proving-why-a-claim-was-denied">
              Proving why a claim was denied
            </a>
            ,{' '}
            <a className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50" href="/blog/the-security-review-that-stalls-your-agent">
              The security review that stalls your agent
            </a>
            , and{' '}
            <a className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50" href="/ai-agent-audit-trail">
              what an agent audit trail contains
            </a>
            .
          </p>
        </Section>

        <Section eyebrow="Questions" title="Proving agent actions, answered.">
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
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">Make your agents&apos; actions provable.</h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                It starts with declaring what your host can do —{' '}
                <a className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50" href="https://capabilitiestxt.org">
                  the capabilities.txt standard
                </a>{' '}
                — and ends with evidence you can defend. CHP is the layer that proves it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/design-partners" className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap">
                Build it with us
              </a>
              <a href="/agentic-web" className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors whitespace-nowrap">
                The agentic web
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
