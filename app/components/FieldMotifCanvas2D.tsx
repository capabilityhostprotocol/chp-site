'use client';

import { useEffect, useRef } from 'react';

// Actor accent colors (from the design tokens in globals.css).
const ACTORS = [
  'rgba(245, 238, 220, 0.9)', // human  — warm cream
  'rgba(139, 108, 255, 0.9)', // agent  — violet
  'rgba(59, 130, 246, 0.9)', // product — blue
  'rgba(217, 154, 43, 0.9)', // business — amber
];
const TRACE = 'rgba(40, 217, 242, 0.9)'; // signal-cyan — the evidence trace

type Particle = {
  x: number;
  y: number;
  vy: number;
  speed: number;
  color: string;
  merged: boolean;
};

/**
 * FieldMotifCanvas2D — the 2D-canvas rendering of the signature visual: actor "actions" drift in
 * from the field and resolve onto a single horizontal evidence trace (many actions, one provable
 * record). Calm motion; honours prefers-reduced-motion by rendering a single static frame.
 *
 * This is the universal fallback for `FieldMotif` — it runs anywhere a 2D canvas does, which is why
 * `FieldMotif` renders it whenever WebGPU (the vgpu path) is unavailable or reduced motion is set.
 */
export default function FieldMotifCanvas2D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = 0;
    let height = 0;
    let traceY = 0;
    let particles: Particle[] = [];
    let raf = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function seed() {
      const count = Math.round(Math.min(width / 11, 130));
      particles = Array.from({ length: count }, () => spawn(true));
    }

    function spawn(initial: boolean): Particle {
      return {
        x: initial ? Math.random() * width : -10,
        y: Math.random() * height,
        vy: 0,
        speed: 0.25 + Math.random() * 0.7,
        color: ACTORS[(Math.random() * ACTORS.length) | 0],
        merged: false,
      };
    }

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 480;
      traceY = height * 0.62;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function drawTrace() {
      ctx!.strokeStyle = 'rgba(40, 217, 242, 0.28)';
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(0, traceY);
      ctx!.lineTo(width, traceY);
      ctx!.stroke();
    }

    function drawParticle(p: Particle) {
      ctx!.fillStyle = p.merged ? TRACE : p.color;
      ctx!.globalAlpha = p.merged ? 0.9 : 0.55;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.merged ? 1.1 : 1.6, 0, Math.PI * 2);
      ctx!.fill();
    }

    function step(p: Particle) {
      // pull toward the trace line, then flow along it
      const dy = traceY - p.y;
      if (Math.abs(dy) > 1) {
        p.vy += Math.sign(dy) * 0.012;
        p.vy *= 0.96;
        p.y += p.vy;
      } else {
        p.y = traceY;
        p.merged = true;
      }
      p.x += p.merged ? p.speed + 0.5 : p.speed;
      if (p.x > width + 10) Object.assign(p, spawn(false));
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height);
      drawTrace();
      for (const p of particles) {
        if (!reduceMotion) step(p);
        drawParticle(p);
      }
      ctx!.globalAlpha = 1;
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        raf = requestAnimationFrame(frame);
      }
    }

    resize();
    if (reduceMotion) {
      // settle a static, already-converged composition
      for (const p of particles) {
        p.y = traceY + (Math.random() - 0.5) * 8;
        p.merged = Math.random() > 0.4;
      }
      frame();
    } else {
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
