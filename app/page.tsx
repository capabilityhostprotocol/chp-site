import Nav from './components/Nav';
import Hero from './components/Hero';
import AgentProofStrip from './components/AgentProofStrip';
import LaneFork from './components/LaneFork';
import UseCasesSection from './components/UseCasesSection';
import VerticalGallery from './components/VerticalGallery';
import DifferentiationSection from './components/DifferentiationSection';
import StatsStrip from './components/StatsStrip';
import GoDeeper from './components/GoDeeper';
import GitHubCTA from './components/GitHubCTA';
import SiteFooter from './components/SiteFooter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <AgentProofStrip />
      <LaneFork />
      <UseCasesSection />
      <VerticalGallery />
      <DifferentiationSection />
      <StatsStrip />
      <GoDeeper />
      <GitHubCTA />
      <SiteFooter />
    </div>
  );
}
