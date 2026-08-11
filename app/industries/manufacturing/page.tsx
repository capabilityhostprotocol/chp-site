import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import BreadcrumbLd from '../../components/BreadcrumbLd';
import SiteFooter from '../../components/SiteFooter';
import CodePanel from '../../components/CodePanel';
import { OUTCOME_EXAMPLE } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Manufacturing & industrial - Capability Host Protocol',
  description:
    'Govern what humans and agents command on the floor — dispatch and machine actions gated by approval and safety invariants, stitched across edge hosts into one trace. How CHP governs and evidences AI in industrial operations.',
};

const FLOW = [
  {
    step: 'The pain',
    body: 'Work orders, dispatches, and machine commands are increasingly issued by software and agents, not just people. When something goes wrong, you need to show who or what commanded the action, whether it was approved, and whether a safety condition was checked.',
  },
  {
    step: 'The trigger',
    body: 'A safety incident or an audit asks: “Who authorized this command, and was the required check in place?” Stitching that together across the PLCs, services, and edge devices involved is currently a manual investigation.',
  },
  {
    step: 'Who owns it',
    body: 'Operations and controls engineering, with plant IT — accountable for safe, authorized action and for the record that proves it.',
  },
  {
    step: 'What CHP does',
    body: 'A command crosses a capability boundary that requires approval and can declare a safety invariant; the action is denied at the boundary if a condition fails. Hosts across the floor share one correlation, so a process spanning many machines replays as a single ordered trace. (Real-time control loops stay out of scope — CHP governs and evidences the boundary above them.)',
  },
];

export default function ManufacturingIndustryPage() {
  return (
    <div className="min-h-screen">
      <BreadcrumbLd items={[{ name: 'Home', path: '' }, { name: 'Manufacturing & industrial', path: '/industries/manufacturing' }]} />
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="flex items-center gap-3 mb-4">
            <p className="eyebrow">
              Industries · Manufacturing &amp; industrial
            </p>
            <span className="font-mono text-[10px] uppercase text-zinc-400 border border-zinc-700 rounded px-2 py-1">
              Design partners
            </span>
          </div>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Govern what humans and agents command on the floor.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Approval, safety invariants, denial, and a trace stitched across edge
            hosts are all in the protocol today. The plant-floor operational
            hardening is what we build with design partners.
          </p>
          <a
            href="/blog/who-commanded-the-machine"
            className="inline-block mt-6 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            Read the essay: “Who commanded the machine?” →
          </a>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-y border-zinc-800/60">
          <div className="grid md:grid-cols-2 gap-4">
            {FLOW.map((f) => (
              <div
                key={f.step}
                className="surface-raised p-6"
              >
                <p className="eyebrow mb-3">
                  {f.step}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div>
              <p className="eyebrow mb-3">
                The record
              </p>
              <h2 className="display-2 text-zinc-100 mb-4">
                A command, gated and accounted for.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                This is a real CHP outcome for a dispatch action: the boundary
                denied it because a required entitlement was missing — a
                first-class, replayable decision rather than an exception buried in
                a controller log. The same shape carries an approval or a passed
                safety check.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Approval, invariants, denial, and cross-host correlation run today.
                Plant-grade hardening and integration are what we build with design
                partners.
              </p>
            </div>
            <CodePanel code={OUTCOME_EXAMPLE} label="dispatch outcome — denied at the boundary" language="json" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Automating dispatch or machine actions?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Bring a real command flow. We’ll map approval and safety invariants
                onto the protocol and stitch the edge trace with you.
              </p>
            </div>
            <a
              href="/design-partners"
              className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              Build it with us
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
