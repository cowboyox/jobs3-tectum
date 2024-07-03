import React, { useState } from 'react';
import { FaArrowRight, FaX } from 'react-icons/fa6';

import searchOptions from './searchOptions';

import { FilterIcon } from '@/components/elements/svgs/FilterIcon';
import CustomIconDropdown from '@/components/ui/dropdown';

export const SearchBar = ({
  isSmallScreen,
  setSearchText,
  searchType,
  setIsAiSearch,
  setSearchType,
}) => {
  const [filterItems, setFilterItems] = useState(['react']);

  const setKey = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === searchOptions[1]) {
      setIsAiSearch(true);
    } else {
      setIsAiSearch(false);
    }
  };

  return (
    <div>
      <div className='flex gap-5 rounded-xl bg-[#10191D]'>
        <div className='m-3 flex flex-1 items-center gap-3'>
          <CustomIconDropdown
            onChange={(v) => setSearchType(v)}
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
              <FilterIcon isFiltered={true} isSmallScreen={true} />
              {!isSmallScreen ? (
                <>
                  <FilterIcon />
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
        {filterItems.map((item, index) => {
          return (
            <span
              className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
              key={`filterItems_${index}`}
            >
              <FaX className='rounded-full bg-[#3E525B] p-[2px]' />
              {item}
            </span>
          );
        })}
        <span>Clear&nbsp;All</span>
      </div>
    </div>
  );
};
