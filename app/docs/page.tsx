import type { Metadata } from 'next';
import CapabilityUnit from '../components/CapabilityUnit';
import CodePanel from '../components/CodePanel';
import InvocationTrace from '../components/InvocationTrace';
import Nav from '../components/Nav';
import PolicyBoundary from '../components/PolicyBoundary';
import SectionHeader from '../components/SectionHeader';
import SectionShell from '../components/SectionShell';
import SiteFooter from '../components/SiteFooter';
import SurfacePanel from '../components/SurfacePanel';
import { DOC_NAV_GROUPS, getDocsPages } from '../lib/docs-content';

export const metadata: Metadata = {
  title: 'Docs - Capability Host Protocol',
  description:
    'Documentation hub for CHP concepts, manifests, invocation lifecycle, policy, evidence, replay, comparisons, and conformance.',
};

const EXAMPLE_MANIFEST = `{
  "id": "service-ops-host",
  "version": "0.1.0",
  "protocol_version": "0.1",
  "kind": "service",
  "capabilities": [{
    "id": "schedule_technician",
    "version": "1.0.0",
    "description": "Reserve a qualified technician.",
    "status": "experimental",
    "modes": ["sync"],
    "emits": ["execution_started", "execution_completed", "execution_denied"],
    "policy": {
      "risk_tier": "high",
      "auth_required": true,
      "approval_required": true
    }
  }],
  "evidence": {
    "store": "local-append-only",
    "append_only": true
  }
}`;

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <SectionShell border="none" className="pt-16 pb-14">
          <p className="mb-4 font-mono text-xs uppercase text-zinc-400">Docs</p>
          <h1 className="mb-6 max-w-4xl text-4xl font-semibold leading-tight text-zinc-50 md:text-6xl">
            Learn the hosted capability boundary from concept to conformance.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-400">
            CHP docs are organized around the protocol primitives independent
            hosts and callers need to share: capabilities, hosts, adapters,
            registry, invocation, policy, context, evidence, composition, and
            conformance.
          </p>
        </SectionShell>

        <SectionShell border="y">
          <SectionHeader
            eyebrow="Documentation IA"
            title="Start with meaning, then implement the protocol."
            body="Each documentation path keeps a concrete hosted capability example close to the formal definition."
            className="mb-10"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {DOC_NAV_GROUPS.map((group) => {
              const pages = getDocsPages(group.slugs);

              return (
                <SurfacePanel key={group.label} className="flex flex-col">
                  <div className="mb-5">
                    <p className="mb-3 font-mono text-xs uppercase text-zinc-400">
                      {group.label}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {group.description}
                    </p>
                  </div>
                  <div className="mt-auto space-y-2">
                    {pages.map((page) => (
                      <a
                        key={page.slug}
                        href={`/docs/${page.slug}`}
                        className="block rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-field)]/60 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-50"
                      >
                        {page.title}
                      </a>
                    ))}
                  </div>
                </SurfacePanel>
              );
            })}
          </div>
        </SectionShell>

        <SectionShell>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeader
                eyebrow="Core path"
                title="Read the concepts before the schema."
                body="The concept path gives implementation teams shared language for the parts of the protocol that must stay portable."
                className="mb-6 md:block"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                {getDocsPages([
                  'concepts/capability',
                  'concepts/host',
                  'concepts/adapter',
                  'concepts/registry',
                  'concepts/invocation',
                  'concepts/policy',
                  'concepts/context',
                  'concepts/evidence',
                  'concepts/conformance',
                  'concepts/composition',
                ]).map((page) => (
                  <a
                    key={page.slug}
                    href={`/docs/${page.slug}`}
                    className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)]/70 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-50"
                  >
                    {page.title} -&gt;
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <CapabilityUnit
                name="schedule_technician"
                description="Finds an available qualified technician and reserves a service window."
                host="ServiceOpsHost"
                policy="approval_required"
                version="1.0.0"
                state="invokable"
              />
              <PolicyBoundary
                state="approval_required"
                label="manager_approval"
                description="A manager must approve technician scheduling before the host returns a confirmed appointment."
              />
              <InvocationTrace
                actor="Planning Agent"
                capability="schedule_technician"
                host="ServiceOpsHost"
                policy="manager_approval"
                context="job_context"
                result="Confirmed Appointment"
              />
            </div>
          </div>
        </SectionShell>

        <SectionShell>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              eyebrow="Example-first docs"
              title="Every major concept includes a concrete capability."
              body="Docs should prove the boundary with a manifest, invocation, policy state, outcome, or evidence example before asking readers to trust abstract protocol language."
              className="md:block"
            />
            <CodePanel code={EXAMPLE_MANIFEST} label="manifest.json" language="json" />
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="Comparisons"
            title="Place CHP beside adjacent systems without blurring the boundary."
            body="The comparison pages explain when CHP complements APIs, MCP tools, service mesh, and workflow automation."
            className="mb-8"
          />
          <div className="grid gap-3 md:grid-cols-4">
            {getDocsPages([
              'comparisons/chp-vs-apis',
              'comparisons/chp-vs-mcp-tools',
              'comparisons/chp-vs-service-mesh',
              'comparisons/chp-vs-workflow-automation',
            ]).map((page) => (
              <a
                key={page.slug}
                href={`/docs/${page.slug}`}
                className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-context-surface)] px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-50"
              >
                {page.title} -&gt;
              </a>
            ))}
          </div>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
