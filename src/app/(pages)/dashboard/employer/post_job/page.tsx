'use client';

import React, { useState } from 'react';

import Hero from '../../../../../components/dashboard/home/hero';

import FillProfile from '@/components/dashboard/employerhome/FillProfile';
import Recent from '@/components/dashboard/employerhome/Recent';
import RecentApplications from '@/components/dashboard/employerhome/RecentApplications';
import Stats from '@/components/dashboard/employerhome/Stats';

const Page = () => {
  const [searchText, setSearchText] = useState('');
  const [filtersToQuery, setFiltersToQuery] = useState([]);
  const [searchType, setSearchType] = useState('normal');
  const [loading, setLoading] = useState(false);
  const [allGigs, setAllGigs] = useState([]);
  const [locationFilters, setLocationFilters] = useState([]);

  return (
    <div className='flex min-h-screen w-full flex-col items-center py-10'>
      <div className='w-full px-4 md:px-0'>
        <Hero />
        <FillProfile />
        <Stats
          locationFilters={locationFilters}
          searchText={searchText}
          searchType={searchType}
          setAllGigs={setAllGigs}
          setFiltersToQuery={setFiltersToQuery}
          setLoading={setLoading}
          setLocationFilters={setLocationFilters}
          setSearchText={setSearchText}
          setSearchType={setSearchType}
        />
        <RecentApplications />
        <Recent
          allGigs={allGigs}
          filtersToQuery={filtersToQuery}
          loading={loading}
          locationFilters={locationFilters}
          searchText={searchText}
          searchType={searchType}
          setAllGigs={setAllGigs}
        />
      </div>
    </div>
  );
};

export default Page;
