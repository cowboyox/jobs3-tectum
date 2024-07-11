'use client';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaX } from 'react-icons/fa6';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiRobot2Line } from 'react-icons/ri';

import { FilterIcon } from '@/components/elements/svgs/FilterIcon';
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
import { Separator } from '@/components/ui/seperator';
import { useCustomContext } from '@/context/use-custom';
import { useGetClientGigsContractedWithFreelancer } from '@/hooks/useGetClientGigsContractedWithFreelancer';
import { useGetClientGigsProposedByFreelancer } from '@/hooks/useGetClientGigsProposedByFreelancer';
import { useHandleResize } from '@/hooks/useHandleResize';
import { timeSincePublication } from '@/utils/Helpers';

const DropdownItem = ({ onCheckedChange, isChecked, ...props }) => {
  return (
    <div className='flex cursor-pointer items-center gap-4 p-0'>
      {props.type === 1 && (
        <Checkbox
          checked={isChecked}
          className='rounded border-[#96B0BD] data-[state=checked]:border-orange data-[state=checked]:bg-orange data-[state=checked]:text-white'
          id={props.category_id}
          onCheckedChange={onCheckedChange}
        />
      )}
      <label className='cursor-pointer text-sm text-[#96B0BD]' htmlFor={props.category_id}>
        {props.category_name}
      </label>
    </div>
  );
};

const ActiveOrders = ({ searchText, filters }) => {
  const auth = useCustomContext();
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [gigsActive, setGigsActive] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const { data: gigsProposed } = useGetClientGigsProposedByFreelancer(
    auth?.currentProfile?._id,
    page,
    itemsPerPage,
    searchText,
    filters
  );

  console.log({ filters });

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
  }, [searchText]);

  useEffect(() => {
    if (gigsProposed?.length > 0) {
      setCanLoadMore(true);
      if (page === 1) {
        setGigsActive(gigsProposed);
      } else {
        setGigsActive((prev) => {
          let result = [...prev];
          const ids = prev.map((item) => item._id);

          gigsProposed.map((gp) => {
            if (!ids.includes(gp._id)) {
              result = [...result, gp];
            }
          });

          return result;
        });
      }
    } else {
      if (page === 1) {
        setGigsActive([]);
      }
      setCanLoadMore(false);
    }
  }, [gigsProposed, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
  }, [searchText]);

  return (
    <div className='flex h-full max-h-[45vh] min-h-96 w-full flex-col rounded-2xl bg-deepGreen p-5 md:w-[70%]'>
      <div className='flex h-1/6 items-center justify-between'>
        <h3 className='text-2xl font-semibold text-white'>Active Orders</h3>
        {/* <p className='text-medGray'>See All</p> */}
      </div>
      <div className='mt-6 flex flex-1 flex-col justify-between gap-2'>
        {gigsActive.length ? (
          gigsActive.map((order, index) => (
            <div className='flex flex-col' key={index}>
              <Separator className='my-4' />
              <div className='flex items-center gap-1 rounded-2xl px-3'>
                <div className='flex flex-1 flex-col items-center justify-between md:flex-row'>
                  <div className='flex items-center gap-4'>
                    <h3 className='text-md whitespace-nowrap font-semibold text-white md:text-xl'>
                      {order.gigTitle}
                    </h3>
                  </div>
                  <div className='flex w-full items-center justify-between gap-4 px-4 md:w-auto md:px-0'>
                    <p className='text-xl font-[500] text-medGray'>{order.gigPrice}</p>
                    <div className='flex items-center gap-1 rounded-[6px] border-2 border-yellow-500 px-3 text-yellow-500'>
                      <p>{timeSincePublication(new Date(order.gigPostDate).getTime() / 1000)}</p>
                    </div>
                    <div className='flex items-center gap-1 rounded-[6px] border-2 border-green-500 px-3 text-green-500'>
                      <p>{order.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='mt-[100px] flex items-center justify-center text-2xl font-semibold'>
            Not yet
          </div>
        )}
      </div>
      {canLoadMore && gigsActive.length > 0 && (
        <div
          className='mt-4 cursor-pointer rounded-2xl border border-lightGray py-3 text-center'
          onClick={handleLoadMore}
        >
          Load More +
        </div>
      )}
    </div>
  );
};

const Earnings = ({ searchText, filters }) => {
  const auth = useCustomContext();
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [earnings, setEarnings] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const { data: gigs } = useGetClientGigsContractedWithFreelancer(
    auth?.currentProfile?._id,
    page,
    itemsPerPage,
    searchText,
    filters
  );

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
  }, [searchText]);

  useEffect(() => {
    if (gigs?.earnings?.length > 0) {
      setCanLoadMore(true);
      if (page === 1) {
        setEarnings(gigs?.earnings);
      } else {
        setEarnings((prev) => {
          let result = [...prev];
          const ats = prev.map((item) => item.earnedAt);

          gigs?.earnings.map((earning) => {
            if (!ats.includes(earning.earnedAt)) {
              result = [...result, earning];
            }
          });

          return result;
        });
      }
    } else {
      if (page === 1) {
        setEarnings([]);
      }
      setCanLoadMore(false);
    }
  }, [gigs, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
  }, [searchText]);

  return (
    <div className='flex h-full max-h-[45vh] min-h-96 w-full flex-col rounded-2xl bg-deepGreen p-5 md:w-[30%]'>
      <div className='flex h-1/6 items-center justify-between'>
        <h3 className='text-2xl font-semibold text-white'>Earnings</h3>
        {/* <p className='text-medGray'>See All</p> */}
      </div>
      <div className='mt-6 flex-1'>
        {earnings.length ? (
          earnings.map((earning, index) => (
            <div
              className='mb-2 flex h-[45px] flex-1 items-center justify-between gap-1 rounded-xl bg-darkGray px-3'
              key={index}
            >
              <p className='text-xl font-[500] text-white'>
                {new Date(earning.earnedAt).getMonth() + 1}
              </p>
              <p className='text-xl font-[500] text-medGray'>{earning.amount}</p>
            </div>
          ))
        ) : (
          <div className='mt-[100px] flex items-center justify-center text-2xl font-semibold'>
            Not yet
          </div>
        )}
      </div>
      {canLoadMore && earnings.length > 0 && (
        <div
          className='mt-4 cursor-pointer rounded-2xl border border-lightGray py-3 text-center'
          onClick={handleLoadMore}
        >
          Load More +
        </div>
      )}
    </div>
  );
};

