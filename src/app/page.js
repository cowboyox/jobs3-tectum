import React from 'react';
// Components
import Layout from '@/components/layout/Layout';

import HeroSection from '@/components/pages/home/hero';
import GetPaid from '@/components/pages/home/get-paid';
import ExploreSection from '@/components/pages/home/explore';
import PerfectFor from '@/components/pages/home/perfect-for';
import FAQ from '@/components/pages/home/faq';
import ReferFirend from '@/components/pages/home/refer-firend';

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
