'use client';

import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useCustomContext } from '@/context/use-custom';
import { USER_ROLE } from '@/utils/constants';

const FillProfile = () => {
  const auth = useCustomContext();

  return (
    <div className='mt-10 flex h-full flex-col justify-between gap-4 rounded-2xl bg-deepGreen p-10 md:flex-row'>
      <div className='flex h-full w-full flex-col justify-center gap-4'>
        <h1 className='text-3xl font-semibold text-white'>Fill out your profile 🤩</h1>
        <p className='w-full text-sm text-medGray md:w-2/3'>
          Increase your chances of standing out on job applications and searches.
        </p>
      </div>
      <div className='flex w-full flex-row items-center justify-center gap-2 md:w-1/5 md:flex-col'>
        <Link
          href={`/dashboard/${auth?.currentRole === USER_ROLE.FREELANCER ? 'freelancer' : auth?.currentRole === USER_ROLE.CLIENT ? 'client' : 'none'}/profile/${auth?.currentProfile?._id}`}
        >
          <Button
            className={`w-full rounded-xl bg-[#DC4F13] px-10 py-8 text-white hover:bg-[#DC4F13] md:w-[170px]`}
          >
            Edit Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FillProfile;
