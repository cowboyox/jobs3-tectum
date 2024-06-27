import Image from 'next/image';
import React from 'react';
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { MdAccessTime } from 'react-icons/md';

import { minutesDifference } from '@/utils/Helpers';

const Job = ({ gigData }) => {
  return (
    <div className='flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'>
      <div className='flex flex-col gap-3 border-b border-lightGray pb-5'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <Image height={45} src={'/assets/icons/ActiveOrder.png'} width={45} />
            <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
              {gigData.data.data.gigTitle}
            </h3>
          </div>
          <div className='flex items-center gap-6'>
            <FaRegHeart className='text-xl text-medGray' />
            <IoIosMore className='text-xl text-medGray' />
          </div>
        </div>
        <h3 className='whitespace-nowrap text-xl font-semibold text-white md:hidden'>
          {/* {gig.title} */} Figma and Flow bite mentor needed
        </h3>
        <div className='flex flex-wrap justify-end gap-4'>
          <div className='flex items-center gap-1'>
            <MdAccessTime className='text-xl text-medGray' />
            <span>{minutesDifference(gigData.data.data.gigPostDate)}</span>
          </div>
          <div className='flex items-center gap-1'>
            <svg
              fill='none'
              height='24'
              viewBox='0 0 25 24'
              width='25'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.75 13.4299C14.4731 13.4299 15.87 12.0331 15.87 10.3099C15.87 8.58681 14.4731 7.18994 12.75 7.18994C11.0269 7.18994 9.63 8.58681 9.63 10.3099C9.63 12.0331 11.0269 13.4299 12.75 13.4299Z'
                stroke='#96B0BD'
                stroke-width='1.5'
              />
              <path
                d='M4.37001 8.49C6.34001 -0.169998 19.17 -0.159997 21.13 8.5C22.28 13.58 19.12 17.88 16.35 20.54C14.34 22.48 11.16 22.48 9.14001 20.54C6.38001 17.88 3.22001 13.57 4.37001 8.49Z'
                stroke='#96B0BD'
                stroke-width='1.5'
              />
            </svg>
            <span>{gigData.data.data.location}</span>
          </div>
          <div className='flex items-center gap-2'>
            <FaRegUser className='text-xl text-medGray' />
            <span>{gigData.data.data.proposalUsers.length} Applicants</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg
              fill='none'
              height='24'
              viewBox='0 0 25 24'
              width='25'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.42188 14.3298C9.42188 15.6198 10.4119 16.6598 11.6419 16.6598H14.1519C15.2219 16.6598 16.0919 15.7498 16.0919 14.6298C16.0919 13.4098 15.5619 12.9798 14.7719 12.6998L10.7419 11.2998C9.95187 11.0198 9.42188 10.5898 9.42188 9.36984C9.42188 8.24984 10.2919 7.33984 11.3619 7.33984H13.8719C15.1019 7.33984 16.0919 8.37984 16.0919 9.66984'
                stroke='#96B0BD'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='1.5'
              />
              <path
                d='M12.75 6V18'
                stroke='#96B0BD'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='1.5'
              />
              <path
                d='M12.75 22C18.2728 22 22.75 17.5228 22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22Z'
                stroke='#96B0BD'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='1.5'
              />
            </svg>

            <span>
              {gigData.data.data.gigPaymentType
                ? `Hourly: $${gigData.data.data.minBudget}–$${gigData.data.data.maxBudget}`
                : `Fixed: $${gigData.data.data.gigPrice}`}
            </span>
          </div>
        </div>
      </div>
      <p className='text-sm text-medGray'>
        <pre className='whitespace-pre-wrap font-roboto text-base'>
          {gigData.data.data.gigDescription}
        </pre>
      </p>
      <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>Skills</h3>
      <div className='flex flex-wrap gap-2'>
        {gigData.data.data.requiredSkills.map((skill, skillIndex) => (
          <div
            className='cursor-pointer rounded-full border border-lightGray bg-darkGray px-2 py-1 text-center'
            key={skillIndex}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;
