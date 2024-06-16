'use client'
import FillProfile from '@/components/dashboard/freelancerhome/FillProfile'
import Recent from '@/components/dashboard/freelancerhome/Recent'
import RecentlyViewed from '@/components/dashboard/freelancerhome/RecentlyViewed'
import Stats from '@/components/dashboard/freelancerhome/Stats'
import Hero from '@/components/dashboard/freelancerhome/hero'
import Ratings from '@/components/dashboard/freelancerhome/Ratings'
import React, { useState } from 'react'

const Page = () => {

  const [search, setSearch] = useState("");

  return (
    <div className='py-10 w-full min-h-screen flex flex-col items-center'>
      <Hero />
      <div className='2xl:max-w-[1000px] px-4 md:px-0'>
        <Stats search={search} setSearch={setSearch} />
        <FillProfile />
        <RecentlyViewed/>
        <Ratings/>
        <Recent search={search} setSearch={setSearch}/>
      </div>
    </div>
  )
}

export default Page