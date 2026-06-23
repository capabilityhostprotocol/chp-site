import Badge from './Badge';
import CodeCopyButton from './CodeCopyButton';
import SurfacePanel from './SurfacePanel';
import { displayName, type Adapter } from '../lib/adapters';

const STATUS_TONE = {
  certified: 'approved',
  experimental: 'required',
} as const;

export default function AdapterCard({ adapter }: { adapter: Adapter }) {
  const install = `pip install ${adapter.pypi}`;
  const name = displayName(adapter.id);

  return (
    <SurfacePanel variant="default" className="flex flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-mono text-base font-semibold text-zinc-100">{name}</h3>
        <Badge tone={STATUS_TONE[adapter.status]}>{adapter.status}</Badge>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-zinc-400">
        {adapter.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-400">
          {adapter.category}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-field)]/70 px-3 py-2">
        <code className="flex-1 truncate font-mono text-[11px] text-zinc-300">
          {install}
        </code>
        <CodeCopyButton code={install} label={`${name} install command`} />
      </div>

      <a
        href={`/adapters/${adapter.id.replace(/^chp-adapter-/, '')}`}
        className="mt-3 inline-block text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        View capabilities →
      </a>
    </SurfacePanel>
  );
}
