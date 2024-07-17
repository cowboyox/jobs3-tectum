import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetFreelancers = (userId, pageNum, itemsPerPage, searchText = '', filters = [], locations='') => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!userId && pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (!!userId && pageNum > 0 && itemsPerPage > 0) {
        try {
          let earned = 100000;
          let languages = ['any'];
          let hourlyRate = ['any'];
          let hoursBilled = 100000;
          let jobSuccess = 100;

          filters.map((filter) => {
            if (filter.id === 'earned' && filter.value < earned) {
              earned = filter.value;
            } else if (filter.id === 'hoursBilled' && filter.value < hoursBilled) {
              hoursBilled = filter.value;
            } else if (filter.id === 'jobSuccess' && filter.value < jobSuccess) {
              jobSuccess = filter.value;
            } else if (filter.id === 'languages' && filter.value !== 'any') {
              languages = [...languages, filter.value].filter((lang) => lang !== 'any');
            } else if (filter.id === 'hourlyRate' && filter.value !== 'any') {
              hourlyRate = [...hourlyRate, filter.value].filter((lang) => lang !== 'any');
            }
          });
          earned = earned === 100000 ? 0 : earned;
          hoursBilled = hoursBilled === 100000 ? 0 : hoursBilled;
          jobSuccess = jobSuccess === 100 ? 0 : jobSuccess;
          const { data } = await api.get(
            `/api/v1/profile/get-all-freelancers/${userId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&earned=${earned}&hoursBilled=${hoursBilled}&jobSuccess=${jobSuccess}&languages=${languages}&hourlyRate=${hourlyRate}&locations=${locations}`
          );

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetFreelancers', userId, pageNum, itemsPerPage, searchText, filters, locations],
    staleTime: Infinity,
  });
};
