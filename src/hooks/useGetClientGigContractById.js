import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';

export const useGetClientGigContractById = (contractId) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: !!contractId,
    queryFn: async () => {
      if (contractId) {
        try {
          const data = await api.get(`/api/v1/client_gig/get_gig_contract_by_id/${contractId}`);

          return data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetClientGigContractById', contractId],
    staleTime: Infinity,
  });
};
