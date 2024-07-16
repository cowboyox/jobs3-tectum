'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { CiClock2, CiFilter, CiReceipt } from 'react-icons/ci';

import searchOptions from '../freelancers/searchOptions';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';
import { minutesDifference } from '@/utils/Helpers';
import { Checkbox } from '@/components/ui/checkbox';
import { FaArrowRight, FaEllipsis, FaX } from 'react-icons/fa6';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FilterIcon } from '@/components/elements/svgs/FilterIcon';
import { IoLocationOutline } from 'react-icons/io5';
import { useGetClientGigsPostedByProfileId } from '@/hooks/useGetClientGigsPostedByProfileId';
import { COUNTRIES } from '@/utils/constants';


const DropdownItem = ({ onCheckedChange, isChecked, ...props }) => {
  return (
    <div className='flex items-center gap-4 p-0 cursor-pointer'>
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

const Status = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 0:
        return 'border-green-500 text-green-500';
      case 'declined':
        return 'border-red-500 text-red-500';
      default:
        return 'border-gray-500 text-gray-500';
    }
  };

  const getStatusContent = () => {
    switch (status) {
      case 0:
        return 'Active';
      case 1:
        return 'Hired';
      case 2:
        return 'Ended';
    }
  };

  return (
    <div className={`rounded border px-2 py-1 text-sm capitalize ${getStatusStyles()}`}>
      {getStatusContent(status)}
    </div>
  );
};

const GigCard = ({ gig }) => {
  const router = useRouter();

  return (
    <div className='mb-4 flex justify-between rounded-xl bg-[#10191d] p-7 mobile:flex-col-reverse mobile:gap-3 mobile:p-3'>
      <div className='flex flex-col gap-1'>
        <h2
          className='text-xl text-white cursor-pointer'
          onClick={() => router.push(`./edit-gig/${gig._id}`)}
        >
          {gig.gigTitle}
        </h2>
        <div className='flex items-center gap-5 mt-2 text-gray-400'>
          <div className='flex items-center gap-2'>
            <CiClock2 size={24} />
            <span className='text-base'>{minutesDifference(gig.gigPostDate)}</span>
          </div>
          <div className='flex items-center gap-2'>
            <CiReceipt size={28} />
            <span className='text-base'>
              ${!gig.gigPaymentType ? gig.gigPrice : `${gig.minBudget} - ${gig.maxBudget} /hr`}
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-start gap-3 mobile:justify-between'>
        <Status status={gig.gigStatus} />
        <BsThreeDots className='flex items-center justify-center w-8 h-8 p-2 transition rounded-full cursor-pointer hover:bg-slate-700' />
      </div>
    </div>
  );
};

