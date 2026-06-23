import { MODEL_ADAPTERS_EXAMPLE } from '../lib/content';

const PROVIDERS = [
  {
    name: 'Anthropic Claude',
    capability: 'claude.messages_create',
    tracked: ['input_tokens', 'output_tokens', 'latency_ms', 'finish_reason', 'model'],
    note: 'claude-opus-4-8, claude-sonnet-4-6, claude-haiku-4-5, streaming',
  },
  {
    name: 'OpenAI / Azure',
    capability: 'openai.chat_completions_create',
    tracked: ['input_tokens', 'output_tokens', 'latency_ms', 'finish_reason', 'model'],
    note: 'gpt-4o, o1, Azure OpenAI — same adapter, different base_url',
  },
  {
    name: 'Google Gemini',
    capability: 'gemini.generate_content',
    tracked: ['input_tokens', 'output_tokens', 'latency_ms', 'candidate_count', 'model'],
    note: 'gemini-2.0-flash, gemini-1.5-pro, streaming supported',
  },
];

export default function ModelAdapters() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow tracking-widest mb-3">Model Adapters</p>
      <h2 className="text-lg font-semibold text-zinc-100 mb-2">
        Every LLM call — governed, auditable, and replayable.
      </h2>
      <p className="text-sm text-zinc-400 mb-10 max-w-2xl leading-relaxed">
        Claude, OpenAI, and Gemini adapters wrap each provider&apos;s API as a first-class CHP capability.
        Token counts, latency, finish reasons, and cost attribution are captured automatically
        in evidence — same format, same replay API, regardless of provider.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {PROVIDERS.map((p) => (
          <div key={p.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-zinc-200 mb-1">{p.name}</h3>
            <div className="font-mono text-xs text-zinc-600 mb-3">{p.capability}</div>
            <p className="text-xs text-zinc-600 leading-relaxed mb-3">{p.note}</p>
            <div className="border-t border-zinc-800 pt-3">
              <p className="font-mono text-xs text-zinc-600 mb-1.5">auto-captured</p>
              <div className="flex flex-wrap gap-1">
                {p.tracked.map((field) => (
                  <span
                    key={field}
                    className="font-mono text-xs text-zinc-500 bg-zinc-800/60 rounded px-1.5 py-0.5"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 font-mono text-xs text-zinc-600">model adapters</span>
            </div>
            <pre className="p-5 font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
              <code>{MODEL_ADAPTERS_EXAMPLE}</code>
            </pre>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-zinc-200 mb-2">Tool schema bridge</h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              <code className="font-mono text-zinc-400 text-xs">capability_to_anthropic_tool()</code> and{' '}
              <code className="font-mono text-zinc-400 text-xs">capability_to_openai_tool()</code> convert
              any CHP CapabilityDescriptor to Anthropic or OpenAI tool-call format. Safety hints
              (reversible, destructive, requires_human_review) are injected into the schema.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['capability_to_anthropic_tool', 'capability_to_openai_tool', 'capabilities_to_tool_list'].map((fn) => (
                <span key={fn} className="font-mono text-xs text-zinc-500 bg-zinc-800/60 rounded px-1.5 py-0.5">
                  {fn}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-zinc-200 mb-2">Multi-vendor routing</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              All three providers register on the same host. Switch models mid-execution,
              implement fallbacks, or compare providers — all under one correlation ID with
              unified cost and latency evidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
