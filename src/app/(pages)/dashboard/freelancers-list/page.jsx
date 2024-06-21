'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// Components
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

// Icons
import { MdOutlineClose } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import { GoChevronDown } from 'react-icons/go';
import { IoCheckmark } from 'react-icons/io5';

const search_keywords_suggestions = [
  { id: 0, keyword: 'Developer' },
  { id: 1, keyword: 'English' },
  { id: 2, keyword: 'React' },
  { id: 3, keyword: 'HTML' },
  { id: 4, keyword: 'Javascript' },
  { id: 5, keyword: 'CSS' },
  { id: 6, keyword: 'Flutter' },
  { id: 7, keyword: 'Front-End' },
  { id: 8, keyword: 'Back-End' },
];

const categories_list = [
  { value: 'category_1', label: 'Category 1' },
  { value: 'category_2', label: 'Category 2' },
  { value: 'category_3', label: 'Category 3' },
  { value: 'category_4', label: 'Category 4' },
  { value: 'category_5', label: 'Category 5' },
];

const delivery_times = [
  { value: '1 day', label: '1 day' },
  { value: '2 days', label: '2 days' },
  { value: '3 days', label: '3 days' },
  { value: '4 days', label: '4 days' },
];

const response_times = [
  { value: '1 hour', label: '1 hour' },
  { value: '2 hours', label: '2 hours' },
  { value: '3 hours', label: '3 hours' },
];

const ratings = [
  { value: '> 2', label: '> 2' },
  { value: '> 3', label: '> 3' },
  { value: '> 4', label: '> 4' },
  { value: 'Top Rated', label: 'Top Rated' },
];

const freelancers = [
  {
    name: 'Robert Collins',
    image: '/assets/images/users/user-1.png',
    title: 'Front-End Developer',
    location: 'Oslo, Norway',
    description:
      "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring that every user interaction is as enjoyable as it is efficient.",
    jobSuccess: '96% Job Success',
    rating: '4.8 (21)',
    responseTime: '1 Day Response',
    deliveryTime: '25 Days Delivery',
    isTopRated: true,
  },
  {
    name: 'Emily Johnson',
    image: '/assets/images/users/user-2.png',
    title: 'Back-End Developer',
    location: 'Berlin, Germany',
    description:
      "I'm Emily, a seasoned Back-End Developer specializing in scalable server-side applications. With over 5 years of experience, I excel in database management, API integration, and server optimization.",
    jobSuccess: '94% Job Success',
    rating: '4.7 (34)',
    responseTime: '2 Days Response',
    deliveryTime: '30 Days Delivery',
    isTopRated: false,
  },
  {
    name: 'David Smith',
    image: '/assets/images/users/user-3.png',
    title: 'Full-Stack Developer',
    location: 'San Francisco, USA',
    description:
      "I'm David, a versatile Full-Stack Developer with expertise in both front-end and back-end technologies. I have a strong background in developing dynamic web applications and delivering seamless user experiences.",
    jobSuccess: '98% Job Success',
    rating: '4.9 (45)',
    responseTime: '1 Day Response',
    deliveryTime: '20 Days Delivery',
    isTopRated: true,
  },
  {
    name: 'Anna Martinez',
    image: '/assets/images/users/user-4.png',
    title: 'Graphic Designer',
    location: 'Barcelona, Spain',
    description:
      "I'm Anna, a creative Graphic Designer with a passion for visual storytelling. With 6 years of experience, I specialize in creating eye-catching graphics and brand identities that resonate with audiences.",
    jobSuccess: '92% Job Success',
    rating: '4.6 (27)',
    responseTime: '3 Days Response',
    deliveryTime: '15 Days Delivery',
    isTopRated: false,
  },
  {
    name: 'Michael Brown',
    image: '/assets/images/users/user-1.png',
    title: 'Mobile App Developer',
    location: 'Sydney, Australia',
    description:
      "I'm Michael, a dedicated Mobile App Developer with a knack for creating intuitive and high-performing mobile applications. I have over 8 years of experience in iOS and Android app development.",
    jobSuccess: '97% Job Success',
    rating: '4.8 (38)',
    responseTime: '1 Day Response',
    deliveryTime: '22 Days Delivery',
    isTopRated: true,
  },
];

