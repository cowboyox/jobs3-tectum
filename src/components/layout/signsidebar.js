'use client';
import React from 'react';
import { WiDirectionUpRight } from 'react-icons/wi';
import Video from 'next-video';

const SignSidebar = () => {
  return (
    <div
      className='fixed left-0 top-0 z-40 flex h-[100vh] w-[500px] -translate-x-full items-center justify-center lg:translate-x-0'
      style={{ backgroundImage: "url('assets/images/signup_background.png')" }}
    >
      {/* <Video
        src={videoFile}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        className='h-full w-full object-cover left-0 top-0 absolute'
      ></Video> */}
      <div className='mt-[5%] flex h-[85%] flex-col items-center justify-between'>
        <div className='flex w-full items-center justify-between gap-10'>
          <h1 className='text-[24px] text-[#F5F5F5]'>Welcome to</h1>
          <img src='assets/images/LOGO1.png' />
        </div>
        <div className='flex w-full items-center justify-center'>
          <button className='flex items-center rounded-[20px] bg-[#DC4F13] px-[10px] py-[5px] text-white'>
            <WiDirectionUpRight className='text-[2em]' />
            <h2 className='text-base'>Job3.io</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignSidebar;
