'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CiCircleQuestion } from 'react-icons/ci';
import { FaAngleDown, FaPlus } from 'react-icons/fa6';
import { GoCircle } from 'react-icons/go';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiLineVerticalLight } from 'react-icons/pi';

import DropFile from '@/components/elements/dropFile';
import PanelContainer from '@/components/elements/panel';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCustomContext } from '@/context/use-custom';
import { useGetClientGigContractById } from '@/hooks/useGetClientGigContractById';

const MessagesArea = () => {
  const auth = useCustomContext();

  return (
    <PanelContainer>
      <div className='flex flex-col gap-4'>
        <div className='space-between flex'>
          <div className='flex w-1/2 gap-5 mobile:w-7/12 mobile:gap-2'>
            <img
              className='aspect-square h-12 w-12 rounded-full object-cover mobile:h-8 mobile:w-8'
              src={
                auth?.currentProfile?.avatarURL
                  ? auth?.currentProfile?.avatarURL
                  : '/assets/images/users/user-1.png'
              }
            />
            <div className='flex cursor-pointer items-center gap-2 mobile:gap-1'>
              <span className='text-base mobile:text-xs'>Use a quick response</span>
              <FaAngleDown />
            </div>
          </div>
          <div className='flex w-1/2 items-center justify-end gap-3 mobile:w-5/12'>
            <span className='text-base text-[#96B0BD] mobile:text-xs'>Local time:</span>
            <span className='text-base text-white mobile:text-xs'>4:25 pm</span>
          </div>
        </div>
        <textarea
          className='h-80 rounded-2xl border border-[#526872] bg-transparent p-5 text-white'
          placeholder='Type your message here...'
        />
        <div className='flex gap-3 rounded-2xl bg-[#1B272C] p-2'>
          <div className='w-full cursor-pointer rounded-2xl py-5 text-center text-white transition hover:bg-white hover:text-black mobile:py-3'>
            Back
          </div>
          <div className='w-full cursor-pointer rounded-2xl bg-[#DC4F13] py-5 text-center text-white mobile:py-3'>
            Send
          </div>
        </div>
      </div>
    </PanelContainer>
  );
};
const OrderPage = ({ params }) => {
  const { data: contractRawData } = useGetClientGigContractById(params.id);
  const contractInfo = contractRawData?.data?.data;

  const startDateString = contractInfo?.contractStartDate;
  const date = new Date(startDateString);
  const options = {
    day: 'numeric',
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedStartDate = date.toLocaleString('en-US', options); // Output: "Jun 26, 2024, 5:23 PM"

  const form = useForm();
  return (
    <Tabs className='flex w-full flex-col gap-6' defaultValue='details'>
      <TabsList className='h-auto w-full bg-transparent p-0'>
        <TabsTrigger
          className='w-full border-b-4 border-[#516170] bg-transparent py-6 text-base data-[state=active]:border-[#dc4f14]'
          value='details'
        >
          Details
        </TabsTrigger>
        <TabsTrigger
          className='w-full border-b-4 border-[#516170] bg-transparent py-6 text-base data-[state=active]:border-[#dc4f14]'
          value='requirements'
        >
          Requirements
        </TabsTrigger>
      </TabsList>
      <div className='flex gap-8 mobile:flex-col'>
        <div className='w-8/12 mobile:w-full'>
          <TabsContent className='w-full' value='details'>
            <div className='flex w-full flex-col gap-5'>
              <PanelContainer>
                <div className='text-[24px] text-white mobile:text-xl'>
                  {contractInfo?.clientGig?.gigTitle}
                </div>
                <div className='flex w-full items-center gap-2 md:w-3/4 md:gap-5'>
                  <div className='relative h-12 w-12 mobile:h-8 mobile:w-8'>
                    <img
                      className='aspect-square h-full w-full rounded-full object-cover'
                      src={
                        contractInfo?.freelancer?.avatarURL
                          ? contractInfo?.freelancer?.avatarURL
                          : '/assets/images/users/user-3.png'
                      }
                    />
                    <div className='absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 mobile:bottom-0 mobile:right-0 mobile:h-3 mobile:w-3' />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                      <h2 className='text-xl mobile:text-xs'>
                        {contractInfo?.freelancer?.fullName}
                      </h2>
                      <img
                        className='aspect-square h-full w-full rounded-full object-cover'
                        src={
                          contractInfo?.proposer?.avatarURL
                            ? contractInfo?.proposer?.avatarURL
                            : '/assets/images/users/user-3.png'
                        }
                      />
                      <div className='absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 mobile:bottom-0 mobile:right-0 mobile:h-3 mobile:w-3' />
                    </div>
                    <div className='flex flex-col gap-4'>
                      <div className='flex items-center gap-2'>
                        <h2 className='text-xl mobile:text-xs'>
                          {contractInfo?.proposer?.fullName}
                        </h2>
                        <img
                          className='h-4 w-4 mobile:h-3 mobile:w-3'
                          src='/assets/images/icons/checkmark.svg'
                        />
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <IoCalendarOutline className='h-5 w-5 fill-[#96B0BD] stroke-[#96B0BD] mobile:h-3 mobile:w-3' />
                      <p className='text-[15px] text-[#96B0BD] mobile:text-xs'>
                        {formattedStartDate}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <IoCalendarOutline className='h-5 w-5 fill-[#96B0BD] stroke-[#96B0BD] mobile:h-3 mobile:w-3' />
                    <p className='text-[15px] text-[#96B0BD] mobile:text-xs'>
                      {formattedStartDate}
                    </p>
                  </div>
                </div>
                <PanelContainer nested={true}>
                  <div className='space-between flex items-center gap-4'>
                    <span className='text-base text-[#96B0BD] mobile:text-xs'>Order number</span>
                    <span className='text-base font-bold text-white mobile:text-xs'>
                      #{params.id}
                    </span>
                    <div className='ml-auto rounded-xl border border-[#1BBF36] px-2 py-1 text-sm text-[#1BBF36] mobile:text-xs'>
                      {contractInfo?.status}
                    </div>
                  </div>
                </PanelContainer>
                <PanelContainer nested={true}>
                  <div className='flex flex-col gap-5'>
                    <div className='flex'>
                      <div className='w-8/12'>
                        <div className='flex flex-col gap-2'>
                          <span className='text-base text-[#96B0BD] mobile:text-xs'>Item</span>
                          <span className='text-base font-bold text-white mobile:text-xs'>
                            Design UI/UX design for your mobile apps
                          </span>
                        </div>
                      </div>
                      <div className='w-2/12'>
                        <div className='flex flex-col gap-2'>
                          <span className='text-base text-[#96B0BD] mobile:text-xs'>Duration</span>
                          <span className='text-base font-bold text-white mobile:text-xs'>
                            2 days
                          </span>
                        </div>
                      </div>
                      <div className='w-2/12'>
                        <div className='flex flex-col items-end gap-2'>
                          <span className='text-base text-[#96B0BD] mobile:text-xs'>Price</span>
                          <span className='text-base font-bold text-white mobile:text-xs'>
                            ${contractInfo?.clientGig?.gigPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='w-full border-t border-[#28373E]' />
                    <div className='flex justify-between rounded-xl bg-[#10191D] p-4'>
                      <span className='text-base font-bold text-white'>Total</span>
                      <span className='text-base font-bold text-white'>
                        ${contractInfo?.clientGig?.gigPrice}
                      </span>
                    </div>
                  </div>
                </PanelContainer>
              </PanelContainer>
              <div className='mobile:hidden'>
                <MessagesArea />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='requirements'>
            <Form {...form}>
              <form>
                <PanelContainer>
                  <span className='text-2xl font-bold text-white mobile:text-xl mobile:font-normal'>
                    Brief about the project
                  </span>
                  <textarea className='h-80 rounded-2xl border border-[#526872] bg-transparent p-5 text-white' />
                  <div className='mt-5 text-3xl text-[#F5F5F5] mobile:text-xl'>
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
        <div className='flex w-4/12 flex-col gap-5 mobile:w-full'>
          <PanelContainer>
            <span className='text-xl font-bold text-white'>Time left</span>
            <div className='flex gap-2'>
              <div className='flex w-full flex-col items-center gap-1 rounded-2xl bg-[#1B272C] py-2'>
                <span className='text-sm text-[#96B0BD]'>Days</span>
                <span className='text-xl font-bold text-white'>01</span>
              </div>
              <div className='flex w-full flex-col items-center gap-1 rounded-2xl bg-[#1B272C] py-2'>
                <span className='text-sm text-[#96B0BD]'>Hours</span>
                <span className='text-xl font-bold text-white'>11</span>
              </div>
              <div className='flex w-full flex-col items-center gap-1 rounded-2xl bg-[#1B272C] py-2'>
                <span className='text-sm text-[#96B0BD]'>Minutes</span>
                <span className='text-xl font-bold text-white'>06</span>
              </div>
              <div className='flex w-full flex-col items-center gap-1 rounded-2xl bg-[#1B272C] py-2'>
                <span className='text-sm text-[#96B0BD]'>Seconds</span>
                <span className='text-xl font-bold text-white'>52</span>
              </div>
            </div>
          </PanelContainer>
          <PanelContainer>
            <div className='flex flex-col gap-5'>
              <span className='text-xl font-bold text-white'>Track Order</span>
              <div className='flex items-center gap-3'>
                <IoIosCheckmarkCircle fill='#DC4F13' size={30} />
                <span className='text-base font-bold text-[#96B0BD]'>Order Placed</span>
              </div>
              <PiLineVerticalLight className='-my-3' fill='#DC4F13' size={30} />
              <div className='flex items-center gap-3'>
                <GoCircle fill='#DC4F13' size={30} />
                <span className='text-base font-bold text-[#F5F5F5]'>Submit requirements</span>
              </div>
            </div>
          </PanelContainer>
          <PanelContainer>
            <div className='flex justify-between'>
              <span className='text-lg font-bold text-white'>Private Note</span>
              <div className='flex cursor-pointer items-center gap-2'>
                <FaPlus fill='#DC4F13' size={15} />
                <span className='text-[#DC4F13]'>Add Note</span>
              </div>
            </div>
            <span className='-mt-2 text-base text-[#96B0BD]'>Only visible to you</span>
          </PanelContainer>
          <PanelContainer>
            <span className='text-lg font-bold text-white'>Support</span>
            <div className='flex gap-3 border-b border-[#1B272C] pb-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#1B272C]'>
                <CiCircleQuestion fill='#8599A5' size={25} />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-bold text-white'>FAQs</span>
                <span className='text-base text-[#96B0BD]'>Find needed answers</span>
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#1B272C]'>
                <CiCircleQuestion fill='#8599A5' size={25} />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-bold text-white'>Resolution Center</span>
                <span className='text-base text-[#96B0BD]'>Find needed answers</span>
              </div>
            </div>
          </PanelContainer>
        </div>
        <div className='md:hidden'>
          <MessagesArea />
        </div>
      </div>
    </Tabs>
  );
};

export default OrderPage;