const MyGigs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchType, setSearchType] = useState('normal');
  const [searchKeywords, setSearchKeyWords] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const [gigList, setGigList] = useState([]);
  const [filteredGigList, setFilteredGigList] = useState([]);
  // const [filteredGigShowModeList, setFilteredGigShowModeList] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const [isHourly, setIsHourly] = useState(false);
  const [isBoth, setIsBoth] = useState(false);
  const [locationFilters, setLocationFilters] = useState([]);
  const [countries, setCountries] = useState(COUNTRIES);
  const [locationText, setLocationText] = useState("");
  const itemsPerPage = 5;
  const auth = useCustomContext();
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
  const { data: clientGigs } = useGetClientGigsPostedByProfileId(
    auth?.currentProfile?._id,
    page,
    itemsPerPage,
    searchKeywords,
    filters
  );

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
  }, [filters]);

  useEffect(() => {
    if (clientGigs) {
      setGigList(clientGigs);
    }
  }, [clientGigs]);
  useEffect(() => {
    if (gigList?.length > 0) {
      setCanLoadMore(true);
      if (page === 1) {
        setFilteredGigList(gigList);
      } else {
        setFilteredGigList((prev) => {
          let result = [...prev];
          const ids = prev.map((item) => item._id);

          gigList.map((cg) => {
            if (!ids.includes(cg._id)) {
              result = [...result, cg];
            }
          });

          return result;
        });
      }
    } else {
      if (page === 1) {
        setFilteredGigList([]);
      }
      setCanLoadMore(false);
    }
  }, [gigList, page]);

  useEffect(() => {
    setCountries(COUNTRIES.filter((item) => item.toLocaleLowerCase().includes(locationText.toLocaleLowerCase())));
  }, [locationText]);
  
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const onChangeType = (e) => {
    setSearchType(e);
  };
  console.log('gigList', gigList);
  const setKey = (e) => {
    setPage(1);
    setSearchKeyWords(e.target.value);
  };

  const aiSearch = () => {
    api.get(`/api/v1/freelancer_gig/ai-search/${searchKeywords}`).then((data) => {
      let ai_ids = [];
      if (data.data.profileIDs) ai_ids = data.data.profileIDs;
      const ai_filtered = ai_ids
        .map((id) => myGigs.find((gig) => gig._id.toString() === id))
        .filter((gig) => gig != undefined);
      setFilteredGigList(ai_filtered);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      aiSearch();
    }
  };
  const handleClearAll = () => {
    setFilters([]);
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
            setFilters((prev) => [...prev.filter((f) => f.id !== 'amount')])
          }
          if (name === 'Fixed') {
            setIsFixed(true);
            setIsHourly(false);
            setFilters((prev) => [...prev.filter((f) => f.id !== 'hourly')])
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
  
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-stretch w-full gap-5 mobile:flex-col'>
        <div className='flex flex-grow gap-2 rounded-xl bg-[#10191d] p-1 mobile:p-1'>
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
              placeholder='Search by gig title, company, keywords'
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
                {
                  locationFilters.length == 0 ?
                  <span className='text-[#96B0BD]'>Anywhere</span> :
                  <span className='text-[#96B0BD]'>{ locationFilters.join(", ").length > 11 ? locationFilters.join(", ").slice(0,10) + "..." : locationFilters.join(", ") }</span>
                }
                <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#DC4F13] text-sm mobile:h-4 mobile:w-4 mobile:text-sm'>
                  {locationFilters.length}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align='end'
              className='mt-3 flex w-full flex-col gap-4 rounded-xl bg-[#1B272C] pl-4 pr-1 py-4'
            >
              <div className='max-h-[300px] overflow-y-auto country-list'>
                <div className='sticky top-0 flex bg-[#1B272C] p-1 mb-1'>
                  <input 
                    className='w-full px-7 relative text-[#96B0BD] border-[#96B0BD] border-2 bg-transparent rounded-full outline-none mobile:text-sm' 
                    onChange={(e) => {
                      setLocationText(e.target.value);
                    }}
                    value={locationText}
                  />
                  <svg
                    className='absolute w-5 h-5 top-2 left-3'
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
                {
                  countries.length > 0 ?
                  <div className='flex flex-col gap-2'>
                    {countries.map((con, i) => {
                      return (
                        <DropdownItem
                          category_id={con}
                          category_name={con}
                          isChecked={locationFilters.includes(con)}
                          key={i}
                          onCheckedChange={(value) =>
                            onCheckedLocationChange(value, con, con)
                          }
                        />
                      );
                    })}
                  </div> :
                  <div className='flex flex-col gap-2'>
                    <span className='text-[#96B0BD]'>No results found</span>
                  </div>
                }
              </div>
            </PopoverContent>
          </Popover>
          {(!isSmallScreen || searchType === 'normal') && (
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex flex-row items-center justify-center gap-3 m-3'>
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
        <Link
          className='flex w-40 cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-1 text-center text-base transition hover:bg-white hover:text-black mobile:w-full mobile:py-2 mobile:text-center'
          href='./post-gig'
        >
          Post a New Gig
        </Link>
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
      <div className='flex flex-col'>
        {filteredGigList.length ? (
          filteredGigList.map((gig, index) => <GigCard gig={gig} key={index} />)
        ) : (
          <div className='mt-[10vh] text-center'>Not yet</div>
        )}
      </div>
      {canLoadMore && (
        <div
          className='mx-auto w-full max-w-full cursor-pointer rounded-xl border border-[#aaaaaaaa] px-10 py-5 text-center transition hover:bg-white hover:text-black md:text-xl mobile:px-5'
          onClick={handleLoadMore}
        >
          Load More +
        </div>
      )}
    </div>
  );
};

export default MyGigs;
