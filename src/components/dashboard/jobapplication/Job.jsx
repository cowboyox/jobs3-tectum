import Image from 'next/image';
import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { MdAccessTime } from 'react-icons/md';

import { useCustomContext } from '@/context/ContextProvider';
import { minutesDifference } from '@/utils/Helpers';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Job = ({ gigData }) => {
  const auth = useCustomContext();
  function truncateString(str) {
    // Find the first comma's index
    const commaIndex = str.indexOf(',');

    // If a comma is found before 15 characters
    if (commaIndex > 0 && commaIndex < 15) {
      return str.substring(0, commaIndex) + '...';
    } 
    return str;
}

  return (
    <div className='flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'>
      <div className='flex flex-col gap-3 border-b border-lightGray pb-5'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <Image height={45} src={'/assets/icons/ActiveOrder.png'} width={45} />
            <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
              {gigData.data.data.gigTitle}
            </h3>
          </div>
          <div className='flex items-center gap-6'>
            {/* <FaRegHeart className='text-xl text-medGray' /> */}
            {!gigData.data.data?.likeUsers?.includes(auth?.currentProfile?.userId?.toString()) ? (
              <svg
                // className='cursor-pointer'
                fill='none'
                height='32'
                // onClick={() =>
                //   handleLikeUnlikeGig(
                //     gig._id,
                //     index,
                //     !gig?.likeUsers?.includes(auth?.currentProfile?.userId?.toString())
                //   )
                // }
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
                // className='cursor-pointer'
                fill='none'
                height='32'
                // onClick={() =>
                //   handleLikeUnlikeGig(
                //     gig._id,
                //     index,
                //     !gig?.likeUsers?.includes(auth?.currentProfile?.userId?.toString())
                //   )
                // }
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
            <IoIosMore className='text-xl text-medGray' />
          </div>
        </div>
        <h3 className='whitespace-nowrap text-xl font-semibold text-white md:hidden'>
          {/* {gig.title} */} Figma and Flow bite mentor needed
        </h3>
        <div className='flex flex-wrap justify-end gap-4'>
          <div className='flex items-center gap-1'>
            <MdAccessTime className='text-xl text-medGray' />
            <span>{minutesDifference(gigData.data.data.gigPostDate)}</span>
          </div>
          <div className='flex items-center gap-1'>
            <svg
              fill='none'
              height='24'
              viewBox='0 0 25 24'
              width='25'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.75 13.4299C14.4731 13.4299 15.87 12.0331 15.87 10.3099C15.87 8.58681 14.4731 7.18994 12.75 7.18994C11.0269 7.18994 9.63 8.58681 9.63 10.3099C9.63 12.0331 11.0269 13.4299 12.75 13.4299Z'
                stroke='#96B0BD'
                strokeWidth='1.5'
              />
              <path
                d='M4.37001 8.49C6.34001 -0.169998 19.17 -0.159997 21.13 8.5C22.28 13.58 19.12 17.88 16.35 20.54C14.34 22.48 11.16 22.48 9.14001 20.54C6.38001 17.88 3.22001 13.57 4.37001 8.49Z'
                stroke='#96B0BD'
                strokeWidth='1.5'
              />
            </svg>
            {/* <span>{truncateString(gigData.data.data.location)}</span> */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>{truncateString(gigData.data.data.location !== ''? gigData.data.data.location: 'Anywhere')}</TooltipTrigger>
                <TooltipContent>
                  <p>{gigData.data.data.location !== ''? gigData.data.data.location: 'Anywhere'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='flex items-center gap-2'>
            <FaRegUser className='text-xl text-medGray' />
            <span>{gigData.data.data.proposalUsers.length} Applicants</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg
              fill='none'
              height='24'
              viewBox='0 0 25 24'
              width='25'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.42188 14.3298C9.42188 15.6198 10.4119 16.6598 11.6419 16.6598H14.1519C15.2219 16.6598 16.0919 15.7498 16.0919 14.6298C16.0919 13.4098 15.5619 12.9798 14.7719 12.6998L10.7419 11.2998C9.95187 11.0198 9.42188 10.5898 9.42188 9.36984C9.42188 8.24984 10.2919 7.33984 11.3619 7.33984H13.8719C15.1019 7.33984 16.0919 8.37984 16.0919 9.66984'
                stroke='#96B0BD'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
              />
              <path
                d='M12.75 6V18'
                stroke='#96B0BD'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
              />
              <path
                d='M12.75 22C18.2728 22 22.75 17.5228 22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22Z'
                stroke='#96B0BD'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
              />
            </svg>

            <span>
              {gigData.data.data.gigPaymentType
                ? `Hourly: $${gigData.data.data.minBudget}–$${gigData.data.data.maxBudget}`
                : `Fixed: $${gigData.data.data.gigPrice}`}
            </span>
          </div>
        </div>
      </div>
      <p className='text-sm text-medGray'>
        <pre className='whitespace-pre-wrap font-roboto text-base'>
          {gigData.data.data.gigDescription}
        </pre>
      </p>
      <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>Skills</h3>
      <div className='flex flex-wrap gap-2'>
        {gigData.data.data.requiredSkills.map((skill, skillIndex) => (
          <div
            className='cursor-pointer rounded-full border border-lightGray bg-darkGray px-2 py-1 text-center'
            key={skillIndex}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;
