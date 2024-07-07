import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';
import { APIS } from '@/utils/constants';
import { getStatus } from '@/utils/gigInfo';

export const useFreelancerInfo = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const { data } = await api.get(
            `${APIS.FL_FIND_GIGS_PROPOSED_BY_PROFILE_ID}/${profileId}`
          );

          let activeOrders = [];
          let earnings = [];

          if (data?.submissions) {
            data.submissions.map((sub) => {
              activeOrders.push({
                gigId: sub.clientGig._id,
                gigPostDate: sub.clientGig.gigPostDate,
                gigStatus: getStatus(sub.clientGig.gigStatus),
                gigTitle: sub.clientGig.gigTitle,
              });

              if (sub.accepted && sub.proposer.flHistory.length > 0) {
                sub.proposer.flHistory.map((earns) => {
                  earns.map((earn) => {
                    if (earn.amount > 0) {
                      earnings.push({
                        amount: earn.amount,
                        earnedAt: earn.earnedAt,
                      });
                    }
                  });
                });
              }
            });
          }

          activeOrders = activeOrders.sort(
            (a, b) => new Date(a.gigPostDate) - new Date(b.gigPostDate)
          );
          earnings = earnings.sort((a, b) => new Date(a.earnedAt) - new Date(b.earnedAt));

          return { activeOrders, earnings };
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
