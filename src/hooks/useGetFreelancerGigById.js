import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetFreelancerGigById = (gigId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!gigId,
    queryFn: async () => {
      if (gigId) {
        try {
          const { data } = await api.get(`/api/v1/freelancer_gig/get_gig_by_id/${gigId}`);

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetFreelancerGigById', gigId],
    staleTime: Infinity,
  });
};
