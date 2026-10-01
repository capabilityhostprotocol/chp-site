import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import Badge from '../components/Badge';
import {
  softwareProjection,
  matchedEntries,
  candidateEntries,
  shortCommit,
  shortDigest,
} from '../lib/software';

export const metadata: Metadata = {
  title: 'Software → Capabilities - Capability Host Protocol',
  description:
    'A worked example of the Capability Foundry: a real open-source tool, acquired at an immutable commit and compiled into candidate capabilities — interpreted, shortlisted, and canonicalized. Every claim is labeled by its real state; nothing is qualified, bound, or executed.',
};

const s = softwareProjection.subject;

export default function SoftwarePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">The Capability Foundry</p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Turning existing software into governed capability — truthfully.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            The Foundry is a governed compiler. It acquires an existing artifact — a repository,
            a model card, a service — at an exact, immutable subject, reads its declared behavior
            as untrusted data, and proposes what capabilities it might expose. A model proposes; the
            host narrows and fences every step. The result below is a real compile of a real tool,
            and it says nothing stronger than the evidence supports.
          </p>
          <div className="flex flex-wrap gap-2 mt-8 text-[11px]">
            <Badge tone="signal">{matchedEntries.length} matched</Badge>
            <Badge tone="required">{candidateEntries.length} candidate</Badge>
            <Badge tone="neutral">
              {softwareProjection.capabilities_txt_eligible.length} published to capabilities.txt
            </Badge>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800/60">
          <p className="eyebrow mb-4">The subject</p>
          <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
            Acquired, not assumed.
          </h2>
          <p className="text-zinc-400 leading-relaxed max-w-3xl mb-8">
            The subject is resolved to an immutable commit and independently hashed, so the
            compile below is reproducible and tamper-evident. Its content is treated as data,
            never as instructions — nothing acquired is ever executed.
          </p>
          <div className="surface-raised p-5 font-mono text-sm">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5">
              <dt className="text-zinc-500">source</dt>
              <dd className="text-zinc-200 break-all">{s.source}</dd>
              <dt className="text-zinc-500">state</dt>
              <dd className="text-zinc-200">
                <Badge tone="neutral">{s.state}</Badge>
                <span className="ml-2 text-zinc-500 not-italic">
                  observed — never claimed higher
                </span>
              </dd>
              <dt className="text-zinc-500">immutable</dt>
              <dd className="text-zinc-200">{String(s.immutable)}</dd>
              {s.commit && (
                <>
                  <dt className="text-zinc-500">commit</dt>
                  <dd className="text-zinc-200 break-all">{shortCommit(s.commit, 40)}</dd>
                </>
              )}
              {s.content_sha256 && (
                <>
                  <dt className="text-zinc-500">content</dt>
                  <dd className="text-zinc-200 break-all">
                    sha256:{shortDigest(s.content_sha256, 64)}
                  </dd>
                </>
              )}
              {s.acquired_at && (
                <>
                  <dt className="text-zinc-500">acquired</dt>
                  <dd className="text-zinc-200">{s.acquired_at}</dd>
                </>
              )}
            </dl>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800/60">
          <p className="eyebrow mb-4">The compile</p>
          <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
            What the Foundry found — and how far it got.
          </h2>
          <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
            Each row is a proposed capability. <span className="text-cyan-200">Matched</span> means
            the candidate canonicalized to a capability already in the registry. <span className="text-amber-200">Candidate</span>{' '}
            means it was interpreted but has no canonical match, so it stays for review. Neither
            state is qualified, bound, ready, or executed — those are later gates the Foundry does
            not reach here.
          </p>
          <div className="flex flex-col gap-3">
            {softwareProjection.entries.map((e) => {
              const matched = e.state === 'matched';
              return (
                <div
                  key={e.candidate_id ?? e.candidate_label}
                  className={matched ? 'surface-raised p-5' : 'surface-flat p-5'}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-zinc-100">
                      {e.candidate_label}
                    </h3>
                    <Badge tone={matched ? 'signal' : 'required'}>
                      {matched ? 'matched' : 'candidate · needs review'}
                    </Badge>
                  </div>
                  {matched && e.canonical && (
                    <p className="font-mono text-[12px] text-cyan-200 mb-2">→ {e.canonical}</p>
                  )}
                  <p className="text-sm text-zinc-400 leading-relaxed">{e.claim}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="surface-signature p-6">
            <h2 className="text-lg font-semibold text-zinc-100 mb-2">
              Why nothing here is published yet.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
              {softwareProjection.disclaimer} A capability becomes publishable supply only after it
              is qualified and bound — assessed against its contract and attached to a real
              implementation under policy. Discovery proposes; evidence supports; qualification
              assesses; the host governs.
            </p>
            <p className="mt-4 font-mono text-[11px] text-zinc-500">
              {softwareProjection.generated_by}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
