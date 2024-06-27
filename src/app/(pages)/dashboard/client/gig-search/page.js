'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { CiFilter, CiReceipt } from 'react-icons/ci';
import { FaClock, FaStar } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { IoChevronDownOutline, IoLocationOutline } from 'react-icons/io5';
import { PiShootingStarLight } from 'react-icons/pi';

import searchOptions from '../freelancers/searchOptions';

import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import api from '@/utils/api';

const DropdownItem = (props) => {
  return (
    <div className='flex items-center gap-4 p-0 cursor-pointer'>
      <Checkbox id={props.category_id} />
      <label className='cursor-pointer text-sm text-[#96B0BD]' htmlFor={props.category_id}>
        {props.category_name}
      </label>
    </div>
  );
};
const DropDownTrigger = (props) => {
  return (
    <PopoverTrigger asChild className='w-full max-w-[500px]'>
      <div className='flex cursor-pointer items-center justify-between rounded-xl bg-[#1B272C] px-6 py-4 text-base text-[#96B0BD]'>
        {props.text}
        <IoChevronDownOutline />
      </div>
    </PopoverTrigger>
  );
};
const GigCard = (props) => {
  const router = useRouter();

  return (
    <div className='flex w-full items-center gap-4 rounded-xl bg-[#10191d] p-4 text-white mobile:flex-col'>
      <div className='relative w-[400px] max-w-full'>
        <img
          alt='Gig Image'
          className='object-cover w-full aspect-video rounded-xl'
          src='/assets/images/portfolio_works/portfolio.jpeg'
        />
        <div className='absolute flex gap-2 left-2 top-2'>
          <div className='flex items-center gap-2 px-2 py-1 text-white bg-gray-800 rounded-full'>
            <FaStar fill='#DC4F13' size={16} />
            <p className='flex gap-1 text-[14px] text-[#E0F0F9]'>
              5.5
              <span className='text-[#96b0be]'>(921)</span>
            </p>
          </div>
          <div className='flex items-center gap-2 px-2 py-1 text-white bg-gray-800 rounded-full'>
            <PiShootingStarLight className='text-blue-500' />
            <span className='text-[#96b0be]'>Top Rated</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-grow gap-2'>
        <h3 className='text-2xl font-semibold text-[#F5F5F5]'>{props.info.gigTitle}</h3>
        <div className='flex items-center gap-5 mt-2 text-gray-400'>
          <div className='flex items-center gap-2'>
            <FaClock size={24} />
            <span className='text-base'>{props.info.gigPrice}</span>
          </div>
          <div className='flex items-center gap-2'>
            <CiReceipt size={28} />
            <span className='text-base'>${props.info.gigPrice}</span>
          </div>
        </div>
        <hr className='my-3 border-[#1B272C]' />
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Image
              alt='Devon Miles'
              className='rounded-full'
              height={50}
              src='/assets/images/users/user-6.png'
              width={50}
            />
            <div className='ml-2'>
              <div className='flex items-center gap-2'>
                <p className='text-2xl font-semibold mobile:text-xl'>
                  {props.info.creator?.fullName}
                </p>
                <BsPatchCheckFill fill='#0b75c2' />
              </div>
              <p className='text-base text-gray-400 mobile:text-sm'>
                {props.info.creator?.location}
              </p>
            </div>
          </div>
          <div className='mt-2 flex-none rounded-xl bg-[#1B272C] p-1 md:mt-0'>
            <button className='p-4 px-10 md:p-5'>Message</button>
            <button
              className='bg-[#DC4F13] px-10 md:px-10 md:py-4'
              onClick={() => router.push(`../client/job-application/${props.info._id}`)}
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GigSearch = () => {
  const [gigList, setGigList] = useState([]);
  const [searchType, setSearchType] = useState('normal');
  const [searchKeywords, setSearchKeyWords] = useState('');
  const [filteredGigList, setFilteredGigList] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsSmallScreen(false);
      } else {
        setIsSmallScreen(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    api
      .get(`/api/v1/freelancer_gig/find_all_gigs`)
      .then((data) => {
        if (data.data.data) {
          setGigList(data.data.data);
          setFilteredGigList(data.data.data);
        }
      })
      .catch((err) => {
        console.error('Error corrupted while getting all gigs: ', err);
      });
  }, []);

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const setKey = (e) => {
    setSearchKeyWords(e.target.value);
    if (searchType == 'normal') {
      const filtered = gigList.filter(
        (gig) =>
          gig.deliveryTime?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.email?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.gigDescription?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.gigPostDate?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.gigPrice?.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.gigTitle?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredGigList(filtered);
    }
  };

  const aiSearch = () => {
    api.get(`/api/v1/freelancer_gig/ai-search/${searchKeywords}`).then((data) => {
      let ai_ids = [];
      if (data.data.profileIDs) ai_ids = data.data.profileIDs;
      const ai_filtered = ai_ids
        .map((id) => gigList.find((gig) => gig._id.toString() === id))
        .filter((gig) => gig != undefined);
      setFilteredGigList(ai_filtered);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      aiSearch();
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 rounded-xl bg-[#10191d]'>
        <div className='flex flex-1 gap-2 m-3 mobile:m-1'>
          <Select defaultValue='normal' onValueChange={(e) => onChangeType(e)}>
            <SelectTrigger className='w-20 rounded-xl bg-[#1B272C] mobile:w-14 mobile:p-2'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='rounded-xl bg-[#1B272C]'>
              <SelectGroup>
                <SelectItem value='normal'>{searchOptions[0].icon}</SelectItem>
                <SelectItem value='ai'>{searchOptions[1].icon}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            className='w-full text-white bg-transparent outline-none mobile:text-sm'
            onChange={(e) => setKey(e)}
            onKeyDown={handleKeyDown}
            placeholder='Search by job title, company, keywords'
          />
        </div>
        <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl transition hover:bg-[#1B272C] mobile:hidden'>
          <IoLocationOutline size={20} stroke='#96B0BD' />
          <span className='text-[#96B0BD]'>Anywhere</span>
        </div>
        {(!isSmallScreen || searchType === 'normal') && (
          <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl transition hover:bg-[#1B272C] mobile:m-1'>
            <CiFilter className='mobile:max-w-4' fill='#96B0BD' size={20} />
            <span className='text-[#96B0BD] mobile:text-sm'>Filter</span>
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#DC4F13] text-sm mobile:h-4 mobile:w-4 mobile:text-sm'>
              4
            </span>
          </div>
        )}
        {searchType === 'ai' && (
          <div className='flex'>
            <button
              class='hidden w-12 items-center justify-center self-stretch rounded-e-[15px] rounded-s-[0px] bg-orange text-lg text-white mobile:flex'
              onClick={aiSearch}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      <div className='flex gap-3 mobile:flex-col'>
        <Popover>
          <DropDownTrigger text='Open' />
          <PopoverContent
            align='start'
            className='flex flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
          >
            <DropdownItem category_id='all_categories' category_name='All Categories' />
            <DropdownItem category_id='social_media_design' category_name='Social Media Design' />
            <DropdownItem category_id='analyst' category_name='Analyst' />
            <DropdownItem category_id='logo_design' category_name='Logo Design' />
            <DropdownItem category_id='web_mobile_design' category_name='Web & Mobile Design' />
            <DropdownItem category_id='animation' category_name='Animation' />
          </PopoverContent>
        </Popover>
        <Popover>
          <DropDownTrigger text='Project Attributes' />
          <PopoverContent
            align='start'
            className='flex flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
          >
            <DropdownItem category_id='attribute_1' category_name='Option 1' />
            <DropdownItem category_id='attribute_2' category_name='Option 2' />
          </PopoverContent>
        </Popover>
        <Popover>
          <DropDownTrigger text='Price' />
          <PopoverContent
            align='start'
            className='flex flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
          >
            <DropdownItem category_id='100-200' category_name='$100 - $200' />
            <DropdownItem category_id='200-300' category_name='$200 - $300' />
            <DropdownItem category_id='300-400' category_name='$300 - $400' />
            <DropdownItem category_id='300-400' category_name='$400 - $500' />
            <DropdownItem category_id='1000-3000' category_name='$1000 - $3000' />
            <DropdownItem category_id='5000-10000' category_name='$5000 - $10 000' />
            <DropdownItem category_id='5000-10000' category_name='+ $2000' />
          </PopoverContent>
        </Popover>
        <Popover>
          <DropDownTrigger text='Choose Category' />
          <PopoverContent
            align='start'
            className='flex flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
          >
            {Array.from({ length: 10 }, (_, i) => (
              <DropdownItem
                category_id=''
                category_name={i + 1 + ` day${i + 1 > 1 ? 's' : ''}`}
                key={i + 1}
              />
            ))}
            <DropdownItem category_id='2_months' category_name='+ 14 days' />
          </PopoverContent>
        </Popover>
        <Popover>
          <DropDownTrigger text='Talent Details' />
          <PopoverContent
            align='end'
            className='flex flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
          >
            <DropdownItem category_id='option_1' category_name='Option 1' />
            <DropdownItem category_id='option_2' category_name='Option 2' />
            <DropdownItem category_id='option_3' category_name='Option 3' />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex items-center justify-center rounded-xl bg-[#10191d] px-3 py-6 text-lg'>
        Wow! <span className='px-2 main_color'>{filteredGigList.length}</span> projects available 😀
      </div>
      {/*
       * These should be dynamic, you can pass all the data you need through attributes and retrieve it on the component
       */}
      {filteredGigList.map((gig, index) => {
        return <GigCard info={gig} key={index} />;
      })}
      {/* <GigCard />
      <GigCard />
      <GigCard /> */}
      <div className='mx-auto mt-4 w-full max-w-full cursor-pointer rounded-xl border border-[#aaaaaaaa] px-10 py-5 text-center transition hover:bg-white hover:text-black md:text-xl mobile:px-5'>
        Load more +
      </div>
    </div>
  );
};

export default GigSearch;
