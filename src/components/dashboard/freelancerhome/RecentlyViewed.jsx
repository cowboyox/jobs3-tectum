'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';

const recentViewed = [
  // {
  //   title: "Figma and Flow Bite Mentor Needed",
  //   location: "Remote",
  //   price: "$360",
  // },
  // {
  //   title: "Figma and Flow Bite Mentor Needed",
  //   location: "Remote",
  //   price: "$400",
  // },
  // {
  //   title: "Figma and Flow Bite Mentor Needed",
  //   location: "Remote",
  //   price: "$450",
  // },
];

const RecentlyViewed = () => {
  useEffect(() => {
    const fetchRecentViewGigs = async () => {
      try {
      } catch (err) {
        console.error('Err fetching Gigs', err);
      }
    };

    fetchRecentViewGigs();
  }, []);
  return (
    <div className='mt-10 flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold'>Recently Viewed</h1>
        <p className='cursor-pointer'>Show more</p>
      </div>
      <div className='mt-2 grid gap-4 lg:grid-cols-3'>
        {recentViewed.length ? (
          recentViewed.map((spend, index) => (
            <div
              className='flex flex-col items-center gap-1 rounded-2xl bg-darkGray px-4 py-8'
              key={index}
            >
              <div className='flex flex-col gap-4'>
                <div className=''>
                  <Image height={45} src={'/assets/icons/ActiveOrder.png'} width={45} />
                  <h3 className='mt-4 text-xl font-[500] text-white'>{spend.title}</h3>
                </div>
                <div className='flex items-center justify-between gap-4'>
                  <p className='text-lg font-[400] text-medGray'>{spend.price}</p>
                  <div className='flex items-center gap-1 rounded-[6px] border-2 border-white px-3 text-white'>
                    <p className='p-[1px]'>{spend.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='mt-[10%] text-center'>Not yet</div>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewed;

// const recentlyViewed = [
//   {
//     pic: "/assets/dashboard-media/profilePic.png",
//     name: "Deven Miles",
//     locatin: "Yogyakarta, Indonesia",
//     skills: ["UI/UX", "Design", "Webdesign"],
//     rated: "Top Rated",
//     jobSuccess: "96% Job Success",
//   },
//   {
//     pic: "/assets/dashboard-media/profilePic.png",
//     name: "Deven Miles",
//     locatin: "Yogyakarta, Indonesia",
//     skills: ["UI/UX", "Design", "Webdesign"],
//     rated: "Top Rated",
//     jobSuccess: "96% Job Success",
//   },
//   {
//     pic: "/assets/dashboard-media/profilePic.png",
//     name: "Deven Miles",
//     locatin: "Yogyakarta, Indonesia",
//     skills: ["UI/UX", "Design", "Webdesign"],
//     rated: "Top Rated",
//     jobSuccess: "96% Job Success",
//   },
// ];
