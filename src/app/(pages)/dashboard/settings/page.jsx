'use client';
import React, { useState } from 'react';
import AccountView from '@/components/dashboard/settings/AccountView';
import BillingView from '@/components/dashboard/settings/BillingView';
import NotificationView from '@/components/dashboard/settings/NotificationView';

const buttonTexts = ['Account', 'Billing and Payments', 'Password and Security', 'Notifications'];

const Page = () => {
  const [selectedTab, setSelectedTab] = useState('Account');

  return (
    <>
      <div className='mx-auto flex max-w-[1130px] rounded-tl-[12px] rounded-tr-[12px] bg-[#1B272C]'>
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
        {selectedTab === 'Account' && <AccountView />}
        {selectedTab === 'Billing and Payments' && <BillingView />}
        {selectedTab === 'Password and Security' && <AccountView />}
        {selectedTab === 'Notifications' && <NotificationView />}
      </div>
    </>
  );
};

export default Page;
