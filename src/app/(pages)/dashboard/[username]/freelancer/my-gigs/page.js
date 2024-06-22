'use client';

import React, { useState, useEffect } from 'react';
import BlankView from './Blank';
import CreateRow from './CreateRow';
import TabView from './TabView';
import { useCustomContext } from '@/context/use-custom';
import api from '@/utils/api';

const GigsPage = () => {
  const auth = useCustomContext();
  const [allGigs, setAllGigs] = useState([]);

  useEffect(() => {
    const func = async () => {
      if (auth.user) {
        const res = await api.get(
          `/api/v1/freelancer_gig/find_all_gigs_by_email/${auth.user.email}`
        );

        if (res.data) {
          setAllGigs(res.data.data);
        }
      }
    };

    func();
  }, [auth]);

  return (
    <div className='p-8 mobile:p-0'>
      {allGigs.length ? (
        <>
          <CreateRow />
          <TabView allGigs={allGigs} />
        </>
      ) : (
        <BlankView />
      )}
      <div className='py-5 md:text-xl hover:bg-[#28373E] transition px-10 w-full max-w-full rounded-xl mobile:px-5 border border-[#28373E] text-center mx-auto cursor-pointer mt-8'>
        Load more +
      </div>
    </div>
  );
};

export default GigsPage;
