import type { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  body?: string;
  action?: ReactNode;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  body,
  action,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${className}`}
    >
      <div>
        <p className="mb-3 font-mono text-xs uppercase text-zinc-500">
          {eyebrow}
        </p>
        <h2 className="mb-3 text-3xl font-semibold text-zinc-100">{title}</h2>
        {body && (
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
            {body}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
