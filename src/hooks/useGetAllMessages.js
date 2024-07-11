import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllMessages = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (!!profileId) {
        try {
          const { data } = await api.get(`/api/v1/message/getAllMembers/${profileId}`);

          return data?.messages || null;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetAllMessages', profileId],
    staleTime: Infinity,
  });
};
