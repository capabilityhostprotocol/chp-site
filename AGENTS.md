# AGENTS.md — chp-site

Guidance for AI coding agents working on **chp-site**, the marketing site for the
Capability Host Protocol (CHP). (Fittingly: CHP is the evidence layer of the
agentic web — see `/agentic-web`. This site runs a live MCP server at `/api/mcp`.)

## Stack
- **Next.js 15** (App Router, RSC) + **Tailwind CSS 3** + TypeScript.
- Fonts (`next/font`): **Space Grotesk** display, **Inter** body, **JetBrains Mono** instrument labels.
- Deploys via GitHub → Vercel. Blog is MDX (`next-mdx-remote/rsc` + `gray-matter`).

## Commands
- `npm run dev` — local dev (the verification gate; keep one running).
- `npm run verify` — build with an isolated dist dir (`NEXT_DIST_DIR=.next-verify next build`) so a running `dev` is never clobbered. **Always run before pushing.**
- `npm run sync` — regenerates `data/adapters.json` + `data/capabilities.json` from the sibling `../chp-dev` repo (deploy-safe: keeps committed JSON when absent). Runs on predev/prebuild.

## Workflow (important)
- **Local-first verification.** Confirm changes on `localhost` (build + browser + Lighthouse) *before* push/merge. Do **not** spin up / wait on Vercel preview builds as the gate.
- Branch → PR → **squash-merge** to `main` (production deploy is merge-triggered).
- Never commit regenerated `data/*.json` or `next-env.d.ts` (revert them before staging).

## Design language (reuse, don't reinvent)
- Utilities in `app/globals.css`: `.band`/`.band-tight` (section rhythm), `.display-1`/`.display-2`/`.lede`/`.eyebrow` (type scale), `.surface-flat`/`.surface-raised`/`.surface-signature` (the **elevation ladder** — flat=structure, raised=content, signature=hero/CTA only), `.hover-lift`, `.rise`/`.reveal`.
- **Concept-mapped color tokens** (`--color-*`) are fixed meaning (actors, policy states, signal-cyan trace). Don't change them; dark-only.
- Visual-aid + motif system in `app/components/motif/`: `EvidenceChain`, `Glyph`, `CompareTable`, `Callout`, `PullQuote`, `Figure`, `EvidenceArtifact`, `ChainDivider`, `EvidenceTexture`, `Reveal`, `ScrollStory`. Blog posts embed these via the MDX map in `app/blog/[slug]/page.tsx`.
- `/design-system` documents all of the above — read it before adding visuals.

## Architecture pointers
- `app/lib/`: `capabilities.ts` + `adapters.ts` (catalog data), `content.ts` (copy/examples), `blog.ts`, `learn.ts` (the MCP knowledge base), `motion.ts` (hooks).
- Agent surface: `app/api/[transport]/route.ts` (the live **MCP server**), `app/.well-known/{agent-card.json,mcp/server-card.json,capabilities.json}`, `app/{llms.txt,capabilities.txt,robots.ts,sitemap.ts,feed.xml}`. Keep these in sync when adding routes.
- Structured data: `Organization`/`SoftwareApplication` (layout), `BlogPosting`/`FAQPage`/`DefinedTermSet`/`ItemList` on relevant pages — keep JSON-LD valid.

## Guardrails (non-negotiable)
- **No live mesh/served counts.** Surface only the *static* capabilities the open adapters declare (catalog), never running-node or served-capability counts. Frame qualitatively.
- **Honest framing.** Distinguish *real today* (agents: `chp hooks install`) from *demonstrated / design-partner* work. Invitational, not overclaiming.
- **Accessibility:** keep Lighthouse at 100. Muted text floor is `zinc-400` (lower fails WCAG AA on the dark field). Every page has a `<main>` landmark + meta description.
- **Reduced-motion safe:** all motion neutralized by the `prefers-reduced-motion` block; reveals are transform-only (never hide content).

## Don't
- Don't fabricate evidence/metrics, spec details, or capability data — draw from `data/*.json`, `app/lib/*`, or link to docs.
- Don't add heavy client JS to content pages (performance budget: LCP < 0.5s, CLS 0).
