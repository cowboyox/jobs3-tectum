'use client';

import Image from 'next/image';
import React from 'react';
import { BiCopy, BiUserPin } from 'react-icons/bi';
import { BsInstagram } from 'react-icons/bs';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GoArrowRight } from 'react-icons/go';

const Referral = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-4 p-0'>
      <Image
        alt='referral'
        className='w-[120vw] max-w-[120vw]'
        height={500}
        src='/assets/dashboard-media/referral.png'
        width={500}
      />
      <div className='-mt-52 flex flex-col justify-center gap-4 rounded-xl bg-[#10191D] p-16 text-center md:w-[700px]'>
        <div className='text-6xl font-bold text-[#F5F5F5]'>
          $4000 for referring friends to <span className='text-[#DC4F13]'>JOBS3</span>
        </div>
        <div className='text-2xl text-[#A0B4C0]'>Be part of the referral competition</div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#526872] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD]'
              placeholder='Add Email addresses (separate with commas)'
            />
            <button className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition hover:bg-white'>
              <GoArrowRight className='h-full w-full fill-white group-hover:fill-black' />
            </button>
          </div>
        </div>
        <div class='flex items-center space-x-8'>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
          <div className='text-base text-[#A0B4C0]'>Or share your personal referral link</div>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
        </div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#646667] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD]'
              placeholder='Jobs3.io/link'
            />
            <button className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition hover:bg-white'>
              <BiCopy className='h-full w-full fill-white group-hover:fill-black' />
            </button>
          </div>
        </div>

        <div className='flex flex-row justify-center gap-4'>
          <FaWhatsapp className='text-2xl' />
          <BsInstagram className='text-2xl' />
          <FaXTwitter className='text-2xl' />
          <FaTelegramPlane className='text-2xl' />
        </div>
      </div>
      <div className='flex flex-row justify-center gap-4 rounded-xl bg-[#10191D] p-16 text-center md:w-[700px]'>
        <BiUserPin />
        <div className='flex flex-col'>
          <div className='text-[#F5F5F5]'>Sign Up</div>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 rounded-xl bg-[#10191D] p-16 text-center md:w-[700px]'>
        <div className='text-6xl font-bold text-[#F5F5F5]'>
          $4000 for referring friends to <span className='text-[#DC4F13]'>JOBS3</span>
        </div>
        <div className='text-2xl text-[#A0B4C0]'>Be part of the referral competition</div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#526872] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD]'
              placeholder='Add Email addresses (separate with commas)'
            />
            <button className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition hover:bg-white'>
              <GoArrowRight className='h-full w-full fill-white group-hover:fill-black' />
            </button>
          </div>
        </div>
        <div class='flex items-center space-x-8'>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
          <div className='text-base text-[#A0B4C0]'>Or share your personal referral link</div>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
        </div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#646667] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD]'
              placeholder='Jobs3.io/link'
            />
            <button className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition hover:bg-white'>
              <BiCopy className='h-full w-full fill-white group-hover:fill-black' />
            </button>
          </div>
        </div>

        <div className='flex flex-row justify-center gap-4'>
          <FaWhatsapp className='text-2xl' />
          <BsInstagram className='text-2xl' />
          <FaXTwitter className='text-2xl' />
          <FaTelegramPlane className='text-2xl' />
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 rounded-xl bg-[#10191D] p-16 text-center md:w-[700px]'>
        <div className='text-6xl font-bold text-[#F5F5F5]'>
          $4000 for referring friends to <span className='text-[#DC4F13]'>JOBS3</span>
        </div>
        <div className='text-2xl text-[#A0B4C0]'>Be part of the referral competition</div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#526872] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD]'
              placeholder='Add Email addresses (separate with commas)'
            />
            <button className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition hover:bg-white'>
              <GoArrowRight className='h-full w-full fill-white group-hover:fill-black' />
            </button>
          </div>
        </div>
        <div class='flex items-center space-x-8'>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
          <div className='text-base text-[#A0B4C0]'>Or share your personal referral link</div>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
        </div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#646667] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD]'
              placeholder='Jobs3.io/link'
            />
            <button className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition hover:bg-white'>
              <BiCopy className='h-full w-full fill-white group-hover:fill-black' />
            </button>
          </div>
        </div>

        <div className='flex flex-row justify-center gap-4'>
          <FaWhatsapp className='text-2xl' />
          <BsInstagram className='text-2xl' />
          <FaXTwitter className='text-2xl' />
          <FaTelegramPlane className='text-2xl' />
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 rounded-xl bg-[#10191D] p-16 text-center md:w-[700px]'>
        <div className='text-6xl font-bold text-[#F5F5F5]'>
          $4000 for referring friends to <span className='text-[#DC4F13]'>JOBS3</span>
        </div>
        <div className='text-2xl text-[#A0B4C0]'>Be part of the referral competition</div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#526872] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD]'
              placeholder='Add Email addresses (separate with commas)'
            />
            <button className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition hover:bg-white'>
              <GoArrowRight className='h-full w-full fill-white group-hover:fill-black' />
            </button>
          </div>
        </div>
        <div class='flex items-center space-x-8'>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
          <div className='text-base text-[#A0B4C0]'>Or share your personal referral link</div>
          <div class='flex-grow border-t text-[#A0B4C0]'></div>
        </div>
        <div className='flex h-24 w-full items-center justify-center mobile:p-2'>
          <div className='mx-auto flex h-14 w-full max-w-[684px] items-center gap-4 overflow-hidden rounded-2xl border border-[#646667] bg-[#28373E]'>
            <textarea
              className='h-full w-full resize-none content-center bg-transparent px-4 outline-none placeholder:text-[#96B0BD]'
              placeholder='Jobs3.io/link'
            />
            <button className='group h-full rounded-e-xl rounded-s-none bg-[#dc4f14] p-4 transition hover:bg-white'>
              <BiCopy className='h-full w-full fill-white group-hover:fill-black' />
            </button>
          </div>
        </div>

        <div className='flex flex-row justify-center gap-4'>
          <FaWhatsapp className='text-2xl' />
          <BsInstagram className='text-2xl' />
          <FaXTwitter className='text-2xl' />
          <FaTelegramPlane className='text-2xl' />
        </div>
      </div>
    </div>
  );
};

export default Referral;
