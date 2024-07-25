import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetArchivedProposals = (profileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId,
    queryFn: async () => {
      if (profileId) {
        try {
          const { data } = await api.get(`/api/v1/proposal/getArchivedProposals/${profileId}`);

          return data?.proposals;
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetArchivedProposals', profileId],
    staleTime: Infinity,
  });
};
