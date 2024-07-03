'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { IoIosMore, IoLogoUsd } from 'react-icons/io';
import { MdAccessTime } from 'react-icons/md';
import { TiLocationOutline } from 'react-icons/ti';

import { useCustomContext } from '@/context/use-custom';
import { useGetClientGigs } from '@/hooks/useGetClientGigs';
import { skillSets } from '@/utils/constants';
import { getDeadline } from '@/utils/gigInfo';

const Recent = ({ search }) => {
  const [selectedGigs, setSelectedGigs] = useState(['Figma']);
  const [allGigs, setAllGigs] = useState([]);
  const [page, setPage] = useState(1);
  const auth = useCustomContext();
  const [canLoadMore, setCanLoadMore] = useState(true);
  const itemsPerPage = 2;
  const { data: clientGigs } = useGetClientGigs(page, itemsPerPage);

  useEffect(() => {
    if (clientGigs?.length > 0) {
      setCanLoadMore(true);
      if (page === 1) {
        setAllGigs(clientGigs);
      } else {
        setAllGigs((prev) => {
          let result = [...prev];
          const ids = prev.map((item) => item._id);

          clientGigs.map((cg) => {
            if (!ids.includes(cg._id)) {
              result = [...result, cg];
            }
          });

          return result;
        });
      }
    } else {
      if (page === 1) {
        setAllGigs([]);
      }
      setCanLoadMore(false);
    }
  }, [clientGigs, page]);

  const handleGigClick = (gig) => {
    setSelectedGigs((prevSelectedGigs) => {
      if (prevSelectedGigs.includes(gig)) {
        return prevSelectedGigs.filter((selectedGig) => selectedGig !== gig);
      } else {
        return [...prevSelectedGigs, gig];
      }
    });
  };

  const handleFilter = () => {
    let filteredGigs = gigs;

    if (search) {
      filteredGigs = filteredGigs.filter((gig) =>
        gig.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // if (sortOrder === "dateAsc") {
    //   filteredGigs.sort(
    //     (a, b) => new Date(a.gigPostDate) - new Date(b.gigPostDate)
    //   );
    // } else if (sortOrder === "dateDesc") {
    //   filteredGigs.sort(
    //     (a, b) => new Date(b.gigPostDate) - new Date(a.gigPostDate)
    //   );
    // }

    return filteredGigs;
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>Recent Job Posts</h1>
      <div className='flex flex-wrap items-center gap-2'>
        {skillSets.map((gig, index) => (
          <div
            className={`${
              selectedGigs.includes(gig) ? 'bg-orange' : 'bg-darkGray'
            } cursor-pointer rounded-full border border-lightGray px-2 py-1 text-center`}
            key={index}
            onClick={() => handleGigClick(gig)}
          >
            {gig}
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        {allGigs?.length ? (
          allGigs.map((gig, index) => (
            <div
              className='flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'
              key={index}
            >
              <div className='flex flex-col gap-3 border-b border-lightGray pb-5'>
                <div className='flex items-center justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <Image height={45} src={'/assets/icons/ActiveOrder.png'} width={45} />
                    <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
                      {gig.gigTitle}
                    </h3>
                  </div>
                  <div className='flex items-center gap-6'>
                    {gig.proposalUsers.includes(auth?.currentProfile?._id) && (
                      <p className='cursor-pointer rounded-[6px] border border-green-600 p-[1px] px-2 font-[500] text-green-600'>
                        Applied
                      </p>
                    )}
                    <FaRegHeart className='text-xl text-medGray' />
                    <IoIosMore className='text-xl text-medGray' />
                  </div>
                </div>
                <h3 className='whitespace-nowrap text-xl font-semibold text-white md:hidden'>
                  {gig.gigTitle}
                </h3>
                <div className='flex flex-wrap gap-4'>
                  <div className='flex items-center gap-1'>
                    <MdAccessTime className='text-xl text-medGray' />
                    <span>{getDeadline(gig.gigDeadline)}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <TiLocationOutline className='text-xl text-medGray' />
                    <span>{gig.location}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaRegUser className='text-xl text-medGray' />
                    <span>{gig.proposalUsers.length} Applicants</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <IoLogoUsd className='text-xl text-medGray' />
                    <span>
                      {!gig.gigPaymentType
                        ? gig.gigPrice
                        : `${gig.minBudget} - ${gig.maxBudget} /hr`}
                    </span>
                  </div>
                </div>
              </div>
              <p className='text-medGray'>{gig.gigDescription}</p>
              <p className='text-white'>Show more</p>
              <div className='flex flex-wrap gap-2'>
                {gig.requiredSkills.map((skill, skillIndex) => (
                  <div
                    className='cursor-pointer rounded-full border border-lightGray bg-darkGray px-2 py-1 text-center'
                    key={skillIndex}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-2xl font-semibold'>Not yet</div>
        )}
      </div>
      {canLoadMore && (
        <div
          className='cursor-pointer rounded-2xl border border-lightGray py-3 text-center'
          onClick={handleLoadMore}
        >
          Load More +
        </div>
      )}
    </div>
  );
};

export default Recent;
