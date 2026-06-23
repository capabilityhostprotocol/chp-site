'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Reveal — a subtle scroll-in entrance for homepage bands. Transform-only
 * (content is never hidden, so SEO/a11y and the 100 scores are unaffected);
 * reduced-motion and no-JS just render in place. Do NOT wrap sticky sections —
 * the transform creates a containing block that breaks position: sticky.
 */
export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={shown ? 'shown' : 'hidden'}>
      {children}
    </div>
  );
}
