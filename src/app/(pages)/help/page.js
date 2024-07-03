/*-----------------------------|
|   Core React library         |
|-----------------------------*/
import React from 'react';

/*---------------------------------|
|   UI Components from project     |
|---------------------------------*/
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import NewLayout from '@/components/layout/newLayout';

/*-------------------------------|
|   Icons from react-icons       |
|-------------------------------*/
import { CiSearch } from "react-icons/ci";
import { RiRobot3Line } from "react-icons/ri";
import { CiDesktop } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { BiCube } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { RiNewspaperLine } from "react-icons/ri";
import { RiShieldKeyholeLine } from "react-icons/ri";


const helpData = [
  {
    id: 0,
    title: 'Get Started',
    icon: <CiDesktop size={30} className="stroke-[#96B0BD] fill-[#96B0BD]" />,
    description: 'How It Works, Getting Started, Fees & Protection'
  },
  {
    id: 1,
    title: 'Your Account',
    icon: <CiUser size={30} className="stroke-[#96B0BD] fill-[#96B0BD]" />,
    description: 'Profile, Account Settings, Verification & Security'
  },
  {
    id: 2,
    title: 'Gigs',
    icon: <BiCube size={30} className="stroke-[#96B0BD] fill-[#96B0BD]" />,
    description: 'Creating, Managing, Promoting & Selling Gigs'
  }, 
  {
    id: 3,
    title: 'Payments & withdrawals',
    icon: <MdOutlinePayment size={30} className="stroke-[#96B0BD] fill-[#96B0BD]" />,
    description: 'Payment methods, Withdrawals, Fees & Protection'
  },
  {
    id: 4,
    title: 'Order management',
    icon: <RiNewspaperLine size={30} className="stroke-[#96B0BD] fill-[#96B0BD]" />,
    description: 'Order management, Delivery, Disputes & Protection'
  },
  {
    id: 5,
    title: 'Regulations & guidelines',
    icon: <RiShieldKeyholeLine size={30} className="stroke-[#96B0BD] fill-[#96B0BD]" />,
    description: 'Terms of Service, Privacy Policy, Community Standards'
  }
]
const suggestedArticlesData = [
  {
    id: 0,
    title: 'Profile Application Desclined',
    description: 'How It Works, Getting Started, Fees & Protection',
  }, 
  {
    id: 1,
    title: 'Edit Account Information',
    description: 'How It Works, Getting Started, Fees & Protection',
  },
  {
    id: 2,
    title: 'Profile Tips and Best Practices',
    description: 'How It Works, Getting Started, Fees & Protection',
  },
  {
    id: 3,
    title: 'Manage how you get Paid',
    description: 'How It Works, Getting Started, Fees & Protection',
  },
  {
    id: 4,
    title: 'Wallet Issues',
    description: 'How It Works, Getting Started, Fees & Protection',
  },
  {
    id: 5,
    title: 'Onboarding and creating account',
    description: 'How It Works, Getting Started, Fees & Protection',
  },
]

