'use client';
import React from 'react';
import { Icon } from '@iconify/react';
import OfferItem from '@/components/dashboard/offerItem';


const Offer: React.FC = () => {
  

  return (
    <div className='pt-10 flex flex-col gap-3'>
        <OfferItem/>
        <OfferItem/>
        <OfferItem/>
        <OfferItem/>
    </div>
  );
};

export default Offer;
