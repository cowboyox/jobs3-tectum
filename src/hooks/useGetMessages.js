import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetMessages = (from, to) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!from && !!to,
    queryFn: async () => {
      if (from && to) {
        try {
          const { data } = await api.get(`/api/v1/message/getMessages/${from}/${to}`);

          return data?.messages;
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetMessages', from, to],
    staleTime: Infinity,
  });
};
