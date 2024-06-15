'use client';
import React, { useState } from 'react';
import useDropdown from '../../../hooks/useDropdown';

import SideBar from '../../../components/layout/sidebar';
import DashboardHeader from '../../../components/layout/dashboard_header'; 

export default function DashboardApp({ children }) {
  const [userRole, setUserRole] = useState(0);
  console.log("🚀 ~ DashboardApp ~ userRole:", userRole)

  useDropdown();
  return (
    <div className="jobs3_dashboard_app"> 
      <SideBar userRole={userRole} setUserRole={setUserRole} />
      <div className='site_container w-full p-4 pt-0 md:w-5/6'>
        <div id='page_content_layout'>
          <DashboardHeader userRole={userRole} setUserRole={setUserRole}  />
          {children}
        </div>
      </div>        
    </div>
  );
}