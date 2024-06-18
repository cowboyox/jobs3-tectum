'use client';

import React, { useEffect, useState } from 'react';
import Job from '@/components/dashboard/jobapplication/Job';
import api from '@/utils/api';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const Page = () => {
  const { gigId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [gigInfo, setGigInfo] = useState();
  const [coverLetter, setCoverLetter] = useState();

  useEffect(() => {
    const func = async () => {
      const resData = await api.get(`/api/v1/client_gig/get_gig_by_id/${gigId}`);
      setGigInfo(resData);
    };

    func();
  }, [gigId]);

  const onChangeCoverletter = e => {
    setCoverLetter(e.target.value);
  };

  const onApply = async () => {
    let values = {};

    values.freelancerId = gigInfo.userId;
    values.fullName = gigInfo.fullName;
    values.proposal = coverLetter;
    values.connects = gigInfo.connects;

    await api
      .post(`/api/v1/bidding/${gigId}/apply`, values)
      .then(async data => {
        console.log(data);

        toast({
          variant: 'default',
          title: <h1 className='text-center'>Success</h1>,
          description: <h3>Successfully applied!</h3>,
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        });
        router.push('../');
      })
      .catch(err => {
        console.log('Error corrupted during applying gig', err);
        toast({
          variant: 'destructive',
          title: <h1 className='text-center'>Error</h1>,
          description: <h3>Internal Server Error</h3>,
          className:
            'bg-red-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        });
      });
  };

  return (
    <div
      className='flex gap-8 md:flex-row flex-col items-center md:justify-center md:items-start
     '
    >
      <div className='w-full md:w-[65%] md:max-w-[690px]'>
        {gigInfo ? <Job gigData={gigInfo} /> : <></>}
        <div className='bg-deepGreen mt-4  px-6 py-6 flex flex-col gap-4 text-white rounded-2xl'>
          <h3 className='text-white hidden md:block text-xl font-semibold whitespace-nowrap'>
            Cover letter
          </h3>
          <textarea
            name=''
            id=''
            cols='30'
            rows='7'
            className='border border-medGray bg-deepGreen w-full rounded-xl p-4'
            placeholder='Type here...'
            onChange={onChangeCoverletter}
          ></textarea>
        </div>
      </div>
      <div className='w-full md:w-[35%] md:max-w-[420px]'>
        <div className='bg-deepGreen px-6 py-6 flex flex-col gap-4 text-white rounded-2xl'>
          <div className='flex flex-col gap-3'>
            <div className='bg-[#1B272C] p-3 rounded-xl flex items-center justify-center gap-2'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10'
                  stroke='#96B0BD'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z'
                  stroke='#96B0BD'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z'
                  stroke='#96B0BD'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              SSL Secure Payment
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <p> Refundable Dispute Fee</p>
                <p>$ 0,50</p>
              </div>
              <div className='flex justify-between'>
                <p>Service Fee</p>
                <p>$ 0</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-xl font-semibold'>Total</p>
                <p className='text-xl font-semibold'>$ 0</p>
              </div>
            </div>
            <div className='bg-[#1B272C] p-1 rounded-xl flex md:mt-0 mt-2 '>
              <button className='md:p-3 md:px-8 px-8 p-2'>Back</button>
              <button className='bg-[#DC4F13] md:p-3 px-8 p-2 w-full' onClick={onApply}>
                Apply
              </button>
            </div>
          </div>
        </div>
        <p className='text-medGray text-sm p-4'>
          * Refundable Dispute Fee will be charged in case the client accepts the offer
        </p>
      </div>
    </div>
  );
};
export default Page;
