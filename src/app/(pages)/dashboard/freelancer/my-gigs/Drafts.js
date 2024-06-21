import React from 'react';

import { Separator } from '@/components/ui/seperator';
import { minutesDifference } from '@/utils/Helpers';

const DraftsView = ({ allGigs }) => {
  return (
    <div className='flex flex-col gap-2'>
      {allGigs.map((gig, index) => (
        <div
          className='flex w-full items-start gap-4 rounded-xl bg-[#10191d] p-4 mobile:flex-col'
          key={index}
        >
          <div className='h-[250px] basis-1/3 overflow-hidden mobile:w-full mobile:basis-auto'>
            <img
              alt='Gig Image'
              className='h-full w-full rounded-xl object-cover'
              src='/assets/images/portfolio_works/portfolio.jpeg'
            />
          </div>
          <div className='flex flex-grow basis-2/3 flex-col gap-2 mobile:w-full'>
            <div className='mt-1 flex flex-col-reverse items-start justify-between md:flex-row md:items-center'>
              <div className='flex-1 text-left text-[24px] md:text-2xl'>{gig.gigTitle}</div>
            </div>
            <div className='flex flex-row items-start justify-start gap-6'>
              <div className='flex flex-row items-center gap-2'>
                <svg
                  fill='none'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                  />
                  <path
                    d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                  />
                </svg>
                {minutesDifference(gig.gigPostDate)}
              </div>
              <div className='flex flex-row items-center gap-2'>
                <svg
                  fill='none'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-miterlimit='10'
                    stroke-width='1.5'
                  />
                  <path
                    d='M9 13.0098H12'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                  />
                  <path
                    d='M9 9.00977H12'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                  />
                  <path
                    d='M5.99609 13H6.00508'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                  />
                  <path
                    d='M5.99609 9H6.00508'
                    stroke='#96B0BD'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                  />
                </svg>
                $ {gig.gigPrice}
              </div>
            </div>
            <Separator className='my-1' />
            <p className='text-medGray'>{gig.gigDescription}</p>
            <div className='flex flex-wrap items-center gap-3'>
              {gig.searchKeywords.map((keyword, index) => (
                <div
                  className='border-1 flex w-auto cursor-pointer items-center whitespace-nowrap rounded-full border-[#3E525B] bg-[#28373E] px-2 py-1 text-sm text-white'
                  key={index}
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DraftsView;
