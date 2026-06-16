import type { ReactNode } from 'react';

type SurfacePanelProps = {
  children: ReactNode;
  variant?: 'default' | 'muted' | 'field';
  className?: string;
};

const VARIANT_CLASSES = {
  default:
    'border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)]/70 shadow-[var(--shadow-surface)]',
  muted:
    'border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-field)]/70',
  field:
    'border-[color:var(--color-border-subtle)] bg-[color:var(--color-context-surface)] shadow-[var(--shadow-surface)]',
};

export default function SurfacePanel({
  children,
  variant = 'default',
  className = '',
}: SurfacePanelProps) {
  return (
    <div
      className={`rounded-lg border p-5 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
