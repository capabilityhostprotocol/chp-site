import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import FieldMotif from '../components/FieldMotif';
import VisualGrammar from '../components/VisualGrammar';
import EvidenceContractDiagram from '../components/EvidenceContractDiagram';
import MeshTraceDiagram from '../components/MeshTraceDiagram';
import CapabilityConstellation from '../components/CapabilityConstellation';
import Glyph, { type GlyphName } from '../components/motif/Glyph';

export const metadata: Metadata = {
  title: 'Design system - Capability Host Protocol',
  description:
    'The visual language of CHP: concept-mapped color tokens, the signature field motif, the protocol visual grammar, and the diagrams that express the protocol.',
  robots: { index: false, follow: false },
};

const PRINCIPLES = [
  ['Applications first, progressive depth', 'The homepage leads with what people use the protocol for — concrete, real-today applications — then lets the reader dive deeper. Worldview and mechanics live one click down, not in the first screen.'],
  ['One idea per band', 'Sparse, full-bleed sections with generous negative space. Large display type carries a single message per screen; supporting detail stays quiet. Inspired by the calm, declarative rhythm of sparse technical sites.'],
  ['Structured, not decorative', 'Every visual maps to a protocol concept. If it does not clarify the protocol, it is questioned. We are not a network-diagram brand.'],
  ['Concept-mapped color', 'Color carries meaning: each actor, policy state, and the evidence trace has a fixed token. Color is never arbitrary.'],
  ['One evocative moment', 'A single signature motif (the hero field) does the emotional work. Everywhere else stays precise and diagrammatic.'],
  ['Calm and accessible', 'Negative space, monospace restraint, calm motion. Animation pauses offscreen and honours prefers-reduced-motion.'],
];

const TYPE_SCALE = [
  ['.display-1', 'Hero headline', 'clamp(2.75rem → 5.25rem), -0.025em, 600'],
  ['.display-2', 'Section headline', 'clamp(2rem → 3.5rem), -0.02em, 600'],
  ['.lede', 'Section lede / subhead', 'text-lg → text-2xl, 1.5 line-height'],
  ['.eyebrow', 'Section eyebrow', 'mono, xs, 0.2em tracking, uppercase'],
  ['.band', 'Section rhythm', 'max-w-6xl, px-6, py-24 → py-32'],
];

const GLYPHS: [GlyphName, string][] = [
  ['capability', 'Capability'],
  ['boundary', 'Capability boundary'],
  ['host', 'Host'],
  ['invocation', 'Invocation'],
  ['evidence', 'Evidence'],
  ['chain', 'Hash chain'],
  ['correlation', 'Correlation'],
  ['denial', 'Denial'],
  ['replay', 'Replay'],
  ['conformance', 'Conformance'],
  ['descriptor', 'Descriptor'],
  ['adapter', 'Adapter'],
  ['discovery', 'Discovery'],
];

const ACTOR_TOKENS = [
  ['Human', '--color-human-warmth', 'Person with agency and consent'],
  ['Agent', '--color-agent-violet', 'Autonomous or semi-autonomous actor'],
  ['Product', '--color-protocol-blue', 'Software product or service surface'],
  ['Business', '--color-governance-amber', 'Organizational capability owner'],
];

const STATE_TOKENS = [
  ['Capability / trace', '--color-signal-cyan', 'Active capability; the evidence trace'],
  ['Approved', '--color-operational-green', 'Open / allowed / completed'],
  ['Approval required', '--color-governance-amber', 'Restricted; needs approval'],
  ['Blocked', '--color-critical-red', 'Denied or revoked'],
];

