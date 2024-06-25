import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useVerifyUsername = (username) => {
  return useQuery({
    cacheTime: Infinity,
    queryFn: async () => {
      try {
        const { data } = await api.post('/api/v1/user/verify_username', { username });

        return data.isExists;
      } catch (e) {
        console.error(e);

        return null;
      }
    },
    queryKey: ['useVerifyUsername', username],
    staleTime: Infinity,
  });
};
