'use client';

import React, { useEffect, useState } from 'react';

import OfferItem from '@/components/dashboard/offerItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCustomContext } from '@/context/use-custom';
import { useGetAllClientOrdersProposed } from '@/hooks/useGetAllClientOrdersProposed';

const Offer = () => {
  const auth = useCustomContext();

  const [proposals, setProposals] = useState([]);
  const [lives, setLives] = useState([]);

  const { data: orders, refetch: refetchAllOrdersProposed } = useGetAllClientOrdersProposed(
    auth?.currentProfile?._id
  );

  useEffect(() => {
    if (orders) {
      setLives(orders?.lives);
      setProposals(orders?.proposals);
    }
  }, [orders]);

  return (
    <Tabs defaultValue="Accepted" className="flex flex-col w-full gap-6">
        <TabsList className='w-full h-auto p-0 bg-transparent'>
            <TabsTrigger 
              className='w-full py-6 text-base bg-transparent border-b-4 border-[#516170] data-[state=active]:border-[#dc4f14]' 
              value="Accepted">
                Accepted
            </TabsTrigger>
            <TabsTrigger 
              className='w-full py-6 text-base bg-transparent border-b-4 border-[#516170] data-[state=active]:border-[#dc4f14]' 
              value="proposals">
                Proposals
            </TabsTrigger>
        </TabsList>
        <div className="flex items-center justify-center gap-8 mobile:flex-col">
          <div className="w-full">
            <TabsContent value="Accepted" className='w-full'>
              <div className="flex flex-col w-full gap-5">
                <OfferItem/>
                <OfferItem/>
                <OfferItem/>
                <OfferItem/>
              </div>
            </TabsContent>
            <TabsContent value="proposals">
              <div className='flex flex-col w-full gap-5'>
                <OfferItem/>
                <OfferItem/>
                <OfferItem/>
                <OfferItem/>
              </div>
            </TabsContent>
          </div>
        </div>
    </Tabs>
  )
}

export default Offer