'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { FaArrowRight, FaEllipsis, FaX } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';

import searchOptions from '../../client/freelancers/searchOptions';

import { FilterIcon } from '@/components/elements/svgs/FilterIcon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/seperator';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/ContextProvider';
import { useGetClientGigs } from '@/hooks/useGetClientGigs';
import api from '@/utils/api';
import { minutesDifference } from '@/utils/Helpers';
import { COUNTRIES } from '@/utils/constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DropdownItem = ({ onCheckedChange, isChecked, ...props }) => {
  return (
    <div className='flex cursor-pointer items-center gap-4 p-0'>
      <Checkbox
        checked={isChecked}
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

const MyJob = () => {
  const router = useRouter();
  const auth = useCustomContext();
  const { toast } = useToast();
  const [sortOrder, setSortOrder] = useState('');

  const [gigList, setGigList] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [searchType, setSearchType] = useState('normal');
  const [searchKeyWords, setSearchKeyWords] = useState('');
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [filteredMyJobs, setFilteredMyJobs] = useState([
    {
      title: 'Microsoft',
      location: 'Newyok, United States',
      time: 'Applied Today',
      favourite: false,
    },
    {
      title: 'Google',
      location: 'London, United Kingdom',
      time: 'Applied Today',
      favourite: true,
    },
    {
      title: 'Spotify',
      location: 'London, Qatar',
      time: 'Applied Today',
      favourite: false,
    },
  ]);
  const [filteredGigShowModeList, setFilteredGigShowModeList] = useState([]);
  const [locationFilters, setLocationFilters] = useState([]);
  const [countries, setCountries] = useState(COUNTRIES);
  const [locationText, setLocationText] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isAiSearch, setIsAiSearch] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isHourly, setIsHourly] = useState(false);
  const [isBoth, setIsBoth] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(0);

  const itemsPerPage = 5;
  const { data: clientGigs } = useGetClientGigs(
    page,
    itemsPerPage,
    searchKeyWords,
    filters,
    locationFilters
  );
  const [isSmallScreen, setIsSmallScree] = useState(false);
  const descriptionTextMaxLength = 320;

  const filterItems = [
    {
      content: [
        { category_id: 'payment', category_name: 'Any Type', category_value: 'any' },
        { category_id: 'payment', category_name: 'Hourly', category_value: 'hourly' },
        { category_id: 'payment', category_name: 'Fixed', category_value: 'fixed' },
      ],
      title: 'Payment',
    },
    {
      content: [
        { category_id: 'amount', category_value: 'any', category_name: 'Any Rate' },
        { category_id: 'amount', category_value: [0, 100], category_name: '$100 and Below' },
        { category_id: 'amount', category_value: [100, 500], category_name: '$100 to $500' },
        { category_id: 'amount', category_value: [500, 1000], category_name: '$500 to $1000' },
        { category_id: 'amount', category_value: [1000, 5000], category_name: '$1000 to $5000' },
        {
          category_id: 'amount',
          category_value: [5000, 99999999],
          category_name: '$5000 and Above',
        },
      ],
      title: 'Amount(Fixed)',
    },
    {
      content: [
        { category_id: 'hourly', category_value: 'any', category_name: 'Any Rate' },
        { category_id: 'hourly', category_value: [0, 10], category_name: '$10 and Below' },
        { category_id: 'hourly', category_value: [10, 30], category_name: '$10 to $30' },
        { category_id: 'hourly', category_value: [30, 60], category_name: '$30 to $60' },
        { category_id: 'hourly', category_value: [60, 99999999], category_name: '$60 and Above' },
      ],
      title: 'Amount(Hourly)',
    },
    {
      content: [
        { category_id: 'applicants', category_name: 'Any Applicants', category_value: 0 },
        { category_id: 'applicants', category_name: '1+ Applicants', category_value: 1 },
        { category_id: 'applicants', category_name: '10+ Applicants', category_value: 10 },
        { category_id: 'applicants', category_name: '100+ Applicants', category_value: 100 },
      ],
      title: 'Applicants',
    },
    {
      content: [
        {
          category_id: 'skills',
          category_name: 'Any Skills',
          category_value: 'any',
        },
        {
          category_id: 'skills',
          category_name: 'Web Development',
          category_value: 'Web Development',
        },
        { category_id: 'skills', category_name: 'JavaScript', category_value: 'JavaScript' },
        {
          category_id: 'skills',
          category_name: 'Desktop Application',
          category_value: 'Desktop Application',
        },
        { category_id: 'skills', category_name: 'Python', category_value: 'Python' },
        { category_id: 'skills', category_name: 'MongoDB', category_value: 'MongoDB' },
      ],
      title: 'Skills',
    },
  ];
  //   useEffect(() => {
  //     setPage(1);
  //     setCanLoadMore(true);
  //   }, [filters]);

  //   useEffect(() => {
  //     if (clientGigs) {
  //       setGigList(clientGigs);
  //     }
  //   }, [clientGigs]);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       if (window.innerWidth < 768) {
  //         setIsSmallScree(true);
  //         setLoaded(true);
  //       } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
  //         setIsSmallScree(false);
  //         setLoaded(true);
  //       } else {
  //         setIsSmallScree(false);
  //         setLoaded(true);
  //       }
  //     };

  //     handleResize();

  //     window.addEventListener('resize', handleResize);

  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     setPage(1);
  //     setCanLoadMore(true);
  //   }, [searchKeyWords]);

  //   useEffect(() => {
  //     setCountries(
  //       COUNTRIES.filter((item) =>
  //         item.toLocaleLowerCase().includes(locationText.toLocaleLowerCase())
  //       )
  //     );
  //   }, [locationText]);

  //   useEffect(() => {
  //     if (gigList?.length > 0) {
  //       setCanLoadMore(true);
  //       if (page === 1) {
  //         setFilteredMyJobs(gigList);
  //       } else {
  //         setFilteredMyJobs((prev) => {
  //           let result = [...prev];
  //           const ids = prev.map((item) => item._id);

  //           gigList.map((cg) => {
  //             if (!ids.includes(cg._id)) {
  //               result = [...result, cg];
  //             }
  //           });

  //           return result;
  //         });
  //       }
  //     } else {
  //       if (page === 1) {
  //         setFilteredMyJobs([]);
  //       }
  //       setCanLoadMore(false);
  //     }

  //   }, [gigList, page]);

  //   useEffect(() => {
  //     setFilteredGigShowModeList(new Array(filteredMyJobs.length).fill(false));
  //   }, [filteredMyJobs])

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const setKey = (e) => {
    setPage(1);
    setSearchKeyWords(e.target.value);
  };

  const setOrder = (value) => {
    setSortOrder(value);
    let sorted = filteredMyJobs;
    if (sortOrder === 'dateAsc') {
      sorted.sort((a, b) => new Date(a.gigPostDate) - new Date(b.gigPostDate));
    } else if (sortOrder === 'dateDesc') {
      sorted.sort((a, b) => new Date(b.gigPostDate) - new Date(a.gigPostDate));
    }
    setFilteredMyJobs(sorted);
    setFilteredGigShowModeList(new Array(sorted.length).fill(false));
  };

  const aiSearch = () => {
    setLoading(true);
    api.get(`/api/v1/client_gig/ai-search/${searchKeyWords}`).then((data) => {
      let gigs = data.data.gigs;
      let reasons = data.data.reasons;
      gigs = gigs.map((gig, index) => {
        gig.reason = reasons[index];
        return gig;
      });
      console.log('new', gigs);
      setLoading(false);
      setFilteredMyJobs(gigs);
      setFilteredGigShowModeList(new Array(gigs.length).fill(false));
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      aiSearch();
    } else {
      setIsAiSearch(false);
    }
  };

  const handleLikeUnlikeGig = async (gigId, index, like) => {
    try {
      if (auth?.currentProfile?.profileType !== 0) {
        toast({
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Please login as a freelancer!</h3>,
          title: <h1 className='text-center'>Error</h1>,
          variant: 'destructive',
        });
        return;
      }
      const updatedGig = await api.put(`/api/v1/client_gig/like-unlike-gig/${gigId}`, { like });

      const tempFilteredGigList = filteredMyJobs.map((gig, i) => {
        if (i == index) {
          return {
            ...gig,
            likeUsers: updatedGig.data.likeUsers,
          };
        }

        return gig;
      });

      setFilteredMyJobs(tempFilteredGigList);
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

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleRemove = (id, name, value) => {
    setFilters((prev) =>
      prev.filter(
        (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
      )
    );
  };

  const onCheckedChange = (isChecked, id, name, value) => {
    if (isChecked) {
      if (id === 'applicants' || id === 'payment') {
        if (id === 'payment') {
          if (name === 'Hourly') {
            setIsHourly(true);
            setIsFixed(false);
            setFilters((prev) => [...prev.filter((f) => f.id !== 'amount')]);
          }
          if (name === 'Fixed') {
            setIsFixed(true);
            setIsHourly(false);
            setFilters((prev) => [...prev.filter((f) => f.id !== 'hourly')]);
          }
          if (name === 'Any Type') {
            setIsFixed(true);
            setIsHourly(true);
          }
        }
        setFilters((prev) => [...prev.filter((f) => f.id !== id), { id, name, value }]);
      }
      if (id === 'skills' || id === 'hourly' || id === 'amount') {
        let filterItemsId = 0,
          filterItemsName = '';
        if (id === 'amount') {
          filterItemsId = 1;
          filterItemsName = 'Any Rate';
        }
        if (id === 'hourly') {
          filterItemsId = 2;
          filterItemsName = 'Any Rate';
        }
        if (id === 'skills') {
          filterItemsId = 4;
          filterItemsName = 'Any Skills';
        }
        if (name !== filterItemsName) {
          filters.filter((f) => f.id === id && f.name !== filterItemsName).length ===
          filterItems[filterItemsId].content.length - 2
            ? setFilters((prev) => [
                ...prev.filter((f) => f.id !== id),
                {
                  id: filterItems[filterItemsId].content[0].category_id,
                  name: filterItems[filterItemsId].content[0].category_name,
                  value: filterItems[filterItemsId].content[0].category_value,
                },
              ])
            : setFilters((prev) => [
                ...prev.filter((f) => !(f.name === filterItemsName && f.id === id)),
                { id, name, value },
              ]);
        } else {
          setFilters((prev) => [
            ...prev.filter((f) => f.id !== id),
            {
              id: filterItems[filterItemsId].content[0].category_id,
              name: filterItems[filterItemsId].content[0].category_name,
              value: filterItems[filterItemsId].content[0].category_value,
            },
          ]);
        }
        // setFilters((prev) => [...prev.filter((f) => f.id !== id), { id, name, value }]);
      }
    } else {
      if (id === 'payment') {
        if (name === 'Hourly') setIsHourly(false);
        if (name === 'Fixed') setIsFixed(false);
        if (name === 'Any Type') {
          setIsFixed(false);
          setIsHourly(false);
        }
      }
      setFilters((prev) =>
        prev.filter(
          (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
        )
      );
    }
  };

  const onCheckedLocationChange = (value, id, name) => {
    if (value) {
      setLocationFilters((prev) => [...prev, name]);
    } else {
      setLocationFilters((prev) => prev.filter((item) => item !== name));
    }
  };

  const handleClearAll = () => {
    setFilters([]);
  };
  function truncateString(str) {
    // Find the first comma's index
    const commaIndex = str.indexOf(',');

    // If a comma is found before 15 characters
    if (commaIndex > 0 && commaIndex < 15) {
      return str.substring(0, commaIndex) + '...';
    }
    return str;
  }
  return loaded ? (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
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
        {/* <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl transition hover:bg-[#1B272C] mobile:hidden'>
          <IoLocationOutline size={20} stroke='#96B0BD' />
          <span className='text-[#96B0BD]'>Anywhere</span>
        </div> */}
        <Popover>
          <PopoverTrigger asChild>
            <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl px-2 transition hover:bg-[#1B272C] mobile:m-1'>
              <IoLocationOutline size={20} stroke='#96B0BD' />
              {locationFilters.length == 0 ? (
                <span className='text-[#96B0BD]'>Anywhere</span>
              ) : (
                <span className='text-[#96B0BD]'>
                  {locationFilters.join(', ').length > 11
                    ? locationFilters.join(', ').slice(0, 10) + '...'
                    : locationFilters.join(', ')}
                </span>
              )}
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#DC4F13] text-sm mobile:h-4 mobile:w-4 mobile:text-sm'>
                {locationFilters.length}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align='end'
            className='mt-3 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] py-4 pl-4 pr-1'
          >
            <div className='country-list max-h-[300px] overflow-y-auto'>
              <div className='sticky top-0 mb-1 flex bg-[#1B272C] p-1'>
                <input
                  className='relative w-full rounded-full border-2 border-[#96B0BD] bg-transparent px-7 text-[#96B0BD] outline-none mobile:text-sm'
                  onChange={(e) => {
                    setLocationText(e.target.value);
                  }}
                  value={locationText}
                />
                <svg
                  className='absolute left-3 top-2 h-5 w-5'
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
              {countries.length > 0 ? (
                <div className='flex flex-col gap-2'>
                  {countries.map((con, i) => {
                    return (
                      <DropdownItem
                        category_id={con}
                        category_name={con}
                        isChecked={locationFilters.includes(con)}
                        key={i}
                        onCheckedChange={(value) => onCheckedLocationChange(value, con, con)}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className='flex flex-col gap-2'>
                  <span className='text-[#96B0BD]'>No results found</span>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        {(!isSmallScreen || searchType === 'normal') && (
          <Popover>
            <PopoverTrigger asChild>
              <button className='m-3 flex flex-row items-center justify-center gap-3'>
                <FilterIcon isFiltered={filters.length > 0} isSmallScreen={isSmallScreen} />
                {!isSmallScreen && (
                  <div className='flex flex-row gap-2'>
                    <div>Filter</div>
                    {filters.length > 0 && (
                      <div className='flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#DC4F13] text-center align-middle'>
                        {filters.length}
                      </div>
                    )}
                  </div>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent
              align='end'
              className='mt-3 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] px-6 py-4'
            >
              <div className='grid grid-cols-1 gap-4 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {filterItems.map((item, index) => {
                  if (
                    !(
                      (item.title === 'Amount(Fixed)' && !isFixed) ||
                      (item.title === 'Amount(Hourly)' && !isHourly)
                    )
                  )
                    return (
                      <div className='flex flex-col gap-2' key={index}>
                        <div>{item.title}</div>
                        {item.content.map((con, i) => {
                          return (
                            <DropdownItem
                              category_id={con.category_id + con.category_value}
                              category_name={con.category_name}
                              isChecked={
                                !!filters.find(
                                  (f) =>
                                    f.id === con.category_id &&
                                    f.name === con.category_name &&
                                    JSON.stringify(f.value) === JSON.stringify(con.category_value)
                                )
                              }
                              key={i}
                              onCheckedChange={(value) =>
                                onCheckedChange(
                                  value,
                                  con.category_id,
                                  con.category_name,
                                  con.category_value
                                )
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
              className='hidden w-12 items-center justify-center self-stretch rounded-e-[15px] rounded-s-[0px] bg-orange text-lg text-white mobile:flex'
              onClick={aiSearch}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      {filters.length > 0 && (
        <div className='mt-4 flex touch-pan-x flex-row flex-wrap items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
          {filters.map((filter, index) => {
            return (
              <span
                className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                key={index}
              >
                <FaX
                  className='rounded-full bg-[#3E525B] p-[2px]'
                  onClick={() => handleRemove(filter.id, filter.name, filter.value)}
                />
                {filter.name}
              </span>
            );
          })}

          <span className='cursor-pointer' onClick={handleClearAll}>
            Clear&nbsp;All
          </span>
        </div>
      )}
      {loading && (
        <div className='z-1 flex h-screen justify-center space-x-2 pt-6'>
          <div className='mt-8 flex h-fit items-baseline text-[20px]'>
            <p className='mr-3'>The neural network is thinking</p>
            <div className='flex gap-1'>
              <div className='h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]' />
              <div className='h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]' />
              <div className='h-2 w-2 animate-bounce rounded-full bg-white' />
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div>
          <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
            You have <span className='font-bold text-[#DC4F13]'>{filteredMyJobs.length}</span> Jobs
            en total
          </div>
          <div className='flex'>
            <div
              className={`flex h-[90px] flex-1 cursor-pointer items-center justify-center border-b-[5px] ${currentStatus === 0 ? 'border-orange' : 'border-[#516170]'}`}
              onClick={() => setCurrentStatus(0)}
            >
              <p>Active</p>
            </div>
            <div
              className={`flex h-[90px] flex-1 cursor-pointer items-center justify-center border-b-[5px] ${currentStatus === 1 ? 'border-orange' : 'border-[#516170]'}`}
              onClick={() => setCurrentStatus(1)}
            >
              <p>Favourites</p>
            </div>
          </div>
          {filteredMyJobs.length > 0 &&
            (currentStatus === 0 ? (
              <div className='mt-6 flex flex-col gap-2'>
                {filteredMyJobs.map((myJob, index) => {
                  return (
                    <div
                      className='flex flex-col gap-4 rounded-2xl bg-[#10191d] p-[30px]'
                      key={index}
                    >
                      <div className='flex justify-between'>
                        <p className='text-2xl font-bold'>{myJob.title}</p>
                        <div className='flex items-center gap-4'>
                          <div className='flex h-6 items-center rounded-[6px] border border-[#1bbf35] px-[10px] py-2 text-sm text-[#1bbf35]'>
                            Applied
                          </div>
                          <img
                            src={
                              myJob.favourite
                                ? '/assets/images/icons/heart-fill.svg'
                                : '/assets/images/icons/heart.svg'
                            }
                          />
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
                              <DropdownMenuCheckboxItem className='gap-2 rounded-xl hover:bg-white'>
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
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className='flex gap-4'>
                        <img src='/assets/images/icons/location.svg' />
                        <p>{myJob.location}</p>
                        <img src='/assets/images/icons/clocks.svg' />
                        <p>{myJob.time}</p>
                      </div>
                    </div>
                  );
                })}
                {canLoadMore && (
                  <button
                    className='mt-6 w-full border border-[#28373E] p-3 text-center'
                    onClick={handleLoadMore}
                  >
                    Load more +{' '}
                  </button>
                )}
              </div>
            ) : (
              <div className='mt-6 flex flex-col gap-2'>
                {filteredMyJobs
                  .filter((item) => item.favourite === true)
                  .map((myJob, index) => {
                    return (
                      <div
                        className='flex flex-col gap-4 rounded-2xl bg-[#10191d] p-[30px]'
                        key={index}
                      >
                        <div className='flex justify-between'>
                          <p className='text-2xl font-bold'>{myJob.title}</p>
                          <div className='flex items-center gap-4'>
                            <div className='flex h-6 items-center rounded-[6px] border border-[#1bbf35] px-[10px] py-2 text-sm text-[#1bbf35]'>
                              Applied
                            </div>
                            <img
                              src={
                                myJob.favourite
                                  ? '/assets/images/icons/heart-fill.svg'
                                  : '/assets/images/icons/heart.svg'
                              }
                            />
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
                                <DropdownMenuCheckboxItem className='gap-2 rounded-xl hover:bg-white'>
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
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className='flex gap-4'>
                          <img src='/assets/images/icons/location.svg' />
                          <p>{myJob.location}</p>
                          <img src='/assets/images/icons/clocks.svg' />
                          <p>{myJob.time}</p>
                        </div>
                      </div>
                    );
                  })}
                {canLoadMore && (
                  <button
                    className='mt-6 w-full border border-[#28373E] p-3 text-center'
                    onClick={handleLoadMore}
                  >
                    Load more +{' '}
                  </button>
                )}
              </div>
            ))}
          {filteredMyJobs.length === 0 && (
            <div className='mt-6 w-full border border-[#28373E] p-3 text-center'>No data found</div>
          )}
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default MyJob;
