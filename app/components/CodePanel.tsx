import CodeCopyButton from './CodeCopyButton';

type CodePanelProps = {
  code: string;
  label: string;
  language?: string;
  showLineNumbers?: boolean;
};

export default function CodePanel({
  code,
  label,
  language,
  showLineNumbers = false,
}: CodePanelProps) {
  const lines = code.split('\n');

  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)] shadow-[var(--shadow-surface)]">
      <div className="flex min-h-10 min-w-0 items-center justify-between gap-3 border-b border-[color:var(--color-border-subtle)] px-4 py-2">
        <span className="min-w-0 break-words font-mono text-xs text-zinc-400">
          {label}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          {language && (
            <span className="font-mono text-[11px] uppercase text-zinc-400">
              {language}
            </span>
          )}
          <CodeCopyButton code={code} label={label} />
        </div>
      </div>
      {showLineNumbers ? (
        <pre className="min-w-0 overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-300">
          <code>
            {lines.map((line, index) => (
              <span key={`${index}-${line}`} className="block min-w-max">
                <span
                  aria-hidden="true"
                  className="inline-block w-8 select-none pr-4 text-right text-xs text-zinc-500"
                >
                  {index + 1}
                </span>
                <span className="whitespace-pre">{line || ' '}</span>
              </span>
            ))}
          </code>
        </pre>
      ) : (
        <pre className="min-w-0 overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-300">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
