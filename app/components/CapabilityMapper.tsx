'use client';

import { useMemo, useState } from 'react';
import CapabilityUnit from './CapabilityUnit';
import CodePanel from './CodePanel';
import HostFrame from './HostFrame';
import InvocationTrace from './InvocationTrace';
import PolicyBoundary from './PolicyBoundary';

type PolicyState = 'open' | 'restricted' | 'approval_required' | 'audited' | 'blocked';

type MapperState = {
  actor: string;
  capability: string;
  host: string;
  policy: string;
  context: string;
  result: string;
  permission: string;
  version: string;
  description: string;
  policyState: PolicyState;
  availability: 'available' | 'unavailable';
};

type ReadinessLevel = 'pass' | 'warn' | 'fail';

type ReadinessCheck = {
  id: string;
  label: string;
  level: ReadinessLevel;
  detail: string;
};

const INITIAL_STATE: MapperState = {
  actor: 'Planning Agent',
  capability: 'schedule_technician',
  host: 'ServiceOpsHost',
  policy: 'manager_approval',
  context: 'job_context',
  result: 'Confirmed Appointment',
  permission: 'service:dispatch',
  version: '1.0.0',
  description: 'Find an available qualified technician and reserve a service window.',
  policyState: 'approval_required',
  availability: 'available',
};

const POLICY_OPTIONS: { value: PolicyState; label: string }[] = [
  { value: 'approval_required', label: 'Approval required' },
  { value: 'restricted', label: 'Restricted' },
  { value: 'audited', label: 'Audited' },
  { value: 'open', label: 'Open' },
  { value: 'blocked', label: 'Blocked' },
];

const IDENTIFIER_PATTERN = /^[a-z][a-z0-9_.-]{1,63}$/;
const VERSION_PATTERN = /^\d+\.\d+\.\d+$/;
const PERMISSION_PATTERN = /^[a-z][a-z0-9_.-]*:[a-z][a-z0-9_.-]*$/;

const LEVEL_LABELS: Record<ReadinessLevel, string> = {
  pass: 'Pass',
  warn: 'Protocol outcome',
  fail: 'Fix required',
};

const LEVEL_STYLES: Record<ReadinessLevel, string> = {
  pass: 'border-[color:var(--color-policy-approved)]',
  warn: 'border-[color:var(--color-policy-required)]',
  fail: 'border-[color:var(--color-policy-blocked)]',
};

function normalizeIdentifier(value: string, fallback: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_.-]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return normalized || fallback;
}

function hasValue(value: string) {
  return value.trim().length > 0;
}

function makeCheck(
  id: string,
  label: string,
  level: ReadinessLevel,
  detail: string,
): ReadinessCheck {
  return { id, label, level, detail };
}

function buildReadinessChecks(
  state: MapperState,
  capabilityId: string,
  hostId: string,
): ReadinessCheck[] {
  const checks: ReadinessCheck[] = [];

  checks.push(
    makeCheck(
      'actor',
      'Actor named',
      hasValue(state.actor) ? 'pass' : 'fail',
      hasValue(state.actor)
        ? 'Caller identity is visible before invocation.'
        : 'Name the caller before producing an invocation frame.',
    ),
  );

  checks.push(
    makeCheck(
      'capability_id',
      'Capability identifier',
      IDENTIFIER_PATTERN.test(capabilityId) ? 'pass' : 'fail',
      IDENTIFIER_PATTERN.test(capabilityId)
        ? `Published as ${capabilityId}.`
        : 'Use a lowercase identifier starting with a letter, up to 64 characters.',
    ),
  );

  checks.push(
    makeCheck(
      'host_id',
      'Host identity',
      IDENTIFIER_PATTERN.test(hostId) ? 'pass' : 'fail',
      IDENTIFIER_PATTERN.test(hostId)
        ? `Manifest host_id will be ${hostId}.`
        : 'Use a host name that normalizes to a valid protocol identifier.',
    ),
  );

  checks.push(
    makeCheck(
      'version',
      'Capability version',
      VERSION_PATTERN.test(state.version.trim()) ? 'pass' : 'fail',
      VERSION_PATTERN.test(state.version.trim())
        ? 'Version compatibility can be checked before invocation.'
        : 'Use explicit semver, for example 1.0.0.',
    ),
  );

  checks.push(
    makeCheck(
      'permission',
      'Permission requirement',
      PERMISSION_PATTERN.test(state.permission.trim()) ? 'pass' : 'fail',
      PERMISSION_PATTERN.test(state.permission.trim())
        ? 'Permission is machine-readable and can be enforced.'
        : 'Use a scoped permission such as service:dispatch.',
    ),
  );

  checks.push(
    makeCheck(
      'context',
      'Invocation context',
      hasValue(state.context) ? 'pass' : 'fail',
      hasValue(state.context)
        ? 'The payload names the context the capability needs.'
        : 'Name the input context before producing an invocation frame.',
    ),
  );

  checks.push(
    makeCheck(
      'result',
      'Concrete result',
      hasValue(state.result) ? 'pass' : 'fail',
      hasValue(state.result)
        ? 'The caller can reason about the expected result.'
        : 'Name the result the capability should produce.',
    ),
  );

  checks.push(
    makeCheck(
      'description',
      'Description quality',
      state.description.trim().length >= 24 ? 'pass' : 'warn',
      state.description.trim().length >= 24
        ? 'The manifest explains the capability to independent callers.'
        : 'Add enough description for a caller to know when to invoke it.',
    ),
  );

  checks.push(
    makeCheck(
      'lifecycle',
      'Lifecycle state',
      state.availability === 'available' ? 'pass' : 'warn',
      state.availability === 'available'
        ? 'The host can expose this capability as invokable.'
        : 'Unavailable capabilities should return a structured unavailable outcome.',
    ),
  );

  checks.push(
    makeCheck(
      'policy',
      'Policy outcome',
      state.policyState === 'blocked' || state.policyState === 'approval_required'
        ? 'warn'
        : 'pass',
      state.policyState === 'blocked'
        ? 'Blocked capabilities should deny before execution and emit evidence.'
        : state.policyState === 'approval_required'
          ? 'Approval-required capabilities should pause or deny before execution.'
        : 'Policy state is explicit before execution.',
    ),
  );

  return checks;
}

