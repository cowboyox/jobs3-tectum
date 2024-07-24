'use client';
import React from 'react';

import Layout from '@/components/layout/Layout';

export default function Referral({ children }) {
  return (
    <div className='jobs3_dashboard_app'>
      <div className='site_container w-full p-4 pt-0'>
        <Layout>{children}</Layout>
      </div>
    </div>
  );
}
