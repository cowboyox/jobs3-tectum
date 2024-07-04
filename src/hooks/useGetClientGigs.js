import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetClientGigs = (pageNum, itemsPerPage, searchText = '', skills = []) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (pageNum > 0 && itemsPerPage > 0) {
        try {
          const { data } = await api.get(
            `/api/v1/client_gig/get_all_gigs_by_skills?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&skills=${skills}`
          );

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetClientGigs', pageNum, itemsPerPage, searchText, skills],
    staleTime: Infinity,
  });
};
