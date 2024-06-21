'use client';

import React, { useEffect, useState } from 'react';
import Job from '@/components/dashboard/jobapplication/Job';
import api from '@/utils/api';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useCustomContext } from '@/context/use-custom';

const Page = () => {
  const { gigId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [gigInfo, setGigInfo] = useState();
  const [coverLetter, setCoverLetter] = useState();
  const auth = useCustomContext();

  useEffect(() => {
    const func = async () => {
      const resData = await api.get(`/api/v1/client_gig/get_gig_by_id/${gigId}`);
      setGigInfo(resData);
    };

    func();
  }, [gigId]);

  const onChangeCoverletter = (e) => {
    setCoverLetter(e.target.value);
  };

  const onApply = async () => {
    let values = {};

    values.freelancerId = auth.user._id;
    values.fullName = auth.user.name;
    values.email = auth.user.email;
    values.proposal = coverLetter;
    values.connects = gigInfo.connects;

    await api
      .post(`/api/v1/bidding/${gigId}/apply`, values)
      .then(async (data) => {
        console.log(data);

        toast({
          variant: 'default',
          title: <h1 className='text-center'>Success</h1>,
          description: <h3>Successfully applied!</h3>,
          className:
            'bg-green-500 rounded-xl absolute top-[-94vh] xl:w-[10vw] md:w-[20vw] sm:w-[40vw] xs:[w-40vw] right-0 text-center',
        });
        router.push('../find-job');
      })
      .catch((err) => {
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
    <div className='flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center'>
      <div className='w-full md:w-[65%] md:max-w-[690px]'>
        {gigInfo ? <Job gigData={gigInfo} /> : <></>}
        <div className='mt-4 flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'>
          <h3 className='hidden whitespace-nowrap text-xl font-semibold text-white md:block'>
            Cover letter
          </h3>
          <textarea
            name=''
            id=''
            cols='30'
            rows='7'
            className='w-full rounded-xl border border-medGray bg-deepGreen p-4'
            placeholder='Type here...'
            onChange={onChangeCoverletter}
          ></textarea>
        </div>
      </div>
      <div className='w-full md:w-[35%] md:max-w-[420px]'>
        <div className='flex flex-col gap-4 rounded-2xl bg-deepGreen px-6 py-6 text-white'>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-center gap-2 rounded-xl bg-[#1B272C] p-3'>
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
