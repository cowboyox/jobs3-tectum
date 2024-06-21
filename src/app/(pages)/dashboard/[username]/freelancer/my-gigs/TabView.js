'use client';

import React, { useState } from 'react';
import ActiveView from './Active';
import DraftsView from './Drafts';

const TabView = ({ allGigs }) => {
  const buttonTexts = ['Active', 'Drafts'];
  const [selectedTab, setSelectedTab] = useState('Active');

  return (
    <>
      <div className='mx-auto flex w-full rounded-tl-[12px] rounded-tr-[12px]'>
        {buttonTexts.map((item, index) => (
          <div
            className={`flex-1 cursor-pointer border-b-4 py-6 text-center text-white ${
              selectedTab === item ? 'border-[#DC4F13]' : 'border-[#516170]'
            }`}
            key={index}
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
