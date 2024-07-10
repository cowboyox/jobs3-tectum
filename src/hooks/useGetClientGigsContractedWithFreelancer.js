import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetClientGigsContractedWithFreelancer = (
  freelancerId,
  pageNum,
  itemsPerPage,
  searchText = '',
  filters = []
) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!freelancerId && pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (freelancerId && pageNum > 0 && itemsPerPage > 0) {
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
            `/api/v1/client_gig/get_gigs_contracted_with_freelancer/${freelancerId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&earned=${earned}&hoursBilled=${hoursBilled}&jobSuccess=${jobSuccess}&languages=${languages}&hourlyRate=${hourlyRate}`
          );
          console.log('result in useGetClientGigsContractedWithFreelancer:', result);
          const proposals = [];
          const lives = [];

          if (result.data.proposals.length > 0) {
            result.data.proposals.map((proposal) => {
              proposals.push({
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
                status: null,
                walletPubkey: proposal.proposer?.walletPubkey,
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
                  ? `$${live.freelancerGig.gigPrice}`
                  : `$${live.freelancerGig.minBudget}/hr ~ $${live.freelancerGig.maxBudget}/hr`,
                gigTitle: live.freelancerGig.gigTitle,
                id: live._id,
                proposal: live.proposal,
                proposalId: live._id,
                status: live.status,
                status: live.status,
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
    queryKey: ['useGetAllClientOrdersProposed', freelancerId],
    staleTime: Infinity,
  });
};
