import Nav from './components/Nav';
import Hero from './components/Hero';
import AgentProofStrip from './components/AgentProofStrip';
import LaneFork from './components/LaneFork';
import VerticalGallery from './components/VerticalGallery';
import DifferentiationSection from './components/DifferentiationSection';
import StatsStrip from './components/StatsStrip';
import ConcreteCapabilityExample from './components/ConcreteCapabilityExample';
import FailureModesSection from './components/FailureModesSection';
import ProtocolArtifactSection from './components/ProtocolArtifactSection';
import EcosystemSection from './components/EcosystemSection';
import ProtocolGuaranteesSection from './components/ProtocolGuaranteesSection';
import PositioningSection from './components/PositioningSection';
import AdoptionPathsSection from './components/AdoptionPathsSection';
import AdoptionStatusSection from './components/AdoptionStatusSection';
import EvidenceFoundation from './components/EvidenceFoundation';
import HomepageFAQ from './components/HomepageFAQ';
import GitHubCTA from './components/GitHubCTA';
import SiteFooter from './components/SiteFooter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <AgentProofStrip />
      <LaneFork />
      <VerticalGallery />
      <DifferentiationSection />
      <StatsStrip />
      <ConcreteCapabilityExample />
      <FailureModesSection />
      <ProtocolArtifactSection />
      <ProtocolGuaranteesSection />
      <PositioningSection />
      <EcosystemSection />
      <AdoptionPathsSection />
      <AdoptionStatusSection />
      <EvidenceFoundation />
      <HomepageFAQ />
      <GitHubCTA />
      <SiteFooter />
    </div>
  );
}
