'use client';

import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaX } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';

import searchOptions from '../freelancers/searchOptions';

import OfferItem from '@/components/dashboard/offerItem';
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
import { useCustomContext } from '@/context/use-custom';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetClientGigsContractedWithFreelancer } from '@/hooks/useGetClientGigsContractedWithFreelancer';
import { useHandleResize } from '@/hooks/useHandleResize';

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
  const [mode, setMode] = useState('live');
  const [filters, setFilters] = useState([]);
  const { isSmallScreen } = useHandleResize();
  const [searchKeywords, setSearchKeyWords] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;
  const debouncedSearchText = useDebounce(searchKeywords);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const filterCategories = [
    {
      content: [
        { category_id: 'earned', category_name: 'Any Earned', category_value: 0 },
        { category_id: 'earned', category_name: '$1+ Earned', category_value: 1 },
        { category_id: 'earned', category_name: '$100+ Earned', category_value: 100 },
        { category_id: 'earned', category_name: '$1k+ Earned', category_value: 1000 },
        { category_id: 'earned', category_name: '$10k+ Earned', category_value: 10000 },
      ],
      title: 'Earned Amount',
    },
    {
      content: [
        {
          category_id: 'languages',
          category_name: 'Any Language',
          category_value: 'any',
        },
        { category_id: 'languages', category_name: 'English', category_value: 'English' },
        { category_id: 'languages', category_name: 'Germany', category_value: 'Germany' },
        { category_id: 'languages', category_name: 'Russian', category_value: 'Russian' },
        { category_id: 'languages', category_name: 'Spanish', category_value: 'Spanish' },
        { category_id: 'languages', category_name: 'Portugues', category_value: 'Portugues' },
      ],
      title: 'Languages',
    },
    {
      content: [
        {
          category_id: 'hourlyRate',
          category_name: 'Any Rate',
          category_value: 'any',
        },
        { category_id: 'hourlyRate', category_name: '$10 and Below', category_value: [0, 10] },
        { category_id: 'hourlyRate', category_name: '$10 - $30', category_value: [10, 30] },
        { category_id: 'hourlyRate', category_name: '$30 - $60', category_value: [30, 60] },
        {
          category_id: 'hourlyRate',
          category_name: '$60 and Above',
          category_value: [60, 99999999],
        },
      ],
      title: 'Hourly rate',
    },
    {
      content: [
        { category_id: 'hoursBilled', category_name: '1+ Hours Billed', category_value: 1 },
        { category_id: 'hoursBilled', category_name: '100+ Hours Billed', category_value: 100 },
        { category_id: 'hoursBilled', category_name: '1000+ Hours Billed', category_value: 1000 },
      ],
      title: 'Hours billed',
    },
    {
      content: [
        { category_id: 'jobSuccess', category_name: 'Any Score', category_value: 0 },
        { category_id: 'jobSuccess', category_name: '80% & UP', category_value: 80 },
        { category_id: 'jobSuccess', category_name: '90% & UP', category_value: 90 },
      ],
      title: 'Job Success',
    },
  ];

  const { data: orders, refetch: refetchAllOrdersProposed } =
    useGetClientGigsContractedWithFreelancer(
      auth?.currentProfile?._id,
      page,
      itemsPerPage,
      debouncedSearchText,
      filters
    );

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
  }, [debouncedSearchText, mode]);

  useEffect(() => {
    if (mode === 'live') {
      if (orders?.lives?.length > 0) {
        setCanLoadMore(true);
        if (page === 1) {
          setLives(orders.lives);
        } else {
          setLives((prev) => {
            let result = [...prev];
            const ids = prev.map((item) => item._id);

            orders.lives.map((lv) => {
              if (!ids.includes(lv._id)) {
                result = [...result, lv];
              }
            });

            return result;
          });
        }
      } else {
        if (page === 1) {
          setLives([]);
        }
        setCanLoadMore(false);
      }
    } else {
      if (orders?.proposals?.length > 0) {
        setCanLoadMore(true);
        if (page === 1) {
          setProposals(orders.proposals);
        } else {
          setProposals((prev) => {
            let result = [...prev];
            const ids = prev.map((item) => item._id);

            orders.proposals.map((lv) => {
              if (!ids.includes(lv._id)) {
                result = [...result, lv];
              }
            });

            return result;
          });
        }
      } else {
        if (page === 1) {
          setProposals([]);
        }
        setCanLoadMore(false);
      }
    }
  }, [orders, page, mode]);

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

  const aiSearch = () => {
    api.get(`/api/v1/freelancer_gig/ai-search/${searchKeywords}`).then((data) => {
      let ai_ids = [];
      if (data.data.profileIDs) ai_ids = data.data.profileIDs;
      if (mode === 'live') {
        const ai_filtered = ai_ids
          .map((id) => orders.lives.find((order) => order.gigId.toString() === id))
          .filter((order) => order != undefined);
        setFilteredLiveList(ai_filtered);
      } else {
        const ai_filtered = ai_ids
          .map((id) => orders.proposals.find((order) => order.gigId.toString() === id))
          .filter((order) => order != undefined);
        setFilteredProposalsList(ai_filtered);
      }
    });
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchType === 'ai') {
    }
  };

  const onChangeType = (e) => {
    setSearchType(e);
  };

  return (
    <div className='p-0 sm:p-0 lg:mt-8 xl:mt-8'>
      <div className='flex gap-2 rounded-xl bg-[#10191d] pr-4'>
        <div className='mobile:m-1 m-3 flex flex-1 gap-2'>
          <Select defaultValue='normal' onValueChange={(e) => onChangeType(e)}>
            <SelectTrigger className='mobile:w-14 mobile:p-2 w-20 rounded-xl bg-[#1B272C]'>
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
            className='mobile:text-sm w-full bg-transparent text-white outline-none'
            onChange={(e) => setSearchKeyWords(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Search by job title, company, keywords'
          />
        </div>
        <div className='mobile:hidden m-3 flex cursor-pointer items-center gap-3 rounded-xl transition hover:bg-[#1B272C]'>
          <IoLocationOutline size={20} stroke='#96B0BD' />
          <span className='hidden text-[#96B0BD] md:block'>Anywhere</span>
        </div>
        {(!isSmallScreen || searchType === 'normal') && (
          <Popover>
            <PopoverTrigger asChild>
              <button className='flex flex-row items-center justify-center gap-3'>
                <FilterIcon isFiltered={filters.length > 0} isSmallScreen={isSmallScreen} />
                {!isSmallScreen && (
                  <div className='flex flex-row gap-2'>
                    <span className='hidden text-[#96B0BD] md:block'>Filter</span>
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
                {filterCategories.map((item, index) => {
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
              class='mobile:flex hidden w-12 items-center justify-center self-stretch rounded-e-[15px] rounded-s-[0px] bg-orange text-lg text-white'
              onClick={aiSearch}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      {mode == 'live' ? (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{lives.length}</span> Accepteds😊
        </div>
      ) : (
        <div className='mt-4 rounded-xl bg-[#10191D] p-5 text-center'>
          You have <span className='font-bold text-[#DC4F13]'>{proposals.length}</span> Proposals😊
        </div>
      )}
      {filters.length > 0 && (
        <div className='mt-[30px] flex touch-pan-x flex-row items-center gap-3 overflow-x-auto overscroll-x-contain text-[#F5F5F5]'>
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
      <div className='flex w-full items-center justify-center pb-5 pt-10'>
        <div
          className={`w-[50%] cursor-pointer border-b-4 pb-3 text-center ${mode == 'live' ? 'border-b-orange' : ''}`}
          onClick={() => setMode('live')}
        >
          {mode == 'live' ? (
            <h1>
              <span className='inline-block h-6 w-6 rounded-full bg-orange'>{lives.length}</span>
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
          {lives.length > 0 ? (
            <>
              {lives.map((order, index) => (
                <OfferItem
                  accepted={true}
                  avatarURL={order.freelancer.avatarURL}
                  clientId={auth?.currentProfile?._id}
                  clientSide={true}
                  deliveryTime={order.deliveryTime}
                  freelancerId={order.freelancer._id}
                  fullName={order.freelancer.fullName}
                  gigId={order.gigId}
                  gigPrice={order.gigPrice}
                  gigTitle={order.gigTitle}
                  key={index}
                  proposal={order.proposal}
                  proposalId={order.proposalId}
                  refetchAllOrdersProposed={refetchAllOrdersProposed}
                  status={order.status}
                />
              ))}
              {canLoadMore && (
                <div
                  className='mt-4 cursor-pointer rounded-2xl border border-lightGray py-3 text-center'
                  onClick={handleLoadMore}
                >
                  Load More +
                </div>
              )}
            </>
          ) : (
            <div className='flex h-full flex-col items-center justify-center gap-3 py-20'>
              <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
              <p className='text-[18px] text-slate-600'>Accepted proposals will be here</p>
            </div>
          )}
        </>
      ) : (
        <>
          {proposals.length > 0 ? (
            <>
              {proposals.map((proposal, index) => (
                <OfferItem
                  accepted={false}
                  avatarURL={proposal.freelancer.avatarURL}
                  clientId={auth?.currentProfile?._id}
                  clientSide={true}
                  deliveryTime={proposal.deliveryTime}
                  freelancerId={proposal.freelancer._id}
                  fullName={proposal.freelancer.fullName}
                  gigId={proposal.gigId}
                  gigPrice={proposal.gigPrice}
                  gigTitle={proposal.gigTitle}
                  key={index}
                  proposal={proposal.proposal}
                  proposalId={proposal.proposalId}
                  refetchAllOrdersProposed={refetchAllOrdersProposed}
                  status={proposal.status}
                />
              ))}
              {canLoadMore && (
                <div
                  className='mt-4 cursor-pointer rounded-2xl border border-lightGray py-3 text-center'
                  onClick={handleLoadMore}
                >
                  Load More +
                </div>
              )}
            </>
          ) : (
            <div className='flex h-full flex-col items-center justify-center gap-3 py-20'>
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
