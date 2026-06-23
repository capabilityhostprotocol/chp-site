const LINKS = [
  {
    label: 'How it works',
    body: 'The mechanics — capability, contract, guarantees, evidence.',
    href: '/how-it-works',
  },
  {
    label: 'Protocol surface',
    body: 'The formal contract: descriptors, invocation, lifecycle, replay.',
    href: '/protocol',
  },
  {
    label: 'Conformance',
    body: 'The nine checks an independent host must pass.',
    href: '/conformance',
  },
  {
    label: 'Documentation',
    body: 'Concepts, quickstarts, the spec, schemas, and the registry.',
    href: 'https://docs.capabilityhostprotocol.com',
  },
];

export default function GoDeeper() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-mono text-xs text-zinc-500 uppercase mb-8">
          Go deeper
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group border border-zinc-800 bg-zinc-900/70 rounded-lg p-5 flex flex-col hover:border-zinc-600 transition-colors"
            >
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                {l.label}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                {l.body}
              </p>
              <span className="mt-4 text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                Read -&gt;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
