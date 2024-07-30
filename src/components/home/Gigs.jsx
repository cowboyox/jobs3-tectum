'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaX } from 'react-icons/fa6';

import { Separator } from '@/components/ui/seperator';

import { skillSets } from '@/utils/constants';

const Gigs = ({
  freelancers,
  selectedGigs,
  setSelectedGigs,
  page,
  setPage,
  handleLoadMore,
  allFreelancers,
  canLoadMore,
  setCanLoadMore,
  loading,
}) => {
  console.log('freelancers', freelancers);

  const handleGigClick = (gig) => {
    setSelectedGigs((prev) => {
      if (prev.includes(gig)) {
        return prev.filter((item) => item !== gig);
      } else {
        return [...prev, gig];
      }
    });
    setPage(1);
    setCanLoadMore(true);
  };

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>Sort Freelancers</h1>
      <div className='flex flex-wrap items-center gap-2'>
        {skillSets.map((gig, index) => (
          <div
            className={`${
              selectedGigs.includes(gig) ? 'bg-orange' : 'bg-darkGray'
            } cursor-pointer rounded-full border border-lightGray px-2 py-1 text-center`}
            key={index}
            onClick={() => handleGigClick(gig)}
          >
            {gig}
          </div>
        ))}
      </div>
      {loading && (
        <div className='z-1 flex h-screen justify-center space-x-2 pt-6'>
          <div className='flex h-fit items-baseline text-[20px]'>
            <p className='mr-3'>The neural network is thinking</p>
            <div className='flex gap-1'>
              <div className='h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]' />
              <div className='h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]' />
              <div className='h-2 w-2 animate-bounce rounded-full bg-white' />
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col gap-2'>
        {!loading &&
          allFreelancers &&
          allFreelancers.map((freelancer, index) => {
            return (
              <div key={`freelancers_ext_${index}`}>
                <div
                  className={`mt-4 ${freelancer?.reason ? 'rounded-t-xl' : 'rounded-xl'} bg-[#10191D] p-5 text-center`}
                  key={`freelancers_${index}`}
                >
                  <div className='mt-1 flex flex-col-reverse items-start justify-between md:flex-row md:items-center'>
                    <Link href={`/dashboard/freelancer/profile/${freelancer._id}`}>
                      <div className='mt-3 flex-1 text-left text-[20px] hover:underline md:mt-0 md:text-2xl'>
                        {freelancer.freelancerBio}
                      </div>
                    </Link>
                  </div>
                  <div className='mt-3 flex flex-col items-start justify-between gap-6 md:flex-row md:justify-start'>
                    <div className='flex flex-row items-center gap-2'>
                      <svg
                        fill='none'
                        height='24'
                        viewBox='0 0 24 24'
                        width='24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M11.9999 13.4304C13.723 13.4304 15.1199 12.0336 15.1199 10.3104C15.1199 8.5873 13.723 7.19043 11.9999 7.19043C10.2768 7.19043 8.87988 8.5873 8.87988 10.3104C8.87988 12.0336 10.2768 13.4304 11.9999 13.4304Z'
                          stroke='#96B0BD'
                          strokeWidth='1.5'
                        />
                        <path
                          d='M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z'
                          stroke='#96B0BD'
                          strokeWidth='1.5'
                        />
                      </svg>
                      {freelancer.location}
                    </div>
                    <div className='flex flex-row items-center gap-6'>
                      {freelancer.badge && (
                        <div className='flex flex-row gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M21.75 7.74097V16.259C21.75 17.0665 21.3174 17.812 20.6163 18.2126L13.1163 22.4983C12.4246 22.8936 11.5754 22.8936 10.8837 22.4983L3.38369 18.2126C2.68264 17.812 2.25 17.0665 2.25 16.259V7.74097C2.25 6.93354 2.68264 6.18802 3.38369 5.78742L10.8837 1.50171C11.5754 1.10644 12.4246 1.10644 13.1163 1.50171L20.6163 5.78742C21.3174 6.18802 21.75 6.93354 21.75 7.74097Z'
                              stroke='#158FE8'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M12.7298 8.57767L13.4396 9.99715C13.5363 10.1947 13.7944 10.3843 14.0122 10.4206L15.2986 10.6343C16.1212 10.7714 16.3148 11.3682 15.722 11.957L14.7219 12.9571C14.5526 13.1265 14.4598 13.4531 14.5122 13.687L14.7985 14.925C15.0244 15.9049 14.5042 16.284 13.6372 15.7718L12.4314 15.0581C12.2136 14.929 11.8547 14.929 11.633 15.0581L10.4272 15.7718C9.56422 16.284 9.03998 15.9009 9.26581 14.925L9.55212 13.687C9.60455 13.4531 9.5118 13.1265 9.34243 12.9571L8.34234 11.957C7.75358 11.3682 7.94311 10.7714 8.76577 10.6343L10.0522 10.4206C10.2659 10.3843 10.524 10.1947 10.6208 9.99715L11.3305 8.57767C11.7176 7.80744 12.3467 7.80744 12.7298 8.57767Z'
                              stroke='#158FE8'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          {freelancer.badge}
                        </div>
                      )}
                      {freelancer.jobSuccessScore[freelancer.jobSuccessScore.length-1].score !== undefined && (
                        <div className='flex flex-row gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 22 24'
                            width='22'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M16.0302 3.30132L16.205 3.40009C19.3056 5.15263 21.2228 8.43855 21.2228 12.0002C21.2228 15.5619 19.3056 18.8478 16.205 20.6003L16.0302 20.6991C12.9088 22.4634 9.09121 22.4634 5.96978 20.6991L5.58737 21.3757L5.96978 20.6991L5.79504 20.6003C2.69439 18.8478 0.777174 15.5619 0.777174 12.0002C0.777174 8.43855 2.69439 5.15263 5.79505 3.40009L5.96979 3.30132C9.09121 1.53704 12.9088 1.53704 16.0302 3.30132Z'
                              stroke='#34E250'
                              strokeWidth='1.55435'
                            />
                            <path
                              d='M12.7318 14.9084H8.37999C8.18555 14.9084 7.96796 14.7709 7.90314 14.6042L5.98647 9.77923C5.71333 9.08757 6.03277 8.87507 6.69018 9.30007L8.49573 10.4626C8.79666 10.6501 9.13925 10.5542 9.26888 10.2501L10.0837 8.2959C10.343 7.6709 10.7735 7.6709 11.0328 8.2959L11.8476 10.2501C11.9772 10.5542 12.3198 10.6501 12.6161 10.4626L14.3105 9.37507C15.0328 8.9084 15.38 9.1459 15.0837 9.90007L13.2133 14.6126C13.1439 14.7709 12.9263 14.9084 12.7318 14.9084Z'
                              stroke='#34E250'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='0.625'
                            />
                            <path
                              d='M8.00879 16.1665H13.1014'
                              stroke='#34E250'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='0.625'
                            />
                            <path
                              d='M9.39844 12.8335H11.7133'
                              stroke='#34E250'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='0.625'
                            />
                          </svg>
                          {freelancer.jobSuccessScore[freelancer.jobSuccessScore.length - 1].score}% Job Success
                        </div>
                      )}
                    </div>
                  </div>
                  <Separator className='my-4' />
                  <div className='text-left text-[#96B0BD]'>{freelancer.freelancerBio}</div>
                  <div className='mt-4 flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
                    {freelancer.skills &&
                      freelancer.skills.map((item, index) => {
                        return (
                          <span
                            className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                            key={`skills_${index}`}
                          >
                            <FaX className='rounded-full bg-[#3E525B] p-[2px]' />
                            {item}
                          </span>
                        );
                      })}
                  </div>
                  <div className='mt-3 flex flex-col items-start justify-between md:flex-row md:items-center'>
                    <div className='flex flex-1 flex-row items-center gap-3 text-left'>
                      <div>
                        <img
                          className='aspect-square rounded-full object-cover'
                          height={40}
                          src={
                            freelancer.avatarURL
                              ? freelancer.avatarURL
                              : '/assets/images/Rectangle 273.png'
                          }
                          width={40}
                        />
                      </div>
                      <div className='flex flex-col gap-1 text-left'>
                        <div className='flex flex-row items-center gap-1 font-bold'>
                          {freelancer.fullName}
                          <svg
                            fill='none'
                            height='17'
                            viewBox='0 0 17 17'
                            width='17'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M14.1422 6.03555C14.1585 5.9123 14.167 5.78905 14.167 5.6665C14.167 3.98138 12.649 2.62917 10.9646 2.85796C10.4737 1.98459 9.53874 1.4165 8.50033 1.4165C7.46191 1.4165 6.52691 1.98459 6.03603 2.85796C4.34808 2.62917 2.83366 3.98138 2.83366 5.6665C2.83366 5.78905 2.84216 5.9123 2.85845 6.03555C1.98508 6.52713 1.41699 7.46213 1.41699 8.49984C1.41699 9.53755 1.98508 10.4725 2.85845 10.9641C2.84211 11.0865 2.83383 11.2097 2.83366 11.3332C2.83366 13.0183 4.34808 14.367 6.03603 14.1417C6.52691 15.0151 7.46191 15.5832 8.50033 15.5832C9.53874 15.5832 10.4737 15.0151 10.9646 14.1417C12.649 14.367 14.167 13.0183 14.167 11.3332C14.167 11.2106 14.1585 11.0874 14.1422 10.9641C15.0156 10.4725 15.5837 9.53755 15.5837 8.49984C15.5837 7.46213 15.0156 6.52713 14.1422 6.03555ZM7.76012 11.6278L5.16266 8.99709L6.17133 8.00259L7.77003 9.62184L10.835 6.58025L11.8323 7.58609L7.76012 11.6278Z'
                              fill='#0A75C2'
                            />
                          </svg>
                        </div>
                        <div className='text-left text-[14px] text-[#516170]'>Freelancer</div>
                      </div>
                    </div>
                    <div className='mt-2 flex-1 rounded-xl bg-[#1B272C] p-1 md:mt-0 md:flex-none'>
                      <button className='p-4 px-8 md:p-5'>Message</button>
                      <button className='bg-[#DC4F13] p-4 px-8 md:p-5'>Invite to Gig</button>
                    </div>
                  </div>
                </div>
                {freelancer.reason && (
                  <div className='text-md rounded-b-xl bg-orange p-4 text-white'>
                    {freelancer.reason}
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {/* {displayedData?.length < data?.length && ( */}
      {canLoadMore && (
        <div
          className='cursor-pointer rounded-2xl border border-lightGray py-3 text-center'
          onClick={handleLoadMore}
        >
          Load More +
        </div>
      )}
      {/* )} */}
    </div>
  );
};

export default Gigs;
