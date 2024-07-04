'use client';

import React, { useState } from 'react';

import Hero from '../../../../../components/dashboard/home/hero';

import FillProfile from '@/components/dashboard/freelancerhome/FillProfile';
import Ratings from '@/components/dashboard/freelancerhome/Ratings';
import Recent from '@/components/dashboard/freelancerhome/Recent';
import RecentlyViewed from '@/components/dashboard/freelancerhome/RecentlyViewed';
import Stats from '@/components/dashboard/freelancerhome/Stats';

const Page = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className='flex min-h-screen w-full flex-col items-center py-10'>
      <div className='w-full px-4 md:px-0'>
        <Hero />
        <FillProfile />
        <Stats searchText={searchText} setSearchText={setSearchText} />
        <RecentlyViewed />
        <Ratings />
        <Recent searchText={searchText} />
      </div>
    </div>
  );
};

export default Page;
