'use client';
import Image from 'next/image';
import React from 'react';
import { CgOptions } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const orders = [
  // {
  //   title: "Figma and Flow Bite Mentor Needed",
  //   daysAgo: "15 H: 30 S",
  //   price: "$360",
  // },
  // {
  //   title: "Figma and Flow Bite Mentor Needed",
  //   daysAgo: "8 days",
  //   price: "$400",
  // },
  // {
  //   title: "Figma and Flow Bite Mentor Needed",
  //   daysAgo: "14 days",
  //   price: "$450",
  // },
];

const earnings = [
  // {
  //   month: 'June',
  //   price: '$360'
  // },
  // {
  //   month: 'May',
  //   price: '$1450'
  // },
  // {
  //   month: 'April',
  //   price: '$830'
  // },
  // {
  //   month: 'March',
  //   price: '$1250'
  // },
];

const Stats = () => {
  return (
    <div className='-mt-10 flex min-h-96 w-full flex-col font-roboto md:mt-10'>
      <div className='flex h-16 items-center justify-between gap-6 rounded-2xl bg-deepGreen px-4'>
        <div className='flex min-w-[400px] items-center gap-4'>
          <CiSearch className='text-2xl text-medGray' />
          <input
            className='h-full w-full flex-1 border-none bg-transparent text-medGray outline-none'
            id='search'
            name='search'
            placeholder='Search by job title, co...'
            type='text'
          />
        </div>
        <div className='flex h-16 min-w-28 items-center justify-center gap-4'>
          <div className='hidden rounded-full bg-[#1BBF36] md:block'>
            <Image height={32} src={'/assets/icons/AIChatIcon.png'} width={32} />
          </div>
          <div className='flex items-center gap-2'>
            <HiOutlineLocationMarker className='text-2xl text-medGray' />
            <p className='hidden text-medGray md:block'>Anywhere</p>
          </div>
          <CgOptions className='text-2xl text-medGray' />
          <p className='hidden text-medGray md:block'>Filter</p>
          <span className='flex size-6 items-center justify-center rounded-full bg-orange'>4</span>
        </div>
      </div>
      <div className='mt-10 flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold'>Your Stats</h1>
        <div className='mt-2 flex flex-col gap-4 md:flex-row'>
          <div className='flex h-full max-h-[45vh] min-h-96 w-full flex-col rounded-2xl bg-deepGreen p-5 md:w-[70%]'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl font-semibold text-white'>Active Orders</h3>
              <p className='text-medGray'>See All</p>
            </div>
            <div className='mt-6 flex flex-1 flex-col justify-between gap-2'>
              {orders.length ? (
                orders.map((spend, index) => (
                  <div
                    className='flex flex-1 items-center gap-1 rounded-2xl bg-darkGray px-3'
                    key={index}
                  >
                    <Image
                      className='md:hidden'
                      height={45}
                      src={'/assets/icons/ActiveOrder.png'}
                      width={45}
                    />
                    <div className='flex flex-1 flex-col items-center justify-between md:flex-row'>
                      <div className='flex items-center gap-4'>
                        <Image
                          className='hidden md:block'
                          height={45}
                          src={'/assets/icons/ActiveOrder.png'}
                          width={45}
                        />
                        <h3 className='text-md whitespace-nowrap font-semibold text-white md:text-xl'>
                          {spend.title}
                        </h3>
                      </div>
                      <div className='flex w-full items-center justify-between gap-4 px-4 md:w-auto md:px-0'>
                        <p className='text-xl font-[500] text-medGray'>{spend.price}</p>
                        <div className='flex items-center gap-1 rounded-[6px] border-2 border-white px-3 text-white'>
                          <p>{spend.daysAgo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='mt-[20%] text-center'>Not yet</div>
              )}
            </div>
          </div>
          <div className='flex h-full max-h-[45vh] min-h-96 w-full flex-col rounded-2xl bg-deepGreen p-5 md:w-[30%]'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl font-semibold text-white'>Earnings</h3>
              <p className='text-medGray'>See All</p>
            </div>
            <div className='mt-6 flex-1'>
              {earnings.length ? (
                earnings.map((earning, index) => (
                  <div
                    className='mb-2 flex h-[45px] flex-1 items-center justify-between gap-1 rounded-xl bg-darkGray px-3'
                    key={index}
                  >
                    <p className='text-xl font-[500] text-white'>{earning.month}</p>
                    <p className='text-xl font-[500] text-medGray'>{earning.price}</p>
                  </div>
                ))
              ) : (
                <div className='mt-[50%] text-center'>Not yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
