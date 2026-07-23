import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PageIntro } from './components/PageIntro';

const GrowthScore = lazy(() => import('./components/GrowthScore').then(m => ({ default: m.GrowthScore })));
const TrustedBy   = lazy(() => import('./components/TrustedBy').then(m => ({ default: m.TrustedBy })));
const WhatWeDo    = lazy(() => import('./components/WhatWeDo').then(m => ({ default: m.WhatWeDo })));
const Process     = lazy(() => import('./components/Process').then(m => ({ default: m.Process })));
const Features    = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const MiniTeam    = lazy(() => import('./components/MiniTeam').then(m => ({ default: m.MiniTeam })));
const CaseStudies = lazy(() => import('./components/CaseStudies').then(m => ({ default: m.CaseStudies })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQ         = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const CTA         = lazy(() => import('./components/CTA').then(m => ({ default: m.CTA })));
const Footer      = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      let attempts = 0;
      const scrollWhenReady = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        if (attempts++ < 40) window.setTimeout(scrollWhenReady, 50);
      };
      scrollWhenReady();
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#ecedf1] font-sans text-slate-900 selection:bg-primary/20">
      <PageIntro />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '36rem' }} />}>
          <GrowthScore />
        </Suspense>
        <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '28rem' }} />}>
          <TrustedBy />
        </Suspense>
        <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '36rem' }} />}>
          <WhatWeDo />
        </Suspense>
        <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '42rem' }} />}>
          <Process />
        </Suspense>
        <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '80vh' }} />}>
          <Features />
        </Suspense>
        <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '24rem' }} />}>
          <MiniTeam />
        </Suspense>
        <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '80vh' }} />}>
          <CaseStudies />
          <Testimonials />
          <FAQ />
          <CTA />
        </Suspense>
      </main>
      <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '12rem' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
