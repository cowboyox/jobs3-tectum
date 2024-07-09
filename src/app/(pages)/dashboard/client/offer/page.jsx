'use client';

import React, { useEffect, useState } from 'react';
import OfferItem from '@/components/dashboard/offerItem';
import { useCustomContext } from '@/context/use-custom';
import { useGetAllFreelancerOrdersProposed } from '@/hooks/useGetAllFreelancerOrdersProposed';
import {
  AnchorProvider,
  BN,
  getProvider,
  Program,
  setProvider,
  utils,
} from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { useRouter } from 'next/navigation';
import { FaEllipsis, FaX } from 'react-icons/fa6';
import { v4 as uuid } from 'uuid';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { FaArrowRight } from 'react-icons/fa6';
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
import { useGetAllClientGigsProposed } from '@/hooks/useGetAllClientGigsProposed';
import IDL from '@/idl/gig_basic_contract.json';
import api from '@/utils/api';
import {
  ADMIN_ADDRESS,
  CONTRACT_SEED,
  PAYTOKEN_MINT,
  PROGRAM_ID,
  ContractStatus,
} from '@/utils/constants';
import { IoChevronDownOutline, IoLocationOutline } from 'react-icons/io5';
import { CiFilter, CiReceipt } from 'react-icons/ci';
import searchOptions from '../freelancers/searchOptions';
import { FilterIcon } from '@/components/elements/svgs/FilterIcon';

