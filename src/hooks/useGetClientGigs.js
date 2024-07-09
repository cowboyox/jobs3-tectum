import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';
import { APIS } from '@/utils/constants';

export const useGetClientGigs = (pageNum, itemsPerPage, searchText = '', filters = []) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (pageNum > 0 && itemsPerPage > 0) {
        try {
          let payment = ['any'];
          let applicants = -1;
          let skills = ['any'];

          filters.map((filter) => {
            if (filter.id === 'payment' && filter.value !== 'any') {
              payment = [...payment, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'applicants' && filter.value > applicants) {
              applicants = filter.value;
            } else if (filter.id === 'skills' && filter.value !== 'any') {
              skills = [...skills, filter.value].filter((s) => s !== 'any');
            }
          });

          const { data } = await api.get(
            `${APIS.CL_FIND_GIGS}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&payment=${payment}&applicants=${applicants}&skills=${skills}`
          );

          return data?.data;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetClientGigs', pageNum, itemsPerPage, searchText, filters],
    staleTime: Infinity,
  });
};