function buildOutcome(
  state: MapperState,
  capabilityId: string,
  readinessLabel: string,
  failedChecks: ReadinessCheck[],
  warningChecks: ReadinessCheck[],
) {
  let code = 'accepted';
  let ok = true;
  let message = 'Invocation can be accepted by the host boundary.';

  if (failedChecks.length > 0) {
    ok = false;
    code = 'validation_failed';
    message = 'Manifest or invocation fields need protocol fixes.';
  } else if (state.availability === 'unavailable') {
    ok = false;
    code = 'capability_unavailable';
    message = `${capabilityId} is declared but unavailable.`;
  } else if (state.policyState === 'blocked') {
    ok = false;
    code = 'policy_denied';
    message = `${state.policy || 'policy'} blocks execution before invocation.`;
  } else if (state.policyState === 'approval_required') {
    ok = false;
    code = 'approval_required';
    message = `${state.policy || 'policy'} must approve before execution.`;
  }

  return JSON.stringify(
    {
      ok,
      code,
      message,
      evidence: ok ? 'execution_started' : 'execution_denied',
      details: {
        readiness: readinessLabel,
        failed_checks: failedChecks.map((check) => check.id),
        warning_checks: warningChecks.map((check) => check.id),
      },
    },
    null,
    2,
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-11 rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-field-950)] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-700 focus:border-[color:var(--color-capability-active)]"
      />
    </label>
  );
}

