import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetUserInfo = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (!!profileId) {
        try {
          const { data } = await api.get(`/api/v1/profile/get_profile_by_id/${profileId}`);

          return data?.profile || null;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetUserInfo', profileId],
    staleTime: Infinity,
  });
};
