import React from 'react';

const FillProfile = () => {
  return (
    <div className='mt-10 flex h-48 flex-col justify-between rounded-2xl bg-deepGreen p-5 md:flex-row'>
      <div className='flex h-full w-full flex-col justify-center gap-4 md:w-1/3'>
        <h1 className='text-3xl text-white'>Fill out your profile</h1>
        <p className='text-sm text-medGray'>
          Increase your chances of standing out on job applications and searches.
        </p>
      </div>
      <div className='flex w-full flex-row items-center justify-center gap-2 md:w-1/5 md:flex-col'>
        <button className='h-10 w-40 cursor-pointer rounded-xl border border-white text-white'>
          Edit Profile
        </button>
        <button className='h-10 w-40 cursor-pointer rounded-xl text-medGray'>
          Don&apos;t Show again
        </button>
      </div>
    </div>
  );
};

export default FillProfile;
