import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetClientGigById = (gigId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!gigId,
    queryFn: async () => {
      if (gigId) {
        try {
          const data = await api.get(`/api/v1/client_gig/get_gig_by_id/${gigId}`);

          return data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetClientGigById', gigId],
    staleTime: Infinity,
  });
};
