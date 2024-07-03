import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetFreelancers = (pageNum, itemsPerPage) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (pageNum > 0 && itemsPerPage > 0) {
        try {
          const { data } = await api.get(
            `/api/v1/profile/get-all-freelancers?page=${pageNum}&limit=${itemsPerPage}`
          );

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetFreelancers', pageNum, itemsPerPage],
    staleTime: Infinity,
  });
};
