'use client';
import React from 'react';
import '/src/app/css/remove_horizontal_padding.css';

import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
import CollapsibleText from "@/components/elements/collapsible_text";

import StarRating from '@/components/elements/starRating';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const ProfileInfoItem = ({ iconSrc, label, value }) => {
  return (
    <div className="w-full flex justify-between">
      <div className="w-1/2 flex gap-2 items-center">
        <img src={iconSrc} className='w-5 h-5 object-contain object-center' />
        <span className='text-sm'>{label}</span>
      </div>
      <span className='text-[#96B0BD] text-sm'>{value}</span>
    </div>
  );
};
const EmptyItem = ()=> {
  return ( 
    <div className="w-full h-72 bg-[#1a272c] rounded-2xl flex items-center justify-center border border-dashed border-[#526872] cursor-pointer transition hover:bg-[#23343b]">
    <GoPlus className='h-12 w-12 opacity-65' />
  </div>
  )
}

const reviews = [
  {
    id: 1,
    name: 'Hannibal Smith',
    imgSrc: '/assets/images/users/user-1.png',
    flagSrc: '/assets/images/flag.png',
    timeAgo: '1 month ago',
    rating: 5,
    reviewText: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'
  },
  {
    id: 2,
    name: 'John Doe',
    imgSrc: '/assets/images/users/user-2.png',
    flagSrc: '/assets/images/flag.png',
    timeAgo: '2 weeks ago',
    rating: 4,
    reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'
  },
  {
    id: 3,
    name: 'Jane Doe',
    imgSrc: '/assets/images/users/user-3.png',
    flagSrc: '/assets/images/flag.png',
    timeAgo: '3 days ago',
    rating: 5,
    reviewText: 'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'
  }
];

