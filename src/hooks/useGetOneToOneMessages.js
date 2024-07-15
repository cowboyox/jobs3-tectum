import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetOneToOneMessages = (myProfileId, oppProfileId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!myProfileId && !!oppProfileId,
    queryFn: async () => {
      if (!!myProfileId && !!oppProfileId) {
        try {
          const { data } = await api.get(
            `/api/v1/message/getMessages/${myProfileId}/${oppProfileId}`
          );

          console.log({ data });

          return data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetOneToOneMessages', myProfileId, oppProfileId],
    staleTime: Infinity,
  });
};
