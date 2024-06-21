import FillProfile from '@/components/dashboard/freelancerhome/FillProfile';
import Recent from '@/components/dashboard/freelancerhome/Recent';
import RecentlyViewed from '@/components/dashboard/freelancerhome/RecentlyViewed';
import Stats from '@/components/dashboard/freelancerhome/Stats';
import Hero from '@/components/dashboard/freelancerhome/hero';
import Ratings from '@/components/dashboard/freelancerhome/Ratings';
import React from 'react';

const Page = () => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center py-10'>
      <div style={{ width: '100%' }} className='w-[100%] flex-1 2xl:max-w-[1000px]'>
        <Stats />
        <FillProfile />
        <RecentlyViewed />
        <Ratings />
        <Recent />
      </div>
    </div>
  );
};

export default Page;
