'use client'
import FillProfile from '@/components/home/FillProfile'
import Gigs from '@/components/home/Gigs'
import RecentlyViewed from '@/components/home/RecentlyViewed'
import Stats from '@/components/home/Stats'
import Hero from '@/components/home/hero'
import React, { useState } from 'react'

const Page = () => {
  const [search, setSearch] = useState("");

  return (
    <div className='py-10 w-full min-h-screen flex flex-col items-center'>
      <Hero />
      <div className='2xl:max-w-[1000px]'>
        <Stats search={search} setSearch={setSearch} />
        <FillProfile />
        <RecentlyViewed/>
        <Gigs search={search} setSearch={setSearch}/>
      </div>
    </div>
  )
}

export default Page