import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetFreelancersBySkills = (userId, pageNum, itemsPerPage, skills) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!userId && pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (!!userId && pageNum > 0 && itemsPerPage > 0) {
        try {
          const { data } = await api.get(
            `/api/v1/profile/get_all_freelancers_by_skills/${userId}?page=${pageNum}&limit=${itemsPerPage}&skills=${skills}`
          );

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetFreelancersBySkills', userId, pageNum, itemsPerPage, skills.sort()],
    staleTime: Infinity,
  });
};
