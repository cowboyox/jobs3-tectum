import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetFreelancerGigs = (pageNum, itemsPerPage, searchText = '', locations="") => {
  return useQuery({
    cacheTime: Infinity,
    enabled: pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (pageNum > 0 && itemsPerPage > 0) {
        try {
          const { data } = await api.get(
            `/api/v1/freelancer_gig/find_all_gigs?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&locations=${locations}`
          );

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetFreelancerGigs', pageNum, itemsPerPage, searchText, locations],
    staleTime: Infinity,
  });
};
