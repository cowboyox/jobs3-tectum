import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';
import { APIS } from '@/utils/constants';

export const useGetAllFreelancerGigsProposed = (
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
          let hoursPerWeek = 'any';
          let location = 'any';
          let timezone = 'any';
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
            } else if (filter.id === 'hoursPerWeek') {
              hoursPerWeek = filter.value;
            } else if (filter.id === 'location') {
              location = filter.value;
            } else if (filter.id === 'timezone') {
              timezone = filter.value;
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
            `${APIS.FL_FIND_GIGS_PROPOSED_BY_PROFILE_ID}/${profileId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&payment=${payment}&skills=${skills}&sort=${sort}&category=${category}&sortby=${sortby}&experience=${experience}&hoursPerWeek=${hoursPerWeek}&location=${location}&timezone=${timezone}&info=${info}&fixed=${fixed}&hourly=${hourly}&locations=${locations}`
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
    queryKey: ['useGetAllFreelancerGigsProposed', profileId, pageNum, itemsPerPage, searchText, locations, filters],
    staleTime: Infinity,
  });
};