const Freelancer = () => {
  return (
    <div className='p-0'> 
      <img src="/assets/images/freelancer-image.jpeg" className='rounded-b-2xl h-64 w-full object-cover' />
      <div className=" max-w-7xl mx-auto flex flex-col gap-3 px-0 md:px-8 -translate-y-8">
        <Tabs defaultValue="edit-profile" >
          <div className="bg-[#10191D] md:p-8 px-3 py-4 rounded-xl flex md:flex-row flex-col md:gap-0 gap-4">
            <div className='w-full md:w-3/4 flex md:gap-7 gap-4 items-center'> 
              <div className="w-16 md:w-24 w-16 md:h-24 relative">
                <img src='/assets/images/users/user-5.png' className='rounded-full w-full h-full aspect-square' />
                {/* Change background color depending on user online status */}
                <div className="rounded-full h-4 w-4 absolute right-1 bottom-1 bg-green-500"></div>
              </div>
              <div className="flex flex-col gap-4">
                <div className='flex items-center gap-4'>
                  <h2 className='text-2xl md:text-3xl'>Devon Miles</h2> 
                  <img src='/assets/images/icons/checkmark.svg' className='w-5 h-5' /> 
                </div>
                <div className="flex md:flex-row flex-col gap-2 md:gap-4">
                  <div className="flex gap-2 items-center">
                    <img src="/assets/images/icons/blue-top-rated.svg" className="w-6 h-6 object-contain object-center" />
                    <p className='text-white text-lg'>Top Rated</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <img src="/assets/images/icons/green-job-success.svg" className="w-6 h-6 object-contain object-center" />
                    <p className='text-white text-lg'>96% Job Success</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/4 flex justify-end items-center'>
              <TabsList className='rounded-xl md:w-auto w-full'>
                <TabsTrigger 
                  className='rounded-xl data-[state=active]:bg-[#dc4f14] px-6 w-full'
                  value="preview"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger 
                  className='rounded-xl data-[state=active]:bg-[#dc4f14] px-6 w-full'
                  value="edit-profile"
                >
                  Edit profile
                </TabsTrigger>
              </TabsList>
            </div>
          </div> 
          <div className='flex md:flex-row flex-col mt-5'> 
            {/* Sidebar */}
            <div className="md:w-1/4 w-full">
              <div className="flex flex-col w-full rounded-xl overflow-hidden">
                <div className="p-6 flex flex-col gap-3 border-b bg-[#10191d] border-[#28373e]">
                  <p className="text-[#96B0BD] text-lg">Profile info</p>
                  <ProfileInfoItem
                    iconSrc="/assets/images/icons/personalcard.svg"
                    label="ZKP ID"
                    value="Devon865"
                  />
                  <ProfileInfoItem
                    iconSrc="/assets/images/icons/buildings.svg"
                    label="Location"
                    value="Oslo, Norway"
                  />
                  <ProfileInfoItem
                    iconSrc="/assets/images/icons/user-portal.svg"
                    label="Member since"
                    value="Mar 2022"
                  />
                  <ProfileInfoItem
                    iconSrc="/assets/images/icons/clocks.svg"
                    label="Avg. resp. time"
                    value="1h"
                  />
                  <ProfileInfoItem
                    iconSrc="/assets/images/icons/watch.svg"
                    label="Time Zone"
                    value="GMT+7"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 border-b bg-[#10191d] border-[#28373e]">
                  <p className="text-[#96B0BD] text-lg">Price</p>
                  <ProfileInfoItem
                    iconSrc="/assets/images/icons/receipt-item.svg"
                    label="Per hour"
                    value="$70"
                  />
                  <ProfileInfoItem
                    iconSrc="/assets/images/icons/calendar-2.svg"
                    label="Monthly"
                    value="$3500"
                  /> 
                </div>
                <div className="p-6 flex flex-col gap-3 border-b bg-[#10191d]">
                  <p className="text-[#96B0BD] text-lg">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">UI/UX</div>
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">Design</div>
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">Webdesign</div>
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">Prototyping</div>
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">Wireframing</div>
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">Research</div>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3 border-b bg-[#10191d]">
                  <p className="text-[#96B0BD] text-lg">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">English</div>
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">German</div>
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">Russian</div>
                    <div className="p-2 bg-[#28373e] rounded-full border border-[#3e525b] text-sm">Spanish</div> 
                  </div>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="md:w-3/4 w-full md:pl-6">
              <TabsContent value="preview">Preview</TabsContent>
              <TabsContent value="edit-profile">
                <div className="flex flex-col gap-5">
                  <div className="w-full flex flex-col p-5 pb-12 rounded-xl gap-2 bg-[#10191d]"> 
                    <p className='text-xl text-[#96B0BD]'>About</p>
                    <CollapsibleText 
                      previewText="I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness."
                      expandedText="No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure."
                    />
                  </div>
                  <div className="w-full flex justify-between flex-col p-5 rounded-xl gap-5 bg-[#10191d]"> 
                    <div className="flex justify-between">
                      <div className='text-xl md:text-2xl text-[#96B0BD] flex items-center gap-3'>
                        My Portfolio
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='flex items-center'>
                              <IoInformationCircleOutline className='w-6 h-6' />
                            </TooltipTrigger>
                            <TooltipContent>
                              Info
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div> 
                      <div className="flex gap-3 md:gap-4 ml-auto items-center">
                        <p className="cursor-pointer text-white text-sm underline">Active</p>
                        <p className="cursor-pointer text-slate-400 text-sm hover:text-white">Drafts</p>
                        <img src='/assets/images/icons/edit-pen.svg' className="cursor-pointer" />
                      </div>
                    </div>
                    <div className="grid-cols-3 gap-4 hidden md:grid">
                      <EmptyItem />
                      <EmptyItem />
                      <EmptyItem />
                    </div>
                    <div className="md:hidden">
                      <Swiper
                        spaceBetween={20}
                        slidesPerView={1.2}
                      >
                        <SwiperSlide> <EmptyItem /> </SwiperSlide>
                        <SwiperSlide> <EmptyItem /> </SwiperSlide>
                        <SwiperSlide> <EmptyItem /> </SwiperSlide>
                      </Swiper>
                    </div>
                    <span className="cursor-pointer flex items-center gap-2 shadow-inner mx-auto">
                      Show more <GoChevronDown />
                    </span>
                  </div> 
                  <div className="w-full flex justify-between flex-col p-5 rounded-xl gap-5 bg-[#10191d]"> 
                    <div className="flex justify-between">
                      <div className='text-xl md:text-2xl text-[#96B0BD] flex items-center gap-3'>
                        My Gigs
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='flex items-center'>
                              <IoInformationCircleOutline className='w-6 h-6' />
                            </TooltipTrigger>
                            <TooltipContent>
                              Info
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div> 
                      <div className="flex gap-3 md:gap-4 ml-auto items-center">
                        <p className="cursor-pointer text-white text-sm underline">Active</p>
                        <p className="cursor-pointer text-slate-400 text-sm hover:text-white">Drafts</p>
                        <img src='/assets/images/icons/edit-pen.svg' className="cursor-pointer" />
                      </div>
                    </div>
                    <div className="grid-cols-3 gap-4 hidden md:grid">
                      <EmptyItem />
                      <EmptyItem />
                      <EmptyItem />
                    </div>
                    <div className="md:hidden">
                      <Swiper
                        spaceBetween={20}
                        slidesPerView={1.2}
                      >
                        <SwiperSlide> <EmptyItem /> </SwiperSlide>
                        <SwiperSlide> <EmptyItem /> </SwiperSlide>
                        <SwiperSlide> <EmptyItem /> </SwiperSlide>
                      </Swiper>
                    </div>
                    <span className="cursor-pointer flex items-center gap-2 shadow-inner mx-auto">
                      Show more <GoChevronDown />
                    </span>
                  </div> 
                  <div className="w-full flex flex-col p-5 pb-12 rounded-xl gap-2 bg-[#10191d]"> 
                    <p className='text-2xl text-[#96B0BD]'>Reviews</p>
                    <div className='flex flex-col gap-6 mt-4'>
                      {reviews.map(review => (
                        <div key={review.id} className="w-full flex gap-6">
                          <div className="w-full flex flex-col gap-2 border-b pb-6 border-[#28373e]">
                            <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                              <img src={review.imgSrc} className='w-10 h-10 aspect-square rounded-full object-cover' alt="user" /> 
                              <div className="flex w-auto items-center gap-2">
                                <p className="text-xl">{review.name}</p>
                                <img src={review.flagSrc} className='w-6 h-fit bg-white' alt="flag" />
                              </div>
                              <div className="ml-auto flex items-center gap-3 w-full md:w-auto md:justify-normal justify-between">
                                <p className="text-base text-[#526872]">{review.timeAgo}</p>
                                <StarRating rating={review.rating} />
                              </div>
                            </div>
                            <div className="md:pl-14 mt-2 md:mt-0">
                              <p className='text-white text-base'>
                                {review.reviewText}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <span className="cursor-pointer flex items-center gap-2 shadow-inner mx-auto">
                      Show more <GoChevronDown />
                    </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Freelancer
