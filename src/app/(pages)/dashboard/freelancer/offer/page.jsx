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
              {
                lives.length > 0 ? 
                (
                  <>
                    {lives.map((order, index) => (
                      <OfferItem 
                        proposalId={order.proposalId} 
                        gigTitle={order.gigTitle} 
                        gigPrice={order.gigPrice} 
                        deliveryTime={order.deliveryTime} 
                        proposal={order.proposal} 
                        refetchAllOrdersProposed={refetchAllOrdersProposed}
                        accepted={true}
                      />
                    ))}
                    <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
                      Load more +{' '}
                    </button>
                  </>
                ) : (
                  <div className='flex flex-col items-center justify-center h-full gap-3 py-20'>
                    <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
                    <p className='text-[18px] text-slate-600'>Accepted proposals will be here</p>
                  </div>
                )
              }
              </div>
            </TabsContent>
            <TabsContent value="proposals">
              <div className='flex flex-col w-full gap-5'>
              {
                proposals.length > 0 ? 
                (
                  <>
                    {proposals.map((proposal, index) => (
                      <OfferItem 
                        proposalId={proposal.proposalId} 
                        gigTitle={proposal.gigTitle} 
                        gigPrice={proposal.gigPrice} 
                        deliveryTime={proposal.deliveryTime} 
                        proposal={proposal.proposal}
                        refetchAllOrdersProposed={refetchAllOrdersProposed}
                        accepted={false}
                      />
                    ))}
                    <button className='mt-6 w-full border border-[#28373E] p-3 text-center'>
                      Load more +{' '}
                    </button>
                  </>
                ) : (
                  <div className='flex flex-col items-center justify-center h-full gap-3 py-20'>
                    <h2 className='text-3xl font-bold'>Nothing Here Yet</h2>
                    <p className='text-[18px] text-slate-600'>Proposals will be here</p>
                  </div>
                )
              }
              </div>
            </TabsContent>
          </div>
        </div>
    </Tabs>
  )
}

export default Offer