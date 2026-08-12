const LINES = [
  'evt_8f3a1c · execution_completed · outcome=success · #9c7e',
  'evt_2d04b1 · approval_granted · subject=human://shift-manager · #1d04',
  'correlation=session-abc · seq=03 · redacted=true · assurance=S1',
  'evt_e8b2af · execution_denied · code=policy_blocked · #e8b2',
  'invocation=inv_session_abc_001 · capability=schedule_technician@1.0.0',
  'host=ServiceOpsHost · replay=ordered · chain=verified',
];

/**
 * EvidenceTexture — a faint atmospheric layer of real evidence strings, for
 * signature surfaces. "Evidence in the walls": the brand's substance becomes
 * its texture. aria-hidden, non-interactive, very low opacity.
 */
export default function EvidenceTexture({
  className = '',
}: {
  className?: string;
}) {
  const rows = [...LINES, ...LINES, ...LINES];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
    >
      <div
        className="font-mono text-[11px] leading-7 whitespace-nowrap"
        style={{ color: 'var(--color-signal-cyan)', opacity: 0.05 }}
      >
        {rows.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}
