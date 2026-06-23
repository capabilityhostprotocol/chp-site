import type { ReactNode } from 'react';

export type CompareColumn = { label: string; sub?: string; accent?: boolean };
export type CompareRow = { dimension: string; cells: ReactNode[] };

/**
 * CompareTable — a visual side-by-side comparison. The strongest aid for the
 * comparison content that currently reads as walls of prose (telemetry vs
 * evidence; the 3-layer stack; CHP vs MCP vs OpenAPI). One column can be
 * `accent` to mark "the CHP answer".
 *
 * Renders a real table on >=sm and a stacked, per-dimension layout on mobile.
 */
export default function CompareTable({
  columns,
  rows,
  caption,
}: {
  columns: CompareColumn[];
  rows: CompareRow[];
  caption?: ReactNode;
}) {
  const accentIdx = columns.findIndex((c) => c.accent);
  const gridCols = `minmax(0,0.8fr) ${columns
    .map(() => 'minmax(0,1fr)')
    .join(' ')}`;

  return (
    <figure className="my-10">
      {/* Desktop / tablet: grid table */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-zinc-800/80">
        <div
          className="grid"
          style={{ gridTemplateColumns: gridCols }}
          role="table"
        >
          {/* header */}
          <div role="row" className="contents">
            <div className="bg-zinc-900/60 px-4 py-3" />
            {columns.map((c) => (
              <div
                key={c.label}
                role="columnheader"
                className={`px-4 py-3 border-l border-zinc-800/80 ${
                  c.accent
                    ? 'bg-[color:var(--color-signal-cyan)]/[0.06] border-t-2 border-t-[color:var(--color-signal-cyan)]'
                    : 'bg-zinc-900/60'
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    c.accent ? 'text-zinc-50' : 'text-zinc-200'
                  }`}
                >
                  {c.label}
                </p>
                {c.sub && (
                  <p className="font-mono text-[11px] text-zinc-500 mt-0.5">
                    {c.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* rows */}
          {rows.map((r) => (
            <div role="row" key={r.dimension} className="contents">
              <div
                role="rowheader"
                className="px-4 py-3.5 border-t border-zinc-800/80 bg-zinc-900/30 text-sm text-zinc-400"
              >
                {r.dimension}
              </div>
              {r.cells.map((cell, i) => (
                <div
                  key={i}
                  role="cell"
                  className={`px-4 py-3.5 border-t border-l border-zinc-800/80 text-sm leading-relaxed ${
                    i === accentIdx
                      ? 'bg-[color:var(--color-signal-cyan)]/[0.04] text-zinc-200'
                      : 'text-zinc-400'
                  }`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked per dimension */}
      <div className="sm:hidden space-y-4">
        {rows.map((r) => (
          <div
            key={r.dimension}
            className="rounded-xl border border-zinc-800/80 overflow-hidden"
          >
            <p className="px-4 py-2.5 bg-zinc-900/60 text-sm text-zinc-300 font-medium">
              {r.dimension}
            </p>
            {r.cells.map((cell, i) => (
              <div
                key={i}
                className={`px-4 py-3 border-t border-zinc-800/80 ${
                  i === accentIdx
                    ? 'bg-[color:var(--color-signal-cyan)]/[0.05]'
                    : ''
                }`}
              >
                <p className="font-mono text-[11px] uppercase text-zinc-500 mb-1">
                  {columns[i].label}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {caption && (
        <figcaption className="mt-3 text-sm text-zinc-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
