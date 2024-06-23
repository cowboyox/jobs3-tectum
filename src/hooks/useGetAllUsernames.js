import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const useGetAllUsernames = () => {
  return useQuery({
    queryKey: ['useGetAllUsernames'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/api/v1/user/get-all-usernames');

        return data.map((user) => user.username);
      } catch (e) {
        console.error(e);

        return null;
      }
    },
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
