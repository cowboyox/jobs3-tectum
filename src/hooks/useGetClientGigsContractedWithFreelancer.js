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

          const contracts = result?.data?.contracts || [];
          const earnings = [];

          if (contracts.length > 0) {
            contracts.map((contract) => {
              if (contract.proposer.flHistory.length > 0) {
                contract.proposer.flHistory.map((earns) => {
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

              contracts.push({
                clientFullName: contract.gigOwner.fullName,
                deliveryTime: contract.clientGig.gigDeadline,
                freelancer: contract.proposer,
                gigDescription: contract.clientGig.gigDescription,
                gigId: contract.clientGig._id,
                gigPostDate: contract.clientGig.gigPostDate,
                gigTitle: contract.clientGig.gigTitle,
                status: getStatus(contract.clientGig.gigStatus),
                walletPubkey: contract.proposer?.walletPubkey,
              });
            });
          }

          return { contracts, earnings };
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
