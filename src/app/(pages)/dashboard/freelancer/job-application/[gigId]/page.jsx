'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

import Job from '@/components/dashboard/jobapplication/Job';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';
import { useGetClientGigById } from '@/hooks/useGetClientGigById';
import api from '@/utils/api';

const Page = () => {
  const { gigId } = useParams();
  const wallet = useAnchorWallet();
  const router = useRouter();
  const { toast } = useToast();
  const [coverLetter, setCoverLetter] = useState();
  const auth = useCustomContext();
  const pathname = usePathname();

  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    // if (!tmp) {
    //   router.push(`/signin?redirect=${pathname}`);
    // }
  }, [router, pathname]);

  const { data: gigInfo } = useGetClientGigById(gigId);

  const onChangeCoverletter = (e) => {
    setCoverLetter(e.target.value);
  };

  const onApply = async () => {
    if (auth?.currentProfile?.profileType !== 0) {
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Please login as a freelancer!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      router.push(`/signin`)
      return;
    }
    if (!wallet) {
      toast({
        className:
          'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        description: <h3>Please connect your wallet on the setting page!</h3>,
        title: <h1 className='text-center'>Error</h1>,
        variant: 'destructive',
      });
      return;
    }
    let values = {};

    values.freelancerId = auth.currentProfile._id;
    values.proposalText = coverLetter;
    values.profileId = gigInfo?.data?.data?.profileId;

    await api
      .post(`/api/v1/bidding/${gigId}/apply-to-clientgig`, values)
      .then(async () => {
        toast({
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
          description: <h3>Successfully applied!</h3>,
          title: <h1 className='text-center'>Success</h1>,
          variant: 'default',
        });
        router.push('../find-job');
      })
      .catch((err) => {
        console.error('Error corrupted during applying gig', err);

        if (err?.response?.data?.message == 'You already applied to this gig!') {
          toast({
            className:
              'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>{err?.response?.data?.message}</h3>,
            title: <h1 className='text-center'>Error</h1>,
            variant: 'destructive',
          });
        } else {
          toast({
            className:
              'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
            description: <h3>Internal Server Error</h3>,
            title: <h1 className='text-center'>Error</h1>,
            variant: 'destructive',
          });
        }
      });
  };

  return (
    <div className='flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center'>
      <div className='w-full md:w-[65%] md:max-w-[690px]'>
        {gigInfo ? <Job gigData={gigInfo} /> : <></>}
        <div className='mt-4 flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'>
          <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
            Cover letter
          </h3>
          <textarea
            className='w-full rounded-xl border border-medGray bg-deepGreen p-4'
            cols='30'
            id=''
            name=''
            onChange={onChangeCoverletter}
            placeholder='Type here...'
            rows='7'
          />
        </div>
      </div>
      <div className='w-full md:w-[35%] md:max-w-[420px]'>
        <div className='flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-center gap-2 rounded-xl bg-[#1B272C] p-3'>
              <svg
                fill='none'
                height='24'
                viewBox='0 0 24 24'
                width='24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10'
                  stroke='#96B0BD'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                />
                <path
                  d='M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z'
                  stroke='#96B0BD'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                />
                <path
                  d='M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z'
                  stroke='#96B0BD'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                />
              </svg>
              SSL Secure Payment
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <p> Refundable Dispute Fee</p>
                <p>$0.5</p>
              </div>
              <div className='flex justify-between'>
                <p>Service Fee</p>
                <p>${gigInfo?.data?.data?.gigPrice * 0.1 || 0}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-xl font-semibold'>Total</p>
                <p className='text-xl font-semibold'>
                  ${gigInfo?.data?.data?.gigPrice - gigInfo?.data?.data?.gigPrice * 0.1 || 0}
                </p>
              </div>
            </div>
            <div className='mt-2 flex rounded-xl bg-[#1B272C] p-1 md:mt-0'>
              <button className='p-2 px-8 md:p-3 md:px-8'>Back</button>
              <button className='w-full bg-[#DC4F13] p-2 px-8 md:p-3' onClick={onApply}>
                Apply
              </button>
            </div>
          </div>
        </div>
        <p className='p-4 text-sm text-medGray'>
          * Refundable Dispute Fee will be charged in case the client accepts the offer
        </p>
      </div>
    </div>
  );
};
export default Page;
