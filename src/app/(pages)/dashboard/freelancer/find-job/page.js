'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaEllipsis, FaX } from 'react-icons/fa6';

import searchOptions from '../../client/freelancers/searchOptions';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/seperator';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';
import { minutesDifference } from '@/utils/Helpers';

const FindJob = () => {
  const router = useRouter();
  const auth = useCustomContext();
  const { toast } = useToast();
  const [sortOrder, setSortOrder] = useState('');
  const filterCategory = ['Active', 'Paused', 'Completed', 'Cancelled'];

  const [gigList, setGigList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchType, setSearchType] = useState('normal');
  const [searchKeyWords, setSearchKeyWords] = useState('');
  const [filteredGigList, setFilteredGigList] = useState([]);
  const [filteredGigShowModeList, setFilteredGigShowModeList] = useState([]);

  const [isSmallScreen, setIsSmallScree] = useState(false);
  const descriptionTextMaxLength = 320;

  useEffect(() => {
    api
      .get(`/api/v1/client_gig/find_all_gigs`)
      .then((data) => {
        setGigList(data.data.data);
        setFilteredGigList(data.data.data);
        setFilteredGigShowModeList(new Array(data.data.data.length).fill(false));
      })
      .catch((err) => {
        console.error('Error corrupted while getting all gigs: ', err);
      });
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScree(true);
        setLoaded(true);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsSmallScree(false);
        setLoaded(true);
      } else {
        setIsSmallScree(false);
        setLoaded(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const setKey = (e) => {
    setSearchKeyWords(e.target.value);
    if (searchType == 'normal') {
      const filtered = gigList.filter(
        (gig) =>
          gig.gigTitle?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.gigDescription?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.location?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.requiredSkills
            ?.map((item) => item.toLowerCase())
            .includes(e.target.value.toLowerCase())
      );
      setFilteredGigList(filtered);
      setFilteredGigShowModeList(new Array(filtered.length).fill(false));
    }
  };

  const setOrder = (value) => {
    setSortOrder(value);
    let sorted = filteredGigList;
    if (sortOrder === 'dateAsc') {
      sorted.sort((a, b) => new Date(a.gigPostDate) - new Date(b.gigPostDate));
    } else if (sortOrder === 'dateDesc') {
      sorted.sort((a, b) => new Date(b.gigPostDate) - new Date(a.gigPostDate));
    }
    setFilteredGigList(sorted);
    setFilteredGigShowModeList(new Array(sorted.length).fill(false));
  };

  const aiSearch = () => {
    api.get(`/api/v1/client_gig/ai-search/${searchKeyWords}`).then((data) => {
      let ai_ids = [];
      if (data.data.profileIDs) ai_ids = data.data.profileIDs;
      const ai_filtered = ai_ids
        .map((id) => gigList.find((gig) => gig._id.toString() === id))
        .filter((gig) => gig != undefined);
      setFilteredGigList(ai_filtered);
      setFilteredGigShowModeList(new Array(ai_filtered.length).fill(false));
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      aiSearch();
    }
  };

  const handleLikeUnlikeGig = async (gigId, index, like) => {
    try {
      const updatedGig = await api.put(`/api/v1/client_gig/like-unlike-gig/${gigId}`, { like });

      const tempFilteredGigList = filteredGigList.map((gig, i) => {
        if (i == index) {
          return {
            ...gig,
            likeUsers: updatedGig.data.likeUsers,
          };
        }

        return gig;
      });

      setFilteredGigList(tempFilteredGigList);
      toast({
        className:
          'bg-green-500 border-none rounded-xl absolute top-[-94vh] xl:w-[15vw] md:w-[30vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>{`Successfully ${like ? 'added' : 'removed'} like to the gig!`}</h3>,
        title: <h1 className='text-center'>Success</h1>,
        variant: 'default',
      });
    } catch (error) {
      console.log(`Error while updating like/unlike for the gigId ${gigId}`, error);
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Internal Server Error</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
    }
  };

  const handleRecentView = async (gigId) => {
    if (auth?.currentProfile?._id && gigId) {
      try {
        await api.post(`/api/v1/recentView/update_fl_recent_view`, {
          gigId,
          profileId: auth?.currentProfile?._id,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return loaded ? (
    <div className='p-0 lg:mt-8 sm:p-0 xl:mt-8'>
      <div className='flex gap-4 rounded-xl bg-[#10191D] mobile:gap-0'>
        <div className='m-3 flex flex-1 items-center gap-3'>
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
            className='w-full bg-transparent outline-none'
            onChange={(e) => setKey(e)}
            onKeyDown={handleKeyDown}
            placeholder={isSmallScreen ? 'Search' : 'Search by Order title...'}
            type='text'
          />

          {isSmallScreen && searchType === 'normal' && (
            <button>
              <svg
                fill='none'
                height='24'
                viewBox='0 0 25 24'
                width='25'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.1962 13.4299C13.9193 13.4299 15.3162 12.0331 15.3162 10.3099C15.3162 8.58681 13.9193 7.18994 12.1962 7.18994C10.473 7.18994 9.07617 8.58681 9.07617 10.3099C9.07617 12.0331 10.473 13.4299 12.1962 13.4299Z'
                  stroke='#96B0BD'
                  strokeWidth='1.5'
                />
                <path
                  d='M3.816 8.49C5.786 -0.169998 18.616 -0.159997 20.576 8.5C21.726 13.58 18.566 17.88 15.796 20.54C13.786 22.48 10.606 22.48 8.586 20.54C5.826 17.88 2.666 13.57 3.816 8.49Z'
                  stroke='#96B0BD'
                  strokeWidth='1.5'
                />
              </svg>
            </button>
          )}
        </div>
        {(!isSmallScreen || (isSmallScreen && searchType === 'normal')) && (
          <div className='m-3 flex flex-none flex-row items-center gap-2'>
            <button className='flex flex-row items-center justify-center gap-3'>
              {!isSmallScreen ? (
                <>
                  <svg
                    fill='none'
                    height='24'
                    viewBox='0 0 25 24'
                    width='25'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M22.2119 6.58594H16.3057'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M6.46191 6.58594H2.52441'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M10.3994 10.0312C12.3022 10.0312 13.8447 8.48873 13.8447 6.58594C13.8447 4.68314 12.3022 3.14062 10.3994 3.14062C8.49662 3.14062 6.9541 4.68314 6.9541 6.58594C6.9541 8.48873 8.49662 10.0312 10.3994 10.0312Z'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M22.2119 17.4141H18.2744'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M8.43066 17.4141H2.52441'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M14.3369 20.8594C16.2397 20.8594 17.7822 19.3169 17.7822 17.4141C17.7822 15.5113 16.2397 13.9688 14.3369 13.9688C12.4341 13.9688 10.8916 15.5113 10.8916 17.4141C10.8916 19.3169 12.4341 20.8594 14.3369 20.8594Z'
                      stroke='#96B0BD'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                      strokeWidth='1.5'
                    />
                  </svg>
                  Filter
                </>
              ) : (
                <svg
                  fill='none'
                  height='24'
                  viewBox='0 0 25 24'
                  width='25'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22.1719 6.58594H16.2656'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M6.42188 6.58594H2.48438'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M10.3594 10.0312C12.2622 10.0312 13.8047 8.48873 13.8047 6.58594C13.8047 4.68314 12.2622 3.14062 10.3594 3.14062C8.45658 3.14062 6.91406 4.68314 6.91406 6.58594C6.91406 8.48873 8.45658 10.0312 10.3594 10.0312Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M22.1719 17.4141H18.2344'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M8.39062 17.4141H2.48438'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M14.2969 20.8594C16.1997 20.8594 17.7422 19.3169 17.7422 17.4141C17.7422 15.5113 16.1997 13.9688 14.2969 13.9688C12.3941 13.9688 10.8516 15.5113 10.8516 17.4141C10.8516 19.3169 12.3941 20.8594 14.2969 20.8594Z'
                    stroke='#96B0BD'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                  />
                  <circle cx='18.2344' cy='5.10938' fill='#DC4F13' r='4.92188' />
                </svg>
              )}
            </button>
            {!isSmallScreen && (
              <div className='flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#DC4F13] text-center align-middle'>
                4
              </div>
            )}
          </div>
        )}
        {!isSmallScreen && (
          <div className='m-3 flex flex-row items-center justify-center gap-2'>
            <div>Sort by</div>
            <div>
              <Select onValueChange={(value) => setOrder(value)}>
                <SelectTrigger className='flex justify-center border-none bg-transparent text-[#96B0BD] focus:border-none focus:outline-none'>
                  <SelectValue placeholder='Sort By' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort By</SelectLabel>
                    <SelectItem value='dateAsc'>Date Ascending</SelectItem>
                    <SelectItem value='dateDesc'>Date Descending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
      <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
        You have <span className='font-bold text-[#DC4F13]'>{filteredGigList.length}</span> Jobs😊
      </div>
      <div className='mt-4 flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
        {filterCategory.map((item, index) => {
          return (
            <span
              className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
              key={index}
            >
              <FaX className='rounded-full bg-[#3E525B] p-[2px]' />
              {item}
            </span>
          );
        })}
        <span>Clear&nbsp;All</span>
      </div>
      {filteredGigList.length > 0 && (
        <>
          {filteredGigList.map((gig, index) => {
            return (
              <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center' key={index}>
                <div className='flex flex-row items-center justify-between gap-4'>
                  <div className='flex items-center'>
                    <img height={65} src='/assets/images/figma.png' width={65} />
                  </div>
                  {isSmallScreen && (
                    <div className='flex flex-row items-center gap-2'>
                      {!gig?.likeUsers?.includes(auth?.currentProfile?.userId?.toString()) ? (
                        <svg
                          className='cursor-pointer'
                          fill='none'
                          height='32'
                          onClick={() =>
                            handleLikeUnlikeGig(
                              gig._id,
                              index,
                              !gig?.likeUsers?.includes(auth?.currentProfile?.userId?.toString())
                            )
                          }
                          viewBox='0 0 32 32'
                          width='32'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M15.4138 11.3348L16.0143 12.1375L16.6149 11.3348C17.4058 10.2776 18.6725 9.59131 20.0843 9.59131C22.4808 9.59131 24.431 11.5437 24.431 13.9655C24.431 14.9747 24.2701 15.9053 23.9907 16.7688L23.9892 16.7737C23.3187 18.8954 21.941 20.6156 20.44 21.9056C18.9356 23.1985 17.3503 24.022 16.3411 24.3654L16.3411 24.3654L16.333 24.3682C16.2824 24.3861 16.167 24.408 16.0143 24.408C15.8617 24.408 15.7462 24.3861 15.6956 24.3682L15.6956 24.3682L15.6876 24.3654C14.6783 24.022 13.0931 23.1985 11.5887 21.9056C10.0876 20.6156 8.70993 18.8954 8.03947 16.7737L8.03948 16.7737L8.03791 16.7688C7.75853 15.9053 7.59766 14.9747 7.59766 13.9655C7.59766 11.5437 9.54787 9.59131 11.9443 9.59131C13.3561 9.59131 14.6229 10.2776 15.4138 11.3348Z'
                            stroke='#96B0BD'
                            strokeWidth='1.5'
                          />
                        </svg>
                      ) : (
                        <svg
                          className='cursor-pointer'
                          fill='none'
                          height='32'
                          onClick={() =>
                            handleLikeUnlikeGig(
                              gig._id,
                              index,
                              !gig?.likeUsers?.includes(auth?.currentProfile?.userId?.toString())
                            )
                          }
                          viewBox='0 0 32 32'
                          width='32'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M15.4138 11.8348L16.0143 12.6375L16.6149 11.8348C17.4058 10.7776 18.6725 10.0913 20.0843 10.0913C22.4808 10.0913 24.431 12.0437 24.431 14.4655C24.431 15.4747 24.2701 16.4053 23.9907 17.2688L23.9892 17.2737C23.3187 19.3954 21.941 21.1156 20.44 22.4056C18.9356 23.6985 17.3503 24.522 16.3411 24.8654L16.3411 24.8654L16.333 24.8682C16.2824 24.8861 16.167 24.908 16.0143 24.908C15.8617 24.908 15.7462 24.8861 15.6956 24.8682L15.6956 24.8682L15.6876 24.8654C14.6783 24.522 13.0931 23.6985 11.5887 22.4056C10.0876 21.1156 8.70993 19.3954 8.03947 17.2737L8.03948 17.2737L8.03791 17.2688C7.75853 16.4053 7.59766 15.4747 7.59766 14.4655C7.59766 12.0437 9.54787 10.0913 11.9443 10.0913C13.3561 10.0913 14.6229 10.7776 15.4138 11.8348Z'
                            fill='#96B0BD'
                            stroke='#96B0BD'
                            strokeWidth='1.5'
                          />
                        </svg>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className='border-none bg-transparent hover:bg-transparent'
                            variant='outline'
                          >
                            <FaEllipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='rounded-xl border-[#3E525B] bg-[#28373E]'>
                          <DropdownMenuCheckboxItem
                            // checked={showStatusBar}
                            // onCheckedChange={setShowStatusBar}
                            className='gap-2 rounded-xl hover:bg-white'
                          >
                            <svg
                              fill='none'
                              height='24'
                              viewBox='0 0 24 24'
                              width='24'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M12 9V14'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M12.0004 21.4098H5.94042C2.47042 21.4098 1.02042 18.9298 2.70042 15.8998L5.82042 10.2798L8.76042 4.99979C10.5404 1.78979 13.4604 1.78979 15.2404 4.99979L18.1804 10.2898L21.3004 15.9098C22.9804 18.9398 21.5204 21.4198 18.0604 21.4198H12.0004V21.4098Z'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M11.9941 17H12.0031'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                            </svg>
                            Report
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            // checked={showActivityBar}
                            // onCheckedChange={setShowActivityBar}
                            className='mt-1 gap-2 rounded-xl hover:bg-white'
                          >
                            <svg
                              fill='none'
                              height='24'
                              viewBox='0 0 24 24'
                              width='24'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.91 14.64 21.16 15.65 21.98C15.44 22 15.22 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M2.51953 7.10986H21.4796'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M8.51953 2.10986V6.96985'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M15.4795 2.10986V6.5199'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M23 18.5C23 19.85 22.4 21.05 21.47 21.88C20.67 22.57 19.64 23 18.5 23C17.42 23 16.42 22.62 15.65 21.98C14.64 21.16 14 19.91 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeMiterlimit='10'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M18.7799 17.0898V18.7798L17.3799 19.6198'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeMiterlimit='10'
                                strokeWidth='1.5'
                              />
                            </svg>
                            Extend The Delivery Date
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            // checked={showPanel}
                            // onCheckedChange={setShowPanel}
                            className='mt-1 gap-2 rounded-xl hover:bg-white'
                          >
                            <svg
                              fill='none'
                              height='24'
                              viewBox='0 0 24 24'
                              width='24'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M10.75 14.4302V9.3702C10.75 8.8902 10.55 8.7002 10.04 8.7002H8.75004C8.24004 8.7002 8.04004 8.8902 8.04004 9.3702V14.4302C8.04004 14.9102 8.24004 15.1002 8.75004 15.1002H10.04C10.55 15.1002 10.75 14.9102 10.75 14.4302Z'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M16.0303 14.4302V9.3702C16.0303 8.8902 15.8303 8.7002 15.3203 8.7002H14.0303C13.5203 8.7002 13.3203 8.8902 13.3203 9.3702V14.4302C13.3203 14.9102 13.5203 15.1002 14.0303 15.1002'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                            </svg>
                            Pause The Order
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            // checked={showPanel}
                            // onCheckedChange={setShowPanel}
                            className='mt-1 gap-2 rounded-xl hover:bg-white'
                          >
                            <svg
                              fill='none'
                              height='24'
                              viewBox='0 0 24 24'
                              width='24'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeMiterlimit='10'
                                strokeWidth='1.5'
                              />
                              <path
                                d='M18.9004 5L4.90039 19'
                                stroke='#96B0BD'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeMiterlimit='10'
                                strokeWidth='1.5'
                              />
                            </svg>
                            Cancel Order
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                  {!isSmallScreen && (
                    <div className='flex w-full flex-col justify-between'>
                      <div className='mt-1 flex flex-col-reverse items-start justify-between md:flex-row md:items-center'>
                        <div className='mt-3 flex-1 text-left text-[20px] md:mt-0 md:text-2xl'>
                          {gig.gigTitle}
                        </div>
                        <div className='flex flex-none flex-row items-center gap-2'>
                          {!gig?.likeUsers?.includes(auth?.currentProfile?.userId?.toString()) ? (
                            <svg
                              className='cursor-pointer'
                              fill='none'
                              height='32'
                              onClick={() =>
                                handleLikeUnlikeGig(
                                  gig._id,
                                  index,
                                  !gig?.likeUsers?.includes(
                                    auth?.currentProfile?.userId?.toString()
                                  )
                                )
                              }
                              viewBox='0 0 32 32'
                              width='32'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M15.4138 11.3348L16.0143 12.1375L16.6149 11.3348C17.4058 10.2776 18.6725 9.59131 20.0843 9.59131C22.4808 9.59131 24.431 11.5437 24.431 13.9655C24.431 14.9747 24.2701 15.9053 23.9907 16.7688L23.9892 16.7737C23.3187 18.8954 21.941 20.6156 20.44 21.9056C18.9356 23.1985 17.3503 24.022 16.3411 24.3654L16.3411 24.3654L16.333 24.3682C16.2824 24.3861 16.167 24.408 16.0143 24.408C15.8617 24.408 15.7462 24.3861 15.6956 24.3682L15.6956 24.3682L15.6876 24.3654C14.6783 24.022 13.0931 23.1985 11.5887 21.9056C10.0876 20.6156 8.70993 18.8954 8.03947 16.7737L8.03948 16.7737L8.03791 16.7688C7.75853 15.9053 7.59766 14.9747 7.59766 13.9655C7.59766 11.5437 9.54787 9.59131 11.9443 9.59131C13.3561 9.59131 14.6229 10.2776 15.4138 11.3348Z'
                                stroke='#96B0BD'
                                strokeWidth='1.5'
                              />
                            </svg>
                          ) : (
                            <svg
                              className='cursor-pointer'
                              fill='none'
                              height='32'
                              onClick={() =>
                                handleLikeUnlikeGig(
                                  gig._id,
                                  index,
                                  !gig?.likeUsers?.includes(
                                    auth?.currentProfile?.userId?.toString()
                                  )
                                )
                              }
                              viewBox='0 0 32 32'
                              width='32'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M15.4138 11.8348L16.0143 12.6375L16.6149 11.8348C17.4058 10.7776 18.6725 10.0913 20.0843 10.0913C22.4808 10.0913 24.431 12.0437 24.431 14.4655C24.431 15.4747 24.2701 16.4053 23.9907 17.2688L23.9892 17.2737C23.3187 19.3954 21.941 21.1156 20.44 22.4056C18.9356 23.6985 17.3503 24.522 16.3411 24.8654L16.3411 24.8654L16.333 24.8682C16.2824 24.8861 16.167 24.908 16.0143 24.908C15.8617 24.908 15.7462 24.8861 15.6956 24.8682L15.6956 24.8682L15.6876 24.8654C14.6783 24.522 13.0931 23.6985 11.5887 22.4056C10.0876 21.1156 8.70993 19.3954 8.03947 17.2737L8.03948 17.2737L8.03791 17.2688C7.75853 16.4053 7.59766 15.4747 7.59766 14.4655C7.59766 12.0437 9.54787 10.0913 11.9443 10.0913C13.3561 10.0913 14.6229 10.7776 15.4138 11.8348Z'
                                fill='#96B0BD'
                                stroke='#96B0BD'
                                strokeWidth='1.5'
                              />
                            </svg>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                className='border-none bg-transparent hover:bg-transparent'
                                variant='outline'
                              >
                                <FaEllipsis />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='rounded-xl border-[#3E525B] bg-[#28373E]'>
                              <DropdownMenuCheckboxItem
                                // checked={showStatusBar}
                                // onCheckedChange={setShowStatusBar}
                                className='gap-2 rounded-xl hover:bg-white'
                              >
                                <svg
                                  fill='none'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  width='24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M12 9V14'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M12.0004 21.4098H5.94042C2.47042 21.4098 1.02042 18.9298 2.70042 15.8998L5.82042 10.2798L8.76042 4.99979C10.5404 1.78979 13.4604 1.78979 15.2404 4.99979L18.1804 10.2898L21.3004 15.9098C22.9804 18.9398 21.5204 21.4198 18.0604 21.4198H12.0004V21.4098Z'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M11.9941 17H12.0031'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                </svg>
                                Report
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                // checked={showActivityBar}
                                // onCheckedChange={setShowActivityBar}
                                className='mt-1 gap-2 rounded-xl hover:bg-white'
                              >
                                <svg
                                  fill='none'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  width='24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.91 14.64 21.16 15.65 21.98C15.44 22 15.22 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M2.51953 7.10986H21.4796'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M8.51953 2.10986V6.96985'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M15.4795 2.10986V6.5199'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M23 18.5C23 19.85 22.4 21.05 21.47 21.88C20.67 22.57 19.64 23 18.5 23C17.42 23 16.42 22.62 15.65 21.98C14.64 21.16 14 19.91 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M18.7799 17.0898V18.7798L17.3799 19.6198'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'
                                    strokeWidth='1.5'
                                  />
                                </svg>
                                Extend The Delivery Date
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                // checked={showPanel}
                                // onCheckedChange={setShowPanel}
                                className='mt-1 gap-2 rounded-xl hover:bg-white'
                              >
                                <svg
                                  fill='none'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  width='24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M10.75 14.4302V9.3702C10.75 8.8902 10.55 8.7002 10.04 8.7002H8.75004C8.24004 8.7002 8.04004 8.8902 8.04004 9.3702V14.4302C8.04004 14.9102 8.24004 15.1002 8.75004 15.1002H10.04C10.55 15.1002 10.75 14.9102 10.75 14.4302Z'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M16.0303 14.4302V9.3702C16.0303 8.8902 15.8303 8.7002 15.3203 8.7002H14.0303C13.5203 8.7002 13.3203 8.8902 13.3203 9.3702V14.4302C13.3203 14.9102 13.5203 15.1002 14.0303 15.1002'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                </svg>
                                Pause The Order
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                // checked={showPanel}
                                // onCheckedChange={setShowPanel}
                                className='mt-1 gap-2 rounded-xl hover:bg-white'
                              >
                                <svg
                                  fill='none'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  width='24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M18.9004 5L4.90039 19'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'
                                    strokeWidth='1.5'
                                  />
                                </svg>
                                Cancel Order
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className='mt-3 flex flex-row-reverse items-start justify-between gap-6 md:flex-row md:justify-start'>
                        <div className='flex flex-row items-center gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                          </svg>
                          Posted {minutesDifference(gig.gigPostDate)}
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 25 24'
                            width='25'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12.75 13.4299C14.4731 13.4299 15.87 12.0331 15.87 10.3099C15.87 8.58681 14.4731 7.18994 12.75 7.18994C11.0269 7.18994 9.63 8.58681 9.63 10.3099C9.63 12.0331 11.0269 13.4299 12.75 13.4299Z'
                              stroke='#96B0BD'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M4.37001 8.49C6.34001 -0.169998 19.17 -0.159997 21.13 8.5C22.28 13.58 19.12 17.88 16.35 20.54C14.34 22.48 11.16 22.48 9.14001 20.54C6.38001 17.88 3.22001 13.57 4.37001 8.49Z'
                              stroke='#96B0BD'
                              strokeWidth='1.5'
                            />
                          </svg>
                          {gig.location}
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 25 24'
                            width='25'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12.9099 10.87C12.8099 10.86 12.6899 10.86 12.5799 10.87C10.1999 10.79 8.30994 8.84 8.30994 6.44C8.30994 3.99 10.2899 2 12.7499 2C15.1999 2 17.1899 3.99 17.1899 6.44C17.1799 8.84 15.2899 10.79 12.9099 10.87Z'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.49854'
                            />
                            <path
                              d='M7.91009 14.56C5.49009 16.18 5.49009 18.82 7.91009 20.43C10.6601 22.27 15.1701 22.27 17.9201 20.43C20.3401 18.81 20.3401 16.17 17.9201 14.56C15.1801 12.73 10.6701 12.73 7.91009 14.56Z'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.49854'
                            />
                          </svg>
                          {gig.proposalUsers.length} Applicants
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                          <svg
                            fill='none'
                            height='24'
                            viewBox='0 0 25 24'
                            width='25'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M9.42188 14.3298C9.42188 15.6198 10.4119 16.6598 11.6419 16.6598H14.1519C15.2219 16.6598 16.0919 15.7498 16.0919 14.6298C16.0919 13.4098 15.5619 12.9798 14.7719 12.6998L10.7419 11.2998C9.95187 11.0198 9.42188 10.5898 9.42188 9.36984C9.42188 8.24984 10.2919 7.33984 11.3619 7.33984H13.8719C15.1019 7.33984 16.0919 8.37984 16.0919 9.66984'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M12.75 6V18'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M12.75 22C18.2728 22 22.75 17.5228 22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22Z'
                              stroke='#96B0BD'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                          </svg>
                          {gig.gigPaymentType ? 'Hourly' : 'Fixed'}:{' '}
                          {gig.gigPaymentType
                            ? `$${gig.minBudget} ~ $${gig.maxBudget}`
                            : `${gig.gigPrice}`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {isSmallScreen && (
                  <div className='flex w-full flex-col justify-between'>
                    <div className='mt-1 flex flex-col-reverse items-start justify-between md:flex-row md:items-center'>
                      <div className='mt-3 flex-1 text-left text-[20px] md:mt-0 md:text-2xl'>
                        {gig.gigTitle}
                      </div>
                    </div>
                    <div className='mt-3 flex flex-row-reverse items-start justify-between gap-6 md:flex-row md:justify-start'>
                      <div className='flex flex-row items-center gap-2'>
                        <svg
                          fill='none'
                          height='24'
                          viewBox='0 0 24 24'
                          width='24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z'
                            stroke='#96B0BD'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                          />
                          <path
                            d='M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977'
                            stroke='#96B0BD'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                          />
                        </svg>
                        Posted {minutesDifference(gig.gigPostDate)}
                      </div>
                      <div className='flex flex-row items-center gap-2'>
                        <svg
                          fill='none'
                          height='24'
                          viewBox='0 0 25 24'
                          width='25'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M12.75 13.4299C14.4731 13.4299 15.87 12.0331 15.87 10.3099C15.87 8.58681 14.4731 7.18994 12.75 7.18994C11.0269 7.18994 9.63 8.58681 9.63 10.3099C9.63 12.0331 11.0269 13.4299 12.75 13.4299Z'
                            stroke='#96B0BD'
                            strokeWidth='1.5'
                          />
                          <path
                            d='M4.37001 8.49C6.34001 -0.169998 19.17 -0.159997 21.13 8.5C22.28 13.58 19.12 17.88 16.35 20.54C14.34 22.48 11.16 22.48 9.14001 20.54C6.38001 17.88 3.22001 13.57 4.37001 8.49Z'
                            stroke='#96B0BD'
                            strokeWidth='1.5'
                          />
                        </svg>
                        {gig.location}
                      </div>
                    </div>
                    <div className='mt-3 flex items-start justify-between gap-6 md:flex-row md:justify-start'>
                      <div className='flex flex-row items-center gap-2'>
                        <svg
                          fill='none'
                          height='24'
                          viewBox='0 0 25 24'
                          width='25'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M12.9099 10.87C12.8099 10.86 12.6899 10.86 12.5799 10.87C10.1999 10.79 8.30994 8.84 8.30994 6.44C8.30994 3.99 10.2899 2 12.7499 2C15.1999 2 17.1899 3.99 17.1899 6.44C17.1799 8.84 15.2899 10.79 12.9099 10.87Z'
                            stroke='#96B0BD'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.49854'
                          />
                          <path
                            d='M7.91009 14.56C5.49009 16.18 5.49009 18.82 7.91009 20.43C10.6601 22.27 15.1701 22.27 17.9201 20.43C20.3401 18.81 20.3401 16.17 17.9201 14.56C15.1801 12.73 10.6701 12.73 7.91009 14.56Z'
                            stroke='#96B0BD'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.49854'
                          />
                        </svg>
                        {gig.proposalUsers.length} Applicants
                      </div>
                      <div className='flex flex-row items-center gap-2'>
                        <svg
                          fill='none'
                          height='24'
                          viewBox='0 0 25 24'
                          width='25'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M9.42188 14.3298C9.42188 15.6198 10.4119 16.6598 11.6419 16.6598H14.1519C15.2219 16.6598 16.0919 15.7498 16.0919 14.6298C16.0919 13.4098 15.5619 12.9798 14.7719 12.6998L10.7419 11.2998C9.95187 11.0198 9.42188 10.5898 9.42188 9.36984C9.42188 8.24984 10.2919 7.33984 11.3619 7.33984H13.8719C15.1019 7.33984 16.0919 8.37984 16.0919 9.66984'
                            stroke='#96B0BD'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                          />
                          <path
                            d='M12.75 6V18'
                            stroke='#96B0BD'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                          />
                          <path
                            d='M12.75 22C18.2728 22 22.75 17.5228 22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22Z'
                            stroke='#96B0BD'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                          />
                        </svg>
                        {gig.gigPaymentType ? 'Hourly' : 'Fixed'}:{' '}
                        {gig.gigPaymentType
                          ? `$${gig.minBudget} ~ $${gig.maxBudget}`
                          : `${gig.gigPrice}`}
                      </div>
                    </div>
                  </div>
                )}
                <Separator className='my-4' />
                <div className='text-left text-[#96B0BD]'>
                  <pre className='whitespace-pre-wrap font-roboto'>
                    {gig.gigDescription.length < descriptionTextMaxLength
                      ? gig.gigDescription
                      : filteredGigShowModeList[index]
                        ? gig.gigDescription
                        : gig.gigDescription.slice(0, descriptionTextMaxLength) + '...'}
                  </pre>
                </div>
                <div className='mt-3 text-left'>
                  {gig.gigDescription.length < descriptionTextMaxLength ? (
                    <></>
                  ) : !filteredGigShowModeList[index] ? (
                    <button
                      onClick={() => {
                        const tempShowModeList = filteredGigShowModeList.map((item, i) => {
                          if (i == index) {
                            return true;
                          } else {
                            return item;
                          }
                        });

                        setFilteredGigShowModeList(tempShowModeList);
                      }}
                    >
                      Show more
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const tempShowModeList = filteredGigShowModeList.map((item, i) => {
                          if (i == index) {
                            return false;
                          } else {
                            return item;
                          }
                        });

                        setFilteredGigShowModeList(tempShowModeList);
                      }}
                    >
                      Show less
                    </button>
                  )}
                </div>
                <div className='flex flex-col justify-between md:flex-row md:items-center'>
                  <div className='mt-4 flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
                    {gig.requiredSkills.map((item, index) => {
                      return (
                        <span
                          className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                          key={index}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                  <Link
                    href={`/dashboard/freelancer/job-application/${gig._id}`}
                    onClick={() => handleRecentView(gig._id)}
                    target='_blank'
                  >
                    <button
                      className={`mt-2 rounded-xl bg-[#DC4F13] p-4 px-[5vw] pl-[5vw] md:mt-0 md:flex-none ${
                        isSmallScreen ? 'w-full' : ''
                      }`}
                    >
                      Apply
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
          <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
            Load more +{' '}
          </button>
        </>
      )}
      {filteredGigList.length === 0 && (
        <div className='mt-6 w-full border border-[#28373E] p-3 text-center'>No data found</div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default FindJob;
