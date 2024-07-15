import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetMembersWithMessages = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (!!profileId) {
        try {
          const { data } = await api.get(`/api/v1/message/getMembersWithMessages/${profileId}`);

          if (data) {
            return { messages: data.messages, users: data.users };
          }

          return null;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetMembersWithMessages', profileId],
    staleTime: Infinity,
  });
};
