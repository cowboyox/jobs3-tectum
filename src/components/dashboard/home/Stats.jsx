'use client';

import Image from 'next/image';
import React from 'react';
import { CgOptions } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import { MdVerified } from 'react-icons/md';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiRobot2Line } from 'react-icons/ri';


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
    <div className='flex min-h-96 w-full flex-col font-roboto mt-10'>{/* 
       <div className='flex md:h-16 items-center justify-between gap-6 rounded-2xl bg-deepGreen pl-1 pr-4'>
        <div className='flex min-w-[400px] items-center gap-4'>
        <Select defaultValue='normal' className="outline-none">
            <SelectTrigger className='w-20 rounded-xl bg-[#1B272C] h-full mobile:w-14 mobile:p-2 outline-none'>
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
            className='h-full w-full flex-1 border-none bg-transparent text-medGray outline-none'
            id='search'
            name='search'
            placeholder='Search by job title, company, keywords'
            type='text'
          />
        </div>
        <div className='flex h-16 min-w-28 items-center justify-center gap-4'>
          <div className='hidden rounded-full bg-[#1BBF36] md:block'>
            <Image height={32} src={'/assets/icons/AIChatIcon.png'} width={32} />
          </div>
          <div className='flex items-center gap-4'>
            <HiOutlineLocationMarker className='text-2xl text-medGray' />
            <p className='hidden text-medGray md:block'>Anywhere</p>
          </div>
          <CgOptions className='text-2xl text-medGray' />
          <p className='hidden text-medGray md:block'>Filter</p>
          <span className='flex size-6 items-center justify-center rounded-full bg-orange'>4</span>
        </div>
      </div> */}
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
                    <div className='flex h-8 w-[90%] items-center text-red-600 justify-center gap-2 rounded-[8px] border-none  outline-none'>
                      <span>-</span>{spend.price}
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
