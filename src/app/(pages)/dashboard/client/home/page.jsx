import React from 'react';

import FillProfile from '@/components/home/FillProfile';
import Gigs from '@/components/home/Gigs';
import RecentlyViewed from '@/components/home/RecentlyViewed';
import Stats from '@/components/home/Stats';

const page = () => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center py-10'>
      <div className='2xl:max-w-[1000px]'>
        <Stats />
        <FillProfile />
        <RecentlyViewed />
        <Gigs />
      </div>
    </div>
  );
};

export default page;
