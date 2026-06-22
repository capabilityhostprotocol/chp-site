'use client';

import { useMemo, useState } from 'react';
import AdapterCard from './AdapterCard';
import { TIERS, type Adapter } from '../lib/adapters';

type AdapterDirectoryProps = {
  adapters: Adapter[];
  categories: string[];
};

const ALL = 'all';

export default function AdapterDirectory({
  adapters,
  categories,
}: AdapterDirectoryProps) {
  const [selected, setSelected] = useState<string>(ALL);

  // Only show category tabs that actually have adapters.
  const available = useMemo(() => {
    const present = new Set(adapters.map((a) => a.category));
    return categories.filter((c) => present.has(c));
  }, [adapters, categories]);

  const filtered = useMemo(
    () =>
      selected === ALL
        ? adapters
        : adapters.filter((a) => a.category === selected),
    [adapters, selected],
  );

  // Group the filtered set into the named tiers, preserving category order.
  const groups = useMemo(
    () =>
      TIERS.map((t) => ({
        ...t,
        items: filtered.filter((a) =>
          t.tier === 1 ? a.tier === 1 : a.tier >= 2,
        ),
      })).filter((g) => g.items.length > 0),
    [filtered],
  );

  const tabs = [ALL, ...available];

  return (
    <div>
      <div
        className="mb-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter adapters by category"
      >
        {tabs.map((cat) => {
          const active = cat === selected;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(cat)}
              className={`min-h-8 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wide transition-colors ${
                active
                  ? 'border-[color:var(--color-capability-active)] text-cyan-200'
                  : 'border-[color:var(--color-border-subtle)] text-zinc-500 hover:border-zinc-600 hover:text-zinc-200'
              }`}
            >
              {cat === ALL ? 'All' : cat}
            </button>
          );
        })}
      </div>

      <p className="mb-8 font-mono text-xs text-zinc-500">
        Showing {filtered.length} of {adapters.length} adapters
        {selected !== ALL && ` in ${selected}`}
      </p>

      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.label}>
            <div className="mb-4 flex items-baseline gap-3 border-b border-[color:var(--color-border-subtle)] pb-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
                {group.label}
              </h2>
              <span className="font-mono text-xs text-zinc-600">
                {group.blurb} · {group.items.length}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((adapter) => (
                <AdapterCard key={adapter.id} adapter={adapter} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
