'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { IoWarningOutline } from 'react-icons/io5';

const Page = () => {
  return (
    <div className='flex items-center flex-col justify-center md:px-0 h-screen bg-cover bg-center bg-deepGreen'>
      <img src='/assets/images/404.png' className='w-[500px]' />
      <div className='cursor-pointer bg-[#FF3737] flex items-center justify-evenly w-[115px] h-[25px] rounded-[5px] transition mt-14'>
        <IoWarningOutline className='text-lg font-bold' />
        <p className='text-[14px]'>404 Error</p>
      </div>
      <p className='text-[24px] text-center mt-4'>
        Oops! Page not Found
      </p>
      <p className="text-medGray mt-4">Sorry, the page you are looking for doesn’t exist or has been removed. Keep exploring out site</p>
    </div>
  );
};

export default Page;
