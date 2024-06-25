import React from 'react';

import FillProfile from '@/components/dashboard/freelancerhome/FillProfile';
import Ratings from '@/components/dashboard/freelancerhome/Ratings';
import Recent from '@/components/dashboard/freelancerhome/Recent';
import RecentlyViewed from '@/components/dashboard/freelancerhome/RecentlyViewed';
import Stats from '@/components/dashboard/freelancerhome/Stats';
import Hero from '../../../../../components/dashboard/home/hero'

const Page = () => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center py-10'>
      <div className='px-4 md:px-0  w-full'>
        <Hero/>
        <FillProfile />
        <Stats />
        <RecentlyViewed />
        <Ratings />
        <Recent />
      </div>
    </div>
  );
};

export default Page;