const DropdownItem = ({ onCheckedChange, ...props }) => {
  return (
    <div className='flex cursor-pointer items-center gap-4 p-0'>
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
  const [searchType, setSearchType] = useState('normal');
  const [isSmallScreen, setIsSmallScree] = useState(false);
  const [mode, setMode] = useState('live');
  const [filters, setFilters] = useState([]);
  const filterItems = [
    {
      content: [
        { category_id: 'any_amount', category_name: 'Any Amount' },
        { category_id: 'over_1_earned', category_name: '$1+ Earned' },
        { category_id: 'over_100_earned', category_name: '$100+ Earned' },
        { category_id: 'over_1k_earned', category_name: '$1k+ Earned' },
        { category_id: 'over_10k_earned', category_name: '$10k+ Earned' },
        { category_id: 'no_earning_yet', category_name: 'No Earning Yet' },
      ],
      title: 'Earned Amount',
    },
    {
      content: [
        { category_id: 'any_job_success', category_name: 'Any Job Success' },
        { category_id: '80_up', category_name: '80% & UP' },
        { category_id: '90_up', category_name: '90% & UP' },
        { category_id: 'top_rated', category_name: 'Top Rated' },
        { category_id: 'rising_talent', category_name: 'Rising Talent' },
      ],
      title: 'Job Success',
    },
    {
      content: [
        { category_id: 'any_hourly_rate', category_name: 'Any Hourly Rate' },
        { category_id: '10_below', category_name: '$10 and Below' },
        { category_id: '10_30', category_name: '$10 - $30' },
        { category_id: '30_60', category_name: '$30 - $60' },
        { category_id: '60_above', category_name: '$60 and Above' },
      ],
      title: 'Hourly rate',
    },
    {
      content: [
        { category_id: 'over_1_hour', category_name: '1+ Hours Billed' },
        { category_id: 'over_100_hour', category_name: '100+ Hours Billed' },
        { category_id: 'over_1000_hour', category_name: '1000+ Hours Billed' },
      ],
      title: 'Hours billed',
    },
    {
      content: [
        { category_id: 'any_category', category_name: 'Any Category' },
        { category_id: 'customer_service', category_name: 'Customer Service' },
        { category_id: 'design_creative', category_name: 'Design And Creative' },
        { category_id: 'web_mobile_software', category_name: 'Web, Mobile & Software' },
      ],
      title: 'Category',
    },
    {
      content: [
        { category_id: 'any_level', category_name: 'Any Level' },
        { category_id: 'basic', category_name: 'Basic' },
        { category_id: 'conversational', category_name: 'Conversational' },
        { category_id: 'fluent', category_name: 'Fluent' },
        { category_id: 'native_bilingual', category_name: 'Native Or Bilingual' },
      ],
      title: 'English Level',
    },
    {
      content: [
        { category_id: 'freelancers_agencies', category_name: 'Freelancers & Agencies' },
        { category_id: 'freelancers', category_name: 'Freelancers' },
        { category_id: 'agencies', category_name: 'Agencies' },
      ],
      title: 'Talent Type',
    },
    {
      content: [
        { category_id: 'any_time', category_name: 'Any Time' },
        { category_id: '2_weeks', category_name: 'Within 2 Weeks' },
        { category_id: '1_month', category_name: 'Within 1 Month' },
        { category_id: '2_month', category_name: 'Within 2 Month' },
      ],
      title: 'Notice Period',
    },
  ];

  const { data: orders, refetch: refetchAllOrdersProposed } = useGetAllFreelancerOrdersProposed(
    auth?.currentProfile?._id
  );
  const onCheckedChange = (value, id, name) => {
    if (value) {
      setFilters((prev) => [...prev, name]);
    } else {
      setFilters((prev) => prev.filter((item) => item !== name));
    }
  };
  useEffect(() => {
    if (orders) {
      setLives(orders?.lives);
      setProposals(orders?.proposals);
    }
  }, [orders]);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
    }
  };

  const onChangeType = (e) => {
    setSearchType(e);
  };

  return (
    <div className='p-0 lg:mt-8 sm:p-0 xl:mt-8'>
      <div className='flex gap-2 rounded-xl bg-[#10191d] pr-4'>
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
        <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl transition hover:bg-[#1B272C] mobile:hidden'>
          <IoLocationOutline size={20} stroke='#96B0BD' />
          <span className='text-[#96B0BD] hidden md:block'>Anywhere</span>
        </div>
        {(!isSmallScreen || searchType === 'normal') && (
          <Popover>
            <PopoverTrigger asChild>
                <button className='flex flex-row items-center justify-center gap-3'>
                  <FilterIcon isFiltered={filters.length > 0} isSmallScreen={isSmallScreen} />
                  {!isSmallScreen && (
                    <div className='flex flex-row gap-2'>
                      <span className='text-[#96B0BD] hidden md:block'>Filter</span>
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
                  return (
                    <div className='flex flex-col gap-2' key={index}>
                      <div>{item.title}</div>
                      {item.content.map((con, i) => {
                        return (
                          <DropdownItem
                            category_id={con.category_id}
                            category_name={con.category_name}
                            checked={filters.includes(con.category_name)}
                            key={i}
                            onCheckedChange={(value) =>
                              onCheckedChange(value, con.category_id, con.category_name)
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
              class='hidden w-12 items-center justify-center self-stretch rounded-e-[15px] rounded-s-[0px] bg-orange text-lg text-white mobile:flex'
              onClick={aiSearch}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      {mode == 'live' ? (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{lives.length}</span>{' '}
          Accepteds😊
        </div>
      ) : (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{proposals.length}</span>{' '}
          Proposals😊
        </div>
      )}
      {filters.length > 0 && (
        <div className='flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5] mt-[30px]'>
          {filters.map((item, index) => {
            return (
              <span
                className='flex flex-row items-center gap-1 rounded-full border border-[#3E525B] bg-[#28373E] p-1 pl-2 pr-2'
                key={index}
              >
                <FaX
                  className='rounded-full bg-[#3E525B] p-[2px]'
                  onClick={() => setFilters((prev) => prev.filter((_item) => _item !== item))}
                />
                {item}
              </span>
            );
          })}

          <span className='cursor-pointer' onClick={() => setFilters([])}>
            Clear&nbsp;All
          </span>
        </div>
      )}
      <div className='flex items-center justify-center w-full pt-10 pb-5'>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'live' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('live')}
        >
          {mode == 'live' ? (
            <h1>
              <span className='inline-block w-6 h-6 rounded-full bg-orange'>
                {lives.length}
              </span>
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
                {proposals.length}
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
          {
            lives.length > 0 ? 
            (
              <>
                {lives.map((order, index) => (
                  <OfferItem 
                    key={index}
                    gigId={order.gigId}
                    clientId={auth?.currentProfile?._id}
                    freelancerId={order.freelancer._id}
                    proposalId={order.proposalId} 
                    gigTitle={order.gigTitle} 
                    gigPrice={order.gigPrice} 
                    deliveryTime={order.deliveryTime} 
                    proposal={order.proposal} 
                    avatarURL={order.freelancer.avatarURL}
                    fullName={order.freelancer.fullName}
                    refetchAllOrdersProposed={refetchAllOrdersProposed}
                    accepted={true}
                    status={order.status}
                    clientSide={true}
                  />
                ))}
                <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
                  Load more +{' '}
                </button>
              </>
            ) : (
              <div className='flex flex-col items-center justify-center h-full gap-3 py-20'>
                <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
                <p className='text-[18px] text-slate-600'>Accepted proposals will be here</p>
              </div>
            )
          }
        </>
      ) : (
        <>
          {
            proposals.length > 0 ? 
            (
              <>
                {proposals.map((proposal, index) => (
                  <OfferItem 
                    key={index}
                    gigId={proposal.gigId}
                    clientId={auth?.currentProfile?._id}
                    freelancerId={proposal.freelancer._id}
                    proposalId={proposal.proposalId} 
                    gigTitle={proposal.gigTitle} 
                    gigPrice={proposal.gigPrice} 
                    deliveryTime={proposal.deliveryTime} 
                    proposal={proposal.proposal}
                    avatarURL={proposal.freelancer.avatarURL}
                    fullName={proposal.freelancer.fullName}
                    refetchAllOrdersProposed={refetchAllOrdersProposed}
                    accepted={false}
                    status={proposal.status}
                    clientSide={true}
                  />
                ))}
                <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
                  Load more +{' '}
                </button>
              </>
            ) : (
              <div className='flex flex-col items-center justify-center h-full gap-3 py-20'>
                <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
                <p className='text-[18px] text-slate-600'>Proposals will be here</p>
              </div>
            )
          }
        </>
      )}
    </div>
  )
}

export default Offer