import type { Metadata } from 'next';
import Nav from './components/Nav';
import Hero from './components/Hero';
import AgentProofStrip from './components/AgentProofStrip';
import Applications from './components/Applications';
import VerticalGallery from './components/VerticalGallery';
import DifferentiationSection from './components/DifferentiationSection';
import StatsStrip from './components/StatsStrip';
import GoDeeper from './components/GoDeeper';
import GitHubCTA from './components/GitHubCTA';
import SiteFooter from './components/SiteFooter';

export const metadata: Metadata = {
  description:
    'See exactly what your AI agents did — every tool call captured as replayable, tamper-evident evidence in one command. CHP is the open protocol for declaring, governing, and proving what agents, products, and organizations do.',
  alternates: { canonical: 'https://capabilityhostprotocol.com' },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <AgentProofStrip />
        <Applications />
        <VerticalGallery />
        <DifferentiationSection />
        <StatsStrip />
        <GoDeeper />
        <GitHubCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
