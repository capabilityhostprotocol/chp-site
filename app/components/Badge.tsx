import type { ReactNode } from 'react';

type BadgeTone = 'neutral' | 'signal' | 'approved' | 'required' | 'blocked';

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};

const TONE_STYLES: Record<BadgeTone, string> = {
  neutral: 'border-[color:var(--color-border-subtle)] text-zinc-400',
  signal: 'border-[color:var(--color-capability-active)] text-cyan-200',
  approved: 'border-[color:var(--color-policy-approved)] text-emerald-200',
  required: 'border-[color:var(--color-policy-required)] text-amber-200',
  blocked: 'border-[color:var(--color-policy-blocked)] text-red-200',
};

export default function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex min-h-6 items-center rounded-full border px-2 py-0.5 text-[11px] leading-none ${TONE_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}
