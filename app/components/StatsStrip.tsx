const TRUST_ITEMS = [
  {
    label: 'chp-core 0.41.0',
    href: 'https://github.com/capabilityhostprotocol/chp-core/blob/main/packages/python/pyproject.toml',
  },
  {
    label: 'Spec v0.9.2 RC',
    href: 'https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.2.md',
  },
  {
    label: 'Schemas',
    href: 'https://github.com/capabilityhostprotocol/chp-core/tree/main/schemas',
  },
  {
    label: 'Reference host',
    href: 'https://github.com/capabilityhostprotocol/chp-core/tree/main/packages/python/chp_core',
  },
  {
    label: 'Conformance',
    href: '/conformance',
  },
  {
    label: 'Apache-2.0',
    href: 'https://github.com/capabilityhostprotocol/chp-core/blob/main/LICENSE',
  },
];

export default function StatsStrip() {
  return (
    <section className="bg-[color:var(--color-surface-900)]/45">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-mono text-xs text-zinc-400 uppercase">
            Implementation proof
          </span>
          {TRUST_ITEMS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-mono text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
