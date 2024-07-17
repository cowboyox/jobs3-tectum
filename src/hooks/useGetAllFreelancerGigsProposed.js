import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';
import { APIS } from '@/utils/constants';

export const useGetAllFreelancerGigsProposed = (
  profileId,
  pageNum,
  itemsPerPage,
  searchText = '',
  locations = ''
) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId && pageNum > 0 && itemsPerPage > 0) {
        try {
          const result = await api.get(
            `${APIS.FL_FIND_GIGS_PROPOSED_BY_PROFILE_ID}/${profileId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&locations=${locations}`
          );

          const submissions = [];
          const lives = [];

          if (result.data.submissions.length > 0) {
            result.data.submissions.map((submission) => {
              submissions.push({
                clientId: submission.gigOwner,
                creator: {
                  fullName: submission.gigOwner?.fullName,
                },
                gigDescription: submission.clientGig.gigDescription,
                gigId: submission.clientGig._id,
                gigPostDate: submission.clientGig.gigPostDate,
                gigPrice: submission.clientGig.gigPrice
                  ? `$${submission.clientGig.gigPrice}`
                  : `$${submission.clientGig.minBudget}/hr ~ $${submission.clientGig.maxBudget}/hr`,
                gigTitle: submission.clientGig.gigTitle,
              });
            });
          }

          if (result.data.lives.length > 0) {
            result.data.lives.map((contract) => {
              lives.push({
                clientId: contract.gigOwner,
                contractId: contract.contractId,
                creator: {
                  fullName: contract.gigOwner?.fullName,
                },
                freelancerId: contract.proposer,
                gigDescription: contract.clientGig.gigDescription,
                gigId: contract.clientGig._id,
                gigPostDate: contract.clientGig.gigPostDate,
                gigPrice: contract.clientGig.gigPrice
                  ? `$${contract.clientGig.gigPrice}`
                  : `$${contract.clientGig.minBudget}/hr ~ $${contract.clientGig.maxBudget}/hr`,
                gigTitle: contract.clientGig.gigTitle,
                id: contract._id,
                status: contract.status,
              });
            });
          }

          return {
            lives,
            livesTotal: result.data.livesTotal,
            submissions,
            submissionsTotal: result.data.submissionsTotal,
          };
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetAllFreelancerGigsProposed', profileId, pageNum, itemsPerPage, searchText, locations],
    staleTime: Infinity,
  });
};
