'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { GiLaurelCrown } from 'react-icons/gi';
import { MdVerified } from 'react-icons/md';
import { RiPoliceBadgeLine } from 'react-icons/ri';

import { useCustomContext } from '@/context/use-custom';
import { getAllCLRecentViews } from '@/utils/http';

const RecentlyViewed = ({ search }) => {
  const [data, setData] = useState([]);
  const auth = useCustomContext();

  useEffect(() => {
    const fetchRecentViewGigs = async () => {
      if (auth?.currentProfile?._id) {
        try {
          const { data } = await getAllCLRecentViews(auth.currentProfile._id);

          setData(data);
        } catch (err) {
          console.error('Err fetching Gigs', err);
        }
      }
    };

    fetchRecentViewGigs();
  }, [auth?.currentProfile]);

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold'>Recently Viewed</h1>
        {/* <p className='cursor-pointer'>Show more</p> */}
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        {data ? (
          data.gigId?.map((recent, index) => (
            <div className='flex flex-col gap-4 rounded-2xl bg-deepGreen p-5' key={index}>
              <div className='flex flex-col gap-4 border-b border-lightGray pb-4 text-white'>
                <div className='flex gap-2'>
                  <div className='flex items-center gap-2'>
                    <RiPoliceBadgeLine className='text-[#158FE8]' />
                    <span>Top Rated</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <GiLaurelCrown className='text-[#34E250]' />
                    <span>0% Job Success</span>
                  </div>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {recent?.searchKeywords?.map((skill, index) => (
                    <div
                      className='rounded-full border border-lightGray bg-darkGray px-2 py-1 text-center'
                      key={index}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-1 items-center gap-4'>
                <div className='flex w-10 items-center justify-center'>
                  <div className='flex h-10 w-[100%] items-center justify-center border-none outline-none'>
                    <Image
                      alt='pic'
                      className='h-full w-full object-contain'
                      height={1000}
                      src={recent.creator.avatarURL || '/assets/dashboard-media/profilePic.png'}
                      width={1000}
                    />
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='truncate text-lg text-white'>{recent?.creator?.fullName}</h3>
                    {recent?.creator?.userId?.verified && <MdVerified className='text-[#0A75C2]' />}
                  </div>
                  <div className='flex items-center gap-1 text-medGray'>
                    <p className='text-medGray'>{recent?.creator?.location}</p>
                  </div>
                </div>
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

// const recentlyViewed = [
//   {
//     jobSuccess: '96% Job Success',
//     locatin: 'Yogyakarta, Indonesia',
//     name: 'Deven Miles',
//     pic: '/assets/dashboard-media/profilePic.png',
//     rated: 'Top Rated',
//     skills: ['UI/UX', 'Design', 'Webdesign'],
//   },
//   {
//     jobSuccess: '96% Job Success',
//     locatin: 'Yogyakarta, Indonesia',
//     name: 'Deven Miles',
//     pic: '/assets/dashboard-media/profilePic.png',
//     rated: 'Top Rated',
//     skills: ['UI/UX', 'Design', 'Webdesign'],
//   },
//   {
//     jobSuccess: '96% Job Success',
//     locatin: 'Yogyakarta, Indonesia',
//     name: 'Deven Miles',
//     pic: '/assets/dashboard-media/profilePic.png',
//     rated: 'Top Rated',
//     skills: ['UI/UX', 'Design', 'Webdesign'],
//   },
// ];
