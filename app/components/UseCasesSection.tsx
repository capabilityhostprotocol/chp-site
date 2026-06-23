export const USE_CASES = [
  {
    title: 'See what an AI agent did',
    body: 'Capture every tool call as replayable, tamper-evident evidence.',
    href: '/govern/agents',
    status: 'Live',
  },
  {
    title: 'Prove why an automated decision happened',
    body: 'Show the reason a claim, credit, or eligibility decision went the way it did.',
    href: '/industries/insurance',
    status: 'Demonstrated',
  },
  {
    title: 'Put a human approval in the record',
    body: 'Make a sign-off, consent, or authorization a first-class, provable event.',
    href: '/govern/human-decisions',
    status: 'Demonstrated',
  },
  {
    title: 'Replay a process across hosts',
    body: 'Reconstruct work that crossed machines, teams, and partners as one trace.',
    href: '/govern/organizations',
    status: 'Demonstrated',
  },
  {
    title: 'Gate a high-risk action',
    body: 'Deny an action at the boundary when policy, entitlement, or a safety check fails.',
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

export default function UseCasesSection() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow mb-3">
              Use cases
            </p>
            <h2 className="display-2 text-zinc-100 max-w-3xl">
              What people use it for.
            </h2>
          </div>
          <a
            href="/use-cases"
            className="hidden sm:inline text-sm text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap"
          >
            All use cases -&gt;
          </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map((u) => (
            <a
              key={u.title}
              href={u.href}
              className="group border border-zinc-800/80 bg-zinc-900/50 rounded-xl p-5 flex flex-col hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-semibold text-zinc-100">
                  {u.title}
                </h3>
                <span className="font-mono text-[10px] uppercase text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 whitespace-nowrap">
                  {u.status}
                </span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                {u.body}
              </p>
              <span className="mt-4 text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                {u.status === 'Live' ? 'See it' : 'How it would work'} -&gt;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
