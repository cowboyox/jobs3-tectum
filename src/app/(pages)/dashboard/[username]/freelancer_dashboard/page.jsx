'use client'
import React from 'react';
import Link from 'next/link';
import StarRatings from '@/components/elements/starRating';  

import { LuPlus } from "react-icons/lu";
import { FaLinkedinIn } from 'react-icons/fa';
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useCustomContext } from "@/context/use-custom";

// Placeholder Data for Active job postings
const active_job_postings = [
  {
    id: 0,
    job_title: 'React Developer',
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
    applicants_number: 17,
    date_posted: '6 days ago'
  },
  {
    id: 1,
    job_title: 'UX Designer',
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
    applicants_number: 5,
    date_posted: '12 days ago'
  },
  {
    id: 2,
    job_title: 'UI Designer',
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
    applicants_number: 8,
    date_posted: '12 days ago'
  },
  {
    id: 3,
    job_title: 'Front-End Developer',
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
    applicants_number: 23,
    date_posted: '14 days ago'
  },
  {
    id: 4,
    job_title: 'Information Architect',
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
    applicants_number: 2,
    date_posted: '14 days ago'
  },
]
// Placeholder Data for Hires
const hires = [
  {
    id: 0,
    job_name: 'Front-End Developer',
    images: [
      { id: 0, url: '/assets/images/users/user-1.png' },
      { id: 1, url: '/assets/images/users/user-2.png' },
    ],
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
    hired_on: '6 days ago',
  },
  {
    id: 1,
    job_name: 'UX/UI Designer',
    images: [
      { id: 0, url: '/assets/images/users/user-3.png' },
      { id: 1, url: '/assets/images/users/user-4.png' }, 
    ],
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
    hired_on: '9 days ago',
  },
  {
    id: 1,
    job_name: 'Developer',
    images: [
      { id: 0, url: '/assets/images/user_img.png' }, 
    ],
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
    hired_on: '9 days ago',
  },
]
// Placeholder Data for Past Job Postings
const past_job_postings = [
  {
    id: 0,
    job_name: 'Graphic Designer',
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
  },
  {
    id: 1,
    job_name: 'Illustrator',
    tags: [
      { id: 0, name: 'Contract'},
      { id: 1, name: 'Remote'},
    ],
  },
]
// Placeholder for Referred accounts
const referred_accounts = [
  {
    id: 0,
    referral_img  : '/assets/images/users/user-1.png',
    referral_name : 'Iqbal A.',
    stars_rating  : 4,
    referral_text : 'Did an awesome job. Highly recommend it. Did an awesome job. Highly recommend it.',
    country: 'Indonesia',
    role: 'UX/UI Designer',
  },
  {
    id: 1,
    referral_img  : '/assets/images/users/user-2.png',
    referral_name : 'Iqbal A.',
    stars_rating  : 5,
    referral_text : 'Did an awesome job. Highly recommend it. Did an awesome job. Highly recommend it.',
    country: 'Indonesia',
    role: 'Developer',
  },
  {
    id: 2,
    referral_img  : '/assets/images/users/user-3.png',
    referral_name : 'Iqbal A.',
    stars_rating  : 5,
    referral_text : 'Did an awesome job. Highly recommend it. Did an awesome job. Highly recommend it.',
    country: 'Indonesia',
    role: 'Copywriter',
  },
]
// Placeholder for profile info data
const profileInfoData = [
  { label: 'ZKP ID', value: 'iqbal197' },
  { label: 'Email', value: 'iqbal.a@example.com' },
  { label: 'Member Since', value: '2022 January' },
  { label: 'Average Response Time', value: '1 day' },
  { label: 'Time Zone', value: 'GMT+7' },
];

