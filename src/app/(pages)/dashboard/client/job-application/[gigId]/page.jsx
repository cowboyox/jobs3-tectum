'use client';
import React, { useEffect } from 'react';

import GigPage from './GigPage';

import api from '@/utils/api';
import { usePathname, useRouter } from 'next/navigation';

const Page = async ({ params }) => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token')
    if(!tmp){
      router.push(`/?redirect=${pathname}`);
    }
  }, [router, pathname])

  const gigData = await getGigById(params.gigId);
  const { gigTitle, gigPostDate, gigPrice, creator: freelancer, walletPubkey } = gigData.data.data;

  return (
    <GigPage
      freelancerFullName={freelancer?.fullName}
      freelancerLocation={freelancer?.location}
      gigPostDate={gigPostDate}
      gigPrice={gigPrice}
      gigTitle={gigTitle}
      walletPubkey={walletPubkey}
    />
  );
};
export default Page;

const getGigById = async (gigId) => {
  const resData = await api.get(`/api/v1/freelancer_gig/get_gig_by_id/${gigId}`);
  return resData;
};
