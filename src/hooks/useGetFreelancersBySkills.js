import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetFreelancersBySkills = (pageNum, itemsPerPage, skills) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (pageNum > 0 && itemsPerPage > 0) {
        try {
          const { data } = await api.get(
            `/api/v1/profile/get_all_freelancers_by_skills?page=${pageNum}&limit=${itemsPerPage}&skills=${skills}`
          );

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetFreelancersBySkills', pageNum, itemsPerPage, skills.sort()],
    staleTime: Infinity,
  });
};
