'use client';
/*
 * Selmani: I used client page as i didn't have enough time to organize it more
 * But if you do, please try to separate components that needs use client
 to another page and just remove them from this page so it remains a 
 server page
*/

import React from 'react'
import Image from 'next/image';

/*------ Icons -------*/
import { FaStar, FaClock } from 'react-icons/fa';
import { CiReceipt } from "react-icons/ci";
import { PiShootingStarLight } from "react-icons/pi";
import { BsPatchCheckFill } from "react-icons/bs";

/*----- Custom Components -----*/
import DropFile from "@/components/elements/dropFile";

const GigPreview = () => {
  return (
    <div className="bg-[#10191d] text-white p-7 rounded-xl flex flex-col gap-4 w-full items-center mobile:flex-col">
      <div className="relative w-full max-w-full">
        <img
          src="/assets/images/portfolio_works/portfolio.jpeg"
          alt="Gig Image" 
          className="object-cover w-full rounded-xl aspect-video"
        />
      </div>
      <div className="flex flex-col gap-2 flex-grow w-full">
        <h3 className="text-2xl font-semibold text-[#F5F5F5]">
          Title of the searching Gig can be very long
        </h3>
        <div className="flex items-center gap-5 mt-2 text-gray-400">
          <div className="flex items-center gap-2">
            <FaClock size={24} />
            <span className='text-base'>3 days</span>
          </div>
          <div className="flex items-center gap-2">
            <CiReceipt size={28} />
            <span className='text-base'>$400</span>
          </div>
          <div className="flex items-center gap-2">
            <FaStar fill='#DC4F13' size={18} />
            <p className='text-[14px] flex gap-1 text-[#E0F0F9]'>
              5.5 
              <span className='text-[#96b0be]'>(921)</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PiShootingStarLight className="text-blue-500" size={23} />
            <span className='text-[#96b0be]'>Top Rated</span>
          </div> 
        </div>
        <hr className="my-3 border-[#1B272C]" />
        <div className="flex items-center">
          <Image
            src='/assets/images/users/user-6.png'
            alt="Devon Miles"
            width={50}
            height={50}
            className="rounded-full"
          /> 
          <div className="ml-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-2xl mobile:text-xl">Devon Miles</p>
              <BsPatchCheckFill fill="#0b75c2" />
            </div>
            <p className="text-gray-400 text-base mobile:text-sm">Yogyakarta, Indonesia</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const ApplyGig = () => {
  return (
    <div className='flex'>
      <div className="w-4/6 flex flex-col gap-5">
        <GigPreview /> 
        <div className="bg-[#10191D] rounded-xl p-7">
          <h2>Single order ($20)</h2>
        </div>
        <div className="bg-[#10191D] rounded-xl p-7">
          <p className='text-2xl text-[#F5F5F5]'>
            Documents (up to 2)
          </p>
          <p className='text-base text-[#96B0BD]'>
            Show some the best work you created in a document. Format: PDF
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {Array.from({ length: 2 }, (_, indx) => (
              <DropFile
                key={indx}
                className="h-12"
                placeHolderPlusIconSize={40}
                acceptOnly='other'
                inputName={`gig_document_${indx}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplyGig