'use client';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaX } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { RiRobot2Line } from 'react-icons/ri';

import { FilterIcon } from '@/components/elements/svgs/FilterIcon';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/seperator';
import { useHandleResize } from '@/hooks/useHandleResize';
import api from '@/utils/api';
import { COUNTRIES } from '@/utils/constants';

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

const Stats = ({
  searchType,
  setSearchType,
  searchText,
  setSearchText,
  setFiltersToQuery,
  setLoading,
  setAllGigs,
  locationFilters,
  setLocationFilters,
}) => {
  const [filters, setFilters] = useState([]);
  const [locationText, setLocationText] = useState('');
  const [countries, setCountries] = useState(COUNTRIES);

  const { isSmallScreen } = useHandleResize();

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const setKey = (e) => {
    setSearchText(e.target.value);
  };

  const aiSearch = () => {
    setLoading(true);
    api.get(`/api/v1/client_gig/ai-search/${searchText}`).then((data) => {
      let gigs = data.data.gigs;
      let reasons = data.data.reasons;
      gigs = gigs.map((gig, index) => {
        gig.reason = reasons[index];
        return gig;
      });
      console.log('new', gigs);
      setLoading(false);
      setAllGigs(gigs);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      aiSearch();
    }
  };

  const onCheckedChange = (isChecked, id, name, value) => {
    if (isChecked) {
      setFilters((prev) => [...prev, { id, name, value }]);
    } else {
      setFilters((prev) =>
        prev.filter(
          (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
        )
      );
    }
  };

  const onRadioChange = (radioValue, id, name, value) => {
    setFilters((prev) => {
      let tmp = prev.filter((f) => f.id !== id);

      return [...tmp, { id, name, value }];
    });
  };

  const filterCategories = [
    {
      content: [
        { category_id: 'sort', category_name: 'Most Recent', category_value: 0 },
        { category_id: 'sort', category_name: 'Most Relevant', category_value: 1 },
      ],
      title: 'Sorted By',
      type: 0,
    },
    {
      content: [
        { category_id: 'category', category_name: 'Any Category', category_value: 'any' },
        {
          category_id: 'category',
          category_name: 'Customer Service',
          category_value: 'customer service',
        },
        {
          category_id: 'category',
          category_name: 'Design And Creative',
          category_value: 'design and creative',
        },
        { category_id: 'category', category_name: 'Acounting', category_value: 'acounting' },
        { category_id: 'category', category_name: 'AI', category_value: 'ai' },
        { category_id: 'category', category_name: 'Animator', category_value: 'animator' },
      ],
      title: 'Category',
      type: 1,
    },
    {
      content: [
        { category_id: 'experience', category_name: 'Entry-Level', category_value: 0 },
        { category_id: 'experience', category_name: 'Intermidiate', category_value: 1 },
        { category_id: 'experience', category_name: 'Expert', category_value: 2 },
      ],
      title: 'Experience',
      type: 1,
    },
    {
      content: [
        { category_id: 'applicants', category_name: 'Less than 5', category_value: [0, 5] },
        { category_id: 'applicants', category_name: '5 to 10', category_value: [5, 10] },
        { category_id: 'applicants', category_name: '10 to 15', category_value: [10, 15] },
        { category_id: 'applicants', category_name: '15 to 20', category_value: [15, 20] },
        { category_id: 'applicants', category_name: '20 to 50', category_value: [20, 50] },
        {
          category_id: 'applicants',
          category_name: 'More than 50',
          category_value: [50, 99999999],
        },
      ],
      title: 'Number Of Applicants',
      type: 1,
    },
    {
      content: [
        { category_id: 'job_type', category_name: 'Hourly Rate', category_value: 'hourly' },
        { category_id: 'job_type', category_name: 'Fixed Price', category_value: 'fixed' },
      ],
      title: 'Job Type',
      type: 0,
    },
    {
      content: [
        {
          category_id: 'hoursPerWeek',
          category_name: 'Less than 30 hrs/week',
          category_value: [0, 30],
        },
        {
          category_id: 'hoursPerWeek',
          category_name: 'More than 30 hrs/week',
          category_value: [30, 99999999],
        },
      ],
      title: 'Hours Per Week',
      type: 0,
    },
    {
      choose: 'Select Location',
      content: [
        {
          category_id: 'location',
          category_name: 'United States',
          category_value: 'united states',
        },
        { category_id: 'location', category_name: 'England', category_value: 'england' },
        { category_id: 'location', category_name: 'India', category_value: 'india' },
        { category_id: 'location', category_name: 'Singapore', category_value: 'singapore' },
      ],
      title: 'Client Location',
      type: 2,
    },
    {
      choose: 'Select client time zones',
      content: [
        { category_id: 'timezone', category_name: 'GMT+0', category_value: 'GMT+0' },
        { category_id: 'timezone', category_name: 'GMT+1', category_value: 'GMT+1' },
        { category_id: 'timezone', category_name: 'GMT+5', category_value: 'GMT+5' },
        { category_id: 'timezone', category_name: 'GMT+8', category_value: 'GMT+8' },
      ],
      title: 'Client Timezones',
      type: 2,
    },
    {
      content: [
        { category_id: 'info', category_name: 'My Previous clients', category_value: 'previous' },
        {
          category_id: 'info',
          category_name: 'Payment Verified',
          category_value: 'payment verified',
        },
      ],
      title: 'Client Info',
      type: 0,
    },
  ];

  const onSelectChange = (e) => {
    setFilters((prev) => {
      let tmp = prev.filter((f) => f.id !== e.category_id);

      return [...tmp, { id: e.category_id, name: e.category_name, value: e.category_value }];
    });
  };

  const handleRemove = (id, name, value) => {
    setFilters((prev) =>
      prev.filter(
        (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
      )
    );
  };

  const handleClearAll = () => {
    setFilters([]);
    setFiltersToQuery([]);
  };

  const handleFilter = () => {
    setFiltersToQuery(filters);
  };

  const handleReset = () => {
    setFilters([]);
    setFiltersToQuery([]);
  };

  const onCheckedLocationChange = (value, id, name) => {
    if (value) {
      setLocationFilters((prev) => [...prev, name]);
    } else {
      setLocationFilters((prev) => prev.filter((item) => item !== name));
    }
  };
  useEffect(() => {
    setCountries(
      COUNTRIES.filter((item) =>
        item.toLocaleLowerCase().includes(locationText.toLocaleLowerCase())
      )
    );
  }, [locationText]);
  return (
    <div className='mt-10 flex w-full flex-col font-roboto'>
      <div className='flex items-center justify-between gap-6 rounded-2xl bg-deepGreen pl-1 pr-4 md:h-16'>
        <div className='flex flex-1 items-center gap-4'>
          <Select
            className='outline-none'
            defaultValue='normal'
            onValueChange={(e) => onChangeType(e)}
          >
            <SelectTrigger className='h-full w-20 rounded-xl bg-[#1B272C] outline-none mobile:w-14 mobile:p-2'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='rounded-xl bg-[#1B272C]'>
              <SelectGroup>
                <SelectItem value='normal'>
                  <CiSearch className='mobile:max-w-4' size={20} />
                </SelectItem>
                <SelectItem value='ai'>
                  <RiRobot2Line className='mobile:max-w-4' size={20} />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            className='h-full w-full border-none bg-transparent text-medGray outline-none'
            id='search'
            name='search'
            onChange={(e) => setKey(e)}
            onKeyDown={handleKeyDown}
            placeholder='Search by job title, company, keywords'
            type='text'
          />
        </div>
        <div className='flex h-16 items-center justify-center gap-4'>
          <Popover>
            <PopoverTrigger asChild>
              <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl px-2 transition hover:bg-[#1B272C] mobile:m-1'>
                <IoLocationOutline size={20} stroke='#96B0BD' />
                {locationFilters.length == 0 ? (
                  <span className='text-[#96B0BD]'>Anywhere</span>
                ) : (
                  <span className='text-[#96B0BD]'>
                    {locationFilters.join(', ').length > 11
                      ? locationFilters.join(', ').slice(0, 10) + '...'
                      : locationFilters.join(', ')}
                  </span>
                )}
                <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#DC4F13] text-sm mobile:h-4 mobile:w-4 mobile:text-sm'>
                  {locationFilters.length}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align='end'
              className='mt-3 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] py-4 pl-4 pr-1'
            >
              <div className='country-list max-h-[300px] overflow-y-auto'>
                <div className='sticky top-0 mb-1 flex bg-[#1B272C] p-1'>
                  <input
                    className='relative w-full rounded-full border-2 border-[#96B0BD] bg-transparent px-7 text-[#96B0BD] outline-none mobile:text-sm'
                    onChange={(e) => {
                      setLocationText(e.target.value);
                    }}
                    value={locationText}
                  />
                  <svg
                    className='absolute left-3 top-2 h-5 w-5'
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
                {countries.length > 0 ? (
                  <div className='flex flex-col gap-2'>
                    {countries.map((con, i) => {
                      return (
                        <DropdownItem
                          category_id={con}
                          category_name={con}
                          isChecked={locationFilters.includes(con)}
                          key={i}
                          onCheckedChange={(value) => onCheckedLocationChange(value, con, con)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className='flex flex-col gap-2'>
                    <span className='text-[#96B0BD]'>No results found</span>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <div className='flex flex-none flex-row items-center gap-2 px-4'>
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex flex-row items-center justify-center gap-3'>
                  <FilterIcon isFiltered={filters.length > 0} isSmallScreen={isSmallScreen} />
                  {!isSmallScreen && (
                    <div className='flex flex-row gap-2'>
                      <div className='text-medGray'>Filter</div>
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
                className='my-5 flex w-full flex-col gap-4 rounded-xl bg-[#10191D] px-6 py-4'
              >
                <div className='grid grid-cols-1 gap-4'>
                  {filterCategories.map((item, index) => {
                    return (
                      <div className='flex flex-col gap-2' key={index}>
                        <div>{item.title}</div>
                        {item.type === 2 && (
                          <div>
                            <Select
                              id={item.title}
                              onValueChange={(e) => onSelectChange(e)}
                              value={(() => {
                                const returns_value = item.content.filter((_item) =>
                                  filters.map((f) => f.name).includes(_item.category_name)
                                );
                                return returns_value[0];
                              })()}
                            >
                              <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                                <SelectValue placeholder={item.choose} />
                              </SelectTrigger>
                              <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                                <SelectGroup>
                                  {item.content.map((con) => (
                                    <SelectItem key={con.category_name} value={con}>
                                      {con.category_name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {item.type === 1 && (
                          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
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
                                        JSON.stringify(f.value) ===
                                          JSON.stringify(con.category_value)
                                    )
                                  }
                                  key={i}
                                  onCheckedChange={(value) =>
                                    onCheckedChange(
                                      value,
                                      con.category_id,
                                      con.category_name,
                                      con.category_value
                                    )
                                  }
                                  type={item.type}
                                />
                              );
                            })}
                          </div>
                        )}
                        {item.type === 0 && (
                          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                            {item.content.map((con, i) => (
                              <div className='flex items-center gap-3' key={i}>
                                <input
                                  checked={
                                    !!filters.find(
                                      (f) =>
                                        f.id === con.category_id &&
                                        f.name === con.category_name &&
                                        JSON.stringify(f.value) ===
                                          JSON.stringify(con.category_value)
                                    )
                                  }
                                  className='h-[24px] w-[24px] text-[#96B0BD] accent-[#DC4F13]'
                                  id={con.category_id}
                                  name={item.title}
                                  onChange={(e) =>
                                    onRadioChange(
                                      e.target.value,
                                      con.category_id,
                                      con.category_name,
                                      con.category_value
                                    )
                                  }
                                  type='radio'
                                  value={con.category_value}
                                />
                                <label className='text-[#96B0BD]' htmlFor={con.category_id}>
                                  {con.category_name}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <Separator />
                  <div className='flex h-14 w-full items-center justify-end'>
                    <div className='flex h-full w-60 items-center gap-2 rounded-2xl bg-darkGray'>
                      <button className='flex-1' onClick={handleReset}>
                        Reset
                      </button>
                      <button className='h-12 w-[55%] bg-orange' onClick={handleFilter}>
                        Show Results
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      {filters.length > 0 && (
        <div className='mt-4 flex touch-pan-x flex-row flex-wrap items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
          {filters.map((item, index) => {
            return (
              <span
                className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                key={index}
              >
                <FaX
                  className='rounded-full bg-[#3E525B] p-[2px]'
                  onClick={() => handleRemove(item.id, item.name, item.value)}
                />
                {item.name}
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

export default Stats;
