const LINKS = [
  {
    label: 'How it works',
    body: 'The mechanics — capability, contract, guarantees, evidence.',
    href: '/how-it-works',
  },
  {
    label: 'Writing',
    body: 'Essays on evidence, the capability boundary, and each vertical.',
    href: '/blog',
  },
  {
    label: 'Protocol surface',
    body: 'The formal contract: descriptors, invocation, lifecycle, replay.',
    href: '/protocol',
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
      <div className="band">
        <p className="eyebrow mb-10">Go deeper</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group surface-raised hover-lift p-5 flex flex-col hover:border-zinc-600 transition-colors"
            >
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                {l.label}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                {l.body}
              </p>
              <span className="mt-4 text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                Read →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
