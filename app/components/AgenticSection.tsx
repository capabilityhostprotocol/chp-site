import { AGENTIC_EXAMPLE } from '../lib/content';

const FEATURES = [
  {
    title: 'Session management',
    body: 'AgentSession captures every tool call, LLM invocation, and handoff with evidence. chp session tree shows the full parent-child agent call graph.',
    exports: ['AgentSession', 'wrap_tool_call'],
  },
  {
    title: 'Memory',
    body: 'MemoryCapability provides governed key-value memory with scoped evidence. Every read and write is replayable by correlation ID.',
    exports: ['MemoryCapability', 'register_memory_capability'],
  },
  {
    title: 'Planning + Reflection',
    body: 'PlanningContext and ReflectionContext emit plan_created, plan_step_started, reflection_started, and outcome_scored evidence. Agent cognition is auditable.',
    exports: ['PlanningContext', 'ReflectionContext'],
  },
  {
    title: 'Delegation + Autonomy',
    body: 'DelegationContext gives every agent-to-agent handoff explicit lifecycle evidence. AutonomyProfile enforces spend limits and action budgets with approval workflows.',
    exports: ['DelegationContext', 'AutonomyProfile', 'DelegationEnvelope'],
  },
];

export default function AgenticSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow tracking-widest mb-3">Agentic Intelligence</p>
      <h2 className="text-lg font-semibold text-zinc-100 mb-2">
        Make your agent&apos;s reasoning observable.
      </h2>
      <p className="text-sm text-zinc-400 mb-10 max-w-2xl leading-relaxed">
        Sessions, memory, planning, delegation, and autonomy budgets — each emits structured
        evidence. The full cognition trace is replayable, auditable, and exportable to OTel.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-zinc-200 mb-2">{f.title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">{f.body}</p>
            <div className="flex flex-wrap gap-1.5">
              {f.exports.map((exp) => (
                <span
                  key={exp}
                  className="font-mono text-xs text-zinc-500 bg-zinc-800/60 rounded px-1.5 py-0.5"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 font-mono text-xs text-zinc-600">agentic session</span>
        </div>
        <pre className="p-5 font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
          <code>{AGENTIC_EXAMPLE}</code>
        </pre>
      </div>
    </section>
  );
}
