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

function score(text: string, qt: string[]): number {
  const t = text.toLowerCase();
  return qt.reduce((n, w) => n + (t.includes(w) ? 1 : 0), 0);
}

function answer(query: string) {
  const qt = tokens(query);
  if (qt.length === 0) {
    return {
      query,
      note: 'Ask about CHP: concepts, the evidence model, adoption, capabilities. e.g. /ask?q=how does CHP prove what an agent did',
      topics: Object.keys(CONCEPTS),
      terms: Object.keys(GLOSSARY),
    };
  }

  const concepts = Object.entries(CONCEPTS)
    .map(([id, c]) => ({ id, c, s: score(c.title + ' ' + c.body, qt) + score(id, qt) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  const terms = Object.entries(GLOSSARY)
    .map(([k, v]) => ({ k, v, s: score(k + ' ' + v, qt) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  const faqs = FAQS.map((f) => ({ f, s: score(f.question + ' ' + f.answer, qt) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  const caps = capabilityAdapters
    .flatMap((a) => a.capabilities)
    .map((c) => ({ c, s: score(c.id + ' ' + (c.description ?? ''), qt) }))
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

function respond(query: string) {
  return new Response(JSON.stringify(answer(query), null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q') ?? '';
  return respond(q);
}

export async function POST(req: Request) {
  let q = '';
  try {
    const body = (await req.json()) as { q?: string; query?: string };
    q = body.q ?? body.query ?? '';
  } catch {
    /* empty body */
  }
  return respond(q);
}
