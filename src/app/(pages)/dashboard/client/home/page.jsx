import React from 'react';

import FillProfile from '@/components/dashboard/home/FillProfile';
import Gigs from '@/components/home/Gigs';
import RecentlyViewed from '@/components/home/RecentlyViewed';
import Stats from '@/components/dashboard/home/Stats';
import Hero from '../../../../../components/dashboard/home/hero'


const page = () => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center py-10'>
      <div className='px-4 md:px-0 2xl:max-w-[1000px] w-full'>
        <Hero/>
        <FillProfile />
        <Stats />
        <RecentlyViewed />
        <Gigs />
      </div>
    </div>
  );
};

export default page;
