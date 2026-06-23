'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * Delegated conversion tracking. Any element (or its ancestor) carrying a
 * `data-event` attribute fires a Vercel Analytics custom event on click, with
 * an optional `data-event-label`. Keeps CTAs server-rendered — no per-link
 * client components. Navigation between pages is covered by automatic
 * pageviews, so custom events are reserved for the funnel's conversions.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el =
        e.target instanceof Element ? e.target.closest('[data-event]') : null;
      if (!el) return;
      const name = el.getAttribute('data-event');
      if (!name) return;
      const label = el.getAttribute('data-event-label');
      track(name, label ? { label } : {});
    }
    document.addEventListener('click', onClick, { capture: true });
    return () =>
      document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
