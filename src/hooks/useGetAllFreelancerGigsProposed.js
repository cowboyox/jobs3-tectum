import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllFreelancerGigsProposed = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const { data } = await api.get(
            `/api/v1/freelancer_gig/find_all_gigs_of_freelancer/${profileId}`
          );

          const submissions = [];
          const lives = [];

          if (data?.data) {
            data.data.map((d) => {
              d.bidInfos.map((info) => {
                if (!info.hired) {
                  submissions.push({
                    clientId: info.clientId,
                    creator: {
                      fullName: info.fullName,
                    },
                    gigDescription: d.gigDescription,
                    gigId: d._id,
                    gigPostDate: d.gigPostDate,
                    gigPrice: d.gigPrice
                      ? `$${d.gigPrice}`
                      : `$${d.minBudget}/hr ~ $${d.maxBudget}/hr`,
                    gigTitle: d.gigTitle,
                  });
                } else {
                  lives.push({
                    clientId: info.clientId,
                    creator: {
                      fullName: info.fullName,
                    },
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

          return { lives, submissions };
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetAllFreelancerGigsProposed', profileId],
    staleTime: Infinity,
  });
};
