import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';
import { getStatus } from '@/utils/gigInfo';

export const useGetClientGigsProposedByFreelancer = (
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
            `/api/v1/client_gig/get_gigs_proposed_by_freelancer/${freelancerId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&earned=${earned}&hoursBilled=${hoursBilled}&jobSuccess=${jobSuccess}&languages=${languages}&hourlyRate=${hourlyRate}`
          );

          const proposals = [];

          if (result.data.proposals.length > 0) {
            result.data.proposals.map((proposal) => {
              proposals.push({
                clientFullName: proposal.gigOwner.fullName,
                deliveryTime: proposal.clientGig.gigDeadline,
                freelancer: proposal.proposer,
                gigDescription: proposal.clientGig.gigDescription,
                gigId: proposal.clientGig._id,
                gigPostDate: proposal.clientGig.gigPostDate,
                gigTitle: proposal.clientGig.gigTitle,
                status: getStatus(proposal.clientGig.gigStatus),
                walletPubkey: proposal.proposer?.walletPubkey,
              });
            });
          }

          return proposals;
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: [
      'useGetAllClientOrdersProposed',
      freelancerId,
      pageNum,
      itemsPerPage,
      searchText,
      filters,
    ],
    staleTime: Infinity,
  });
};
