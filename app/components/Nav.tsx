export default function Nav() {
  const navItems = [
    ['What is CHP?', '/protocol'],
    ['How it works', '/examples'],
    ['Who uses it', '/implementers'],
    ['Architecture', '/protocol'],
    ['Developers', '/docs'],
    [
      'White paper',
      'https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/why-chp.md',
    ],
  ];

  return (
    <nav className="border-b border-[color:var(--color-border-subtle)] px-6 py-4 bg-[color:var(--color-field-980)]/95">
      <div className="max-w-6xl mx-auto flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <a href="/" className="min-w-0">
          <span className="font-semibold text-sm text-zinc-100 sm:hidden">
            CHP
          </span>
          <span className="hidden sm:inline font-semibold text-sm text-zinc-100">
            Capability Host Protocol
          </span>
          <span className="ml-2 font-mono text-xs text-zinc-600">v0.7.0</span>
        </a>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-500">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="hover:text-zinc-200 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="/quickstart"
            className="rounded-md border border-[color:var(--color-border-strong)] px-3 py-1.5 text-zinc-300 hover:border-[color:var(--color-capability-active)] hover:text-zinc-50 transition-colors"
          >
            Map your first capability
          </a>
        </div>
      </div>
    </nav>
  );
}
