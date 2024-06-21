'use client';
import { IoWarningOutline } from 'react-icons/io5';

const Page = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-deepGreen bg-cover bg-center md:px-0'>
      <img className='w-[500px]' src='/assets/images/404.png' />
      <div className='mt-14 flex h-[25px] w-[115px] cursor-pointer items-center justify-evenly rounded-[5px] bg-[#FF3737] transition'>
        <IoWarningOutline className='text-lg font-bold' />
        <p className='text-[14px]'>404 Error</p>
      </div>
      <p className='mt-4 text-center text-[24px]'>Oops! Page not Found</p>
      <p className='mt-4 text-medGray'>
        Sorry, the page you are looking for doesn’t exist or has been removed. Keep exploring out
        site
      </p>
    </div>
  );
};

export default Page;
