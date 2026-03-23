import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Process } from './components/Process';
import { Features } from './components/Features';
import { Benefits } from './components/Benefits';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#ecedf1] font-sans text-slate-900 selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <Process />
        <Features />
        <Benefits />
        <About />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
