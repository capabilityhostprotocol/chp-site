import Nav from './components/Nav';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import ZeroFrictionAdoption from './components/ZeroFrictionAdoption';
import PlatformGrid from './components/PlatformGrid';
import EvidenceFoundation from './components/EvidenceFoundation';
import ModelAdapters from './components/ModelAdapters';
import AgenticSection from './components/AgenticSection';
import DataCapabilitiesSection from './components/DataCapabilitiesSection';
import SafetySection from './components/SafetySection';
import PolicyEngineSection from './components/PolicyEngineSection';
import ProductionPath from './components/ProductionPath';
import CLISection from './components/CLISection';
import ObservabilitySection from './components/ObservabilitySection';
import InstallSection from './components/InstallSection';
import PhilosophyQuote from './components/PhilosophyQuote';
import GitHubCTA from './components/GitHubCTA';
import SiteFooter from './components/SiteFooter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <StatsStrip />
      <ZeroFrictionAdoption />
      <PlatformGrid />
      <EvidenceFoundation />
      <ModelAdapters />
      <AgenticSection />
      <DataCapabilitiesSection />
      <SafetySection />
      <PolicyEngineSection />
      <ProductionPath />
      <CLISection />
      <ObservabilitySection />
      <InstallSection />
      <PhilosophyQuote />
      <GitHubCTA />
      <SiteFooter />
    </div>
  );
}
