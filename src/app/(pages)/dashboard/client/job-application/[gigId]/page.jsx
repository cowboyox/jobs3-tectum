import React from 'react';

import GigPage from './GigPage';

import api from '@/utils/api';

const Page = async ({ params }) => {
  const gigData = await getGigById(params.gigId);
  const { gigTitle, gigPostDate, gigPrice, creator: freelancer } = gigData.data.data;

  return (
    <GigPage
      freelancerFullName={freelancer.fullName}
      freelancerLocation={freelancer.location}
      gigPostDate={gigPostDate}
      gigPrice={gigPrice}
      gigTitle={gigTitle}
    />
  );
};
export default Page;

const getGigById = async (gigId) => {
  const resData = await api.get(`/api/v1/freelancer_gig/get_gig_by_id/${gigId}`);
  console.log('-----resData ', resData.data.data);
  return resData;
};
