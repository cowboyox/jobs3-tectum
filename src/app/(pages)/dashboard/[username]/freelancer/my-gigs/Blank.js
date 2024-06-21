'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const BlankView = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push('./my-gigs/create');
  };

  return (
    <div className='p-8 mobile:p-0'>
      <div className='flex items-center justify-center flex-col gap-3 h-screen -mt-24'>
        <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
        <p className='text-[18px] text-slate-600'>Create your first Gig</p>
        <div
          className='cursor-pointer bg-[#DC4F13] flex items-center justify-center w-[260px] h-[60px] py-2 rounded-xl transition hover:bg-white hover:text-black'
          onClick={onCreate}
        >
          <p>Create</p>
        </div>
      </div>
    </div>
  );
};

export default BlankView;
