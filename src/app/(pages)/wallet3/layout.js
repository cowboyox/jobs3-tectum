'use client';
import React from 'react';

import DashboardHeader from '../../../components/layout/dashboard_header';
import SideBar from '../../../components/layout/sidebar';
import useDropdown from '../../../hooks/useDropdown';

export default function WalletApp({ children }) {
  useDropdown();
  return (
    <div className='mx-auto flex min-h-screen max-w-[2600px] items-start gap-0 bg-[var(--page_background)]'>
      <SideBar />
      <div className='w-full p-4 pb-24'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
