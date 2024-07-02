'use client';
import React from 'react';

import SignSidebar from '@/components/layout/signsidebar';

export default function signup({ children }) {
  return (
    <div className='mx-auto flex min-h-screen max-w-[2600px] items-start gap-0 bg-[#111]'>
      <SignSidebar />
      <div className='w-full flex justify-center items-center'>
        {children}
      </div>
    </div>
  );
}
