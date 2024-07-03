import React, { useState } from 'react';
import { FaArrowRight, FaX } from 'react-icons/fa6';

import searchOptions from './searchOptions';

import { FilterIcon } from '@/components/elements/svgs/FilterIcon';
import { Checkbox } from '@/components/ui/checkbox';
import CustomIconDropdown from '@/components/ui/dropdown';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DropdownItem = ({ onCheckedChange, isChecked, ...props }) => {
  return (
    <div className='flex cursor-pointer items-center gap-4 p-0'>
      <Checkbox
        checked={isChecked}
        className='rounded border-[#96B0BD] data-[state=checked]:border-orange data-[state=checked]:bg-orange data-[state=checked]:text-white'
        id={props.category_id}
        onCheckedChange={onCheckedChange}
      />
      <label className='cursor-pointer text-sm text-[#96B0BD]' htmlFor={props.category_id}>
        {props.category_name}
      </label>
    </div>
  );
};

export const SearchBar = ({
  isSmallScreen,
  setSearchText,
  searchType,
  setIsAiSearch,
  setSearchType,
}) => {
  const [filterItems, setFilterItems] = useState([]);

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

  const onCheckedChange = (value, id, name) => {
    if (value) {
      setFilterItems((prev) => [...prev, name]);
    } else {
      setFilterItems((prev) => prev.filter((item) => item !== name));
    }
  };

  const filterCategories = [
    {
      content: [
        { category_id: 'any_amount', category_name: 'Any Amount' },
        { category_id: 'over_1_earned', category_name: '$1+ Earned' },
        { category_id: 'over_100_earned', category_name: '$100+ Earned' },
        { category_id: 'over_1k_earned', category_name: '$1k+ Earned' },
        { category_id: 'over_10k_earned', category_name: '$10k+ Earned' },
        { category_id: 'no_earning_yet', category_name: 'No Earning Yet' },
      ],
      title: 'Earned Amount',
    },
    {
      content: [
        { category_id: 'any_job_success', category_name: 'Any Job Success' },
        { category_id: '80_up', category_name: '80% & UP' },
        { category_id: '90_up', category_name: '90% & UP' },
        { category_id: 'top_rated', category_name: 'Top Rated' },
        { category_id: 'rising_talent', category_name: 'Rising Talent' },
      ],
      title: 'Job Success',
    },
    {
      content: [
        { category_id: 'any_hourly_rate', category_name: 'Any Hourly Rate' },
        { category_id: '10_below', category_name: '$10 and Below' },
        { category_id: '10_30', category_name: '$10 - $30' },
        { category_id: '30_60', category_name: '$30 - $60' },
        { category_id: '60_above', category_name: '$60 and Above' },
      ],
      title: 'Hourly rate',
    },
    {
      content: [
        { category_id: 'over_1_hour', category_name: '1+ Hours Billed' },
        { category_id: 'over_100_hour', category_name: '100+ Hours Billed' },
        { category_id: 'over_1000_hour', category_name: '1000+ Hours Billed' },
      ],
      title: 'Hours billed',
    },
    {
      content: [
        { category_id: 'any_category', category_name: 'Any Category' },
        { category_id: 'customer_service', category_name: 'Customer Service' },
        { category_id: 'design_creative', category_name: 'Design And Creative' },
        { category_id: 'web_mobile_software', category_name: 'Web, Mobile & Software' },
      ],
      title: 'Category',
    },
    {
      content: [
        { category_id: 'any_level', category_name: 'Any Level' },
        { category_id: 'basic', category_name: 'Basic' },
        { category_id: 'conversational', category_name: 'Conversational' },
        { category_id: 'fluent', category_name: 'Fluent' },
        { category_id: 'native_bilingual', category_name: 'Native Or Bilingual' },
      ],
      title: 'English Level',
    },
    {
      content: [
        { category_id: 'freelancers_agencies', category_name: 'Freelancers & Agencies' },
        { category_id: 'freelancers', category_name: 'Freelancers' },
        { category_id: 'agencies', category_name: 'Agencies' },
      ],
      title: 'Talent Type',
    },
    {
      content: [
        { category_id: 'any_time', category_name: 'Any Time' },
        { category_id: '2_weeks', category_name: 'Within 2 Weeks' },
        { category_id: '1_month', category_name: 'Within 1 Month' },
        { category_id: '2_month', category_name: 'Within 2 Month' },
      ],
      title: 'Notice Period',
    },
  ];

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
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex flex-row items-center justify-center gap-3'>
                  <FilterIcon isFiltered={filterItems.length > 0} isSmallScreen={isSmallScreen} />
                  {!isSmallScreen && (
                    <div className='flex flex-row gap-2'>
                      <div>Filter</div>
                      {filterItems.length > 0 && (
                        <div className='flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#DC4F13] text-center align-middle'>
                          {filterItems.length}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                align='end'
                className='mt-4 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
              >
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                  {filterCategories.map((item, index) => {
                    return (
                      <div className='flex flex-col gap-2' key={index}>
                        <div>{item.title}</div>
                        {item.content.map((con, i) => {
                          return (
                            <DropdownItem
                              category_id={con.category_id}
                              category_name={con.category_name}
                              isChecked={filterItems.includes(con.category_name)}
                              key={i}
                              onCheckedChange={(value) =>
                                onCheckedChange(value, con.category_id, con.category_name)
                              }
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
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
      {filterItems.length > 0 && (
        <div className='mt-4 flex touch-pan-x flex-row flex-wrap items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
          {filterItems.map((item, index) => {
            return (
              <span
                className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                key={index}
              >
                <FaX
                  className='rounded-full bg-[#3E525B] p-[2px]'
                  onClick={() => setFilterItems((prev) => prev.filter((_item) => _item !== item))}
                />
                {item}
              </span>
            );
          })}

          <span className='cursor-pointer' onClick={() => setFilterItems([])}>
            Clear&nbsp;All
          </span>
        </div>
      )}
    </div>
  );
};
