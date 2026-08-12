import FieldMotif from './FieldMotif';
import CodeCopyButton from './CodeCopyButton';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-border-subtle)]">
      <div aria-hidden="true" className="absolute inset-0 opacity-60">
        <FieldMotif />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(161,161,170,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.25)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-28">
        <p className="eyebrow mb-6 rise">
          Capability Host Protocol · a governed boundary for what agents can do
        </p>
        <h1 className="display-1 text-zinc-50 mb-8 max-w-4xl rise">
          Govern what your agents can actually do.
        </h1>
        <p className="lede max-w-2xl mb-5 rise-2">
          Your agent reads files, runs commands, calls tools. CHP puts a governed
          boundary at the point of action — every capability declared, every
          invocation allowed or denied against policy, every result captured as
          replayable, tamper-evident evidence.{' '}
          <span className="text-zinc-100">
            One command, no application code changes.
          </span>
        </p>
        <p className="max-w-2xl mb-10 text-sm text-zinc-400 rise-2">
          For anyone who has to control what their AI can do — and prove what it
          did — to a security review, an auditor, a regulator, or a customer.{' '}
          <a
            href="/glossary"
            className="underline underline-offset-4 hover:text-zinc-100 transition-colors"
          >
            New to capability, invocation, evidence?
          </a>
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-5 rise-2">
          <a
            href="/govern/agents"
            data-event="see_agents"
            data-event-label="hero"
            className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-5 py-3 text-sm font-medium hover:bg-white transition-colors"
          >
            See what your agents did
          </a>
          <a
            href="/design-partners"
            data-event="design_partner"
            data-event-label="hero"
            className="border border-zinc-700 rounded-lg px-5 py-3 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
          >
            Build a vertical with us
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rise-2">
          <span className="font-mono text-sm text-zinc-400 select-all whitespace-pre">
            {'$ pip install chp-core\n$ chp hooks install'}
          </span>
          <CodeCopyButton
            code={'pip install chp-core\nchp hooks install'}
            label="install commands"
          />
          <a
            href="/quickstart"
            data-event="quickstart"
            data-event-label="hero"
            className="text-sm text-zinc-400 underline underline-offset-4 hover:text-zinc-100 transition-colors"
          >
            Full quickstart →
          </a>
        </div>
      </div>
    </section>
  );
}
