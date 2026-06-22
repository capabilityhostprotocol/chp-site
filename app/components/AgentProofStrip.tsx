import CodePanel from './CodePanel';
import { HOOKS_INSTALL } from '../lib/content';

const POINTS = [
  'Every tool call — Bash, Read, Edit, Write — captured as a typed evidence event.',
  'Replay any session by ID; denials are first-class, not swallowed exceptions.',
  'SHA256 hash-chained and local. Export to any OTLP collector when you want.',
];

export default function AgentProofStrip() {
  return (
    <section className="border-b border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
          Start where the proof is real
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-8 max-w-3xl">
          See exactly what your agents did — in one command.
        </h2>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
          <CodePanel code={HOOKS_INSTALL} label="chp hooks install" language="bash" />
          <div>
            <ul className="space-y-3 mb-6">
              {POINTS.map((p) => (
                <li key={p} className="text-sm text-zinc-400 leading-relaxed">
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="/govern/agents"
              className="text-sm text-zinc-200 hover:text-zinc-50 transition-colors"
            >
              How agent governance works -&gt;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
