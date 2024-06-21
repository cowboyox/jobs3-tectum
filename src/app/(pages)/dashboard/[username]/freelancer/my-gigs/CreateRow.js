'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CreateRow = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push('./my-gigs/create');
  };

  return (
    <div className='flex w-full items-center justify-end gap-4 rounded-xl bg-[#10191d] p-8 mobile:flex-col'>
      <div
        className='flex h-[60px] w-[200px] cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] py-2 transition hover:bg-white hover:text-black mobile:w-full'
        onClick={onCreate}
      >
        <p>Create a New Gig</p>
      </div>
    </div>
  );
};

export default CreateRow;
