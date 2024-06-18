'use client';

import React from 'react';
import { useRouter } from "next/navigation";

const GigsPage = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push('./my-gigs/create');
  }

  return (
    <div className='flex items-center justify-center flex-col gap-3 h-full mt-10'>
      <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
      <p className='text-[18px] text-slate-600'>Create your first Gig</p>
      <div
        className='cursor-pointer bg-[#DC4F13] py-2 px-20 rounded-xl transition hover:bg-white hover:text-black'
        onClick={onCreate}
      >
        Create
      </div>
    </div>
  );
};

export default GigsPage;
