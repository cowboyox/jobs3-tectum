import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';
import { APIS } from '@/utils/constants';

export const useGetClientGigs = (pageNum, itemsPerPage, searchText = '', filters = [], locations = '') => {
  console.log("useGetClientGigs");
  return useQuery({
    cacheTime: Infinity,
    enabled: pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      if (pageNum > 0 && itemsPerPage > 0) {
        try {
          let payment = ['any'];
          let skills = ['any'];
          let sort = 0;
          let category = ['any'];
          let applicants = 0;
          let experience = 'any';
          let hoursPerWeek = 'any';
          let location = 'any';
          let timezone = 'any';
          let info = 'any';
          let fixed = ['any'];
          let hourly = ['any'];
          let fixed = ['any'];
          let hourly = ['any'];

          filters.map((filter) => {
            if (filter.id === 'payment' && filter.value !== 'any') {
              payment = [...payment, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'applicants') {
              applicants = filter.value;
            } else if (filter.id === 'skills' && filter.value !== 'any') {
              skills = [...skills, filter.value].filter((s) => s !== 'any');
            } else if (filter.id === 'sort') {
              sort = filter.value;
            } else if (filter.id === 'category' && filter.value !== 'any') {
              category = [...category, filter.value].filter((cv) => cv !== 'any');
            } else if (filter.id === 'experience') {
              experience = filter.value;
            } else if (filter.id === 'job_type') {
              payment = [...payment, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'hoursPerWeek') {
              hoursPerWeek = filter.value;
            } else if (filter.id === 'location') {
              location = filter.value;
            } else if (filter.id === 'timezone') {
              timezone = filter.value;
            } else if (filter.id === 'info') {
              info = filter.value;
            } else if (filter.id === 'amount' && filter.value !== 'any') {
              fixed = [...fixed, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'hourly' && filter.value !== 'any') {
              hourly = [...hourly, filter.value].filter((p) => p !== 'any');
              fixed = [...fixed, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'hourly' && filter.value !== 'any') {
              hourly = [...hourly, filter.value].filter((p) => p !== 'any');
            }


            
          });

          const { data } = await api.get(
            `${APIS.CL_FIND_GIGS}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&payment=${payment}&skills=${skills}&sort=${sort}&category=${category}&applicants=${applicants}&experience=${experience}&hoursPerWeek=${hoursPerWeek}&location=${location}&timezone=${timezone}&info=${info}&fixed=${fixed}&hourly=${hourly}&locations=${locations}`
          );

          console.log(data);

          return data?.data || null;
        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetClientGigs', pageNum, itemsPerPage, searchText, filters, locations],
    staleTime: Infinity,
  });
};
