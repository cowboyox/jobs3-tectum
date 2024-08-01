'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/*------------- ShadCN imports -------------*/
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

/*------------- Icons -------------*/
import { CiSearch } from 'react-icons/ci';
import { VscRobot } from 'react-icons/vsc';
import { IoLocationOutline } from 'react-icons/io5';
import { FilterIcon } from '@/components/elements/svgs/FilterIcon';

const SearchBar = () => {
  const filterCategories = [
    {
      content: [
        { category_id: 'earned_any', category_name: 'Any Earned' },
        { category_id: 'earned_1_plus', category_name: '$1+ Earned' },
        { category_id: 'earned_100_plus', category_name: '$100+ Earned' },
        { category_id: 'earned_1k_plus', category_name: '$1k+ Earned' },
        { category_id: 'earned_10k_plus', category_name: '$10k+ Earned' },
      ],
      title: 'Earned Amount',
    },
    {
      content: [
        { category_id: 'languages_any', category_name: 'Any Language' },
        { category_id: 'languages_english', category_name: 'English' },
        { category_id: 'languages_german', category_name: 'German' },
        { category_id: 'languages_russian', category_name: 'Russian' },
        { category_id: 'languages_spanish', category_name: 'Spanish' },
        { category_id: 'languages_portuguese', category_name: 'Portuguese' },
      ],
      title: 'Languages',
    },
    {
      content: [
        { category_id: 'hourlyRate_any', category_name: 'Any Rate' },
        { category_id: 'hourlyRate_10_below', category_name: '$10 and Below' },
        { category_id: 'hourlyRate_10_30', category_name: '$10 - $30' },
        { category_id: 'hourlyRate_30_60', category_name: '$30 - $60' },
        { category_id: 'hourlyRate_60_above', category_name: '$60 and Above' },
      ],
      title: 'Hourly Rate',
    },
    {
      content: [
        { category_id: 'hoursBilled_1_plus', category_name: '1+ Hours Billed' },
        { category_id: 'hoursBilled_100_plus', category_name: '100+ Hours Billed' },
        { category_id: 'hoursBilled_1000_plus', category_name: '1000+ Hours Billed' },
      ],
      title: 'Hours Billed',
    },
    {
      content: [
        { category_id: 'jobSuccess_any', category_name: 'Any Score' },
        { category_id: 'jobSuccess_80_up', category_name: '80% & UP' },
        { category_id: 'jobSuccess_90_up', category_name: '90% & UP' },
      ],
      title: 'Job Success',
    },
  ];

  return (
    <div className='flex gap-2 mobile:gap-1 rounded-xl bg-[#10191D] p-2'>
      <Select default='classic'>
        <SelectTrigger className='h-12 w-20 rounded-xl bg-[#1a272c] mobile:max-w-16'>
          <SelectValue placeholder={<CiSearch size={25} className='mobile:h-5 mobile:w-5' />} />
        </SelectTrigger>
        <SelectContent className='!max-w-8 rounded-xl bg-[#1a272c] p-2'>
          <SelectItem className='rounded px-1' value='classic'>
            <CiSearch size={25} />
          </SelectItem>
          <SelectItem className='rounded px-1' value='ai'>
            <VscRobot size={25} />
          </SelectItem>
        </SelectContent>
      </Select>
      <div className='m-3 flex flex-1 items-center gap-3'>
        <input className='w-full bg-transparent outline-none mobile:text-xs' placeholder='Search by job title, company, keywords' type='text' />
      </div>
      <Popover>
        <PopoverTrigger>
          <div className='flex h-full cursor-pointer items-center gap-3 rounded-xl px-2 transition hover:bg-[#1B272C] mobile:m-0'>
            <IoLocationOutline size={20} stroke='#96B0BD' />
            <span className='text-[#96B0BD] mobile:hidden'>Anywhere</span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align='end'
          className='mt-3 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] p-4'
        >
          <div className='country-list max-h-[300px] overflow-y-auto'>
            <div className='sticky top-0 mb-4 flex bg-[#1B272C]'>
              <input className='relative w-full rounded-full border-2 border-[#96B0BD] bg-transparent py-2 pl-10 text-[#96B0BD] outline-none mobile:text-sm' />
              <svg
                className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2'
                fill='none'
                stroke='currentColor'
                strokeWidth={1.5}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-[#96B0BD]'>No results found</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className='flex flex-none flex-row items-center gap-2 px-4'>
        <Popover>
          <PopoverTrigger asChild>
            <button className='flex flex-row items-center justify-center gap-3'>
              <FilterIcon isFiltered={false} />
              <div className='flex flex-row gap-2 mobile:hidden'>
                <div>Filter</div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align='end'
            className='mt-4 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
          >
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
              {filterCategories.map((item, index) => {
                return (
                  <div className='flex flex-col gap-2' key={index}>
                    <div>{item.title}</div>
                    {item.content.map((con, i) => {
                      return (
                        <div className='flex cursor-pointer items-center gap-4 p-1' key={i}>
                          <Checkbox
                            className='rounded border-[#96B0BD] data-[state=checked]:border-orange data-[state=checked]:bg-orange data-[state=checked]:text-white'
                            id={con.category_id}
                          />
                          <label
                            className='cursor-pointer text-sm text-[#96B0BD]'
                            htmlFor={con.category_id}
                          >
                            {con.category_name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const FindStaff = () => {
  const staffData = [
    {
      id: 0,
      name: 'Devon Miles',
      location: 'Yogyakarta, Indonesia',
      description: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My missio...",
      image: '/assets/images/users/landing-page-user-1.png', 
      profession: 'Front-End Developer',
      topRated: true,
      jobSuccess: 96,
      skills: ['UI/UX', 'Design', 'Webdesign'],
      recentlyViewed: true,
      isVerified: true,
    },
    {
      id: 1,
      name: 'Devon Miles',
      location: 'Yogyakarta, Indonesia',
      description: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My missio...",
      image: '/assets/images/users/landing-page-user-1.png',
      profession: 'Front-End Developer',
      topRated: true,
      jobSuccess: 96,
      skills: ['UI/UX', 'Design', 'Webdesign'],
      recentlyViewed: true,
      isVerified: true,
    },
    {
      id: 2,
      name: 'Devon Miles',
      location: 'Yogyakarta, Indonesia',
      description: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My missio...",
      image: '/assets/images/users/landing-page-user-1.png',
      profession: 'Front-End Developer',
      topRated: true,
      jobSuccess: 96,
      skills: ['UI/UX', 'Design', 'Webdesign'],
      recentlyViewed: true,
      isVerified: true,
    },
    {
      id: 3,
      name: 'Devon Miles',
      location: 'Yogyakarta, Indonesia',
      description: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My missio...",
      image: '/assets/images/users/landing-page-user-1.png',
      profession: 'Front-End Developer',
      topRated: true,
      jobSuccess: 96,
      skills: ['UI/UX', 'Design', 'Webdesign'],
    },
    {
      id: 4,
      name: 'Devon Miles',
      location: 'Yogyakarta, Indonesia',
      description: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My missio...",
      image: '/assets/images/users/landing-page-user-1.png',
      profession: 'Front-End Developer',
      topRated: true,
      jobSuccess: 96,
      skills: ['UI/UX', 'Design', 'Webdesign'],
    },
    {
      id: 5,
      name: 'Devon Miles',
      location: 'Yogyakarta, Indonesia',
      description: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My missio...",
      image: '/assets/images/users/landing-page-user-1.png',
      profession: 'Front-End Developer',
      topRated: true,
      jobSuccess: 96,
      skills: ['UI/UX', 'Design', 'Webdesign'],
    }
  ]
  return (
    <div className='py-8 flex flex-col gap-7'>
      <SearchBar />  
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold text-white mobile:text-xl'>Based on your browsing history</h2>
        <div className='grid grid-cols-3 gap-3 mobile:grid-cols-1'>
          {staffData.map((staff) => 
            staff.recentlyViewed && (
              <div className='flex flex-col gap-4 rounded-xl bg-[#10191D] p-7 mobile:p-4' key={staff.id}>
                <div className='flex gap-4'>
                  <div className='flex items-center gap-2'>
                    <Image height={25} width={25} src='/assets/icons/svgs/top-rated.svg' />
                    {staff.topRated && <span className='text-sm text-[#E0F0F9]'>Top Rated</span>}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Image height={22} width={22} src='/assets/icons/svgs/job-success.svg' />
                    {staff.jobSuccess > 0 && (
                      <span className='text-sm text-[#E0F0F9]'>{staff.jobSuccess}% Job Success</span>
                    )}
                  </div>
                </div>
                <div class='flex flex-wrap gap-2'>
                  {staff.skills.map((skill, indx) => 
                    <span className='border text-xs text-[#F5F5F5] border-[#3E525B] bg-[#1B272C] px-2 py-1 rounded-full' key={indx}>{skill}</span>
                  )}
                </div>
                <div className="h-[1px] w-full bg-[#1B272C]" />
                <div className='flex gap-4'>
                  <Image 
                    src={staff.image}
                    className='rounded-full object-cover w-14 h-14'
                    width={50} 
                    height={50} 
                  />
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-2'>
                      <span className='text-[#F5F5F5] text-base'> {staff.name} </span>
                      { staff.isVerified && <Image height={22} width={22} src='/assets/icons/svgs/verified.svg' /> }
                    </div>
                    <span className='text-[#516170]'>{staff.location}</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold text-white'>People you may like</h2>
        <div className='grid grid-cols-2 gap-3 mobile:grid-cols-1'>
          {staffData.map((staff) => 
            <div className='flex flex-col gap-4 rounded-xl bg-[#10191D] p-7 mobile:p-4' key={staff.id}>
              <div className='flex gap-4'>
                <Image 
                    src={staff.image}
                  className='rounded-full object-cover w-14 h-14'
                  width={50} 
                  height={50} 
                />
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-2'>
                    <span className='text-[#F5F5F5] text-base'>{ staff.name }</span>
                    { staff.isVerified && <Image height={22} width={22} src='/assets/icons/svgs/verified.svg' /> }
                  </div>
                  <span className='text-[#516170]'>{ staff.profession }</span>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#1B272C]" />
              <div className='flex gap-4 flex-wrapwrap mobile:gap-2'>
                <div className='flex items-center gap-2'>
                  <Image height={25} width={25} src='/assets/icons/svgs/location.svg' className='mobile:w-4 mobile:h-4' />
                  <span className='text-sm text-[#E0F0F9] mobile:text-xs whitespace-nowrap'>{staff.location}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Image height={25} width={25} src='/assets/icons/svgs/top-rated.svg' className='mobile:w-4 mobile:h-4' />
                  {staff.topRated && <span className='text-sm mobile:text-xs text-[#E0F0F9] whitespace-nowrap'>Top Rated</span>}
                </div>
                <div className='flex items-center gap-2 mobile:hidden'>
                  <Image height={22} width={22} src='/assets/icons/svgs/job-success.svg' />
                  {staff.jobSuccess > 0 && (
                    <span className='text-sm text-[#E0F0F9]'>{staff.jobSuccess}% Job Success</span>
                  )}
                </div>
              </div>
              <div class='flex flex-wrap gap-2'>
                {staff.skills.map((skill, indx) => 
                  <span className='border text-sm text-[#F5F5F5] border-[#3E525B] bg-[#1B272C] px-2 py-1 rounded-full mobile:text-xs' key={indx}>{skill}</span>
                )}
              </div>
              <p className='text-[#96B0BD] text-base mobile:text-sm'>{ staff.description }</p>
              <div className='flex bg-[#1B272C] p-2 rounded-xl gap-4'>
                <Link href="/" className='px-2 py-3 rounded-[10px] hover:bg-white hover:text-black w-full text-base text-center transition'>
                  Message
                </Link>
                <div className='w-fit cursor-pointer rounded-[10px] whitespace-nowrap bg-[#DC4F13] py-3 px-5 text-center text-white'>
                  Invite to job
                </div>
              </div>
            </div> 
          )}
        </div>
      </div>
      <div className='py-5 mt-4 text-center border cursor-pointer rounded-xl border-lightGray hover:bg-white hover:text-black transition'>
        Load More +
      </div>
    </div> 
  );
};

export default FindStaff;
