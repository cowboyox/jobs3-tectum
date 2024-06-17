import React from 'react';
import { minutesDifference } from '@/utils/Helpers';
import { MdAccessTime } from 'react-icons/md';
import { FaStar } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import api from '@/utils/api';
const Page = async ({ params }) => {
  const gigData = await getGigById(params.gigId);

  return (
    <div
      className='flex gap-8 md:flex-row flex-col items-center md:justify-center md:items-start
     '
    >
      <div className='w-full md:w-[65%] md:max-w-[690px]'>
        <div className='bg-deepGreen px-6 py-6 flex flex-col gap-4 text-white rounded-2xl'>
          <div className='pb-5 border-b border-lightGray flex flex-col gap-4'>
            <img
              src='/assets/images/portfolio_works/portfolio.jpeg'
              alt='Gig Image'
              className='object-cover w-full rounded-xl aspect-video'
            />
            <div className='flex items-center'>
              <h3 className='text-white hidden md:block text-xl font-semibold whitespace-nowrap'>
                {gigData.data.data.gigTitle}
              </h3>
            </div>
            <div className='flex gap-4 flex-wrap justify-start'>
              <div className='flex gap-1 items-center'>
                <MdAccessTime className='text-medGray text-2xl' />
                <span>{minutesDifference(gigData.data.data.gigPostDate)}</span>
              </div>
              <div className='flex gap-2 items-center'>
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
                <span>$400</span>
              </div>
              <div className='flex gap-2 items-center'>
                <FaStar className='text-2xl text-orange' />
                <span>
                  5.5 <span className='text-medGray'>(921)</span>
                </span>
              </div>
              <div className='flex gap-2 items-center'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M20.125 8.45081V15.5492C20.125 16.2221 19.7645 16.8433 19.1803 17.1771L12.9303 20.7486C12.3538 21.078 11.6462 21.078 11.0697 20.7486L4.81974 17.1771C4.23554 16.8433 3.875 16.222 3.875 15.5492V8.45081C3.875 7.77795 4.23554 7.15668 4.81974 6.82285L11.0697 3.25142C11.6462 2.92203 12.3538 2.92203 12.9303 3.25142L19.1803 6.82285C19.7645 7.15668 20.125 7.77795 20.125 8.45081Z'
                    stroke='#158FE8'
                    stroke-width='1.25'
                  />
                  <path
                    d='M12.5685 8.43475L13.3078 9.91337C13.4086 10.1192 13.6775 10.3166 13.9043 10.3544L15.2443 10.5771C16.1012 10.7199 16.3029 11.3416 15.6854 11.9549L14.6436 12.9966C14.4672 13.1731 14.3706 13.5133 14.4252 13.757L14.7234 15.0465C14.9587 16.0673 14.4168 16.4622 13.5136 15.9287L12.2577 15.1852C12.0308 15.0507 11.657 15.0507 11.4259 15.1852L10.1699 15.9287C9.271 16.4622 8.72492 16.0631 8.96015 15.0465L9.2584 13.757C9.31301 13.5133 9.21639 13.1731 9.03996 12.9966L7.99821 11.9549C7.38491 11.3416 7.58234 10.7199 8.43927 10.5771L9.77928 10.3544C10.0019 10.3166 10.2708 10.1192 10.3716 9.91337L11.1109 8.43475C11.5141 7.63243 12.1694 7.63243 12.5685 8.43475Z'
                    stroke='#158FE8'
                    stroke-width='1.25'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
                <span>Top Rated</span>
              </div>
            </div>
          </div>
          <div className='bg-[#10191D] md:rounded-xl rounded-t-xl flex md:gap-4 gap-4 md:items-center items-start'>
            <div className='w-10 md:w-10 md:h-10 relative'>
              <img
                src='/assets/images/users/user-5.png'
                className='rounded-full w-full h-full aspect-square'
              />
              <div className='rounded-full h-2 w-2 absolute right-0.5 bottom-0.5 bg-green-500'></div>
            </div>
            <div className='flex flex-col gap-0'>
              <div className='flex items-center gap-1'>
                <h2 className='text-md md:text-md font-bold'>Devon Miles</h2>
                <img src='/assets/images/icons/checkmark.svg' className='w-4 h-4' />
              </div>
              <div className='flex md:flex-row flex-col gap-2 md:gap-4'>
                <p className='text-md text-medGray'>Yogyakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-deepGreen mt-4  px-6 py-6 flex flex-col gap-4 text-white rounded-2xl'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-white hidden md:block text-xl font-semibold whitespace-nowrap'>
              Single order ($20)
            </h3>
            <p className='text-medGray'>Specify the quantity of services</p>
            <div className='flex gap-1 items-center flex-1 bg-darkGray rounded-2xl'>
              <div className=' flex flex-1 justify-between items-center flex-col md:flex-row px-8 py-8'>
                <div className='flex gap-4 items-center'>
                  <h3 className='text-medGray whitespace-nowrap'>Gig Quantity</h3>
                </div>
                <div className='flex items-center gap-4 justify-between w-full md:w-auto'>
                  <button class='w-10 h-10 bg-orange text-white rounded-full flex items-center justify-center text-lg'>
                    -
                  </button>
                  <p className='text-medGray font-[500] text-xl'>1</p>
                  <button class='w-10 h-10 bg-orange text-white rounded-full flex items-center justify-center text-lg'>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='text-white hidden md:block text-xl font-semibold whitespace-nowrap'>
              Documents (up to 2)
            </h3>
            <p className='text-medGray'>
              Show some the best work you createdin a document. Format: PDF
            </p>
            <div className='grid-cols-2 gap-4 hidden md:grid'>
              <div className='space-y-3 h-full'>
                <div className='h-full'>
                  <label
                    htmlFor='dropzone-file'
                    className={`w-full h-15 bg-[#1a272c] rounded-2xl flex items-center justify-center border border-dashed border-[#526872] cursor-pointer transition hover:bg-[#23343b]`}
                  >
                    <div className='text-center'>
                      <div className='p-2 rounded-md max-w-min mx-auto'>
                        <GoPlus size='2.6em' />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div className='space-y-3 h-full'>
                <div className='h-full'>
                  <label
                    htmlFor='dropzone-file'
                    className={`w-full h-15 bg-[#1a272c] rounded-2xl flex items-center justify-center border border-dashed border-[#526872] cursor-pointer transition hover:bg-[#23343b]`}
                  >
                    <div className='text-center'>
                      <div className='p-2 rounded-md max-w-min mx-auto'>
                        <GoPlus size='2.6em' />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='text-white hidden md:block text-xl font-semibold whitespace-nowrap'>
              Cover letter
            </h3>
            <textarea
              name=''
              id=''
              cols='30'
              rows='7'
              className='border border-medGray bg-deepGreen w-full rounded-xl p-4'
              placeholder='Type here...'
            ></textarea>
          </div>
        </div>
      </div>
      <div className='w-full md:w-[35%] md:max-w-[420px]'>
        <div className='bg-deepGreen px-6 py-6 flex flex-col gap-4 text-white rounded-2xl'>
          <div className='flex flex-col gap-3'>
            <div className='bg-[#1B272C] p-3 rounded-xl flex items-center justify-center gap-2'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10'
                  stroke='#96B0BD'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z'
                  stroke='#96B0BD'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z'
                  stroke='#96B0BD'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              SSL Secure Payment
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <p>Delivery Time</p>
                <p>3 days</p>
              </div>
              <div className='flex justify-between'>
                <p>Refundable Dispute Fee</p>
                <p>$ 0.50</p>
              </div>
              <div className='flex justify-between'>
                <p>Service Fee</p>
                <p>$ 24.1</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-xl font-bold'>Total</p>
                <p className='text-xl font-bold'>$ 240.10</p>
              </div>
            </div>
            <div className='bg-[#1B272C] p-1 rounded-xl flex md:mt-0 mt-2 '>
              <button className='md:p-3 md:px-8 px-8 p-2'>Back</button>
              <button className='bg-[#DC4F13] md:p-3 px-8 p-2 w-full'>Confirm and Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;

const getGigById = async gigId => {
  const resData = await api.get(`/api/v1/freelancer_gig/get_gig_by_id/${gigId}`);
  console.log('-----resData ', resData.data.data);
  return resData;
};
