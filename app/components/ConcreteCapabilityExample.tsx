import CapabilityUnit from './CapabilityUnit';
import HostFrame from './HostFrame';
import PolicyBoundary from './PolicyBoundary';
import { FIELD_SERVICE_EXAMPLE } from '../lib/content';

export default function ConcreteCapabilityExample() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[color:var(--color-border-subtle)]">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-start">
        <div>
          <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
            Concrete example first
          </p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
            A capability is something a host can do.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            {FIELD_SERVICE_EXAMPLE.summary}
          </p>
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)]/70 p-4">
            <p className="font-mono text-[11px] uppercase text-zinc-600 mb-3">
              CHP notation
            </p>
            <p className="font-mono text-sm leading-relaxed text-zinc-300">
              {FIELD_SERVICE_EXAMPLE.notation}
            </p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <CapabilityUnit
              name="notify_customer"
              description="Sends the confirmed appointment window to the customer."
              host="CustomerCommsHost"
              policy="audited"
              version="1.0.0"
              state="verified"
              variant="compact"
            />
            <CapabilityUnit
              name="complete_service_visit"
              description="Composes scheduling, inventory, and notification."
              host="ServiceWorkflow"
              policy="restricted"
              version="0.3.0"
              state="declared"
              variant="compact"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <HostFrame
            hostType="Business process host"
            hostName={FIELD_SERVICE_EXAMPLE.host}
            policySummary="Capabilities are exposed with ownership, lifecycle state, and policy before invocation."
            health="Available"
            capabilities={FIELD_SERVICE_EXAMPLE.capabilities}
          />
          <PolicyBoundary
            state="approval_required"
            label={FIELD_SERVICE_EXAMPLE.policy}
            description="A manager must approve technician scheduling before the hosted capability produces a confirmed appointment."
          />
        </div>
      </div>
    </section>
  );
}
