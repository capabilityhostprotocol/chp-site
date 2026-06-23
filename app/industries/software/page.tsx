import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import CodePanel from '../../components/CodePanel';
import { EVIDENCE_OUTPUT } from '../../lib/content';

export const metadata: Metadata = {
  title: 'AI-native software - Capability Host Protocol',
  description:
    'Your agent shipped. Now prove what it did. CHP gives platform and AI engineering teams replayable, tamper-evident evidence of every agent action — the answer to the security review that blocks the launch.',
};

const FLOW = [
  {
    step: 'The pain',
    body: 'You put an agent into a real workflow. It reads files, runs commands, calls tools, makes changes. When something goes wrong — or before it ships — someone asks what it actually did. Logs are scattered, partial, and not trustworthy as a record.',
  },
  {
    step: 'The trigger',
    body: 'A security or platform review gates the launch: “How do we know what the agent did, and that it was permitted to do it?” Today there is no clean answer, so the rollout stalls.',
  },
  {
    step: 'Who owns it',
    body: 'The platform or AI engineering lead shipping the agent — and the security reviewer who has to sign off. Both need the same thing: a replayable, trustworthy record.',
  },
  {
    step: 'What CHP does',
    body: 'chp hooks install captures every tool call as a typed, SHA256-chained evidence event. Replay any session by ID, see denials as first-class outcomes, and export the whole trace to your existing observability stack.',
  },
];

// Body copy uses real Unicode punctuation so it renders as plain text.

export default function SoftwareIndustryPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="eyebrow mb-4">
            Industries · AI-native software
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Your agent shipped. Now prove what it did.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            This is the one vertical where CHP is demonstrable today, not
            aspirational. If a review is blocking your agent rollout on
            &ldquo;we can&apos;t show what it did,&rdquo; this closes the gap in
            one command.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-y border-zinc-800/60">
          <div className="grid md:grid-cols-2 gap-4">
            {FLOW.map((f) => (
              <div
                key={f.step}
                className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6"
              >
                <p className="eyebrow mb-3">
                  {f.step}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div>
              <p className="eyebrow mb-3">
                The demonstrated trace
              </p>
              <h2 className="display-2 text-zinc-100 mb-4">
                One agent action, as evidence.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Every captured tool call produces a record like this: stable
                capability ID and version, the host, the correlation that ties it
                to the session, an explicit outcome, and an assurance level. It is
                queryable and replayable — the thing a reviewer can actually
                trust.
              </p>
              <a
                href="/govern/agents"
                className="text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
              >
                See how the capture works -&gt;
              </a>
            </div>
            <CodePanel
              code={EVIDENCE_OUTPUT}
              label="evidence event"
              language="json"
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
          <div className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Unblock the review this week.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                Install the hooks against a real agent session, replay it, and
                hand the reviewer a record they can verify. If you want hosted
                retention or team access on top, that is what we build with design
                partners.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/quickstart"
                className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
              >
                Quickstart
              </a>
              <a
                href="/design-partners"
                className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors whitespace-nowrap"
              >
                Talk to us
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
