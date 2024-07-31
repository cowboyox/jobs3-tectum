'use client';
import Image from 'next/image';
import React from 'react';
import EmptyCard from '@/components/elements/emptyCard';

import { useCustomContext } from '@/context/ContextProvider';
import { useGetAllFLRecentViews } from '@/hooks/useGetAllFLRecentViews';
import { IoLocationOutline } from 'react-icons/io5';
import { getLocationType } from '@/utils/gigInfo';

const RecentlyViewed = () => {
  const auth = useCustomContext();
  const { data } = useGetAllFLRecentViews(auth?.currentProfile?._id);

  function truncateString(str) {
    // Find the first comma's index
    const commaIndex = str.indexOf(',');

    // If a comma is found before 15 characters
    if (commaIndex > 0 && commaIndex < 15) {
      return str.substring(0, commaIndex) + '...';
    } 
    return str;
}

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold'>Recent Applications</h1>

        {/* <p className='cursor-pointer'>Show more</p> */}
      </div>

      {data?.gigId?.length ? (
        <div className='mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {data.gigId.map((gig, index) => (
            <div
              className='flex items-start justify-between gap-1 rounded-2xl bg-deepGreen p-8'
              key={index}
            >
              <div className='flex gap-4'>
                <div className=''>
                  <Image
                    alt='active order'
                    height={45}
                    src={'/assets/icons/ActiveOrder.png'}
                    width={45}
                  />
                </div>
                <div className='flex flex-col justify-start gap-4'>
                  <h3 className='text-xl font-[500] text-white'>{gig?.gigTitle}</h3>
                  <div className='flex gap-2 items-center'>
                    <IoLocationOutline size={20} stroke='#96B0BD' />
                    <p className='text-lg font-[400] text-medGray'>
                      {truncateString(gig.location !== '' ? gig.location : 'Anywhere')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyCard text='No recents, please start browsing and they will appear here' />
      )}
    </div>
  );
};

export default RecentlyViewed;
