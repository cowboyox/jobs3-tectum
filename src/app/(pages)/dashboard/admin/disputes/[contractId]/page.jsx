'use client';
import Link from 'next/link';
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { CiClock2, CiFilter, CiReceipt, CiSearch } from 'react-icons/ci';
import { RiRobot2Line } from 'react-icons/ri';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import api from '@/utils/api';
import { minutesDifference } from '@/utils/Helpers';

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
      case 0:
        return 'Alive';
      case 1:
        return 'Hired';
      case 2:
        return 'Ended';
    }
  };

  return (
    <div className={`rounded border px-2 py-1 text-sm capitalize ${getStatusStyles()}`}>
      {getStatusContent(status)}
    </div>
  );
};
const GigCard = ({ gig }) => {
  return (
    <div className='bg-[#10191d] py-7 mobile:flex-col-reverse mobile:gap-3 mobile:py-3 border-t-2 cursor-pointer'>
      <div className='flex items-center justify-between gap-1'>
        <div>
          <h3 className='text-lg text-white mb-2'>Dispute Case For Contract Id#</h3>
          <p className='text-slate-500'>#23532523532</p>
        </div>
        <div>
          <h3 className='text-lg text-white mb-2'>Date</h3>
          <p className='text-slate-500'>6/22, 2024</p>
        </div>
        <div>
          <h3 className='text-lg text-white mb-2'>Amount</h3>
          <p className='text-slate-500'>$780</p>
        </div>
      </div>
    </div>
  );
};

const DisputeDetail = () => {
  const params = useParams();

  const [myGigs, setMyGigs] = useState([]);
  useEffect(() => {
    api.get(`/api/v1/client_gig/get-gig-by-userId`).then((data) => {
      setMyGigs(data.data.data);
    });
  }, []);

  return (
    <div className='flex justify-between gap-2'>
      <div className='mb-4 rounded-xl bg-[#10191d] p-7 mobile:gap-3 mobile:p-3 w-[60%]'>
        <div className='flex mb-5'>
          <h1 className='text-xl text-white'>Dispute Detail</h1>
        </div>
        <div className='bg-[#10191d] py-7 mb-5 mobile:flex-col-reverse mobile:gap-3 mobile:py-3 border-t-2'>
          <div className='flex items-center justify-between gap-1'>
            <div>
              <h3 className='text-lg text-slate-500 mb-2'>Git Title</h3>
              <p className='text-white'>Rust developer</p>
            </div>
            <div>
              <h3 className='text-lg text-slate-500 mb-2'>Buuer username</h3>
              <p className='text-white'>Devon Miles</p>
            </div>
            <div>
              <h3 className='text-lg text-slate-500 mb-2'>Seller username</h3>
              <p className='text-white'>Devon Miles</p>
            </div>
          </div>
        </div>
        <div className='bg-[#10191d] pt-7 mobile:flex-col-reverse mobile:gap-3 mobile:pt-3 border-t-2'>
          <div className='flex flex-col mb-5'>
            <h1 className='text-xl text-white mb-5'>Buyer Explanation</h1>
            <textarea className='rounded-xl bg-[#10191d] border-2 p-4' placeholder='Write your request details...' rows={4}/>
          </div>
          <div className='flex flex-col'>
            <h1 className='text-xl text-white mb-5'>Seller Explanation</h1>
            <textarea className='rounded-xl bg-[#10191d] border-2 p-4' placeholder='Write your request details...' rows={4} />
          </div>
        </div>
      </div>
      <div className='mb-4 rounded-xl bg-[#10191d] p-7 mobile:gap-3 mobile:p-3 w-[40%]'>
        <div className='mb-5'>
          <h3 className='text-lg text-slate-500 mb-2'>Buyer dispute fee</h3>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Buyer percentage</h3>
              <p className='text-white'>100%</p>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Admin percentage</h3>
              <p className='text-white'>0%</p>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <h3 className='text-lg text-slate-500 mb-2'>Seller dispute fee</h3>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Seller percentage</h3>
              <p className='text-white'>50%</p>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Admin percentage</h3>
              <p className='text-white'>50%</p>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <h3 className='text-lg text-slate-500 mb-2'>Payment</h3>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Buyer percentage</h3>
              <p className='text-white'>100%</p>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-white'>Seller percentage</h3>
              <p className='text-white'>0%</p>
            </div>
          </div>
        </div>
        <div className='w-full mb-5'>
          <select className='w-full rounded-xl bg-[#10191d] p-2'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className='w-full'>
          <button className='w-full bg-orange-600 text-white rounded-xl'>Excute Decision</button>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetail;
