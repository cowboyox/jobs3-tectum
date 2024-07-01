'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaX } from 'react-icons/fa6';

import searchOptions from './searchOptions';

import CustomIconDropdown from '@/components/ui/dropdown';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/seperator';
import api from '@/utils/api';

const Freelancers = () => {
  const filterCategory = ['English', 'Developer', 'Blockchain', 'Web3'];
  const [freelancers, setFreelancers] = useState([]);
  const router = useRouter();
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [searchType, setSearchType] = useState(searchOptions[0]);
  const [isSmallScreen, setIsSmallScree] = useState(false);
  const [searchKeyWords, setSearchKeyWords] = useState(false);

  const handleSearchTypeChange = (v) => setSearchType(v);

  const setKey = (e) => {
    setSearchKeyWords(e.target.value);
    if (searchType == searchOptions[0]) {
      const filtered = freelancers.filter(
        (freelancer) =>
          freelancer.email?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          freelancer.freelancerBio?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          freelancer.fullName?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          freelancer.location?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredFreelancers(filtered);
    }
  };

  const aiSearch = () => {
    api.get(`/api/v1/profile/ai-search-profile/${searchKeyWords}`).then((data) => {
      let ai_ids = [];
      if (data.data.profileIDs) ai_ids = data.data.profileIDs;
      const ai_filtered = ai_ids
        .map((id) => freelancers.find((freelancer) => freelancer._id.toString() === id))
        .filter((freelancer) => freelancer != undefined);
      setFilteredFreelancers(ai_filtered);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === searchOptions[1]) {
      aiSearch();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScree(true);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsSmallScree(false);
      } else {
        setIsSmallScree(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    api.get(`/api/v1/profile/get-all-freelancers`).then((data) => {
      if (data.data.data) {
        setFreelancers(data.data.data);
        setFilteredFreelancers(data.data.data);
      } else {
        setFreelancers([]);
        setFilteredFreelancers([]);
      }
    });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className='flex gap-5 rounded-xl bg-[#10191D]'>
        <div className='m-3 flex flex-1 items-center gap-3'>
          <CustomIconDropdown
            onChange={handleSearchTypeChange}
            optionLabel={'icon'}
            options={searchOptions}
            value={searchType}
          />
          <input
            className='w-full bg-transparent outline-none'
            onChange={setKey}
            onKeyDown={handleKeyDown}
            placeholder={isSmallScreen ? 'Search' : 'Search for keywords'}
            type='text'
          />
          {isSmallScreen && searchType === searchOptions[0] && (
            <button>
              <svg
                fill='none'
                height='24'
                viewBox='0 0 25 24'
                width='25'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.1962 13.4299C13.9193 13.4299 15.3162 12.0331 15.3162 10.3099C15.3162 8.58681 13.9193 7.18994 12.1962 7.18994C10.473 7.18994 9.07617 8.58681 9.07617 10.3099C9.07617 12.0331 10.473 13.4299 12.1962 13.4299Z'
                  stroke='#96B0BD'
                  strokeWidth='1.5'
                />
                <path
                  d='M3.816 8.49C5.786 -0.169998 18.616 -0.159997 20.576 8.5C21.726 13.58 18.566 17.88 15.796 20.54C13.786 22.48 10.606 22.48 8.586 20.54C5.826 17.88 2.666 13.57 3.816 8.49Z'
                  stroke='#96B0BD'
                  strokeWidth='1.5'
                />
              </svg>
            </button>
          )}
        </div>
        {(!isSmallScreen || (isSmallScreen && searchType === searchOptions[0])) && (
          <div className='flex flex-none flex-row items-center gap-2 px-4'>
            <button className='flex flex-row items-center justify-center gap-3'>
              {!isSmallScreen ? (
                <>
                  <svg
                    fill='none'
                    height='24'
                    viewBox='0 0 25 24'
                    width='25'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M22.2119 6.58594H16.3057'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M6.46191 6.58594H2.52441'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M10.3994 10.0312C12.3022 10.0312 13.8447 8.48873 13.8447 6.58594C13.8447 4.68314 12.3022 3.14062 10.3994 3.14062C8.49662 3.14062 6.9541 4.68314 6.9541 6.58594C6.9541 8.48873 8.49662 10.0312 10.3994 10.0312Z'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M22.2119 17.4141H18.2744'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M8.43066 17.4141H2.52441'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M14.3369 20.8594C16.2397 20.8594 17.7822 19.3169 17.7822 17.4141C17.7822 15.5113 16.2397 13.9688 14.3369 13.9688C12.4341 13.9688 10.8916 15.5113 10.8916 17.4141C10.8916 19.3169 12.4341 20.8594 14.3369 20.8594Z'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                  </svg>
                  Filter
                </>
              ) : (
                <svg
                  fill='none'
                  height='24'
                  viewBox='0 0 25 24'
                  width='25'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22.1719 6.58594H16.2656'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M6.42188 6.58594H2.48438'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M10.3594 10.0312C12.2622 10.0312 13.8047 8.48873 13.8047 6.58594C13.8047 4.68314 12.2622 3.14062 10.3594 3.14062C8.45658 3.14062 6.91406 4.68314 6.91406 6.58594C6.91406 8.48873 8.45658 10.0312 10.3594 10.0312Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M22.1719 17.4141H18.2344'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M8.39062 17.4141H2.48438'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M14.2969 20.8594C16.1997 20.8594 17.7422 19.3169 17.7422 17.4141C17.7422 15.5113 16.1997 13.9688 14.2969 13.9688C12.3941 13.9688 10.8516 15.5113 10.8516 17.4141C10.8516 19.3169 12.3941 20.8594 14.2969 20.8594Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <circle cx='18.2344' cy='5.10938' fill='#DC4F13' r='4.92188' />
                </svg>
              )}
            </button>
            {!isSmallScreen && (
              <div className='flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#DC4F13] text-center align-middle'>
                4
              </div>
            )}
          </div>
        )}
        {!isSmallScreen && (
          <div className='flex flex-row items-center justify-center gap-2'>
            <div>Sort by</div>
            <div>
              <Select>
                <SelectTrigger className='flex justify-center border-none bg-transparent text-[#96B0BD] focus:border-none focus:outline-none'>
                  <SelectValue placeholder='Sort By' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort By</SelectLabel>
                    <SelectItem value='date'>Date</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {isSmallScreen && searchType === searchOptions[1] && (
          <div className='flex'>
            <button
              class='flex w-12 items-center justify-center self-stretch rounded-e-[15px] rounded-s-[0px] bg-orange text-lg text-white'
              onClick={aiSearch}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      <div className='mt-4 flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
        {filterCategory.map((item, index) => {
          return (
            <span
              className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
              key={`filterCategory_${index}`}
            >
              <FaX className='rounded-full bg-[#3E525B] p-[2px]' />
              {item}
            </span>
          );
        })}
        <span>Clear&nbsp;All</span>
      </div>
      {filteredFreelancers &&
        filteredFreelancers.map((freelancer, index) => {
          return (
            <div
              className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'
              key={`freelancers_${index}`}
            >
              <div className='mt-1 flex flex-col-reverse items-start justify-between md:flex-row md:items-center'>
                <Link href={`/dashboard/freelancer/profile/${freelancer._id}`}>
                  <div className='mt-3 flex-1 text-left text-[20px] hover:underline md:mt-0 md:text-2xl'>
                    {freelancer.freelancerBio}
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
                      <svg
                        fill='none'
                        height='24'
                        viewBox='0 0 24 24'
                        width='24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M21.75 7.74097V16.259C21.75 17.0665 21.3174 17.812 20.6163 18.2126L13.1163 22.4983C12.4246 22.8936 11.5754 22.8936 10.8837 22.4983L3.38369 18.2126C2.68264 17.812 2.25 17.0665 2.25 16.259V7.74097C2.25 6.93354 2.68264 6.18802 3.38369 5.78742L10.8837 1.50171C11.5754 1.10644 12.4246 1.10644 13.1163 1.50171L20.6163 5.78742C21.3174 6.18802 21.75 6.93354 21.75 7.74097Z'
                          stroke='#158FE8'
                          strokeWidth='1.5'
                        />
                        <path
                          d='M12.7298 8.57767L13.4396 9.99715C13.5363 10.1947 13.7944 10.3843 14.0122 10.4206L15.2986 10.6343C16.1212 10.7714 16.3148 11.3682 15.722 11.957L14.7219 12.9571C14.5526 13.1265 14.4598 13.4531 14.5122 13.687L14.7985 14.925C15.0244 15.9049 14.5042 16.284 13.6372 15.7718L12.4314 15.0581C12.2136 14.929 11.8547 14.929 11.633 15.0581L10.4272 15.7718C9.56422 16.284 9.03998 15.9009 9.26581 14.925L9.55212 13.687C9.60455 13.4531 9.5118 13.1265 9.34243 12.9571L8.34234 11.957C7.75358 11.3682 7.94311 10.7714 8.76577 10.6343L10.0522 10.4206C10.2659 10.3843 10.524 10.1947 10.6208 9.99715L11.3305 8.57767C11.7176 7.80744 12.3467 7.80744 12.7298 8.57767Z'
                          stroke='#158FE8'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      {freelancer.badge}
                    </div>
                  )}
                  {freelancer.jobSuccessScore && (
                    <div className='flex flex-row gap-2'>
                      <svg
                        fill='none'
                        height='24'
                        viewBox='0 0 22 24'
                        width='22'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M16.0302 3.30132L16.205 3.40009C19.3056 5.15263 21.2228 8.43855 21.2228 12.0002C21.2228 15.5619 19.3056 18.8478 16.205 20.6003L16.0302 20.6991C12.9088 22.4634 9.09121 22.4634 5.96978 20.6991L5.58737 21.3757L5.96978 20.6991L5.79504 20.6003C2.69439 18.8478 0.777174 15.5619 0.777174 12.0002C0.777174 8.43855 2.69439 5.15263 5.79505 3.40009L5.96979 3.30132C9.09121 1.53704 12.9088 1.53704 16.0302 3.30132Z'
                          stroke='#34E250'
                          strokeWidth='1.55435'
                        />
                        <path
                          d='M12.7318 14.9084H8.37999C8.18555 14.9084 7.96796 14.7709 7.90314 14.6042L5.98647 9.77923C5.71333 9.08757 6.03277 8.87507 6.69018 9.30007L8.49573 10.4626C8.79666 10.6501 9.13925 10.5542 9.26888 10.2501L10.0837 8.2959C10.343 7.6709 10.7735 7.6709 11.0328 8.2959L11.8476 10.2501C11.9772 10.5542 12.3198 10.6501 12.6161 10.4626L14.3105 9.37507C15.0328 8.9084 15.38 9.1459 15.0837 9.90007L13.2133 14.6126C13.1439 14.7709 12.9263 14.9084 12.7318 14.9084Z'
                          stroke='#34E250'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='0.625'
                        />
                        <path
                          d='M8.00879 16.1665H13.1014'
                          stroke='#34E250'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='0.625'
                        />
                        <path
                          d='M9.39844 12.8335H11.7133'
                          stroke='#34E250'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='0.625'
                        />
                      </svg>
                      {freelancer.jobSuccessScore}% Job Success
                    </div>
                  )}
                </div>
              </div>
              <Separator className='my-4' />
              <div className='text-left text-[#96B0BD]'>{freelancer.freelancerBio}</div>
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
                    <img
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
                      <svg
                        fill='none'
                        height='17'
                        viewBox='0 0 17 17'
                        width='17'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14.1422 6.03555C14.1585 5.9123 14.167 5.78905 14.167 5.6665C14.167 3.98138 12.649 2.62917 10.9646 2.85796C10.4737 1.98459 9.53874 1.4165 8.50033 1.4165C7.46191 1.4165 6.52691 1.98459 6.03603 2.85796C4.34808 2.62917 2.83366 3.98138 2.83366 5.6665C2.83366 5.78905 2.84216 5.9123 2.85845 6.03555C1.98508 6.52713 1.41699 7.46213 1.41699 8.49984C1.41699 9.53755 1.98508 10.4725 2.85845 10.9641C2.84211 11.0865 2.83383 11.2097 2.83366 11.3332C2.83366 13.0183 4.34808 14.367 6.03603 14.1417C6.52691 15.0151 7.46191 15.5832 8.50033 15.5832C9.53874 15.5832 10.4737 15.0151 10.9646 14.1417C12.649 14.367 14.167 13.0183 14.167 11.3332C14.167 11.2106 14.1585 11.0874 14.1422 10.9641C15.0156 10.4725 15.5837 9.53755 15.5837 8.49984C15.5837 7.46213 15.0156 6.52713 14.1422 6.03555ZM7.76012 11.6278L5.16266 8.99709L6.17133 8.00259L7.77003 9.62184L10.835 6.58025L11.8323 7.58609L7.76012 11.6278Z'
                          fill='#0A75C2'
                        />
                      </svg>
                    </div>
                    <div className='text-left text-[14px] text-[#516170]'>Freelancer</div>
                  </div>
                </div>
                <div className='mt-2 flex-1 rounded-xl bg-[#1B272C] p-1 md:mt-0 md:flex-none'>
                  <button className='p-4 px-8 md:p-5'>Message</button>
                  <button className='bg-[#DC4F13] p-4 px-8 md:p-5'>Invite to Gig</button>
                </div>
              </div>
            </div>
          );
        })}
      {/* <button className="p-3 mt-6 text-center border border-[#28373E] w-full">
        Load more +{" "}
      </button> */}
    </div>
  );
};

export default Freelancers;
