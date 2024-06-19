'use client';

import React, { useState } from 'react';
import ActiveView from './Active';
import DraftsView from './Drafts';

const TabView = ({ allGigs }) => {
  const buttonTexts = ['Active', 'Drafts'];
  const [selectedTab, setSelectedTab] = useState('Active');

  return (
    <>
      <div className='flex w-full mx-auto rounded-tl-[12px] rounded-tr-[12px]'>
        {buttonTexts.map((item, index) => (
          <div
            key={index}
            className={`flex-1 py-6 text-center text-white cursor-pointer border-b-4 ${
              selectedTab === item ? ' border-[#DC4F13]' : 'border-[#516170]'
            }`}
            onClick={() => setSelectedTab(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className='mt-10'>
        {selectedTab === 'Active' && <ActiveView allGigs={allGigs} />}
        {selectedTab === 'Drafts' && <DraftsView allGigs={allGigs} />}
      </div>
    </>
  );
};

export default TabView;
