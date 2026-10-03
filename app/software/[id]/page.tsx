import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import Badge from '../../components/Badge';
import {
  catalog,
  getSubjectBySlug,
  kindLabel,
  pinnedIdentity,
  shortDigest,
  subjectSlug,
} from '../../lib/software';

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return catalog.subjects.map((s) => ({ id: subjectSlug(s.subject.source) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const s = getSubjectBySlug(id);
  const name = s?.subject.source ?? id;
  return {
    title: `${name} — Software → Capabilities`,
    description: s
      ? `What the Capability Foundry read from ${name}: a real artifact acquired at an immutable subject, compiled to candidate capabilities, and — where shown — qualified by executing it in a governed sandbox. Every claim labeled by its real state; nothing published as bound supply.`
      : 'A compiled software subject in the Capability Foundry observatory.',
  };
}

export default async function SubjectDetailPage({ params }: Params) {
  const { id } = await params;
  const s = getSubjectBySlug(id);
  if (!s) notFound();

  const meta = s.subject;
  const pin = pinnedIdentity(meta);
  const matched = s.entries.filter((e) => e.state === 'matched');
  const qualified = s.entries.filter((e) => e.qualification?.passed);

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">
          <a
            href="/software"
            className="font-mono text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            &lt;- Software observatory
          </a>

          <div className="flex flex-wrap items-center gap-3 mt-4 mb-4">
            <Badge tone="neutral">{kindLabel(meta.kind)}</Badge>
            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-50 break-all">
              {meta.source}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] mb-6">
            <Badge tone="signal">{matched.length} matched</Badge>
            {qualified.length > 0 && <Badge tone="approved">{qualified.length} qualified</Badge>}
            <Badge tone="required">{s.entries.length - matched.length} candidate</Badge>
          </div>

          {meta.source_url && (
            <p className="mb-6">
              <a
                href={meta.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-cyan-300 hover:underline break-all"
              >
                Open the exact resource we acquired <span aria-hidden>↗</span>
              </a>
            </p>
          )}

          {/* Provenance — the immutable subject identity */}
          <div className="surface-raised p-5 mb-8">
            <h2 className="text-sm font-semibold text-zinc-200 mb-3">Provenance</h2>
            <dl className="font-mono text-[12px] text-zinc-400 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
              <dt>state</dt>
              <dd className="text-zinc-300">{meta.state}</dd>
              <dt>immutable</dt>
              <dd className="text-zinc-300">{String(meta.immutable)}</dd>
              {pin && (
                <>
                  <dt>{pin.label}</dt>
                  <dd className="text-zinc-300 break-all">{pin.value}</dd>
                </>
              )}
              {meta.content_sha256 && (
                <>
                  <dt>sha256</dt>
                  <dd className="text-zinc-300 break-all">{shortDigest(meta.content_sha256, 64)}</dd>
                </>
              )}
              {meta.acquired_at && (
                <>
                  <dt>acquired</dt>
                  <dd className="text-zinc-300">{meta.acquired_at}</dd>
                </>
              )}
            </dl>
          </div>

          {/* Compiled capabilities */}
          <h2 className="text-sm font-semibold text-zinc-200 mb-3">
            Compiled capabilities <span className="text-zinc-500">(model proposes, host fences)</span>
          </h2>
          <div className="flex flex-col gap-3">
            {s.entries.map((e) => {
              const isMatched = e.state === 'matched';
              const q = e.qualification;
              const isQualified = isMatched && q?.passed === true;
              return (
                <div key={e.candidate_id ?? e.candidate_label} className="surface-raised p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0">
                      <Badge tone={isQualified ? 'approved' : isMatched ? 'signal' : 'required'}>
                        {isQualified ? 'qualified' : isMatched ? 'matched' : 'review'}
                      </Badge>
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-zinc-200">
                        {e.candidate_label}
                        {isMatched && e.canonical && (
                          <span className="font-mono text-[12px] text-cyan-200"> → {e.canonical}</span>
                        )}
                      </p>
                      <p className="text-[12px] text-zinc-500 leading-relaxed mt-0.5">{e.claim}</p>
                      {isQualified && q && (
                        <div className="mt-2 border-t border-zinc-800/60 pt-2 font-mono text-[11px] text-emerald-300/90">
                          <p>
                            ✓ execution-grounded — exit {q.exit_code ?? '?'}, probe matched
                            {q.claim_id ? `, claim ${q.claim_id.slice(0, 18)}…` : ''}
                          </p>
                          {q.evidence?.length > 0 && (
                            <p className="text-zinc-500 break-all mt-1">
                              evidence: {q.evidence.slice(0, 3).join(', ')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="surface-signature p-5 mt-8">
            <p className="text-sm text-zinc-400 leading-relaxed">{s.disclaimer}</p>
            <p className="mt-3 font-mono text-[11px] text-zinc-500">
              capabilities.txt eligible: {s.capabilities_txt_eligible.length}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