const Stats = ({ searchText, setSearchText, filtersToQuery, setFiltersToQuery }) => {
  const [searchType, setSearchType] = useState('normal');
  const [filters, setFilters] = useState([]);

  const { isSmallScreen } = useHandleResize();

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const setKey = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
      // aiSearch();
    }
  };

  const onCheckedChange = (isChecked, id, name, value) => {
    if (isChecked) {
      setFilters((prev) => [...prev, { id, name, value }]);
    } else {
      setFilters((prev) =>
        prev.filter(
          (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
        )
      );
    }
  };

  const onRadioChange = (radioValue, id, name, value) => {
    setFilters((prev) => {
      let tmp = prev.filter((f) => f.id !== id);

      return [...tmp, { id, name, value }];
    });
  };

  const filterCategories = [
    {
      content: [
        { category_id: 'sort', category_name: 'Most Recent', category_value: 0 },
        { category_id: 'sort', category_name: 'Most Relevant', category_value: 1 },
      ],
      title: 'Sorted By',
      type: 0,
    },
    {
      content: [
        { category_id: 'category', category_name: 'Any Category', category_value: 'any' },
        {
          category_id: 'category',
          category_name: 'Customer Service',
          category_value: 'customer service',
        },
        {
          category_id: 'category',
          category_name: 'Design And Creative',
          category_value: 'design and creative',
        },
        { category_id: 'category', category_name: 'Acounting', category_value: 'acounting' },
        { category_id: 'category', category_name: 'AI', category_value: 'ai' },
        { category_id: 'category', category_name: 'Animator', category_value: 'animator' },
      ],
      title: 'Category',
      type: 1,
    },
    {
      content: [
        { category_id: 'experience', category_name: 'Entry-Level', category_value: 0 },
        { category_id: 'experience', category_name: 'Intermidiate', category_value: 1 },
        { category_id: 'experience', category_name: 'Expert', category_value: 2 },
      ],
      title: 'Experience',
      type: 1,
    },
    {
      content: [
        { category_id: 'applicants', category_name: 'Less than 5', category_value: [0, 5] },
        { category_id: 'applicants', category_name: '5 to 10', category_value: [5, 10] },
        { category_id: 'applicants', category_name: '10 to 15', category_value: [10, 15] },
        { category_id: 'applicants', category_name: '15 to 20', category_value: [15, 20] },
        { category_id: 'applicants', category_name: '20 to 50', category_value: [20, 50] },
        {
          category_id: 'applicants',
          category_name: 'More than 50',
          category_value: [50, 99999999],
        },
      ],
      title: 'Number Of Applicants',
      type: 1,
    },
    {
      content: [
        { category_id: 'job_type', category_name: 'Hourly Rate', category_value: 'hourly' },
        { category_id: 'job_type', category_name: 'Fixed Price', category_value: 'fixed' },
      ],
      title: 'Job Type',
      type: 0,
    },
    {
      content: [
        {
          category_id: 'hoursPerWeek',
          category_name: 'Less than 30 hrs/week',
          category_value: [0, 30],
        },
        {
          category_id: 'hoursPerWeek',
          category_name: 'More than 30 hrs/week',
          category_value: [30, 99999999],
        },
      ],
      title: 'Hours Per Week',
      type: 0,
    },
    {
      choose: 'Select Location',
      content: [
        {
          category_id: 'location',
          category_name: 'United States',
          category_value: 'united states',
        },
        { category_id: 'location', category_name: 'England', category_value: 'england' },
        { category_id: 'location', category_name: 'India', category_value: 'india' },
        { category_id: 'location', category_name: 'Singapore', category_value: 'singapore' },
      ],
      title: 'Client Location',
      type: 2,
    },
    {
      choose: 'Select client time zones',
      content: [
        { category_id: 'timezone', category_name: 'GMT+0', category_value: 'GMT+0' },
        { category_id: 'timezone', category_name: 'GMT+1', category_value: 'GMT+1' },
        { category_id: 'timezone', category_name: 'GMT+5', category_value: 'GMT+5' },
        { category_id: 'timezone', category_name: 'GMT+8', category_value: 'GMT+8' },
      ],
      title: 'Client Timezones',
      type: 2,
    },
    {
      content: [
        { category_id: 'info', category_name: 'My Previous clients', category_value: 'previous' },
        {
          category_id: 'info',
          category_name: 'Payment Verified',
          category_value: 'payment verified',
        },
      ],
      title: 'Client Info',
      type: 0,
    },
  ];

  const onSelectChange = (e) => {
    setFilters((prev) => {
      let tmp = prev.filter((f) => f.id !== e.category_id);

      return [...tmp, { id: e.category_id, name: e.category_name, value: e.category_value }];
    });
  };

  const handleRemove = (id, name, value) => {
    setFilters((prev) =>
      prev.filter(
        (f) => f.id !== id || f.name !== name || JSON.stringify(f.value) !== JSON.stringify(value)
      )
    );
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  const handleFilter = () => {
    setFiltersToQuery(filters);
  };

  const handleReset = () => {
    setFilters([]);
  };

  return (
    <div className='mt-10 flex min-h-96 w-full flex-col font-roboto'>
      <div className='flex items-center justify-between gap-6 rounded-2xl bg-deepGreen pl-1 pr-4 md:h-16'>
        <div className='flex flex-1 items-center gap-4'>
          <Select
            className='outline-none'
            defaultValue='normal'
            onValueChange={(e) => onChangeType(e)}
          >
            <SelectTrigger className='h-full w-20 rounded-xl bg-[#1B272C] outline-none mobile:w-14 mobile:p-2'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='rounded-xl bg-[#1B272C]'>
              <SelectGroup>
                <SelectItem value='normal'>
                  <CiSearch className='mobile:max-w-4' size={20} />
                </SelectItem>
                <SelectItem value='ai'>
                  <RiRobot2Line className='mobile:max-w-4' size={20} />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            className='h-full w-full border-none bg-transparent text-medGray outline-none'
            id='search'
            name='search'
            onChange={(e) => setKey(e)}
            onKeyDown={handleKeyDown}
            placeholder='Search by job title, company, keywords'
            type='text'
          />
        </div>
        <div className='flex h-16 items-center justify-center gap-4'>
          {/* <div className='hidden rounded-full bg-[#1BBF36] md:block'>
            <Image height={32} src={'/assets/icons/AIChatIcon.png'} width={32} />
          </div> */}
          <div className='flex items-center gap-4'>
            <HiOutlineLocationMarker className='text-2xl text-medGray' />
            <p className='hidden text-medGray md:block'>Anywhere</p>
          </div>
          <div className='flex flex-none flex-row items-center gap-2 px-4'>
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex flex-row items-center justify-center gap-3'>
                  <FilterIcon isFiltered={filters.length > 0} isSmallScreen={isSmallScreen} />
                  {!isSmallScreen && (
                    <div className='flex flex-row gap-2'>
                      <div className='text-medGray'>Filter</div>
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
                className='my-5 flex w-full flex-col gap-4 rounded-xl bg-[#10191D] px-6 py-4'
              >
                <div className='grid grid-cols-1 gap-4'>
                  {filterCategories.map((item, index) => {
                    return (
                      <div className='flex flex-col gap-2' key={index}>
                        <div>{item.title}</div>
                        {item.type === 2 && (
                          <div>
                            <Select
                              id={item.title}
                              onValueChange={(e) => onSelectChange(e)}
                              // value={filters.find((f) => f.id === item.content[0].category_id)}
                            >
                              <SelectTrigger className='rounded-xl bg-[#1B272C] px-5 py-7 text-base text-[#96B0BD]'>
                                <SelectValue placeholder={item.choose} />
                              </SelectTrigger>
                              <SelectContent className='rounded-xl bg-[#1B272C] text-base text-[#96B0BD]'>
                                <SelectGroup>
                                  {item.content.map((con) => (
                                    <SelectItem key={con.category_name} value={con}>
                                      {con.category_name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {item.type === 1 && (
                          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
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
                                        JSON.stringify(f.value) ===
                                          JSON.stringify(con.category_value)
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
                                  type={item.type}
                                />
                              );
                            })}
                          </div>
                        )}
                        {item.type === 0 && (
                          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                            {item.content.map((con, i) => (
                              <div className='flex items-center gap-3' key={i}>
                                <input
                                  checked={
                                    !!filters.find(
                                      (f) =>
                                        f.id === con.category_id &&
                                        f.name === con.category_name &&
                                        JSON.stringify(f.value) ===
                                          JSON.stringify(con.category_value)
                                    )
                                  }
                                  className='h-[24px] w-[24px] text-[#96B0BD] accent-[#DC4F13]'
                                  id={con.category_id}
                                  name={item.title}
                                  onChange={(e) =>
                                    onRadioChange(
                                      e.target.value,
                                      con.category_id,
                                      con.category_name,
                                      con.category_value
                                    )
                                  }
                                  type='radio'
                                  value={con.category_value}
                                />
                                <label className='text-[#96B0BD]' htmlFor={con.category_id}>
                                  {con.category_name}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <Separator />
                  <div className='flex h-14 w-full items-center justify-end'>
                    <div className='flex h-full w-60 items-center gap-2 rounded-2xl bg-darkGray'>
                      <button className='flex-1' onClick={handleReset}>
                        Reset
                      </button>
                      <button className='h-12 w-[55%] bg-orange' onClick={handleFilter}>
                        Show Results
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      {filters.length > 0 && (
        <div className='mt-4 flex touch-pan-x flex-row flex-wrap items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
          {filters.map((item, index) => {
            return (
              <span
                className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                key={index}
              >
                <FaX
                  className='rounded-full bg-[#3E525B] p-[2px]'
                  onClick={() => handleRemove(item.id, item.name, item.value)}
                />
                {item.name}
              </span>
            );
          })}

          <span className='cursor-pointer' onClick={handleClearAll}>
            Clear&nbsp;All
          </span>
        </div>
      )}
      <div className='mt-2 flex flex-col gap-4'>
        {/* <h1 className='text-2xl font-semibold'>Your Stats</h1> */}
        <div className='mt-2 flex flex-col gap-4 md:flex-row'>
          <ActiveOrders filters={filtersToQuery} searchText={searchText} />
          <Earnings filters={filtersToQuery} searchText={searchText} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