const EmtpyComponent = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full gap-3 py-20 border border-slate-600 rounded-xl'>
      <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
      <p className='text-[18px] text-slate-600'>Freelancer proposals will be here</p>
    </div>
  )
}
const HelpSupport = () => {
  return (
    <NewLayout>
      <div className='bg-[url("/assets/images/artBG.jpeg")] rounded-b-[40px] bg-cover bg-center h-80 mobile:h-auto mobile:py-16 flex'>
        <div className='max-w-7xl mx-auto flex flex-col gap-3 justify-center my-auto w-full px-3'>
          <h1 className='text-4xl text-white text-center font-bold'>Need help?</h1>
          <div className='m-3 h-auto flex flex-1 gap-4 p-2 rounded-xl mobile:m-1 bg-[#10191D]'>
            <Select defaultValue='normal'>
              <SelectTrigger className='w-20 rounded-xl bg-[#1B272C] mobile:w-14 text-lg mobile:p-2 h-12'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='rounded-xl bg-[#1B272C]'>
                <SelectGroup>
                  <SelectItem value='normal'><CiSearch size={25} /></SelectItem>
                  <SelectItem value='ai'><RiRobot3Line size={25} /></SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <input
              className='w-full bg-transparent text-white outline-none mobile:text-sm h-12 text-lg' 
              placeholder='Search'
            />
          </div>
          <div className='flex gap-3 items-center'>
            <span className='text-white text-xl mobile:text-base'>Popular :</span>
            <span className='px-3 whitespace-normal py-1 bg-[#1a272c] cursor-pointer transition hover:bg-black rounded-full mobile:text-sm'>Order</span>
            <span className='px-3 whitespace-normal py-1 bg-[#1a272c] cursor-pointer transition hover:bg-black rounded-full mobile:text-sm'>Get paid</span>
            <span className='px-3 whitespace-normal py-1 bg-[#1a272c] cursor-pointer transition hover:bg-black rounded-full mobile:text-sm'>Account</span>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto py-20'>
        <Tabs className='w-full' defaultValue='freelancer'>
          <TabsList className='bg-transparent h-auto w-full mb-5'>
            <TabsTrigger 
              className='w-full h-24 flex items-center bg-transparent border-b-2 border-[#516170] data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent text-[22px] mobile:text-sm mobile:h-16' 
              value="freelancer">
                Freelancer
            </TabsTrigger>
            <TabsTrigger 
              className='w-full h-24 flex items-center bg-transparent border-b-2 border-[#516170] data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent text-[22px] mobile:text-sm mobile:h-16' 
              value="client">
                Client
            </TabsTrigger>
            <TabsTrigger 
              className='w-full h-24 flex items-center bg-transparent border-b-2 border-[#516170] data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent text-[22px] mobile:text-sm mobile:h-16' 
              value="employee">
                Employee
            </TabsTrigger>
            <TabsTrigger 
              className='w-full h-24 flex items-center bg-transparent border-b-2 border-[#516170] data-[state=active]:border-[#dc4f14] data-[state=active]:bg-transparent text-[22px] mobile:text-sm mobile:h-16' 
              value="employer">
                Employer
            </TabsTrigger>
          </TabsList>
          <div className='mobile:px-4'>
            <TabsContent value='freelancer'> 
              <div className='grid grid-cols-3 mobile:grid-cols-1 gap-5'>
                {
                  helpData.map((data) => (
                    <div key={data.id} className='w-full p-7 mobile:p-4 rounded-xl bg-[#10191D] flex flex-col gap-3'>
                      <div className='flex items-center gap-4'>
                        <div className='h-14 w-14 bg-[#1B272C] flex items-center justify-center rounded-full'>
                          {data.icon}
                        </div>
                        <span className='text-xl font-bold text-white mobile:text-lg'>{data.title}</span>
                      </div>
                      <div className='border-t border-[#28373E]' />
                      <p className='text-[#96B0BD] text-sm'>{data.description}</p>
                    </div>
                  ))
                }
              </div>
            </TabsContent> 
            <TabsContent value="client">
              <EmtpyComponent />
            </TabsContent>
            <TabsContent value="employee">
              <EmtpyComponent />
            </TabsContent>
            <TabsContent value="employer">
              <EmtpyComponent />
            </TabsContent>
          </div>
        </Tabs>
        <h2 className='my-10 text-2xl text-[#F5F5F5] font-bold mobile:px-4'>
          Suggested Articles
        </h2>
        <div className='grid grid-cols-3 mobile:grid-cols-1 gap-5 mobile:px-4'>
          {
            suggestedArticlesData.map((data) => (
              <div key={data.id} className='w-full p-7 mobile:p-4 rounded-xl bg-[#10191D] flex flex-col gap-3'>
                <span className='text-xl font-bold text-[#F5F5F5]'>{data.title}</span>
                <p className='text-[#96B0BD] text-sm'>{data.description}</p>
              </div>
            ))
          }
        </div>
        <div className='py-14 mobile:py-10 bg-[#10191D] rounded-xl mt-10 mobile:rounded-none'>
          <div className='w-full max-w-6xl mx-auto flex gap-2 items-center justify-between mobile:flex-col mobile:items-start mobile:px-6'>
            <div className='w-auto max-w-[80%] flex flex-col gap-3'>
              <h2 className='text-4xl mobile:text-2xl text-[#F5F5F5] font-bold'>
                Can't find what you're looking for?
              </h2>
              <p className='text-[#6A828D] text-base'>
                We are here to help
              </p>
            </div>
            <div className="whitespace-nowrap px-20 rounded-2xl bg-[#DC4F13] transition hover:bg-[#c2440e] text-[#F5F5F5] py-5 mobile:py-3 text-center cursor-pointer mobile:w-full mobile:rounded-[6px] mobile:mt-4">
              Contact us
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  )
}

export default HelpSupport
