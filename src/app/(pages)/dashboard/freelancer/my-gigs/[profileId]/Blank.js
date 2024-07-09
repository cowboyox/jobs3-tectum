'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const BlankView = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push('./create');
  };

  return (
    <div className='p-8 mobile:p-0'>
      <div className='-mt-24 flex h-screen flex-col items-center justify-center gap-3'>
        <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
        <p className='text-[18px] text-slate-600'>Create your first Gig</p>
        <div
          className='flex h-[60px] w-[260px] cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] py-2 transition hover:bg-white hover:text-black'
          onClick={onCreate}
        >
          <p>Create</p>
        </div>
      </div>
    </div>
  );
};

export default BlankView;
