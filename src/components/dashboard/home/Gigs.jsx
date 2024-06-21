'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { GiLaurelCrown } from 'react-icons/gi';
import { MdVerified } from 'react-icons/md';
import { RiPoliceBadgeLine } from 'react-icons/ri';
import { TiLocationOutline } from 'react-icons/ti';

import { getGigs } from '@/utils/http';

const gigOptions = [
  'Figma',
  'WebDesign',
  'Javascript',
  'React.JS',
  'Next.JS',
  'Shadcn',
  'Tailwind',
  'MobileDevelopment',
  'WebDevelopment',
  'DatabaseDevelopment',
  'DesktopApplication',
  'Python',
  'Java',
  'C++',
  'Swift',
  'Kotlin',
  'SQL',
  'MongoDB',
  'Angular',
  'Vue.JS',
];

const Gigs = () => {
  const [selectedGigs, setSelectedGigs] = useState(['Figma']);
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchGigs = async (gigs) => {
    try {
      const res = await getGigs(gigs);
      setData(res.data);
      setDisplayedData(res.data.slice(0, itemsPerPage));
    } catch (err) {
      console.error('Err fetching Gigs', err);
    }
  };

  useEffect(() => {
    fetchGigs(selectedGigs);
  }, [selectedGigs]);

  const handleGigClick = (gig) => {
    setSelectedGigs((prevSelectedGigs) => {
      if (prevSelectedGigs.includes(gig)) {
        return prevSelectedGigs.filter((selectedGig) => selectedGig !== gig);
      } else {
        return [...prevSelectedGigs, gig];
      }
    });
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const newDisplayedData = data.slice(0, nextPage * itemsPerPage);
    setDisplayedData(newDisplayedData);
    setPage(nextPage);
  };

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <h1>Gigs you may like</h1>
      <div className='flex flex-wrap items-center gap-2'>
        {gigOptions.map((gig, index) => (
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
      <div className='flex flex-col gap-2'>
        {displayedData?.map((gig, index) => (
          <div className='flex flex-col gap-4 rounded-2xl bg-deepGreen px-5 text-white' key={index}>
            <div className='flex flex-col gap-3 border-b border-lightGray py-5'>
              <h1>{gig.gigTitle}</h1>
              <div className='flex flex-wrap gap-4'>
                <div className='flex items-center gap-1'>
                  <TiLocationOutline className='text-xl text-medGray' />
                  <span>{gig.location}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <RiPoliceBadgeLine className='text-[#158FE8]' />
                  <span>Top Rated</span>
                </div>
                <div className='flex items-center gap-2'>
                  <GiLaurelCrown className='text-[#34E250]' />
                  <span>0% Job Success</span>
                </div>
              </div>
            </div>
            <p className='w-[80%] text-medGray'>
              {gig?.gigDescription?.length > 100
                ? gig.gigDescription?.substring(0, 200) + '...'
                : gig.gigDescription}
            </p>

            <div className='flex flex-wrap gap-2'>
              {gig?.requiredSkills.map((skill, index) => (
                <div
                  className='cursor-pointer rounded-full border border-lightGray bg-darkGray px-2 py-1 text-center'
                  key={index}
                >
                  {skill}
                </div>
              ))}
            </div>
            <div className='flex flex-col justify-between gap-2 pb-5 md:flex-row'>
              <div className='flex flex-1 items-center gap-4'>
                <div className='flex w-10 items-center justify-center'>
                  <div className='flex h-10 w-[100%] items-center justify-center border-none outline-none'>
                    <Image
                      alt='pic'
                      className='h-full w-full object-contain'
                      height={1000}
                      src={'/assets/dashboard-media/profilePic.png'}
                      width={1000}
                    />
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='truncate text-lg text-white'>
                      {gig?.clientProfileId?.chosen_visible_name}
                    </h3>
                    {gig?.clientProfileId?.verified && <MdVerified className='text-[#0A75C2]' />}
                  </div>
                  <div className='flex items-center gap-1 text-medGray'>
                    <p className='font-thin text-medGray'>Freelancer</p>
                  </div>
                </div>
              </div>
              <div className='flex h-14 w-full items-center justify-end md:h-auto md:w-56'>
                <div className='flex h-full w-full gap-2 rounded-2xl bg-darkGray'>
                  <button className='flex-1'>Message</button>
                  <button className='w-[55%] bg-orange'>Invite to Job</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {displayedData.length < data.length && (
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

export default Gigs;
