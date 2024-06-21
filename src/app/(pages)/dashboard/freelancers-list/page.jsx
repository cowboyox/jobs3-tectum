"use client";
import React, { useState } from 'react';
import Link from 'next/link'

// Components 
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { Button } from '@/components/ui/button'; 

// Icons
import { MdOutlineClose } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";

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
  { value: "category_1", label: "Category 1" },
  { value: "category_2", label: "Category 2" },
  { value: "category_3", label: "Category 3" },
  { value: "category_4", label: "Category 4" },
  { value: "category_5", label: "Category 5" },
];

const delivery_times = [
  { value: "1 day", label: "1 day" },
  { value: "2 days", label: "2 days" },
  { value: "3 days", label: "3 days" },
  { value: "4 days", label: "4 days" },
];

const response_times = [
  { value: "1 hour", label: "1 hour" },
  { value: "2 hours", label: "2 hours" },
  { value: "3 hours", label: "3 hours" },
];

const ratings = [
  { value: "> 2", label: "> 2" },
  { value: "> 3", label: "> 3" },
  { value: "> 4", label: "> 4" },
  { value: "Top Rated", label: "Top Rated" },
];

const freelancers = [
  {
    name: "Robert Collins",
    image: '/assets/images/users/user-1.png',
    title: "Front-End Developer",
    location: "Oslo, Norway",
    description: "I'm Robert, a passionate UI Designer with over 7 years of experience in creating intuitive and visually compelling digital interfaces. My mission is to bridge the gap between functionality and aesthetics, ensuring that every user interaction is as enjoyable as it is efficient.",
    jobSuccess: "96% Job Success",
    rating: "4.8 (21)",
    responseTime: "1 Day Response",
    deliveryTime: "25 Days Delivery",
    isTopRated: true,
  },
  {
    name: "Emily Johnson",
    image: '/assets/images/users/user-2.png',
    title: "Back-End Developer",
    location: "Berlin, Germany",
    description: "I'm Emily, a seasoned Back-End Developer specializing in scalable server-side applications. With over 5 years of experience, I excel in database management, API integration, and server optimization.",
    jobSuccess: "94% Job Success",
    rating: "4.7 (34)",
    responseTime: "2 Days Response",
    deliveryTime: "30 Days Delivery",
    isTopRated: false,
  },
  {
    name: "David Smith",
    image: '/assets/images/users/user-3.png',
    title: "Full-Stack Developer",
    location: "San Francisco, USA",
    description: "I'm David, a versatile Full-Stack Developer with expertise in both front-end and back-end technologies. I have a strong background in developing dynamic web applications and delivering seamless user experiences.",
    jobSuccess: "98% Job Success",
    rating: "4.9 (45)",
    responseTime: "1 Day Response",
    deliveryTime: "20 Days Delivery",
    isTopRated: true,
  },
  {
    name: "Anna Martinez",
    image: '/assets/images/users/user-4.png',
    title: "Graphic Designer",
    location: "Barcelona, Spain",
    description: "I'm Anna, a creative Graphic Designer with a passion for visual storytelling. With 6 years of experience, I specialize in creating eye-catching graphics and brand identities that resonate with audiences.",
    jobSuccess: "92% Job Success",
    rating: "4.6 (27)",
    responseTime: "3 Days Response",
    deliveryTime: "15 Days Delivery",
    isTopRated: false,
  },
  {
    name: "Michael Brown",
    image: '/assets/images/users/user-1.png',
    title: "Mobile App Developer",
    location: "Sydney, Australia",
    description: "I'm Michael, a dedicated Mobile App Developer with a knack for creating intuitive and high-performing mobile applications. I have over 8 years of experience in iOS and Android app development.",
    jobSuccess: "97% Job Success",
    rating: "4.8 (38)",
    responseTime: "1 Day Response",
    deliveryTime: "22 Days Delivery",
    isTopRated: true,
  }
];


