const STATS = [
  { label: 'version', value: 'v0.6.3' },
  { label: 'capability types', value: '25+' },
  { label: 'mandatory deps', value: '0' },
  { label: 'license', value: 'Apache-2.0' },
];

export default function StatsStrip() {
  return (
    <section className="border-t border-zinc-800/60 bg-zinc-900/40">
      <div className="max-w-5xl mx-auto px-6 py-5">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {STATS.map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="font-mono text-sm font-semibold text-zinc-200">{value}</span>
              <span className="text-xs text-zinc-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
