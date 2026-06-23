import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Design partners - Capability Host Protocol',
  description:
    'Build the governance and evidence layer for your domain with us. CHP is an early, open protocol; design partners shape what gets built next for agents, insurance, healthcare, manufacturing, legal, and financial work.',
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
    status: 'Demonstrable today',
    prove:
      'Make every agent action provable and replayable — and unblock the security review that is holding your launch.',
    gap: 'This one already works. Bring a real agent workflow and we will instrument it with you.',
  },
  {
    name: 'Insurance',
    status: 'Design partner wanted',
    prove:
      'Turn automated approve / deny decisions into a provable record of why — defensible in a dispute and to a regulator.',
    gap: 'Denial records map almost 1:1 onto the protocol. We would build retention and audit export around your claims flow.',
  },
  {
    name: 'Legal',
    status: 'Design partner wanted',
    prove:
      'A defensible chain of custody for AI-assisted review, with privilege decisions captured as governed approve / deny events.',
    gap: 'Tamper-evident chaining is the protocol primitive. We would build matter-level retention and access with you.',
  },
  {
    name: 'Healthcare operations',
    status: 'Design partner wanted',
    prove:
      'AI acts on records; a clinician signs off; both land in one replayable trace with the approval attached.',
    gap: 'We would build the access controls and retention an audit actually requires, around a real clinical workflow.',
  },
  {
    name: 'Manufacturing & industrial',
    status: 'Design partner wanted',
    prove:
      'Dispatch and machine commands — issued by humans and agents alike — governed by approval and safety invariants, with edge hosts stitched into one trace.',
    gap: 'Real-time control stays out of scope. We would prove the governance and evidence layer above it with you.',
  },
  {
    name: 'Financial services',
    status: 'Design partner wanted',
    prove:
      'Approvals, model-risk checks, and AI-in-the-workflow captured as an evidence bundle a reviewer can replay.',
    gap: 'We would build the compliance export and controls your risk function needs, on top of the provable core.',
  },
];

export default function DesignPartnersPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-4">
            Design partners
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-50 mb-6 max-w-4xl">
            Build the governance layer for your domain with us.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-4">
            CHP is an early, open protocol. The core — declared capabilities,
            tamper-evident evidence, replay, and structured denials — is real and
            usable today. The production trust layer for regulated work is what we
            build next, with the partners who feel the pain first.
          </p>
          <p className="text-base text-zinc-500 leading-relaxed max-w-3xl">
            We would rather show you exactly how it would work in your domain than
            claim it already does. That is what this program is for.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="mailto:partners@capabilityhostprotocol.com?subject=CHP%20design%20partner"
              data-event="design_partner_contact"
              data-event-label="design_partners"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors"
            >
              Start a conversation
            </a>
            <a
              href="/govern/agents"
              className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
            >
              See the proof that works today
            </a>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-y border-zinc-800/60">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6">
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
              <p className="font-mono text-xs text-zinc-500 uppercase mb-4">
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

        <section className="max-w-6xl mx-auto px-6 py-16">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
            Where we are looking for partners
          </p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-4 max-w-3xl">
            Pick the workflow you would prove with us.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-10">
            Each of these is a demonstration of how the protocol would work in a
            domain — grounded in primitives that exist today. The honest gap in
            each is the invitation.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {VERTICALS.map((v) => (
              <div
                key={v.name}
                className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-5 flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-zinc-100">{v.name}</h3>
                  <span className="font-mono text-[10px] uppercase text-zinc-500 border border-zinc-700 rounded px-2 py-1 whitespace-nowrap">
                    {v.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                  {v.prove}
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed mt-auto">
                  {v.gap}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Don&apos;t see your domain?
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                If your work needs a provable record of what people, agents, and
                systems did, the protocol probably fits. Tell us the workflow and
                we will show you how it would map.
              </p>
            </div>
            <a
              href="mailto:partners@capabilityhostprotocol.com?subject=CHP%20design%20partner"
              data-event="design_partner_contact"
              data-event-label="design_partners"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              Start a conversation
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
