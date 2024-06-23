'use client';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import api from '@/utils/api';


const GigCard = ({ gig }) => {
  const router = useRouter()

  return (
    <div className='bg-[#10191d] py-7 mobile:flex-col-reverse mobile:gap-3 mobile:py-3 border-t-2 cursor-pointer'
      onClick={() => router.push(`/dashboard/admin/disputes/${'23532523532'}`)}
    >
      <div className='flex items-center justify-between gap-1'>
        <div>
          <h3 className='text-lg text-white mb-2'>Dispute Case For Contract Id#</h3>
          <p className='text-slate-500'>#23532523532</p>
        </div>
        <div>
          <h3 className='text-lg text-white mb-2'>Date</h3>
          <p className='text-slate-500'>6/22, 2024</p>
        </div>
        <div>
          <h3 className='text-lg text-white mb-2'>Amount</h3>
          <p className='text-slate-500'>$780</p>
        </div>
      </div>
    </div>
  );
};

const Disputes = () => {
  const [myGigs, setMyGigs] = useState([]);
  useEffect(() => {
    api.get(`/api/v1/client_gig/get-gig-by-userId`).then((data) => {
      setMyGigs(data.data.data);
    });
  }, []);

  return (
    <div className='flex flex-col gap-8'>
      <div className='mb-4 rounded-xl bg-[#10191d] p-7 mobile:gap-3 mobile:p-3'>
        <div className='flex mb-5'>
          <h1 className='text-xl text-white'>Disputes</h1>
        </div>
        <div className='flex flex-col'>
          {myGigs.length ? (
            [...myGigs, ...myGigs, ...myGigs].map((gig, index) => <GigCard gig={gig} key={index} />)
          ) : (
            <div className='mt-[10vh] text-center'>Not Disputes yet</div>
          )}
        </div>
        <div className='mx-auto w-[30%] max-w-full cursor-pointer rounded-xl border border-[#aaaaaaaa] px-10 py-5 text-center transition hover:bg-white hover:text-black md:text-xl mobile:px-5'>
          Load more +
        </div>
      </div>
    </div>
  );
};

export default Disputes;
