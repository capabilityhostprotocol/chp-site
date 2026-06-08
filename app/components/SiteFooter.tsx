export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800/60 py-8 px-6 mt-4">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-600">
        <span>Capability Host Protocol v0.6.3</span>
        <div className="flex gap-6">
          <a
            href="https://github.com/capabilityhostprotocol/chp-core"
            className="hover:text-zinc-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/spec/chp-v0.1.md"
            className="hover:text-zinc-400 transition-colors"
          >
            Spec
          </a>
          <a
            href="/quickstart"
            className="hover:text-zinc-400 transition-colors"
          >
            Quickstart
          </a>
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/docs/roadmap.md"
            className="hover:text-zinc-400 transition-colors"
          >
            Roadmap
          </a>
          <a
            href="https://github.com/capabilityhostprotocol/chp-core/blob/main/LICENSE"
            className="hover:text-zinc-400 transition-colors"
          >
            Apache-2.0
          </a>
        </div>
      </div>
    </footer>
  );
}
