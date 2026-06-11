export default function Nav() {
  return (
    <nav className="border-b border-zinc-800/60 px-6 py-4 bg-zinc-950/90">
      <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a href="/" className="min-w-0">
          <span className="font-semibold text-sm text-zinc-100 sm:hidden">
            CHP
          </span>
          <span className="hidden sm:inline font-semibold text-sm text-zinc-100">
            Capability Host Protocol
          </span>
          <span className="ml-2 font-mono text-xs text-zinc-600">v0.6.3</span>
        </a>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-500">
          <a
            href="/protocol"
            className="hover:text-zinc-200 transition-colors"
          >
            Protocol
          </a>
          <a
            href="/docs"
            className="hover:text-zinc-200 transition-colors"
          >
            Docs
          </a>
          <a
            href="/examples"
            className="hover:text-zinc-200 transition-colors"
          >
            Examples
          </a>
          <a
            href="/implementers"
            className="hover:text-zinc-200 transition-colors"
          >
            Implementers
          </a>
          <a
            href="/conformance"
            className="hover:text-zinc-200 transition-colors"
          >
            Conformance
          </a>
          <a
            href="/quickstart"
            className="hover:text-zinc-200 transition-colors"
          >
            Quickstart
          </a>
          <a
            href="https://github.com/capabilityhostprotocol/chp-core"
            className="hover:text-zinc-200 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
