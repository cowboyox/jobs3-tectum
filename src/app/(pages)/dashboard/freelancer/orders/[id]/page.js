'use client';
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

import PanelContainer from '@/components/elements/panel';
import DropFile from '@/components/elements/dropFile';

import { IoCalendarOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiLineVerticalLight } from "react-icons/pi";
import { GoCircle } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { CiCircleQuestion } from "react-icons/ci";
import { useCustomContext } from '@/context/use-custom';
import { useGetClientGigContractById } from '@/hooks/useGetClientGigContractById';

const MessagesArea = ()=> {
  const auth = useCustomContext();

  return (
    <PanelContainer>
      <div className="flex flex-col gap-4">
        <div className="flex space-between">
          <div className="flex w-1/2 gap-5 mobile:w-7/12 mobile:gap-2">
            <img 
              src={auth?.currentProfile?.avatarURL ? auth?.currentProfile?.avatarURL : '/assets/images/users/user-1.png'}
              className='object-cover w-12 h-12 rounded-full mobile:h-8 mobile:w-8 aspect-square'
            />
            <div className="flex items-center gap-2 cursor-pointer mobile:gap-1">
              <span className='text-base mobile:text-xs'>Use a quick response</span>
              <FaAngleDown />
            </div>
          </div>
          <div className="flex items-center justify-end w-1/2 gap-3 mobile:w-5/12"> 
            <span className='text-base mobile:text-xs text-[#96B0BD]'>
              Local time:
            </span>
            <span className='text-base text-white mobile:text-xs'>
              4:25 pm
            </span>
          </div>
        </div>
        <textarea className='border border-[#526872] p-5 h-80 bg-transparent rounded-2xl text-white' placeholder='Type your message here...'/>
        <div className="flex gap-3 p-2 rounded-2xl bg-[#1B272C]">
          <div className="w-full py-5 text-center text-white transition cursor-pointer rounded-2xl mobile:py-3 hover:bg-white hover:text-black">
            Back
          </div>
          <div className="w-full rounded-2xl bg-[#DC4F13] text-white py-5 mobile:py-3 text-center cursor-pointer">
            Send
          </div>
        </div>
      </div>
    </PanelContainer>
  )
}
const OrderPage = ({ params }) => {
  const { data: contractRawData } = useGetClientGigContractById(
    params.id
  );
  const contractInfo = contractRawData?.data?.data;
  
  const startDateString = contractInfo?.contractStartDate;
  const date = new Date(startDateString);
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedStartDate = date.toLocaleString('en-US', options); // Output: "Jun 26, 2024, 5:23 PM"

  const form = useForm();
  return (
    <Tabs defaultValue="details" className="flex flex-col w-full gap-6">
        <TabsList className='w-full h-auto p-0 bg-transparent'>
            <TabsTrigger 
              className='w-full py-6 text-base bg-transparent border-b-4 border-[#516170] data-[state=active]:border-[#dc4f14]' 
              value="details">
                Details
            </TabsTrigger>
            <TabsTrigger 
              className='w-full py-6 text-base bg-transparent border-b-4 border-[#516170] data-[state=active]:border-[#dc4f14]' 
              value="requirements">
                Requirements
            </TabsTrigger>
        </TabsList>
        <div className="flex gap-8 mobile:flex-col">
          <div className="w-8/12 mobile:w-full">
            <TabsContent value="details" className='w-full'>
              <div className="flex flex-col w-full gap-5">
                <PanelContainer>
                  <div className="text-[24px] text-white mobile:text-xl">
                    {contractInfo?.clientGig?.gigTitle}
                  </div>
                  <div className='flex items-center w-full gap-2 md:w-3/4 md:gap-5'>
                    <div className='relative w-12 h-12 mobile:h-8 mobile:w-8'>
                      <img
                        className='object-cover w-full h-full rounded-full aspect-square'
                        src={contractInfo?.gigOwner?.avatarURL ? contractInfo?.gigOwner?.avatarURL : '/assets/images/users/user-3.png'}
                      /> 
                      <div className='absolute w-3 h-3 bg-green-500 rounded-full bottom-1 mobile:bottom-0 right-1 mobile:right-0 mobile:h-3 mobile:w-3' />
                    </div>
                    <div className='flex flex-col gap-4'>
                      <div className='flex items-center gap-2'>
                        <h2 className='text-xl mobile:text-xs'>{contractInfo?.gigOwner?.fullName}</h2>
                        <img className='w-4 h-4 mobile:h-3 mobile:w-3' src='/assets/images/icons/checkmark.svg' />
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <IoCalendarOutline className='h-5 w-5 mobile:h-3 mobile:w-3 fill-[#96B0BD] stroke-[#96B0BD]' />
                      <p className='text-[15px] text-[#96B0BD] mobile:text-xs'>
                        {formattedStartDate}
                      </p>
                    </div>
                  </div>
                  <PanelContainer nested={true}>
                    <div className="flex items-center gap-4 space-between">
                      <span className='text-base mobile:text-xs text-[#96B0BD]'>Order number</span>
                      <span className='text-base font-bold text-white mobile:text-xs'>#{params.id}</span>
                      <div className="py-1 px-2 text-sm border border-[#1BBF36] text-[#1BBF36] rounded-xl ml-auto mobile:text-xs">
                        {contractInfo?.status}
                      </div>
                    </div>
                  </PanelContainer>
                  <PanelContainer nested={true}>
                    <div className="flex flex-col gap-5"> 
                      <div className="flex">
                        <div className="w-8/12">
                          <div className="flex flex-col gap-2">
                            <span className='text-base mobile:text-xs text-[#96B0BD]'>
                              Item
                            </span>
                            <span className='text-base font-bold text-white mobile:text-xs'>
                              Design UI/UX design for your mobile apps
                            </span>
                          </div>
                        </div>
                        <div className="w-2/12">
                          <div className="flex flex-col gap-2">
                            <span className='text-base mobile:text-xs text-[#96B0BD]'>
                              Duration
                            </span>
                            <span className='text-base font-bold text-white mobile:text-xs'>
                              2 days
                            </span>
                          </div>
                        </div>
                        <div className="w-2/12">
                          <div className="flex flex-col items-end gap-2">
                            <span className='text-base mobile:text-xs text-[#96B0BD]'>
                              Price
                            </span>
                            <span className='text-base font-bold text-white mobile:text-xs'>
                              ${contractInfo?.clientGig?.gigPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-[#28373E] w-full"/>
                      <div className="p-4 bg-[#10191D] rounded-xl flex justify-between">
                        <span className='text-base font-bold text-white'>Total</span>
                        <span className='text-base font-bold text-white'>${contractInfo?.clientGig?.gigPrice}</span>
                      </div>
                    </div>
                  </PanelContainer>
                </PanelContainer>
                <div className="mobile:hidden">
                  <MessagesArea />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requirements">
                <Form {...form}>
                  <form>
                    <PanelContainer>
                      <span className='text-2xl font-bold text-white mobile:text-xl mobile:font-normal'>
                        Brief about the project
                      </span>
                      <textarea className='border border-[#526872] p-5 h-80 bg-transparent rounded-2xl text-white'/>
                      <div className='text-3xl text-[#F5F5F5] mobile:text-xl mt-5'>
                        Drag and drop your files here or
                        <span className='main_color'> browse</span> to upload
                      </div>
                      <div className='text-base text-[#96B0BD]'>
                        Format: JPEG, JPG, PNG, GIF, MP4, AVI. Max size per image/video: 50MB
                      </div>
                      <DropFile
                        acceptOnly='image'
                        className='aspect-video'
                        inputName='order_attachment'
                        placeHolderPlusIconSize={80}
                      />
                    </PanelContainer>
                  </form>
                </Form>
            </TabsContent>
          </div>
          <div className="flex flex-col w-4/12 gap-5 mobile:w-full">
            <PanelContainer>
              <span className='text-xl font-bold text-white'>Time left</span>
              <div className="flex gap-2">
                <div className="bg-[#1B272C] w-full py-2 rounded-2xl flex flex-col gap-1 items-center">
                  <span className='text-sm text-[#96B0BD]'>
                    Days
                  </span>
                  <span className='text-xl font-bold text-white'>
                    01
                  </span>
                </div>
                <div className="bg-[#1B272C] w-full py-2 rounded-2xl flex flex-col gap-1 items-center">
                  <span className='text-sm text-[#96B0BD]'>
                    Hours
                  </span>
                  <span className='text-xl font-bold text-white'>
                    11
                  </span>
                </div>
                <div className="bg-[#1B272C] w-full py-2 rounded-2xl flex flex-col gap-1 items-center">
                  <span className='text-sm text-[#96B0BD]'>
                    Minutes
                  </span>
                  <span className='text-xl font-bold text-white'>
                    06
                  </span>
                </div>
                <div className="bg-[#1B272C] w-full py-2 rounded-2xl flex flex-col gap-1 items-center">
                  <span className='text-sm text-[#96B0BD]'>
                    Seconds
                  </span>
                  <span className='text-xl font-bold text-white'>
                    52
                  </span>
                </div>
              </div>
            </PanelContainer>
            <PanelContainer>
              <div className="flex flex-col gap-5">
              <span className='text-xl font-bold text-white'>Track Order</span>
                <div className="flex items-center gap-3"> 
                  <IoIosCheckmarkCircle size={30} fill="#DC4F13"/>
                  <span className='text-base text-[#96B0BD] font-bold'>
                    Order Placed
                  </span>
                </div>
                <PiLineVerticalLight size={30} fill="#DC4F13" className="-my-3"/>
                <div className="flex items-center gap-3"> 
                  <GoCircle size={30} fill="#DC4F13"/>
                  <span className='text-base text-[#F5F5F5] font-bold'>
                    Submit requirements
                  </span>
                </div>
              </div>
            </PanelContainer>
            <PanelContainer>
              <div className="flex justify-between">
                <span className='text-lg font-bold text-white'>
                  Private Note
                </span>
                <div className='flex items-center gap-2 cursor-pointer'>
                  <FaPlus fill="#DC4F13" size={15} />
                  <span className='text-[#DC4F13]'>Add Note</span>
                </div>
              </div>
              <span className='text-base text-[#96B0BD] -mt-2'>
                Only visible to you
              </span>
            </PanelContainer>
            <PanelContainer>
              <span className='text-lg font-bold text-white'>
                Support
              </span>
              <div className="flex gap-3 pb-4 border-b border-[#1B272C]">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#1B272C]">
                  <CiCircleQuestion size={25} fill='#8599A5' />
                </div>
                <div className="flex flex-col gap-1">
                  <span className='text-lg font-bold text-white'>FAQs</span>
                  <span className='text-base text-[#96B0BD]'>Find needed answers</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#1B272C]">
                  <CiCircleQuestion size={25} fill='#8599A5' />
                </div>
                <div className="flex flex-col gap-1">
                  <span className='text-lg font-bold text-white'>Resolution Center</span>
                  <span className='text-base text-[#96B0BD]'>Find needed answers</span>
                </div>
              </div>
            </PanelContainer>
          </div>
          <div className="md:hidden">
            <MessagesArea />
          </div>
        </div>
    </Tabs>
  )
}

export default OrderPage