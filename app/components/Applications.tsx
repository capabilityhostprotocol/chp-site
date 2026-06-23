// Consolidates the former LaneFork (four govern lanes) and UseCasesSection
// (six use cases) into one applications-first band. Every govern lane is
// represented, so /govern/* remains fully linked from the homepage.
export const APPLICATIONS = [
  {
    title: 'See what an AI agent did',
    body: 'Capture every tool call as replayable, tamper-evident evidence, and unblock the security review.',
    href: '/govern/agents',
    status: 'Live',
  },
  {
    title: 'Put a human approval in the record',
    body: 'Make a sign-off, consent, or authorization a first-class, provable event — not a side note.',
    href: '/govern/human-decisions',
    status: 'Demonstrated',
  },
  {
    title: 'Prove why an automated decision happened',
    body: 'Show the reason a claim, credit, or eligibility decision went the way it did.',
    href: '/industries/insurance',
    status: 'Demonstrated',
  },
  {
    title: 'Replay a process across hosts and orgs',
    body: 'Reconstruct work that crossed machines, teams, and partners as one correlated trace.',
    href: '/govern/organizations',
    status: 'Demonstrated',
  },
  {
    title: 'Gate a high-risk action at the boundary',
    body: 'Deny an action when policy, entitlement, or a safety check fails — recorded, not swallowed.',
    href: '/industries/financial',
    status: 'Demonstrated',
  },
  {
    title: 'Expose a product capability safely',
    body: 'Turn an API or service into a governed, discoverable, provable boundary.',
    href: '/govern/products',
    status: 'Demonstrated',
  },
];

export default function Applications() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="band">
        <p className="eyebrow mb-4">Applications</p>
        <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
          What people use it for.
        </h2>
        <p className="lede max-w-2xl mb-12 text-zinc-400">
          The same evidence contract covers all of these — a human approval and
          an agent&apos;s action are the same kind of governed, provable event.
          Agents are where it is easiest to start.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {APPLICATIONS.map((u) => (
            <a
              key={u.title}
              href={u.href}
              className="group border border-zinc-800 bg-zinc-900/60 rounded-xl p-7 flex flex-col hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-xl font-semibold text-zinc-100 leading-snug">
                  {u.title}
                </h3>
                <span className="font-mono text-[10px] uppercase text-zinc-400 border border-zinc-800 rounded px-1.5 py-0.5 whitespace-nowrap mt-1">
                  {u.status}
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                {u.body}
              </p>
              <span className="mt-6 text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                {u.status === 'Live' ? 'See it' : 'How it would work'} -&gt;
              </span>
            </a>
          ))}
        </div>
        <a
          href="/use-cases"
          className="inline-block mt-8 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          All use cases -&gt;
        </a>
      </div>
    </section>
  );
}
