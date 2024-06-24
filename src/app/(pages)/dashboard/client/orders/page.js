'use client';

import React, { useEffect, useState } from 'react';
import { FaEllipsis, FaX } from 'react-icons/fa6';

import searchOptions from '../freelancers/searchOptions';

import { Button } from '@/components/ui/button';
import CustomIconDropdown from '@/components/ui/dropdown';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';

const Orders = () => {
  const auth = useCustomContext();

  const filterCategory = ['Active', 'Paused', 'Completed', 'Cancelled'];
  const [orders, setOrders] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [searchType, setSearchType] = useState(searchOptions[0]);
  const handleSearchTypeChange = (v) => setSearchType(v);
  const [profile, setProfile] = useState(null);
  const [isSmallScreen, setIsSmallScree] = useState(false);
  const [mode, setMode] = useState('live');
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (auth.user) {
      api.get(`/api/v1/profile/get-profile/${auth.user.email}/3`).then((data) => {
        setProfile(data.data.profile);
      });
    }
  }, [auth]);

  // useEffect(() => {
  //   if (profile) {
  //     api.get(`/api/v1/freelancer_gig/find_all_gigs_proposed/${profile._id}`).then((data) => {
  //       if (data.data.data) {
  //         setOrders(data.data.data);
  //       } else {
  //         setOrders([]);
  //       }
  //     });
  //   }
  // }, [profile]);

  useEffect(() => {
    setOrders([
      {
        creator: {
          fullName: 'Test User',
        },
        gigDescription: 'Rust smart contract development',
        gigPostDate: new Date(),
        gigPrice: 200,
        gitTitle: 'Smart contract Development',
      },
      {
        creator: {
          fullName: 'Test User',
        },
        gigDescription: 'Rust smart contract development',
        gigPostDate: new Date(),
        gigPrice: 200,
        gitTitle: 'Smart contract Development',
      },
      {
        creator: {
          fullName: 'Test User',
        },
        gigDescription: 'Rust smart contract development',
        gigPostDate: new Date(),
        gigPrice: 200,
        gitTitle: 'Smart contract Development',
      },
      {
        creator: {
          fullName: 'Test User',
        },
        gigDescription: 'Rust smart contract development',
        gigPostDate: new Date(),
        gigPrice: 200,
        gitTitle: 'Smart contract Development',
      },
    ]);
    setProposals([
      {
        creator: {
          fullName: 'web developer',
        },
        gigDescription: 'Website Development',
        gigPostDate: new Date(),
        gigPrice: 500,
        gitTitle: 'Website Development',
      },
      {
        creator: {
          fullName: 'web developer',
        },
        gigDescription: 'Website development',
        gigPostDate: new Date(),
        gigPrice: 500,
        gitTitle: 'Website Development',
      },
      {
        creator: {
          fullName: 'web developer',
        },
        gigDescription: 'Website development',
        gigPostDate: new Date(),
        gigPrice: 500,
        gitTitle: 'Website Development',
      },
      {
        creator: {
          fullName: 'web developer',
        },
        gigDescription: 'Website development',
        gigPostDate: new Date(),
        gigPrice: 500,
        gitTitle: 'Website Development',
      },
      {
        creator: {
          fullName: 'web developer',
        },
        gigDescription: 'Website development',
        gigPostDate: new Date(),
        gigPrice: 500,
        gitTitle: 'Website Development',
      },
    ]);
  }, []);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);

    // Get abbreviated month name
    const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

    // Get day with leading zero if needed
    const day = date.getUTCDate().toString().padStart(2, '0');

    // Formatted date string
    const formattedDate = `${monthAbbreviation} ${day}`;
    return formattedDate;
  };

  return (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className='flex flex-row items-center justify-between gap-5 rounded-xl bg-[#10191D] p-3'>
        <div className='ml-3 flex flex-1 items-center gap-3'>
          <CustomIconDropdown
            onChange={handleSearchTypeChange}
            optionLabel='icon'
            options={searchOptions}
            value={searchType}
          />
          <input
            className='w-full bg-transparent outline-none'
            placeholder={isSmallScreen ? '' : 'Search by Order title...'}
            type='text'
          />
          {isSmallScreen && (
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
                  stroke-width='1.5'
                />
                <path
                  d='M3.816 8.49C5.786 -0.169998 18.616 -0.159997 20.576 8.5C21.726 13.58 18.566 17.88 15.796 20.54C13.786 22.48 10.606 22.48 8.586 20.54C5.826 17.88 2.666 13.57 3.816 8.49Z'
                  stroke='#96B0BD'
                  stroke-width='1.5'
                />
              </svg>
            </button>
          )}
        </div>
        <div className='flex flex-none flex-row items-center gap-2'>
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
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M6.46191 6.58594H2.52441'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M10.3994 10.0312C12.3022 10.0312 13.8447 8.48873 13.8447 6.58594C13.8447 4.68314 12.3022 3.14062 10.3994 3.14062C8.49662 3.14062 6.9541 4.68314 6.9541 6.58594C6.9541 8.48873 8.49662 10.0312 10.3994 10.0312Z'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M22.2119 17.4141H18.2744'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M8.43066 17.4141H2.52441'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M14.3369 20.8594C16.2397 20.8594 17.7822 19.3169 17.7822 17.4141C17.7822 15.5113 16.2397 13.9688 14.3369 13.9688C12.4341 13.9688 10.8916 15.5113 10.8916 17.4141C10.8916 19.3169 12.4341 20.8594 14.3369 20.8594Z'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
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
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M6.42188 6.58594H2.48438'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M10.3594 10.0312C12.2622 10.0312 13.8047 8.48873 13.8047 6.58594C13.8047 4.68314 12.2622 3.14062 10.3594 3.14062C8.45658 3.14062 6.91406 4.68314 6.91406 6.58594C6.91406 8.48873 8.45658 10.0312 10.3594 10.0312Z'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M22.1719 17.4141H18.2344'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M8.39062 17.4141H2.48438'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
                />
                <path
                  d='M14.2969 20.8594C16.1997 20.8594 17.7422 19.3169 17.7422 17.4141C17.7422 15.5113 16.1997 13.9688 14.2969 13.9688C12.3941 13.9688 10.8516 15.5113 10.8516 17.4141C10.8516 19.3169 12.3941 20.8594 14.2969 20.8594Z'
                  stroke='#96B0BD'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-miterlimit='10'
                  stroke-width='1.5'
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
      </div>
      {mode == 'live' ? (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{orders.length}</span> Orders😊
        </div>
      ) : (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{proposals.length}</span> Proposals😊
        </div>
      )}
      <div className='mt-4 flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
        {filterCategory.map((item, index) => {
          return (
            <span
              className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
              key={index}
            >
              <FaX className='rounded-full bg-[#3E525B] p-[2px]' />
              {item}
            </span>
          );
        })}
        <span>Clear&nbsp;All</span>
      </div>
      <div className='flex w-full items-center justify-center py-5'>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'live' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('live')}
        >
          {mode == 'live' ? (
            <h1>
              <span className='inline-block h-6 w-6 rounded-full bg-orange'>{orders.length}</span>
              &nbsp; Live
            </h1>
          ) : (
            <h1>Live</h1>
          )}
        </div>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'proposal' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('proposal')}
        >
          {mode == 'proposal' ? (
            <h1>
              <span className='inline-block h-6 w-6 rounded-full bg-orange'>
                {proposals.length}
              </span>
              &nbsp; Proposals
            </h1>
          ) : (
            <h1>Proposals</h1>
          )}
        </div>
      </div>
      {mode == 'live' ? (
        <>
          {orders.map((order, index) => {
            return (
              <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center' key={index}>
                <div className='mt-1 flex flex-col-reverse items-start justify-between md:flex-row md:items-center'>
                  <div className='mt-3 flex-1 text-left text-[20px] md:mt-0 md:text-2xl'>
                    {order.gigTitle}
                  </div>
                  <div className='flex flex-none flex-row items-center gap-2'>
                    <div className='rounded-xl border border-[#F7AE20] p-1 px-3 text-[#F7AE20]'>
                      15 H: 30 S
                    </div>
                    <div className='rounded-xl border border-[#1BBF36] p-1 px-3 text-[#1BBF36]'>
                      Active
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className='border-none bg-transparent hover:bg-transparent'
                          variant='outline'
                        >
                          <FaEllipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='rounded-xl border-[#3E525B] bg-[#28373E]'>
                        <DropdownMenuCheckboxItem
                          // checked={showStatusBar}
                          // onCheckedChange={setShowStatusBar}
                          className='gap-2 rounded-xl hover:bg-white'
                        >
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12 9V14'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M12.0004 21.4098H5.94042C2.47042 21.4098 1.02042 18.9298 2.70042 15.8998L5.82042 10.2798L8.76042 4.99979C10.5404 1.78979 13.4604 1.78979 15.2404 4.99979L18.1804 10.2898L21.3004 15.9098C22.9804 18.9398 21.5204 21.4198 18.0604 21.4198H12.0004V21.4098Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M11.9941 17H12.0031'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                          </svg>
                          Report
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          // checked={showActivityBar}
                          // onCheckedChange={setShowActivityBar}
                          className='mt-1 gap-2 rounded-xl hover:bg-white'
                        >
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.91 14.64 21.16 15.65 21.98C15.44 22 15.22 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M2.51953 7.10986H21.4796'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M8.51953 2.10986V6.96985'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M15.4795 2.10986V6.5199'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M23 18.5C23 19.85 22.4 21.05 21.47 21.88C20.67 22.57 19.64 23 18.5 23C17.42 23 16.42 22.62 15.65 21.98C14.64 21.16 14 19.91 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                            <path
                              d='M18.7799 17.0898V18.7798L17.3799 19.6198'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                          </svg>
                          Extend The Delivery Date
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          // checked={showPanel}
                          // onCheckedChange={setShowPanel}
                          className='mt-1 gap-2 rounded-xl hover:bg-white'
                        >
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M10.75 14.4302V9.3702C10.75 8.8902 10.55 8.7002 10.04 8.7002H8.75004C8.24004 8.7002 8.04004 8.8902 8.04004 9.3702V14.4302C8.04004 14.9102 8.24004 15.1002 8.75004 15.1002H10.04C10.55 15.1002 10.75 14.9102 10.75 14.4302Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M16.0303 14.4302V9.3702C16.0303 8.8902 15.8303 8.7002 15.3203 8.7002H14.0303C13.5203 8.7002 13.3203 8.8902 13.3203 9.3702V14.4302C13.3203 14.9102 13.5203 15.1002 14.0303 15.1002'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                          </svg>
                          Pause The Order
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          // checked={showPanel}
                          // onCheckedChange={setShowPanel}
                          className='mt-1 gap-2 rounded-xl hover:bg-white'
                        >
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                            <path
                              d='M18.9004 5L4.90039 19'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                          </svg>
                          Cancel Order
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className='mt-3 flex flex-row-reverse items-start justify-between gap-6 md:flex-row md:justify-start'>
                  <div className='flex flex-row items-center gap-2'>
                    <svg
                      fill='none'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                      <path
                        d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                    </svg>
                    {formattedDate(order.gigPostDate)} - Present
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <svg
                      fill='none'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-miterlimit='10'
                        stroke-width='1.5'
                      />
                      <path
                        d='M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-miterlimit='10'
                        stroke-width='1.5'
                      />
                      <path
                        d='M9 13.0098H12'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                      <path
                        d='M9 9.00977H12'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                      <path
                        d='M5.99609 13H6.00508'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                      <path
                        d='M5.99609 9H6.00508'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                    </svg>
                    ${order.gigPrice}
                  </div>
                </div>
                <Separator className='my-4' />
                {isSmallScreen && (
                  <div className='text-left text-[#96B0BD]'>{order.gigDescription}</div>
                )}
                <div className='mt-3 flex flex-col items-start justify-between md:flex-row md:items-center'>
                  <div className='flex flex-1 flex-row items-center gap-3 text-left'>
                    <div>
                      <img height={40} src='/assets/images/Rectangle 273.png' width={40} />
                    </div>
                    <div className='flex flex-col gap-1 text-left'>
                      <div className='flex flex-row items-center gap-1 font-bold'>
                        {order.creator?.fullName}
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
                  <div className='mt-2 flex-none rounded-xl bg-[#1B272C] p-1 md:mt-0'>
                    <button className='p-4 px-8 md:p-5'>Message</button>
                    <button className='bg-[#DC4F13] p-4 px-8 md:p-5'>See Order</button>
                  </div>
                </div>
              </div>
            );
          })}
          <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
            Load more +{' '}
          </button>
        </>
      ) : (
        <>
          {proposals.map((proposal, index) => {
            return (
              <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center' key={index}>
                <div className='mt-1 flex flex-col-reverse items-start justify-between md:flex-row md:items-center'>
                  <div className='mt-3 flex-1 text-left text-[20px] md:mt-0 md:text-2xl'>
                    {proposal.gigTitle}
                  </div>
                  <div className='flex flex-none flex-row items-center gap-2'>
                    {/* <div className='rounded-xl border border-[#F7AE20] p-1 px-3 text-[#F7AE20]'>
                        15 H: 30 S
                      </div>
                      <div className='rounded-xl border border-[#1BBF36] p-1 px-3 text-[#1BBF36]'>
                        Active
                      </div> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className='border-none bg-transparent hover:bg-transparent'
                          variant='outline'
                        >
                          <FaEllipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='rounded-xl border-[#3E525B] bg-[#28373E]'>
                        <DropdownMenuCheckboxItem
                          // checked={showStatusBar}
                          // onCheckedChange={setShowStatusBar}
                          className='gap-2 rounded-xl hover:bg-white'
                        >
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12 9V14'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M12.0004 21.4098H5.94042C2.47042 21.4098 1.02042 18.9298 2.70042 15.8998L5.82042 10.2798L8.76042 4.99979C10.5404 1.78979 13.4604 1.78979 15.2404 4.99979L18.1804 10.2898L21.3004 15.9098C22.9804 18.9398 21.5204 21.4198 18.0604 21.4198H12.0004V21.4098Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M11.9941 17H12.0031'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                          </svg>
                          Report
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          // checked={showActivityBar}
                          // onCheckedChange={setShowActivityBar}
                          className='mt-1 gap-2 rounded-xl hover:bg-white'
                        >
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.91 14.64 21.16 15.65 21.98C15.44 22 15.22 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M2.51953 7.10986H21.4796'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M8.51953 2.10986V6.96985'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M15.4795 2.10986V6.5199'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M23 18.5C23 19.85 22.4 21.05 21.47 21.88C20.67 22.57 19.64 23 18.5 23C17.42 23 16.42 22.62 15.65 21.98C14.64 21.16 14 19.91 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                            <path
                              d='M18.7799 17.0898V18.7798L17.3799 19.6198'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                          </svg>
                          Extend The Delivery Date
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          // checked={showPanel}
                          // onCheckedChange={setShowPanel}
                          className='mt-1 gap-2 rounded-xl hover:bg-white'
                        >
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M10.75 14.4302V9.3702C10.75 8.8902 10.55 8.7002 10.04 8.7002H8.75004C8.24004 8.7002 8.04004 8.8902 8.04004 9.3702V14.4302C8.04004 14.9102 8.24004 15.1002 8.75004 15.1002H10.04C10.55 15.1002 10.75 14.9102 10.75 14.4302Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                            <path
                              d='M16.0303 14.4302V9.3702C16.0303 8.8902 15.8303 8.7002 15.3203 8.7002H14.0303C13.5203 8.7002 13.3203 8.8902 13.3203 9.3702V14.4302C13.3203 14.9102 13.5203 15.1002 14.0303 15.1002'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='1.5'
                            />
                          </svg>
                          Pause The Order
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          // checked={showPanel}
                          // onCheckedChange={setShowPanel}
                          className='mt-1 gap-2 rounded-xl hover:bg-white'
                        >
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                            <path
                              d='M18.9004 5L4.90039 19'
                              stroke='#96B0BD'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-miterlimit='10'
                              stroke-width='1.5'
                            />
                          </svg>
                          Cancel Order
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className='mt-3 flex flex-row-reverse items-start justify-between gap-6 md:flex-row md:justify-start'>
                  <div className='flex flex-row items-center gap-2'>
                    <svg
                      fill='none'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                      <path
                        d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                    </svg>
                    {formattedDate(proposal.gigPostDate)} - Present
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <svg
                      fill='none'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-miterlimit='10'
                        stroke-width='1.5'
                      />
                      <path
                        d='M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-miterlimit='10'
                        stroke-width='1.5'
                      />
                      <path
                        d='M9 13.0098H12'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                      <path
                        d='M9 9.00977H12'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                      <path
                        d='M5.99609 13H6.00508'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                      <path
                        d='M5.99609 9H6.00508'
                        stroke='#96B0BD'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                      />
                    </svg>
                    ${proposal.gigPrice}
                  </div>
                </div>
                <Separator className='my-4' />
                {isSmallScreen && (
                  <div className='text-left text-[#96B0BD]'>{proposal.gigDescription}</div>
                )}
                <div className='mt-3 flex flex-col items-start justify-between md:flex-row md:items-center'>
                  <div className='flex flex-1 flex-row items-center gap-3 text-left'>
                    <div>
                      <img height={40} src='/assets/images/Rectangle 273.png' width={40} />
                    </div>
                    <div className='flex flex-col gap-1 text-left'>
                      <div className='flex flex-row items-center gap-1 font-bold'>
                        {proposal.creator?.fullName}
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
                  <div className='mt-2 flex-none rounded-xl bg-[#1B272C] p-1 md:mt-0'>
                    <button className='p-4 px-8 md:p-5'>Message</button>
                    <button className='bg-[#DC4F13] p-4 px-8 md:p-5'>Accept</button>
                  </div>
                </div>
              </div>
            );
          })}
          <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
            Load more +{' '}
          </button>
        </>
      )}
    </div>
  );
};

export default Orders;
