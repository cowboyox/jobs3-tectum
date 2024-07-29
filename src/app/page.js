import React from 'react';
// Components
import Layout from '@/components/layout/Layout';

import HeroSection from '@/components/pages/home/hero.js';
import GetPaid from '@/components/pages/home/get-paid.js';
import ExploreSection from '@/components/pages/home/explore.js';
import PerfectFor from '@/components/pages/home/perfect-for.js';
import FAQ from '@/components/pages/home/faq.js';
import ReferFirend from '@/components/pages/home/refer-firend.js';

export default function Home() {
  return (
    <Layout pageClass='home_page'>
      <HeroSection />
      <GetPaid />
      <ExploreSection />
      <PerfectFor />
      <FAQ />
      <ReferFirend />
    </Layout>
  );
}
