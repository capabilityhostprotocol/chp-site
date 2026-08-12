import { NextResponse } from 'next/server';
import { z } from 'zod';

// Reusable waitlist intake for every CHP product (a2a.computer, CHP Home, CHP Legal, …).
// Persists to Neon when DATABASE_URL is set; returns 503 otherwise so the form can offer a
// fallback rather than silently dropping a lead. Add DATABASE_URL (Neon) in the chp-site
// Vercel project to go live.

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const Body = z.object({
  product: z.string().min(1).max(64),
  name: z.string().min(1).max(120),
  email: z.string().min(3).max(254).regex(EMAIL, 'invalid email'),
  org: z.string().max(160).optional().default(''),
  role: z.string().max(120).optional().default(''),
  useCase: z.string().max(2000).optional().default(''),
  designPartner: z.boolean().optional().default(false),
  source: z.string().max(200).optional().default(''),
  consent: z.literal(true),
  // honeypot — bots fill hidden fields; humans never see it. Accept any value here so the
  // handler can silently 200 (below) rather than signalling the bot with a 400.
  companyWebsite: z.string().max(200).optional().default(''),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const d = parsed.data;

  // Honeypot tripped → accept without storing, so bots get no signal.
  if (d.companyWebsite) return NextResponse.json({ ok: true });

  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json(
      { error: 'waitlist storage not configured' },
      { status: 503 },
    );
  }

  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id bigserial PRIMARY KEY,
        product text NOT NULL,
        name text NOT NULL,
        email text NOT NULL,
        org text,
        role text,
        use_case text,
        design_partner boolean DEFAULT false,
        source text,
        created_at timestamptz DEFAULT now()
      )
    `;
    await sql`
      INSERT INTO waitlist (product, name, email, org, role, use_case, design_partner, source)
      VALUES (${d.product}, ${d.name}, ${d.email}, ${d.org}, ${d.role}, ${d.useCase}, ${d.designPartner}, ${d.source})
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('waitlist insert failed', err);
    return NextResponse.json({ error: 'storage error' }, { status: 500 });
  }
}
