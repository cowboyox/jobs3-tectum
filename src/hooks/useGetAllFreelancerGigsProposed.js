import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllFreelancerGigsProposed = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const result = await api.get(`/api/v1/freelancer_gig/find_all_gigs_of_freelancer/${profileId}`);
          console.log("result in useGetAllFreelancerGigsProposed:", result);
          const submissions = [];
          const lives = [];

          if (result.data.submissions.length > 0) {
            result.data.submissions.map((submission) => {
              submissions.push({
                clientId: submission.gigOwner,
                creator: {
                  fullName: submission.gigOwner.fullName,
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
                id: contract._id,
                creator: {
                  fullName: contract.gigOwner.fullName,
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
                contractId: contract.contractId,
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
