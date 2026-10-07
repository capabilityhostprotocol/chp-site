import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import SectionShell from '../../components/SectionShell';
import SectionHeader from '../../components/SectionHeader';
import SurfacePanel from '../../components/SurfacePanel';
import ButtonLink from '../../components/ButtonLink';
import Badge from '../../components/Badge';

export const metadata: Metadata = {
  title: 'OpenCell — a governed containment cell for AI agents',
  description:
    'OpenCell gives an AI agent and the tools it runs no way out by default, brokers every outward effect against an explicit plan, and emits the observations that prove the boundary held — as part of a signed, offline-verifiable Safety Case. Containment that proves itself.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/products/opencell' },
};

export default function OpenCellProductPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24">
          <div className="flex items-center gap-3 mb-4">
            <p className="eyebrow">Product · OpenCell</p>
            <Badge tone="signal">Preview</Badge>
          </div>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            A cell your agent can&apos;t escape — and a proof it didn&apos;t.
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mb-4">
            OpenCell is a governed containment cell for AI agents and the tools they run. It
            gives a workload no network path by default, brokers every outward effect against an
            explicit plan, and emits the observations that prove the boundary held — as part of a
            signed, offline-verifiable Safety Case.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
            Containers and sandboxes isolate. OpenCell isolates <em>and accounts</em>: the
            boundary is declared, enforced, and independently re-checked against the plan — so
            &ldquo;it was contained&rdquo; becomes something you hand to a reviewer, not something
            you assert.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <ButtonLink href="/runtime-assurance">How it fits</ButtonLink>
            <ButtonLink href="/products/chp-safety" variant="secondary">
              CHP Safety
            </ButtonLink>
            <ButtonLink href="/waitlist?product=opencell" variant="secondary">
              Become a design partner
            </ButtonLink>
          </div>
        </section>

        <SectionShell>
          <SectionHeader
            eyebrow="How the cell holds"
            title="Default-deny by construction, not by configuration."
          />
          <div className="grid gap-4 md:grid-cols-2 mt-8">
            {[
              ['No way out by default', 'The cell is created with no virtual NIC. There is no network path to disable or misconfigure — egress does not exist until the plan grants a specific one.'],
              ['Authenticated effect broker', 'Every outward effect the workload attempts is mediated by a broker that only forwards what the envelope allows. Allowed hosts go through; everything else is refused, and each attempt is recorded.'],
              ['Verified against the plan', 'An independent check re-derives what the cell could actually reach and compares it to what was declared. Containment is confirmed from observation — never taken on the runtime’s own word.'],
              ['Fails closed', 'If a required boundary class can’t be qualified on the host, the run stops. OpenCell never silently drops to a weaker cell than the one that was asked for.'],
            ].map(([title, body]) => (
              <SurfacePanel key={title}>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
              </SurfacePanel>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="The boundary ladder"
            title="One cell model, a ladder of strengths."
            body="OpenCell selects a concrete boundary class deterministically for the material effect domains a run declares. The same cell contract spans a hardened shared-kernel container and an own-kernel virtual machine — you ask for a strength, and the run either qualifies it or fails closed."
          />
          <SurfacePanel variant="muted" className="mt-8">
            <pre className="overflow-x-auto text-xs leading-relaxed text-zinc-300 font-mono">
{`rootless container + Landlock + seccomp     shared kernel   (live)
  → hardened + CHP egress proxy             brokered egress (live)
    → own-kernel microVM (nested KVM)       own kernel      (demonstrated)`}
            </pre>
          </SurfacePanel>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="Not just isolation"
            title="A boundary that proves itself."
            body="The point is not only that the cell holds — it is that you can show it held. OpenCell’s observations compile into the portable .chpsafety Safety Case, where an independent verifier re-derives Effect Closure over the declared material domains. Inside CHP Safety it pairs with OpenShell, the governed execution boundary the agent’s tools run inside."
          />
          <div className="flex flex-wrap gap-3 mt-6">
            <ButtonLink href="/products/chp-safety">See it in CHP Safety</ButtonLink>
            <ButtonLink href="/quickstart" variant="secondary">
              Run the quickstart
            </ButtonLink>
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="Where it stands"
            title="The shared-kernel cell is live; the own-kernel cell is demonstrated."
            body="OpenCell’s control plane — no-vNIC cells and the authenticated effect broker — is real and running, and the own-kernel microVM boundary has been demonstrated end-to-end on nested KVM. We’re hardening it toward general availability, and toward external red-team audit, with a select set of design partners."
          />
        </SectionShell>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Contain the agent. Keep the proof.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                If you need to run an agent where it must be shown — not assumed — that it
                couldn&apos;t reach what it wasn&apos;t allowed to, we&apos;re selecting design
                partners now.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/waitlist?product=opencell">Become a design partner</ButtonLink>
              <ButtonLink href="/runtime-assurance" variant="secondary">
                Runtime assurance
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
