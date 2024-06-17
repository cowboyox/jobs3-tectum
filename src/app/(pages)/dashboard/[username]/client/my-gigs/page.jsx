'use client'
import React, { useState, useEffect } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import { RiRobot2Line } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { CiReceipt } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import api from '@/utils/api';
import { minutesDifference } from "@/utils/Helpers";

const Status = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 0:
        return 'border-green-500 text-green-500';
      case 'declined':
        return 'border-red-500 text-red-500';
      default:
        return 'border-gray-500 text-gray-500';
    }
  };

  const getStatusContent = () => {
    switch (status) {
      case 0: return 'Alive';
      case 1: return 'Hired';
      case 2: return "Ended"
    }
  }

  return (
    <div className={`border text-sm rounded py-1 px-2 capitalize ${getStatusStyles()}`}>
      {getStatusContent(status)}
    </div>
  );
};
const GigCard = ({ gig }) => {
  return (
    <div className="flex p-7 justify-between rounded-xl bg-[#10191d] mb-4 mobile:flex-col-reverse mobile:gap-3 mobile:p-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-white text-xl">
          {gig.gigTitle}
        </h2>
        <div className="flex items-center gap-5 mt-2 text-gray-400">
          <div className="flex items-center gap-2">
            <CiClock2 size={24} />
            <span className="text-base">{minutesDifference(gig.gigPostDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <CiReceipt size={28} />
            <span className="text-base">${gig.totalPrice}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-start mobile:justify-between">
        <Status status={gig.gigStatus} />
        <BsThreeDots className="h-8 w-8 p-2 flex items-center justify-center rounded-full hover:bg-slate-700 transition cursor-pointer" />
      </div>
    </div>
  );
};

const MyGigs = () => {
  const [myGigs, setMyGigs] = useState([]);
  useEffect(() => {
    api.get(`/api/v1/client_gig/get-gig-by-userId`).then(data => {
      console.log("------- ", data.data.data);
      setMyGigs(data.data.data)
    })
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-stretch gap-5 mobile:flex-col">
        <div className="flex gap-2 p-1 flex-grow mobile:p-1 bg-[#10191d] rounded-xl">
          <Select defaultValue='normal'>
            <SelectTrigger className='bg-[#1B272C] md:h-14 w-20 mobile:w-14 mobile:p-2 rounded-xl' >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='bg-[#1B272C] rounded-xl'>
              <SelectGroup>
                <SelectItem value="normal">
                  <CiSearch size={20} className='mobile:max-w-4' />
                </SelectItem>
                <SelectItem value="ai">
                  <RiRobot2Line size={20} className='mobile:max-w-4' />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            className='w-full bg-transparent text-white outline-none mobile:text-sm'
            placeholder='Search by job title, company, keywords'
          />
          <div className="px-3 flex items-center gap-3 cursor-pointer hover:bg-[#1B272C] rounded-xl transition mobile:p-1">
            <CiFilter fill="#96B0BD" size={20} className='mobile:max-w-4' />
            <span className='text-[#96B0BD] mobile:text-sm'>
              Filter
            </span>
            <span className='bg-[#DC4F13] w-5 h-5 text-sm flex items-center justify-center rounded-full mobile:text-sm mobile:w-4 mobile:h-4'>
              4
            </span>
          </div>
        </div>
        <Link href="./portfolio/create" className="p-1 rounded-xl cursor-pointer text-base transition bg-[#DC4F13] hover:bg-white hover:text-black mobile:w-full mobile:text-center flex items-center w-40 text-center justify-center mobile:py-2">
          Post a New Gig
        </Link>
      </div>
      <div className="flex flex-col">
        {myGigs.length ? myGigs.map((gig, index) => (
          <GigCard key={index} gig={gig} />
        )) : 
        <div className='text-center mt-[10vh]'>Not yet</div>
        }
      </div>
      <div className="py-5 md:text-xl hover:bg-white transition hover:text-black px-10 w-full max-w-full rounded-xl mobile:px-5 border border-[#aaaaaaaa] text-center mx-auto cursor-pointer">Load more +</div>
    </div>
  )
}

export default MyGigs