import { HOOKS_INSTALL, HOOKS_INSPECT } from '../lib/content';

const AGENTS = [
  { name: 'Claude Code',  id: 'claude_code.*',  note: 'Bash, Read, Edit, Write, WebFetch, MCP…' },
  { name: 'Codex CLI',    id: 'codex.*',         note: 'shell, read, edit, write, web_search…' },
  { name: 'Gemini CLI',   id: 'gemini_cli.*',    note: 'shell, file I/O, notebook, MCP…' },
];

export default function ZeroFrictionAdoption() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow tracking-widest mb-3">Zero-friction adoption</p>
      <h2 className="text-lg font-semibold text-zinc-100 mb-2">
        One command. Every agent tool call becomes evidence.
      </h2>
      <p className="text-sm text-zinc-400 mb-10 max-w-2xl leading-relaxed">
        <code className="font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 text-xs">chp hooks install</code>{' '}
        intercepts Claude Code, Codex CLI, and Gemini CLI tool calls without any application
        code changes. Every Bash, Read, Edit, and WebFetch becomes a governed, replayable
        CHP capability stored in <code className="font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 text-xs">~/.chp/evidence.sqlite</code>.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Agent coverage */}
        <div className="space-y-3">
          {AGENTS.map((agent) => (
            <div key={agent.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-zinc-200">{agent.name}</span>
                  <span className="font-mono text-xs text-zinc-400 bg-zinc-800 rounded px-1.5 py-0.5">{agent.id}</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">{agent.note}</p>
              </div>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-800/60 rounded px-1.5 py-0.5 whitespace-nowrap flex-shrink-0">
                hooked
              </span>
            </div>
          ))}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Hooks run as pre-tool and post-tool shell scripts. Pre-tool applies policy gates
              (block / warn / audit). Post-tool writes evidence. Neither modifies agent behavior
              or adds latency to the critical path.
            </p>
          </div>
        </div>

        {/* Code blocks */}
        <div className="space-y-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="ml-2 font-mono text-xs text-zinc-400">terminal</span>
            </div>
            <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
              <code>{HOOKS_INSTALL}</code>
            </pre>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="ml-2 font-mono text-xs text-zinc-400">session tree</span>
            </div>
            <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
              <code>{HOOKS_INSPECT}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
