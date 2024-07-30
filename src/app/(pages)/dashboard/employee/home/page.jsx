'use client';

import React, { useState } from 'react';

import Hero from '../../../../../components/dashboard/home/hero';

import FillProfile from '@/components/dashboard/employeehome/FillProfile';
import Ratings from '@/components/dashboard/employeehome/Ratings';
import Recent from '@/components/dashboard/employeehome/Recent';
import RecentlyViewed from '@/components/dashboard/employeehome/RecentlyViewed';
import Stats from '@/components/dashboard/employeehome/Stats';

const Page = () => {
  const [searchText, setSearchText] = useState('');
  const [filtersToQuery, setFiltersToQuery] = useState([]);
  const [searchType, setSearchType] = useState('normal');
  const [loading, setLoading] = useState(false)
  const [allGigs, setAllGigs] = useState([]);
  const [locationFilters, setLocationFilters] = useState([]);



  return (
    <div className='flex min-h-screen w-full flex-col items-center py-10'>
      <div className='w-full px-4 md:px-0'>
        <Hero />
        <FillProfile />
        <Stats
          searchType = {searchType}
          filtersToQuery={filtersToQuery}
          searchText={searchText}
          setSearchType={setSearchType}
          setFiltersToQuery={setFiltersToQuery}
          setSearchText={setSearchText}
          allGigs={allGigs}
          setAllGigs={setAllGigs}
          loading={loading}
          setLoading={setLoading}
          locationFilters={locationFilters}
          setLocationFilters={setLocationFilters}
        />
        <RecentlyViewed />
        {/* <Ratings /> */}
        <Recent filtersToQuery={filtersToQuery} searchText={searchText} searchType={searchType} loading={loading} allGigs={allGigs} setAllGigs={setAllGigs} locationFilters={locationFilters}/>
      </div>
    </div>
  );
};

export default Page;
