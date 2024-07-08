'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';

import { BillIcon } from '@/components/elements/svgs/BillIcon';
import { ClockIcon } from '@/components/elements/svgs/ClockIcon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/seperator';
import { minutesDifference } from '@/utils/Helpers';

const ActiveView = ({ allGigs, canLoadMore, setPage }) => {
  const router = useRouter();
  const handleEdit = (gigId) => {
    router.push(`/dashboard/freelancer/my-gigs/edit/${gigId}`);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='flex flex-col gap-2'>
      {allGigs.map((gig, index) => (
        <div
          className='flex w-full items-start gap-4 rounded-xl bg-[#10191d] p-4 mobile:flex-col'
          key={index}
        >
          <div className='h-[250px] basis-1/3 overflow-hidden mobile:w-full mobile:basis-auto'>
            <Image
              alt='Gig Image'
              className='h-full w-full rounded-xl object-cover'
              height={250}
              src={gig.gallery?.images[0] || '/assets/images/portfolio_works/portfolio.jpeg'}
              width={250}
            />
          </div>
          <div className='flex flex-grow basis-2/3 flex-col gap-2 mobile:w-full'>
            <div className='mt-1 flex flex-row items-start justify-between gap-4 md:items-center'>
              <div
                className='flex-1 cursor-pointer text-left text-[24px] hover:underline md:text-2xl'
                onClick={() => handleEdit(gig._id)}
              >
                {gig.gigTitle}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='border-none bg-transparent hover:bg-transparent'
                    variant='outline'
                  >
                    <FaEllipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='rounded-xl border-[#3E525B] bg-[#28373E]'
                >
                  <DropdownMenuItem
                    className='gap-8 rounded-xl px-4 hover:bg-white'
                    onClick={() => handleEdit(gig._id)}
                  >
                    <FaRegEdit />
                    Edit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='flex flex-row items-start justify-start gap-6'>
              <div className='flex flex-row items-center gap-2'>
                <ClockIcon />
                {minutesDifference(gig.gigPostDate)}
              </div>
              <div className='flex flex-row items-center gap-2'>
                <BillIcon />$ {gig.gigPrice}
              </div>
            </div>
            <Separator className='my-1' />
            <p className='text-medGray'>{gig.gigDescription}</p>
            <div className='flex flex-wrap items-center gap-3'>
              {gig.searchKeywords.map((keyword, index) => (
                <div
                  className='border-1 flex w-auto cursor-pointer items-center whitespace-nowrap rounded-full border-[#3E525B] bg-[#28373E] px-2 py-1 text-sm text-white'
                  key={index}
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {canLoadMore && (
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

export default ActiveView;
