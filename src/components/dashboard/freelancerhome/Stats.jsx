'use client';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaX } from 'react-icons/fa6';
import { HiOutlineLocationMarker } from 'react-icons/hi';
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
import { useCustomContext } from '@/context/use-custom';
import { useFreelancerInfo } from '@/hooks/useFreelancerInfo';
import { useHandleResize } from '@/hooks/useHandleResize';
import { timeSincePublication } from '@/utils/Helpers';

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

const Stats = ({ searchText, setSearchText }) => {
  const auth = useCustomContext();
  const { data: flInfo } = useFreelancerInfo(auth?.currentProfile?._id);
  const [searchType, setSearchType] = useState('normal');
  const [filteredActiveOrders, setFilteredActiveOrders] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const { isSmallScreen } = useHandleResize();

  useEffect(() => {
    if (flInfo?.activeOrders?.length > 0) {
      if (searchText) {
        setFilteredActiveOrders(
          flInfo.activeOrders.filter(
            (item) =>
              item?.gigTitle?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.gigStatus?.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      } else {
        setFilteredActiveOrders(flInfo.activeOrders);
      }
    }
  }, [flInfo, searchText]);

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const setKey = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      // aiSearch();
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
        { category_id: 'any_category', category_name: 'Any Category' },
        { category_id: 'customer_service', category_name: 'Customer Service' },
        { category_id: 'design_creative', category_name: 'Design And Creative' },
        { category_id: 'accounting', category_name: 'Acounting' },
        { category_id: 'ai', category_name: 'AI' },
        { category_id: 'animator', category_name: 'Animator' },
      ],
      title: 'Category',
    },
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
    <div className='mt-10 flex min-h-96 w-full flex-col font-roboto'>
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
          {/* <div className='hidden rounded-full bg-[#1BBF36] md:block'>
            <Image height={32} src={'/assets/icons/AIChatIcon.png'} width={32} />
          </div> */}
          <div className='flex items-center gap-4'>
            <HiOutlineLocationMarker className='text-2xl text-medGray' />
            <p className='hidden text-medGray md:block'>Anywhere</p>
          </div>
          <div className='flex flex-none flex-row items-center gap-2 px-4'>
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex flex-row items-center justify-center gap-3'>
                  <FilterIcon isFiltered={filterItems.length > 0} isSmallScreen={isSmallScreen} />
                  {!isSmallScreen && (
                    <div className='flex flex-row gap-2'>
                      <div className='text-medGray'>Filter</div>
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
                className='my-5 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
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
        </div>
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
      <div className='mt-2 flex flex-col gap-4'>
        {/* <h1 className='text-2xl font-semibold'>Your Stats</h1> */}
        <div className='mt-2 flex flex-col gap-4 md:flex-row'>
          <div className='flex h-full max-h-[45vh] min-h-96 w-full flex-col rounded-2xl bg-deepGreen p-5 md:w-[70%]'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl font-semibold text-white'>Active Orders</h3>
              {/* <p className='text-medGray'>See All</p> */}
            </div>
            <div className='mt-6 flex flex-1 flex-col justify-between gap-2'>
              {filteredActiveOrders.length ? (
                filteredActiveOrders.map((order, index) => (
                  <div className='flex flex-col' key={index}>
                    <Separator className='my-4' />
                    <div className='flex items-center gap-1 rounded-2xl px-3'>
                      {/* <Image
                      className='md:hidden'
                      height={45}
                      src={'/assets/icons/ActiveOrder.png'}
                      width={45}
                    /> */}
                      <div className='flex flex-1 flex-col items-center justify-between md:flex-row'>
                        <div className='flex items-center gap-4'>
                          {/* <Image
                          className='hidden md:block'
                          height={45}
                          src={'/assets/icons/ActiveOrder.png'}
                          width={45}
                        /> */}
                          <h3 className='text-md whitespace-nowrap font-semibold text-white md:text-xl'>
                            {order.gigTitle}
                          </h3>
                        </div>
                        <div className='flex w-full items-center justify-between gap-4 px-4 md:w-auto md:px-0'>
                          <p className='text-xl font-[500] text-medGray'>{order.gigPrice}</p>
                          <div className='flex items-center gap-1 rounded-[6px] border-2 border-yellow-500 px-3 text-yellow-500'>
                            <p>
                              {timeSincePublication(new Date(order.gigPostDate).getTime() / 1000)}
                            </p>
                          </div>
                          <div className='flex items-center gap-1 rounded-[6px] border-2 border-green-500 px-3 text-green-500'>
                            <p>{order.gigStatus}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='mt-[100px] flex items-center justify-center text-2xl font-semibold'>
                  Not yet
                </div>
              )}
            </div>
          </div>
          <div className='flex h-full max-h-[45vh] min-h-96 w-full flex-col rounded-2xl bg-deepGreen p-5 md:w-[30%]'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl font-semibold text-white'>Earnings</h3>
              {/* <p className='text-medGray'>See All</p> */}
            </div>
            <div className='mt-6 flex-1'>
              {flInfo?.earnings?.length ? (
                flInfo?.earnings?.map((earning, index) => (
                  <div
                    className='mb-2 flex h-[45px] flex-1 items-center justify-between gap-1 rounded-xl bg-darkGray px-3'
                    key={index}
                  >
                    <p className='text-xl font-[500] text-white'>
                      {new Date(earning.earnedAt).getMonth() + 1}
                    </p>
                    <p className='text-xl font-[500] text-medGray'>{earning.amount}</p>
                  </div>
                ))
              ) : (
                <div className='mt-[100px] flex items-center justify-center text-2xl font-semibold'>
                  Not yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
