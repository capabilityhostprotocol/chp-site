import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import Badge from '../components/Badge';
import {
  catalog,
  kindLabel,
  pinnedIdentity,
  shortDigest,
  type SoftwareSubject,
} from '../lib/software';

export const metadata: Metadata = {
  title: 'Software → Capabilities - Capability Host Protocol',
  description:
    'A software observatory: real artifacts — git repositories, model cards, PyPI and npm packages — acquired at immutable subjects and compiled by the Capability Foundry into candidate capabilities. Every claim is labeled by its real state; nothing is qualified, bound, or executed.',
};

function SubjectCard({ s }: { s: SoftwareSubject }) {
  const meta = s.subject;
  const pin = pinnedIdentity(meta);
  const matched = s.entries.filter((e) => e.state === 'matched');
  return (
    <div className="surface-raised p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <Badge tone="neutral">{kindLabel(meta.kind)}</Badge>
          <h3 className="text-base font-semibold text-zinc-100 break-all">{meta.source}</h3>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <Badge tone="signal">{matched.length} matched</Badge>
          <Badge tone="required">{s.entries.length - matched.length} candidate</Badge>
        </div>
      </div>

      <div className="font-mono text-[11px] text-zinc-500 mb-4 flex flex-wrap gap-x-5 gap-y-1">
        <span>state: {meta.state}</span>
        {meta.immutable && <span>immutable</span>}
        {pin && (
          <span>
            {pin.label}: <span className="text-zinc-300">{pin.value}</span>
          </span>
        )}
        {meta.content_sha256 && (
          <span>
            sha256: <span className="text-zinc-300">{shortDigest(meta.content_sha256)}…</span>
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {s.entries.map((e) => {
          const isMatched = e.state === 'matched';
          return (
            <div
              key={e.candidate_id ?? e.candidate_label}
              className="flex items-start gap-3 border-t border-zinc-800/60 pt-2 first:border-t-0 first:pt-0"
            >
              <span className="mt-0.5 shrink-0">
                <Badge tone={isMatched ? 'signal' : 'required'}>
                  {isMatched ? 'matched' : 'review'}
                </Badge>
              </span>
              <div className="min-w-0">
                <p className="text-sm text-zinc-200">
                  {e.candidate_label}
                  {isMatched && e.canonical && (
                    <span className="font-mono text-[12px] text-cyan-200"> → {e.canonical}</span>
                  )}
                </p>
                <p className="text-[12px] text-zinc-500 leading-relaxed">{e.claim}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SoftwarePage() {
  const t = catalog.totals;
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">The Capability Foundry</p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            A software observatory — existing software, read as governed capability.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            The Foundry is a governed compiler. It acquires an existing artifact — a repository, a
            model card, a package — at an exact, immutable subject, reads its declared behavior as
            untrusted data, and proposes what capabilities it might expose. A model proposes; the
            host narrows and fences every step. Below are real compiles of real artifacts across four
            ecosystems, and each one says nothing stronger than the evidence supports.
          </p>
          <div className="flex flex-wrap gap-2 mt-8 text-[11px]">
            <Badge tone="neutral">{t.subjects} subjects</Badge>
            <Badge tone="signal">{t.matched} matched</Badge>
            <Badge tone="required">{t.candidates} candidate</Badge>
            <Badge tone="neutral">{t.published} published to capabilities.txt</Badge>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800/60">
          <p className="eyebrow mb-4">The catalog</p>
          <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">Acquired, not assumed.</h2>
          <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
            Each subject is resolved to an immutable identity — a commit for a repository or model
            card, a version for a package — and independently hashed, so every compile is
            reproducible and tamper-evident. <span className="text-cyan-200">Matched</span> means a
            candidate canonicalized to a capability already in the registry;{' '}
            <span className="text-amber-200">review</span> means it was interpreted but has no
            canonical match. Neither is qualified, bound, ready, or executed.
          </p>
          <div className="flex flex-col gap-4">
            {catalog.subjects.map((s) => (
              <SubjectCard key={s.subject.source} s={s} />
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="surface-signature p-6">
            <h2 className="text-lg font-semibold text-zinc-100 mb-2">
              Why nothing here is published yet.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
              {catalog.disclaimer} A capability becomes publishable supply only after it is qualified
              and bound — assessed against its contract and attached to a real implementation under
              policy. Discovery proposes; evidence supports; qualification assesses; the host
              governs.
            </p>
            <p className="mt-4 font-mono text-[11px] text-zinc-500">{catalog.generated_by}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
