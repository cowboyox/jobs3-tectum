'use client';
import Image from 'next/image';
import React from 'react';

import { useCustomContext } from '@/context/use-custom';
import { useGetAllFLRecentViews } from '@/hooks/useGetAllFLRecentViews';
import { getLocationType } from '@/utils/gigInfo';

const RecentlyViewed = () => {
  const auth = useCustomContext();
  const { data } = useGetAllFLRecentViews(auth?.currentProfile?._id);

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold'>Recently Viewed</h1>

        {/* <p className='cursor-pointer'>Show more</p> */}
      </div>

      <div className='mt-2 grid gap-4 lg:grid-cols-2'>
        {data?.gigId?.length ? (
          data.gigId.map((gig, index) => (
            <div
              className='flex items-start justify-between gap-1 rounded-2xl bg-deepGreen p-8'
              key={index}
            >
              <div className='flex flex-col gap-4'>
                <div className=''>
                  <Image
                    alt='active order'
                    height={45}
                    src={'/assets/icons/ActiveOrder.png'}
                    width={45}
                  />
                  <h3 className='mt-4 text-xl font-[500] text-white'>{gig?.gigTitle}</h3>
                </div>
                <div className='flex items-center justify-between gap-4'>
                  <p className='text-lg font-[400] text-medGray'>
                    {!gig?.gigPaymentType
                      ? `$${gig?.gigPrice}`
                      : `$${gig?.minBudget} - $${gig?.maxBudget} /hr`}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-1 rounded-[6px] border-2 border-white px-3 text-white'>
                <p className='p-[1px]'>{getLocationType(gig?.gigLocationType)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className='mt-50px flex items-center justify-center text-2xl font-semibold'>
            Not yet
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewed;
