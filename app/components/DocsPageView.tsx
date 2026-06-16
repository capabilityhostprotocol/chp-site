import CapabilityUnit from './CapabilityUnit';
import CodePanel from './CodePanel';
import InvocationTrace from './InvocationTrace';
import PolicyBoundary from './PolicyBoundary';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';
import SurfacePanel from './SurfacePanel';
import type { DocsPage } from '../lib/docs-content';

type DocsPageViewProps = {
  page: DocsPage;
};

export default function DocsPageView({ page }: DocsPageViewProps) {
  return (
    <>
      <SectionShell border="none" className="pt-16 pb-14">
        <p className="mb-4 font-mono text-xs uppercase text-zinc-500">
          Docs / {page.group}
        </p>
        <h1 className="mb-6 max-w-4xl text-4xl font-semibold leading-tight text-zinc-50 md:text-6xl">
          {page.title}
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-zinc-400">
          {page.summary}
        </p>
      </SectionShell>

      <SectionShell border="y">
        <div className="grid gap-4 md:grid-cols-3">
          <SurfacePanel>
            <p className="mb-3 font-mono text-[11px] uppercase text-zinc-600">
              Plain English
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">{page.plain}</p>
          </SurfacePanel>
          <SurfacePanel>
            <p className="mb-3 font-mono text-[11px] uppercase text-zinc-600">
              Why it exists
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">{page.why}</p>
          </SurfacePanel>
          <SurfacePanel variant="field">
            <p className="mb-3 font-mono text-[11px] uppercase text-zinc-600">
              Formal definition
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">{page.formal}</p>
          </SurfacePanel>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="Concrete example"
              title="Ground the concept before the schema."
              body={page.example}
              className="mb-6 md:block"
            />
            <div className="space-y-4">
              {page.capability && <CapabilityUnit {...page.capability} />}
              {page.policy && <PolicyBoundary {...page.policy} />}
            </div>
          </div>
          <div className="space-y-4">
            {page.trace && <InvocationTrace {...page.trace} />}
            {page.code && (
              <CodePanel
                code={page.code.code}
                label={page.code.label}
                language={page.code.language}
              />
            )}
          </div>
        </div>
      </SectionShell>

      {page.comparison && (
        <SectionShell>
          <SectionHeader
            eyebrow="Category contrast"
            title={`${page.title}: what changes`}
            body="CHP can complement adjacent systems, but it centers a different protocol boundary."
            className="mb-8"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <SurfacePanel>
              <p className="mb-3 font-mono text-[11px] uppercase text-zinc-600">
                Compared to
              </p>
              <h2 className="text-base font-semibold text-zinc-100">
                {page.comparison.comparedTo}
              </h2>
            </SurfacePanel>
            <SurfacePanel>
              <p className="mb-3 font-mono text-[11px] uppercase text-zinc-600">
                They center
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                {page.comparison.theyCenter}
              </p>
            </SurfacePanel>
            <SurfacePanel variant="field">
              <p className="mb-3 font-mono text-[11px] uppercase text-zinc-600">
                CHP centers
              </p>
              <p className="text-sm leading-relaxed text-zinc-300">
                {page.comparison.chpCenters}
              </p>
            </SurfacePanel>
          </div>
          <div className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
            {page.comparison.guidance.map((item) => (
              <p key={item} className="py-4 text-sm leading-relaxed text-zinc-400">
                {item}
              </p>
            ))}
          </div>
        </SectionShell>
      )}

      {page.referenceTable && (
        <SectionShell>
          <SectionHeader
            eyebrow="Developer reference"
            title={page.referenceTable.title}
            body={page.referenceTable.description}
            className="mb-8"
          />
          <div className="overflow-hidden rounded-lg border border-[color:var(--color-border-subtle)]">
            <div className="grid gap-3 border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-field)] px-4 py-3 font-mono text-[11px] uppercase text-zinc-600 md:grid-cols-[0.8fr_0.7fr_1.5fr]">
              {page.referenceTable.columns.map((column) => (
                <span key={column}>{column}</span>
              ))}
            </div>
            <div className="divide-y divide-zinc-800">
              {page.referenceTable.rows.map((row) => (
                <div
                  key={row.name}
                  className="grid gap-3 bg-[color:var(--color-surface-900)]/55 px-4 py-4 md:grid-cols-[0.8fr_0.7fr_1.5fr]"
                >
                  <span className="break-words font-mono text-sm text-zinc-100">
                    {row.name}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    {row.value}
                  </span>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {row.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      )}

      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Relationships"
            title="Where this sits in the protocol."
            body="Each concept should explain its neighbors so implementation teams can preserve the boundary across manifests, invocation, evidence, and tests."
            className="md:block"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {page.relationships.map((relationship) => (
              <SurfacePanel key={relationship} variant="muted">
                <p className="text-sm leading-relaxed text-zinc-400">
                  {relationship}
                </p>
              </SurfacePanel>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-4 lg:grid-cols-3">
          <SurfacePanel>
            <h2 className="mb-4 text-base font-semibold text-zinc-100">
              Visual model
            </h2>
            <ol className="space-y-3">
              {page.visualModel.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm text-zinc-400">
                  <span className="font-mono text-xs text-zinc-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </SurfacePanel>
          <SurfacePanel>
            <h2 className="mb-4 text-base font-semibold text-zinc-100">
              Implementation notes
            </h2>
            <ul className="space-y-3">
              {page.implementationNotes.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-zinc-400">
                  <span className="mt-2 h-px w-5 flex-shrink-0 bg-zinc-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SurfacePanel>
          <SurfacePanel variant="field">
            <h2 className="mb-4 text-base font-semibold text-zinc-100">
              Common mistakes
            </h2>
            <ul className="space-y-3">
              {page.commonMistakes.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-zinc-400">
                  <span className="mt-2 h-px w-5 flex-shrink-0 bg-zinc-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SurfacePanel>
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeader
          eyebrow="Related concepts"
          title="Keep reading through the boundary."
          className="mb-8"
        />
        <div className="grid gap-3 md:grid-cols-3">
          {page.related.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)]/70 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-50"
            >
              {item.title} -&gt;
            </a>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
