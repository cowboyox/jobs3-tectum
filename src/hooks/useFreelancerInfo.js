import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';
import { APIS } from '@/utils/constants';
import { getStatus } from '@/utils/gigInfo';

export const useFreelancerInfo = (
  profileId,
  pageNum,
  itemsPerPage,
  searchText = '',
  filters = []
) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId && pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (profileId) {
        try {
          let earned = 0;
          let languages = ['any'];
          let hourlyRate = ['any'];
          let hoursBilled = 0;
          let jobSuccess = 0;

          filters.map((filter) => {
            if (filter.id === 'earned' && filter.value > earned) {
              earned = filter.value;
            } else if (filter.id === 'hoursBilled' && filter.value > hoursBilled) {
              hoursBilled = filter.value;
            } else if (filter.id === 'jobSuccess' && filter.value > jobSuccess) {
              jobSuccess = filter.value;
            } else if (filter.id === 'languages' && filter.value !== 'any') {
              languages = [...languages, filter.value].filter((lang) => lang !== 'any');
            } else if (filter.id === 'hourlyRate' && filter.value !== 'any') {
              hourlyRate = [...hourlyRate, filter.value].filter((lang) => lang !== 'any');
            }
          });

          const { data } = await api.get(
            `${APIS.FL_FIND_GIGS_PROPOSED_BY_PROFILE_ID}/${profileId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&earned=${earned}&hoursBilled=${hoursBilled}&jobSuccess=${jobSuccess}&languages=${languages}&hourlyRate=${hourlyRate}`
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
