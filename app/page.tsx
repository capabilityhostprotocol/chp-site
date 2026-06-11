import Nav from './components/Nav';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import EcosystemSection from './components/EcosystemSection';
import ProtocolGuaranteesSection from './components/ProtocolGuaranteesSection';
import AdoptionPathsSection from './components/AdoptionPathsSection';
import EvidenceFoundation from './components/EvidenceFoundation';
import GitHubCTA from './components/GitHubCTA';
import SiteFooter from './components/SiteFooter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <StatsStrip />
      <EcosystemSection />
      <ProtocolGuaranteesSection />
      <AdoptionPathsSection />
      <EvidenceFoundation />
      <GitHubCTA />
      <SiteFooter />
    </div>
  );
}
