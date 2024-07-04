'use client';
import React, { useEffect, useState } from 'react';
import { CgOptions } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiRobot2Line } from 'react-icons/ri';

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
import { timeSincePublication } from '@/utils/Helpers';

const Stats = () => {
  const auth = useCustomContext();
  const { data: flInfo } = useFreelancerInfo(auth?.currentProfile?._id);
  const [searchType, setSearchType] = useState('normal');
  const [searchKeywords, setSearchKeyWords] = useState('');
  const [filteredActiveOrders, setFilteredActiveOrders] = useState([]);

  useEffect(() => {
    if (flInfo?.activeOrders?.length > 0) {
      if (searchKeywords) {
        setFilteredActiveOrders(
          flInfo.activeOrders.filter(
            (item) =>
              item?.gigTitle?.toLowerCase().includes(searchKeywords.toLowerCase()) ||
              item?.gigStatus?.toLowerCase().includes(searchKeywords.toLowerCase())
          )
        );
      } else {
        setFilteredActiveOrders(flInfo.activeOrders);
      }
    }
  }, [flInfo, searchKeywords]);

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const setKey = (e) => {
    setSearchKeyWords(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      // aiSearch();
    }
  };

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
          <CgOptions className='text-2xl text-medGray' />
          <p className='hidden text-medGray md:block'>Filter</p>
          {/* <span className='flex size-6 items-center justify-center rounded-full bg-orange'>4</span> */}
        </div>
      </div>
      <div className='mt-10 flex flex-col gap-4'>
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
