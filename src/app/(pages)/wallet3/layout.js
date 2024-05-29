'use client';
import React from 'react';
import useDropdown from '../../../hooks/useDropdown';

import SideBar from '../../../components/layout/sidebar';
import DashboardHeader from '../../../components/layout/dashboard_header';

export default function WalletApp({ children }) {
  useDropdown();
  return (
    <div className="min-h-screen bg-[var(--page_background)] flex items-start gap-0 max-w-[2600px] mx-auto"> 
      <SideBar />
      <div className="w-full p-4 pb-24">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}