export default function CapabilityMapper() {
  const [state, setState] = useState<MapperState>(INITIAL_STATE);

  const capabilityId = normalizeIdentifier(state.capability, 'capability_id');
  const hostId = normalizeIdentifier(state.host, 'host_id');
  const readinessChecks = useMemo(
    () => buildReadinessChecks(state, capabilityId, hostId),
    [capabilityId, hostId, state],
  );
  const failedChecks = readinessChecks.filter((check) => check.level === 'fail');
  const warningChecks = readinessChecks.filter((check) => check.level === 'warn');
  const readinessLabel =
    failedChecks.length > 0
      ? 'Needs manifest fixes'
      : warningChecks.length > 0
        ? 'Defined protocol outcome'
        : 'Ready to implement';

  const notation = `[${state.actor || 'Actor'}] -> {${capabilityId}} @ ${
    state.host || 'Host'
  } | ${state.policy || 'policy'} | ${state.context || 'context'} -> ${
    state.result || 'Result'
  }`;

  const manifest = useMemo(
    () =>
      JSON.stringify(
        {
          host_id: hostId,
          protocol_version: '0.1',
          capabilities: [
            {
              id: capabilityId,
              version: state.version || '1.0.0',
              description: state.description || 'Describe the hosted capability.',
              permissions: [state.permission || 'permission:required'],
              available: state.availability === 'available',
              policy: {
                state: state.policyState,
                rule: state.policy || 'policy_rule',
              },
            },
          ],
        },
        null,
        2,
      ),
    [capabilityId, hostId, state],
  );

  const invocation = useMemo(
    () =>
      JSON.stringify(
        {
          capability_id: capabilityId,
          caller: state.actor || 'Actor',
          correlation_id: 'map-001',
          timeout_ms: 3000,
          payload: {
            context: state.context || 'context',
            requested_result: state.result || 'Result',
          },
        },
        null,
        2,
      ),
    [capabilityId, state.actor, state.context, state.result],
  );

  const outcome = buildOutcome(
    state,
    capabilityId,
    readinessLabel,
    failedChecks,
    warningChecks,
  );

  function update<Key extends keyof MapperState>(key: Key, value: MapperState[Key]) {
    setState((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)]/70 p-5 shadow-[var(--shadow-surface)]">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase text-zinc-600">
              Capability map
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-100">
              Start with the real-world ability.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setState(INITIAL_STATE)}
            className="min-h-10 rounded-md border border-[color:var(--color-border-subtle)] px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
          >
            Reset example
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Actor"
            value={state.actor}
            onChange={(value) => update('actor', value)}
            placeholder="Planning Agent"
          />
          <Field
            label="Capability"
            value={state.capability}
            onChange={(value) => update('capability', value)}
            placeholder="schedule_technician"
          />
          <Field
            label="Host"
            value={state.host}
            onChange={(value) => update('host', value)}
            placeholder="ServiceOpsHost"
          />
          <Field
            label="Permission"
            value={state.permission}
            onChange={(value) => update('permission', value)}
            placeholder="service:dispatch"
          />
          <Field
            label="Policy"
            value={state.policy}
            onChange={(value) => update('policy', value)}
            placeholder="manager_approval"
          />
          <Field
            label="Context"
            value={state.context}
            onChange={(value) => update('context', value)}
            placeholder="job_context"
          />
          <Field
            label="Result"
            value={state.result}
            onChange={(value) => update('result', value)}
            placeholder="Confirmed Appointment"
          />
          <Field
            label="Version"
            value={state.version}
            onChange={(value) => update('version', value)}
            placeholder="1.0.0"
          />
        </div>

        <label className="mt-4 grid gap-2">
          <span className="text-sm font-medium text-zinc-300">Description</span>
          <textarea
            value={state.description}
            onChange={(event) => update('description', event.target.value)}
            rows={3}
            className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-field-950)] px-3 py-2 text-sm leading-relaxed text-zinc-100 outline-none transition-colors placeholder:text-zinc-700 focus:border-[color:var(--color-capability-active)]"
          />
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Policy state</span>
            <select
              value={state.policyState}
              onChange={(event) =>
                update('policyState', event.target.value as PolicyState)
              }
              className="min-h-11 rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-field-950)] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-[color:var(--color-capability-active)]"
            >
              {POLICY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Lifecycle state</span>
            <select
              value={state.availability}
              onChange={(event) =>
                update(
                  'availability',
                  event.target.value as MapperState['availability'],
                )
              }
              className="min-h-11 rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-field-950)] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-[color:var(--color-capability-active)]"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>
        </div>

        <div className="mt-5 rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-field-950)]/75 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase text-zinc-600">
              Protocol readiness
            </p>
            <span className="rounded-full border border-[color:var(--color-border-subtle)] px-2.5 py-1 text-xs text-zinc-300">
              {readinessLabel}
            </span>
          </div>
          <ul className="mt-4 grid gap-3">
            {readinessChecks.map((check) => (
              <li
                key={check.id}
                className={`rounded-md border bg-[color:var(--color-surface-900)]/70 p-3 ${LEVEL_STYLES[check.level]}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase text-zinc-500">
                    {LEVEL_LABELS[check.level]}
                  </span>
                  <span className="text-sm font-medium text-zinc-200">
                    {check.label}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  {check.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-registry-surface)] p-5">
          <p className="font-mono text-[11px] uppercase text-zinc-600">
            CHP notation
          </p>
          <p className="mt-3 break-words font-mono text-sm leading-relaxed text-zinc-200">
            {notation}
          </p>
        </div>

        <InvocationTrace
          actor={state.actor || 'Actor'}
          capability={capabilityId}
          host={state.host || 'Host'}
          policy={state.policy || 'policy'}
          context={state.context || 'context'}
          result={state.result || 'Result'}
        />

        <div className="grid gap-4 xl:grid-cols-2">
          <CapabilityUnit
            name={capabilityId}
            description={state.description}
            host={state.host || 'Host'}
            policy={state.policyState}
            version={state.version || '1.0.0'}
            state={state.availability === 'available' ? 'invokable' : 'blocked'}
          />
          <PolicyBoundary
            state={state.policyState}
            label={state.policy || 'policy'}
            description={`${state.permission || 'permission:required'} governs whether ${
              state.actor || 'the caller'
            } can invoke ${capabilityId}.`}
          />
        </div>

        <HostFrame
          hostType="Mapped host"
          hostName={state.host || 'Host'}
          policySummary="A host publishes capability identity, lifecycle, version, permission, and policy before callers invoke it."
          health={state.availability === 'available' ? 'Available' : 'Unavailable'}
          capabilities={[
            {
              name: capabilityId,
              description: state.description || 'Describe the hosted capability.',
              status: state.availability === 'available' ? 'invokable' : 'blocked',
              policy: state.policyState,
              version: state.version || '1.0.0',
            },
          ]}
        />
      </section>

      <section className="grid gap-4 lg:col-span-2 lg:grid-cols-3">
        <CodePanel code={manifest} label="manifest.json" language="json" />
        <CodePanel code={invocation} label="invoke.json" language="json" />
        <CodePanel code={outcome} label="outcome.json" language="json" />
      </section>
    </div>
  );
}
