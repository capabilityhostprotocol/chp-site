const VERTICALS = [
  {
    name: 'AI-native software',
    href: '/industries/software',
    body: 'Prove what your agent did and unblock the security review.',
    status: 'Live',
  },
  {
    name: 'Insurance',
    href: '/industries/insurance',
    body: 'A provable record of why an automated claim decision went the way it did.',
    status: 'Design partners',
  },
  {
    name: 'Legal',
    href: '/industries/legal',
    body: 'Chain of custody for AI-assisted review; privilege as governed decisions.',
    status: 'Design partners',
  },
  {
    name: 'Healthcare',
    href: '/industries/healthcare',
    body: 'AI acts, a clinician signs off, both land in one replayable trace.',
    status: 'Design partners',
  },
  {
    name: 'Manufacturing',
    href: '/industries/manufacturing',
    body: 'Human and agent commands governed by approval and safety invariants.',
    status: 'Design partners',
  },
  {
    name: 'Financial services',
    href: '/industries/financial',
    body: 'Approvals and model-risk checks captured as a replayable evidence bundle.',
    status: 'Design partners',
  },
];

export default function VerticalGallery() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="band">
        <p className="eyebrow mb-4">By industry</p>
        <h2 className="display-2 text-zinc-100 mb-4 max-w-3xl">
          Where governance matters most.
        </h2>
        <p className="lede max-w-2xl mb-12 text-zinc-400">
          Software is live today. The same primitives — declared authority, governed
          invocation, tamper-evident evidence — carry into every regulated domain, and
          we build each vertical with design partners.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERTICALS.map((v) => (
            <a
              key={v.name}
              href={v.href}
              className="group surface-raised hover-lift p-5 flex flex-col hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-base font-semibold text-zinc-100">
                  {v.name}
                </h3>
                <span className="font-mono text-[10px] uppercase text-zinc-400 border border-zinc-800 rounded px-1.5 py-0.5 whitespace-nowrap">
                  {v.status}
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                {v.body}
              </p>
              <span className="mt-4 text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                {v.status === 'Live' ? 'See it' : 'Build it with us'} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
