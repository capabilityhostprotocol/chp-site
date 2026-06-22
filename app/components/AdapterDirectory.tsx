'use client';

import { useMemo, useState } from 'react';
import AdapterCard from './AdapterCard';
import type { Adapter } from '../lib/adapters';

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

  const tabs = [ALL, ...available];

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((adapter) => (
          <AdapterCard key={adapter.id} adapter={adapter} />
        ))}
      </div>
    </div>
  );
}
