import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetAllFLRecentViews = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const { data } = await api.get(`/api/v1/recentView/get_all_fl_recent_view/${profileId}`);

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetAllFLRecentViews', profileId],
    staleTime: Infinity,
  });
};
