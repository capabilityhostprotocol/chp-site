import type { Metadata } from 'next';
import Nav from './components/Nav';
import Hero from './components/Hero';
import AgentProofStrip from './components/AgentProofStrip';
import SessionInspector from './components/motif/SessionInspector';
import Applications from './components/Applications';
import VerticalGallery from './components/VerticalGallery';
import ScrollStory from './components/motif/ScrollStory';
import DifferentiationSection from './components/DifferentiationSection';
import StatsStrip from './components/StatsStrip';
import ProductsStrip from './components/ProductsStrip';
import GoDeeper from './components/GoDeeper';
import ChainDivider from './components/motif/ChainDivider';
import Reveal from './components/motif/Reveal';
import GitHubCTA from './components/GitHubCTA';
import SiteFooter from './components/SiteFooter';

export const metadata: Metadata = {
  description:
    'Govern what your AI agents can actually do — every capability declared, every invocation allowed or denied, every result captured as replayable, tamper-evident evidence in one command. CHP is the open protocol for declaring, discovering, invoking, governing, and proving what agents, products, and organizations can do.',
  alternates: { canonical: 'https://capabilityhostprotocol.com' },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Reveal>
          <AgentProofStrip />
        </Reveal>
        <Reveal>
          <section className="border-b border-zinc-800/60">
            <div className="band-tight">
              <p className="eyebrow mb-3">Inspect a real session</p>
              <h2 className="display-2 text-zinc-100 mb-3 max-w-2xl">
                Evidence you can open — not just claims.
              </h2>
              <p className="text-zinc-400 leading-relaxed max-w-2xl mb-8">
                Every invocation, including a denial, is a hash-chained event you can inspect
                and replay. Open the denial to see its reason code; tamper a block and watch
                the chain break.
              </p>
              <SessionInspector />
            </div>
          </section>
        </Reveal>
        <Reveal>
          <Applications />
        </Reveal>
        <Reveal>
          <VerticalGallery />
        </Reveal>
        <ScrollStory />
        <Reveal>
          <DifferentiationSection />
        </Reveal>
        <ChainDivider />
        <Reveal>
          <StatsStrip />
        </Reveal>
        <Reveal>
          <ProductsStrip />
        </Reveal>
        <Reveal>
          <GoDeeper />
        </Reveal>
        <Reveal>
          <GitHubCTA />
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
