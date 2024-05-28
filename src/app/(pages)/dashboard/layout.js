'use client';
import React from 'react';
import useDropdown from '../../../hooks/useDropdown';

import SideBar from '../../../components/layout/sidebar';
import DashboardHeader from '../../../components/layout/dashboard_header'; 

export default function DashboardApp({ children }) {
  useDropdown();
  return (
    <div className="jobs3_dashboard_app"> 
      <SideBar />
      <div className='w-full p-4 md:w-5/6'>
        <div className="px-5 py-5 md:px-8 border border-slate-500 rounded-xl">
          <DashboardHeader />
          {children}
        </div>
      </div>        
    </div>
  );
}