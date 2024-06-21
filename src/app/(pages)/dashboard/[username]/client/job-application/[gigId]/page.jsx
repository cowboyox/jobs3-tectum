import React from 'react';
import api from '@/utils/api';
import GigPage from './GigPage';

const Page = async ({ params }) => {
  const gigData = await getGigById(params.gigId);
  const { gigTitle, gigPostDate, gigPrice, creator: freelancer } = gigData.data.data;

  return (
    <GigPage
      gigTitle={gigTitle}
      gigPostDate={gigPostDate}
      gigPrice={gigPrice}
      freelancerFullName={freelancer.fullName}
      freelancerLocation={freelancer.location}
    />
  );
};
export default Page;

const getGigById = async (gigId) => {
  const resData = await api.get(`/api/v1/freelancer_gig/get_gig_by_id/${gigId}`);
  console.log('-----resData ', resData.data.data);
  return resData;
};
