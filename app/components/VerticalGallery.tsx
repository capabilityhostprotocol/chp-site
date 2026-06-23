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
    status: 'Partner wanted',
  },
  {
    name: 'Legal',
    href: '/industries/legal',
    body: 'Chain of custody for AI-assisted review; privilege as governed decisions.',
    status: 'Partner wanted',
  },
  {
    name: 'Healthcare',
    href: '/industries/healthcare',
    body: 'AI acts, a clinician signs off, both land in one replayable trace.',
    status: 'Partner wanted',
  },
  {
    name: 'Manufacturing',
    href: '/industries/manufacturing',
    body: 'Human and agent commands governed by approval and safety invariants.',
    status: 'Partner wanted',
  },
  {
    name: 'Financial services',
    href: '/industries/financial',
    body: 'Approvals and model-risk checks captured as a replayable evidence bundle.',
    status: 'Partner wanted',
  },
];

export default function VerticalGallery() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
          Across domains
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-3 max-w-3xl">
          One protocol, demonstrated where governance matters.
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-10">
          Software is provable today. The rest are demonstrations of how the same
          primitives would work in your domain — each is an open invitation to
          build it with us.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERTICALS.map((v) => (
            <a
              key={v.name}
              href={v.href}
              className="group border border-zinc-800 bg-zinc-900/70 rounded-lg p-5 flex flex-col hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-base font-semibold text-zinc-100">
                  {v.name}
                </h3>
                <span className="font-mono text-[10px] uppercase text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 whitespace-nowrap">
                  {v.status}
                </span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                {v.body}
              </p>
              <span className="mt-4 text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                {v.status === 'Live' ? 'See it' : 'Build it with us'} -&gt;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
