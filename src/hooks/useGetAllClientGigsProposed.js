import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllClientGigsProposed = (profileId, userId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!(profileId || userId),
    queryFn: async () => {
      if (profileId && userId) {
        try {
          const [ gigData, contractData ] = await Promise.all([
            api.get(`/api/v1/client_gig/find_all_gigs_of_client/${profileId}`),
            api.get(`/api/v1/client_gig/find_all_contracts_of_client/${userId}`)
          ]);
          console.log("contractData", gigData, contractData)
          const proposals = [];
          const lives = [];

          if (gigData?.data?.data) {
            gigData?.data?.data.map((d) => {
              d.bidInfos.map((info) => {
                if (!info.hired) {
                  proposals.push({
                    creator: {
                      fullName: info.fullName,
                    },
                    freelancerId: info.freelancerId,
                    gigDescription: d.gigDescription,
                    gigId: d._id,
                    gigPostDate: d.gigPostDate,
                    gigPrice: d.gigPrice,
                    gigTitle: d.gigTitle,
                    maxBudget: d.maxBudget,
                    minBudget: d.minBudget,
                    walletPubkey: info?.walletPubkey,
                  });
                }
              });
            });
          }

          if (contractData?.data?.data) {
            contractData?.data?.data.map((d) => {
              lives.push({
                id: d._id,
                creator: {
                  fullName: d.freelancer.fullName,
                },
                freelancerId: d.freelancer,
                gigDescription: d.clientGig.gigDescription,
                gigId: d.clientGig._id,
                gigPostDate: d.clientGig.gigPostDate,
                gigPrice: d.clientGig.gigPrice
                  ? `$${d.clientGig.gigPrice}`
                  : `$${d.clientGig.minBudget}/hr ~ $${d.clientGig.maxBudget}/hr`,
                gigTitle: d.clientGig.gigTitle,
                status: d.status,
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
    queryKey: ['useGetAllClientGigsProposed', profileId, userId],
    staleTime: Infinity,
  });
};
