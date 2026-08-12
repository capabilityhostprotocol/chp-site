import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import WaitlistForm from '../components/WaitlistForm';

export const metadata: Metadata = {
  title: 'Design partners - Capability Host Protocol',
  description:
    'Build the governance and evidence layer for your domain with us. CHP is an open protocol; design partners shape what we build next for agents, insurance, healthcare, manufacturing, legal, and financial work.',
};

const PROVEN_TODAY = [
  'Tamper-evident, SHA256-chained evidence for every action — local, no backend.',
  'Replay any session by correlation ID across parent and child agents.',
  'Structured denials: an action blocked by policy is a first-class outcome, not an exception.',
  'Zero-friction capture for AI agents: chp hooks install, no application code changes.',
];

const BUILD_TOGETHER = [
  'Hosted evidence retention and multi-host trace stitching.',
  'Role-based access and team workspaces over the evidence store.',
  'Domain invariant libraries (clinical sign-off, privilege, claims adjudication).',
  'Compliance and audit export shaped to your regulator and your workflow.',
];

const VERTICALS = [
  {
    name: 'AI-native software',
    status: 'Live',
    prove:
      'Make every agent action provable and replayable — and unblock the security review that is holding your launch.',
    gap: 'This one already works. Bring a real agent workflow and we will instrument it with you.',
  },
  {
    name: 'Insurance',
    status: 'Design partners',
    prove:
      'Turn automated approve / deny decisions into a provable record of why — defensible in a dispute and to a regulator.',
    gap: 'Denial records map almost 1:1 onto the protocol. We build retention and audit export around your claims flow.',
  },
  {
    name: 'Legal',
    status: 'Design partners',
    prove:
      'A defensible chain of custody for AI-assisted review, with privilege decisions captured as governed approve / deny events.',
    gap: 'Tamper-evident chaining is the protocol primitive. We build matter-level retention and access with you.',
  },
  {
    name: 'Healthcare operations',
    status: 'Design partners',
    prove:
      'AI acts on records; a clinician signs off; both land in one replayable trace with the approval attached.',
    gap: 'We build the access controls and retention an audit actually requires, around a real clinical workflow.',
  },
  {
    name: 'Manufacturing & industrial',
    status: 'Design partners',
    prove:
      'Dispatch and machine commands — issued by humans and agents alike — governed by approval and safety invariants, with edge hosts stitched into one trace.',
    gap: 'Real-time control stays out of scope. We prove the governance and evidence layer above it with you.',
  },
  {
    name: 'Financial services',
    status: 'Design partners',
    prove:
      'Approvals, model-risk checks, and AI-in-the-workflow captured as an evidence bundle a reviewer can replay.',
    gap: 'We build the compliance export and controls your risk function needs, on top of the provable core.',
  },
];

export default function DesignPartnersPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow mb-4">
            Design partners
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Build the governance layer for your domain with us.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-4">
            CHP is an open protocol. The core — declared capabilities,
            tamper-evident evidence, replay, and structured denials — is real and
            usable today. The production trust layer for regulated work is what we
            build next, with the partners who feel the pain first.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
            We build the production trust layer for your domain with you — on
            primitives that are real today. That is what this program is for.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="#apply"
              data-event="design_partner_contact"
              data-event-label="design_partners"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors"
            >
              Apply to be a design partner
            </a>
            <a
              href="/govern/agents"
              className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
            >
              See the proof that works today
            </a>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="surface-raised p-6">
              <p className="font-mono text-xs text-emerald-400/80 uppercase mb-4">
                Provable today
              </p>
              <ul className="space-y-3">
                {PROVEN_TODAY.map((item) => (
                  <li key={item} className="text-sm text-zinc-300 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-zinc-800 bg-zinc-950/70 rounded-lg p-6">
              <p className="eyebrow mb-4">
                What we build with design partners
              </p>
              <ul className="space-y-3">
                {BUILD_TOGETHER.map((item) => (
                  <li key={item} className="text-sm text-zinc-400 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="eyebrow mb-3">
            Where we are looking for partners
          </p>
          <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
            Pick the workflow to prove with us.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl mb-10">
            Each of these builds on primitives that are real today — declared
            authority, governed invocation, evidence. The gap we close together is
            the invitation.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {VERTICALS.map((v) => (
              <div
                key={v.name}
                className="surface-raised p-5 flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-zinc-100">{v.name}</h3>
                  <span className="font-mono text-[10px] uppercase text-zinc-400 border border-zinc-700 rounded px-2 py-1 whitespace-nowrap">
                    {v.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                  {v.prove}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed mt-auto">
                  {v.gap}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="apply" className="max-w-2xl mx-auto px-6 pb-24 scroll-mt-20">
          <p className="eyebrow mb-3">Apply</p>
          <h2 className="display-2 text-zinc-50 mb-3">
            Build the governance layer for your domain with us.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed mb-8">
            Tell us the workflow that needs a provable record of what people, agents,
            and systems did. If the protocol fits, we&apos;ll map it with you.
          </p>
          <WaitlistForm product="design-partner" designPartner />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
