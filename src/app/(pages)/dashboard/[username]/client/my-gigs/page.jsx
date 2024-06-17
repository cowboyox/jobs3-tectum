import React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link'; 
import { CiSearch } from "react-icons/ci";
import { RiRobot2Line } from "react-icons/ri"; 
import { CiFilter } from "react-icons/ci"; 
import { CiReceipt } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";

const Status = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'published':
        return 'border-green-500 text-green-500';
      case 'declined':
        return 'border-red-500 text-red-500';
      default:
        return 'border-gray-500 text-gray-500';
    }
  };

  return (
    <div className={`border text-sm rounded py-1 px-2 capitalize ${getStatusStyles()}`}>
      {status}
    </div>
  );
};
const gigData = [
  {
    title: 'Digital interface for finance project',
    date: 'May 15 - Present',
    price: 400,
    status: 'published',
  },
  {
    title: 'Website redesign for local business',
    date: 'Apr 10 - May 14',
    price: 250,
    status: 'declined',
  },
  {
    title: 'Mobile app development',
    date: 'Mar 01 - Apr 09',
    price: 600,
    status: 'published',
  },
  {
    title: 'E-commerce platform setup',
    date: 'Feb 01 - Feb 28',
    price: 350,
    status: 'draft',
  },
  {
    title: 'Corporate branding project',
    date: 'Jan 01 - Jan 31',
    price: 500,
    status: 'published',
  },
  {
    title: 'SEO optimization',
    date: 'Dec 01 - Dec 31',
    price: 200,
    status: 'declined',
  },
  {
    title: 'Social media marketing campaign',
    date: 'Nov 01 - Nov 30',
    price: 300,
    status: 'published',
  },
  {
    title: 'Custom software development',
    date: 'Oct 01 - Oct 31',
    price: 800,
    status: 'draft',
  },
  {
    title: 'Cloud migration service',
    date: 'Sep 01 - Sep 30',
    price: 700,
    status: 'published',
  },
  {
    title: 'Data analysis project',
    date: 'Aug 01 - Aug 31',
    price: 450,
    status: 'declined',
  },
  {
    title: 'UI/UX design for mobile app',
    date: 'Jul 01 - Jul 31',
    price: 600,
    status: 'published',
  },
  {
    title: 'Network infrastructure setup',
    date: 'Jun 01 - Jun 30',
    price: 900,
    status: 'draft',
  },
  {
    title: 'Technical support and maintenance',
    date: 'May 01 - May 31',
    price: 250,
    status: 'published',
  },
  {
    title: 'Digital marketing strategy',
    date: 'Apr 01 - Apr 30',
    price: 400,
    status: 'declined',
  },
];
const GigCard = ({ gig }) => {
  return (
    <div className="flex p-7 justify-between rounded-xl bg-[#10191d] mb-4 mobile:flex-col-reverse mobile:gap-3 mobile:p-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-white text-xl">
          {gig.title}
        </h2>
        <div className="flex items-center gap-5 mt-2 text-gray-400">
          <div className="flex items-center gap-2">
            <CiClock2 size={24} />
            <span className="text-base">{gig.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <CiReceipt size={28} />
            <span className="text-base">${gig.price}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-start mobile:justify-between">
        <Status status={gig.status} />
        <BsThreeDots className="h-8 w-8 p-2 flex items-center justify-center rounded-full hover:bg-slate-700 transition cursor-pointer" />
      </div>
    </div>
  );
};
const MyGigs = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-stretch gap-5 mobile:flex-col"> 
        <div className="flex gap-2 p-1 flex-grow mobile:p-1 bg-[#10191d] rounded-xl">
          <Select defaultValue='normal'>
            <SelectTrigger className='bg-[#1B272C] md:h-14 w-20 mobile:w-14 mobile:p-2 rounded-xl' >
              <SelectValue/>
            </SelectTrigger>
            <SelectContent className='bg-[#1B272C] rounded-xl'>
              <SelectGroup> 
                <SelectItem value="normal">
                  <CiSearch size={20}className='mobile:max-w-4'/>
                </SelectItem>
                <SelectItem value="ai">
                  <RiRobot2Line size={20}className='mobile:max-w-4'/>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input 
            className='w-full bg-transparent text-white outline-none mobile:text-sm'
            placeholder='Search by job title, company, keywords' 
          /> 
          <div className="px-3 flex items-center gap-3 cursor-pointer hover:bg-[#1B272C] rounded-xl transition mobile:p-1">
            <CiFilter fill="#96B0BD" size={20} className='mobile:max-w-4' />
            <span className='text-[#96B0BD] mobile:text-sm'>
              Filter
            </span>
            <span className='bg-[#DC4F13] w-5 h-5 text-sm flex items-center justify-center rounded-full mobile:text-sm mobile:w-4 mobile:h-4'>
              4
            </span>
          </div>
        </div>
        <Link href="./portfolio/create" className="p-1 rounded-xl cursor-pointer text-base transition bg-[#DC4F13] hover:bg-white hover:text-black mobile:w-full mobile:text-center flex items-center w-40 text-center justify-center mobile:py-2">
          Post a New Gig 
        </Link> 
      </div>
      <div className="flex flex-col">
        {gigData.map((gig, index) => (
          <GigCard key={index} gig={gig} />
        ))}
      </div>
      <div className="py-5 md:text-xl hover:bg-white transition hover:text-black px-10 w-full max-w-full rounded-xl mobile:px-5 border border-[#aaaaaaaa] text-center mx-auto cursor-pointer">Load more +</div>
    </div>
  )
}

export default MyGigs