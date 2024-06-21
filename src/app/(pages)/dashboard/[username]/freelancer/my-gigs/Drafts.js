import React from 'react';
import { Separator } from '@/components/ui/seperator';
import { minutesDifference } from '@/utils/Helpers';

const DraftsView = ({ allGigs }) => {
  return (
    <div className='flex flex-col gap-2'>
      {allGigs.map((gig, index) => (
        <div
          key={index}
          className='bg-[#10191d] p-4 rounded-xl flex gap-4 w-full items-start mobile:flex-col'
        >
          <div className='basis-1/3 mobile:basis-auto h-[250px] mobile:w-full overflow-hidden'>
            <img
              src='/assets/images/portfolio_works/portfolio.jpeg'
              alt='Gig Image'
              className='object-cover w-full h-full rounded-xl '
            />
          </div>
          <div className='basis-2/3 mobile:w-full flex flex-col gap-2 flex-grow'>
            <div className='flex md:flex-row flex-col-reverse justify-between md:items-center mt-1 items-start'>
              <div className='flex-1 text-left md:text-2xl text-[24px]'>{gig.gigTitle}</div>
            </div>
            <div className='flex flex-row gap-6 items-start justify-start'>
              <div className='flex flex-row items-center gap-2'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z'
                    stroke='#96B0BD'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                    stroke='#96B0BD'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
                {minutesDifference(gig.gigPostDate)}
              </div>
              <div className='flex flex-row items-center gap-2'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z'
                    stroke='#96B0BD'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z'
                    stroke='#96B0BD'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M9 13.0098H12'
                    stroke='#96B0BD'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M9 9.00977H12'
                    stroke='#96B0BD'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M5.99609 13H6.00508'
                    stroke='#96B0BD'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M5.99609 9H6.00508'
                    stroke='#96B0BD'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
                $ {gig.gigPrice}
              </div>
            </div>
            <Separator className='my-1' />
            <p className='text-medGray'>{gig.gigDescription}</p>
            <div className='flex gap-3 items-center flex-wrap'>
              {gig.searchKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className='bg-[#28373E] py-1 px-2 text-white rounded-full text-sm flex items-center cursor-pointer w-auto whitespace-nowrap border-[#3E525B] border-1'
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
