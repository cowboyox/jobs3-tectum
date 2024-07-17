import React from 'react';
import { FaArrowRight, FaX } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';

import searchOptions from './searchOptions';

import { FilterIcon } from '@/components/elements/svgs/FilterIcon';
import { Checkbox } from '@/components/ui/checkbox';
import CustomIconDropdown from '@/components/ui/dropdown';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DropdownItem = ({ onCheckedChange, isChecked, ...props }) => {
  return (
    <div className='flex items-center gap-4 p-0 cursor-pointer'>
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
  filters,
  setFilters,
  locationFilters,
  setLocationFilters,
  countries,
  locationText,
  setLocationText,
}) => {
  console.log({ isSmallScreen,
    setSearchText,
    searchType,
    setIsAiSearch,
    setSearchType,
    filters,
    setFilters,
    locationFilters,
    setLocationFilters,
    countries,
    locationText,
    setLocationText})
  const filterCategories = [
    {
      content: [
        { category_id: 'earned', category_name: 'Any Earned', category_value: 0 },
        { category_id: 'earned', category_name: '$1+ Earned', category_value: 1 },
        { category_id: 'earned', category_name: '$100+ Earned', category_value: 100 },
        { category_id: 'earned', category_name: '$1k+ Earned', category_value: 1000 },
        { category_id: 'earned', category_name: '$10k+ Earned', category_value: 10000 },
      ],
      title: 'Earned Amount',
    },
    {
      content: [
        {
          category_id: 'languages',
          category_name: 'Any Language',
          category_value: 'any',
        },
        { category_id: 'languages', category_name: 'English', category_value: 'English' },
        { category_id: 'languages', category_name: 'Germany', category_value: 'Germany' },
        { category_id: 'languages', category_name: 'Russian', category_value: 'Russian' },
        { category_id: 'languages', category_name: 'Spanish', category_value: 'Spanish' },
        { category_id: 'languages', category_name: 'Portugues', category_value: 'Portugues' },
      ],
      title: 'Languages',
    },
    {
      content: [
        {
          category_id: 'hourlyRate',
          category_name: 'Any Rate',
          category_value: 'any',
        },
        { category_id: 'hourlyRate', category_name: '$10 and Below', category_value: [0, 10] },
        { category_id: 'hourlyRate', category_name: '$10 - $30', category_value: [10, 30] },
        { category_id: 'hourlyRate', category_name: '$30 - $60', category_value: [30, 60] },
        {
          category_id: 'hourlyRate',
          category_name: '$60 and Above',
          category_value: [60, 99999999],
        },
      ],
      title: 'Hourly rate',
    },
    {
      content: [
        { category_id: 'hoursBilled', category_name: '1+ Hours Billed', category_value: 1 },
        { category_id: 'hoursBilled', category_name: '100+ Hours Billed', category_value: 100 },
        { category_id: 'hoursBilled', category_name: '1000+ Hours Billed', category_value: 1000 },
      ],
      title: 'Hours billed',
    },
    {
      content: [
        { category_id: 'jobSuccess', category_name: 'Any Score', category_value: 0 },
        { category_id: 'jobSuccess', category_name: '80% & UP', category_value: 80 },
        { category_id: 'jobSuccess', category_name: '90% & UP', category_value: 90 },
      ],
      title: 'Job Success',
    },
  ];

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

  const onCheckedChange = (isChecked, id, name, value, title) => {
    if (isChecked) {
      filterCategories.map((item, index) => {
        if (title === item.title && (title === 'Languages' || title === 'Hourly rate')) {
          if (name === item.content[0].category_name) {
            setFilters((prev) => [
              ...prev.filter((f) => f.id !== id && f.name !== name),
              { id, name, value },
            ]);
          } else {
            filters.filter((f) => f.id === id && f.name !== item.content[0].category_name).length === item.content.length - 2
              ? setFilters((prev) => [
                  ...prev.filter((f) => f.id !== id),
                  {
                    id: item.content[0].category_id,
                    name: item.content[0].category_name,
                    value: item.content[0].category_value,
                  },
                ])
              : setFilters((prev) => [
                  ...prev.filter((f) => f.name !== item.content[0].category_name),
                  { id, name, value },
                ]);
          }
        } else if (title === item.title && (title === 'Hours billed' || title === 'Earned Amount' || title === 'Job Success')) {
          setFilters((prev) => [
            ...prev.filter((f) => f.id !== id),
            { id, name, value },
          ]);
        }
      });
    } else {
      setFilters((prev) =>
        prev.filter(
          (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
        )
      );
    }
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  const handleRemove = (id, name, value) => {
    setFilters((prev) =>
      prev.filter(
        (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
      )
    );
  };

  const onCheckedLocationChange = (value, id, name) => {
    if (value) {
      setLocationFilters((prev) => [...prev, name]);
    } else {
      setLocationFilters((prev) => prev.filter((item) => item !== name));
    }
  };

  return (
    <div>
      <div className='flex gap-5 rounded-xl bg-[#10191D]'>
        <div className='flex items-center flex-1 gap-3 m-3'>
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
        <Popover>
          <PopoverTrigger asChild>
            <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl px-2 transition hover:bg-[#1B272C] mobile:m-1'>
              <IoLocationOutline size={20} stroke='#96B0BD' />
              {
                locationFilters.length == 0 ?
                <span className='text-[#96B0BD]'>Anywhere</span> :
                <span className='text-[#96B0BD]'>{ locationFilters.join(", ").length > 11 ? locationFilters.join(", ").slice(0,10) + "..." : locationFilters.join(", ") }</span>
              }
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#DC4F13] text-sm mobile:h-4 mobile:w-4 mobile:text-sm'>
                {locationFilters.length}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align='end'
            className='mt-3 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] pl-4 pr-1 py-4'
          >
            <div className='max-h-[300px] overflow-y-auto country-list'>
              <div className='sticky top-0 flex bg-[#1B272C] p-1 mb-1'>
                <input 
                  className='w-full px-7 relative text-[#96B0BD] border-[#96B0BD] border-2 bg-transparent rounded-full outline-none mobile:text-sm' 
                  onChange={(e) => {
                    setLocationText(e.target.value);
                  }}
                  value={locationText}
                />
                <svg
                  className='absolute w-5 h-5 top-2 left-3'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={1.5}
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              {
                countries.length > 0 ?
                <div className='flex flex-col gap-2'>
                  {countries.map((con, i) => {
                    return (
                      <DropdownItem
                        category_id={con}
                        category_name={con}
                        isChecked={locationFilters.includes(con)}
                        key={i}
                        onCheckedChange={(value) =>
                          onCheckedLocationChange(value, con, con)
                        }
                      />
                    );
                  })}
                </div> :
                <div className='flex flex-col gap-2'>
                  <span className='text-[#96B0BD]'>No results found</span>
                </div>
              }
            </div>
          </PopoverContent>
        </Popover>
        {(!isSmallScreen || (isSmallScreen && searchType === searchOptions[0])) && (
          <div className='flex flex-row items-center flex-none gap-2 px-4'>
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex flex-row items-center justify-center gap-3'>
                  <FilterIcon isFiltered={filters.length > 0} isSmallScreen={isSmallScreen} />
                  {!isSmallScreen && (
                    <div className='flex flex-row gap-2'>
                      <div>Filter</div>
                      {filters.length > 0 && (
                        <div className='flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#DC4F13] text-center align-middle'>
                          {filters.length}
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
                <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                  {filterCategories.map((item, index) => {
                    return (
                      <div className='flex flex-col gap-2' key={index}>
                        <div>{item.title}</div>
                        {item.content.map((con, i) => {
                          return (
                            <DropdownItem
                              category_id={con.category_id + con.category_value}
                              category_name={con.category_name}
                              isChecked={
                                !!filters.find(
                                  (f) =>
                                    f.id === con.category_id &&
                                    f.name === con.category_name &&
                                    JSON.stringify(f.value) === JSON.stringify(con.category_value)
                                )
                              }
                              key={i}
                              onCheckedChange={(value) =>
                                onCheckedChange(
                                  value,
                                  con.category_id,
                                  con.category_name,
                                  con.category_value,
                                  item.title
                                )
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
              className='flex w-12 items-center justify-center self-stretch rounded-e-[15px] rounded-s-[0px] bg-orange text-lg text-white'
              onClick={aiSearch}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      {filters.length > 0 && (
        <div className='mt-4 flex touch-pan-x flex-row flex-wrap items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
          {filters.map((filter, index) => {
            return (
              <span
                className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                key={index}
              >
                <FaX
                  className='rounded-full bg-[#3E525B] p-[2px]'
                  onClick={() => handleRemove(filter.id, filter.name, filter.value)}
                />
                {filter.name}
              </span>
            );
          })}

          <span className='cursor-pointer' onClick={handleClearAll}>
            Clear&nbsp;All
          </span>
        </div>
      )}
    </div>
  );
};