function Swatch({ name, token, note }: { name: string; token: string; note: string }) {
  return (
    <div className="border border-zinc-800/80 bg-zinc-900/50 rounded-xl p-4">
      <div
        className="h-12 w-full rounded-md mb-3 border border-white/10"
        style={{ background: `var(${token})` }}
      />
      <p className="text-sm font-semibold text-zinc-100">{name}</p>
      <p className="font-mono text-[11px] text-zinc-600 mt-1">{token}</p>
      <p className="text-xs text-zinc-500 leading-relaxed mt-2">{note}</p>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-[color:var(--color-border-subtle)] min-h-[46vh] flex items-center">
          <div aria-hidden="true" className="absolute inset-0 opacity-50">
            <FieldMotif />
          </div>
          <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
            <p className="eyebrow mb-4">
              Design system
            </p>
            <h1 className="display-1 text-zinc-50 max-w-4xl">
              The visual language of CHP.
            </h1>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <p className="eyebrow mb-8">Principles</p>
          <div className="grid md:grid-cols-2 gap-4">
            {PRINCIPLES.map(([title, body]) => (
              <div key={title} className="border border-zinc-800/80 bg-zinc-900/50 rounded-xl p-6">
                <h2 className="text-base font-semibold text-zinc-100 mb-2">{title}</h2>
                <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <p className="eyebrow mb-3">Color tokens</p>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-8">
            Actors and states have fixed colors.
          </h2>
          <p className="font-mono text-[11px] text-zinc-600 uppercase mb-4">Actors</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {ACTOR_TOKENS.map(([n, t, note]) => (
              <Swatch key={t} name={n} token={t} note={note} />
            ))}
          </div>
          <p className="font-mono text-[11px] text-zinc-600 uppercase mb-4">States</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATE_TOKENS.map(([n, t, note]) => (
              <Swatch key={t} name={n} token={t} note={note} />
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <p className="eyebrow mb-3">Type scale &amp; rhythm</p>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-3">
            Large display type, generous bands.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-8">
            Utility classes in <code className="font-mono text-zinc-400">globals.css</code>{' '}
            carry the evolved scale. Headlines are fluid (<code className="font-mono text-zinc-400">clamp()</code>),
            tighter at large sizes; bands set a calm vertical rhythm.
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800">
            {TYPE_SCALE.map(([cls, use, spec], i) => (
              <div
                key={cls}
                className={`grid grid-cols-1 sm:grid-cols-[160px_1fr_1fr] gap-2 sm:gap-4 px-5 py-4 ${
                  i % 2 ? 'bg-zinc-900/40' : 'bg-zinc-900/70'
                }`}
              >
                <code className="font-mono text-sm text-[color:var(--color-signal-cyan)]">
                  {cls}
                </code>
                <span className="text-sm text-zinc-300">{use}</span>
                <span className="font-mono text-xs text-zinc-600">{spec}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <p className="eyebrow mb-3">Iconography</p>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-3">
            A glyph for every primitive.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-8">
            Schematic line-marks that frame the vocabulary visually — beside
            glossary terms, in eyebrows, and inside diagrams. Geometric, not
            decorative; stroke inherits <code className="font-mono text-zinc-400">currentColor</code>.
            Component: <code className="font-mono text-zinc-400">Glyph</code>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {GLYPHS.map(([name, label]) => (
              <div
                key={name}
                className="flex items-center gap-3 border border-zinc-800/80 bg-zinc-900/50 rounded-xl px-4 py-3"
              >
                <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-zinc-800 bg-zinc-900/60 text-[color:var(--color-signal-cyan)] shrink-0">
                  <Glyph name={name} size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-zinc-200">{label}</p>
                  <p className="font-mono text-[11px] text-zinc-600">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <p className="eyebrow mb-3">Signature motif</p>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-3">
            The field — many actions, one provable record.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-8">
            Actor actions drift in from the field and resolve onto a single
            evidence trace. Used once, in the hero. Pauses offscreen; static frame
            under reduced motion. Component: <code className="font-mono text-zinc-400">FieldMotif</code>.
          </p>
          <div className="relative h-64 rounded-lg border border-[color:var(--color-border-subtle)] overflow-hidden">
            <FieldMotif />
          </div>
        </section>

        <VisualGrammar />

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-b border-zinc-800/60">
          <p className="eyebrow mb-3">Diagrams</p>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-8">
            Concepts drawn as structured schematics.
          </h2>
          <div className="space-y-6">
            <EvidenceContractDiagram />
            <MeshTraceDiagram />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pt-20 md:pt-24">
          <p className="eyebrow mb-3">Data-driven motif</p>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-3">
            The catalog, mapped from real data.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
            A motif generated from the live adapter catalog — categories as
            clusters, adapters sized by the capabilities they declare. Documented
            here as a reusable pattern; surface it where breadth is the point.
            Component:{' '}
            <code className="font-mono text-zinc-400">CapabilityConstellation</code>.
          </p>
        </section>
        <CapabilityConstellation />
      </main>
      <SiteFooter />
    </div>
  );
}
