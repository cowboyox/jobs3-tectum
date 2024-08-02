'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';
import { IoLogoUsd } from 'react-icons/io';
import { MdAccessTime } from 'react-icons/md';
import { TiLocationOutline } from 'react-icons/ti';

import LongText from '@/components/elements/LongText';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/ContextProvider';
import { useGetClientGigs } from '@/hooks/useGetClientGigs';
import api from '@/utils/api';
import { skillSets } from '@/utils/constants';
import { getDeadline } from '@/utils/gigInfo';
import {useRouter} from 'next/navigation' ;

const Recent = ({ searchText, filtersToQuery, searchType, loading, allGigs, setAllGigs, locationFilters }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [page, setPage] = useState(1);
  const auth = useCustomContext();
  const { toast } = useToast();
  const itemsPerPage = 5;
  const router = useRouter();
  const [canLoadMore, setCanLoadMore] = useState(true);


  const { data: clientGigs } = useGetClientGigs(page, itemsPerPage, searchText, [
    ...selectedSkills,
    ...filtersToQuery,
  ], locationFilters);
  console.log(filtersToQuery);
  useEffect(() => {
    if (searchType == 'normal') {
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
    }
    else{
      setCanLoadMore(false);
    }
  }, [clientGigs, page, searchType, setAllGigs]);

  useEffect(() => {
    setPage(1);
  }, [searchText, selectedSkills, filtersToQuery]);

  const handleSkillClick = (skill) => {
    setPage(1);
    setSelectedSkills((prev) => {
      if (prev.filter((sk) => sk.value === skill).length > 0) {
        return prev.filter((selectedSkill) => selectedSkill.value !== skill);
      } else {
        return [...prev, { id: 'skills', value: skill }];
      }
    });
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleLikeUnlikeGig = async (gigId, index, like) => {
    try {
      const updatedGig = await api.put(`/api/v1/client_gig/like-unlike-gig/${gigId}`, { like });

      const tempAllGigs = allGigs.map((gig, i) => {
        if (i == index) {
          return {
            ...gig,
            likeUsers: updatedGig.data.likeUsers,
          };
        }

        return gig;
      });

      setAllGigs(tempAllGigs);
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

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>Recent Job Posts</h1>
      <div className='flex flex-wrap items-center gap-2'>
        {skillSets.map((skill, index) => (
          <div
            className={`${
              selectedSkills.filter((sk) => sk.value === skill).length > 0
                ? 'bg-orange'
                : 'bg-darkGray'
            } cursor-pointer rounded-full border border-lightGray px-2 py-1 text-center`}
            key={index}
            onClick={() => handleSkillClick(skill)}
          >
            {skill}
          </div>
        ))}
      </div>
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
          <div className='flex flex-col gap-4'>
            {allGigs?.length ? (
              allGigs.map((gig, index) => (
                <div key={`gig_${index}`}>
                  <div
                    className={`flex flex-col gap-4 ${gig.reason ? 'rounded-t-2xl' : 'rounded-2xl'} text-white1 bg-deepGreen px-6 py-6`}
                    key={index}
                  >
                    <div className='flex flex-col gap-3 border-b border-lightGray pb-5'>
                      <div className='flex items-center justify-between gap-4'>
                        <div className='flex items-center gap-4'>
                          <Image height={45} src={'/assets/icons/ActiveOrder.png'} width={45} />
                          <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block cursor-pointer' onClick={() => router.push(`/dashboard/freelancer/job-application/${gig._id}`)}>
                            {gig.gigTitle}
                          </h3>
                        </div>
                        <div className='flex items-center gap-6'>
                          {gig.proposalUsers.includes(auth?.currentProfile?._id) && (
                            <p className='cursor-pointer rounded-[6px] border border-green-600 p-[1px] px-2 font-[500] text-green-600'>
                              Applied
                            </p>
                          )}
                          {!gig?.likeUsers?.includes(auth?.currentProfile?.userId?.toString()) ? (
                            <svg
                              className='cursor-pointer'
                              fill='none'
                              height='32'
                              onClick={() =>
                                handleLikeUnlikeGig(
                                  gig._id,
                                  index,
                                  !gig?.likeUsers?.includes(
                                    auth?.currentProfile?.userId?.toString()
                                  )
                                )
                              }
                              viewBox='0 0 32 32'
                              width='32'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M15.4138 11.3348L16.0143 12.1375L16.6149 11.3348C17.4058 10.2776 18.6725 9.59131 20.0843 9.59131C22.4808 9.59131 24.431 11.5437 24.431 13.9655C24.431 14.9747 24.2701 15.9053 23.9907 16.7688L23.9892 16.7737C23.3187 18.8954 21.941 20.6156 20.44 21.9056C18.9356 23.1985 17.3503 24.022 16.3411 24.3654L16.3411 24.3654L16.333 24.3682C16.2824 24.3861 16.167 24.408 16.0143 24.408C15.8617 24.408 15.7462 24.3861 15.6956 24.3682L15.6956 24.3682L15.6876 24.3654C14.6783 24.022 13.0931 23.1985 11.5887 21.9056C10.0876 20.6156 8.70993 18.8954 8.03947 16.7737L8.03948 16.7737L8.03791 16.7688C7.75853 15.9053 7.59766 14.9747 7.59766 13.9655C7.59766 11.5437 9.54787 9.59131 11.9443 9.59131C13.3561 9.59131 14.6229 10.2776 15.4138 11.3348Z'
                                stroke='#96B0BD'
                                strokeWidth='1.5'
                              />
                            </svg>
                          ) : (
                            <svg
                              className='cursor-pointer'
                              fill='none'
                              height='32'
                              onClick={() =>
                                handleLikeUnlikeGig(
                                  gig._id,
                                  index,
                                  !gig?.likeUsers?.includes(
                                    auth?.currentProfile?.userId?.toString()
                                  )
                                )
                              }
                              viewBox='0 0 32 32'
                              width='32'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M15.4138 11.8348L16.0143 12.6375L16.6149 11.8348C17.4058 10.7776 18.6725 10.0913 20.0843 10.0913C22.4808 10.0913 24.431 12.0437 24.431 14.4655C24.431 15.4747 24.2701 16.4053 23.9907 17.2688L23.9892 17.2737C23.3187 19.3954 21.941 21.1156 20.44 22.4056C18.9356 23.6985 17.3503 24.522 16.3411 24.8654L16.3411 24.8654L16.333 24.8682C16.2824 24.8861 16.167 24.908 16.0143 24.908C15.8617 24.908 15.7462 24.8861 15.6956 24.8682L15.6956 24.8682L15.6876 24.8654C14.6783 24.522 13.0931 23.6985 11.5887 22.4056C10.0876 21.1156 8.70993 19.3954 8.03947 17.2737L8.03948 17.2737L8.03791 17.2688C7.75853 16.4053 7.59766 15.4747 7.59766 14.4655C7.59766 12.0437 9.54787 10.0913 11.9443 10.0913C13.3561 10.0913 14.6229 10.7776 15.4138 11.8348Z'
                                fill='#96B0BD'
                                stroke='#96B0BD'
                                strokeWidth='1.5'
                              />
                            </svg>
                          )}
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
                              <DropdownMenuCheckboxItem
                                // checked={showStatusBar}
                                // onCheckedChange={setShowStatusBar}
                                className='gap-2 rounded-xl hover:bg-white'
                              >
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
                              <DropdownMenuCheckboxItem
                                // checked={showActivityBar}
                                // onCheckedChange={setShowActivityBar}
                                className='mt-1 gap-2 rounded-xl hover:bg-white'
                              >
                                <svg
                                  fill='none'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  width='24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.91 14.64 21.16 15.65 21.98C15.44 22 15.22 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M2.51953 7.10986H21.4796'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M8.51953 2.10986V6.96985'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M15.4795 2.10986V6.5199'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M23 18.5C23 19.85 22.4 21.05 21.47 21.88C20.67 22.57 19.64 23 18.5 23C17.42 23 16.42 22.62 15.65 21.98C14.64 21.16 14 19.91 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M18.7799 17.0898V18.7798L17.3799 19.6198'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'
                                    strokeWidth='1.5'
                                  />
                                </svg>
                                Extend The Delivery Date
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                // checked={showPanel}
                                // onCheckedChange={setShowPanel}
                                className='mt-1 gap-2 rounded-xl hover:bg-white'
                              >
                                <svg
                                  fill='none'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  width='24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M10.75 14.4302V9.3702C10.75 8.8902 10.55 8.7002 10.04 8.7002H8.75004C8.24004 8.7002 8.04004 8.8902 8.04004 9.3702V14.4302C8.04004 14.9102 8.24004 15.1002 8.75004 15.1002H10.04C10.55 15.1002 10.75 14.9102 10.75 14.4302Z'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M16.0303 14.4302V9.3702C16.0303 8.8902 15.8303 8.7002 15.3203 8.7002H14.0303C13.5203 8.7002 13.3203 8.8902 13.3203 9.3702V14.4302C13.3203 14.9102 13.5203 15.1002 14.0303 15.1002'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  />
                                </svg>
                                Pause The Order
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                // checked={showPanel}
                                // onCheckedChange={setShowPanel}
                                className='mt-1 gap-2 rounded-xl hover:bg-white'
                              >
                                <svg
                                  fill='none'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  width='24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'
                                    strokeWidth='1.5'
                                  />
                                  <path
                                    d='M18.9004 5L4.90039 19'
                                    stroke='#96B0BD'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'
                                    strokeWidth='1.5'
                                  />
                                </svg>
                                Cancel Order
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                    <LongText text={gig.gigDescription} />
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
                  {gig.reason && (
                    <div className='text-md rounded-b-xl bg-orange p-4 text-white'>
                      {gig.reason}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='text-center text-2xl font-semibold'>Not yet</div>
            )}
          </div>
        </div>
      )}
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
