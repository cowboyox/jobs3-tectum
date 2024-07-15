'use client';

import Image from 'next/image';
import EmptyCard from '@/components/elements/EmptyCard';
import React from 'react';

const ratings = [
  // {
  //   name: "Hannibal Smith",
  //   time: "1 month ago",
  //   description: "But I must explain to you how all this mistaken idea of denouncing pleasure an...",
  //   star: 5,
  //   price: "$360",
  // },
  // {
  //   name: "Hannibal Smith",
  //   time: "1 month ago",
  //   description: "But I must explain to you how all this mistaken idea of denouncing pleasure an...",
  //   star: 5,
  //   price: "$400",
  // },
  // {
  //   name: "Hannibal Smith",
  //   time: "1 month ago",
  //   description: "But I must explain to you how all this mistaken idea of denouncing pleasure an...",
  //   star: 5,
  //   price: "$450",
  // },
];

const Ratings = () => {
  return (
    <div className='mt-10 flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold'>Ratings</h1>
        {/* <p className='cursor-pointer'>Show more</p> */}
      </div>
      <EmptyCard text="Ratings coming soon" />
      {/* <div className='mt-2 grid gap-4 lg:grid-cols-3'>
        {ratings.length ? (
          ratings.map((rating, index) => (
            <div
              className='flex flex-1 flex-col gap-1 rounded-2xl bg-darkGray px-6 py-8'
              key={index}
            >
              <div className='flex flex-1 items-center gap-4'>
                <Image height={45} src={'/assets/icons/Freelancer.png'} width={45} />
                <h3 className='whitespace-nowrap text-xl font-[500] text-white'>{rating.name}</h3>
                <Image
                  className='object-contain'
                  height={16}
                  src={'/assets/icons/artwork.png'}
                  width={22}
                />
              </div>
              <p className='mt-4 text-medGray'>{rating.time}</p>

              <div className='mt-2 flex gap-3'>
                <Image height={16} src={'/assets/icons/Vector.png'} width={16} />
                <Image height={16} src={'/assets/icons/Vector.png'} width={16} />
                <Image height={16} src={'/assets/icons/Vector.png'} width={16} />
                <Image height={16} src={'/assets/icons/Vector.png'} width={16} />
                <Image height={16} src={'/assets/icons/Vector.png'} width={16} />
              </div>
              <p className='mt-4'>{rating.description}</p>
              <div className="flex items-center justify-between gap-4">
                <p className="text-medGray font-[400] text-lg">{rating.time}</p>
                <div className="flex gap-1 items-center text-white border-2 border-white rounded-[6px] px-3">
                  <p className="p-[1px]">{rating.description}</p>
                </div>
              </div> 
            </div>
          ))
        ) : (
          <div className='text-center'>Not yet</div>
        )}
      </div> */}
    </div>
  );
};

export default Ratings;
