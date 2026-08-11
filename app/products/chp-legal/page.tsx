import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import SectionShell from '../../components/SectionShell';
import SectionHeader from '../../components/SectionHeader';
import SurfacePanel from '../../components/SurfacePanel';
import ButtonLink from '../../components/ButtonLink';
import Badge from '../../components/Badge';

export const metadata: Metadata = {
  title: 'CHP Legal — governed AI-assisted legal work',
  description:
    'CHP Legal is a governed operating plane for the daily practice of law: AI-assisted drafting, docketing, and filing with chain of custody, privilege-aware operations, and defensible time capture. In design-partner development on the Capability Host Protocol.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/products/chp-legal' },
};

export default function ChpLegalProductPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24">
          <div className="flex items-center gap-3 mb-4">
            <p className="eyebrow">Product · CHP Legal</p>
            <Badge tone="required">Design partners</Badge>
          </div>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            AI in legal work, defensible by construction.
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mb-4">
            CHP Legal is a governed operating plane for the daily practice of law. The AI helps
            draft, docket, capture time, and file — and every step it takes carries chain of
            custody, respects privilege and matter isolation, and records who authorized what.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
            The hard part of AI in a law firm is not capability — it is accountability. CHP
            Legal produces the record a matter needs as the work happens, not reconstructed
            under scrutiny.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <ButtonLink href="/waitlist?product=chp-legal">Become a design partner</ButtonLink>
            <ButtonLink href="/industries/legal" variant="secondary">
              Legal, on CHP
            </ButtonLink>
          </div>
        </section>

        <SectionShell>
          <SectionHeader
            eyebrow="The jobs"
            title="Where governed automation earns its place."
          />
          <div className="grid gap-4 md:grid-cols-3 mt-8">
            {[
              ['Docketing', 'Turn email and filings into docket entries — with reconciliation that catches double-docketing before it reaches a calendar.'],
              ['Time capture', 'Observed time, billable time, and invoiced time are distinct records, never silently transformed into one another. Defensible by design.'],
              ['Drafting & precedent', 'Precedent-assisted drafting where sources and prior work product stay attributable to what informed them.'],
              ['Meetings & calls', 'Consent-aware capture of calls and meetings, recorded as governed events rather than opaque transcripts.'],
              ['Filing', 'A filing workbench where each submission carries who prepared it, who approved it, and the invariants it had to satisfy.'],
              ['Privilege-aware', 'Privilege is an explicit decision in the record — asserted, not assumed — and matters stay isolated from one another.'],
            ].map(([title, body]) => (
              <SurfacePanel key={title}>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
              </SurfacePanel>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeader
            eyebrow="Where it stands"
            title="Building with design partners."
            body="The governance model and workflows are specified, and the substrate they stand on — governed invocation, approvals, evidence — is real and in use across CHP today. We're building CHP Legal with a select set of design partners."
          />
        </SectionShell>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-zinc-800/60">
          <div className="surface-signature p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Practice law with a record you can defend.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                We&apos;re selecting design partners now. Tell us about your practice.
              </p>
            </div>
            <ButtonLink href="/waitlist?product=chp-legal">Become a design partner</ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
