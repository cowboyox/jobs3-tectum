import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllClientGigsProposed = (
  profileId,
  pageNum,
  itemsPerPage,
  searchText = '',
  filters = [],
  locations = ''
) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
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
            `/api/v1/client_gig/find_all_proposals_by_profile_id/${profileId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&earned=${earned}&hoursBilled=${hoursBilled}&jobSuccess=${jobSuccess}&languages=${languages}&hourlyRate=${hourlyRate}&locations=${locations}`
          );

          const proposals = [];
          const lives = [];

          if (result.data.proposals.length > 0) {
            result.data.proposals.map((proposal) => {
              proposals.push({
                creator: {
                  fullName: proposal.proposer.fullName,
                },
                freelancerId: proposal.proposer,
                gigDescription: proposal?.clientGig?.gigDescription,
                gigId: proposal.clientGig?._id,
                gigPostDate: proposal.clientGig?.gigPostDate,
                gigPrice: proposal.clientGig?.gigPrice,
                gigTitle: proposal.clientGig?.gigTitle,
                maxBudget: proposal.clientGig?.maxBudget,
                minBudget: proposal.clientGig?.minBudget,
                walletPubkey: proposal.proposer?.walletPubkey,
              });
            });
          }

          if (result.data.contracts.length > 0) {
            result.data.contracts.map((contract) => {
              lives.push({
                contractId: contract.contractId,
                creator: {
                  fullName: contract.proposer.fullName,
                },
                freelancerId: contract.proposer,
                gigDescription: contract?.clientGig?.gigDescription,
                gigId: contract.clientGig?._id,
                gigPostDate: contract.clientGig?.gigPostDate,
                gigPrice: contract.clientGig?.gigPrice
                  ? `$${contract.clientGig?.gigPrice}`
                  : `$${contract.clientGig?.minBudget}/hr ~ $${contract.clientGig?.maxBudget}/hr`,
                gigTitle: contract.clientGig?.gigTitle,
                id: contract._id,
                status: contract.status,
              });
            });
          }

          return {
            lives,
            livesTotal: result.data.contractsTotal,
            proposals,
            proposalsTotal: result.data.proposalsTotal,
          };
        } catch (e) {
          console.error('Error in useGetAllClientGigsProposed:', e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: [
      'useGetAllClientGigsProposed',
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
