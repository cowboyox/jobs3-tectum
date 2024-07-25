'use client';

import React, { useEffect, useState } from 'react';

import { useCustomContext } from '@/context/ContextProvider';

const Review = () => {
  const auth = useCustomContext();

  return (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className='rounded-xl bg-[#10191D] p-10'>
        <div className='p-5 bg-[#1B272C] rounded-tr-2xl rounded-br-2xl border-l-[#34E250] border-l-4'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-3'>Your order was completed.</h1>
          <p className='text-[#96B0BD] text-[16px] font-normal'>Based on your expectations, how would you rate the quality of this delivery?</p>
        </div>
        
        <div className='bg-[#1B272C] border-b-2 my-7'></div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-10'>Based on your expectations, how would you rate the quality of this delivery?</h1>
          <div className='flex items-center gap-8'>
            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Poor</p>
            </div>

            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Fair</p>
            </div>

            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Good</p>
            </div>
            
            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Very Good</p>
            </div>

            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#DC4F13] border-[1px] rounded-xl'>
              {/* <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
              </svg>

              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Exceptional</p>
            </div>
          </div>
        </div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-10'>We love to hear that! What made it exceptional?</h1>
          <div className='flex items-center gap-8'>
            <div className='flex items-center gap-3 p-5 w-60 h-14 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.837891" width="24" height="24" rx="5" fill="#DC4F13"/>
                <path d="M6 13.0809L10.243 17.3239L18.727 8.83789" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Attention to details</p>
            </div>

            <div className='flex items-center gap-3 p-5 w-60 h-14 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
              </svg>

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Data Depth</p>
            </div>

            <div className='flex items-center gap-3 p-5 w-60 h-14 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
              </svg>

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Professionalism</p>
            </div>
          </div>
          <div className='flex items-center gap-8 mt-5'>
            <div className='flex items-center gap-3 p-5 w-60 h-14 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
              </svg>

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Innovation</p>
            </div>

            <div className='flex items-center gap-3 p-5 w-60 h-14 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
              </svg>

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Exceed Expectations</p>
            </div>

            <div className='flex items-center gap-3 p-5 w-60 h-14 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="1.33789" width="23" height="23" rx="4.5" stroke="#96B0BD"/>
              </svg>

              <p className='text-[#F5F5F5] text-[16px] font-bold'>Strategic thinking</p>
            </div>
          </div>
        </div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-10'>How was it working with Devon miles?</h1>
          <div className='flex items-center gap-8'>
            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Poor</p>
            </div>

            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Fair</p>
            </div>

            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Good</p>
            </div>
            
            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Very Good</p>
            </div>

            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#DC4F13] border-[1px] rounded-xl'>
              {/* <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
              </svg>

              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Exceptional</p>
            </div>
          </div>
        </div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-3'>Based on your expectations, how would you rate the value of this delivery</h1>
          <p className='text-[#96B0BD] text-[16px] font-normal mb-10'>Based on your expectations, how would you rate the quality of this delivery?</p>
          <div className='flex items-center gap-8'>
            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Poor</p>
            </div>

            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Fair</p>
            </div>

            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Good</p>
            </div>
            
            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#3E525B] border-[1px] rounded-xl'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Very Good</p>
            </div>

            <div className='flex items-center flex-col px-6 w-40 h-24 py-4 text-center border-[#DC4F13] border-[1px] rounded-xl'>
              {/* <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.727 2.4325L14.487 5.9525C14.727 6.4425 15.367 6.9125 15.907 7.0025L19.097 7.5325C21.137 7.8725 21.617 9.3525 20.147 10.8125L17.667 13.2925C17.247 13.7125 17.017 14.5225 17.147 15.1025L17.857 18.1725C18.417 20.6025 17.127 21.5425 14.977 20.2725L11.987 18.5025C11.447 18.1825 10.557 18.1825 10.007 18.5025L7.01698 20.2725C4.87698 21.5425 3.57698 20.5925 4.13698 18.1725L4.84698 15.1025C4.97698 14.5225 4.74698 13.7125 4.32698 13.2925L1.84698 10.8125C0.386979 9.3525 0.85698 7.8725 2.89698 7.5325L6.08698 7.0025C6.61698 6.9125 7.25698 6.4425 7.49698 5.9525L9.25698 2.4325C10.217 0.5225 11.777 0.5225 12.727 2.4325Z" stroke="#3E525B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.727 1.4325L13.487 4.9525C13.727 5.4425 14.367 5.9125 14.907 6.0025L18.097 6.5325C20.137 6.8725 20.617 8.3525 19.147 9.8125L16.667 12.2925C16.247 12.7125 16.017 13.5225 16.147 14.1025L16.857 17.1725C17.417 19.6025 16.127 20.5425 13.977 19.2725L10.987 17.5025C10.447 17.1825 9.55698 17.1825 9.00698 17.5025L6.01698 19.2725C3.87698 20.5425 2.57698 19.5925 3.13698 17.1725L3.84698 14.1025C3.97698 13.5225 3.74698 12.7125 3.32698 12.2925L0.846979 9.8125C-0.613021 8.3525 -0.14302 6.8725 1.89698 6.5325L5.08698 6.0025C5.61698 5.9125 6.25698 5.4425 6.49698 4.9525L8.25698 1.4325C9.21698 -0.4775 10.777 -0.4775 11.727 1.4325Z" fill="#DC4F13"/>
              </svg>

              <p className='text-[#F5F5F5] text-[16px] font-bold mt-3'>Exceptional</p>
            </div>
          </div>
        </div>

        <div className='bg-[#1B272C] border-b-2 my-5'></div>

        <div className='py-5'>
          <h1 className='text-[#F5F5F5] text-2xl font-semibold mb-3'>Write your public review</h1>
          <p className='text-[#96B0BD] text-[16px] font-normal mb-10'>Based on your expectations, how would you rate the quality of this delivery?</p>
          <div className='border-[#526872] border-[1px] rounded-xl p-5'>
            <div className='bg-[#1B272C] flex items-center rounded-xl p-5 gap-3'>
              <div className='flex items-center gap-3'>
                <img
                  className='object-cover w-12 h-12 rounded-full aspect-square mobile:h-8 mobile:w-8'
                  src={
                    auth?.currentProfile?.avatarURL
                      ? auth?.currentProfile?.avatarURL
                      : '/assets/images/users/user-1.png'
                  }
                />
                <p className='text-[#F5F5F5] font-bold text-[16px]'>{auth?.currentProfile?.fullName}</p>
              </div>
              <div className='border-x-[1px] border-[#3E525B] px-3'>
                <p className='text-[#F5F5F5] font-bold text-[16px]'>US$300</p>
              </div>
              <div className='flex items-center gap-1'>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <div>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1209 1.1568L11.5098 3.93454C11.6992 4.32122 12.2042 4.69211 12.6303 4.76313L15.1477 5.18137C16.7575 5.44967 17.1363 6.61759 15.9763 7.76972L14.0192 9.72677C13.6878 10.0582 13.5063 10.6974 13.6089 11.1551L14.1691 13.5777C14.6111 15.4953 13.5931 16.2371 11.8965 15.2349L9.53695 13.8381C9.11082 13.5856 8.40849 13.5856 7.97447 13.8381L5.61496 15.2349C3.92622 16.2371 2.90035 15.4874 3.34226 13.5777L3.90255 11.1551C4.00514 10.6974 3.82363 10.0582 3.4922 9.72677L1.53515 7.76972C0.383022 6.61759 0.753914 5.44967 2.36374 5.18137L4.88107 4.76313C5.29931 4.69211 5.80435 4.32122 5.99375 3.93454L7.38262 1.1568C8.14018 -0.350443 9.37123 -0.350443 10.1209 1.1568Z" fill="#DC4F13"/>
                  </svg>
                </div>
                <p className='text-[#F5F5F5] font-medium text-[14.2px]'>(5)</p>
              </div>
            </div>

            <div className='bg-[#1B272C] border-b-2 my-5'></div>

            <textarea placeholder='Write your review here...' rows={5} className='w-full bg-[#10191D] p-2 focus:outline-none'/>
          </div>
        </div>

        <div className='py-5'>
          <div className='bg-[#1B272C] rounded-xl h-4'></div>
          <p className='text-[#96B0BD] text-[16px] font-normal mt-5'>Write at least 50 characters</p>
        </div>

        <div className='flex items-center justify-end'>
          <button className='bg-[#DC4F13] rounded-xl p-4 text-[#F5F5F5] font-bold text-[16px] w-44'>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Review;
