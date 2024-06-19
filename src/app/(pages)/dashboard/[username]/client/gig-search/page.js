'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CiSearch } from "react-icons/ci";
import { RiRobot2Line } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaStar, FaClock, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { CiReceipt } from "react-icons/ci";
import { PiShootingStarLight } from "react-icons/pi";
import { BsPatchCheckFill } from "react-icons/bs";
import api from "@/utils/api";


const DropdownItem = (props)=> {
  return (
    <div className='flex gap-4 items-center p-0 cursor-pointer'>
      <Checkbox id={props.category_id} />
      <label
        htmlFor={props.category_id}
        className="text-sm text-[#96B0BD] cursor-pointer"
      >
        {props.category_name}
      </label>
  </div>
  )
}
const DropDownTrigger = (props)=> {
  return (
    <PopoverTrigger asChild className='w-full max-w-[500px]'>
      <div className='px-6 py-4 bg-[#1B272C] rounded-xl cursor-pointer flex justify-between items-center text-base text-[#96B0BD]'>
        {props.text}
        <IoChevronDownOutline />
      </div>
  </PopoverTrigger>
  )
}
const GigCard = (props) => {
  return (
    <div className="bg-[#10191d] text-white p-4 rounded-xl flex gap-4 w-full items-center mobile:flex-col">
      <div className="relative w-[400px] max-w-full">
        <img
          src="/assets/images/portfolio_works/portfolio.jpeg"
          alt="Gig Image" 
          className="object-cover w-full rounded-xl aspect-video"
        />
        <div className="absolute flex gap-2 top-2 left-2"> 
          <div className="bg-gray-800 text-white px-2 py-1 rounded-full flex items-center gap-2">
            <FaStar fill='#DC4F13' size={16} />
            <p className='text-[14px] flex gap-1 text-[#E0F0F9]'>
              5.5 
              <span className='text-[#96b0be]'>(921)</span>
            </p>
          </div>
          <div className="bg-gray-800 text-white px-2 py-1 rounded-full flex items-center gap-2">
            <PiShootingStarLight className="text-blue-500" />
            <span className='text-[#96b0be]'>Top Rated</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <h3 className="text-2xl font-semibold text-[#F5F5F5]">
          {props.info.gigTitle}
        </h3>
        <div className="flex items-center gap-5 mt-2 text-gray-400">
          <div className="flex items-center gap-2">
            <FaClock size={24} />
            <span className='text-base'>{props.info.gigPrice}</span>
          </div>
          <div className="flex items-center gap-2">
            <CiReceipt size={28} />
            <span className='text-base'>${props.info.gigPrice}</span>
          </div>
        </div>
        <hr className="my-3 border-[#1B272C]" />
        <div className="flex items-center">
          <Image
            src='/assets/images/users/user-6.png'
            alt="Devon Miles"
            width={50}
            height={50}
            className="rounded-full"
          /> 
          <div className="ml-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-2xl mobile:text-xl">{props.info.creator?.fullName}</p>
              <BsPatchCheckFill fill="#0b75c2" />
            </div>
            <p className="text-gray-400 text-base mobile:text-sm">{props.info.creator?.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GigSearch = () => {
  const [gigList, setGigList] = useState([]);
  const [searchType, setSearchType] = useState("normal")
  const [searchKeywords, setSearchKeyWords] = useState("")
  const [filteredGigList, setFilteredGigList] = useState([])
  useEffect(() => {
    api.get(`/api/v1/freelancer_gig/find_all_gigs`).then((data) => {
        console.log("getAllGigs: ", data.data.data)
        if(data.data.data){
          setGigList(data.data.data);
          setFilteredGigList(data.data.data)
        }
    }).catch(err => {
        console.log("Error corrupted while getting all gigs: ", err);
    });
  }, [])

  const onChangeType = e => {
    setSearchType(e)
  }

  const setKey = (e) => {
    setSearchKeyWords(e.target.value)
    if(searchType == 'normal'){
      const filtered = gigList.filter(gig => 
        gig.deliveryTime?.toLowerCase().includes(e.target.value.toLowerCase()) || 
        gig.email?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        gig.gigDescription?.toLowerCase().includes(e.target.value.toLowerCase()) || 
        gig.gigPostDate?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        gig.gigPrice?.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
        gig.gigTitle?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredGigList(filtered);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      console.log("AI search", searchKeywords)
      api.get(`/api/v1/freelancer_gig/ai-search/${searchKeywords}`).then((data)=>{
        let ai_ids = []
        if(data.data.profileIDs) 
          ai_ids = data.data.profileIDs
          console.log(ai_ids)
          console.log(gigList[0])
          const ai_filtered = ai_ids.map(id =>
            gigList.find(gig => gig._id.toString() === id)).filter(gig => gig != undefined);
          console.log(ai_filtered)
          setFilteredGigList(ai_filtered)
      })
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-2 p-3 mobile:p-1 bg-[#10191d] rounded-xl">
        <Select defaultValue='normal' onValueChange={e => onChangeType(e)}>
          <SelectTrigger className='bg-[#1B272C] w-20 mobile:w-14 mobile:p-2 rounded-xl' >
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
          onChange={e => setKey(e)}
          onKeyDown={handleKeyDown}
        />
        <div className="px-3 flex items-center gap-3 cursor-pointer hover:bg-[#1B272C] rounded-xl transition mobile:hidden">
          <IoLocationOutline stroke="#96B0BD" size={20} />
          <span className='text-[#96B0BD]'>
            Anywhere
          </span>
        </div>
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
      <div className="flex gap-3 mobile:flex-col">
        <Popover>
          <DropDownTrigger text="Open" />
          <PopoverContent align='start' className='px-6 py-4 bg-[#1B272C] flex flex-col gap-4 rounded-xl' >
            <DropdownItem 
              category_id="all_categories"
              category_name="All Categories"
            />
            <DropdownItem 
              category_id="social_media_design"
              category_name="Social Media Design"
            />
            <DropdownItem 
              category_id="analyst"
              category_name="Analyst"
            />
            <DropdownItem 
              category_id="logo_design"
              category_name="Logo Design"
            />
            <DropdownItem 
              category_id="web_mobile_design"
              category_name="Web & Mobile Design"
            />
            <DropdownItem 
              category_id="animation"
              category_name="Animation"
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <DropDownTrigger text="Project Attributes" />
          <PopoverContent align='start' className='px-6 py-4 bg-[#1B272C] flex flex-col gap-4 rounded-xl' >
            <DropdownItem 
              category_id="attribute_1"
              category_name="Option 1"
            />
            <DropdownItem 
              category_id="attribute_2"
              category_name="Option 2"
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <DropDownTrigger text="Price" />
          <PopoverContent align='start' className='px-6 py-4 bg-[#1B272C] flex flex-col gap-4 rounded-xl' >
            <DropdownItem 
              category_id="100-200"
              category_name="$100 - $200"
            />
            <DropdownItem 
              category_id="200-300"
              category_name="$200 - $300"
            />
            <DropdownItem 
              category_id="300-400"
              category_name="$300 - $400"
            />
            <DropdownItem 
              category_id="300-400"
              category_name="$400 - $500"
            />
            <DropdownItem 
              category_id="1000-3000"
              category_name="$1000 - $3000"
            />
            <DropdownItem 
              category_id="5000-10000"
              category_name="$5000 - $10 000"
            />
            <DropdownItem 
              category_id="5000-10000"
              category_name="+ $2000"
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <DropDownTrigger text="Choose Category" />
          <PopoverContent align='start' className='px-6 py-4 bg-[#1B272C] flex flex-col gap-4 rounded-xl' >
            {Array.from({ length: 10 }, (_, i) => (
              <DropdownItem 
                key={i + 1} 
                category_id=""
                category_name={i + 1 + ` day${i + 1 > 1 ? 's' : ''}`}
              />
            ))}
            <DropdownItem 
              category_id="2_months" 
              category_name="+ 14 days"
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <DropDownTrigger text="Talent Details" />
          <PopoverContent align='end' className='px-6 py-4 bg-[#1B272C] flex flex-col gap-4 rounded-xl' > 
            <DropdownItem 
              category_id="option_1" 
              category_name="Option 1" 
            />
            <DropdownItem 
              category_id="option_2" 
              category_name="Option 2" 
            />
            <DropdownItem 
              category_id="option_3" 
              category_name="Option 3" 
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-center py-6 px-3 bg-[#10191d] rounded-xl text-lg">
        Wow! <span className='main_color px-2'>{filteredGigList.length}</span> projects available 😀
      </div>
      {/* 
        * These should be dynamic, you can pass all the data you need through attributes and retrieve it on the component 
      */}
      {filteredGigList.map((gig, index) => {
          return (
            <GigCard info = {gig} key={index}/>
          );
      })}
      {/* <GigCard />
      <GigCard />
      <GigCard /> */}
      <div className="py-5 md:text-xl hover:bg-white transition hover:text-black px-10 w-full max-w-full rounded-xl mobile:px-5 border border-[#aaaaaaaa] text-center mx-auto cursor-pointer mt-4">Load more +</div>
    </div>
  )
}

export default GigSearch
