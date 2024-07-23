'use client';

import React, { useEffect, useState } from 'react';
import { FaX, FaArrowRight, FaEllipsis } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';

import searchOptions from '../../client/freelancers/searchOptions';

import OfferItem from '@/components/dashboard/offerItem';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCustomContext } from '@/context/ContextProvider';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetAllClientOrdersProposed } from '@/hooks/useGetAllClientOrdersProposed';
import { COUNTRIES } from '@/utils/constants';
import { FilterIcon } from '@/components/elements/svgs/FilterIcon';


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

const Offer = () => {
  const auth = useCustomContext();

  const [proposals, setProposals] = useState([]);
  const [lives, setLives] = useState([]);
  const filterCategory = ['Active', 'Paused', 'Completed', 'Cancelled'];
  const [searchType, setSearchType] = useState('normal');
  const [isSmallScreen, setIsSmallScree] = useState(false);
  const [mode, setMode] = useState('live');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [searchKeywords, setSearchKeyWords] = useState('');
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [locationFilters, setLocationFilters] = useState([]);
  const [countries, setCountries] = useState(COUNTRIES);
  const [locationText, setLocationText] = useState("");
  const debouncedSearchText = useDebounce(searchKeywords);
  const [filters, setFilters] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const [isHourly, setIsHourly] = useState(false);
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
        { category_id: 'sort_by', category_name: 'Any', category_value: 'any' },
        { category_id: 'sort_by', category_name: 'Recently', category_value: 'recently' },
      ],
      title: 'Sort By',
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



  const { data: orders, refetch: refetchAllOrdersProposed } = useGetAllClientOrdersProposed(
    auth?.currentProfile?._id,
    page,
    itemsPerPage,
    debouncedSearchText,
    locationFilters,
    filters
  );

  console.log("orders", orders);

  useEffect(() => {
    if (mode == 'live') {
      if (orders?.livesTotal > page * itemsPerPage && orders?.lives?.length > 0) {
        setCanLoadMore(true);
      } else {
        setCanLoadMore(false);
      }
    } else {
      if (orders?.proposalsTotal > page * itemsPerPage && orders?.proposals?.length > 0) {
        setCanLoadMore(true);
      } else {
        setCanLoadMore(false);
      }
    }
    setLives(orders?.lives);
    setProposals(orders?.proposals);
  }, [orders, mode, page, itemsPerPage]);

  useEffect(() => {
    // setPage(1);
    setItemsPerPage(2);
  }, [debouncedSearchText, mode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScree(true);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsSmallScree(false);
      } else {
        setIsSmallScree(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setCountries(COUNTRIES.filter((item) => item.toLocaleLowerCase().includes(locationText.toLocaleLowerCase())));
  }, [locationText]);
  
  const handleLoadMore = () => {
    // setPage((prev) => prev + 1);
    setItemsPerPage((prev) => prev + 2);
  };


  const setKey = (e) => {
    // setPage(1);
    setItemsPerPage(2);
    setSearchKeyWords(e.target.value);
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
    }
  };

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const onCheckedLocationChange = (value, id, name) => {
    if (value) {
      setLocationFilters((prev) => [...prev, name]);
    } else {
      setLocationFilters((prev) => prev.filter((item) => item !== name));
    }
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
  const onCheckedChange = (isChecked, id, name, value) => {
    if (isChecked) {
      if (id === 'sort_by' || id === 'payment') {
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

  return (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className='flex flex-row items-center justify-between gap-5 rounded-xl bg-[#10191D] p-3'>
        <div className='ml-3 flex flex-1 items-center gap-3'>
          <button>
            <svg
              className='h-6 w-6'
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
          </button>
          <input
            className='w-full bg-transparent outline-none'
            // onChange={handleSearch}
            onChange={(e) => setKey(e)}
            placeholder={isSmallScreen ? 'Search' : 'Search by Order title...'}
            type='text'
            // value={search}
          />
          {isSmallScreen && (
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
      {mode == 'live' ? (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{orders?.livesTotal}</span>{' '}
          Accepteds😊
        </div>
      ) : (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{orders?.proposalsTotal}</span>{' '}
          Proposals😊
        </div>
      )}
      <div className='flex w-full items-center justify-center pb-5 pt-10'>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'live' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('live')}
        >
          {mode == 'live' ? (
            <h1>
              <span className='inline-block w-6 h-6 rounded-full bg-orange'>{lives?.length}</span>
              &nbsp; Live
            </h1>
          ) : (
            <h1>Live</h1>
          )}
        </div>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'proposal' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('proposal')}
        >
          {mode == 'proposal' ? (
            <h1>
              <span className='inline-block h-6 w-6 rounded-full bg-orange'>
                {proposals?.length}
              </span>
              &nbsp; Proposals
            </h1>
          ) : (
            <h1>Proposals</h1>
          )}
        </div>
      </div>
      {mode == 'live' ? (
        <>
          {lives?.length > 0 ? (
            <>
              {lives.map((order, index) => (
                <OfferItem
                  accepted={true}
                  avatarURL={order.client.avatarURL}
                  buyerPubkey={order.walletPublicKey}
                  clientId={order.client._id}
                  clientSide={false}
                  contractId={order.contractId}
                  deliveryTime={order.deliveryTime}
                  freelancerId={auth?.currentProfile?._id}
                  fullName={order.client.fullName}
                  gigId={order.gigId}
                  gigPrice={order.gigPrice}
                  gigTitle={order.gigTitle}
                  key={index}
                  proposal={order.proposal}
                  proposalId={order.proposalId}
                  quantity={order.quantity}
                  refetchAllOrdersProposed={refetchAllOrdersProposed}
                  status={order.status}
                  location={order.client.location}
                />
              ))}
              {canLoadMore && (
                <div
                  className='py-3 mt-4 text-center border cursor-pointer rounded-2xl border-lightGray'
                  onClick={handleLoadMore}
                >
                  Load More +
                </div>
              )}
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-full gap-3 py-20'>
              <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
              <p className='text-[18px] text-slate-600'>Accepted proposals will be here</p>
            </div>
          )}
        </>
      ) : (
        <>
          {proposals?.length > 0 ? (
            <>
              {proposals.map((proposal, index) => (
                <OfferItem
                  accepted={false}
                  avatarURL={proposal.client.avatarURL}
                  buyerPubkey={proposal.walletPublicKey}
                  clientId={proposal.client._id}
                  clientSide={false}
                  contractId={proposal.contractId}
                  deliveryTime={proposal.deliveryTime}
                  freelancerId={auth?.currentProfile?._id}
                  fullName={proposal.client.fullName}
                  gigId={proposal.gigId}
                  gigPrice={proposal.gigPrice}
                  gigTitle={proposal.gigTitle}
                  key={index}
                  proposal={proposal.proposal}
                  proposalId={proposal.proposalId}
                  quantity={proposal.quantity}
                  refetchAllOrdersProposed={refetchAllOrdersProposed}
                  status={proposal.status}
                  location={proposal.client.location}
                />
              ))}
              {canLoadMore && (
                <div
                  className='py-3 mt-4 text-center border cursor-pointer rounded-2xl border-lightGray'
                  onClick={handleLoadMore}
                >
                  Load More +
                </div>
              )}
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-full gap-3 py-20'>
              <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
              <p className='text-[18px] text-slate-600'>Proposals will be here</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Offer;
