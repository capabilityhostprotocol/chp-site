'use client';

import { useState } from 'react';

type Props = {
  product: string; // slug, e.g. "a2a-computer" | "chp-home" | "chp-legal" | "chp"
  designPartner?: boolean; // frame as design-partner intake (CHP Legal)
};

const FALLBACK_EMAIL = 'partners@capabilityhostprotocol.com';

const inputCls =
  'w-full rounded-lg border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-field)]/70 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[color:var(--color-capability-active)] focus:outline-none';

export default function WaitlistForm({ product, designPartner = false }: Props) {
  const [state, setState] = useState<'idle' | 'submitting' | 'ok' | 'error' | 'unconfigured'>(
    'idle',
  );

  if (state === 'ok') {
    return (
      <div className="surface-raised p-6" role="status">
        <h3 className="text-base font-semibold text-zinc-100 mb-2">You&apos;re on the list.</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Thanks — we&apos;ll be in touch as access opens. No spam, no list-selling.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      product,
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      org: String(fd.get('org') ?? ''),
      role: String(fd.get('role') ?? ''),
      useCase: String(fd.get('useCase') ?? ''),
      designPartner: designPartner || fd.get('designPartner') === 'on',
      source: typeof document !== 'undefined' ? document.referrer : '',
      consent: fd.get('consent') === 'on',
      companyWebsite: String(fd.get('companyWebsite') ?? ''), // honeypot
    };

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) setState('ok');
      else if (res.status === 503) setState('unconfigured');
      else setState('error');
    } catch {
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface-raised p-6 flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-zinc-400">Name</span>
          <input name="name" required maxLength={120} className={inputCls} autoComplete="name" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-zinc-400">Email</span>
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            className={inputCls}
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-zinc-400">Organization (optional)</span>
          <input name="org" maxLength={160} className={inputCls} autoComplete="organization" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-zinc-400">Role (optional)</span>
          <input name="role" maxLength={120} className={inputCls} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs text-zinc-400">
          {designPartner ? 'Tell us about your practice' : 'What would you use it for?'} (optional)
        </span>
        <textarea name="useCase" rows={3} maxLength={2000} className={inputCls} />
      </label>

      {/* honeypot — visually hidden, off-screen; real users never fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-2 text-xs text-zinc-400">
        <input name="consent" type="checkbox" required className="mt-0.5" />
        <span>
          I agree to be contacted about {designPartner ? 'the design-partner program' : 'access'}.
        </span>
      </label>

      {state === 'error' && (
        <p className="text-xs text-[color:var(--color-policy-blocked)]">
          Something went wrong. Please try again, or email{' '}
          <a className="underline" href={`mailto:${FALLBACK_EMAIL}`}>
            {FALLBACK_EMAIL}
          </a>
          .
        </p>
      )}
      {state === 'unconfigured' && (
        <p className="text-xs text-zinc-400">
          Our signup isn&apos;t wired up yet — email{' '}
          <a className="underline text-zinc-200" href={`mailto:${FALLBACK_EMAIL}`}>
            {FALLBACK_EMAIL}
          </a>{' '}
          and we&apos;ll add you.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white disabled:opacity-60"
      >
        {state === 'submitting'
          ? 'Submitting…'
          : designPartner
            ? 'Apply to be a design partner'
            : 'Join the waitlist'}
      </button>
    </form>
  );
}
