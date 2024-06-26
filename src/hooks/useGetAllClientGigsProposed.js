import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllClientGigsProposed = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const { data } = await api.get(`/api/v1/client_gig/find_all_gigs_of_client/${profileId}`);
          const proposals = [];
          const lives = [];

          if (data?.data) {
            data.data.map((d) => {
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
                    minBudget : d.minBudget,
                    maxBudget: d.maxBudget,
                    gigTitle: d.gigTitle,
                    walletPubkey: info?.walletPubkey
                  });
                } else {
                  lives.push({
                    creator: {
                      fullName: info.fullName,
                    },
                    freelancerId: info.freelancerId,
                    gigDescription: d.gigDescription,
                    gigId: d._id,
                    gigPostDate: d.gigPostDate,
                    gigPrice: d.gigPrice
                      ? `$${d.gigPrice}`
                      : `$${d.minBudget}/hr ~ $${d.maxBudget}/hr`,
                    gigTitle: d.gigTitle,
                  });
                }
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
