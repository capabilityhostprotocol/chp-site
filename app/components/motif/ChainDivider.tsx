const CYAN = 'var(--color-signal-cyan)';
const HASHES = ['a3f1', '9c7e', '1d04'];

function Link() {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="9" height="5" rx="2.5" stroke={CYAN} strokeWidth="1.2" strokeOpacity="0.5" />
      <rect x="9.5" y="3.5" width="9" height="5" rx="2.5" stroke={CYAN} strokeWidth="1.2" strokeOpacity="0.5" />
    </svg>
  );
}

/**
 * ChainDivider — a section divider as a hash-chain: the evidence trace running
 * through the page. Faint, decorative; a through-line that says "evidence".
 */
export default function ChainDivider() {
  return (
    <div
      aria-hidden="true"
      className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-4 select-none"
    >
      <div className="h-px flex-1 bg-zinc-800/70" />
      <div className="flex items-center gap-1.5">
        {HASHES.map((h, i) => (
          <span key={h} className="flex items-center gap-1.5">
            <span
              className="font-mono text-[10px] rounded px-1.5 py-0.5 border"
              style={{
                color: CYAN,
                borderColor: 'rgba(40,217,242,0.2)',
                background: 'rgba(40,217,242,0.04)',
              }}
            >
              #{h}
            </span>
            {i < HASHES.length - 1 && <Link />}
          </span>
        ))}
      </div>
      <div className="h-px flex-1 bg-zinc-800/70" />
    </div>
  );
}
