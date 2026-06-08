export default function Nav() {
  return (
    <nav className="border-b border-zinc-800/60 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="font-mono text-sm text-zinc-300 tracking-tight">
          chp<span className="text-zinc-600">·</span>v0.6.3
        </span>
        <div className="flex items-center gap-5 text-sm text-zinc-500">
          <a
            href="https://github.com/capabilityhostprotocol/chp-core"
            className="hover:text-zinc-200 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md"
            className="hover:text-zinc-200 transition-colors"
          >
            Spec
          </a>
          <a
            href="/quickstart"
            className="hover:text-zinc-200 transition-colors"
          >
            Quickstart
          </a>
        </div>
      </div>
    </nav>
  );
}
