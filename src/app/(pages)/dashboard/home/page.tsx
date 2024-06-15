import FillProfile from '@/components/dashboard/home/FillProfile'
import Gigs from '@/components/dashboard/home/Gigs'
import RecentlyViewed from '@/components/dashboard/home/RecentlyViewed'
import Stats from '@/components/dashboard/home/Stats'
import Hero from '@/components/dashboard/home/hero'
import React, { useState } from 'react';

const page = () => {
  const [search, setSearch] = useState('');
  return (
    <div className='py-10 w-full min-h-screen flex flex-col items-center'>
      <Hero />
      <div className='2xl:max-w-[1000px]'>
        <Stats search={search} setSearch={setSearch} />
        <FillProfile />
        <RecentlyViewed search={search} setSearch={setSearch}/>
        <Gigs/>
      </div>
    </div>
  )
}

export default page