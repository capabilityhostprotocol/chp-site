import Badge from './Badge';

type AccessState = 'allowed' | 'approval_required' | 'revoked' | 'blocked';

type AccessGrant = {
  subject: string;
  capability: string;
  access: AccessState;
  policy: string;
  evidence: string;
};

type AccessMatrixProps = {
  title: string;
  grants: AccessGrant[];
};

const ACCESS_LABELS: Record<AccessState, string> = {
  allowed: 'Allowed',
  approval_required: 'Approval required',
  revoked: 'Revoked',
  blocked: 'Blocked',
};

const ACCESS_TONES: Record<
  AccessState,
  'neutral' | 'signal' | 'approved' | 'required' | 'blocked'
> = {
  allowed: 'approved',
  approval_required: 'required',
  revoked: 'blocked',
  blocked: 'blocked',
};

export default function AccessMatrix({ title, grants }: AccessMatrixProps) {
  return (
    <section className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)]/70 shadow-[var(--shadow-surface)]">
      <div className="border-b border-[color:var(--color-border-subtle)] px-4 py-3">
        <p className="font-mono text-[11px] uppercase text-zinc-600">
          Access matrix
        </p>
        <h3 className="mt-2 text-base font-semibold text-zinc-100">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[720px] text-left text-sm">
          <thead className="border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-field)] font-mono text-[11px] uppercase text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">Subject</th>
              <th className="px-4 py-3 font-medium">Capability</th>
              <th className="px-4 py-3 font-medium">Access</th>
              <th className="px-4 py-3 font-medium">Policy</th>
              <th className="px-4 py-3 font-medium">Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--color-border-subtle)]">
            {grants.map((grant) => (
              <tr key={`${grant.subject}-${grant.capability}`}>
                <td className="px-4 py-3 font-mono text-xs text-zinc-300">
                  {grant.subject}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-300">
                  {grant.capability}
                </td>
                <td className="px-4 py-3">
                  <Badge tone={ACCESS_TONES[grant.access]}>
                    {ACCESS_LABELS[grant.access]}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-zinc-500">{grant.policy}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-zinc-500">
                  {grant.evidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
