'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { CiFilter, CiReceipt } from 'react-icons/ci';
import { FaClock, FaStar } from 'react-icons/fa';
import { FaArrowRight, FaX } from 'react-icons/fa6';
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
import { useCustomContext } from '@/context/use-custom';
import { useHandleResize } from '@/hooks/useHandleResize';
import api from '@/utils/api';

const DropdownItem = ({ onCheckedChange, ...props }) => {
  return (
    <div className='flex cursor-pointer items-center gap-4 p-0'>
      <Checkbox
        className='rounded border-[#96B0BD] data-[state=checked]:border-orange data-[state=checked]:bg-orange data-[state=checked]:text-white'
        id={props.category_id}
        onCheckedChange={onCheckedChange}
      />
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
  const auth = useCustomContext();

  const handleRecentView = async (gigId) => {
    if (auth?.currentProfile?._id && gigId) {
      try {
        await api.post(`/api/v1/recentView/update_cl_recent_view`, {
          gigId,
          profileId: auth?.currentProfile?._id,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className='flex w-full items-center gap-4 rounded-xl bg-[#10191d] p-4 text-white mobile:flex-col'>
      <div className='relative w-[400px] max-w-full'>
        <img
          alt='Gig Image'
          className='aspect-video w-full rounded-xl object-cover'
          src={`${props.info.gallery?.images[0] ? props.info.gallery?.images[0] : '/assets/images/portfolio_works/portfolio.jpeg'}`}
        />
        <div className='absolute left-2 top-2 flex gap-2'>
          <div className='flex items-center gap-2 rounded-full bg-gray-800 px-2 py-1 text-white'>
            <FaStar fill='#DC4F13' size={16} />
            <p className='flex gap-1 text-[14px] text-[#E0F0F9]'>
              5.5
              <span className='text-[#96b0be]'>(921)</span>
            </p>
          </div>
          <div className='flex items-center gap-2 rounded-full bg-gray-800 px-2 py-1 text-white'>
            <PiShootingStarLight className='text-blue-500' />
            <span className='text-[#96b0be]'>Top Rated</span>
          </div>
        </div>
      </div>
      <div className='flex flex-grow flex-col gap-2'>
        <Link href={`/dashboard/client/job-application/${props.info._id}`} target='_blank'>
          <h3 className='cursor-pointer text-2xl font-semibold text-[#F5F5F5]'>
            {props.info.gigTitle}
          </h3>
        </Link>

        <div className='mt-2 flex items-center gap-5 text-gray-400'>
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
              className='aspect-square rounded-full object-cover'
              height={50}
              src={`${props.info.creator?.avatarURL ? props.info.creator?.avatarURL : '/assets/images/users/user-6.png'}`}
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
            <Link
              href={`/dashboard/client/job-application/${props.info._id}`}
              onClick={() => handleRecentView(props.info?._id)}
              target='_blank'
            >
              <button className='bg-[#DC4F13] px-10 md:px-10 md:py-4'>Order</button>
            </Link>
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
  const [filters, setFilters] = useState([]);
  const { isSmallScreen } = useHandleResize();
  const filterItems = [
    {
      content: [
        { category_id: 'any_amount', category_name: 'Any Amount' },
        { category_id: 'over_1_earned', category_name: '$1+ Earned' },
        { category_id: 'over_100_earned', category_name: '$100+ Earned' },
        { category_id: 'over_1k_earned', category_name: '$1k+ Earned' },
        { category_id: 'over_10k_earned', category_name: '$10k+ Earned' },
        { category_id: 'no_earning_yet', category_name: 'No Earning Yet' },
      ],
      title: 'Earned Amount',
    },
    {
      content: [
        { category_id: 'any_job_success', category_name: 'Any Job Success' },
        { category_id: '80_up', category_name: '80% & UP' },
        { category_id: '90_up', category_name: '90% & UP' },
        { category_id: 'top_rated', category_name: 'Top Rated' },
        { category_id: 'rising_talent', category_name: 'Rising Talent' },
      ],
      title: 'Job Success',
    },
    {
      content: [
        { category_id: 'any_hourly_rate', category_name: 'Any Hourly Rate' },
        { category_id: '10_below', category_name: '$10 and Below' },
        { category_id: '10_30', category_name: '$10 - $30' },
        { category_id: '30_60', category_name: '$30 - $60' },
        { category_id: '60_above', category_name: '$60 and Above' },
      ],
      title: 'Hourly rate',
    },
    {
      content: [
        { category_id: 'over_1_hour', category_name: '1+ Hours Billed' },
        { category_id: 'over_100_hour', category_name: '100+ Hours Billed' },
        { category_id: 'over_1000_hour', category_name: '1000+ Hours Billed' },
      ],
      title: 'Hours billed',
    },
    {
      content: [
        { category_id: 'any_category', category_name: 'Any Category' },
        { category_id: 'customer_service', category_name: 'Customer Service' },
        { category_id: 'design_creative', category_name: 'Design And Creative' },
        { category_id: 'web_mobile_software', category_name: 'Web, Mobile & Software' },
      ],
      title: 'Category',
    },
    {
      content: [
        { category_id: 'any_level', category_name: 'Any Level' },
        { category_id: 'basic', category_name: 'Basic' },
        { category_id: 'conversational', category_name: 'Conversational' },
        { category_id: 'fluent', category_name: 'Fluent' },
        { category_id: 'native_bilingual', category_name: 'Native Or Bilingual' },
      ],
      title: 'English Level',
    },
    {
      content: [
        { category_id: 'freelancers_agencies', category_name: 'Freelancers & Agencies' },
        { category_id: 'freelancers', category_name: 'Freelancers' },
        { category_id: 'agencies', category_name: 'Agencies' },
      ],
      title: 'Talent Type',
    },
    {
      content: [
        { category_id: 'any_time', category_name: 'Any Time' },
        { category_id: '2_weeks', category_name: 'Within 2 Weeks' },
        { category_id: '1_month', category_name: 'Within 1 Month' },
        { category_id: '2_month', category_name: 'Within 2 Month' },
      ],
      title: 'Notice Period',
    },
  ];

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

  const onCheckedChange = (value, id, name) => {
    if (value) {
      setFilters((prev) => [...prev, name]);
    } else {
      setFilters((prev) => prev.filter((item) => item !== name));
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 rounded-xl bg-[#10191d]'>
        <div className='m-3 flex flex-1 gap-2 mobile:m-1'>
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
            className='w-full bg-transparent text-white outline-none mobile:text-sm'
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
          <Popover>
            <PopoverTrigger asChild>
              <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl px-2 transition hover:bg-[#1B272C] mobile:m-1'>
                <CiFilter className='mobile:max-w-4' fill='#96B0BD' size={20} />
                <span className='text-[#96B0BD] mobile:text-sm'>Filter</span>
                <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#DC4F13] text-sm mobile:h-4 mobile:w-4 mobile:text-sm'>
                  4
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align='end'
              className='mt-3 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
            >
              <div className='grid grid-cols-4 gap-4'>
                {filterItems.map((item, index) => {
                  return (
                    <div className='flex flex-col gap-2' key={index}>
                      <div>{item.title}</div>
                      {item.content.map((con, i) => {
                        return (
                          <DropdownItem
                            category_id={con.category_id}
                            category_name={con.category_name}
                            key={i}
                            onCheckedChange={(value) =>
                              onCheckedChange(value, con.category_id, con.category_name)
                            }
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
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
      {filters.length > 0 && (
        <div className='flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
          {filters.map((item, index) => {
            return (
              <span
                className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                key={index}
              >
                <FaX
                  className='rounded-full bg-[#3E525B] p-[2px]'
                  onClick={() => setFilters((prev) => prev.filter((_item) => _item !== item))}
                />
                {item}
              </span>
            );
          })}

          <span className='cursor-pointer' onClick={() => setFilters([])}>
            Clear&nbsp;All
          </span>
        </div>
      )}
      <div className='flex items-center justify-center rounded-xl bg-[#10191d] px-3 py-6 text-lg'>
        Wow! <span className='main_color px-2'>{filteredGigList.length}</span> projects available 😀
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
