import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllFreelancerOrdersProposed = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const result = await api.get(`/api/v1/freelancer_gig/find_all_orders_on_client/${profileId}`);
          console.log("result in useGetAllFreelancerOrdersProposed:", result);
          const proposals = [];
          const lives = [];

          if (result.data.proposals.length > 0) {
            result.data.proposals.map((proposal) => {
              proposals.push({
                creator: {
                  fullName: proposal.gigOwner.fullName,
                },
                freelancer: proposal.gigOwner,
                gigDescription: proposal.freelancerGig.gigDescription,
                gigId: proposal.freelancerGig._id,
                gigPostDate: proposal.freelancerGig.gigPostDate,
                gigPrice: proposal.freelancerGig.gigPrice,
                gigTitle: proposal.freelancerGig.gigTitle,
                maxBudget: proposal.freelancerGig.maxBudget,
                minBudget: proposal.freelancerGig.minBudget,
                walletPubkey: proposal.proposer?.walletPubkey,
                deliveryTime: proposal.freelancerGig.deliveryTime,
                proposal: proposal.proposal,
                proposalId: proposal._id,
                status: null,
              });
            });
          }

          if (result.data.lives.length > 0) {
            result.data.lives.map((live) => {
              lives.push({
                id: live._id,
                creator: {
                  fullName: live.gigOwner.fullName,
                },
                freelancer: live.gigOwner,
                gigDescription: live.freelancerGig.gigDescription,
                gigId: live.freelancerGig._id,
                gigPostDate: live.freelancerGig.gigPostDate,
                gigPrice: live.freelancerGig.gigPrice
                  ? `$${live.freelancerGig.gigPrice}`
                  : `$${live.freelancerGig.minBudget}/hr ~ $${live.freelancerGig.maxBudget}/hr`,
                gigTitle: live.freelancerGig.gigTitle,
                status: live.status,
                contractId: live.contractId,
                deliveryTime: live.freelancerGig.deliveryTime,
                proposal: live.proposal,
                proposalId: live._id,
                status: live.status,
              });
            });
          }

          return { lives, proposals };
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetAllClientOrdersProposed', profileId],
    staleTime: Infinity,
  });
};
