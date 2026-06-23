'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Motion hooks — the reusable motion vocabulary for the visual-aid system.
 * All callers must still render a meaningful static frame; these hooks only
 * decide whether/when motion runs. The global `prefers-reduced-motion` block
 * in globals.css neutralizes CSS animations regardless.
 */

/** SSR-safe `prefers-reduced-motion` reader. Returns false during SSR. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/**
 * Reveal-on-scroll. Returns a ref to attach and whether it has entered view.
 * `once` (default true) keeps it visible after the first intersection.
 */
export function useInView<T extends Element = HTMLDivElement>(options?: {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}): { ref: React.RefObject<T | null>; inView: boolean } {
  const { once = true, rootMargin = '0px 0px -10% 0px', threshold = 0.2 } =
    options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}

/**
 * Shared requestAnimationFrame loop that pauses when the tab is hidden and
 * stops when `active` is false. Generalizes the FieldMotif loop. `cb` receives
 * the elapsed milliseconds since the loop started.
 */
export function useRafLoop(
  cb: (elapsedMs: number) => void,
  active = true,
): void {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let start = 0;
    let running = true;

    const frame = (t: number) => {
      if (!running) return;
      if (!start) start = t;
      cbRef.current(t - start);
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        start = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    raf = requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [active]);
}
