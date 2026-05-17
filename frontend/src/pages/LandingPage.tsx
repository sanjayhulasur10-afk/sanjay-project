import React from 'react';
import { HeroOrbitDeck } from '../components/ui/hero-modern';
import { MoneyflowLandingPage } from '../components/ui/fin-tech-landing-page';
import { CleanWireframeAnalytics } from '../components/ui/line-graph-statistics';
import { FooterSection } from '../components/ui/footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30">
      {/* 1. HeroOrbitDeck */}
      <HeroOrbitDeck />
      
      {/* 2. MoneyflowLandingPage modified for Water Intelligence */}
      <MoneyflowLandingPage />
      
      {/* 3. CleanWireframeAnalytics modified for Sensor Feeds */}
      <CleanWireframeAnalytics />
      
      {/* 4. FooterSection */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;
