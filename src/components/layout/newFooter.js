import React from 'react';
import Link from 'next/link';

import { FaInstagram } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import { PiTelegramLogoLight } from 'react-icons/pi';

const NewFooter = () => {
  return (
    <div className='border-t border-[#28373E] bg-gradient-to-b from-transparent to-[#10191D] px-4 py-10 mobile:px-0'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
        <div className='flex items-center gap-3 mobile:justify-center'>
          <span className='text-lg font-semibold text-white'>Follow Us</span>
          <div className='flex gap-5'>
            <div className='group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#28373E] transition hover:bg-white'>
              <FaInstagram className='h-5 w-5 transition group-hover:fill-black' fill='#F5F5F5' />
            </div>
            <div className='group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#28373E] transition hover:bg-white'>
              <RiTwitterXLine
                className='h-5 w-5 transition group-hover:fill-black'
                fill='#F5F5F5'
              />
            </div>
            <div className='group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#28373E] transition hover:bg-white'>
              <PiTelegramLogoLight
                className='h-5 w-5 transition group-hover:fill-black'
                fill='#F5F5F5'
              />
            </div>
          </div>
        </div>
        <div className='border-t border-[#28373E]' />
        <div className='flex justify-between gap-2 mobile:flex-col-reverse mobile:gap-3'>
          <p className='text-[#6A828D] mobile:text-center mobile:font-bold'>
            © 2022-2024 JOBS3 / All rights reserved
          </p>
          <div className='flex gap-2 mobile:flex-col'>
            <Link
              href='/terms'
              className='text-[#6A828D] hover:text-white mobile:text-center mobile:font-bold'
            >
              Terms of Service
            </Link>
            <Link
              href='/privacy'
              className='text-[#6A828D] hover:text-white mobile:text-center mobile:font-bold'
            >
              Privacy Policy
            </Link>
            <Link
              href='/trust-safety'
              className='text-[#6A828D] hover:text-white mobile:text-center mobile:font-bold'
            >
              Trust and safety
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFooter;
