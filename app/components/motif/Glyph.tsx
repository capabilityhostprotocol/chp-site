import type { SVGProps } from 'react';

/**
 * Glyph — a small line-glyph for each CHP primitive, used to frame concepts
 * visually (beside glossary terms, in eyebrows, inside diagrams). Geometric and
 * schematic on purpose — these are wayfinding marks, not decoration. Stroke
 * inherits `currentColor` so callers set the tone.
 */
export type GlyphName =
  | 'capability'
  | 'boundary'
  | 'host'
  | 'invocation'
  | 'evidence'
  | 'chain'
  | 'correlation'
  | 'denial'
  | 'replay'
  | 'conformance'
  | 'descriptor'
  | 'adapter'
  | 'discovery';

const PATHS: Record<GlyphName, React.ReactNode> = {
  // named, invokable unit — a diamond
  capability: <path d="M12 3l9 9-9 9-9-9 9-9z" />,
  // the line intent crosses into effect
  boundary: (
    <>
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M3 12h11M11 8.5l3.5 3.5L11 15.5" />
    </>
  ),
  // a runtime that exposes capabilities — framed surface with a core
  host: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  // a call entering — envelope
  invocation: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M4 8l8 5.5L20 8" />
    </>
  ),
  // a proven record — document with a check
  evidence: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M8.5 14l2.5 2.5L16 11.5" />
    </>
  ),
  // hash-chain — two interlocking links
  chain: (
    <>
      <rect x="2.5" y="8.5" width="11" height="7" rx="3.5" />
      <rect x="10.5" y="8.5" width="11" height="7" rx="3.5" />
    </>
  ),
  // many threads weaving into one trace
  correlation: (
    <>
      <path d="M3 5c8 0 7 7 18 7" />
      <path d="M3 12h18" />
      <path d="M3 19c8 0 7-7 18-7" />
    </>
  ),
  // refused at the boundary — circle with a slash
  denial: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
    </>
  ),
  // reconstructed in order — circular arrow
  replay: (
    <>
      <path d="M20.5 12a8.5 8.5 0 1 1-2.8-6.3" />
      <path d="M20.5 4v5h-5" />
    </>
  ),
  // a verifiable, conformance-backed seal — shield with check
  conformance: (
    <>
      <path d="M12 3l7 2.5v6c0 4.7-3.7 7.6-7 8.5-3.3-.9-7-3.8-7-8.5v-6z" />
      <path d="M8.7 12l2.3 2.3 4.3-4.8" />
    </>
  ),
  // the schema/declaration — a tag
  descriptor: (
    <>
      <path d="M13 3H4v9l8 9 9-9z" />
      <circle cx="7.8" cy="7.8" r="1.4" />
    </>
  ),
  // a connector to an external system — a plug
  adapter: (
    <>
      <rect x="6" y="9" width="12" height="10" rx="2" />
      <path d="M9.5 9V5M14.5 9V5" />
    </>
  ),
  // a public, crawlable advertisement — a listed document
  discovery: (
    <>
      <path d="M6 3h12v18H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
};

export default function Glyph({
  name,
  size = 20,
  className,
  ...rest
}: { name: GlyphName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
