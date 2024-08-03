import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllClientOrdersProposed = (
  profileId,
  pageNum,
  itemsPerPage,
  searchText = '',
  locations = '',
  filters = []
) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId && pageNum > 0 && itemsPerPage > 0) {
        try {
          let payment = ['any'];
          let skills = ['any'];
          let sort = 0;
          let category = ['any'];
          let sortby = 'any';
          let experience = 'any';
          let info = 'any';
          let fixed = ['any'];
          let hourly = ['any'];
          filters.map((filter) => {
            if (filter.id === 'payment' && filter.value !== 'any') {
              payment = [...payment, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'sort_by') {
              sortby = filter.value;
            } else if (filter.id === 'skills' && filter.value !== 'any') {
              skills = [...skills, filter.value].filter((s) => s !== 'any');
            } else if (filter.id === 'sort') {
              sort = filter.value;
            } else if (filter.id === 'category' && filter.value !== 'any') {
              category = [...category, filter.value].filter((cv) => cv !== 'any');
            } else if (filter.id === 'experience') {
              experience = filter.value;
            } else if (filter.id === 'job_type') {
              payment = [...payment, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'info') {
              info = filter.value;
            } else if (filter.id === 'amount' && filter.value !== 'any') {
              fixed = [...fixed, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'hourly' && filter.value !== 'any') {
              hourly = [...hourly, filter.value].filter((p) => p !== 'any');
              fixed = [...fixed, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'hourly' && filter.value !== 'any') {
              hourly = [...hourly, filter.value].filter((p) => p !== 'any');
            }
          });
          const result = await api.get(
            `/api/v1/freelancer_gig/find_all_orders_of_client/${profileId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&payment=${payment}&skills=${skills}&sort=${sort}&category=${category}&sortby=${sortby}&experience=${experience}&info=${info}&fixed=${fixed}&hourly=${hourly}&locations=${locations}`
          );
          const proposals = [];
          const lives = [];

          if (result.data.proposals.length > 0) {
            result.data.proposals.map((proposal) => {
              proposals.push({
                contractId: null,
                creator: {
                  fullName: proposal.proposer.fullName,
                },
                client: proposal.proposer,
                gigDescription: proposal.freelancerGig.gigDescription,
                gigId: proposal.freelancerGig._id,
                gigPostDate: proposal.freelancerGig.gigPostDate,
                gigPrice: proposal.freelancerGig.gigPrice,
                gigTitle: proposal.freelancerGig.gigTitle,
                maxBudget: proposal.freelancerGig.maxBudget,
                minBudget: proposal.freelancerGig.minBudget,
                walletPublicKey: proposal.proposer.walletPublicKey,
                deliveryTime: proposal.freelancerGig.deliveryTime,
                proposal: proposal.proposal,
                proposalId: proposal._id,
                status: null,
                quantity: proposal.quantity,
              });
            });
          }

          if (result.data.lives.length > 0) {
            result.data.lives.map((live) => {
              lives.push({
                client: live.proposer,
                contractId: live.contractId,
                creator: {
                  fullName: live.proposer.fullName,
                },
                deliveryTime: live.freelancerGig.deliveryTime,
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
                quantity: live?.quantity,
                status: live.status,
                walletPublicKey: live.proposer?.walletPublicKey,
              });
            });
          }

          return {
            lives,
            proposals,
            proposalsTotal: result.data.proposalsTotal,
            livesTotal: result.data.livesTotal,
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
      'useGetAllClientOrdersProposed',
      profileId,
      pageNum,
      itemsPerPage,
      searchText,
      locations,
      filters,
    ],
    staleTime: Infinity,
  });
};
