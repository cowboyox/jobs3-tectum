import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useFreelancerInfo = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const { data } = await api.get(
            `/api/v1/freelancer_gig/find_all_gigs_by_profile_id/${profileId}`
          );
          let activeOrders = [];
          let earnings = [];

          if (data?.data) {
            data.data.map((d) => {
              d.bidInfos.map((info) => {
                activeOrders.push({
                  flFullName: info.fullName,
                  flId: info.freelancerId,
                  gigDescription: d.gigDescription,
                  gigId: d._id,
                  gigPostDate: d.gigPostDate,
                  gigPrice: d.gigPrice,
                  gigTitle: d.gigTitle,
                });

                if (info.hired && info.earns.length > 0) {
                  info.earns.map((earn) => {
                    if (earn.amount > 0) {
                      earnings.push({
                        amount: earn.amount,
                        timeStamp: earn.timeStamp,
                      });
                    }
                  });
                }
              });
            });
          }

          activeOrders = activeOrders.sort(
            (a, b) => new Date(a.gigPostDate) - new Date(b.gigPostDate)
          );
          earnings = earnings.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));

          return { proposals, recentHires };
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useFreelancerInfo', profileId],
    staleTime: Infinity,
  });
};
