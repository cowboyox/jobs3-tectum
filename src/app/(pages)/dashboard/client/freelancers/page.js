'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaX } from 'react-icons/fa6';

import { SearchBar } from './SearchBar';
import searchOptions from './searchOptions';

import { JobSuccessIcon } from '@/components/elements/svgs/JobSuccessIcon';
import { TopRatedBadgeIcon } from '@/components/elements/svgs/TopRatedBadgeIcon';
import { VerifiedIcon } from '@/components/elements/svgs/VerifiedIcon';
import { Separator } from '@/components/ui/seperator';
import { useCustomContext } from '@/context/ContextProvider';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetFreelancers } from '@/hooks/useGetFreelancers';
import { useHandleResize } from '@/hooks/useHandleResize';
import api from '@/utils/api';

const Freelancers = () => {
  const auth = useCustomContext();
  const [allFreelancers, setAllFreelancers] = useState([]);
  const [searchType, setSearchType] = useState(searchOptions[0]);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState([]);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [isAiSearch, setIsAiSearch] = useState(false);
  const [freelancerBioShowModeList, setFreelancerBioShowModeList] = useState([]);
  const debouncedSearchText = useDebounce(searchText);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 5;
  const descriptionTextMaxLength = 320;
  const { isSmallScreen } = useHandleResize();
  const { data: freelancers } = useGetFreelancers(
    auth?.user?._id,
    page,
    itemsPerPage,
    debouncedSearchText,
    filters
  );
  console.log("page > filters > ",filters);
  console.log("page > data > ",freelancers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
  }, [debouncedSearchText, filters]);

  useEffect(() => {
    if (isAiSearch) {
      setIsAiSearch(false);
      setLoading(true);
      api.get(`/api/v1/profile/ai-search-profile/${searchText}`).then((data) => {
        if (data.data.profiles) {
          let profiles = data.data.profiles;
          let reasons = data.data.reasons;
          profiles = profiles.map((profile, index) => {
            profile.reason = reasons[index];
            return profile;
          });
          console.log('new', profiles);
          setAllFreelancers(profiles);
          setFreelancerBioShowModeList(new Array(profiles.length).fill(false));
          setLoading(false);
        }
      });
    }
  }, [debouncedSearchText, allFreelancers, searchType, isAiSearch, searchText]);

  useEffect(() => {
    if (freelancers?.length > 0) {
      setCanLoadMore(true);
      if (page === 1) {
        setAllFreelancers(freelancers);
        setFreelancerBioShowModeList(new Array(freelancers.length).fill(false));
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
        setFreelancerBioShowModeList([]);
      }
      setCanLoadMore(false);
    }
  }, [freelancers, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleMessage = (freelancerId) => {
    router.push(`/dashboard/client/inbox/${freelancerId}`);
  };

  return (
    <div>
      <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
        <SearchBar
          filters={filters}
          isSmallScreen={isSmallScreen}
          searchType={searchType}
          setFilters={setFilters}
          setIsAiSearch={setIsAiSearch}
          setSearchText={setSearchText}
          setSearchType={setSearchType}
        />
        {loading && (
          <div className='z-1 flex h-screen justify-center space-x-2 pt-6'>
            <div className='mt-8 flex h-fit items-baseline text-[20px]'>
              <p className='mr-3'>The neural network is thinking</p>
              <div className='flex gap-1'>
                <div className='h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]'></div>
                <div className='h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]'></div>
                <div className='h-2 w-2 animate-bounce rounded-full bg-white'></div>
              </div>
            </div>
          </div>
        )}
        {!loading && allFreelancers && allFreelancers.length > 0
          ? allFreelancers.map((freelancer, index) => {
              return (
                <div key={`freelancers_ext_${index}`}>
                  <div
                    className={`mt-4 ${freelancer?.reason ? 'rounded-t-xl' : 'rounded-xl'} bg-[#10191D] p-5 text-center`}
                    key={`freelancers_${index}`}
                  >
                    <div className='mt-1 flex flex-col-reverse items-start justify-between md:flex-row md:items-center'>
                      <Link href={`/dashboard/freelancer/profile/${freelancer._id}`}>
                        <div className='mt-3 flex-1 text-left text-[20px] hover:underline md:mt-0 md:text-2xl'>
                          {freelancer.freelancerTitle}
                        </div>
                      </Link>
                    </div>
                    <div className='mt-3 flex flex-col items-start justify-between gap-6 md:flex-row md:justify-start'>
                      <div className='flex flex-row items-center gap-2'>
                        <svg
                          fill='none'
                          height='24'
                          viewBox='0 0 24 24'
                          width='24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M11.9999 13.4304C13.723 13.4304 15.1199 12.0336 15.1199 10.3104C15.1199 8.5873 13.723 7.19043 11.9999 7.19043C10.2768 7.19043 8.87988 8.5873 8.87988 10.3104C8.87988 12.0336 10.2768 13.4304 11.9999 13.4304Z'
                            stroke='#96B0BD'
                            strokeWidth='1.5'
                          />
                          <path
                            d='M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z'
                            stroke='#96B0BD'
                            strokeWidth='1.5'
                          />
                        </svg>
                        {freelancer.location}
                      </div>
                      <div className='flex flex-row items-center gap-6'>
                        {freelancer.badge && (
                          <div className='flex flex-row gap-2'>
                            <TopRatedBadgeIcon />
                            {freelancer.badge}
                          </div>
                        )}
                        {freelancer.jobSuccessScore && (
                          <div className='flex flex-row gap-2'>
                            <JobSuccessIcon />
                            {freelancer.jobSuccessScore}% Job Success
                          </div>
                        )}
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className='text-left text-[#96B0BD]'>
                      <pre className='whitespace-pre-wrap font-roboto'>
                        {freelancer.freelancerBio.length < descriptionTextMaxLength
                          ? freelancer.freelancerBio
                          : freelancerBioShowModeList[index]
                            ? freelancer.freelancerBio
                            : freelancer.freelancerBio.slice(0, descriptionTextMaxLength) + '...'}
                      </pre>
                    </div>
                    <div className='mt-3 text-left'>
                      {freelancer.freelancerBio.length < descriptionTextMaxLength ? (
                        <></>
                      ) : !freelancerBioShowModeList[index] ? (
                        <button
                          onClick={() => {
                            const tempShowModeList = freelancerBioShowModeList.map((item, i) => {
                              if (i == index) {
                                return true;
                              } else {
                                return item;
                              }
                            });

                            setFreelancerBioShowModeList(tempShowModeList);
                          }}
                        >
                          Show more
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const tempShowModeList = freelancerBioShowModeList.map((item, i) => {
                              if (i == index) {
                                return false;
                              } else {
                                return item;
                              }
                            });

                            setFreelancerBioShowModeList(tempShowModeList);
                          }}
                        >
                          Show less
                        </button>
                      )}
                    </div>
                    <div className='mt-4 flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
                      {freelancer.skills &&
                        freelancer.skills.map((item, index) => {
                          return (
                            <span
                              className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                              key={`skills_${index}`}
                            >
                              <FaX className='rounded-full bg-[#3E525B] p-[2px]' />
                              {item}
                            </span>
                          );
                        })}
                    </div>
                    <div className='mt-3 flex flex-col items-start justify-between md:flex-row md:items-center'>
                      <div className='flex flex-1 flex-row items-center gap-3 text-left'>
                        <div>
                          <Image
                            alt='avatar'
                            className='aspect-square rounded-full object-cover'
                            height={40}
                            src={
                              freelancer.avatarURL
                                ? freelancer.avatarURL
                                : '/assets/images/Rectangle 273.png'
                            }
                            width={40}
                          />
                        </div>
                        <div className='flex flex-col gap-1 text-left'>
                          <div className='flex flex-row items-center gap-1 font-bold'>
                            {freelancer.fullName}
                            <VerifiedIcon />
                          </div>
                          <div className='text-left text-[14px] text-[#516170]'>Freelancer</div>
                        </div>
                      </div>
                      <div className='mt-2 flex-1 rounded-xl bg-[#1B272C] p-1 md:mt-0 md:flex-none'>
                        <button
                          className='p-4 px-8 md:p-5'
                          onClick={() => handleMessage(freelancer._id)}
                        >
                          Message
                        </button>
                        <button className='bg-[#DC4F13] p-4 px-8 md:p-5'>Invite to Gig</button>
                      </div>
                    </div>
                  </div>
                  {freelancer.reason && (
                    <div className='text-md rounded-b-xl bg-orange p-4 text-white'>
                      {freelancer.reason}
                    </div>
                  )}
                </div>
              );
            })
          : !loading && (
              <div>
                <div className='flex h-full flex-col items-center justify-center gap-3'>
                  <h2 className='text-3xl font-bold'>Nothing Here</h2>
                </div>
              </div>
            )}
        {canLoadMore && (
          <div
            className='mt-4 cursor-pointer rounded-2xl border border-lightGray py-3 text-center'
            onClick={handleLoadMore}
          >
            Load More +
          </div>
        )}
      </div>
    </div>
  );
};

export default Freelancers;
