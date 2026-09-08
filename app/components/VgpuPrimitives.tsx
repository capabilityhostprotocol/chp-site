import { EvidenceField } from '@chp/ui/evidence-field';
import { MeshGradient } from '@chp/ui/mesh-gradient';

const PRIMITIVES = [
  {
    name: 'GpuSurface',
    path: '@chp/ui/gpu-surface',
    desc: 'The base primitive: mounts a fullscreen WGSL fragment effect over vgpu, feeds it per-frame uniforms, and degrades gracefully. vgpu is lazy-imported, so it never enters SSR or the initial bundle. Optional pointer tracking + fps cap.',
  },
  {
    name: 'EvidenceField',
    path: '@chp/ui/evidence-field',
    desc: 'The signature CHP motif — actor actions drift in and resolve onto one evidence trace. Pointer-reactive: nearby actions gather toward the cursor with a soft signal-cyan halo.',
  },
  {
    name: 'MeshGradient',
    path: '@chp/ui/mesh-gradient',
    desc: 'A domain-warped flow of the brand colors over a transparent base — an ambient section backdrop. fps-capped by default; keep it low-contrast behind content.',
  },
];

/**
 * Design-system showcase for the WebGPU (vgpu) primitives shipped in @chp/ui. Live demos degrade to
 * nothing without WebGPU / under reduced motion (each surface handles its own fallback).
 */
export default function VgpuPrimitives() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
      <p className="eyebrow mb-3">WebGPU primitives</p>
      <h2 className="text-2xl font-semibold text-zinc-100 mb-3">
        A reusable vgpu layer in the design system.
      </h2>
      <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl mb-8">
        Shader-backed surfaces built on{' '}
        <a
          href="https://vgpu.sh"
          className="underline underline-offset-4 hover:text-zinc-100 transition-colors"
        >
          vgpu
        </a>
        , shipped from <code className="font-mono text-zinc-400">@chp/ui</code> so every CHP
        frontend can reuse them. Each surface lazy-loads WebGPU, pauses offscreen, and renders a
        fallback (or nothing) where WebGPU is unavailable or reduced motion is set — so they never
        cost the first paint.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        <figure className="relative h-56 rounded-lg border border-[color:var(--color-border-subtle)] overflow-hidden">
          <EvidenceField />
          <figcaption className="absolute bottom-2 left-3 font-mono text-xs text-zinc-500">
            EvidenceField · move your cursor
          </figcaption>
        </figure>
        <figure className="relative h-56 rounded-lg border border-[color:var(--color-border-subtle)] overflow-hidden">
          <MeshGradient pointer />
          <figcaption className="absolute bottom-2 left-3 font-mono text-xs text-zinc-500">
            MeshGradient
          </figcaption>
        </figure>
      </div>

      <dl className="space-y-4 mb-10">
        {PRIMITIVES.map((p) => (
          <div
            key={p.name}
            className="grid sm:grid-cols-[12rem_1fr] gap-2 sm:gap-6 border-t border-zinc-800/60 pt-4"
          >
            <dt className="font-mono text-sm text-zinc-200">
              {p.name}
              <span className="block text-xs text-zinc-500">{p.path}</span>
            </dt>
            <dd className="text-sm text-zinc-400 leading-relaxed">{p.desc}</dd>
          </div>
        ))}
      </dl>

      <pre className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-flat,#0b0b0e)] p-4 overflow-x-auto text-xs font-mono text-zinc-300">
        <code>{`import { EvidenceField } from "@chp/ui/evidence-field";

// Drop into any relative container; fallback shows without WebGPU.
<div className="relative h-64 overflow-hidden">
  <EvidenceField fallback={<StaticFallback />} />
</div>`}</code>
      </pre>
    </section>
  );
}