const SelectField = ({ options, value, onValueChange, placeholder }) => {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className='w-[49%] gap-2 rounded-xl bg-[#1a272c] px-2 text-left md:w-auto md:max-w-fit md:px-4'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='rounded-xl bg-[#1a272c]'>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const FreelancersList = () => {
  const [open, setOpen] = useState(false);
  const [jobCategory, setCategoryValue] = useState('');
  const [keywordSwet, setKeyword] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [responseTime, setResponseTime] = useState('');
  const [rating, setRating] = useState('');

  const filteredSuggestions = search_keywords_suggestions.filter(
    (suggestion) => !keywordSwet.includes(suggestion.keyword)
  );

  return (
    <div className='py-4 md:py-16'>
      <div className='customize_search_input mx-auto mb-4 max-w-3xl md:mb-16'>
        <Command>
          <div className='w-full rounded-xl border border-slate-500 p-3 text-base'>
            <CommandInput
              className='search_bar'
              onValueChange={setInputValue}
              placeholder='Search for keywords'
              value={inputValue}
            />
          </div>
          <CommandList>
            <CommandGroup>
              <div className='suggestions_container mx-auto mt-3 flex max-w-2xl flex-wrap gap-2 md:gap-3'>
                {keywordSwet.map((selectedSkill, selectedSkillIndex) => (
                  <div
                    className='flex w-auto cursor-pointer items-center whitespace-nowrap rounded-xl bg-[#28373e] px-2 py-1 text-sm text-white md:px-4 md:py-2'
                    key={selectedSkillIndex}
                    onClick={() => {
                      const newKeywordSwet = [...keywordSwet];
                      newKeywordSwet.splice(selectedSkillIndex, 1);
                      setKeyword(newKeywordSwet);
                    }}
                  >
                    {selectedSkill}
                    <MdOutlineClose className='ml-2' />
                  </div>
                ))}
                {filteredSuggestions.map((keywords_suggestion) => (
                  <CommandItem
                    className='suggestion_item flex cursor-pointer items-center whitespace-nowrap rounded-xl border border-[#28373e] bg-transparent px-2 py-1 text-sm text-white md:px-4 md:py-2'
                    key={keywords_suggestion.keyword}
                    onSelect={(currentSkill) => {
                      setKeyword((prevKeywordSwet) => [...prevKeywordSwet, currentSkill]);
                      setInputValue('');
                    }}
                    value={keywords_suggestion.keyword}
                  >
                    {keywords_suggestion.keyword}
                    <FiPlus className='ml-2' />
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      {/* Results Header */}
      <div className='flex flex-col-reverse gap-12 md:mt-6 md:flex-row md:gap-0'>
        <h3 className='w-full text-3xl md:w-1/5'>235 Results</h3>
        <div className='flex w-full flex-wrap justify-between md:w-4/5 md:justify-end md:gap-3'>
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
              <Button
                aria-expanded={open}
                className='mb-2 w-[49%] justify-between rounded-xl bg-[#1a272c] px-2 text-[13px] md:mb-0 md:w-auto md:px-4 md:text-base'
                role='combobox'
                variant='outline'
              >
                {jobCategory
                  ? categories_list.find((job_category) => job_category.value === jobCategory)
                      ?.label
                  : 'Choose a category'}
                <GoChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-56 rounded-xl border-4 border-[#1a272c] bg-[#1a272c] p-0'>
              <Command className='bg-[#1a272c]'>
                <CommandInput
                  className='overflow-hidden rounded-xl'
                  placeholder='Type or search...'
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {categories_list.map((job_category) => (
                      <CommandItem
                        key={job_category.value}
                        onSelect={(currentValue) => {
                          setCategoryValue(currentValue === jobCategory ? '' : currentValue);
                          setOpen(false);
                        }}
                        value={job_category.value}
                      >
                        {job_category.label}
                        {jobCategory === job_category.value && (
                          <IoCheckmark className={`ml-auto h-4 w-4 opacity-100`} />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <SelectField
            onValueChange={setDeliveryTime}
            options={delivery_times}
            placeholder='Delivery time'
            value={deliveryTime}
          />
          <SelectField
            onValueChange={setResponseTime}
            options={response_times}
            placeholder='Avg. Response Time'
            value={responseTime}
          />
          <SelectField
            onValueChange={setRating}
            options={ratings}
            placeholder='Rating'
            value={rating}
          />
        </div>
      </div>
      {/* Results: Freelancers */}
      {freelancers.map((freelancer, index) => (
        <div
          className='border-1 mt-6 flex flex-col rounded-xl border border-[#526872] px-4 py-4 md:px-6 md:py-8'
          key={index}
        >
          <div className='flex'>
            <div className='flex w-full flex-col gap-6 md:w-1/2 md:flex-row'>
              <img
                className='mx-auto aspect-square w-28 rounded-full object-cover object-top md:mx-0 md:w-16'
                src={freelancer.image}
              />
              <div className='flex flex-col gap-2'>
                <h2 className='text-center text-2xl md:text-left'>{freelancer.title}</h2>
                <div className='flex justify-center gap-2 md:justify-start'>
                  <p className='text-lg text-white'>{freelancer.name}</p>
                  <p className='text-lg text-[#96B0BD]'>{freelancer.location}</p>
                </div>
              </div>
            </div>
            <div className='hidden w-1/2 md:block'>
              <p className='text-sm text-white'>{freelancer.description}</p>
            </div>
          </div>
          <div className='mt-6 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0'>
            <div className='flex flex-wrap gap-4 rounded-xl bg-[#1a272c] px-2 py-2 md:flex-nowrap md:px-4'>
              <div className='flex items-center gap-2'>
                <img
                  className='h-5 w-5 object-contain'
                  src='/assets/icons/profile-icons/check.svg'
                />
                <span className='md:text-md text-sm text-white'>{freelancer.jobSuccess}</span>
              </div>
              {freelancer.isTopRated && (
                <div className='flex items-center gap-2'>
                  <img
                    className='h-5 w-5 object-contain'
                    src='/assets/icons/profile-icons/top-rated.svg'
                  />
                  <span className='md:text-md text-sm text-white'>Top Rated</span>
                </div>
              )}
              <div className='flex items-center gap-2'>
                <img
                  className='h-5 w-5 object-contain'
                  src='/assets/icons/profile-icons/star.svg'
                />
                <span className='md:text-md text-sm text-white'>{freelancer.rating}</span>
              </div>
              <div className='flex items-center gap-2'>
                <img
                  className='h-5 w-5 object-contain'
                  src='/assets/icons/profile-icons/time.svg'
                />
                <span className='md:text-md text-sm text-white'>{freelancer.responseTime}</span>
              </div>
              <div className='flex items-center gap-2'>
                <img
                  className='h-5 w-5 object-contain'
                  src='/assets/icons/profile-icons/order.svg'
                />
                <span className='md:text-md text-sm text-white'>{freelancer.deliveryTime}</span>
              </div>
            </div>
            <div className='flex w-full items-center justify-end gap-4 md:w-auto'>
              <Link
                className='w-full rounded-xl border border-slate-500 bg-black px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black md:w-auto md:text-lg'
                href='#'
              >
                Message
              </Link>
              <Link
                className='w-full rounded-xl bg-[#fa4e17] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black md:w-auto md:text-lg'
                href='#'
              >
                Invite to job
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className='mt-10 flex px-8 md:px-0'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className='rounded-xl hover:bg-[#1a272c]' href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className='rounded-xl bg-[#1a272c]' href='#' isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className='rounded-xl hover:bg-[#1a272c]' href='#'>
                {' '}
                2{' '}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className='hidden md:block'>
              <PaginationLink className='rounded-xl hover:bg-[#1a272c]' href='#'>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className='rounded-xl hover:bg-[#1a272c]' href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default FreelancersList;
