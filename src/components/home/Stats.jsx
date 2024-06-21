'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CgOptions } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import { MdVerified } from 'react-icons/md';

import api from '@/utils/api';

const Stats = () => {
  const [spendings, setSpending] = useState([
    {
      daysAgo: '',
      hiredFreelancer: [],
      price: '',
      title: '',
    },
  ]);
  const [recentHires, setRecentHires] = useState([
    {
      desg: '',
      name: '',
      pic: '',
    },
  ]);

  useEffect(() => {
    api.get(`/api/v1/client_gig/get-gigs-bystatus/ended`).then((data) => {
      setSpending(data.data.data);
    });

    api.get(`/api/v1/client_gig/recent-hired-freelancers`).then((data) => {
      setRecentHires(data.data.data);
    });
  }, []);
  return (
    <div className='-mt-10 flex min-h-96 w-full flex-col font-roboto md:mt-10'>
      <div className='flex h-16 items-center justify-between gap-6 rounded-2xl bg-deepGreen px-4'>
        <div className='flex flex-1 items-center gap-4'>
          <CiSearch className='text-2xl text-medGray' />
          <input
            className='h-full border-none bg-transparent text-medGray outline-none'
            id='search'
            name='search'
            placeholder='Search by Order title...'
            type='text'
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
              {spendings.length ? (
                spendings.map((spend, index) => (
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
                ))
              ) : (
                <div className='mt-[50%] text-center'>No spendings</div>
              )}
            </div>
          </div>
          <div className='flex h-full min-h-96 flex-col rounded-2xl bg-deepGreen p-5'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl text-white'>Recent Hires</h3>
              <p className='text-medGray'>See All</p>
            </div>
            <div className='flex flex-1 flex-col justify-between gap-2'>
              {recentHires.length ? (
                recentHires.map((spend, index) => (
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
                ))
              ) : (
                <div className='mt-[50%] text-center'>No Hires yet</div>
              )}
            </div>
          </div>
          <div className='flex h-full min-h-96 flex-col rounded-2xl bg-deepGreen p-5'>
            <div className='flex h-1/6 items-center justify-between'>
              <h3 className='text-2xl text-white'>Applications</h3>
              <p className='text-medGray'>See All</p>
            </div>
            <div className='flex flex-1 flex-col justify-between gap-2'>
              {recentHires.length ? (
                recentHires.map((spend, index) => (
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
                ))
              ) : (
                <div className='mt-[50%] text-center'>Nothing yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
