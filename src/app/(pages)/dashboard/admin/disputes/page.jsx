'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';

const GigCard = ({}) => {
  const router = useRouter();

  return (
    <div
      className='cursor-pointer border-t-2 bg-[#10191d] py-7 mobile:flex-col-reverse mobile:gap-3 mobile:py-3'
      onClick={() => router.push(`/dashboard/admin/disputes/${'23532523532'}`)}
    >
      <div className='flex items-center justify-between gap-1'>
        <div>
          <h3 className='mb-2 text-lg text-white'>Dispute Case For Contract Id#</h3>
          <p className='text-slate-500'>#23532523532</p>
        </div>
        <div>
          <h3 className='mb-2 text-lg text-white'>Date</h3>
          <p className='text-slate-500'>6/22, 2024</p>
        </div>
        <div>
          <h3 className='mb-2 text-lg text-white'>Amount</h3>
          <p className='text-slate-500'>$780</p>
        </div>
      </div>
    </div>
  );
};

const Disputes = () => {
  const [myGigs, setMyGigs] = useState([]);
  const auth = useCustomContext();

  useEffect(() => {
    api
      .get(`/api/v1/client_gig/get_gigs_posted_by_profile_id/${auth?.currentProfile?._id}`)
      .then((data) => {
        setMyGigs(data.data.data);
      });
  }, [auth?.currentProfile?._id]);

  return (
    <div className='flex flex-col gap-8'>
      <div className='mb-4 rounded-xl bg-[#10191d] p-7 mobile:gap-3 mobile:p-3'>
        <div className='mb-5 flex'>
          <h1 className='text-xl text-white'>Disputes</h1>
        </div>
        <div className='flex flex-col'>
          {myGigs.length ? (
            [...myGigs, ...myGigs, ...myGigs].map((gig, index) => <GigCard gig={gig} key={index} />)
          ) : (
            <div className='mt-[10vh] text-center'>Not Disputes yet</div>
          )}
        </div>
        <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
          Load more +{' '}
        </button>
      </div>
    </div>
  );
};

export default Disputes;
