import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetArchivedMessages = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const { data } = await api.get(`/api/v1/message/getArchivedMessages/${profileId}`);

          return data?.messages || null;
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetArchivedMessages', profileId],
    staleTime: Infinity,
  });
};
