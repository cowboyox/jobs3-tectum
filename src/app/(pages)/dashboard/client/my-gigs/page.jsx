'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { CiClock2, CiFilter, CiReceipt } from 'react-icons/ci';
import { FaArrowRight } from 'react-icons/fa6';

import searchOptions from '../freelancers/searchOptions';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import api from '@/utils/api';
import { minutesDifference } from '@/utils/Helpers';

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
          className='cursor-pointer text-xl text-white'
          onClick={() => router.push(`./edit-gig/${gig._id}`)}
        >
          {gig.gigTitle}
        </h2>
        <div className='mt-2 flex items-center gap-5 text-gray-400'>
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
        <BsThreeDots className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 transition hover:bg-slate-700' />
      </div>
    </div>
  );
};

const MyGigs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [myGigs, setMyGigs] = useState([]);
  const [searchType, setSearchType] = useState('normal');
  const [searchKeywords, setSearchKeyWords] = useState('');
  const [filteredGigList, setFilteredGigList] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (!tmp) {
      router.push(`/?redirect=${pathname}`);
    } else {
      api
        .get(`/api/v1/client_gig/get-gig-by-userId?page=${page}&limit=${itemsPerPage}`)
        .then((data) => {
          if (data.data.data && data.data.data.length > 0) {
            setCanLoadMore(true);
            setMyGigs((prev) => [...prev, ...data.data.data]);
            setFilteredGigList((prev) => [...prev, ...data.data.data]);
          } else {
            setCanLoadMore(false);
          }
        });
    }
  }, [router, pathname, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const onChangeType = (e) => {
    setSearchType(e);
  };

  const setKey = (e) => {
    setSearchKeyWords(e.target.value);
    if (searchType == 'normal') {
      const filtered = myGigs.filter(
        (gig) =>
          gig.deliveryTime?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.email?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.gigDescription?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.gigPostDate?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.gigPrice?.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
          gig.gigTitle?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredGigList(filtered);
    }
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

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex w-full items-stretch gap-5 mobile:flex-col'>
        <div className='flex flex-grow gap-2 rounded-xl bg-[#10191d] p-1 mobile:p-1'>
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
          {(!isSmallScreen || searchType === 'normal') && (
            <div className='m-3 flex cursor-pointer items-center gap-3 rounded-xl transition hover:bg-[#1B272C] mobile:m-1'>
              <CiFilter className='mobile:max-w-4' fill='#96B0BD' size={20} />
              <span className='text-[#96B0BD] mobile:text-sm'>Filter</span>
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#DC4F13] text-sm mobile:h-4 mobile:w-4 mobile:text-sm'>
                4
              </span>
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
        <Link
          className='flex w-40 cursor-pointer items-center justify-center rounded-xl bg-[#DC4F13] p-1 text-center text-base transition hover:bg-white hover:text-black mobile:w-full mobile:py-2 mobile:text-center'
          href='./post-gig'
        >
          Post a New Gig
        </Link>
      </div>
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
