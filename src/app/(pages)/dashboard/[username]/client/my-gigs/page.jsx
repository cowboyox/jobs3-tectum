'use client';
import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { CiSearch, CiFilter, CiReceipt, CiClock2 } from 'react-icons/ci';
import { RiRobot2Line } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'; // Icons for edit and delete
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    console.log('Edit clicked');
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    setIsDropdownOpen(false);
  };

  return (
    <div className='mb-4 flex justify-between rounded-xl bg-[#10191d] p-7 mobile:flex-col-reverse mobile:gap-3 mobile:p-3'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl text-white'>{gig.gigTitle}</h2>
        <div className='mt-2 flex items-center gap-5 text-gray-400'>
          <div className='flex items-center gap-2'>
            <CiClock2 size={24} />
            <span className='text-base'>{minutesDifference(gig.gigPostDate)}</span>
          </div>
          <div className='flex items-center gap-2'>
            <CiReceipt size={28} />
            <span className='text-base'>${gig.totalPrice}</span>
          </div>
        </div>
      </div>
      <div className='relative flex items-start gap-3 mobile:justify-between'>
        <Status status={gig.gigStatus} />
        <div className='relative'>
          <button
            onClick={handleDropdownToggle}
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 transition hover:bg-slate-700'
          >
            <BsThreeDots />
          </button>
          {isDropdownOpen && (
            <div className='absolute right-0 z-10 mt-2 w-40 rounded-[6px] bg-[#1B272C] shadow-lg'>
              <Link href={`./edit-gig/${gig._id}`}>
                <button className='flex w-full items-center gap-2 px-4 py-2 text-left text-white transition hover:bg-gray-700'>
                  <HiOutlinePencilAlt size={20} />
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className='flex w-full items-center gap-2 px-4 py-2 text-left text-white transition hover:bg-gray-700'
              >
                <HiOutlineTrash size={20} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MyGigs = () => {
  const [myGigs, setMyGigs] = useState([]);
  useEffect(() => {
    api.get(`/api/v1/client_gig/get-gig-by-userId`).then((data) => {
      console.log('------- ', data.data.data);
      setMyGigs(data.data.data);
    });
  }, []);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex w-full items-stretch gap-5 mobile:flex-col'>
        <div className='flex flex-grow gap-2 rounded-xl bg-[#10191d] p-1 mobile:p-1'>
          <Select defaultValue='normal'>
            <SelectTrigger className='w-20 rounded-xl bg-[#1B272C] md:h-14 mobile:w-14 mobile:p-2'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='rounded-xl bg-[#1B272C]'>
              <SelectGroup>
                <SelectItem value='normal'>
                  <CiSearch size={20} className='mobile:max-w-4' />
                </SelectItem>
                <SelectItem value='ai'>
                  <RiRobot2Line size={20} className='mobile:max-w-4' />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            className='w-full bg-transparent text-white outline-none mobile:text-sm'
            placeholder='Search by job title, company, keywords'
          />
          <div className='flex cursor-pointer items-center gap-3 rounded-xl px-3 transition hover:bg-[#1B272C] mobile:p-1'>
            <CiFilter fill='#96B0BD' size={20} className='mobile:max-w-4' />
            <span className='text-[#96B0BD] mobile:text-sm'>Filter</span>
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#DC4F13] text-sm mobile:h-4 mobile:w-4 mobile:text-sm'>
              4
            </span>
          </div>
        </div>
        <Link
          href='./post-gig'
          className='flex w-40 cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-1 text-center text-base transition hover:bg-white hover:text-black mobile:w-full mobile:py-2 mobile:text-center'
        >
          Post a New Gig
        </Link>
      </div>
      <div className='flex flex-col'>
        {myGigs.length ? (
          myGigs.map((gig, index) => <GigCard key={index} gig={gig} />)
        ) : (
          <div className='mt-[10vh] text-center'>Not yet</div>
        )}
      </div>
      <div className='mx-auto w-full max-w-full cursor-pointer rounded-xl border border-[#aaaaaaaa] px-10 py-5 text-center transition hover:bg-white hover:text-black md:text-xl mobile:px-5'>
        Load more +
      </div>
    </div>
  );
};

export default MyGigs;
