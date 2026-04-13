import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

const Process     = lazy(() => import('./components/Process').then(m => ({ default: m.Process })));
const Features    = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const Benefits    = lazy(() => import('./components/Benefits').then(m => ({ default: m.Benefits })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQ         = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const CTA         = lazy(() => import('./components/CTA').then(m => ({ default: m.CTA })));
const Footer      = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#ecedf1] font-sans text-slate-900 selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '200vh' }} />}>
          <Process />
          <Features />
          <Benefits />
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
