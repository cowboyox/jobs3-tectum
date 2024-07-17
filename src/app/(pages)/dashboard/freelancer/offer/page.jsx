'use client';

import React, { useEffect, useState } from 'react';
import { FaX } from 'react-icons/fa6';
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
import { useCustomContext } from '@/context/use-custom';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetAllClientOrdersProposed } from '@/hooks/useGetAllClientOrdersProposed';
import { COUNTRIES } from '@/utils/constants';

const DropdownItem = ({ onCheckedChange, ...props }) => {
  return (
    <div className='flex items-center gap-4 p-0 cursor-pointer'>
      <Checkbox
        checked={props.checked}
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

  const { data: orders, refetch: refetchAllOrdersProposed } = useGetAllClientOrdersProposed(
    auth?.currentProfile?._id,
    page,
    itemsPerPage,
    debouncedSearchText
  );

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
  
  return (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className='flex flex-row items-center justify-between gap-5 rounded-xl bg-[#10191D] p-3'>
        <div className='flex items-center flex-1 gap-3 ml-3'>
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
            // onKeyDown={handleKeyDown}
            placeholder={isSmallScreen ? '' : 'Search by Order title...'}
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
                        checked={locationFilters.includes(con)}
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
        <div className='flex flex-row items-center flex-none gap-2'>
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
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Sort by</div>
          <div>
            <Select>
              <SelectTrigger className='flex justify-center border-none bg-transparent text-[#96B0BD] focus:border-none focus:outline-none'>
                <SelectValue placeholder='Sort By' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value='date'>Date</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
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
      <div className='flex items-center justify-center w-full pt-10 pb-5'>
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
              <span className='inline-block w-6 h-6 rounded-full bg-orange'>
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
