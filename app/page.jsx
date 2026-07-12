'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Industries from '@/components/Industries';
import WhyItWorks from '@/components/WhyItWorks';
import Capabilities from '@/components/Capabilities';
import DemoSection from '@/components/DemoSection';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Industries />
      <WhyItWorks />
      <Capabilities />
      <DemoSection />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
