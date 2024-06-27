'use client';

import Image from 'next/image';
import React from 'react';
import { CgOptions } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdVerified } from 'react-icons/md';
import { RiRobot2Line } from 'react-icons/ri';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCustomContext } from '@/context/use-custom';
import { useClientInfo } from '@/hooks/useClientInfo';

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
  const auth = useCustomContext();
  const { data: clientInfo } = useClientInfo(auth?.currentProfile?._id);

  return (
    <div className='min-h-55 mt-10 flex w-full flex-col font-roboto'>
      <div className='flex items-center justify-between gap-6 rounded-2xl bg-deepGreen pl-1 pr-4 md:h-16'>
        <div className='flex items-center gap-4'>
          <Select className='outline-none' defaultValue='normal'>
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
            className='h-full w-full flex-1 border-none bg-transparent text-medGray outline-none'
            id='search'
            name='search'
            placeholder='Search by job title, company, keywords'
            type='text'
          />
        </div>
        <div className='flex h-16 min-w-28 items-center justify-center gap-4'>
          {/* <div className='hidden rounded-full bg-[#1BBF36] md:block'>
            <Image height={32} src={'/assets/icons/AIChatIcon.png'} width={32} />
          </div> */}
          <div className='flex items-center gap-4'>
            <HiOutlineLocationMarker className='text-2xl text-medGray' />
            <p className='hidden text-medGray md:block'>Anywhere</p>
          </div>
          <CgOptions className='text-2xl text-medGray' />
          <p className='hidden text-medGray md:block'>Filter</p>
          {/* <span className='flex size-6 items-center justify-center rounded-full bg-orange'>4</span> */}
        </div>
      </div>
      <div className='mt-10 flex flex-col gap-4'>
        {/* <h1>Your Stats</h1> */}
        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='flex h-full min-h-96 flex-col rounded-2xl bg-deepGreen p-5'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl font-semibold text-white'>Spendings</h3>
              {clientInfo?.recentHires?.length > 0 && <p className='text-medGray'>See All</p>}
            </div>
            <div className='item flex flex-1 flex-col justify-between gap-2'>
              {clientInfo?.recentHires?.length > 0 ? (
                clientInfo?.recentHires?.map((hired, index) => (
                  <div
                    className='flex items-center gap-1 rounded-2xl bg-darkGray px-3 py-2'
                    key={index}
                  >
                    <div className='w-[70%]'>
                      <h3 className='truncate text-lg text-white'>{hired.gigTitle}</h3>
                      <div className='flex items-center gap-1 text-medGray'>
                        <p className='text-medGray'>{hired.gigDescription}</p>
                        {/* <div className='size-1 rounded-full bg-medGray' /> */}
                        {/* <span>{spend.daysAgo}</span> */}
                      </div>
                    </div>
                    <div className='flex flex-1 items-center justify-center'>
                      <div className='flex h-8 w-[90%] items-center justify-center gap-2 rounded-[8px] border-none text-red-600 outline-none'>
                        <span>-</span>
                        {hired.spends}
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
          <div className='flex h-full min-h-96 flex-col rounded-2xl bg-deepGreen p-5'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl font-semibold text-white'>Recent Hires</h3>
              {clientInfo?.recentHires?.length > 0 && <p className='text-medGray'>See All</p>}
            </div>

            <div className='flex flex-1 flex-col justify-between gap-2'>
              {clientInfo?.recentHires?.length > 0 ? (
                clientInfo?.recentHires?.map((hired, index) => (
                  <div
                    className='flex items-center gap-2 rounded-2xl bg-darkGray px-3 py-2'
                    key={index}
                  >
                    <div className='flex items-center justify-center'>
                      <div className='flex h-10 items-center justify-center border-none outline-none'>
                        <Image
                          alt='pic'
                          className='h-full w-full rounded-full object-contain'
                          height={1000}
                          src={'/assets/images/users/user-5.png'}
                          width={1000}
                        />
                      </div>
                    </div>
                    <div className=''>
                      <div className='flex items-center gap-2'>
                        <h3 className='truncate text-lg text-white'>{hired.flFullName}</h3>
                        <MdVerified className='text-[#0A75C2]' />
                      </div>
                      <div className='flex items-center gap-1 text-medGray'>
                        <p className='text-medGray'>Freelancer</p>
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
          <div className='flex h-full min-h-96 flex-col rounded-2xl bg-deepGreen p-5'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl font-semibold text-white'>Applications</h3>
              {clientInfo?.proposals?.length > 0 && <p className='text-medGray'>See All</p>}
            </div>
            <div className='flex flex-1 flex-col justify-between gap-2'>
              {clientInfo?.proposals?.length > 0 ? (
                clientInfo?.proposals?.map((proposal, index) => (
                  <div
                    className='flex items-center gap-1 rounded-2xl bg-darkGray px-3 py-2'
                    key={index}
                  >
                    <div className='flex flex-1 items-center justify-center'>
                      <div className='flex h-10 w-[90%] items-center justify-center border-none outline-none'>
                        <Image
                          alt='pic'
                          className='h-full w-full object-contain'
                          height={1000}
                          src={'/assets/images/placeholder.jpeg'}
                          width={1000}
                        />
                      </div>
                    </div>
                    <div className='w-[70%]'>
                      <div className='flex items-center gap-2'>
                        <h3 className='truncate text-lg text-white'>{proposal.flFullName}</h3>
                        <MdVerified className='text-[#0A75C2]' />
                      </div>
                      <div className='flex items-center gap-1 text-medGray'>
                        <p className='text-medGray'>{proposal.gigTitle}</p>
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
        </div>
      </div>
    </div>
  );
};

export default Stats;
