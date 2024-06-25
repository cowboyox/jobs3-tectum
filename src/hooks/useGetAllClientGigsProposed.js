import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllClientGigsProposed = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const { data } = await api.get(`/api/v1/client_gig/find_all_gigs_proposed/${profileId}`);
          const infos = [];

          if (data?.data) {
            data.data.map((d) => {
              d.bidInfos.map((info) => {
                infos.push({
                  creator: {
                    fullName: info.fullName,
                  },
                  gigDescription: d.gigDescription,
                  gigPostDate: d.gigPostDate,
                  gigPrice: d.gigPrice
                    ? `$${d.gigPrice}`
                    : `$${d.minBudget}/hr ~ $${d.maxBudget}/hr`,
                  gigTitle: d.gigTitle,
                });
              });
            });
          }

          return infos;
        } catch (e) {
          console.error(e);

          return [];
        }
      } else {
        return [];
      }
    },
    queryKey: ['useGetAllClientGigsProposed', profileId],
    staleTime: Infinity,
  });
};
