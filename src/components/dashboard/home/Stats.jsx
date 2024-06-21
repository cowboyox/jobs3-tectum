'use client';

import Image from 'next/image';
import React from 'react';
import { CgOptions } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import { MdVerified } from 'react-icons/md';

const spendings = [
  {
    daysAgo: '2d',
    desc: 'Deven Miles',
    price: '$250',
    title: 'Front-End Development',
  },
  {
    daysAgo: '2d',
    desc: 'Deven Miles',
    price: '$250',
    title: 'Front-End Development',
  },
  {
    daysAgo: '2d',
    desc: 'Deven Miles',
    price: '$250',
    title: 'Front-End Development',
  },
  {
    daysAgo: '2d',
    desc: 'Deven Miles',
    price: '$250',
    title: 'Front-End Development',
  },
];

const recentHires = [
  {
    desg: 'Freelancer',
    name: 'Deven Miles',
    pic: '/assets/dashboard-media/profilePic.png',
  },
  {
    desg: 'Freelancer',
    name: 'Deven Miles',
    pic: '/assets/dashboard-media/profilePic.png',
  },
  {
    desg: 'Freelancer',
    name: 'Deven Miles',
    pic: '/assets/dashboard-media/profilePic.png',
  },
  {
    desg: 'Freelancer',
    name: 'Deven Miles',
    pic: '/assets/dashboard-media/profilePic.png',
  },
];

const Stats = ({ search, setSearch }) => {
  return (
    <div className='-mt-10 flex min-h-96 w-full flex-col font-roboto md:mt-6'>
      <div className='flex h-16 items-center justify-between gap-6 rounded-2xl bg-deepGreen px-4'>
        <div className='flex flex-1 items-center gap-4'>
          <CiSearch className='text-2xl text-medGray' />
          <input
            className='h-full w-full min-w-[300px] border-none bg-transparent text-medGray outline-none'
            id='search'
            name='search'
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by Order title...'
            type='text'
            value={search}
          />
        </div>
        <div className='flex min-w-28 items-center justify-center gap-4'>
          <CgOptions className='text-2xl text-medGray' />
          <p className='text-white'>Filter</p>
          <span className='flex size-6 items-center justify-center rounded-full bg-orange'>4</span>
        </div>
        <div className='hidden min-w-28 items-center justify-center md:flex'>
          <span className='text-white'>Sorted by</span>
          <select
            className='border-none bg-transparent text-medGray outline-none'
            id='date'
            name='date'
          >
            <option className='text-medGray' value='date'>
              Date
            </option>
          </select>
        </div>
      </div>
      <div className='mt-10 flex flex-col gap-4'>
        <h1>Your Stats</h1>
        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='flex h-full min-h-96 flex-col rounded-2xl bg-deepGreen p-5'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl text-white'>Spendings</h3>
              <p className='text-medGray'>See All</p>
            </div>
            <div className='flex flex-1 flex-col justify-between gap-2'>
              {spendings.map((spend, index) => (
                <div
                  className='flex flex-1 items-center gap-1 rounded-2xl bg-darkGray px-3'
                  key={index}
                >
                  <div className='w-[70%]'>
                    <h3 className='truncate text-lg text-white'>{spend.title}</h3>
                    <div className='flex items-center gap-1 text-medGray'>
                      <p className='text-medGray'>{spend.desc}</p>
                      <div className='size-1 rounded-full bg-medGray' />
                      <span>{spend.daysAgo}</span>
                    </div>
                  </div>
                  <div className='flex flex-1 items-center justify-center'>
                    <div className='flex h-8 w-[90%] items-center justify-center gap-2 rounded-[8px] border-none bg-lightGray outline-none'>
                      <span>-</span> {spend.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex h-full min-h-96 flex-col rounded-2xl bg-deepGreen p-5'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl text-white'>Recent Hires</h3>
              <p className='text-medGray'>See All</p>
            </div>
            <div className='flex flex-1 flex-col justify-between gap-2'>
              {recentHires.map((spend, index) => (
                <div
                  className='flex flex-1 items-center gap-1 rounded-2xl bg-darkGray px-3'
                  key={index}
                >
                  <div className='flex flex-1 items-center justify-center'>
                    <div className='flex h-10 w-[90%] items-center justify-center border-none outline-none'>
                      <Image
                        alt='pic'
                        className='h-full w-full object-contain'
                        height={1000}
                        src={spend.pic}
                        width={1000}
                      />
                    </div>
                  </div>
                  <div className='w-[70%]'>
                    <div className='flex items-center gap-2'>
                      <h3 className='truncate text-lg text-white'>{spend.name}</h3>
                      <MdVerified className='text-[#0A75C2]' />
                    </div>
                    <div className='flex items-center gap-1 text-medGray'>
                      <p className='text-medGray'>{spend.desg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex h-full min-h-96 flex-col rounded-2xl bg-deepGreen p-5'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl text-white'>Applications</h3>
              <p className='text-medGray'>See All</p>
            </div>
            <div className='flex flex-1 flex-col justify-between gap-2'>
              {recentHires.map((spend, index) => (
                <div
                  className='flex flex-1 items-center gap-1 rounded-2xl bg-darkGray px-3'
                  key={index}
                >
                  <div className='flex flex-1 items-center justify-center'>
                    <div className='flex h-10 w-[90%] items-center justify-center border-none outline-none'>
                      <Image
                        alt='pic'
                        className='h-full w-full object-contain'
                        height={1000}
                        src={spend.pic}
                        width={1000}
                      />
                    </div>
                  </div>
                  <div className='w-[70%]'>
                    <div className='flex items-center gap-2'>
                      <h3 className='truncate text-lg text-white'>{spend.name}</h3>
                      <MdVerified className='text-[#0A75C2]' />
                    </div>
                    <div className='flex items-center gap-1 text-medGray'>
                      <p className='text-medGray'>{spend.desg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
