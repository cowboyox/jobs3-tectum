import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetLastMessage = (from, to) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!from && !!to,
    queryFn: async () => {
      if (from && to) {
        try {
          const { data } = await api.get(`/api/v1/message/getLastMessage/${from}/${to}`);

          return data?.message;
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetLastMessage', from, to],
    staleTime: Infinity,
  });
};
