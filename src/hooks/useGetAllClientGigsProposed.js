import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllClientGigsProposed = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const result = await api.get(`/api/v1/client_gig/find_all_gigs_of_client/${profileId}`);
          console.log("result in useGetAllClientGigsProposed:", result);
          const proposals = [];
          const lives = [];

          if (result.data.proposals.length > 0) {
            result.data.proposals.map((proposal) => {
              proposals.push({
                creator: {
                  fullName: proposal.proposer.fullName,
                },
                freelancerId: proposal.proposer,
                gigDescription: proposal.clientGig.gigDescription,
                gigId: proposal.clientGig._id,
                gigPostDate: proposal.clientGig.gigPostDate,
                gigPrice: proposal.clientGig.gigPrice,
                gigTitle: proposal.clientGig.gigTitle,
                maxBudget: proposal.clientGig.maxBudget,
                minBudget: proposal.clientGig.minBudget,
                walletPubkey: proposal.proposer?.walletPubkey,
              });
            });
          }

          if (result.data.contracts.length > 0) {
            result.data.contracts.map((contract) => {
              lives.push({
                id: contract._id,
                creator: {
                  fullName: contract.proposer.fullName,
                },
                freelancerId: contract.proposer,
                gigDescription: contract.clientGig.gigDescription,
                gigId: contract.clientGig._id,
                gigPostDate: contract.clientGig.gigPostDate,
                gigPrice: contract.clientGig.gigPrice
                  ? `$${contract.clientGig.gigPrice}`
                  : `$${contract.clientGig.minBudget}/hr ~ $${contract.clientGig.maxBudget}/hr`,
                gigTitle: contract.clientGig.gigTitle,
                status: contract.status,
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
    queryKey: ['useGetAllClientGigsProposed', profileId],
    staleTime: Infinity,
  });
};
