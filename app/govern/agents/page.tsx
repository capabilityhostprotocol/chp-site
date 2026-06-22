import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import CodePanel from '../../components/CodePanel';
import { HOOKS_INSTALL, HOOKS_INSPECT } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Govern your agents - Capability Host Protocol',
  description:
    'See exactly what your AI agents did. One command captures every tool call as replayable, tamper-evident evidence — Claude Code, Codex, or Gemini CLI, no application code changes.',
};

const GUARANTEES = [
  {
    title: 'Every tool call, captured',
    body: 'Bash, Read, Edit, Write, WebFetch — each agent action becomes a typed evidence event, automatically.',
  },
  {
    title: 'Replay by session',
    body: 'Walk the full event tree across parent and child agents, in order, after the fact.',
  },
  {
    title: 'Denials are first-class',
    body: 'A command blocked by policy is recorded as execution_denied — not swallowed as an exception.',
  },
  {
    title: 'Tamper-evident',
    body: 'Events are SHA256 hash-chained, so a missing or altered record is detectable.',
  },
  {
    title: 'Export anywhere',
    body: 'Emit any session to an OTLP collector with chp session otel — your existing observability still works.',
  },
  {
    title: 'Local, no backend',
    body: 'Evidence is stored in SQLite under ~/.chp. Nothing leaves the machine unless you send it.',
  },
];

export default function GovernAgentsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-4">
            Govern · Agents
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-50 mb-6 max-w-4xl">
            See exactly what your agents did.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-4">
            This is the boundary where CHP is already real. One command hooks your
            agent CLI and records every tool call as replayable, tamper-evident
            evidence — no application code changes, no backend.
          </p>
          <p className="text-base text-zinc-500 leading-relaxed max-w-3xl">
            When a security review asks &ldquo;how do you know what the agent did,
            and that it was allowed to?&rdquo; — this is the answer you can run
            today.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-y border-zinc-800/60">
          <div className="grid lg:grid-cols-2 gap-4">
            <CodePanel
              code={HOOKS_INSTALL}
              label="Install — one command"
              language="bash"
            />
            <CodePanel
              code={HOOKS_INSPECT}
              label="Inspect — replay any session"
              language="bash"
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
            What you get
          </p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-10 max-w-3xl">
            Observability that is also evidence.
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {GUARANTEES.map((g) => (
              <div
                key={g.title}
                className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-5"
              >
                <h3 className="text-base font-semibold text-zinc-100 mb-2">
                  {g.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60">
          <div className="border border-zinc-800 bg-zinc-900/70 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Same protocol, every other layer.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                A human approval, a product API call, and an agent&apos;s bash
                command are the same kind of governed, provable event. Agents are
                where it is easiest to start — bring a regulated workflow and we
                will build the rest with you.
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
                Build a vertical with us
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
