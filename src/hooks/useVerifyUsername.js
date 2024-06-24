import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const useVerifyUsername = (username) => {
  return useQuery({
    queryKey: ['useVerifyUsername', username],
    queryFn: async () => {
      try {
        const { data } = await api.post('/api/v1/user/verify_username', { username });

        return data.isExists;
      } catch (e) {
        console.error(e);

        return null;
      }
    },
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
