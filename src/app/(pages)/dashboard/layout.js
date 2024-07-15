'use client';
import React from 'react';

import DashboardHeader from '../../../components/layout/dashboard_header';
import SideBar from '../../../components/layout/sidebar';
import useDropdown from '../../../hooks/useDropdown';

export default function DashboardApp({ children }) {
  useDropdown();
  return (
    <div className='jobs3_dashboard_app'>
      <SideBar />
      <div className='site_container w-full p-4 pt-0'>
        <div className='mx-auto max-w-7xl'>
          <DashboardHeader />
          {children}
        </div>
      </div>
    </div>
  );
}
