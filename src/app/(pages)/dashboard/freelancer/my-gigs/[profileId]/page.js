'use client';

import React, { useEffect, useState } from 'react';

import BlankView from './Blank';
import CreateRow from './CreateRow';
import TabView from './TabView';

import { useCustomContext } from '@/context/ContextProvider';
import { useGetFLGigsPostedByProfileId } from '@/hooks/useGetFLGigsPostedByProfileId';

const GigsPage = ({params}) => {
  const auth = useCustomContext();
  const [allGigs, setAllGigs] = useState([]);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const itemsPerPage = 3;

  const { data: flGigs } = useGetFLGigsPostedByProfileId(
    params.profileId,
    page,
    itemsPerPage
  );

  useEffect(() => {
    if (flGigs?.length > 0) {
      setCanLoadMore(true);
      if (page === 1) {
        setAllGigs(flGigs);
      } else {
        setAllGigs((prev) => {
          let result = [...prev];
          const ids = prev.map((item) => item._id);

          flGigs.map((gig) => {
            if (!ids.includes(gig._id)) {
              result = [...result, gig];
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
  }, [flGigs, page]);

  return (
    <div className='p-8 mobile:p-0'>
      {allGigs.length ? (
        <>
          <CreateRow Id={params.profileId}/>
          <TabView allGigs={allGigs} canLoadMore={canLoadMore} setPage={setPage} />
        </>
      ) : (
        <BlankView />
      )}
    </div>
  );
};

export default GigsPage;
