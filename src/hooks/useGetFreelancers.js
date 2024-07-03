import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetFreelancers = (pageNum, itemsPerPage, searchText = '') => {
  return useQuery({
    cacheTime: Infinity,
    enabled: pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (pageNum > 0 && itemsPerPage > 0) {
        try {
          const { data } = await api.get(
            `/api/v1/profile/get-all-freelancers?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}`
          );

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetFreelancers', pageNum, itemsPerPage, searchText],
    staleTime: Infinity,
  });
};