const ProfileInfo = ({ info }) => {
  const auth = useCustomContext();
  console.log("auth===========>: ", auth);
  return (
    <div className="flex flex-col gap-4">
      <h3 className="uppercase text-lg tracking-wider text-slate-500 font-inter hidden md:block">Profile info</h3>
      <div className='flex flex-col gap-2'>
        {info.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm md:text-lg text-white">{item.label}</span>
            <span className="text-sm md:text-lg text-slate-500">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
const ProfileButtons = ({ editLink, previewLink }) => {
  return ( 
    <div className="flex flex-col gap-4 mt-5 md:mt-0">
      <Link href={editLink} className='bg-[#fa4e17] hover:bg-[#dc4f14] transition rounded-xl text-lg font-semibold text-white text-center py-3'>
        Edit profile
      </Link>
      <Link href={previewLink} className='bg-black hover:bg-slate-900 transition rounded-xl text-lg font-semibold text-white text-center py-3'>
        Preview profile
      </Link>
    </div>
  );
};

const FreelancerDashboard = () => {
  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        <div className="w-full md:w-1/2 flex flex-col gap-7">
          {/* Profile Name & Image */}
          <div className="flex gap-5 w-full items-center flex-col md:flex-row">
            <img 
              src="/assets/images/user_img.png" 
              className="aspect-square rounded-full object-cover w-1/4" 
            />
            <div className="w-3/4">
              <h2 className='text-xl md:text-4xl md:text-left text-center'>Lena Collins</h2>
              <p className="text-slate-500 text-base md:text-xl mt-1 md:mt-2 md:text-left text-center">Oslo, Norway</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:hidden">
            <ProfileInfo info={profileInfoData} />
            <ProfileButtons editLink="#" previewLink="#" />
          </div>
          {/* Profile Description */}
          <div className="flex flex-col gap-3">
            <h3 className="uppercase text-lg tracking-wider text-slate-500 font-inter">Introduction</h3>
            <p className="text-sm md:text-base">
              Hello! I&apos;m Iqbal, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring that every user interaction is as enjoyable as it is efficient.
            </p>
          </div>
          {/* Language */}
          <div className="flex flex-col gap-3">
            <h3 className="uppercase text-lg tracking-wider text-slate-500 font-inter">Language</h3>
            <div className="flex gap-2 flex-wrap">
              <div className="py-2 px-3 bg-slate-700 rounded flex items-center gap-3 cursor-pointer transition hover:bg-slate-800">
                <LuPlus />
              </div>
              <div className="py-2 px-3 bg-slate-700 rounded flex items-center gap-3 cursor-pointer transition hover:bg-slate-800">
                English <LuPlus className=' rotate-45' />
              </div>
              <div className="py-2 px-3 bg-slate-700 rounded flex items-center gap-3 cursor-pointer transition hover:bg-slate-800">
                French <LuPlus className=' rotate-45' />
              </div>
              <div className="py-2 px-3 bg-slate-700 rounded flex items-center gap-3 cursor-pointer transition hover:bg-slate-800">
                Indonesian <LuPlus className=' rotate-45' />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-7 mt-5"> 
          <div className="md:flex flex-col gap-5 hidden">
            <ProfileButtons editLink="#" previewLink="#" />
            <ProfileInfo info={profileInfoData} />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-6 md:gap-0 mt-8 md:mt-16 border-b-[1px] border-slate-500 pb-10 md:pb-7">
        <div className="w-full">
          <p className="uppercase text-lg tracking-wider text-slate-500 font-inter">Phone</p>
          <Link href="tel:+99 123 4567">
            <h3 className="text-xl text-white pt-2 hover:text-orange-600 transition">
              +99 123 4567
            </h3>
          </Link>
        </div>
        <div className="w-full">
          <p className="uppercase text-lg tracking-wider text-slate-500 font-inter">Email</p>
          <Link href="mailto:lena.collins@example.com">
            <h3 className="text-xl text-white pt-2 hover:text-orange-600 transition">
              lena.collins@example.com
            </h3>
          </Link>
        </div>
        <div className="w-auto">
          <p className="uppercase text-lg tracking-wider text-slate-500 font-inter">Social</p>
          <div className="flex gap-4 pt-2 items-center">
            <Link href='#'><FaLinkedinIn className='transition hover:-translate-y-[2px]' size={25}/></Link>
            <Link href='#'><FaTelegramPlane className='transition hover:-translate-y-[2px]' size={25}/></Link>
            <Link href='#'><FaFacebookF className='transition hover:-translate-y-[2px]' size={25}/></Link> 
          </div>
        </div>
      </div>
      <div className='flex border-b-[1px] border-slate-500 md:my-0 mb-5 py-5 md:py-10 justify-center'>
        <h2 className='text-2xl md:text-4xl text-white text-center'>Projects</h2>
      </div>
      {/* Project */}
      <div className="flex gap-5 py-10 md:flex-row flex-col">
          <div className="w-full md:w-1/3">
            <p className="uppercase text-lg tracking-wider text-slate-500 font-inter">Project title</p>
            <h2 className='text-3xl md:text-4xl pt-3'>Blockchain-Based Voting System Development</h2>
          </div>
          <div className="w-full md:w-2/3">
            <p className="uppercase text-lg tracking-wider text-slate-500 font-inter">Project Description</p>
            <p className="text-sm md:text-base pt-3 text-[#E0F0F9]">
              We are seeking a skilled blockchain developer to design and implement a secure, decentralized voting system for municipal elections. The project involves creating a user-friendly interface for voters, ensuring data integrity through cryptographic techniques, and developing smart contracts to handle the voting process transparently and efficiently. The ideal candidate will have experience with Ethereum, Solidity, and front-end frameworks such as React or Angular. This project aims to enhance voter trust and participation by leveraging blockchain technology to provide a tamper-proof voting solution.
            </p>
            <div className="flex pt-3 flex-col md:flex-row">
              <div className='w-full md:w-1/2 flex gap-7'>
                <div className='w-full'> 
                  <p className="uppercase text-lg tracking-wider text-slate-500 font-inter mt-4 mb-4"> Start </p>
                  <h2 className='text-4xl'>02/04</h2>
                  <h2 className='text-3xl text-slate-500'>2024</h2>
                </div>
                <div className='w-full'> 
                  <p className="uppercase text-lg tracking-wider text-slate-500 font-inter mt-4 mb-4"> Start </p>
                  <h2 className='text-4xl'>02/04</h2>
                  <h2 className='text-3xl text-slate-500'>2025</h2>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex mt-5 flex-col justify-start gap-4">
                <Link href="#" className='transition rounded-xl text-lg font-semibold text-white text-center py-3 w-full border border-slate-500 hover:bg-white hover:text-black'>
                  Edit project
                </Link>
                <Link href="#" className='transition-all rounded-xl text-lg font-semibold text-white text-center py-3 w-full hover:bg-white hover:text-black'>
                  End project
                </Link>
              </div>
            </div>
          </div>
      </div>
      {/* Active Job Postings */}
      <div className="flex flex-col gap-5">
        <p className="uppercase text-lg tracking-wider text-slate-500 font-inter">Active job postings</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> 
          {active_job_postings.map((active_job) => (
            <div className="p-5 border border-slate-400 rounded-xl" key={active_job.id}>
              <p className='text-xl text-white mb-4'>{active_job.job_title}</p>
              <div className="flex gap-2 items-center">
                {active_job.tags.map((tag, tag_index) => (
                  <React.Fragment key={tag.id}>
                    <span className='main_color text-base'>{tag.name}</span>
                    {/* Hide Dot if it's the last tag */}
                    {!tag_index + 1 == active_job.tags.length && (
                      <span className='scale-75'>&#9679;</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-lg text-slate-500">{active_job.applicants_number} applicants</p>
                <p className="text-lg text-slate-500">{active_job.date_posted}</p>
              </div>
            </div> 
          ))}
        </div>
      </div>
      {/* Hires */}
      <div className="flex flex-col gap-5 mt-16">
        <p className="uppercase text-lg tracking-wider text-slate-500 font-inter">Hires</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> 
          {hires.map((hire) => (
            <div className="p-5 border border-slate-400 rounded-xl" key={hire.id}>
              <div className="flex mb-5">
                {hire.images.map((single_img, img_indx) => (
                  <img 
                    key={single_img.id}
                    src={single_img.url} 
                    className="rounded-full aspect-square object-cover h-12 w-12 border-black border-2"
                    style={{ transform: `translateX(-${15 * img_indx}px)` }} 
                  />
                ))}
              </div>
              <p className='text-xl text-white mb-1'>{hire.job_name}</p>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  {hire.tags.map((tag, tag_index) => (
                    <React.Fragment key={tag.id}>
                      <span className='text-slate-400 text-base'>{tag.name}</span>
                      {/* Hide Dot if it's the last tag */}
                      {tag_index + 1 !== hire.tags.length && (
                        <span className='scale-75 text-slate-500'>&#9679;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-lg text-slate-400">{hire.hired_on}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Past Job Postings */}
      <div className="flex flex-col gap-5 mt-16">
        <p className="uppercase text-lg tracking-wider text-slate-500 font-inter">Past job postings</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {past_job_postings.map((past_job) => (
            <div className="p-5 border border-slate-400 rounded-xl" key={past_job.id}>
              <h3 className='text-xl text-white mb-4'>{past_job.job_name}</h3>
              <div className="flex justify-between mt-1">
                <div className="flex gap-2 items-center">
                  {past_job.tags.map((tag, tag_index) => (
                    <React.Fragment key={tag.id}>
                      <span className='text-slate-400 text-base'>{tag.name}</span>
                      {/* Hide Dot if it's the last tag */}
                      {tag_index + 1 !== past_job.tags.length && (
                        <span className='scale-75 text-slate-500'>&#9679;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <Link href="#post-again" className="text-lg text-white">Post Again</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Referred Accounts */}
      <div className="flex flex-col gap-5 py-14 mt-16 mb-10 border-y-[1px] border-slate-500">
        <div className="flex justify-between w-full">
          <p className="uppercase text-lg tracking-wider text-slate-500 font-inter">Referred accounts</p>
          <Link href="#">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5"> 
          {referred_accounts.map((referral) => (
            <div className="border border-slate-400 rounded-xl relative md:p-5 p-2 pt-10 md:pt-5 mt-6 md:mt-0" key={referral.id}>
              <div className="flex gap-4 items-center justify-center md:justify-start">  
                <img 
                  src={referral.referral_img} 
                  className="rounded-full aspect-square object-cover h-12 md:h-12 w-12 md:w-12 md:relative absolute bottom-full md:bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 translate-y-1/2 md:translate-y-0 border border-white md:border-0" 
                />
                <h3 className='text-xl text-white md:text-left text-center'>{referral.referral_name}</h3>
              </div>
              <p className="text-base text-slate-500 text-center md:hidden block">{referral.country}</p>
              <StarRatings rating={referral.stars_rating} className="md:block hidden"/>
              <div className="md:hidden flex justify-center py-2 px-2 bg-slate-700 rounded items-center gap-3 cursor-pointer transition hover:bg-slate-800 text-sm text-center mt-3">
                {referral.role}
              </div>
              <p className="text-base text-slate-500 md:block hidden">{referral.referral_text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Refer a friend */}
      <div className="my-14 flex justify-between flex-col md:flex-row md:gap-0 gap-16">
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <h2 className='text-4xl'>Refer a <span className="main_color">Friend</span></h2>
          <p className="text-slate-500 text-lg">
            Love our platform? Share the love with your friends and earn rewards for both you and them through our Refer a Friend program!
          </p>
        </div>
        <div className="w-full md:w-1/3 flex items-start justify-end">
          <Link href="#" className='bg-[#fa4e17] hover:bg-[#dc4f14] transition rounded-xl text-lg font-semibold text-white text-center py-3 w-full max-w-80'>
            Invite friend
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FreelancerDashboard