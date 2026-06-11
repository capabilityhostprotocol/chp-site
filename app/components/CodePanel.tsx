type CodePanelProps = {
  code: string;
  label: string;
  language?: string;
};

export default function CodePanel({ code, label, language }: CodePanelProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)] shadow-[var(--shadow-surface)]">
      <div className="flex min-h-10 items-center justify-between gap-3 border-b border-[color:var(--color-border-subtle)] px-4 py-2">
        <span className="font-mono text-xs text-zinc-500">{label}</span>
        {language && (
          <span className="font-mono text-[11px] uppercase text-zinc-700">
            {language}
          </span>
        )}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}