const SelectField = ({ options, value, onValueChange, placeholder }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className='bg-[#1a272c] rounded-xl md:max-w-fit gap-2 md:w-auto w-[49%] px-2 md:px-4 text-left'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='bg-[#1a272c] rounded-xl'>
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
  const [jobCategory, setCategoryValue] = useState("");
  const [keywordSwet, setKeyword] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [deliveryTime, setDeliveryTime] = useState('');
  const [responseTime, setResponseTime] = useState('');
  const [rating, setRating] = useState('');

  const filteredSuggestions = search_keywords_suggestions.filter(
    suggestion => !keywordSwet.includes(suggestion.keyword)
  );

  return (
    <div className='py-4 md:py-16'>
      <div className="mb-4 md:mb-16 mx-auto max-w-3xl customize_search_input">
        <Command>
          <div className='w-full border border-slate-500 rounded-xl text-base p-3'>
            <CommandInput
              placeholder="Search for keywords"
              className='search_bar'
              value={inputValue}
              onValueChange={setInputValue}
            />
          </div>
          <CommandList>
            <CommandGroup>
              <div className='flex flex-wrap mt-3 suggestions_container max-w-2xl mx-auto gap-2 md:gap-3'>
                {keywordSwet.map((selectedSkill, selectedSkillIndex) => (
                  <div
                    className='bg-[#28373e] px-2 md:px-4 text-white rounded-xl text-sm flex items-center cursor-pointer w-auto whitespace-nowrap md:py-2 py-1'
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
                {filteredSuggestions.map(keywords_suggestion => (
                  <CommandItem
                    key={keywords_suggestion.keyword}
                    value={keywords_suggestion.keyword}
                    className='suggestion_item bg-transparent md:py-2 py-1 px-2 md:px-4 text-white rounded-xl text-sm flex items-center cursor-pointer whitespace-nowrap border border-[#28373e]'
                    onSelect={(currentSkill) => {
                      setKeyword((prevKeywordSwet) => [...prevKeywordSwet, currentSkill]);
                      setInputValue("");
                    }}
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
      <div className="md:mt-6 flex flex-col-reverse md:flex-row gap-12 md:gap-0">
        <h3 className='text-3xl w-full md:w-1/5'>235 Results</h3>
        <div className="flex md:gap-3 w-full md:w-4/5 md:justify-end flex-wrap justify-between">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between bg-[#1a272c] rounded-xl md:w-auto w-[49%] text-[13px] md:text-base px-2 md:px-4 mb-2 md:mb-0"
              >
                {jobCategory
                  ? categories_list.find((job_category) => job_category.value === jobCategory)?.label
                  : "Choose a category"}
                <GoChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-56 bg-[#1a272c] rounded-xl border-4 border-[#1a272c]">
              <Command className='bg-[#1a272c]'>
                <CommandInput placeholder="Type or search..." className='rounded-xl overflow-hidden' />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {categories_list.map((job_category) => (
                      <CommandItem
                        key={job_category.value}
                        value={job_category.value}
                        onSelect={(currentValue) => {
                          setCategoryValue(currentValue === jobCategory ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {job_category.label}
                        {jobCategory === job_category.value && (
                          <IoCheckmark
                            className={`ml-auto h-4 w-4 opacity-100`}
                          />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <SelectField
            options={delivery_times}
            value={deliveryTime}
            onValueChange={setDeliveryTime}
            placeholder="Delivery time"
          />
          <SelectField
            options={response_times}
            value={responseTime}
            onValueChange={setResponseTime}
            placeholder="Avg. Response Time"
          />
          <SelectField
            options={ratings}
            value={rating}
            onValueChange={setRating}
            placeholder="Rating"
          />
        </div>
      </div>
      {/* Results: Freelancers */}
      {freelancers.map((freelancer, index) => (
        <div key={index} className="mt-6 md:py-8 py-4 px-4 md:px-6 rounded-xl border border-1 border-[#526872] flex flex-col">
          <div className="flex">
            <div className="flex gap-6 w-full md:w-1/2 md:flex-row flex-col">
              <img src={freelancer.image} className='rounded-full w-28 md:w-16 aspect-square object-cover object-top md:mx-0 mx-auto' />
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl text-center md:text-left">{freelancer.title}</h2>
                <div className="flex gap-2 md:justify-start justify-center">
                  <p className="text-lg text-white">{freelancer.name}</p>
                  <p className="text-lg text-[#96B0BD]">{freelancer.location}</p>
                </div>
              </div>
            </div>
            <div className="md:block hidden w-1/2">
              <p className="text-sm text-white">
                {freelancer.description}
              </p>
            </div>
          </div>
          <div className="flex mt-6 items-center justify-between md:flex-row flex-col md:gap-0 gap-4">
            <div className='bg-[#1a272c] py-2 px-2 md:px-4 rounded-xl flex gap-4 md:flex-nowrap flex-wrap'>
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/profile-icons/check.svg" className="w-5 h-5 object-contain" />
                <span className='text-white text-sm md:text-md'>{freelancer.jobSuccess}</span>
              </div>
              {freelancer.isTopRated && (
                <div className="flex gap-2 items-center">
                  <img src="/assets/icons/profile-icons/top-rated.svg" className="w-5 h-5 object-contain" />
                  <span className='text-white text-sm md:text-md'>Top Rated</span>
                </div>
              )}
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/profile-icons/star.svg" className="w-5 h-5 object-contain" />
                <span className='text-white text-sm md:text-md'>{freelancer.rating}</span>
              </div>          
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/profile-icons/time.svg" className="w-5 h-5 object-contain" />
                <span className='text-white text-sm md:text-md'>{freelancer.responseTime}</span>
              </div>            
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/profile-icons/order.svg" className="w-5 h-5 object-contain" />
                <span className='text-white text-sm md:text-md'>{freelancer.deliveryTime}</span>
              </div>            
            </div>
            <div className="flex justify-end gap-4 items-center w-full md:w-auto">
              <Link href="#" className='bg-black hover:bg-white hover:text-black transition rounded-xl text-sm 
              md:text-lg font-semibold text-white text-center py-2 px-4 border border-slate-500 w-full md:w-auto'>
                Message
              </Link>
              <Link href="#" className='bg-[#fa4e17] hover:bg-white hover:text-black transition rounded-xl text-sm md:text-lg font-semibold text-white text-center py-2 px-4 w-full md:w-auto'>
                Invite to job
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className="flex mt-10 px-8 md:px-0">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className='rounded-xl hover:bg-[#1a272c]' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className='rounded-xl bg-[#1a272c]' isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className='rounded-xl hover:bg-[#1a272c]'> 2 </PaginationLink>
            </PaginationItem>
            <PaginationItem className='md:block hidden'>
              <PaginationLink href="#" className='rounded-xl hover:bg-[#1a272c]'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className='rounded-xl hover:bg-[#1a272c]' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default FreelancersList;
