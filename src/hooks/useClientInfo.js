import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useClientInfo = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const { data } = await api.get(`/api/v1/client_gig/find_all_gigs_of_client/${profileId}`);
          let proposals = [];
          let recentHires = [];

          if (data?.data) {
            data.data.map((d) => {
              d.bidInfos.map((info) => {
                proposals.push({
                  flFullName: info.fullName,
                  flId: info.freelancerId,
                  gigDescription: d.gigDescription,
                  gigId: d._id,
                  gigPostDate: d.gigPostDate,
                  gigPrice: d.gigPrice,
                  gigTitle: d.gigTitle,
                  maxBudget: d.maxBudget,
                  minBudget: d.minBudget,
                  walletPubkey: info?.walletPubkey,
                });

                if (info.hired && info.spend > 0) {
                  recentHires.push({
                    flFullName: info.fullName,
                    flId: info.freelancerId,
                    gigDescription: d.gigDescription,
                    gigId: d._id,
                    gigTitle: d.gigTitle,
                    spends: info.spend,
                    timeStamp: info.timeStamp,
                  });
                }
              });
            });
          }

          recentHires = recentHires.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
          proposals = proposals.sort((a, b) => new Date(a.gigPostDate) - new Date(b.gigPostDate));

          return { proposals, recentHires };
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useClientInfo', profileId],
    staleTime: Infinity,
  });
};
