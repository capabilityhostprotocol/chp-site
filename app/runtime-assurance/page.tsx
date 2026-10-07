import type { Metadata } from 'next';
import Nav from '../components/Nav';
import BreadcrumbLd from '../components/BreadcrumbLd';
import SiteFooter from '../components/SiteFooter';
import SectionShell from '../components/SectionShell';
import SectionHeader from '../components/SectionHeader';
import SurfacePanel from '../components/SurfacePanel';
import ButtonLink from '../components/ButtonLink';

export const metadata: Metadata = {
  title: 'Runtime assurance for AI agents - Capability Host Protocol',
  description:
    'Runtime assurance is the discipline of letting an agent reason freely while governing, containing, witnessing, and proving every effect it has. CHP Safety, OpenShell, and OpenCell make it real: control what AI agents can do, and prove the controls held.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/runtime-assurance' },
};

const PATTERN = [
  ['Govern', 'Every action the agent takes passes through the capability contract — risk tier, authorization, approval, invariants. What is out of envelope is denied at the boundary, with a reason, before it runs.'],
  ['Contain', 'Material effects — credentials, egress, the filesystem — are forced down to a real OS boundary, not left to a prompt-level classifier. The cell has no way out it was not granted.'],
  ['Witness', 'Execution is observed by a party that is not the one being watched — up to a separate host, and at the top of the ladder, rooted in hardware attestation.'],
  ['Prove', 'The whole run compiles to a portable, signed Safety Case. An independent verifier re-derives the claims from the evidence — it never trusts the producer’s own say-so.'],
];

const PIECES = [
  {
    href: '/products/chp-safety',
    name: 'CHP Safety',
    tagline: 'The product.',
    body: 'Binds an agent to an explicit Safety Envelope and produces the portable, offline-verifiable Safety Case. The whole pattern — govern, contain, witness, prove — in one contract.',
  },
  {
    href: '/products/opencell',
    name: 'OpenCell',
    tagline: 'The effect boundary.',
    body: 'A governed containment cell: no network path by default, every outward effect brokered against the plan, and the boundary independently re-checked — so containment proves itself.',
  },
  {
    href: '/quickstart',
    name: 'Quickstart',
    tagline: 'Start today.',
    body: 'The governed safety and audit capabilities ship as open-source adapters on PyPI. Install them, screen an action, and verify the evidence chain end-to-end in about thirty lines.',
  },
];

export default function RuntimeAssurancePage() {
  return (
    <div className="min-h-screen">
      <BreadcrumbLd
        items={[
          { name: 'Home', path: '' },
          { name: 'Runtime assurance', path: '/runtime-assurance' },
        ]}
      />
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">Runtime assurance</p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Let the model think. Govern what it can do.
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mb-4">
            Runtime assurance is the discipline of letting an agent reason freely while the
            effect it tries to have is governed, contained, witnessed, and proven. The model is
            allowed to make a bad decision; the unauthorized effect is not allowed to happen —
            and you hold the evidence that it didn&apos;t.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
            <span className="text-zinc-300">Intelligence may propose an effect. Authority
            determines whether it occurs.</span> This is not a claim that a model is intrinsically
            safe. It is a verifiable operational boundary around what an agent was authorized and
            technically able to affect.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <ButtonLink href="/quickstart">Run the quickstart</ButtonLink>
            <ButtonLink href="/products/chp-safety" variant="secondary">
              CHP Safety
            </ButtonLink>
            <ButtonLink href="/design-partners" variant="secondary">
              Become a design partner
            </ButtonLink>
          </div>
        </section>

        <SectionShell border="y">
          <SectionHeader
            eyebrow="The pattern"
            title="Govern. Contain. Witness. Prove."
            body="Four moves turn a capable agent into one you can deploy where someone will later ask you to account for it. None of them depends on trusting the model."
          />
          <div className="grid gap-4 md:grid-cols-2 mt-8">
            {PATTERN.map(([title, body]) => (
              <SurfacePanel key={title}>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
              </SurfacePanel>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="The pieces"
            title="What makes it real."
          />
          <div className="grid gap-4 md:grid-cols-3 mt-8">
            {PIECES.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className="group surface-raised hover-lift p-6 flex flex-col"
              >
                <h3 className="text-lg font-semibold text-zinc-100 mb-1">{p.name}</h3>
                <p className="text-sm font-medium text-zinc-300 mb-2">{p.tagline}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{p.body}</p>
                <span className="mt-5 inline-block text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                  {p.name} &rarr;
                </span>
              </a>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="Where it stands"
            title="A live, offline-verifiable proof — building toward GA with design partners."
            body="The governance spine — governed invocation, approvals, Merkle-chained evidence — is real and in use across CHP today, and the runtime proof (OpenShell/OpenCell containment, independent witnessing, a signed Safety Case) is demonstrated live and end-to-end. External red-team audit and general availability are what we build toward with a select set of design partners."
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
                in bounds, bring a real workflow — we&apos;ll put the assurance around it together.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/design-partners">Become a design partner</ButtonLink>
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
