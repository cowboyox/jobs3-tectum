import React from 'react';

import Hero from '../../../../../components/dashboard/home/hero';

import FillProfile from '@/components/dashboard/home/FillProfile';
import Stats from '@/components/dashboard/home/Stats';
import Gigs from '@/components/home/Gigs';
import RecentlyViewed from '@/components/home/RecentlyViewed';

const page = () => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center py-10'>
      <div className='w-full px-4 md:px-0'>
        <Hero />
        <FillProfile />
        <Stats />
        <RecentlyViewed />
        <Gigs />
      </div>
    </div>
  );
};

export default page;
