'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CreateRow = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push('./my-gigs/create');
  };

  return (
    <div className='bg-[#10191d] p-8 rounded-xl flex gap-4 w-full items-center mobile:flex-col justify-end'>
      <div
        className='cursor-pointer bg-[#DC4F13] flex items-center justify-center w-[200px] mobile:w-full h-[60px] py-2 rounded-xl transition hover:bg-white hover:text-black'
        onClick={onCreate}
      >
        <p>Create a New Gig</p>
      </div>
    </div>
  );
};

export default CreateRow;
