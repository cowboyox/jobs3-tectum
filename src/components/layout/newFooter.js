import React from 'react';
import Link from 'next/link';

import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { PiTelegramLogoLight } from "react-icons/pi";

const NewFooter = () => {
  return (
      <div className='py-10 px-4 mobile:px-0 border-t border-[#28373E] bg-gradient-to-b from-transparent to-[#10191D]'>
        <div className='w-full max-w-7xl flex flex-col gap-8 mx-auto'>
          <div className='flex items-center gap-3 mobile:justify-center'>
            <span className='text-white text-lg font-semibold'>Follow Us</span>
            <div className='flex gap-5'>
              <div className="h-9 w-9 border border-[#28373E] hover:bg-white transition rounded-full flex items-center justify-center cursor-pointer group">
                <FaInstagram className='w-5 h-5 group-hover:fill-black transition' fill="#F5F5F5" />
              </div>
              <div className="h-9 w-9 border border-[#28373E] hover:bg-white transition rounded-full flex items-center justify-center cursor-pointer group">
                <RiTwitterXLine className='w-5 h-5 group-hover:fill-black transition' fill="#F5F5F5" />
              </div>
              <div className="h-9 w-9 border border-[#28373E] hover:bg-white transition rounded-full flex items-center justify-center cursor-pointer group">
                <PiTelegramLogoLight className='w-5 h-5 group-hover:fill-black transition' fill="#F5F5F5" />
              </div>
            </div>
          </div> 
          <div className='border-t border-[#28373E]' />
          <div className='flex justify-between gap-2 mobile:gap-3 mobile:flex-col-reverse'>
            <p className='text-[#6A828D] mobile:text-center mobile:font-bold'>
              © 2022-2024 JOBS3  / All rights reserved
            </p>
            <div className='flex gap-2 mobile:flex-col'>
              <Link href="/terms" className='text-[#6A828D] hover:text-white mobile:text-center mobile:font-bold'>
                Terms of Service
              </Link>
              <Link href="/privacy" className='text-[#6A828D] hover:text-white mobile:text-center mobile:font-bold'>
                Privacy Policy
              </Link>
              <Link href="/trust-safety" className='text-[#6A828D] hover:text-white mobile:text-center mobile:font-bold'>
                Trust and safety
              </Link>
            </div>
          </div>
        </div>
      </div> 
  )
}

export default NewFooter
