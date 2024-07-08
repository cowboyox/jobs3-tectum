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

  const { gigTitle, gigPostDate, gigPrice, creator: freelancer, walletPubkey } = gigData.data;

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
