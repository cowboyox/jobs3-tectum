import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';
import { APIS } from '@/utils/constants';

export const useGetFLGigsPostedByProfileId = (profileId, pageNum, itemsPerPage) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!profileId && pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (!!profileId && pageNum > 0 && itemsPerPage > 0) {
        try {
          const { data } = await api.get(
            `${APIS.FL_FIND_GIGS_POSTED_BY_PROFILE_ID}/${profileId}?page=${pageNum}&limit=${itemsPerPage}`
          );

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      } else {
        return null;
      }
    },
    queryKey: ['useGetFLGigsPostedByProfileId', profileId, pageNum, itemsPerPage],
    staleTime: Infinity,
  });
};
