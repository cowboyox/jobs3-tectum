'use client';
import React from 'react';
import useDropdown from '../../../hooks/useDropdown';

import SideBar from '../../../components/layout/sidebar';
import DashboardHeader from '../../../components/layout/dashboard_header';

export default function DashboardApp({ children }) {
  useDropdown();
  return (
    <div className="quanmed_dashboard_app"> 
      <SideBar />
      <div className="routes_container">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}