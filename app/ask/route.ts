import { GLOSSARY, CONCEPTS, FAQS, ADOPT } from '../lib/learn';
import { capabilityAdapters } from '../lib/capabilities';

export const revalidate = false;

/**
 * /ask — a structured natural-language query endpoint over CHP's knowledge
 * base, for humans and agents (an NLWeb-style /ask, complementing the MCP
 * server). Honest scope: keyword/relevance retrieval over real CHP content,
 * not an LLM. GET /ask?q=... or POST {"q":"..."}.
 */

const SITE = 'https://capabilityhostprotocol.com';

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9.]+/)
    .filter((t) => t.length > 2);
}

// Weighted relevance: matches in a key/term or title count far more than in a
// long body, and an exact term/title appearing in the query gets a phrase
// bonus — so "capability boundary" resolves to that term, not the CHP overview.
function rank(
  qt: string[],
  q: string,
  fields: { key?: string; title?: string; body?: string },
): number {
  const { key = '', title = '', body = '' } = fields;
  const hits = (s: string) => qt.filter((w) => s.toLowerCase().includes(w)).length;
  let s = hits(key) * 5 + hits(title) * 3 + Math.min(hits(body), 3);
  if (key && q.includes(key.toLowerCase())) s += 12;
  if (title && q.includes(title.toLowerCase())) s += 8;
  return s;
}

function answer(query: string) {
  const qt = tokens(query);
  const q = query.toLowerCase();
  if (qt.length === 0) {
    return {
      query,
      note: 'Ask about CHP: concepts, the evidence model, adoption, capabilities. e.g. /ask?q=how does CHP prove what an agent did',
      topics: Object.keys(CONCEPTS),
      terms: Object.keys(GLOSSARY),
    };
  }

  const concepts = Object.entries(CONCEPTS)
    .map(([id, c]) => ({ id, c, s: rank(qt, q, { key: id, title: c.title, body: c.body }) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  const terms = Object.entries(GLOSSARY)
    .map(([k, v]) => ({ k, v, s: rank(qt, q, { key: k, body: v }) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  const faqs = FAQS.map((f) => ({ f, s: rank(qt, q, { title: f.question, body: f.answer }) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  const caps = capabilityAdapters
    .flatMap((a) => a.capabilities)
    .map((c) => ({ c, s: rank(qt, q, { key: c.id, body: c.description ?? '' }) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 8);

  // Pick the single strongest hit as the headline answer.
  const best = [
    concepts[0] && { type: 'concept', s: concepts[0].s, title: concepts[0].c.title, text: concepts[0].c.body, learnMore: concepts[0].c.learnMore },
    terms[0] && { type: 'definition', s: terms[0].s, title: terms[0].k, text: terms[0].v, learnMore: `${SITE}/glossary` },
    faqs[0] && { type: 'faq', s: faqs[0].s, title: faqs[0].f.question, text: faqs[0].f.answer, learnMore: `${SITE}/why-a-protocol` },
  ]
    .filter(Boolean)
    .sort((a, b) => (b!.s as number) - (a!.s as number))[0];

  return {
    query,
    answer: best
      ? { type: best.type, title: best.title, text: best.text, learnMore: best.learnMore }
      : null,
    related: {
      concepts: concepts.slice(0, 4).map((x) => ({ id: x.id, title: x.c.title })),
      terms: terms.slice(0, 6).map((x) => x.k),
      faqs: faqs.slice(0, 3).map((x) => x.f.question),
      capabilities: caps.map((x) => ({ id: x.c.id, description: x.c.description })),
    },
    adopt: ADOPT.steps[0],
    sources: {
      mcp: `${SITE}/api/mcp`,
      docs: 'https://docs.capabilityhostprotocol.com',
      agenticWeb: `${SITE}/agentic-web`,
    },
  };
}

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body, null, 2), { status, headers: CORS });
}

// Structured JSON error — agents can't parse HTML error pages.
function jsonError(status: number, code: string, message: string, hint?: string) {
  return json({ error: { code, message, ...(hint ? { hint } : {}) } }, status);
}

export function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q') ?? '';
  return json(answer(q));
}

export async function POST(req: Request) {
  let q = '';
  const raw = await req.text();
  if (raw.trim()) {
    try {
      const body = JSON.parse(raw) as { q?: string; query?: string };
      q = body.q ?? body.query ?? '';
    } catch {
      return jsonError(
        400,
        'invalid_request',
        'Request body must be valid JSON.',
        'Send {"q": "your question"} with Content-Type: application/json, or use GET /ask?q=...',
      );
    }
  }
  return json(answer(q));
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
