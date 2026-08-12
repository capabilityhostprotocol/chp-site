'use client';

import { useState } from 'react';
import EvidenceChain from './EvidenceChain';

// A canned-but-real CHP session: an action is denied (with a real reserved reason code),
// a human grants the missing entitlement, and the retry runs and completes — all one
// hash-chained, replayable session. Inspect any event; tamper the chain and watch it break.
// Reason codes are from the closed 17-code vocabulary; protocol_version is the wire value.

type EventDetail = {
  seq: string;
  type: string;
  hash: string;
  outcome: 'denied' | 'granted' | 'started' | 'completed';
  summary: string;
  fields: [string, string][];
  denial?: { code: string; message: string; retryable: boolean };
};

const SESSION = {
  correlationId: 'session-4a2f',
  subject: 'agent://planning-assistant',
  capability: 'schedule_technician',
};

const EVENTS: EventDetail[] = [
  {
    seq: '01',
    type: 'execution_denied',
    hash: '7b1a',
    outcome: 'denied',
    summary: 'The invocation was blocked at the boundary before anything ran.',
    fields: [
      ['capability', 'schedule_technician:1.0.0'],
      ['gate', 'policy'],
    ],
    denial: {
      code: 'policy_blocked',
      message: 'service:dispatch entitlement is required',
      retryable: false,
    },
  },
  {
    seq: '02',
    type: 'approval_granted',
    hash: '9c7e',
    outcome: 'granted',
    summary: 'A human granted the missing entitlement — recorded as a governed event.',
    fields: [
      ['approver', 'user://ops-lead'],
      ['decision', 'grant service:dispatch'],
    ],
  },
  {
    seq: '03',
    type: 'execution_started',
    hash: 'a3f1',
    outcome: 'started',
    summary: 'The retry passed every gate and the handler began.',
    fields: [
      ['capability', 'schedule_technician:1.0.0'],
      ['mode', 'sync'],
    ],
  },
  {
    seq: '04',
    type: 'execution_completed',
    hash: '1d04',
    outcome: 'completed',
    summary: 'The action completed. Its evidence is sealed into the chain.',
    fields: [
      ['result', 'technician reserved · job_456'],
      ['success', 'true'],
    ],
  },
];

const OUTCOME_STYLE: Record<EventDetail['outcome'], string> = {
  denied: 'text-[color:var(--color-policy-blocked)]',
  granted: 'text-[color:var(--color-policy-approved)]',
  started: 'text-[color:var(--color-signal-cyan)]',
  completed: 'text-[color:var(--color-policy-approved)]',
};

export default function SessionInspector() {
  const [open, setOpen] = useState<string | null>('01'); // denial expanded by default

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-5">
        <p className="eyebrow">chp session tree · replayable</p>
        <p className="font-mono text-[11px] text-zinc-400">
          correlation_id={SESSION.correlationId}
        </p>
      </div>

      <p className="font-mono text-xs text-zinc-400 mb-5">
        <span className="text-zinc-300">{SESSION.subject}</span> invoked{' '}
        <span className="text-zinc-300">{SESSION.capability}</span> — denied, granted,
        then completed. Click an event to inspect it.
      </p>

      <ul className="flex flex-col gap-2 mb-6">
        {EVENTS.map((e) => {
          const isOpen = open === e.seq;
          return (
            <li key={e.seq}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : e.seq)}
                aria-expanded={isOpen}
                className="w-full text-left rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-2.5 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase text-zinc-500">
                    evt {e.seq}
                  </span>
                  <span className={`font-mono text-xs ${OUTCOME_STYLE[e.outcome]}`}>
                    {e.type}
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-[color:var(--color-signal-cyan)]">
                    #{e.hash}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="mt-1 rounded-lg border border-zinc-800/70 bg-zinc-950/70 px-4 py-3">
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{e.summary}</p>
                  {e.denial && (
                    <div className="mb-3 rounded-md border border-[color:var(--color-policy-blocked)]/50 bg-[color:var(--color-policy-blocked)]/[0.06] px-3 py-2">
                      <p className="font-mono text-[11px] text-[color:var(--color-policy-blocked)]">
                        denial.code = {e.denial.code}
                      </p>
                      <p className="font-mono text-[11px] text-zinc-300 mt-1">
                        {e.denial.message}
                      </p>
                      <p className="font-mono text-[11px] text-zinc-500 mt-1">
                        retryable = {String(e.denial.retryable)} · a first-class outcome, not an exception
                      </p>
                    </div>
                  )}
                  <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
                    {e.fields.map(([k, v]) => (
                      <div key={k} className="contents">
                        <dt className="font-mono text-[11px] text-zinc-500">{k}</dt>
                        <dd className="font-mono text-[11px] text-zinc-300">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <EvidenceChain
        events={EVENTS.map((e) => ({ seq: e.seq, type: e.type, hash: e.hash }))}
      />
    </div>
  );
}
