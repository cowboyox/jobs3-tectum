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
          let sort = 0;
          let category = ['any'];
          let applicants = [];
          let experience = 'any';
          let job_type = 'any';
          let hoursPerWeek = 'any';
          let location = 'any';
          let timezone = 'any';
          let info = 'any';

          filters.map((filter) => {
            if (filter.id === 'sort') {
              sort = filter.value;
            } else if (filter.id === 'category' && filter.value !== 'any') {
              category = [...category, filter.value].filter((cv) => cv !== 'any');
            } else if (filter.id === 'applicants') {
              applicants = [...applicants, filter.value];
            } else if (filter.id === 'experience') {
              experience = filter.value;
            } else if (filter.id === 'job_type') {
              job_type = filter.value;
            } else if (filter.id === 'hoursPerWeek') {
              hoursPerWeek = filter.value;
            } else if (filter.id === 'location') {
              location = filter.value;
            } else if (filter.id === 'timezone') {
              timezone = filter.value;
            } else if (filter.id === 'info') {
              info = filter.value;
            }
          });

          const result = await api.get(
            `/api/v1/client_gig/get_gigs_proposed_by_freelancer/${freelancerId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&sort=${sort}&category=${category}&applicants=${applicants}&experience=${experience}&job_type=${job_type}&hoursPerWeek=${hoursPerWeek}&location=${location}&timezone=${timezone}&info=${info}`
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
