import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllFreelancerOrdersProposed = (
  profileId,
  pageNum,
  itemsPerPage,
  searchText = '',
  filters = [],
  locations = ''
) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId && pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (profileId && pageNum > 0 && itemsPerPage > 0) {
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

          const result = await api.get(
            `/api/v1/freelancer_gig/find_all_orders_on_client/${profileId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&earned=${earned}&hoursBilled=${hoursBilled}&jobSuccess=${jobSuccess}&languages=${languages}&hourlyRate=${hourlyRate}&locations=${locations}`
          );
          const proposals = [];
          const lives = [];

          if (result.data.proposals.length > 0) {
            result.data.proposals.map((proposal) => {
              proposals.push({
                contractId: null, // Moved to the top
                creator: {
                  fullName: proposal.gigOwner.fullName,
                },
                deliveryTime: proposal.freelancerGig.deliveryTime,
                freelancer: proposal.gigOwner,
                gigDescription: proposal.freelancerGig.gigDescription,
                gigId: proposal.freelancerGig._id,
                gigPostDate: proposal.freelancerGig.gigPostDate,
                gigPrice: proposal.freelancerGig.gigPrice,
                gigTitle: proposal.freelancerGig.gigTitle,
                maxBudget: proposal.freelancerGig.maxBudget,
                minBudget: proposal.freelancerGig.minBudget,
                proposal: proposal.proposal,
                proposalId: proposal._id,
                quantity: proposal.quantity, // Moved to the top
                status: null, // Moved to the top
                walletPublicKey: proposal.proposer?.walletPublicKey, // Moved to the top
              });
            });
          }

          if (result.data.lives.length > 0) {
            result.data.lives.map((live) => {
              lives.push({
                contractId: live.contractId,
                creator: {
                  fullName: live.gigOwner.fullName,
                },
                deliveryTime: live.freelancerGig.deliveryTime,
                freelancer: live.gigOwner,
                gigDescription: live.freelancerGig.gigDescription,
                gigId: live.freelancerGig._id,
                gigPostDate: live.freelancerGig.gigPostDate,
                gigPrice: live.freelancerGig.gigPrice
                  ? live.freelancerGig.gigPrice
                  : `$${live.freelancerGig.minBudget}/hr ~ $${live.freelancerGig.maxBudget}/hr`,
                gigTitle: live.freelancerGig.gigTitle,
                id: live._id,
                proposal: live.proposal,
                proposalId: live._id,
                quantity: live?.quantity, // Moved to the top
                status: live.status,
                walletPublicKey: live.proposer?.walletPublicKey, // Moved to the top
              });
            });
          }

          return {
            lives,
            livesTotal: result.data.livesTotal,
            proposals,
            proposalsTotal: result.data.proposalsTotal,
          };
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: [
      'useGetAllFreelancerOrdersProposed',
      profileId,
      pageNum,
      itemsPerPage,
      searchText,
      filters,
      locations,
    ],
    staleTime: Infinity,
  });
};
