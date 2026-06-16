import type { ReactNode } from 'react';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

export default function ButtonLink({
  href,
  children,
  variant = 'primary',
}: ButtonLinkProps) {
  const className =
    variant === 'primary'
      ? 'inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg border border-zinc-100 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white'
      : 'inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-50';

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
