'use client';
import React from 'react';

import DashboardHeader from '../../../components/layout/dashboard_header';

export default function ReferralLayout({ children }) {
  return (
    <div className='jobs3_dashboard_app'>
      <div className='site_container w-full p-4 pt-0'>
        <div className='mx-auto max-w-7xl'>
          <DashboardHeader />
          {children}
        </div>
      </div>
    </div>
  );
}
