'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import GigPage from './GigPage';

import { useGetFreelancerGigById } from '@/hooks/useGetFreelancerGigById';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { gigId } = useParams();
  const { data: gigData } = useGetFreelancerGigById(gigId);

  console.log(gigData);

  useEffect(() => {
    let tmp = localStorage.getItem('jobs_2024_token');
    if (!tmp) {
      router.push(`/?redirect=${pathname}`);
    }
  }, [router, pathname]);

  return (
    <GigPage
      freelancerFullName={gigData?.creator?.fullName}
      freelancerLocation={gigData?.creator?.location}
      gigPostDate={gigData?.gigPostDate}
      gigPrice={gigData?.gigPrice}
      gigTitle={gigData?.gigTitle}
      walletPubkey={gigData?.walletPubkey}
    />
  );
};

export default Page;
