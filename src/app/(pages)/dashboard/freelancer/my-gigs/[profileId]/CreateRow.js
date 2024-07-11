'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useCustomContext } from '@/context/use-custom';
const CreateRow = ({ Id }) => {
  const router = useRouter();

  const onCreate = () => {
    router.push('/dashboard/freelancer/my-gigs/create');
  };
  const auth = useCustomContext();
  console.log("auth.currentProfile", auth.currentProfile);

  return (
    <div className='mobile:flex-col flex w-full items-center justify-end gap-4 rounded-xl bg-[#10191d] p-8'>
      {Id === String(auth.currentProfile?._id) && (
        <div
          className='mobile:w-full flex h-[60px] w-[200px] cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] py-2 transition hover:bg-white hover:text-black'
          onClick={onCreate}
        >
          <p>Create a New Gig</p>
        </div>
      )}
    </div>
  );
};

export default CreateRow;
