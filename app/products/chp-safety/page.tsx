import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import SectionShell from '../../components/SectionShell';
import SectionHeader from '../../components/SectionHeader';
import SurfacePanel from '../../components/SurfacePanel';
import ButtonLink from '../../components/ButtonLink';
import Badge from '../../components/Badge';

export const metadata: Metadata = {
  title: 'CHP Safety — runtime assurance for AI agents',
  description:
    'CHP Safety binds an agent to an explicit Safety Envelope: it governs every action, contains the blast radius with OpenShell and OpenCell, witnesses execution independently, and exports a portable, offline-verifiable Safety Case. Control what AI agents can do. Prove the controls held.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/products/chp-safety' },
};

export default function ChpSafetyProductPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24">
          <div className="flex items-center gap-3 mb-4">
            <p className="eyebrow">Product · CHP Safety</p>
            <Badge tone="signal">Preview</Badge>
          </div>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Control what AI agents can do. Prove the controls held.
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mb-4">
            CHP Safety is runtime assurance for AI agents. It binds an agent to an explicit
            Safety Envelope, governs every action through that envelope, contains the blast
            radius at the operating-system boundary, and produces a portable Safety Case anyone
            can verify offline — not a dashboard of logs you have to trust.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
            It does <em>not</em> claim a model is intrinsically safe. It establishes a verifiable
            operational boundary around what an agent was authorized and technically able to
            affect — and the evidence that the boundary held.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <ButtonLink href="/quickstart">Run the quickstart</ButtonLink>
            <ButtonLink
              href="https://github.com/capabilityhostprotocol/chp-adapters"
              variant="secondary"
            >
              Install the adapters
            </ButtonLink>
            <ButtonLink href="/waitlist?product=chp-safety" variant="secondary">
              Become a design partner
            </ButtonLink>
          </div>
        </section>

        <SectionShell>
          <SectionHeader
            eyebrow="The core invariant"
            title="Intelligence may propose an effect. Authority determines whether it occurs."
            body="The hard part of deploying an agent is not capability — it is accountability. CHP Safety lets the model reason freely while the effect it tries to have is gated, contained, and recorded. A bad decision is allowed to be made; the unauthorized effect is not allowed to happen."
          />
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="What it does"
            title="Four guarantees, in one contract."
          />
          <div className="grid gap-4 md:grid-cols-2 mt-8">
            {[
              ['Govern every action', 'Each capability the agent invokes passes through CHP’s 12-gate pipeline — policy, invariants, autonomy, approvals. What is out of envelope is denied, with a reason, before it runs.'],
              ['Contain the blast radius', 'Material effects — credentials, egress, the filesystem — are forced down to a real OS boundary (OpenShell + OpenCell), never left to a prompt-level classifier to police.'],
              ['Witness independently', 'Execution is witnessed by a party that is not the one being watched — up to a separate host, and at the top of the ladder, rooted in hardware (TPM) attestation.'],
              ['Prove it offline', 'The run compiles to a portable, signed .chpsafety Safety Case. An independent verifier re-derives the claims from the evidence — it never trusts the producer’s own say-so.'],
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
            eyebrow="The runtime substrate"
            title="OpenShell and OpenCell."
            body="Containment is not an add-on. CHP Safety runs the agent’s work inside two named primitives, selected deterministically with no silent downgrade: if a requested boundary cannot be qualified, the run fails closed rather than quietly dropping to a weaker one."
          />
          <div className="grid gap-4 md:grid-cols-2 mt-8">
            <SurfacePanel>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-base font-semibold text-zinc-100">OpenShell</h3>
                <Badge tone="signal">Execution boundary</Badge>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                The governed execution boundary the agent’s tools run inside. OpenShell
                qualifies a concrete sandbox along a ladder — from a rootless container hardened
                with Landlock and seccomp, up to an own-kernel microVM on nested KVM — and
                refuses to run anything a required boundary class can’t back.
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed font-mono">
                docker-landlock-seccomp → docker-hardened → qualified-microvm
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-base font-semibold text-zinc-100">OpenCell</h3>
                <Badge tone="signal">Effect boundary</Badge>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                The cell control plane. OpenCell gives the agent no network path by default (no
                vNIC) and mediates every outward effect through an authenticated broker: the cell
                can reach only what the envelope allows, each attempt is recorded, and the
                boundary is re-verified against the plan by an independent check — not taken on
                the runtime’s word.
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed font-mono mb-3">
                default-deny egress · authenticated effect broker · verified-against-plan
              </p>
              <a
                href="/products/opencell"
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                OpenCell, on its own &rarr;
              </a>
            </SurfacePanel>
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="The artifact"
            title="A Safety Case you can hand to anyone."
            body="When a security reviewer, an auditor, or a customer asks what your agent was allowed to do and whether the controls actually held, the answer is a file — not a screenshot. The .chpsafety bundle is Ed25519-signed and verifies with no network and no trust in us: it carries the envelope, the governed decisions, the containment observations, the witness, and the Effect-Closure result over the declared material domains. Governed decisions also export to OCSF 1.3.0 for your SIEM."
          />
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="Start today"
            title="The safety capabilities are public."
            body="The governed safety and audit capabilities CHP Safety composes ship as open-source adapters on PyPI. Install them, register them on a host, and in ~30 lines you can screen untrusted content, record every governed invocation as evidence, and verify the evidence chain end-to-end. Screening and tamper-evident evidence run on the public packages today; the OpenShell/OpenCell containment and the full signed Safety Case are what we bring up with you as a design partner."
          />
          <SurfacePanel variant="muted" className="mt-8">
            <pre className="overflow-x-auto text-xs leading-relaxed text-zinc-300 font-mono">
{`pip install 'chp-core[schema]' chp-adapter-safety chp-adapter-audit
python quickstart.py
# benign content   -> allow
# injection attempt -> block
# evidence chain valid: True`}
            </pre>
          </SurfacePanel>
          <div className="flex flex-wrap gap-3 mt-6">
            <ButtonLink href="/quickstart">Run the quickstart</ButtonLink>
            <ButtonLink
              href="https://github.com/capabilityhostprotocol/chp-adapters"
              variant="secondary"
            >
              chp-adapters on GitHub
            </ButtonLink>
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="Where it stands"
            title="A live, offline-verifiable proof — building toward GA with design partners."
            body="The governance spine CHP Safety stands on — governed invocation, approvals, Merkle-chained evidence — is real and in use across CHP today, and the runtime proof (OpenShell/OpenCell containment, independent witnessing, a signed Safety Case) is demonstrated live and end-to-end. External red-team audit and general availability are what we are working toward with a select set of design partners."
          />
        </SectionShell>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Deploy the agent. Keep the proof.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                If you run AI where someone will ask you to prove what it did and that it stayed
                in bounds, we&apos;re selecting design partners now.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/waitlist?product=chp-safety">Become a design partner</ButtonLink>
              <ButtonLink href="/quickstart" variant="secondary">
                Run the quickstart
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
