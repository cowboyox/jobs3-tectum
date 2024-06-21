'use client';
import React, { useState } from 'react';

import DashboardHeader from '../../../components/layout/dashboard_header';
import SideBar from '../../../components/layout/sidebar';
import useDropdown from '../../../hooks/useDropdown';

export default function DashboardApp({ children }) {
  const [userRole, setUserRole] = useState(0);

  useDropdown();
  return (
    <div className='jobs3_dashboard_app'>
      <SideBar setUserRole={setUserRole} userRole={userRole} />
      <div className='site_container w-full p-4 pt-0 md:w-5/6'>
        <div id='page_content_layout'>
          <DashboardHeader setUserRole={setUserRole} userRole={userRole} />
          {children}
        </div>
      </div>
    </div>
  );
}
