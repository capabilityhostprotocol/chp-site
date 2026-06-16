import type { ReactNode } from 'react';

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  width?: 'site' | 'narrow';
  padding?: 'standard' | 'compact';
  border?: 'top' | 'y' | 'none';
};

const WIDTH_CLASSES = {
  site: 'max-w-6xl',
  narrow: 'max-w-5xl',
};

const PADDING_CLASSES = {
  standard: 'py-16',
  compact: 'py-14',
};

const BORDER_CLASSES = {
  top: 'border-t border-[color:var(--color-border-subtle)]',
  y: 'border-y border-[color:var(--color-border-subtle)]',
  none: '',
};

export default function SectionShell({
  children,
  className = '',
  width = 'site',
  padding = 'standard',
  border = 'top',
}: SectionShellProps) {
  return (
    <section
      className={`mx-auto px-6 ${WIDTH_CLASSES[width]} ${PADDING_CLASSES[padding]} ${BORDER_CLASSES[border]} ${className}`}
    >
      {children}
    </section>
  );
}
