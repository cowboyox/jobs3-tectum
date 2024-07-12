'use client';
import React, { useState, useEffect } from 'react';

import Hero from '../../../../../components/dashboard/home/hero';

import { useDebounce } from '@/hooks/useDebounce';
import FillProfile from '@/components/dashboard/home/FillProfile';
import Stats from '@/components/dashboard/home/Stats';
import Gigs from '@/components/home/Gigs';
import RecentlyViewed from '@/components/home/RecentlyViewed';
import { useGetFreelancersBySkills } from '@/hooks/useGetFreelancersBySkills';
import searchOptions from '../freelancers/searchOptions';
import { useHandleResize } from '@/hooks/useHandleResize';
import { useGetFreelancers } from '@/hooks/useGetFreelancers';


const page = () => {
  const [allFreelancers, setAllFreelancers] = useState([]);
  const [searchKeywords, setSearchText] = useState('');
  const [searchType, setSearchType] = useState(searchOptions[0]);
  const [filters, setFilters] = useState([]);
  const itemsPerPage = 3;
  const [selectedGigs, setSelectedGigs] = useState([]);
  const [page, setPage] = useState(1);
  const { isSmallScreen } = useHandleResize();
  const [isAiSearch, setIsAiSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedSearchText = useDebounce(searchKeywords);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const { data: freelancers } = useGetFreelancers(page, page === 1 ? 5 : itemsPerPage, debouncedSearchText, filters, selectedGigs);
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
  }, [debouncedSearchText]);

  useEffect(() => {
    if (searchType == searchOptions[0]) {
      const filtered = allFreelancers.filter(
        (fl) =>
          fl.email?.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
          fl.freelancerBio?.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
          fl.fullName?.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
          fl.location?.toLowerCase().includes(debouncedSearchText.toLowerCase())
      );
      setFilteredFreelancers(filtered);
    } else if (isAiSearch) {
      setIsAiSearch(false);
      setLoading(true);
      api.get(`/api/v1/profile/ai-search-profile/${searchKeywords}`).then((data) => {
        if (data.data.profiles) {
          let profiles = data.data.profiles;
          let reasons = data.data.reasons;
          profiles = profiles.map((profile, index) => {
            profile.reason = reasons[index];
            return profile;
          });
          console.log('new', profiles);
          setFilteredFreelancers(profiles);
          setLoading(false);
        }
      });
    }
  }, [debouncedSearchText, allFreelancers, searchType, isAiSearch, searchKeywords]);

  useEffect(() => {
    if (freelancers?.length > 0) {
      setCanLoadMore(true);
      if (page === 1) {
        setAllFreelancers(freelancers);
      } else {
        setAllFreelancers((prev) => {
          let result = [...prev];
          const ids = prev.map((item) => item._id);

          freelancers.map((fl) => {
            if (!ids.includes(fl._id)) {
              result = [...result, fl];
            }
          });

          return result;
        });
      }
    } else {
      if (page === 1) {
        setAllFreelancers([]);
      }
      setCanLoadMore(false);
    }
  }, [freelancers, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='flex min-h-screen w-full flex-col items-center py-10'>
      <div className='w-full px-4 md:px-0'>
        <Hero />
        <FillProfile />
        <Stats
          filters={filters}
          isSmallScreen={isSmallScreen}
          searchType={searchType}
          setFilters={setFilters}
          setIsAiSearch={setIsAiSearch}
          setSearchText={setSearchText}
          setSearchType={setSearchType}
          searchKeywords={searchKeywords}
        />
        <RecentlyViewed />
        <Gigs
          freelancers={filteredFreelancers}
          selectedGigs={selectedGigs}
          setSelectedGigs={setSelectedGigs}
          page={page}
          setPage={setPage}
          handleLoadMore={handleLoadMore}
          allFreelancers={allFreelancers}
          canLoadMore={canLoadMore}
          setCanLoadMore={setCanLoadMore}
        />
      </div>
    </div>
  );
};

export default page;
